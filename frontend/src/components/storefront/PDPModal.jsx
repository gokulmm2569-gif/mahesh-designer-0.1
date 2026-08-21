import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function StarRating({ rating }) {
  return (
    <div style={{ color: 'var(--clr-gold)', fontSize: '0.9rem', display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= Math.round(rating || 5) ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default function PDPModal({ product, onClose }) {
  const { addToCart, setCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [isCustomFit, setIsCustomFit] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [pincode, setPincode] = useState('600001');
  const [deliveryDate, setDeliveryDate] = useState('Aug 26 - Aug 28');

  if (!product) return null;

  const primaryImg =
    product.images?.find((i) => i.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000';

  const allImages = product.images && product.images.length > 0
    ? product.images.map(img => img.image_url)
    : [
        primaryImg,
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'
      ];

  const [activeImg, setActiveImg] = useState(primaryImg);
  const wishlisted = isWishlisted(product.id);
  const price = parseFloat(product.discount_price || product.original_price || 0);
  const origPrice = parseFloat(product.original_price || 0);
  const hasDiscount = product.discount_price && origPrice > price;
  const saving = hasDiscount ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
  const sizes = product.sizes && product.sizes.length > 0
    ? product.sizes.map((s) => s.size_label)
    : ['XS', 'S', 'M', 'L', 'XL', '2XL', 'Custom Fit'];

  const handleAddToCart = async () => {
    if (!selectedSize && !isCustomFit) {
      setMessage('Please select a size or choose Custom Fit');
      return;
    }
    setAdding(true);
    const sizeToUse = isCustomFit ? 'Custom Fit (Bespoke)' : selectedSize;
    const res = await addToCart(product.id, sizeToUse, qty);
    setAdding(false);
    if (res.success) {
      onClose();
      setCartOpen(true);
    } else {
      setMessage(res.error || 'Could not add to bag');
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/checkout');
  };

  const handleWishlist = async () => {
    const res = await toggleWishlist(product.id);
    if (!res.success) setMessage(res.error);
  };

  return (
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
        <div className="modal-box">
          <div className="modal-inner">
            {/* Gallery Column */}
            <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--clr-surface-muted)' }}>
              <div className="modal-gallery">
                <img
                  src={activeImg}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000';
                  }}
                />
                {hasDiscount && (
                  <span className="badge badge-gold" style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)' }}>
                    {saving}% OFF
                  </span>
                )}
              </div>
              {/* Thumbnail Strip */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-3)', overflowX: 'auto', background: 'var(--clr-surface)' }}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    style={{
                      width: 54,
                      height: 64,
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: activeImg === img ? '2px solid var(--clr-gold)' : '1px solid var(--clr-border)',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="product-card-category">{product.category?.name || 'Haute Couture'}</div>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-charcoal)', margin: 'var(--space-1) 0' }}>
                    {product.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  style={{ width: 36, height: 36, borderRadius: 'var(--radius-full)', background: 'var(--clr-surface-muted)', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-charcoal)' }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <StarRating rating={product.avg_rating || 5} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)' }}>
                  {product.avg_rating || 5.0} ({product.review_count || 18} client reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--clr-emerald)' }}>
                  ₹{price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span style={{ fontSize: 'var(--text-base)', color: 'var(--clr-slate-light)', textDecoration: 'line-through' }}>
                    ₹{origPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {hasDiscount && (
                  <span className="badge badge-gold">Save ₹{(origPrice - price).toLocaleString('en-IN')}</span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)', lineHeight: 1.6 }}>
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div style={{ background: 'var(--clr-surface-muted)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', border: '1px solid var(--clr-border)' }}>
                <div><strong>Fabric:</strong> {product.fabric_type || 'Pure Kanjivaram Silk'}</div>
                <div><strong>Workmanship:</strong> {product.embroidery_type || 'Artisanal Aari & Zari'}</div>
                <div><strong>Color:</strong> {product.fabric_color || 'Emerald & Antique Gold'}</div>
                <div><strong>Care:</strong> Dry Clean Only</div>
              </div>

              {/* Size Selection */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <label className="form-label" style={{ margin: 0 }}>Available Sizes</label>
                  <button
                    type="button"
                    onClick={() => setIsCustomFit(!isCustomFit)}
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-emerald)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    {isCustomFit ? '✓ Custom Sizing Enabled' : '+ Request Bespoke Stitching'}
                  </button>
                </div>

                {!isCustomFit ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`btn btn-sm ${selectedSize === s ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ border: '1.5px solid var(--clr-border)', minWidth: 48 }}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: 'var(--clr-emerald-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--clr-gold)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-emerald)', fontWeight: 700, marginBottom: 4 }}>
                      🪡 Bespoke Tailoring Add-on Selected
                    </div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter Bust, Waist, Height, or Neckline notes..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      style={{ fontSize: 'var(--text-xs)', padding: '0.5rem' }}
                    />
                  </div>
                )}
              </div>

              {/* Quantity & Delivery Estimate */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <label className="form-label" style={{ margin: 0 }}>Qty:</label>
                  <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                </div>

                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)' }}>
                  🚚 Delivery by: <strong style={{ color: 'var(--clr-emerald)' }}>{deliveryDate}</strong>
                </div>
              </div>

              {message && (
                <div style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', background: 'var(--clr-gold-subtle)', color: 'var(--clr-emerald)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  {message}
                </div>
              )}

              {/* Actions: Add to Cart & Buy Now */}
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <button
                  id="pdp-add-to-cart-btn"
                  className="btn btn-outline btn-lg"
                  style={{ flex: 1 }}
                  onClick={handleAddToCart}
                  disabled={adding}
                >
                  {adding ? 'Adding...' : '🛍 Add to Bag'}
                </button>
                <button
                  id="pdp-buy-now-btn"
                  className="btn btn-gold btn-lg"
                  style={{ flex: 1.2 }}
                  onClick={handleBuyNow}
                  disabled={adding}
                >
                  ✨ Buy Now
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={handleWishlist}
                  style={{ padding: '0 var(--space-3)', fontSize: '1.2rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-sm)' }}
                  title="Wishlist"
                >
                  {wishlisted ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

