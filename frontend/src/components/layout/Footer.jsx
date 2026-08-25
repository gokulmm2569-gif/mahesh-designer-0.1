import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer" aria-label="Mahesh Designer Boutique Footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Overview */}
          <div>
            <div className="footer-brand-title">MAHESH DESIGNER</div>
            <div className="section-tag light" style={{ marginBottom: 'var(--space-3)', color: 'var(--clr-gold-light)' }}>
              ✦ Bespoke Dress Stitching & Bridal Couture
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(253, 251, 247, 0.75)', lineHeight: 1.7, maxWidth: 360, marginBottom: 'var(--space-6)' }}>
              Empowering brides, fashion enthusiasts, and connoisseurs worldwide through precision-tailored custom dress stitching, artisanal Aari embroidery, and authentic Kanjivaram silk weaves.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--clr-gold-light)', fontSize: 'var(--text-sm)' }}>
              <span>✦ Master Aari Tailors</span>
              <span>✦ 100% Pure Silk Assurance</span>
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <div className="footer-col-title">Boutique Collections</div>
            <ul className="footer-links">
              <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Bridal Wear</a></li>
              <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Designer Aari Blouses</a></li>
              <li><a href="#craftsmanship" onClick={(e) => { e.preventDefault(); document.getElementById('craftsmanship')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Pure Silk & Banarasi Sarees</a></li>
              <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Flared Couture Lehengas</a></li>
              <li><a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Kalidar Anarkalis</a></li>
              <li><a href="#atelier" onClick={(e) => { e.preventDefault(); document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="VIEW">Reception Party Wear</a></li>
            </ul>
          </div>

          {/* Digital Services */}
          <div>
            <div className="footer-col-title">Custom Tailoring</div>
            <ul className="footer-links">
              <li><Link to="/custom-stitching" data-cursor="STUDIO">🪡 Custom Stitching Studio</Link></li>
              <li><Link to="/custom-stitching" data-cursor="MEASURE">Live Measurement Matrix</Link></li>
              <li><Link to="/custom-stitching" data-cursor="EMBROIDER">Aari & Zardozi Customization</Link></li>
              <li><Link to="/orders" data-cursor="ORDERS">Order Tracking & Dispatch</Link></li>
              <li><a href="#atelier" onClick={(e) => { e.preventDefault(); document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="BLUEPRINT">Live Bespoke Tailoring Blueprint</a></li>
            </ul>
          </div>

          {/* Global Boutique & Newsletter */}
          <div>
            <div className="footer-col-title">Concierge & Updates</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(253, 251, 247, 0.75)', marginBottom: 'var(--space-3)' }}>
              Subscribe to the Mahesh Designer Bridal Journal & VIP Festive Releases.
            </p>

            {subscribed ? (
              <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', background: 'var(--clr-gold-subtle)', color: 'var(--clr-gold-light)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                ✓ Subscribed to Mahesh Designer Bridal Journal
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ background: 'rgba(253, 251, 247, 0.08)', color: 'var(--clr-ivory)', borderColor: 'rgba(212, 175, 55, 0.3)', fontSize: 'var(--text-xs)' }}
                />
                <button type="submit" className="btn btn-gold btn-sm" data-cursor="JOIN">Join</button>
              </form>
            )}

            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(253, 251, 247, 0.75)', lineHeight: 1.8 }}>
              <div>📍 128, Heritage Silk Avenue, T. Nagar, Chennai, India</div>
              <div>📞 +91 98765 43210 | ✉️ contact@maheshdesigner.com</div>
            </div>
          </div>
        </div>

        {/* Boutique Bottom Legal Bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
            <span>© {new Date().getFullYear()} Mahesh Designer Boutique. All Rights Reserved.</span>
            <Link to="/products" style={{ color: 'rgba(253,251,247,0.6)' }}>Terms of Service</Link>
            <Link to="/products" style={{ color: 'rgba(253,251,247,0.6)' }}>Privacy Policy</Link>
            <Link to="/products" style={{ color: 'rgba(253,251,247,0.6)' }}>Authenticity Guarantee</Link>
          </div>
          <span style={{ color: 'var(--clr-gold)' }}>Handcrafted With Love ✦</span>
        </div>
      </div>
    </footer>
  );
}
