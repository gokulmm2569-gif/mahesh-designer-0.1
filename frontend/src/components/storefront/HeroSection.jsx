import { useState, useEffect, useRef } from 'react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const heroCardRef = useRef(null);

  // Auto-move image every 5 seconds with fluid progress bar
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 5000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveLook((look) => (look + 1) % HERO_LOOKS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeLook]);

  // Handle 3D Parallax Mouse Move on Hero Portrait Frame
  const handleMouseMove = (e) => {
    if (!heroCardRef.current || window.innerWidth < 992) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const current = HERO_LOOKS[activeLook];

  return (
    <section className="hero-editorial-section" id="hero" aria-label="Mahesh Designer Editorial Showcase">
      {/* Background Architectural Ambient Grid Lines */}
      <div className="hero-ambient-grid" aria-hidden="true">
        <div className="hero-grid-line line-v1" />
        <div className="hero-grid-line line-v2" />
        <div className="hero-grid-line line-h1" />
      </div>

      <div className="container">
        {/* Top HUD Metadata Indicator */}
        <div className="hero-hud-header">
          <div className="hero-hud-item">
            <span className="hero-hud-dot" />
            <span className="hero-hud-text">ATELIER COUTURE SPEC // 2026</span>
          </div>
          <div className="hero-hud-item mono">
            <span>[ 13°04′N 80°14′E ] CHENNAI</span>
          </div>
        </div>

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
              <span className="heading-line-1">Clothes with</span>
              <span className="heading-line-2">
                a point of <em className="heading-highlight">view.</em>
              </span>
            </h1>

            <p className="hero-narrative-subtext">
              Mahesh creates considered clothing where Indian craft, modern silhouette, and the person wearing it meet.
            </p>

            {/* High-Fashion Minimalist CTAs */}
            <div className="hero-cta-group">
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-vercel-primary magnetic-btn"
                data-cursor="EXPLORE"
              >
                <span>Explore the work</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow-icon">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>

              <Link to="/custom-stitching" className="btn-vercel-secondary magnetic-btn" data-cursor="STUDIO">
                <span>The Bespoke Studio</span>
              </Link>
            </div>

            {/* Interactive Lookbook Switcher Dots with Animated Progress */}
            <div className="hero-look-switcher">
              {HERO_LOOKS.map((look, i) => (
                <button
                  key={look.id}
                  type="button"
                  className={`hero-look-btn ${activeLook === i ? 'active' : ''}`}
                  onClick={() => {
                    setActiveLook(i);
                    setProgress(0);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  data-cursor={`0${i + 1}`}
                >
                  <div className="look-btn-bar-wrap">
                    <div
                      className="look-btn-bar-fill"
                      style={{
                        width: activeLook === i ? `${progress}%` : activeLook > i ? '100%' : '0%'
                      }}
                    />
                  </div>
                  <span className="mono-idx">0{i + 1}</span>
                  <span className="look-title-text">{look.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Full-Bleed High-Res Auto-Moving Frame with 3D Spatial Parallax */}
          <div
            ref={heroCardRef}
            className="hero-editorial-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            data-cursor="VIEW"
          >
            <div
              className="hero-portrait-frame"
              style={{
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
              }}
            >
              {/* Dynamic Image Canvas Layer */}
              {HERO_LOOKS.map((look, index) => (
                <div
                  key={look.id}
                  className={`hero-portrait-slide ${activeLook === index ? 'active' : ''}`}
                >
                  <img
                    src={look.img}
                    alt={look.title}
                    className="hero-portrait-img"
                  />
                  <div className="hero-portrait-scrim" />
                </div>
              ))}

              {/* Floating Architectural Index Badge */}
              <div className="hero-floating-index-badge">
                <span className="floating-index-current">0{activeLook + 1}</span>
                <span className="floating-index-sep">/</span>
                <span className="floating-index-total">0{HERO_LOOKS.length}</span>
              </div>

              {/* Minimal Bottom Tag */}
              <div className="hero-portrait-tag">
                <span className="hero-tag-dash" />
                <span>{current.studioTag} • {current.title}</span>
                <span className="hero-tag-tagline">[{current.tagline}]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
