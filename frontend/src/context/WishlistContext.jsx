import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistIds, setWishlistIds]     = useState(new Set());

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) { setWishlistItems([]); setWishlistIds(new Set()); return; }
    try {
      const res = await wishlistAPI.get();
      setWishlistItems(res.data);
      setWishlistIds(new Set(res.data.map((w) => w.product_id)));
    } catch {
      setWishlistItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) return { success: false, error: 'Please log in to save favourites' };
    try {
      const res = await wishlistAPI.toggle(productId);
      await fetchWishlist();
      return { success: true, ...res.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Wishlist error' };
    }
  };

  const isWishlisted = (productId) => wishlistIds.has(productId);
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, isWishlisted, toggleWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
