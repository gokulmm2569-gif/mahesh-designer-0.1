import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/storefront/HeroSection';
import CollectionsSection from '../components/storefront/CollectionsSection';
import InteractiveFabricLens from '../components/storefront/InteractiveFabricLens';
import LiveAtelierConfigurator from '../components/storefront/LiveAtelierConfigurator';
import Footer from '../components/layout/Footer';

// Section 2 Clean Full-Screen Production View: The Collection
function CleanCollectionSection() {
  const CATEGORIES = [
    { num: '01', title: 'Traditional', subtitle: 'Kanjeevaram & Zari Weaves', tag: 'HERITAGE' },
    { num: '02', title: 'Modern', subtitle: 'Structural Velvet Capes', tag: 'CONTEMPORARY' },
    { num: '03', title: 'Bridal', subtitle: '24-Kali Flared Lehengas', tag: 'CEREMONY' },
    { num: '04', title: 'Custom', subtitle: 'Made Around Your Frame', tag: 'BESPOKE' }
  ];

  const WORKS = [
    {
      id: 1,
      title: 'The Quiet Ceremony',
      tag: 'Bridal / 2026',
      img: '/images/780070284_18100128413578086_122324511139491431_n.jpg',
      stagger: false
    },
    {
      id: 2,
      title: 'Lines of Inheritance',
      tag: 'Traditional / 2025',
      img: '/images/Screenshot_26-8-2026_115639_www.instagram.com.jpeg',
      stagger: true
    },
    {
      id: 3,
      title: 'Imperial Velvet & Champagne',
      tag: 'Modern / 2026',
      img: '/images/Screenshot%202026-08-26%20122249.png',
      stagger: false
    }
  ];

  return (
    <section className="clean-section-box bg-ivory text-neutral-900">
      <div className="container mx-auto px-8 md:px-16 py-12">
        <div className="flex justify-between items-end mb-8 border-b border-gold/20 pb-4">
          <div>
            <p className="font-mono text-xs text-gold-dark tracking-widest uppercase">02 // ARCHIVE</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-emerald-dark mt-1">The Collection.</h2>
          </div>
          <a 
            href="https://www.instagram.com/_mahesh_designers_/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit Mahesh Designers on Instagram"
            className="font-mono text-xs text-gold-dark hover:text-emerald-dark uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <span>View All Works</span>
            <span>↗</span>
          </a>
        </div>

        {/* 4-Category Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {CATEGORIES.map((c) => (
            <div key={c.num} className="p-4 rounded-xl border border-gold/30 bg-white/70 backdrop-blur-sm">
              <span className="font-mono text-xs font-bold text-gold-dark">{c.num}</span>
              <h3 className="font-serif text-lg font-bold text-emerald-dark mt-1">{c.title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{c.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 3-Column Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-8 items-start">
          {WORKS.map((w) => (
            <article 
              key={w.id} 
              className={`rounded-2xl overflow-hidden border border-gold/40 shadow-xl bg-white transition-transform duration-500 ${
                w.stagger ? 'md:translate-y-8' : ''
              }`}
            >
              <a
                href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Mahesh Designers on Instagram"
                className="block group"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-gold text-emerald-dark px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest">
                      OPEN LOOKBOOK ↗
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-gold/20">
                  <span className="font-mono text-[10px] text-gold-dark font-bold uppercase tracking-widest">{w.tag}</span>
                  <h4 className="font-serif text-base font-bold text-emerald-dark mt-0.5">{w.title}</h4>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 3 Clean Full-Screen Production View: Philosophy Quote
function CleanPhilosophySection() {
  return (
    <section className="clean-section-box bg-[#0D3829] text-ivory flex items-center justify-center">
      <div className="container mx-auto px-8 md:px-16 max-w-4xl text-center py-16">
        <span className="font-mono text-xs text-gold tracking-[0.25em] uppercase">✦ Brand Philosophy // 03</span>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight my-8">
          “The most personal thing you can wear is <span className="italic text-gold-light">a sense of self.</span>”
        </h2>
        <p className="text-ivory/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          We design in conversation. The cut of a sleeve, the fall of a pleat, the weight of silk against skin — every detail is considered, measured, and crafted by hand in our Chennai atelier.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gold/20 text-left font-mono text-xs">
          <div className="p-3 bg-emerald-dark/60 rounded-lg border border-gold/20">
            <span className="text-gold font-bold">#1</span>
            <p className="text-ivory mt-1">Custom Clothing</p>
          </div>
          <div className="p-3 bg-emerald-dark/60 rounded-lg border border-gold/20">
            <span className="text-gold font-bold">#2</span>
            <p className="text-ivory mt-1">Bridal & Wedding</p>
          </div>
          <div className="p-3 bg-emerald-dark/60 rounded-lg border border-gold/20">
            <span className="text-gold font-bold">#3</span>
            <p className="text-ivory mt-1">Traditional Occasion</p>
          </div>
          <div className="p-3 bg-emerald-dark/60 rounded-lg border border-gold/20">
            <span className="text-gold font-bold">#4</span>
            <p className="text-ivory mt-1">Modern Wardrobe</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoutureScissorExperience() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isCutting, setIsCutting] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);
  const animFrameRef = useRef(null);

  const SECTIONS = [
    { id: 1, name: '01 / HERO ATELIER', component: <HeroSection /> },
    { id: 2, name: '02 / THE COLLECTION', component: <CleanCollectionSection /> },
    { id: 3, name: '03 / BRAND PHILOSOPHY', component: <CleanPhilosophySection /> },
    { id: 4, name: '04 / CRAFTSMANSHIP LENS', component: <InteractiveFabricLens /> },
    { id: 5, name: '05 / LIVE ATELIER STUDIO', component: <LiveAtelierConfigurator /> },
    { id: 6, name: '06 / LUXURY FOOTER ARCHIVE', component: <Footer /> }
  ];

  const triggerCut = (toIndex) => {
    if (isCutting || toIndex === currentSectionIndex || toIndex < 0 || toIndex >= SECTIONS.length) return;
    setIsCutting(true);

    const startTime = performance.now();
    const duration = 2000; // 2.0s precision couture shear cut

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth couture cutting curve
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCutProgress(ease);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentSectionIndex(toIndex);
        setIsCutting(false);
        setCutProgress(0);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const handleWheel = (e) => {
    if (isCutting) return;
    if (e.deltaY > 25 && currentSectionIndex < SECTIONS.length - 1) {
      triggerCut(currentSectionIndex + 1);
    } else if (e.deltaY < -25 && currentSectionIndex > 0) {
      triggerCut(currentSectionIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCutting) return;
      if (e.code === 'ArrowDown' || e.code === 'Space' || e.code === 'PageDown') {
        e.preventDefault();
        if (currentSectionIndex < SECTIONS.length - 1) triggerCut(currentSectionIndex + 1);
      } else if (e.code === 'ArrowUp' || e.code === 'PageUp') {
        e.preventDefault();
        if (currentSectionIndex > 0) triggerCut(currentSectionIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentSectionIndex, isCutting]);

  const currentSection = SECTIONS[currentSectionIndex];
  const nextSection = SECTIONS[currentSectionIndex + 1] || null;

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-emerald-dark font-sans text-ivory select-none"
      onWheel={handleWheel}
      aria-label="Couture Scissor-Cut Section Experience"
    >
      {/* Sticky Glassmorphism Header */}
      <header className="absolute top-0 left-0 right-0 h-16 px-8 flex items-center justify-between z-50 bg-emerald-dark/80 backdrop-blur-md border-b border-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center font-serif font-bold text-gold text-xs">MD</div>
          <div>
            <span className="font-serif font-bold text-white tracking-widest text-sm">MAHESH DESIGNER</span>
            <span className="font-mono text-[9px] text-gold tracking-widest uppercase block">Haute Couture</span>
          </div>
        </div>

        {/* Section Step Status */}
        <div className="font-mono text-xs text-gold flex items-center gap-3">
          <span className="font-bold text-white text-base">0{currentSectionIndex + 1}</span>
          <span className="opacity-40">/</span>
          <span>06</span>
          <span className="text-gold-light ml-2">{currentSection.name}</span>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentSectionIndex === 0 || isCutting}
            onClick={() => triggerCut(currentSectionIndex - 1)}
            className="px-3 py-1 rounded-full border border-gold/40 text-xs font-mono text-gold-light disabled:opacity-30 hover:bg-gold hover:text-emerald-dark transition-all"
          >
            ↑ PREV
          </button>
          <button
            type="button"
            disabled={currentSectionIndex === SECTIONS.length - 1 || isCutting}
            onClick={() => triggerCut(currentSectionIndex + 1)}
            className="px-3 py-1 rounded-full border border-gold/40 text-xs font-mono text-gold-light disabled:opacity-30 hover:bg-gold hover:text-emerald-dark transition-all"
          >
            NEXT [↓]
          </button>
        </div>
      </header>

      {/* Main Physical Cut Stage */}
      <div className="absolute inset-0 pt-16 pb-12 overflow-hidden perspective-[1400px]">
        {/* UNDERNEATH SECTION (Next section resting directly below in the layout stack) */}
        {nextSection && (
          <div className="absolute inset-0 pt-16 pb-12 w-full h-full overflow-y-auto z-10">
            {nextSection.component}
          </div>
        )}

        {/* TOP SECTION UPPER HALF (Curls and peels upward as scissors cut across) */}
        <div
          className="absolute inset-0 pt-16 pb-12 w-full h-full overflow-y-auto z-20 transition-[clip-path,transform] duration-75"
          style={{
            clipPath: isCutting
              ? `polygon(0 0, 100% 0, 100% 50%, ${Math.min(100, Math.max(0, cutProgress * 105))}% 50%, 0 ${Math.max(0, 50 - cutProgress * 55)}%)`
              : 'none',
            transform: isCutting ? `translateY(${-cutProgress * 30}px) rotateX(${cutProgress * 4}deg)` : 'none'
          }}
        >
          {currentSection.component}
        </div>

        {/* TOP SECTION LOWER HALF (Curls and peels downward as scissors cut across) */}
        {isCutting && (
          <div
            className="absolute inset-0 pt-16 pb-12 w-full h-full overflow-y-auto z-20 transition-[clip-path,transform] duration-75"
            style={{
              clipPath: `polygon(0 100%, 100% 100%, 100% 50%, ${Math.min(100, Math.max(0, cutProgress * 105))}% 50%, 0 ${Math.min(100, 50 + cutProgress * 55)}%)`,
              transform: `translateY(${cutProgress * 30}px) rotateX(${-cutProgress * 4}deg)`
            }}
          >
            {currentSection.component}
          </div>
        )}

        {/* REALISTIC COUTURE SCISSORS ACTOR */}
        {isCutting && (
          <div
            className="fixed top-1/2 -translate-y-1/2 z-[100] pointer-events-none w-36 h-28 drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
            style={{ left: `calc(${cutProgress * 105}% - 40px)` }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 140 100" fill="none" className="w-full h-full">
              <g
                style={{
                  transformOrigin: '55px 50px',
                  transform: `rotate(${Math.sin(cutProgress * Math.PI * 16) * 9 - 4}deg)`
                }}
              >
                <ellipse cx="22" cy="32" rx="16" ry="12" stroke="url(#goldGradExp)" strokeWidth="4.5" fill="none" />
                <path d="M35 38 C45 42 50 48 55 50" stroke="url(#goldGradExp)" strokeWidth="5" strokeLinecap="round" />
                <path d="M55 50 L130 46 L60 53 Z" fill="url(#steelGradExp)" stroke="#8C8C8C" strokeWidth="0.8" />
              </g>
              <g
                style={{
                  transformOrigin: '55px 50px',
                  transform: `rotate(${-Math.sin(cutProgress * Math.PI * 16) * 9 + 4}deg)`
                }}
              >
                <ellipse cx="22" cy="68" rx="16" ry="12" stroke="url(#goldGradExp)" strokeWidth="4.5" fill="none" />
                <path d="M35 62 C45 58 50 52 55 50" stroke="url(#goldGradExp)" strokeWidth="5" strokeLinecap="round" />
                <path d="M55 50 L130 54 L60 47 Z" fill="url(#steelGradExp)" stroke="#8C8C8C" strokeWidth="0.8" />
              </g>
              <circle cx="55" cy="50" r="4.5" fill="url(#goldGradExp)" stroke="#07261E" strokeWidth="1.2" />
              <defs>
                <linearGradient id="goldGradExp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#AA820A" />
                </linearGradient>
                <linearGradient id="steelGradExp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#D8D8D8" />
                  <stop offset="100%" stopColor="#666666" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {/* Gold Seam Slit Line */}
        {isCutting && (
          <div
            className="fixed top-1/2 left-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent z-[95] pointer-events-none -translate-y-1/2 shadow-[0_0_12px_#D4AF37]"
            style={{ width: `${cutProgress * 100}%` }}
          />
        )}
      </div>

      {/* Footer Navigation Bar */}
      <footer className="absolute bottom-0 left-0 right-0 h-12 px-8 flex items-center justify-between z-50 bg-emerald-dark/80 backdrop-blur-md border-t border-gold/20 font-mono text-[11px] text-gold-light">
        <div className="flex items-center gap-2">
          <span>✦ SCROLL OR USE ARROW KEYS TO CUT & REVEAL</span>
        </div>
        <div className="flex items-center gap-2">
          {SECTIONS.map((sec, i) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => triggerCut(i)}
              className={`w-6 h-1 rounded-full transition-all ${
                currentSectionIndex === i ? 'bg-gold w-10 shadow-[0_0_8px_#D4AF37]' : 'bg-gold/30'
              }`}
              aria-label={`Jump to section ${i + 1}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
