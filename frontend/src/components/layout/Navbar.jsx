import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { cartCount, cartTotal, setCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', date: '', type: 'Bridal Blouse & Lehenga' });

  const navigate = useNavigate();
  const location = useLocation();

  // Close overlays on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname, location.search]);

  // Adjust glass elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultModalOpen(false);
      setConsultSubmitted(false);
    }, 2200);
  };

  const quickSearchTags = [
    { label: 'Bridal Aari Blouses', query: 'blouse' },
    { label: 'Kanjivaram Silk Sarees', query: 'saree' },
    { label: 'Velvet Lehengas', query: 'lehenga' },
    { label: 'Reception Gowns', query: 'gown' },
    { label: 'Kalidar Anarkali', query: 'anarkali' },
    { label: 'Custom Sizing', query: 'custom' },
  ];

  const handleNavClick = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Modern Floating Glassmorphic Header */}
      <div className="floating-navbar-container">

        <nav
          className={`navbar-floating ${scrolled ? 'scrolled' : ''}`}
          role="navigation"
          aria-label="Mahesh Designer Main Navigation"
        >
          <div className="navbar-inner">
            {/* Mobile Hamburger Toggle */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.4rem', color: 'var(--clr-emerald)', cursor: 'pointer' }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Regal Crest & Monogram Logo with Clean Text Container */}
            <Link to="/" className="navbar-brand" aria-label="Mahesh Designer Home" onClick={(e) => handleNavClick(e, 'hero')}>
              <div className="navbar-brand-logo">
                MD
              </div>
              <div className="navbar-brand-text">
                <span className="navbar-brand-name">Mahesh<span style={{ color: 'var(--clr-gold)' }}>.</span></span>
                <span className="navbar-brand-tagline">MODERN INDIAN COUTURE</span>
              </div>
            </Link>


            {/* Navigation Links */}
            <div className="navbar-nav">
              <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="nav-link-item">
                Home
              </a>

              {/* Glowing Pulse Custom Stitching Button with SVG */}
              <NavLink to="/custom-stitching" className="nav-stitching-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
                  <line x1="4" y1="21" x2="20" y2="21"/>
                </svg>
                <span>Custom Stitching</span>
              </NavLink>
            </div>

            {/* Right Action Icons & Gateway */}
            <div className="navbar-actions">
              {/* Spotlight Search Trigger */}
              <button
                id="nav-search-btn"
                className="navbar-icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search Collections"
                title="Search Spotlight"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              {/* Wishlist Heart */}
              <Link to="/wishlist" id="nav-wishlist-btn" className="navbar-icon-btn" aria-label="Wishlist" title="Saved Wishlist">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {wishlistCount > 0 && (
                  <span className="navbar-badge" aria-label={`${wishlistCount} items in wishlist`}>
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                id="nav-cart-btn"
                className="navbar-icon-btn"
                onClick={() => setCartOpen(true)}
                aria-label="Open Shopping Bag"
                title="Shopping Bag"
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 0.95rem', width: 'auto', borderRadius: 'var(--radius-full)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartTotal > 0 && (
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--clr-emerald-dark)' }}>
                    ₹{Number(cartTotal).toLocaleString('en-IN')}
                  </span>
                )}
                {cartCount > 0 && (
                  <span className="navbar-badge" aria-label={`${cartCount} items in cart`}>
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* User Account / VIP Client Gateway */}
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.45rem 0.95rem', borderRadius: 'var(--radius-full)', background: '#FFFFFF' }}
                  >
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--clr-emerald)', color: 'var(--clr-gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>
                      {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700 }}>{user?.full_name ? user.full_name.split(' ')[0] : 'Account'}</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: 220,
                      background: 'var(--clr-surface)',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--clr-gold)',
                      boxShadow: 'var(--shadow-xl)',
                      padding: 'var(--space-2)',
                      zIndex: 1100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}>
                      <div style={{ padding: 'var(--space-2) var(--space-3)', borderBottom: '1px solid var(--clr-border)', marginBottom: 2 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--clr-charcoal)' }}>{user?.full_name || 'Client'}</div>
                        <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>{user?.email}</div>
                      </div>

                      {isAdmin && (
                        <Link to="/admin" className="btn btn-primary btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => setUserDropdownOpen(false)}>
                          👑 Admin Portal
                        </Link>
                      )}
                      <Link to="/orders" className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => setUserDropdownOpen(false)}>
                        📦 Orders & Stitching Status
                      </Link>
                      <Link to="/wishlist" className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }} onClick={() => setUserDropdownOpen(false)}>
                        ♡ Saved Wishlist ({wishlistCount})
                      </Link>
                      <div style={{ height: 1, background: 'var(--clr-border)', margin: '4px 0' }} />
                      <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start', color: '#B91C1C' }}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Link to="/login" className="btn btn-outline btn-sm" id="nav-login-btn" style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1rem', fontSize: '11px', fontWeight: 700, background: '#FFFFFF' }}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-gold btn-sm" id="nav-register-btn" style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1rem', fontSize: '11px', fontWeight: 800 }}>
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>


          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div style={{
              marginTop: 'var(--space-3)',
              background: 'var(--clr-surface)',
              border: '1.5px solid var(--clr-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <a href="#hero" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
              <NavLink to="/custom-stitching" className="btn btn-gold" style={{ justifyContent: 'center', borderRadius: 'var(--radius-full)' }} onClick={() => setMobileMenuOpen(false)}>
                🪡 Launch Custom Stitching Studio
              </NavLink>
              <button onClick={() => { setMobileMenuOpen(false); setConsultModalOpen(true); }} className="btn btn-outline" style={{ justifyContent: 'center', borderRadius: 'var(--radius-full)' }}>
                📅 Book Video Fitting Session
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* 3. Immersive Spotlight Search Modal */}
      {searchOpen && (
        <div className="spotlight-overlay" onClick={() => setSearchOpen(false)}>
          <div className="spotlight-box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1.5px solid var(--clr-border)', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: '1.4rem' }}>🔍</span>
              <input
                type="search"
                placeholder="Search Bridal Lehengas, Aari Blouses, Kanjivaram Silks, Gowns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 'var(--text-lg)',
                  fontFamily: 'var(--font-functional)',
                  background: 'transparent',
                  color: 'var(--clr-charcoal)'
                }}
              />
              <button type="submit" className="btn btn-gold btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>Search</button>
              <button type="button" onClick={() => setSearchOpen(false)} style={{ fontSize: '1.3rem', color: 'var(--clr-slate)', cursor: 'pointer' }}>✕</button>
            </form>

            <div style={{ padding: 'var(--space-6)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--clr-gold-dark)', marginBottom: 'var(--space-3)' }}>
                ✦ POPULAR SEARCHES & CURATIONS
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                {quickSearchTags.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      navigate(`/products?search=${encodeURIComponent(item.query)}`);
                      setSearchOpen(false);
                    }}
                    style={{
                      background: 'var(--clr-surface-muted)',
                      border: '1px solid var(--clr-border)',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 14px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--clr-emerald)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Fast Category Visual Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
                <Link
                  to="/products?category=designer-blouses"
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'var(--clr-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
                >
                  <span style={{ fontSize: '1.3rem' }}>👘</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Aari Blouses</div>
                    <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>Starts ₹4,500</div>
                  </div>
                </Link>

                <Link
                  to="/products?category=bridal-wear"
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'var(--clr-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
                >
                  <span style={{ fontSize: '1.3rem' }}>👗</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Bridal Lehengas</div>
                    <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>Custom Stitched</div>
                  </div>
                </Link>

                <Link
                  to="/custom-stitching"
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'var(--clr-gold-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-gold)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
                >
                  <span style={{ fontSize: '1.3rem' }}>🪡</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--clr-emerald-dark)' }}>Custom Atelier</div>
                    <div style={{ fontSize: '10px', color: 'var(--clr-gold-dark)' }}>Live Quote Studio</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Book Video Fitting / Sizing Consultation Modal */}
      {consultModalOpen && (
        <div className="spotlight-overlay" onClick={() => setConsultModalOpen(false)}>
          <div className="spotlight-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{ background: 'var(--clr-emerald-dark)', color: 'var(--clr-ivory)', padding: 'var(--space-6)', position: 'relative' }}>
              <div className="section-tag light" style={{ marginBottom: 4 }}>✦ VIP STYLING CONCIERGE</div>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-gold-light)' }}>
                Book Video Measurement Session
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(253, 251, 247, 0.85)', marginTop: 2 }}>
                Connect with our master tailor via live video call for 100% precision fit guidance.
              </p>
              <button
                onClick={() => setConsultModalOpen(false)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 'var(--space-6)' }}>
              {consultSubmitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>🎉</div>
                  <h4 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-lg)', color: 'var(--clr-emerald)' }}>
                    Fitting Session Requested!
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginTop: 4 }}>
                    Our bridal atelier stylist will WhatsApp you shortly with video consultation link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Outfit & Event Date</label>
                    <select
                      className="form-input"
                      value={consultForm.type}
                      onChange={(e) => setConsultForm({ ...consultForm, type: e.target.value })}
                    >
                      <option>Bridal Aari Blouse Customization</option>
                      <option>Full Bridal Lehenga & Choli Fit</option>
                      <option>Reception Gown & Trail Sizing</option>
                      <option>Pure Kanjivaram Silk Saree Blouse</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-gold btn-lg w-full" style={{ marginTop: 'var(--space-2)' }}>
                    ✨ Confirm Consultation Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}




