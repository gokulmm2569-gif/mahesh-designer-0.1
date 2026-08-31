import { useState, useEffect, useRef } from 'react';
import CoutureScissorsCutSection from '../interactive/CoutureScissorsCutSection';

const HERO_LOOKS = [
  {
    id: 1,
    title: 'The Quiet Ceremony',
    tagline: 'Bridal / 2026',
    desc: 'Handcrafted zardozi borders and heirloom silks designed for the modern ceremony.',
    img: '/images/Screenshot_26-8-2026_115914_www.instagram.com.jpeg',
    studioTag: 'Studio / 01',
    categorySlug: 'bridal-wear',
    accentColor: '#8B1E2D', // Mahesh Royal Crimson Red
  },
  {
    id: 2,
    title: 'Lines of Inheritance',
    tagline: 'Traditional / 2025',
    desc: 'Deep wine & sage green Kanjeevaram weaves re-imagined with structural symmetry and gold filigree.',
    img: '/images/780070284_18100128413578086_122324511139491431_n.jpg',
    studioTag: 'Atelier / 02',
    categorySlug: 'designer-blouses',
    accentColor: '#3A0D18', // Deep Velvet Wine
  },
  {
    id: 3,
    title: 'Imperial Velvet & Champagne',
    tagline: 'Modern / 2026',
    desc: 'Royal velvet blue embroidered crop top paired with champagne silver zari flared lehenga.',
    img: '/images/Screenshot%202026-08-26%20122249.png',
    studioTag: 'Couture / 03',
    categorySlug: 'reception-gowns',
    accentColor: '#176B55', // Deep Emerald Accent
  },
  {
    id: 4,
    title: 'The Bespoke Drape',
    tagline: 'Couture / 2026',
    desc: 'Ruby red dupatta paired with pastel floral embroidered skirt collar detailing.',
    img: '/images/Screenshot%202026-08-26%20122156.png',
    studioTag: 'Couture / 04',
    categorySlug: 'customized-outfits',
    accentColor: '#C9A227', // Warm Antique Gold
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

  // Couture Silhouette Line-Art Scroll Reveal Progress Hook
  const [lineDrawProgress, setLineDrawProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const rawProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setLineDrawProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-editorial-section" id="hero" aria-label="Mahesh Designer Editorial Showcase">
      {/* Background Architectural Ambient Grid Lines */}
      <div className="hero-ambient-grid" aria-hidden="true">
        <div className="hero-grid-line line-v1" />
        <div className="hero-grid-line line-v2" />
        <div className="hero-grid-line line-h1" />
      </div>

      {/* Left Couture Garment Silhouette Line-Art Sketch (Ambient Scroll Reveal Layer) */}
      <div className="hero-couture-lineart" aria-hidden="true">
        <svg viewBox="0 0 200 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-lineart-svg">
          <path
            d="M100 20 C110 25 125 35 120 50 C115 65 105 75 110 90 C115 105 135 120 145 150 C155 180 160 220 165 270 C170 320 175 380 180 430 M100 20 C90 25 75 35 80 50 C85 65 95 75 90 90 C85 105 65 120 55 150 C45 180 40 220 35 270 C30 320 25 380 20 430 M85 50 C100 55 115 50 115 50 M75 90 C100 98 125 90 125 90 M65 140 C100 152 135 140 135 140 M50 210 C100 228 150 210 150 210 M38 290 C100 312 162 290 162 290 M25 370 C100 395 175 370 175 370"
            stroke="var(--clr-gold)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="1200"
            style={{
              strokeDashoffset: `${1200 * (1 - lineDrawProgress)}`
            }}
          />
        </svg>
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

              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-vercel-secondary magnetic-btn"
                data-cursor="PRODUCTS"
              >
                <span>View Products</span>
              </a>
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
                  <a
                    href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Mahesh Designers on Instagram"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  >
                    <img
                      src={look.img}
                      alt={look.title}
                      className="hero-portrait-img"
                      loading="lazy"
                    />
                  </a>
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
