import { supabase } from './supabase.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

// Fallback to JSON file when Supabase is not configured (local dev without env vars)
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');

function readLocal() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(ORDERS_FILE)) return [];
  try { return JSON.parse(readFileSync(ORDERS_FILE, 'utf8')); } catch { return []; }
}

function writeLocal(orders) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

function toOrder(row) {
  return {
    _id: row.id,
    userEmail: row.user_email,
    userName: row.user_name,
    items: row.items,
    totalPrice: row.total_price,
    shipping: row.shipping,
    grandTotal: row.grand_total,
    paymentMethod: row.payment_method,
    address: row.address,
    razorpayOrderId: row.razorpay_order_id,
    razorpayPaymentId: row.razorpay_payment_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findOrders({ userEmail }) {
  if (!supabase) {
    return readLocal()
      .filter((o) => o.userEmail === userEmail)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_email', userEmail)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(toOrder);
}

export async function createOrder(data) {
  const {
    userEmail, userName, items, totalPrice, shipping, grandTotal,
    paymentMethod, address, razorpayOrderId, razorpayPaymentId
  } = data;

  if (!supabase) {
    const orders = readLocal();
    const now = new Date().toISOString();
    const order = {
      _id: randomUUID(), userEmail, userName, items, totalPrice, shipping,
      grandTotal, paymentMethod, address, razorpayOrderId, razorpayPaymentId,
      status: 'Processing', createdAt: now, updatedAt: now
    };
    orders.push(order);
    writeLocal(orders);
    return order;
  }

  const { data: row, error } = await supabase
    .from('orders')
    .insert({
      user_email: userEmail,
      user_name: userName,
      items,
      total_price: totalPrice,
      shipping,
      grand_total: grandTotal,
      payment_method: paymentMethod,
      address,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toOrder(row);
}

export async function findAllOrders() {
  if (!supabase) {
    return readLocal().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(toOrder);
}

export async function updateOrderStatus(id, status) {
  if (!supabase) {
    const orders = readLocal();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx === -1) return null;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    writeLocal(orders);
    return orders[idx];
  }
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return toOrder(data);
}

export async function aggregateCustomers() {
  const orders = await findAllOrders();
  const map = {};
  for (const order of orders) {
    const email = order.userEmail;
    if (!map[email]) {
      map[email] = { email, name: order.userName, orderCount: 0, lastOrderAt: order.createdAt };
    }
    map[email].orderCount++;
    if (order.createdAt > map[email].lastOrderAt) map[email].lastOrderAt = order.createdAt;
  }
  return Object.values(map).sort((a, b) => new Date(b.lastOrderAt) - new Date(a.lastOrderAt));
}
