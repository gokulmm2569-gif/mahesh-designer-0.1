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
    <header className="top-right-brand-container">
      <Link
        to="/"
        className="navbar-brand"
        aria-label="Mahesh Designer Home"
        onClick={(e) => handleNavClick(e, 'hero')}
        data-cursor="MD"
      >
        <div className="navbar-brand-logo">
          MD
        </div>
        <div className="navbar-brand-text">
          <span className="navbar-brand-name">
            Mahesh<span style={{ color: 'var(--clr-gold)' }}>.</span>
          </span>
          <span className="navbar-brand-tagline">MODERN INDIAN COUTURE</span>
        </div>
      </Link>
      <div className="brand-bottom-line"></div>
    </header>
  );
}
