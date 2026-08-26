import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HERO_LOOKS = [
  {
    id: 1,
    title: 'The Quiet Ceremony',
    tagline: 'Bridal / 2026',
    desc: 'Handcrafted zardozi borders and heirloom silks designed for the modern ceremony.',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600',
    studioTag: 'Studio / 01',
    categorySlug: 'bridal-wear',
    accentColor: '#C85A32', // Studio RHE Terracotta
  },
  {
    id: 2,
    title: 'Lines of Inheritance',
    tagline: 'Traditional / 2025',
    desc: 'Raw Kanjeevaram weaves re-imagined with structural symmetry and gold filigree.',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
    studioTag: 'Atelier / 02',
    categorySlug: 'designer-blouses',
    accentColor: '#0D3B2E', // Deep Emerald
  },
  {
    id: 3,
    title: 'Afterlight',
    tagline: 'Modern / 2025',
    desc: 'Sculpted drape sarees and fluid organza silhouettes engineered for quiet confidence.',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600',
    studioTag: 'Couture / 03',
    categorySlug: 'sarees',
    accentColor: '#9C7A3C', // Warm Antique Gold
  },
  {
    id: 4,
    title: 'The Bespoke Drape',
    tagline: 'Custom / 2026',
    desc: 'One-of-a-kind patterns tailored precisely to individual proportions and stories.',
    img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600',
    studioTag: 'Bespoke / 04',
    categorySlug: 'custom-stitching',
    accentColor: '#8C3A27', // Warm Clay
  }
];

export default function HeroSection() {
  const [activeLook, setActiveLook] = useState(0);
  const [displayedLook, setDisplayedLook] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const heroCardRef = useRef(null);
  const transitionTimerRef = useRef(null);

  // Trigger Studio RHE Curtain Shutter Wipe Transition
  const goToLook = (nextIndex) => {
    if (nextIndex === activeLook || isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setActiveLook(nextIndex);

    // Halfway through curtain wipe (when frame is fully covered): switch the active content
    setTimeout(() => {
      setDisplayedLook(nextIndex);
    }, 420);

    // When curtain wipe finishes uncovering
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const handleNext = () => {
    const next = (activeLook + 1) % HERO_LOOKS.length;
    goToLook(next);
  };

  const handlePrev = () => {
    const prev = (activeLook - 1 + HERO_LOOKS.length) % HERO_LOOKS.length;
    goToLook(prev);
  };

  // Auto-move image every 5.5s with fluid progress bar
  useEffect(() => {
    if (isPaused || isTransitioning) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 5500;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const next = (activeLook + 1) % HERO_LOOKS.length;
          goToLook(next);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, isTransitioning, activeLook]);

  // Handle 3D Parallax Mouse Move on Hero Portrait Frame
  const handleMouseMove = (e) => {
    if (!heroCardRef.current || window.innerWidth < 992) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const current = HERO_LOOKS[displayedLook];

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
              <span>INDEPENDENT FASHION ATELIER</span>
            </p>

            <h1 className="hero-main-heading">
              <span className="heading-line-1">Clothes with</span>
              <span className="heading-line-2">
                a point of <em className="heading-highlight">view.</em>
              </span>
            </h1>

            {/* Dynamic Editorial Narrative Description */}
            <div className="hero-narrative-box" key={`desc-${displayedLook}`}>
              <p className="hero-narrative-subtext hero-text-reveal">
                {current.desc}
              </p>
            </div>

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
                  onClick={() => goToLook(i)}
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

          {/* Right Column: Studio RHE Full-Bleed Curtain Shutter Frame */}
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
              {/* Studio RHE Curtain Shutter Layers */}
              <div 
                className={`hero-curtain-container ${isTransitioning ? 'curtain-active' : ''}`} 
                aria-hidden="true"
              >
                <div 
                  className="hero-curtain-layer curtain-layer-primary" 
                  style={{ backgroundColor: current.accentColor || '#C85A32' }} 
                />
                <div className="hero-curtain-layer curtain-layer-secondary" />
                <div className="hero-curtain-brand-mark">
                  <span className="curtain-brand-name">MAHESH</span>
                  <span className="curtain-look-num">0{activeLook + 1}</span>
                </div>
              </div>

              {/* Dynamic Image Canvas Layer */}
              {HERO_LOOKS.map((look, index) => (
                <div
                  key={look.id}
                  className={`hero-portrait-slide ${displayedLook === index ? 'active' : ''}`}
                >
                  <img
                    src={look.img}
                    alt={look.title}
                    className="hero-portrait-img"
                    loading="lazy"
                  />
                  <div className="hero-portrait-scrim" />
                </div>
              ))}

              {/* Floating Architectural Index Badge */}
              <div className="hero-floating-index-badge">
                <span className="floating-index-current">0{displayedLook + 1}</span>
                <span className="floating-index-sep">/</span>
                <span className="floating-index-total">0{HERO_LOOKS.length}</span>
              </div>

              {/* Interactive Navigation Chevrons */}
              <div className="hero-frame-nav">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hero-frame-nav-btn"
                  aria-label="Previous look"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hero-frame-nav-btn"
                  aria-label="Next look"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>

              {/* Minimal Bottom Tag with Kinetic Reveal */}
              <div className="hero-portrait-tag" key={`tag-${displayedLook}`}>
                <span className="hero-tag-dash" />
                <span className="hero-tag-text-animated">
                  {current.studioTag} • {current.title}
                </span>
                <span className="hero-tag-tagline">[{current.tagline}]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
