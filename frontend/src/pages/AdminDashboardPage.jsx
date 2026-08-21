import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Overview KPI', icon: '📊' },
  { key: 'products', label: 'Couture Products', icon: '👗' },
  { key: 'stitching', label: 'Custom Stitching Orders', icon: '✂️' },
  { key: 'categories', label: 'Categories', icon: '🗂' },
  { key: 'orders', label: 'All Orders', icon: '📦' },
  { key: 'customers', label: 'Client CRM', icon: '👤' },
  { key: 'reviews', label: 'Reviews & Feedback', icon: '⭐' },
];

function StatCard({ label, value, icon, badge }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
        {badge && <span className="badge badge-gold">{badge}</span>}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    category_id: '',
    description: '',
    original_price: '',
    discount_price: '',
    fabric_type: 'Pure Silk',
    embroidery_type: 'Aari with Zari',
    fabric_color: 'Crimson Red',
    stock: 10,
    is_featured: false,
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }
    loadSection('dashboard');
  }, []);

  const loadSection = async (section) => {
    setActive(section);
    setLoading(true);
    try {
      switch (section) {
        case 'dashboard':
          const ds = await adminAPI.dashboard();
          setStats(ds.data);
          break;
        case 'products':
          const ps = await adminAPI.listProducts();
          setProducts(ps.data);
          const csList = await adminAPI.listCategories();
          setCategories(csList.data);
          break;
        case 'stitching':
        case 'orders':
          const os = await adminAPI.listOrders();
          setOrders(os.data);
          break;
        case 'categories':
          const cs = await adminAPI.listCategories();
          setCategories(cs.data);
          break;
        case 'customers':
          const cus = await adminAPI.listCustomers();
          setCustomers(cus.data);
          break;
        case 'reviews':
          const rs = await adminAPI.listReviews();
          setReviews(rs.data);
          break;
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const toast = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!confirm(`Archive product "${name}"?`)) return;
    await adminAPI.deleteProduct(id);
    setProducts((p) => p.filter((x) => x.id !== id));
    toast(`Product "${name}" archived.`);
  };

  const handleUpdateOrderStatus = async (id, status) => {
    await adminAPI.updateOrder(id, { status });
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
    toast('Order status updated.');
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newProduct).forEach((k) => {
        if (newProduct[k] !== '' && newProduct[k] !== null) {
          formData.append(k, newProduct[k]);
        }
      });
      await adminAPI.createProduct(formData);
      toast('✓ New bridal product created!');
      setShowAddProductModal(false);
      loadSection('products');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create product');
    }
  };

  const formatPrice = (p) => `₹${parseFloat(p || 0).toLocaleString('en-IN')}`;
  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin Navigation">
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--clr-gold-border)' }}>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-gold-light)' }}>
            MAHESH DESIGNER
          </div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.7)', marginTop: 2 }}>
            Atelier Executive Portal
          </div>
        </div>

        <div style={{ padding: 'var(--space-4) 0' }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.key}
              id={`admin-nav-${item.key}`}
              className={`admin-nav-item ${active === item.key ? 'active' : ''}`}
              onClick={() => loadSection(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: 'var(--space-6)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            className="btn btn-outline-gold w-full btn-sm"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            🚪 Logout & Exit
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="admin-main">
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', background: '#FFFFFF', padding: 'var(--space-4) var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)' }}>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)' }}>
            {NAV_ITEMS.find((n) => n.key === active)?.icon} {NAV_ITEMS.find((n) => n.key === active)?.label}
          </h1>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', fontWeight: 600 }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {message && (
          <div style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-sm)', background: 'var(--clr-emerald-soft)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-6)', fontWeight: 700 }}>
            {message}
          </div>
        )}

        {loading && <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading atelier data...</div>}

        {/* ── 1. KPI Overview ── */}
        {!loading && active === 'dashboard' && stats && (
          <div>
            <div className="stat-grid" style={{ marginBottom: 'var(--space-8)' }}>
              <StatCard label="Total Revenue" value={formatPrice(stats.total_revenue)} icon="💰" badge="Live" />
              <StatCard label="Total Orders" value={stats.total_orders} icon="📦" />
              <StatCard label="Active Creations" value={stats.total_products} icon="👗" />
              <StatCard label="Client Base" value={stats.total_customers} icon="👤" />
              <StatCard label="Pending Fulfillment" value={stats.pending_orders} icon="⏳" />
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', border: '1px solid var(--clr-gold-border)', textAlign: 'center' }}>
              <div className="section-eyebrow" style={{ color: 'var(--clr-gold-dark)' }}>Executive Command Center</div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', margin: 'var(--space-2) 0' }}>
                Mahesh Designer Bridal Operations
              </h2>
              <p style={{ color: 'var(--clr-slate)', fontSize: 'var(--text-sm)', maxWidth: 600, margin: '0 auto var(--space-6)' }}>
                Manage boutique catalog, inspect custom stitching measurement sheets, fulfill client orders, and oversee artisan assignments.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
                <button className="btn btn-gold btn-sm" onClick={() => loadSection('products')}>
                  Manage Products
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => loadSection('stitching')}>
                  View Stitching Queue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. Products Manager ── */}
        {!loading && active === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)' }}>Total {products.length} products in catalog</span>
              <button className="btn btn-gold btn-sm" onClick={() => setShowAddProductModal(true)}>
                + Add New Couture Design
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product & Fabric</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--clr-emerald-dark)' }}>{p.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)' }}>
                          {p.fabric_type} · {p.embroidery_type}
                        </div>
                      </td>
                      <td>{p.category?.name || '—'}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--clr-emerald)' }}>
                          {formatPrice(p.discount_price || p.original_price)}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${p.stock <= 5 ? 'badge-danger' : 'badge-emerald'}`}>
                          {p.stock} units {p.stock <= 5 ? '(Low)' : ''}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" style={{ color: '#b91c1c' }} onClick={() => handleDeleteProduct(p.id, p.name)}>
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 3. Custom Stitching Requests ── */}
        {!loading && (active === 'stitching' || active === 'orders') && (
          <div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Destination</th>
                  <th>Items & Notes</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Fulfillment Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td><strong>{o.order_number}</strong><div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>{formatDate(o.created_at)}</div></td>
                    <td><div>{o.shipping_name}</div><div style={{ fontSize: '11px', color: 'var(--clr-slate)' }}>{o.shipping_mobile}</div></td>
                    <td>{o.shipping_city}, {o.shipping_state}</td>
                    <td>
                      {o.items?.map((it) => (
                        <div key={it.id} style={{ fontSize: 'var(--text-xs)' }}>
                          • {it.product_name} (Size: {it.size_label})
                        </div>
                      ))}
                      {o.notes && (
                        <div style={{ fontSize: '10px', color: 'var(--clr-gold-dark)', marginTop: 2, fontStyle: 'italic' }}>
                          ✂️ Note: "{o.notes}"
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--clr-emerald)' }}>{formatPrice(o.final_amount)}</td>
                    <td><span className="badge badge-gold">{o.status}</span></td>
                    <td>
                      <select
                        className="form-input"
                        style={{ padding: '4px 8px', fontSize: 'var(--text-xs)' }}
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                      >
                        {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                          <option key={s} value={s}>{s.toUpperCase()}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── 4. Categories ── */}
        {!loading && active === 'categories' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td><code>{c.slug}</code></td>
                  <td>{c.description || '—'}</td>
                  <td><span className={`badge ${c.is_active ? 'badge-success' : 'badge-danger'}`}>{c.is_active ? 'Active' : 'Inactive'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── 5. Client CRM ── */}
        {!loading && active === 'customers' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.full_name}</td>
                  <td>{c.email}</td>
                  <td>{c.mobile || '—'}</td>
                  <td>{c.city || '—'}</td>
                  <td>{formatDate(c.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── 6. Reviews ── */}
        {!loading && active === 'reviews' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product ID</th>
                <th>Rating</th>
                <th>Review Text</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700 }}>{r.user_name}</td>
                  <td>#{r.product_id}</td>
                  <td style={{ color: 'var(--clr-gold)' }}>{'★'.repeat(r.rating)}</td>
                  <td>{r.review_text}</td>
                  <td><span className="badge badge-success">Approved</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add Product Modal */}
        {showAddProductModal && (
          <div className="modal">
            <div className="overlay" onClick={() => setShowAddProductModal(false)} />
            <div className="modal-box" style={{ maxWidth: 640, padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)' }}>
                  Add New Bridal / Couture Outfit
                </h2>
                <button onClick={() => setShowAddProductModal(false)} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleCreateProduct}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-input" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slug</label>
                    <input type="text" className="form-input" required value={newProduct.slug} onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" required value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock Quantity</label>
                    <input type="number" className="form-input" required value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Original Price (₹)</label>
                    <input type="number" step="0.01" className="form-input" required value={newProduct.original_price} onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Discount Price (₹)</label>
                    <input type="number" step="0.01" className="form-input" value={newProduct.discount_price} onChange={(e) => setNewProduct({ ...newProduct, discount_price: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Fabric</label>
                    <input type="text" className="form-input" value={newProduct.fabric_type} onChange={(e) => setNewProduct({ ...newProduct, fabric_type: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Workmanship</label>
                    <input type="text" className="form-input" value={newProduct.embroidery_type} onChange={(e) => setNewProduct({ ...newProduct, embroidery_type: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Color</label>
                    <input type="text" className="form-input" value={newProduct.fabric_color} onChange={(e) => setNewProduct({ ...newProduct, fabric_color: e.target.value })} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-input" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} />
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label">Description</label>
                  <textarea rows={3} className="form-input" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowAddProductModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gold">Create Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
