import { useEffect, useState } from 'react';

interface Customer {
  email: string;
  name: string;
  orderCount: number;
  lastOrderAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  _id: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
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
    try {
      return localStorage.getItem('nikskart-admin-key');
    } catch {
      return null;
    }
  });
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminKey) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (adminKey) headers['x-admin-key'] = adminKey;

      const [cRes, oRes] = await Promise.all([
        fetch('/api/customers', { headers }),
        fetch('/api/orders/all', { headers })
      ]);

      if (!cRes.ok) {
        if (cRes.status === 401) throw new Error('Admin key invalid or required');
        throw new Error('Unable to fetch customers');
      }
      if (!oRes.ok) {
        if (oRes.status === 401) throw new Error('Admin key invalid or required');
        throw new Error('Unable to fetch orders');
      }

      const cJson = await cRes.json();
      const oJson = await oRes.json();
      setCustomers(cJson);
      setOrders(oJson);
    } catch (err: any) {
      setError(err.message || 'Load failed');
      // if auth error, clear stored key
      if (err.message && err.message.toLowerCase().includes('admin key')) {
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
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setOrders((current) => current.map((o) => (o._id === updated._id ? updated : o)));
    } catch (e: any) {
      setError(e.message || 'Unable to update');
    }
  };

  if (!adminKey) {
    return (
      <main className="page-content">
        <div className="auth-panel">
          <h1>Admin Login</h1>
          <p>Enter your admin key to access the dashboard.</p>
          <div className="auth-form">
            <input value={inputKey} onChange={(e) => setInputKey(e.target.value)} placeholder="Admin key" />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-button" onClick={saveKey} type="button">Save Key</button>
              <button className="text-button" onClick={() => setInputKey('')} type="button">Clear</button>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content admin-dashboard">
      <div className="dashboard-grid">
        <section className="panel customers-panel">
          <h2>Customers</h2>
          <p>{customers.length} customers</p>
          <ul className="customer-list">
            {customers.map((c) => (
              <li key={c.email}>
                <strong>{c.name}</strong>
                <div>{c.email}</div>
                <div>{c.orderCount} orders • last: {new Date(c.lastOrderAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel orders-panel">
          <h2>Orders</h2>
          <p>{orders.length} orders</p>
          <div className="orders-list">
            {orders.map((o) => (
              <div key={o._id} className="admin-order">
                <div className="order-meta">
                  <strong>{o.userName}</strong> • {o.userEmail}
                  <div>{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="order-items">
                  {o.items.slice(0, 3).map((it) => (
                    <div key={it.id}>{it.name} x{it.quantity}</div>
                  ))}
                </div>
                <div className="order-actions">
                  <div>₹{o.grandTotal}</div>
                  <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
