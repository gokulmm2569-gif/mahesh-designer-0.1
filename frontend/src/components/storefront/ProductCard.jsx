import { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import PDPModal from './PDPModal';

function StarRating({ rating }) {
  return (
    <div style={{ color: 'var(--clr-gold)', fontSize: '0.85rem', display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= Math.round(rating || 5) ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart, setCartOpen } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  // Cover image selection
  const primaryImg =
    product.images?.find((i) => i.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85';

  const price = parseFloat(product.discount_price || product.original_price || 0);
  const origPrice = parseFloat(product.original_price || 0);
  const hasDiscount = product.discount_price && origPrice > price;
  const saving = hasDiscount ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    setAdding(true);
    const res = await addToCart(product.id, 'M', 1);
    setAdding(false);
    if (res.success) {
      setCartOpen(true);
    }
  };

  return (
    <>
      <article className="product-card" aria-label={product.name} data-cursor="VIEW">
        <div className="product-card-img-wrap" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
          <img
            src={primaryImg}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800';
            }}
          />

          {/* Badges */}
          <div className="product-card-badge">
            {hasDiscount && <span className="badge badge-gold">{saving}% OFF</span>}
            {product.is_featured && !hasDiscount && <span className="badge badge-emerald">Bespoke</span>}
          </div>

          {/* Wishlist Button */}
          <button
            id={`product-wishlist-${product.id}`}
            className={`product-card-wishlist-btn ${wishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            data-cursor="SAVE"
          >
            {wishlisted ? '♥' : '♡'}
          </button>

          {/* Hover Action Bar */}
          <div className="product-card-actions-hover">
            <button
              id={`product-card-view-${product.id}`}
              className="btn btn-outline-white btn-sm"
              style={{ flex: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              aria-label={`Quick View ${product.name}`}
              data-cursor="LOOK"
            >
              Quick View
            </button>
            <button
              id={`product-card-add-${product.id}`}
              className="btn btn-gold btn-sm"
              style={{ flex: 1 }}
              onClick={handleQuickAdd}
              disabled={adding}
              aria-label={`Add ${product.name} to bag`}
              data-cursor="ADD"
            >
              {adding ? 'Adding...' : '+ Add to Bag'}
            </button>
          </div>
        </div>

        <div className="product-card-body" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
          <div className="product-card-category">{product.category?.name || 'Haute Couture'}</div>
          <h3 className="product-card-name">{product.name}</h3>

          {product.fabric_type && (
            <div className="product-card-fabric">
              <span>🧵 {product.fabric_type}</span>
              {product.embroidery_type && <span> · {product.embroidery_type}</span>}
            </div>
          )}

          <div className="product-card-footer">
            <div>
              <span className="product-price-current">₹{price.toLocaleString('en-IN')}</span>
              {hasDiscount && (
                <span className="product-price-original">₹{origPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <StarRating rating={product.avg_rating || 5} />
              <span style={{ fontSize: 10, color: 'var(--clr-slate)', marginTop: 1 }}>
                ({product.review_count || 18} reviews)
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {showModal && <PDPModal product={product} onClose={() => setShowModal(false)} />}
    </>
  );
}
