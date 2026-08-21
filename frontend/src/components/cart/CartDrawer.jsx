import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cartItems, cartOpen, cartTotal, setCartOpen, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate(isAuthenticated ? '/checkout' : '/login');
  };

  const formatPrice = (p) => `₹${parseFloat(p || 0).toLocaleString('en-IN')}`;
  const getItemPrice = (item) => item.product?.discount_price || item.product?.original_price || 0;
  const getPrimaryImage = (item) => {
    const imgs = item.product?.images || [];
    return imgs.find((i) => i.is_primary)?.image_url || imgs[0]?.image_url || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200';
  };

  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'BRIDAL10' || couponCode.toUpperCase() === 'MAHESH') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try "BRIDAL10" for 10% boutique savings.');
    }
  };

  const discountAmount = couponApplied ? cartTotal * 0.1 : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div className="overlay drawer-overlay" onClick={() => setCartOpen(false)} aria-hidden="true" />
      )}

      {/* Slide-out Drawer */}
      <aside id="cart-drawer" className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!cartOpen}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '1.2rem' }}>🛍</span>
            <h2 className="cart-drawer-title">Shopping Bag ({cartItems.length})</h2>
          </div>
          <button
            id="cart-close-btn"
            style={{ color: 'var(--clr-gold-light)', fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={() => setCartOpen(false)}
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ background: 'var(--clr-emerald-soft)', padding: 'var(--space-3) var(--space-6)', borderBottom: '1px solid var(--clr-border)' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--clr-emerald-dark)', display: 'flex', justifyContent: 'space-between' }}>
            <span>
              {cartTotal >= freeShippingThreshold
                ? '🎉 You have qualified for Free Express Shipping!'
                : `Add ${formatPrice(freeShippingThreshold - cartTotal)} more for Free Express Shipping`}
            </span>
          </div>
          <div style={{ width: '100%', height: 4, background: 'rgba(13, 59, 46, 0.15)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
            <div style={{ width: `${freeShippingProgress}%`, height: '100%', background: 'var(--clr-gold)', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Body Items */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-6)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-4)' }}>👗</div>
              <p style={{ color: 'var(--clr-emerald-dark)', fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                Your shopping bag is empty
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginTop: 'var(--space-2)', lineHeight: 1.6 }}>
                Discover our royal bridal blouses, lehengas, or create a custom stitched outfit.
              </p>
              <button
                className="btn btn-gold btn-sm"
                style={{ marginTop: 'var(--space-6)' }}
                onClick={() => {
                  setCartOpen(false);
                  navigate('/products');
                }}
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={getPrimaryImage(item)}
                  alt={item.product?.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200';
                  }}
                />
                <div className="cart-item-details">
                  <div>
                    <div className="cart-item-name">{item.product?.name}</div>
                    <div className="cart-item-meta" style={{ marginTop: 2 }}>
                      <span className="badge badge-sage" style={{ fontSize: '10px', padding: '2px 6px' }}>
                        Size: {item.size_label}
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      id={`cart-qty-dec-${item.id}`}
                      onClick={() => (item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      id={`cart-qty-inc-${item.id}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      id={`cart-remove-${item.id}`}
                      onClick={() => removeItem(item.id)}
                      style={{ marginLeft: 'auto', fontSize: '11px', color: '#b91c1c' }}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>

                  <div style={{ marginTop: 'var(--space-2)', fontWeight: 800, color: 'var(--clr-emerald)', fontSize: 'var(--text-sm)' }}>
                    {formatPrice(parseFloat(getItemPrice(item)) * item.quantity)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Promo Code (e.g. BRIDAL10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', fontSize: 'var(--text-xs)' }}
              />
              <button type="submit" className="btn btn-outline btn-sm">Apply</button>
            </form>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
            </div>
            {couponApplied && (
              <div className="cart-summary-row" style={{ color: '#2E7D32' }}>
                <span>Bridal Discount (10%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Express Insured Shipping</span>
              <span style={{ color: cartTotal >= freeShippingThreshold ? '#2E7D32' : 'var(--clr-slate)' }}>
                {cartTotal >= freeShippingThreshold ? 'FREE' : '₹250.00'}
              </span>
            </div>

            <div className="cart-summary-total">
              <span>Grand Total</span>
              <span style={{ color: 'var(--clr-emerald)' }}>{formatPrice(finalTotal + (cartTotal >= freeShippingThreshold ? 0 : 250))}</span>
            </div>

            <button id="cart-checkout-btn" className="btn btn-gold w-full btn-lg" style={{ marginTop: 'var(--space-4)' }} onClick={handleCheckout}>
              Proceed to Secure Checkout →
            </button>
            <button id="cart-clear-btn" className="btn btn-ghost w-full btn-sm" style={{ marginTop: 'var(--space-2)', fontSize: '11px', color: 'var(--clr-slate)' }} onClick={clearCart}>
              Clear Bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
