import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { findOrders, createOrder, findAllOrders, updateOrderStatus, aggregateCustomers } from './db.js';
import { sendStatusEmail } from './mailer.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const envOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:4173';
const origin = process.env.NODE_ENV === 'production'
  ? [envOrigin, 'https://nikskart.vercel.app']
  : /^http:\/\/localhost(:\d+)?$/;

app.use(cors({ origin, credentials: true }));
app.use(express.json());

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  console.warn('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set – payments will be unavailable');
}

const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;

const adminKey = process.env.ADMIN_KEY || '';

function requireAdmin(req, res, next) {
  if (!adminKey) {
    console.warn('ADMIN_KEY not set — admin-protected endpoints are open');
    return next();
  }
  const provided = req.get('x-admin-key') || req.query._admin_key;
  if (provided && provided === adminKey) return next();
  return res.status(401).json({ error: 'Admin key required' });
}

function verifyRazorpaySignature(orderId, paymentId, signature) {
  if (!razorpayKeySecret) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', razorpayKeySecret).update(body).digest('hex');
  return expected === signature;
}

app.post('/api/create-razorpay-order', async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ error: 'Razorpay is not configured on this server.' });
  }
  const { amount } = req.body;
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number (in INR).' });
  }
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    });
    return res.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return res.status(500).json({ error: 'Unable to create payment order.' });
  }
});

app.get('/api/orders', async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail || typeof userEmail !== 'string') {
    return res.status(400).json({ error: 'userEmail query parameter is required' });
  }
  try {
    const orders = await findOrders({ userEmail });
    return res.json(orders.map(normalizeOrder));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  const {
    userEmail, userName, items, totalPrice, shipping, grandTotal,
    paymentMethod, address,
    razorpayOrderId, razorpayPaymentId, razorpaySignature
  } = req.body;

  if (!userEmail || !userName) {
    return res.status(400).json({ error: 'userEmail and userName are required' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order items are required' });
  }
  if (!address || !address.fullName || !address.phone || !address.pincode) {
    return res.status(400).json({ error: 'Valid shipping address is required' });
  }
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ error: 'Razorpay payment verification data is required' });
  }

  if (!verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
    return res.status(400).json({ error: 'Payment signature verification failed.' });
  }

  try {
    const order = await createOrder({
      userEmail, userName, items, totalPrice, shipping, grandTotal,
      paymentMethod: paymentMethod || 'Razorpay',
      address,
      razorpayOrderId, razorpayPaymentId
    });
    return res.status(201).json(normalizeOrder(order));
  } catch (error) {
    console.error('Order save error:', error);
    return res.status(500).json({ error: `Order save failed: ${error.message}` });
  }
});

app.get('/api/orders/all', requireAdmin, async (req, res) => {
  try {
    const orders = await findAllOrders();
    return res.json(orders.map(normalizeOrder));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/customers', requireAdmin, async (req, res) => {
  try {
    return res.json(await aggregateCustomers());
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ error: 'Unable to fetch customers' });
  }
});

app.put('/api/orders/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'status is required' });
  }
  const order = await updateOrderStatus(id, status);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  sendStatusEmail({
    toEmail: order.userEmail,
    toName: order.userName,
    orderId: order._id,
    status,
    items: order.items,
    grandTotal: order.grandTotal,
  }).catch((err) => console.error('[mailer] Email failed:', err.message));

  return res.json(normalizeOrder(order));
});

app.get('/', (_req, res) => res.json({ status: 'Nikskart backend is running' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', razorpay: !!razorpay }));

function normalizeOrder(order) {
  const { _id, ...rest } = order;
  return { id: _id, ...rest };
}

// Export app for Vercel serverless
export default app;

// Only start HTTP server when running locally / on Render (not Vercel)
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Nikskart backend listening on http://localhost:${port}`);
  });
}
