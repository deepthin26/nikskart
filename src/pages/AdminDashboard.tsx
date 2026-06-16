import { useEffect, useRef, useState } from 'react';
import { apiUrl } from '../lib/api';
import { supabase } from '../lib/supabase';

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

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge: string;
}

const CATEGORIES = ['Sarees', 'Kurtis', 'Lehengas', 'Jewellery'];

export default function AdminDashboard() {
  const [customers, setCustomers]   = useState<Customer[]>([]);
  const [orders, setOrders]         = useState<OrderData[]>([]);
  const [dbProducts, setDbProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading]       = useState(false);
  const [activeTab, setActiveTab]   = useState<'orders' | 'customers' | 'products'>('orders');
  const [adminKey, setAdminKey]     = useState<string | null>(() => {
    try { return localStorage.getItem('nikskart-admin-key'); } catch { return null; }
  });
  const [inputKey, setInputKey] = useState('');
  const [error, setError]       = useState('');

  // product form state
  const [form, setForm] = useState({ name: '', category: 'Sarees', price: '', discount: '', badge: '', description: '', rating: '4.5' });
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading]   = useState(false);
  const [uploadMsg, setUploadMsg]   = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const formatError = (err: unknown) =>
    err instanceof Error ? err.message : 'Unable to load admin dashboard.';

  useEffect(() => { if (adminKey) loadData(); }, [adminKey]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json', 'x-admin-key': adminKey! };
      const [cRes, oRes] = await Promise.all([
        fetch(apiUrl('/api/customers'), { headers }),
        fetch(apiUrl('/api/orders/all'), { headers })
      ]);
      if (!cRes.ok) throw new Error(cRes.status === 401 ? 'Admin key invalid' : 'Unable to fetch customers');
      if (!oRes.ok) throw new Error(oRes.status === 401 ? 'Admin key invalid' : 'Unable to fetch orders');
      setCustomers(await cRes.json());
      setOrders(await oRes.json());
    } catch (err) {
      setError(formatError(err));
      if (formatError(err).toLowerCase().includes('invalid')) {
        localStorage.removeItem('nikskart-admin-key');
        setAdminKey(null);
      }
    } finally {
      setLoading(false);
    }
    loadProducts();
  };

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('id,name,category,price,image,badge').order('created_at', { ascending: false });
    if (data) setDbProducts(data as ProductRow[]);
  };

  const saveKey = () => {
    localStorage.setItem('nikskart-admin-key', inputKey);
    setAdminKey(inputKey);
    setInputKey('');
  };

  const logoutAdmin = () => {
    localStorage.removeItem('nikskart-admin-key');
    setAdminKey(null);
    setOrders([]); setCustomers([]);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!adminKey) return;
    try {
      const res = await fetch(apiUrl(`/api/orders/${id}/status`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      const updated: OrderData = await res.json();
      setOrders((cur) => cur.map((o) => (o.id === updated.id ? updated : o)));
    } catch (e) { setError(formatError(e)); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !imageFile) {
      setUploadMsg('Please fill in Name, Price and select an image.');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      // 1. Upload image to Supabase Storage
      const ext  = imageFile.name.split('.').pop();
      const path = `products/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from('product-images').upload(path, imageFile, { upsert: true });
      if (uploadErr) throw new Error(`Image upload failed: ${uploadErr.message}`);

      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);

      // 2. Save product row to Supabase
      const { error: insertErr } = await supabase.from('products').insert({
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        discount: form.discount.trim(),
        image: publicUrl,
        rating: Number(form.rating),
        description: form.description.trim(),
        badge: form.badge.trim(),
      });
      if (insertErr) throw new Error(`DB error: ${insertErr.message}`);

      setUploadMsg('✅ Product added successfully!');
      setForm({ name: '', category: 'Sarees', price: '', discount: '', badge: '', description: '', rating: '4.5' });
      setImageFile(null);
      setImagePreview('');
      if (fileRef.current) fileRef.current.value = '';
      loadProducts();
    } catch (err) {
      setUploadMsg(formatError(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    setDbProducts((cur) => cur.filter((p) => p.id !== id));
  };

  if (!adminKey) {
    return (
      <main className="page-content">
        <div className="auth-panel">
          <h1>Admin Login</h1>
          <p>Enter your admin key to access the dashboard.</p>
          <div className="auth-form">
            <input value={inputKey} onChange={(e) => setInputKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveKey()} placeholder="Admin key" type="password" />
            <button className="primary-button" onClick={saveKey} type="button">Enter Dashboard</button>
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
          <button className="secondary-button" onClick={loadData} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
          <button className="text-button" onClick={logoutAdmin}>Sign out</button>
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}

      {/* Tab bar */}
      <div className="admin-tabs">
        {(['orders', 'customers', 'products'] as const).map((t) => (
          <button key={t} className={`admin-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === 'orders' && ` (${orders.length})`}
            {t === 'customers' && ` (${customers.length})`}
            {t === 'products' && ` (${dbProducts.length})`}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {activeTab === 'orders' && (
        <section className="panel orders-panel">
          <div className="orders-list">
            {orders.map((o) => (
              <div key={o.id} className="admin-order">
                <div className="order-meta">
                  <strong>{o.userName}</strong> · {o.userEmail}
                  <div>{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="order-items">
                  {o.items.slice(0, 3).map((it) => <div key={it.id}>{it.name} ×{it.quantity}</div>)}
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
      )}

      {/* Customers tab */}
      {activeTab === 'customers' && (
        <section className="panel customers-panel">
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
      )}

      {/* Products tab */}
      {activeTab === 'products' && (
        <section className="panel products-panel">
          <h2>Add New Product</h2>
          <div className="product-upload-form">
            {/* Image upload */}
            <div className="image-upload-box" onClick={() => fileRef.current?.click()}>
              {imagePreview
                ? <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                : <div className="image-upload-placeholder"><span>📷</span><p>Click to upload image</p></div>
              }
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            </div>

            <div className="product-form-fields">
              <label>Product Name *
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Banarasi Silk Saree" />
              </label>
              <label>Category
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label>Price (₹) *
                <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="e.g. 2499" />
              </label>
              <label>Discount label
                <input value={form.discount} onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))} placeholder="e.g. 30% off" />
              </label>
              <label>Badge
                <input value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="e.g. New Arrival" />
              </label>
              <label>Rating (1–5)
                <input type="number" min="1" max="5" step="0.1" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} />
              </label>
              <label style={{ gridColumn: '1/-1' }}>Description
                <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Short product description" />
              </label>
              <button className="primary-button" onClick={handleAddProduct} disabled={uploading} style={{ gridColumn: '1/-1' }}>
                {uploading ? 'Uploading…' : 'Add Product'}
              </button>
              {uploadMsg && <p style={{ gridColumn: '1/-1', color: uploadMsg.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{uploadMsg}</p>}
            </div>
          </div>

          {/* Existing products */}
          <h2 style={{ marginTop: '2rem' }}>Live Products ({dbProducts.length})</h2>
          <div className="admin-product-list">
            {dbProducts.map((p) => (
              <div key={p.id} className="admin-product-row">
                {p.image && <img src={p.image} alt={p.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '6px' }} />}
                <div style={{ flex: 1 }}>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{p.category} · ₹{p.price}</div>
                </div>
                <button className="text-button" style={{ color: '#dc2626' }} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
              </div>
            ))}
            {dbProducts.length === 0 && <p style={{ color: '#888' }}>No products added yet. Add your first product above.</p>}
          </div>
        </section>
      )}
    </main>
  );
}
