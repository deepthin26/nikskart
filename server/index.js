import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { findOrders, createOrder, findAllOrders, updateOrderStatus, aggregateCustomers } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const envOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:4173';
const origin = process.env.NODE_ENV === 'production' ? envOrigin : /^http:\/\/localhost(:\d+)?$/;

app.use(cors({ origin, credentials: true }));
app.use(express.json());

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn('STRIPE_SECRET_KEY not set – card payments will be unavailable');
}

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2023-11-15' }) : null;

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

app.get('/api/orders', (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail || typeof userEmail !== 'string') {
    return res.status(400).json({ error: 'userEmail query parameter is required' });
  }
  const orders = findOrders({ userEmail });
  return res.json(orders.map(normalizeOrder));
});

app.post('/api/orders', (req, res) => {
  const { userEmail, userName, items, totalPrice, shipping, grandTotal, paymentMethod, address } = req.body;

  if (!userEmail || !userName) {
    return res.status(400).json({ error: 'userEmail and userName are required' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order items are required' });
  }
  if (!address || !address.fullName || !address.phone || !address.pincode) {
    return res.status(400).json({ error: 'Valid shipping address is required' });
  }

  try {
    const order = createOrder({ userEmail, userName, items, totalPrice, shipping, grandTotal, paymentMethod, address });
    return res.status(201).json(normalizeOrder(order));
  } catch (error) {
    console.error('Order save error:', error);
    return res.status(500).json({ error: `Order save failed: ${error.message}` });
  }
});

app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Card payments are not configured on this server.' });
  }
  const { amount, currency = 'INR' } = req.body;
  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Amount must be a number' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card']
    });
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: 'Unable to create payment intent' });
  }
});

app.get('/api/orders/all', requireAdmin, (req, res) => {
  return res.json(findAllOrders().map(normalizeOrder));
});

app.get('/api/customers', requireAdmin, (req, res) => {
  try {
    return res.json(aggregateCustomers());
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ error: 'Unable to fetch customers' });
  }
});

app.put('/api/orders/:id/status', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'status is required' });
  }
  const order = updateOrderStatus(id, status);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  return res.json(normalizeOrder(order));
});

app.get('/', (_req, res) => res.json({ status: 'Nikskart backend is running' }));

function normalizeOrder(order) {
  const { _id, ...rest } = order;
  return { id: _id, ...rest };
}

app.listen(port, () => {
  console.log(`Nikskart backend listening on http://localhost:${port}`);
});
