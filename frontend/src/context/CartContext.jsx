import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems]       = useState([]);
  const [cartOpen, setCartOpen]         = useState(false);
  const [loading, setLoading]           = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) { setCartItems([]); return; }
    try {
      const res = await cartAPI.get();
      setCartItems(res.data);
    } catch {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, sizeLabel, quantity = 1) => {
    if (!isAuthenticated) return { success: false, error: 'Please log in to add items to your cart' };
    try {
      await cartAPI.add({ product_id: productId, size_label: sizeLabel, quantity });
      await fetchCart();
      setCartOpen(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Could not add item to cart' };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.update(itemId, { quantity });
      await fetchCart();
    } catch {}
  };

  const removeItem = async (itemId) => {
    try {
      await cartAPI.remove(itemId);
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch {}
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setCartItems([]);
    } catch {}
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => {
    const price = i.product?.discount_price || i.product?.original_price || 0;
    return sum + (parseFloat(price) * i.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartOpen, loading, cartCount, cartTotal,
      setCartOpen, addToCart, updateQuantity, removeItem, clearCart, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
