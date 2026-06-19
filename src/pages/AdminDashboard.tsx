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

const CATEGORIES = ['Sarees', 'Kurtis', 'Artificial Jewellery'] as const;
type Category = typeof CATEGORIES[number];

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

  // product category sub-tab
  const [productCategory, setProductCategory] = useState<Category>('Sarees');

  // product form state (add)
  const [form, setForm] = useState({ name: '', price: '', discount: '', badge: '', description: '', rating: '4.5' });
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading]   = useState(false);
  const [uploadMsg, setUploadMsg]   = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // product edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', discount: '', badge: '', description: '', rating: '' });
  const [editMsg, setEditMsg] = useState('');

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
      const ext  = imageFile.name.split('.').pop();
      const path = `products/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from('product-images').upload(path, imageFile, { upsert: true });
      if (uploadErr) throw new Error(`Image upload failed: ${uploadErr.message}`);

      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);

      const { error: insertErr } = await supabase.from('products').insert({
        name: form.name.trim(),
        category: productCategory,
        price: Number(form.price),
        discount: form.discount.trim(),
        image: publicUrl,
        rating: Number(form.rating),
        description: form.description.trim(),
        badge: form.badge.trim(),
      });
      if (insertErr) throw new Error(`DB error: ${insertErr.message}`);

      setUploadMsg('✅ Product added successfully!');
      setForm({ name: '', price: '', discount: '', badge: '', description: '', rating: '4.5' });
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

  const startEdit = (p: ProductRow) => {
    setEditId(p.id);
    setEditForm({ name: p.name, price: String(p.price), discount: '', badge: p.badge || '', description: '', rating: '' });
    setEditMsg('');
  };

  const cancelEdit = () => { setEditId(null); setEditMsg(''); };

  const handleSaveEdit = async () => {
    if (!editId || !editForm.name || !editForm.price) {
      setEditMsg('Name and price are required.');
      return;
    }
    setEditMsg('Saving…');
    const updates: Record<string, unknown> = {
      name: editForm.name.trim(),
      price: Number(editForm.price),
    };
    if (editForm.badge.trim()) updates.badge = editForm.badge.trim();
    if (editForm.discount.trim()) updates.discount = editForm.discount.trim();
    if (editForm.description.trim()) updates.description = editForm.description.trim();
    if (editForm.rating) updates.rating = Number(editForm.rating);

    const { error: err } = await supabase.from('products').update(updates).eq('id', editId);
    if (err) { setEditMsg(`Error: ${err.message}`); return; }
    setDbProducts((cur) => cur.map((p) => p.id === editId ? { ...p, name: editForm.name, price: Number(editForm.price), badge: editForm.badge } : p));
    setEditMsg('');
    setEditId(null);
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
          {/* Category sub-tabs */}
          <div className="product-category-tabs">
            {CATEGORIES.map((cat) => {
              const count = dbProducts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`product-cat-tab${productCategory === cat ? ' active' : ''}`}
                  onClick={() => {
                    setProductCategory(cat);
                    setForm({ name: '', price: '', discount: '', badge: '', description: '', rating: '4.5' });
                    setImageFile(null);
                    setImagePreview('');
                    setUploadMsg('');
                    if (fileRef.current) fileRef.current.value = '';
                  }}
                >
                  {cat}
                  <span className="product-cat-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Upload form for active category */}
          <div className="product-category-section">
            <h2>Add {productCategory}</h2>
            <div className="product-upload-form">
              <div className="image-upload-box" onClick={() => fileRef.current?.click()}>
                {imagePreview
                  ? <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  : <div className="image-upload-placeholder"><span>📷</span><p>Click to upload image</p></div>
                }
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
              </div>

              <div className="product-form-fields">
                <label>Product Name *
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder={`e.g. ${productCategory === 'Sarees' ? 'Banarasi Silk Saree' : productCategory === 'Kurtis' ? 'Handblock Print Kurti' : 'Kundan Necklace Set'}`} />
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
                  {uploading ? 'Uploading…' : `Add to ${productCategory}`}
                </button>
                {uploadMsg && <p style={{ gridColumn: '1/-1', color: uploadMsg.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{uploadMsg}</p>}
              </div>
            </div>

            {/* Products in this category */}
            <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>
              {productCategory} ({dbProducts.filter((p) => p.category === productCategory).length})
            </h3>
            <div className="admin-product-list">
              {dbProducts.filter((p) => p.category === productCategory).map((p) => (
                <div key={p.id}>
                  <div className="admin-product-row">
                    {p.image && <img src={p.image} alt={p.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '6px' }} />}
                    <div style={{ flex: 1 }}>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>₹{p.price} · {p.badge}</div>
                    </div>
                    <button className="secondary-button" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => startEdit(p)}>Edit</button>
                    <button className="text-button" style={{ color: '#dc2626' }} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                  </div>

                  {editId === p.id && (
                    <div className="admin-edit-form">
                      <div className="admin-edit-grid">
                        <label>Name *
                          <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                        </label>
                        <label>Price (₹) *
                          <input type="number" value={editForm.price} onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))} />
                        </label>
                        <label>Badge
                          <input value={editForm.badge} onChange={(e) => setEditForm((f) => ({ ...f, badge: e.target.value }))} placeholder="e.g. New Arrival" />
                        </label>
                        <label>Discount
                          <input value={editForm.discount} onChange={(e) => setEditForm((f) => ({ ...f, discount: e.target.value }))} placeholder="e.g. 20% off" />
                        </label>
                        <label>Rating
                          <input type="number" min="1" max="5" step="0.1" value={editForm.rating} onChange={(e) => setEditForm((f) => ({ ...f, rating: e.target.value }))} placeholder="4.5" />
                        </label>
                        <label style={{ gridColumn: '1/-1' }}>Description
                          <textarea rows={2} value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} placeholder="Leave blank to keep existing" />
                        </label>
                      </div>
                      {editMsg && <p style={{ color: editMsg === 'Saving…' ? '#888' : '#dc2626', fontSize: '0.82rem', margin: '0.5rem 0 0' }}>{editMsg}</p>}
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                        <button className="primary-button" onClick={handleSaveEdit}>Save Changes</button>
                        <button className="secondary-button" onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {dbProducts.filter((p) => p.category === productCategory).length === 0 && (
                <p style={{ color: '#888', padding: '1rem 0' }}>No {productCategory} added yet. Upload your first one above.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
