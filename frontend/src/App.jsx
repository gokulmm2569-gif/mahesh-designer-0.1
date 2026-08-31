import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import CustomCursor from './components/interactive/CustomCursor';
import AmbientCanvas from './components/interactive/AmbientCanvas';
import PageRevealLoader from './components/interactive/PageRevealLoader';
import HomePage from './pages/HomePage';
import CoutureScissorExperience from './pages/CoutureScissorExperience';
import ProductsPage from './pages/ProductsPage';
import CustomStitchingPage from './pages/CustomStitchingPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function StoreLayout({ children }) {
  return (
    <div className="page-wrapper">
      <AmbientCanvas />
      <CustomCursor />
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <PageRevealLoader onComplete={() => setLoaderDone(true)} />
      )}
      <Routes>
        {/* Public Store Routes */}
        <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />
        <Route path="/couture-experience" element={<CoutureScissorExperience />} />
        <Route path="/products" element={<StoreLayout><ProductsPage /></StoreLayout>} />
        <Route path="/custom-stitching" element={<StoreLayout><CustomStitchingPage /></StoreLayout>} />
        <Route path="/wishlist" element={<StoreLayout><WishlistPage /></StoreLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Customer Routes */}
        <Route path="/checkout" element={<StoreLayout><ProtectedRoute><CheckoutPage /></ProtectedRoute></StoreLayout>} />
        <Route path="/orders" element={<StoreLayout><ProtectedRoute><OrderHistoryPage /></ProtectedRoute></StoreLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}



