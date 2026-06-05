import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';

interface Customer {
  email: string;
  name: string;
  orderCount: number;
  lastOrderAt: string;
}

interface OrderData {
  id: string;
  userEmail: string;
  userName: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  totalPrice: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [adminKey, setAdminKey] = useState<string | null>(() => {
    try { return localStorage.getItem('nikskart-admin-key'); } catch { return null; }
  });
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const formatError = (err: unknown) => {
    if (err instanceof Error && err.message === 'Failed to fetch') {
      return 'Unable to reach backend server. Start it with `npm run server`.';
    }
    return err instanceof Error ? err.message : 'Unable to load admin dashboard.';
  };

  useEffect(() => {
    if (!adminKey) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (adminKey) headers['x-admin-key'] = adminKey;

      const [cRes, oRes] = await Promise.all([
        fetch(apiUrl('/api/customers'), { headers }),
        fetch(apiUrl('/api/orders/all'), { headers })
      ]);

      if (!cRes.ok) {
        if (cRes.status === 401) throw new Error('Admin key invalid or required');
        throw new Error('Unable to fetch customers');
      }
      if (!oRes.ok) {
        if (oRes.status === 401) throw new Error('Admin key invalid or required');
        throw new Error('Unable to fetch orders');
      }

      setCustomers(await cRes.json());
      setOrders(await oRes.json());
    } catch (err) {
      setError(formatError(err));
      if (err instanceof Error && err.message.toLowerCase().includes('admin key')) {
        localStorage.removeItem('nikskart-admin-key');
        setAdminKey(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveKey = () => {
    try {
      localStorage.setItem('nikskart-admin-key', inputKey);
      setAdminKey(inputKey);
      setInputKey('');
    } catch {
      setError('Unable to save key locally');
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('nikskart-admin-key');
    setAdminKey(null);
    setOrders([]);
    setCustomers([]);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!adminKey) return setError('Admin key missing');
    try {
      const res = await fetch(apiUrl(`/api/orders/${id}/status`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      const updated: OrderData = await res.json();
      setOrders((current) => current.map((o) => (o.id === updated.id ? updated : o)));
    } catch (e) {
      setError(formatError(e));
    }
  };

  if (!adminKey) {
    return (
      <main className="page-content">
        <div className="auth-panel">
          <h1>Admin Login</h1>
          <p>Enter your admin key to access the dashboard.</p>
          <div className="auth-form">
            <input
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveKey()}
              placeholder="Admin key"
              type="password"
            />
            <button className="primary-button" onClick={saveKey} type="button">
              Enter Dashboard
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="secondary-button" onClick={loadData} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button className="text-button" onClick={logoutAdmin}>Sign out</button>
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}

      <div className="dashboard-grid">
        <section className="panel customers-panel">
          <h2>Customers ({customers.length})</h2>
          <ul className="customer-list">
            {customers.map((c) => (
              <li key={c.email}>
                <strong>{c.name}</strong>
                <div>{c.email}</div>
                <div>{c.orderCount} order(s) · last: {new Date(c.lastOrderAt).toLocaleString()}</div>
              </li>
            ))}
            {customers.length === 0 && !loading && <li>No customers yet.</li>}
          </ul>
        </section>

        <section className="panel orders-panel">
          <h2>Orders ({orders.length})</h2>
          <div className="orders-list">
            {orders.map((o) => (
              <div key={o.id} className="admin-order">
                <div className="order-meta">
                  <strong>{o.userName}</strong> · {o.userEmail}
                  <div>{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="order-items">
                  {o.items.slice(0, 3).map((it) => (
                    <div key={it.id}>{it.name} ×{it.quantity}</div>
                  ))}
                </div>
                <div className="order-actions">
                  <div>₹{o.grandTotal}</div>
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
            {orders.length === 0 && !loading && <div>No orders yet.</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
