import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readOrders() {
  ensureDataDir();
  if (!existsSync(ORDERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  ensureDataDir();
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

export function findOrders(query = {}) {
  const orders = readOrders();
  return orders
    .filter((order) => Object.entries(query).every(([k, v]) => order[k] === v))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createOrder(data) {
  const orders = readOrders();
  const now = new Date().toISOString();
  const order = { _id: randomUUID(), ...data, status: 'Processing', createdAt: now, updatedAt: now };
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function findAllOrders() {
  return readOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function updateOrderStatus(id, status) {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o._id === id);
  if (idx === -1) return null;
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  writeOrders(orders);
  return orders[idx];
}

export function aggregateCustomers() {
  const orders = readOrders();
  const map = {};
  for (const order of orders) {
    if (!map[order.userEmail]) {
      map[order.userEmail] = { email: order.userEmail, name: order.userName, orderCount: 0, lastOrderAt: order.createdAt };
    }
    map[order.userEmail].orderCount++;
    if (order.createdAt > map[order.userEmail].lastOrderAt) {
      map[order.userEmail].lastOrderAt = order.createdAt;
    }
  }
  return Object.values(map).sort((a, b) => new Date(b.lastOrderAt) - new Date(a.lastOrderAt));
}
