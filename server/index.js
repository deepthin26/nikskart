import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Order } from './models/Order.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:4173';

app.use(cors({ origin, credentials: true }));
app.use(express.json());

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.error('STRIPE_SECRET_KEY is required in environment variables');
  process.exit(1);
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: '2023-11-15'
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nikskart';

mongoose.set('strictQuery', true);

const adminKey = process.env.ADMIN_KEY || '';

function requireAdmin(req, res, next) {
  if (!adminKey) {
    // No admin key configured — allow for local/dev but log a warning
    console.warn('ADMIN_KEY not set — admin-protected endpoints are open');
    return next();
  }

  const provided = req.get('x-admin-key') || req.query._admin_key || req.headers['x-admin-key'];
  if (provided && provided === adminKey) return next();
  return res.status(401).json({ error: 'Admin key required' });
}

try {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection failed:', error);
  process.exit(1);
}

app.get('/api/orders', async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail || typeof userEmail !== 'string') {
    return res.status(400).json({ error: 'userEmail query parameter is required' });
  }

  const orders = await Order.find({ userEmail }).sort({ createdAt: -1 }).lean();
  return res.json(orders);
});

app.post('/api/orders', async (req, res) => {
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

  const order = new Order({
    userEmail,
    userName,
    items,
    totalPrice,
    shipping,
    grandTotal,
    paymentMethod,
    address
  });

  await order.save();
  return res.status(201).json(order);
});

app.post('/api/create-payment-intent', async (req, res) => {
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

app.get('/api/orders/all', requireAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return res.json(orders);
});

// Return a list of customers (aggregated from orders)
app.get('/api/customers', requireAdmin, async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: '$userEmail',
          name: { $first: '$userName' },
          orders: { $sum: 1 },
          lastOrderAt: { $max: '$createdAt' }
        }
      },
      { $sort: { lastOrderAt: -1 } }
    ]);

    return res.json(
      customers.map((c) => ({ email: c._id, name: c.name, orderCount: c.orders, lastOrderAt: c.lastOrderAt }))
    );
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ error: 'Unable to fetch customers' });
  }
});

// Update order status (admin)
app.put('/api/orders/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'status is required' });
  }

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!order) return res.status(404).json({ error: 'Order not found' });
    return res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Unable to update status' });
  }
});

app.get('/', (_req, res) => {
  res.send({ status: 'Nikskart backend is running' });
});

app.listen(port, () => {
  console.log(`Nikskart backend listening on http://localhost:${port}`);
});
