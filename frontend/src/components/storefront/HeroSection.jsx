import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HERO_LOOKS = [
  {
    id: 1,
    title: 'The Quiet Ceremony',
    tagline: 'Bridal / 2026',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600',
    studioTag: 'Studio / 01',
    categorySlug: 'bridal-wear',
  },
  {
    id: 2,
    title: 'Lines of Inheritance',
    tagline: 'Traditional / 2025',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
    studioTag: 'Atelier / 02',
    categorySlug: 'designer-blouses',
  },
  {
    id: 3,
    title: 'Afterlight',
    tagline: 'Modern / 2025',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600',
    studioTag: 'Couture / 03',
    categorySlug: 'sarees',
  }
];

export default function HeroSection() {
  const [activeLook, setActiveLook] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-move image every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveLook((prev) => (prev + 1) % HERO_LOOKS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const current = HERO_LOOKS[activeLook];

  return (
    <section className="hero-editorial-section" aria-label="Mahesh Designer Editorial Showcase">
      <div className="container">
        <div className="hero-editorial-grid">
          {/* Left Column: Bold Minimalist Editorial Narrative */}
          <div className="hero-editorial-left">
            <p className="hero-eyebrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--clr-gold)' }}>
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                <path d="M20 2v4"></path>
                <path d="M22 4h-4"></path>
                <circle cx="4" cy="20" r="2"></circle>
              </svg>
              <span>INDEPENDENT FASHION DESIGNER</span>
            </p>



            <h1 className="hero-main-heading">
              Clothes with a point of view.
            </h1>

            <p className="hero-narrative-subtext">
              Mahesh creates considered clothing where Indian craft, modern silhouette, and the person wearing it meet.
            </p>

            {/* High-Fashion Minimalist CTAs */}
            <div className="hero-cta-group">
              <Link to="/products" className="btn-vercel-primary">
                <span>Explore the work</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>

              <Link to="/custom-stitching" className="btn-vercel-secondary">
                <span>The Bespoke Studio</span>
              </Link>
            </div>

            {/* Quick Lookbook Switcher Dots */}
            <div className="hero-look-switcher">
              {HERO_LOOKS.map((look, i) => (
                <button
                  key={look.id}
                  type="button"
                  className={`hero-look-btn ${activeLook === i ? 'active' : ''}`}
                  onClick={() => setActiveLook(i)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <span className="mono-idx">0{i + 1}</span>
                  <span>{look.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Full-Bleed High-Res Auto-Moving Frame */}
          <div
            className="hero-editorial-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="hero-portrait-frame">
              {HERO_LOOKS.map((look, index) => (
                <img
                  key={look.id}
                  src={look.img}
                  alt={look.title}
                  className={`hero-portrait-img ${activeLook === index ? 'active' : ''}`}
                />
              ))}

              {/* Minimal Bottom Tag */}
              <div className="hero-portrait-tag">
                <span className="hero-tag-dash" />
                <span>{current.studioTag} • {current.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





