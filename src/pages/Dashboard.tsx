import { useEffect, useMemo, useState } from 'react';
import type { Order } from '../hooks/useOrders';
import { apiUrl } from '../lib/api';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminKey, setAdminKey] = useState<string | null>(() => {
    try { return localStorage.getItem('nikskart-admin-key'); } catch { return null; }
  });
  const [inputKey, setInputKey] = useState('');

  useEffect(() => {
    if (!adminKey) { setLoading(false); return; }
    async function fetchOrders() {
      try {
        const res = await fetch(apiUrl('/api/orders/all'), {
          headers: { 'x-admin-key': adminKey! }
        });
        if (res.status === 401) {
          setError('Invalid admin key.');
          localStorage.removeItem('nikskart-admin-key');
          setAdminKey(null);
          return;
        }
        if (!res.ok) { setOrders([]); return; }
        setOrders(await res.json());
      } catch (err) {
        setError(
          err instanceof Error && err.message === 'Failed to fetch'
            ? 'Unable to reach backend server. Start it with `npm run server`.'
            : 'Unable to load order analytics.'
        );
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [adminKey]);

  const customers = useMemo(() => {
    const map = new Map<string, { email: string; name: string; orders: number; totalSpend: number; lastOrder: string }>();
    orders.forEach((order) => {
      const existing = map.get(order.userEmail);
      if (existing) {
        map.set(order.userEmail, {
          ...existing,
          orders: existing.orders + 1,
          totalSpend: existing.totalSpend + order.grandTotal,
          lastOrder: order.createdAt > existing.lastOrder ? order.createdAt : existing.lastOrder
        });
      } else {
        map.set(order.userEmail, {
          email: order.userEmail, name: order.userName,
          orders: 1, totalSpend: order.grandTotal, lastOrder: order.createdAt
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.orders - a.orders);
  }, [orders]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);

  if (!adminKey) {
    return (
      <main className="page-content">
        <div className="auth-panel">
          <h1>Dashboard Login</h1>
          <p>Enter your admin key to view analytics.</p>
          <div className="auth-form">
            <input
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  localStorage.setItem('nikskart-admin-key', inputKey);
                  setAdminKey(inputKey);
                  setLoading(true);
                  setError('');
                }
              }}
              placeholder="Admin key"
              type="password"
            />
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                localStorage.setItem('nikskart-admin-key', inputKey);
                setAdminKey(inputKey);
                setLoading(true);
                setError('');
              }}
            >
              View Dashboard
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Order and customer analytics.</p>
        </div>
        <button className="text-button" onClick={() => {
          localStorage.removeItem('nikskart-admin-key');
          setAdminKey(null);
          setOrders([]);
        }}>
          Sign out
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="metric-grid">
        <div className="metric-card"><span>Total Customers</span><strong>{customers.length}</strong></div>
        <div className="metric-card"><span>Total Orders</span><strong>{orders.length}</strong></div>
        <div className="metric-card"><span>Total Revenue</span><strong>₹{totalRevenue}</strong></div>
      </div>

      {loading ? <p>Loading…</p> : (
        <>
          <section className="dashboard-section">
            <h2>Customer List</h2>
            {customers.length === 0 ? <p>No customers yet.</p> : (
              <div className="customer-table">
                <div className="table-row table-header">
                  <span>Customer</span><span>Orders</span><span>Total Spent</span><span>Last Order</span>
                </div>
                {customers.map((c) => (
                  <div key={c.email} className="table-row">
                    <span>{c.name} / {c.email}</span>
                    <span>{c.orders}</span>
                    <span>₹{c.totalSpend}</span>
                    <span>{new Date(c.lastOrder).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-section">
            <h2>Order List</h2>
            {orders.length === 0 ? <p>No orders yet.</p> : (
              <div className="orders-table">
                <div className="table-row table-header">
                  <span>Order ID</span><span>Customer</span><span>Amount</span><span>Status</span><span>Date</span>
                </div>
                {orders.map((o) => (
                  <div key={o.id} className="table-row">
                    <span>{o.id}</span>
                    <span>{o.userName}</span>
                    <span>₹{o.grandTotal}</span>
                    <span>{o.status}</span>
                    <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
