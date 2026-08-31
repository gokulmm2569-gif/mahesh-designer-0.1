import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  return (
    <header className="luxury-glass-navbar" id="site-header">
      <div className="container navbar-inner-container">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Mahesh Designer Home"
          onClick={(e) => handleNavClick(e, 'hero')}
          data-cursor="MD"
        >
          <div className="navbar-brand-logo">MD</div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">
              Mahesh<span style={{ color: 'var(--clr-gold)' }}>.</span>
            </span>
            <span className="navbar-brand-tagline">MODERN INDIAN COUTURE</span>
          </div>
        </Link>

        {/* Editorial Nav Links */}
        <nav className="navbar-nav-links" aria-label="Main Navigation">
          <a
            href="#collections"
            onClick={(e) => handleNavClick(e, 'collections')}
            className="nav-link"
            data-cursor="VIEW"
          >
            The Collection
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="nav-link"
            data-cursor="PHILOSOPHY"
          >
            Philosophy
          </a>
          <a
            href="#craftsmanship"
            onClick={(e) => handleNavClick(e, 'craftsmanship')}
            className="nav-link"
            data-cursor="CRAFT"
          >
            Craftsmanship
          </a>
          <a
            href="#atelier"
            onClick={(e) => handleNavClick(e, 'atelier')}
            className="nav-link"
            data-cursor="STUDIO"
          >
            Live Atelier
          </a>
        </nav>

        {/* Bespoke Concierge Action CTA */}
        <div className="navbar-action-wrap">
          <a
            href="https://www.instagram.com/_mahesh_designers_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-concierge-btn"
            aria-label="Visit Mahesh Designers on Instagram"
            data-cursor="BOOK"
          >
            <span>Book Consultation</span>
            <span className="gold-arrow">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

