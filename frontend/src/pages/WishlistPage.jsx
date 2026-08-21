import { useEffect } from 'react';
import ProductCard from '../components/storefront/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlistItems, fetchWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (!isAuthenticated) {
    return (
      <main style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-4)' }}>♡</div>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-3xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-4)' }}>
            Your Saved Wishlist
          </h1>
          <p style={{ color: 'var(--clr-slate)', marginBottom: 'var(--space-8)' }}>
            Sign in to save your favorite bridal blouses, lehengas, and bespoke couture designs.
          </p>
          <Link to="/login" className="btn btn-gold btn-lg">Sign In to Wishlist</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingBottom: 'var(--space-20)' }}>
      <div style={{ background: 'var(--clr-alabaster)', padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--clr-border)', marginBottom: 'var(--space-10)' }}>
        <div className="container">
          <div className="section-eyebrow">Personal Atelier</div>
          <h1 className="section-title" style={{ textAlign: 'left' }}>
            My Wishlist ({wishlistItems.length})
          </h1>
          <p style={{ color: 'var(--clr-slate)', marginTop: 'var(--space-2)' }}>
            Your curated collection of favorite designs and inspiration pieces.
          </p>
        </div>
      </div>

      <div className="container">
        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', background: '#FFFFFF', padding: 'var(--space-16)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>♡</div>
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', marginBottom: 'var(--space-2)' }}>
              No saved pieces yet
            </h2>
            <p style={{ color: 'var(--clr-slate)', marginBottom: 'var(--space-6)' }}>
              Browse our collections and tap the heart icon on any outfit to save it here.
            </p>
            <Link to="/products" id="wishlist-browse-btn" className="btn btn-gold">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistItems.map((item) => item.product && <ProductCard key={item.id} product={item.product} />)}
          </div>
        )}
      </div>
    </main>
  );
}
