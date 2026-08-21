import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_BADGES = {
  pending: { label: 'Pending Atelier Review', cls: 'badge-gold' },
  confirmed: { label: 'Confirmed & In Stitching', cls: 'badge-emerald' },
  processing: { label: 'Hand Embroidery in Progress', cls: 'badge-sage' },
  shipped: { label: 'Shipped via Express Courier', cls: 'badge-gold' },
  delivered: { label: 'Delivered', cls: 'badge-success' },
  cancelled: { label: 'Cancelled', cls: 'badge-danger' },
};

export default function OrderHistoryPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const newOrderNumber = location.state?.orderNumber;

  useEffect(() => {
    if (!isAuthenticated) return;
    ordersAPI
      .list()
      .then((r) => setOrders(r.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const formatPrice = (p) => `₹${parseFloat(p || 0).toLocaleString('en-IN')}`;
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  if (!isAuthenticated) {
    return (
      <main style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔐</div>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-3xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-4)' }}>
            Client Account Access
          </h1>
          <p style={{ color: 'var(--clr-slate)', marginBottom: 'var(--space-6)' }}>
            Please sign in to view your bespoke couture orders and tracking details.
          </p>
          <Link to="/login" className="btn btn-gold btn-lg">
            Sign In to Account
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div style={{ background: 'var(--clr-alabaster)', padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--clr-border)', marginBottom: 'var(--space-10)' }}>
        <div className="container">
          <div className="section-eyebrow">Client Portal</div>
          <h1 className="section-title" style={{ textAlign: 'left' }}>My Orders & Tailoring Status</h1>
          <p style={{ color: 'var(--clr-slate)', fontSize: 'var(--text-base)', marginTop: 'var(--space-2)' }}>
            Logged in as <strong>{user?.full_name}</strong> ({user?.email})
          </p>
        </div>
      </div>

      <div className="container">
        {/* Success Alert */}
        {newOrderNumber && (
          <div style={{ background: 'var(--clr-emerald-soft)', border: '1.5px solid var(--clr-emerald)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', marginBottom: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem' }}>✨</span>
            <div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-emerald-dark)', fontWeight: 700 }}>
                Order Placed Successfully!
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-emerald-dark)' }}>
                Order Reference <strong>{newOrderNumber}</strong> is confirmed. Our atelier team will begin cutting and stitching.
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center" style={{ padding: 'var(--space-16)', color: 'var(--clr-slate)' }}>
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', background: '#FFFFFF', padding: 'var(--space-16)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📦</div>
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-2)' }}>
              No orders found yet
            </h2>
            <p style={{ color: 'var(--clr-slate)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              Explore our bridal collections or try custom dress stitching today.
            </p>
            <Link to="/products" className="btn btn-gold">
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {orders.map((o) => {
              const statusInfo = STATUS_BADGES[o.status] || { label: o.status, cls: 'badge-gold' };
              return (
                <div key={o.id} style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  {/* Order Top Bar */}
                  <div style={{ background: 'var(--clr-alabaster)', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--clr-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order Number: </span>
                      <strong style={{ color: 'var(--clr-emerald-dark)', fontSize: 'var(--text-sm)' }}>{o.order_number}</strong>
                      <span style={{ margin: '0 8px', color: 'var(--clr-slate)' }}>•</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)' }}>Placed on {formatDate(o.created_at)}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                      <span className={`badge ${statusInfo.cls}`}>{statusInfo.label}</span>
                      <span style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--clr-emerald)' }}>
                        {formatPrice(o.final_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: 'var(--space-6)' }}>
                    {o.items?.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--clr-border-light)' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--clr-emerald-dark)', fontSize: 'var(--text-sm)' }}>
                            {item.product_name}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginTop: 2 }}>
                            Size / Cut: <span className="badge badge-sage" style={{ fontSize: '10px' }}>{item.size_label}</span> · Qty: {item.quantity}
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--clr-emerald)', fontSize: 'var(--text-sm)' }}>
                          {formatPrice(item.subtotal)}
                        </div>
                      </div>
                    ))}

                    {/* Shipping Address Recap */}
                    <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      <div>
                        <strong>Shipping Destination:</strong> {o.shipping_name}, {o.shipping_address}, {o.shipping_city}, {o.shipping_state} - {o.shipping_pincode} (Tel: {o.shipping_mobile})
                      </div>
                      <div>
                        <strong>Payment:</strong> <span style={{ textTransform: 'uppercase' }}>{o.payment_method}</span> ({o.payment_status})
                      </div>
                    </div>

                    {o.notes && (
                      <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--clr-gold-dark)', fontStyle: 'italic' }}>
                        ✂️ Custom Tailoring Note: "{o.notes}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
