import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shipping_name: user?.full_name || '',
    shipping_mobile: user?.mobile || '',
    shipping_address: user?.address || '',
    shipping_city: user?.city || '',
    shipping_state: user?.state || '',
    shipping_pincode: user?.pincode || '',
    payment_method: 'online',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const formatPrice = (p) => `₹${parseFloat(p || 0).toLocaleString('en-IN')}`;
  const getItemPrice = (item) => item.product?.discount_price || item.product?.original_price || 0;
  const getPrimaryImg = (item) => {
    const imgs = item.product?.images || [];
    return imgs.find((i) => i.is_primary)?.image_url || imgs[0]?.image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100';
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      setError('Your shopping bag is empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await ordersAPI.place(form);
      await clearCart();
      navigate('/orders', { state: { newOrderId: res.data.id, orderNumber: res.data.order_number } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const isFreeShipping = cartTotal >= 5000;
  const shippingFee = isFreeShipping ? 0 : 250;
  const grandTotal = cartTotal + shippingFee;

  return (
    <main style={{ paddingBottom: 'var(--space-20)' }}>
      {/* Header Banner */}
      <div style={{ background: 'var(--clr-alabaster)', padding: 'var(--space-10) 0', borderBottom: '1px solid var(--clr-border)', marginBottom: 'var(--space-10)' }}>
        <div className="container">
          <div className="section-eyebrow">Atelier Checkout</div>
          <h1 className="section-title">Complete Your Order</h1>
        </div>
      </div>

      <div className="container">
        {error && (
          <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: '#FFEBEE', color: '#C62828', marginBottom: 'var(--space-6)', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 'var(--space-10)', alignItems: 'flex-start' }}>
            {/* Left: Shipping & Tailoring Instructions */}
            <div>
              {/* Shipping Address */}
              <div style={{ background: '#FFFFFF', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)', marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-6)' }}>
                  1. Shipping & Delivery Address
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-name">Recipient Full Name</label>
                    <input id="checkout-name" name="shipping_name" type="text" className="form-input" value={form.shipping_name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-mobile">Contact Mobile Number</label>
                    <input id="checkout-mobile" name="shipping_mobile" type="tel" className="form-input" value={form.shipping_mobile} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                  <label className="form-label" htmlFor="checkout-address">Delivery Address / Landmark</label>
                  <textarea id="checkout-address" name="shipping_address" className="form-input" rows={3} value={form.shipping_address} onChange={handleChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-city">City</label>
                    <input id="checkout-city" name="shipping_city" type="text" className="form-input" value={form.shipping_city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-state">State</label>
                    <input id="checkout-state" name="shipping_state" type="text" className="form-input" value={form.shipping_state} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="checkout-pincode">Pincode</label>
                    <input id="checkout-pincode" name="shipping_pincode" type="text" className="form-input" value={form.shipping_pincode} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Tailoring & Custom Stitching Instructions */}
              <div style={{ background: '#FFFFFF', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)', marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-2)' }}>
                  2. Special Tailoring & Delivery Notes
                </h2>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginBottom: 'var(--space-4)' }}>
                  Enter any bespoke measurement notes, event date requirements, or sleeve adjustments.
                </p>
                <textarea
                  name="notes"
                  className="form-input"
                  rows={3}
                  placeholder="e.g. Please add extra margin on blouse, bridal date is 15th next month..."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              {/* Payment Method */}
              <div style={{ background: '#FFFFFF', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)' }}>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-6)' }}>
                  3. Payment Method
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <label
                    style={{
                      border: `2px solid ${form.payment_method === 'online' ? 'var(--clr-emerald)' : 'var(--clr-border)'}`,
                      background: form.payment_method === 'online' ? 'var(--clr-emerald-soft)' : '#FFFFFF',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="online"
                        checked={form.payment_method === 'online'}
                        onChange={handleChange}
                      />
                      <strong style={{ color: 'var(--clr-emerald-dark)' }}>💳 Online Payment / UPI</strong>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginLeft: 22 }}>
                      Instant secure checkout via UPI, Cards, Netbanking
                    </span>
                  </label>

                  <label
                    style={{
                      border: `2px solid ${form.payment_method === 'cod' ? 'var(--clr-emerald)' : 'var(--clr-border)'}`,
                      background: form.payment_method === 'cod' ? 'var(--clr-emerald-soft)' : '#FFFFFF',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={form.payment_method === 'cod'}
                        onChange={handleChange}
                      />
                      <strong style={{ color: 'var(--clr-emerald-dark)' }}>📦 Cash on Delivery</strong>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginLeft: 22 }}>
                      Pay upon doorstep delivery
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div style={{ background: '#FFFFFF', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-gold-border)', position: 'sticky', top: 100, boxShadow: 'var(--shadow-md)' }}>
              <div className="section-eyebrow" style={{ color: 'var(--clr-gold-dark)' }}>Order Bag</div>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-4)' }}>
                Order Summary ({cartItems.length} items)
              </h3>

              <div style={{ maxHeight: 260, overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--clr-border-light)' }}>
                    <img src={getPrimaryImg(item)} alt="" style={{ width: 50, height: 60, objectFit: 'cover', borderRadius: 'var(--radius-xs)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--clr-emerald-dark)' }}>{item.product?.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>Size: {item.size_label} · Qty: {item.quantity}</div>
                      <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--clr-emerald)', marginTop: 2 }}>
                        {formatPrice(parseFloat(getItemPrice(item)) * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', borderTop: '1px solid var(--clr-border)', paddingTop: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Items Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Express Insured Shipping:</span>
                  <span style={{ color: isFreeShipping ? '#2E7D32' : 'inherit' }}>{isFreeShipping ? 'FREE' : '₹250.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--clr-emerald-dark)', borderTop: '1px solid var(--clr-border)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: 'var(--clr-emerald)' }}>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                id="place-order-btn"
                type="submit"
                className="btn btn-gold w-full btn-lg"
                style={{ marginTop: 'var(--space-6)' }}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Placing Your Order...' : `✨ Confirm & Place Order (${formatPrice(grandTotal)})`}
              </button>

              <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', textAlign: 'center' }}>
                🔒 256-Bit SSL Encrypted & Insured Checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
