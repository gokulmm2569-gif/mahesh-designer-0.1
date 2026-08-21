import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => JSON.parse(localStorage.getItem('md_user') || 'null'));
  const [token, setToken]     = useState(() => localStorage.getItem('md_token') || null);
  const [loading, setLoading] = useState(false);

  const storeSession = (accessToken, userData) => {
    localStorage.setItem('md_token', accessToken);
    localStorage.setItem('md_user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
  };

  const formatError = (err, fallback) => {
    const detail = err.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) {
      return detail.map(d => d.msg || d.message || `${d.loc?.slice(-1)[0]}: invalid input`).join(', ');
    }
    return err.response?.data?.message || err.message || fallback;
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authAPI.login(credentials);
      storeSession(res.data.access_token, res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, error: formatError(err, 'Invalid credentials. Please try again.') };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authAPI.register(data);
      storeSession(res.data.access_token, res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, error: formatError(err, 'Registration failed. Please check your details.') };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('md_token');
    localStorage.removeItem('md_user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
