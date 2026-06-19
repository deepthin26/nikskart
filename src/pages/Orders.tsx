import { Link } from 'react-router-dom';
import type { Order } from '../hooks/useOrders';
import { useSeoMeta } from '../hooks/useSeoMeta';

const STATUS_COLOR: Record<string, { bg: string; color: string; label: string }> = {
  Processing:         { bg: '#fef3c7', color: '#92400e', label: '⏳ Processing' },
  Shipped:            { bg: '#dbeafe', color: '#1e40af', label: '🚚 Shipped' },
  'Out for Delivery': { bg: '#ede9fe', color: '#5b21b6', label: '📦 Out for Delivery' },
  Delivered:          { bg: '#dcfce7', color: '#15803d', label: '✅ Delivered' },
  Cancelled:          { bg: '#fee2e2', color: '#991b1b', label: '❌ Cancelled' },
};

interface OrdersProps {
  orders: Order[];
  user: {
    authenticated: boolean;
    email: string;
    name: string;
  };
}

export default function Orders({ orders, user }: OrdersProps) {
  useSeoMeta('My Orders – Nikskart', 'View and track your orders.', true);
  if (!user.authenticated) {
    return (
      <main className="page-content empty-cart">
        <h1>Sign in to view your orders</h1>
        <p>Order history is available once you sign in.</p>
        <Link className="primary-button" to="/login">
          Sign in
        </Link>
      </main>
    );
  }

  const userOrders = orders.filter((order) => order.userEmail === user.email);

  if (userOrders.length === 0) {
    return (
      <main className="page-content empty-cart">
        <h1>No orders yet</h1>
        <p>Once you place an order, it will appear here.</p>
        <Link className="primary-button" to="/">
          Shop now
        </Link>
      </main>
    );
  }

  return (
    <main className="page-content orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {userOrders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-meta">
              <div>
                <strong>Order ID:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{order.id}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong>Status:</strong>
                {(() => {
                  const s = STATUS_COLOR[order.status];
                  return s
                    ? <span style={{ background: s.bg, color: s.color, borderRadius: '4px', padding: '2px 10px', fontSize: '0.8rem', fontWeight: 600 }}>{s.label}</span>
                    : <span>{order.status}</span>;
                })()}
              </div>
              <div>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="order-details">
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.id}`}>
                      {item.name} x{item.quantity} — ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Payment:</strong> {order.paymentMethod}
              </div>
              <div>
                <strong>Delivery:</strong> {order.address.addressType}, {order.address.city}
              </div>
              <div className="order-total">
                <span>Total</span>
                <strong>₹{order.grandTotal}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
