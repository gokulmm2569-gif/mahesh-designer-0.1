import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoSegmentPlayer from '../interactive/VideoSegmentPlayer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FASHION_CATEGORIES = [
  {
    num: '01',
    title: 'Traditional',
    subtitle: 'Rooted in heritage',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'HERITAGE',
    img: '/images/Screenshot%202026-08-26%20122048.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '02',
    title: 'Modern',
    subtitle: 'Cut for now',
    target: 'collections',
    isCustom: false,
    tag: 'NOW',
    img: '/images/Screenshot%202026-08-26%20121947.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '03',
    title: 'Bridal',
    subtitle: 'For the beginning',
    target: 'collections',
    isCustom: false,
    tag: 'COUTURE',
    img: '/images/780070284_18100128413578086_122324511139491431_n.jpg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '04',
    title: 'Custom',
    subtitle: 'Made around you',
    target: 'atelier',
    isCustom: true,
    tag: 'BESPOKE',
    img: '/images/Screenshot%202026-08-26%20115803.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'STUDIO'
  },
  {
    num: '05',
    title: 'The Bespoke Drape',
    subtitle: 'Ruby red & floral craft',
    target: 'atelier',
    isCustom: false,
    tag: 'COUTURE',
    img: '/images/Screenshot%202026-08-26%20122156.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '06',
    title: 'Imperial Velvet',
    subtitle: 'Royal blue crop top & lehenga',
    target: 'collections',
    isCustom: false,
    tag: 'STUDIO',
    img: '/images/Screenshot%202026-08-26%20122249.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '07',
    title: 'The Quiet Ceremony',
    subtitle: 'Handcrafted heirloom silks',
    target: 'collections',
    isCustom: false,
    tag: 'CEREMONY',
    img: '/images/Screenshot_26-8-2026_115914_www.instagram.com.jpeg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '08',
    title: 'Traditional Occasion',
    subtitle: 'Kanjeevaram & zari filigree',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'WEAVES',
    img: '/images/771757318_18098730095578086_4773276763468998885_n.jpg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '09',
    title: 'Modern Wardrobe',
    subtitle: 'Bespoke tailoring & drape',
    target: 'atelier',
    isCustom: false,
    tag: 'ATELIER',
    img: '/images/Screenshot%202026-08-26%20122438.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'STUDIO'
  },
  {
    num: '10',
    title: 'Lines of Inheritance',
    subtitle: 'Heritage archive weave',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'ARCHIVE',
    img: '/images/Screenshot_26-8-2026_115639_www.instagram.com.jpeg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '11',
    title: 'Zardozi Embroidery',
    subtitle: 'Gold wire & needlework',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'CRAFT',
    img: '/images/Screenshot_26-8-2026_115413_www.instagram.com.jpeg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '12',
    title: 'Kanchipuram Silk',
    subtitle: 'Pure woven luster',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'SILK',
    img: '/images/770387738_18098593040578086_6478356792783263711_n.jpg',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  },
  {
    num: '13',
    title: 'Atelier Brocade',
    subtitle: 'Hand-embroidered texture',
    target: 'atelier',
    isCustom: false,
    tag: 'ATELIER',
    img: '/images/Screenshot%202026-08-26%20122320.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'STUDIO'
  },
  {
    num: '14',
    title: 'Micro Velvet',
    subtitle: 'Structured silhouette',
    target: 'atelier',
    isCustom: false,
    tag: 'TEXTURE',
    img: '/images/Screenshot%202026-08-26%20122355.png',
    href: 'https://www.instagram.com/_mahesh_designers_/?hl=en',
    cursor: 'DISCOVER'
  }
];

const SELECTED_COLLECTIONS = [
  {
    id: 1,
    index: '01',
    title: 'The Quiet Ceremony',
    tag: 'Bridal / 2026',
    img: '/images/780070284_18100128413578086_122324511139491431_n.jpg',
    videoSrc: '/videos/bridal-blouse-1113.mp4',
    slug: 'bridal-wear',
    stagger: false,
    aspect: 'portrait'
  },
  {
    id: 2,
    index: '02',
    title: 'Lines of Inheritance',
    tag: 'Traditional / 2025',
    img: '/images/Screenshot%202026-08-26%20122048.png',
    videoSrc: '/videos/featured-lehenga-87768.mp4',
    slug: 'designer-blouses',
    stagger: true,
    aspect: 'square'
  },
  {
    id: 3,
    index: '03',
    title: 'Lavender & Pistachio Drape',
    tag: 'Modern / 2026',
    img: '/images/Screenshot%202026-08-26%20121947.png',
    videoSrc: '/videos/atelier-97057.mp4',
    slug: 'sarees',
    stagger: false,
    aspect: 'portrait'
  }
];

const SERVICES = [
  {
    num: '01',
    name: 'Custom clothing',
    target: 'atelier',
    isRouter: false,
    tag: 'STUDIO',
    cursor: 'CUSTOM',
    previewImg: '/images/Screenshot%202026-08-26%20115803.png'
  },
  {
    num: '02',
    name: 'Bridal and wedding wear',
    target: 'collections',
    isRouter: false,
    tag: 'CEREMONY',
    cursor: 'BRIDAL',
    previewImg: '/images/Screenshot_26-8-2026_115914_www.instagram.com.jpeg'
  },
  {
    num: '03',
    name: 'Traditional occasion wear',
    target: 'craftsmanship',
    isRouter: false,
    tag: 'WEAVES',
    cursor: 'HERITAGE',
    previewImg: '/images/771757318_18098730095578086_4773276763468998885_n.jpg'
  },
  {
    num: '04',
    name: 'Modern wardrobe design',
    target: 'atelier',
    isRouter: false,
    tag: 'ATELIER',
    cursor: 'COUTURE',
    previewImg: '/images/Screenshot%202026-08-26%20122438.png'
  }
];

export default function CollectionsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const quoteRef = useRef(null);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);

  const handlePrevCategory = () => {
    setActiveCategory((prev) => (prev > 0 ? prev - 1 : FASHION_CATEGORIES.length - 1));
  };

  const handleNextCategory = () => {
    setActiveCategory((prev) => (prev < FASHION_CATEGORIES.length - 1 ? prev + 1 : 0));
  };

  // GSAP 3 + ScrollTrigger Curtain Reveal & Continuous Parallax Scrub
  useEffect(() => {
    const ctx = gsap.context(() => {
      const collectionCards = document.querySelectorAll('.selected-work-card');
      collectionCards.forEach((card) => {
        const imgWrap = card.querySelector('.selected-work-img-wrap');
        const mediaImg = card.querySelector('.selected-work-img');

        // 1. Curtain Mask Wipe & Scale Animation (Triggered at 80% viewport)
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            {
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              scale: 1.15
            },
            {
              clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
              scale: 1.0,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        // 2. Subtle Parallax Scrub synced to scroll progress (yPercent: -15)
        if (mediaImg) {
          gsap.to(mediaImg, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // IntersectionObserver to trigger Quote Section Entrance Animation live on viewport scroll
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuoteVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll images periodically unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Category Strip / Spatial Interactive Nodes (14-Card Continuous Marquee Gallery) */}
      <section className="category-strip-section" aria-label="Fashion categories">
        <div className="container">
          <div className="category-marquee-wrapper">
            <div className="category-marquee-track">
              {/* Primary Group (Cards 01-14) */}
              <div className="category-marquee-group">
                {FASHION_CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategory === idx;
                  return (
                    <a
                      key={`primary-${cat.num}`}
                      href={cat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`category-strip-item group ${cat.isCustom ? 'is-custom-highlight' : ''} ${isActive ? 'is-active' : ''}`}
                      aria-label={`Visit ${cat.title} Collection on Instagram`}
                      data-cursor={cat.cursor}
                      onClick={() => setActiveCategory(idx)}
                      onMouseEnter={() => setActiveCategory(idx)}
                    >
                      {/* Full-Bleed Fashion Image Container with Subtle Horizontal Motion */}
                      <div className="category-strip-media">
                        <img
                          src={cat.img}
                          alt={cat.title}
                          className="category-strip-img"
                          loading="lazy"
                        />
                        {/* Deep Forest Green & Dark Gradient Scrim */}
                        <div className="category-strip-scrim" />
                      </div>

                      {/* Top Badge Row */}
                      <div className="category-strip-top">
                        <span className="category-strip-mono-ghost" aria-hidden="true" />
                        <span className={`category-strip-pill ${cat.isCustom ? 'gold' : ''}`}>
                          {cat.tag}
                        </span>
                      </div>

                      {/* Bottom Editorial Content Overlay */}
                      <div className="category-strip-bottom">
                        <div className="category-strip-meta">
                          <span className="category-strip-mono">{cat.num}</span>
                          <h3 className="category-strip-title">{cat.title}</h3>
                          <p className="category-strip-subtitle">{cat.subtitle}</p>
                        </div>
                        <div className="category-strip-arrow-wrap">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="category-strip-arrow"
                          >
                            <path d="M7 7h10v10"></path>
                            <path d="M7 17 17 7"></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Seamless Infinite Duplication Group (Cards 01-14) */}
              <div className="category-marquee-group" aria-hidden="true">
                {FASHION_CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategory === idx;
                  return (
                    <a
                      key={`clone-${cat.num}`}
                      href={cat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex="-1"
                      className={`category-strip-item group ${cat.isCustom ? 'is-custom-highlight' : ''} ${isActive ? 'is-active' : ''}`}
                      aria-label={`Visit ${cat.title} Collection on Instagram`}
                      data-cursor={cat.cursor}
                      onClick={() => setActiveCategory(idx)}
                      onMouseEnter={() => setActiveCategory(idx)}
                    >
                      {/* Full-Bleed Fashion Image Container with Subtle Horizontal Motion */}
                      <div className="category-strip-media">
                        <img
                          src={cat.img}
                          alt={cat.title}
                          className="category-strip-img"
                          loading="lazy"
                        />
                        {/* Deep Forest Green & Dark Gradient Scrim */}
                        <div className="category-strip-scrim" />
                      </div>

                      {/* Top Badge Row */}
                      <div className="category-strip-top">
                        <span className="category-strip-mono-ghost" aria-hidden="true" />
                        <span className={`category-strip-pill ${cat.isCustom ? 'gold' : ''}`}>
                          {cat.tag}
                        </span>
                      </div>

                      {/* Bottom Editorial Content Overlay */}
                      <div className="category-strip-bottom">
                        <div className="category-strip-meta">
                          <span className="category-strip-mono">{cat.num}</span>
                          <h3 className="category-strip-title">{cat.title}</h3>
                          <p className="category-strip-subtitle">{cat.subtitle}</p>
                        </div>
                        <div className="category-strip-arrow-wrap">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="category-strip-arrow"
                          >
                            <path d="M7 7h10v10"></path>
                            <path d="M7 17 17 7"></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Editorial Pagination Controls (14 Indicators) */}
          <div className="category-pagination-row" aria-label="Category pagination">
            <button
              type="button"
              className="category-nav-btn prev"
              onClick={handlePrevCategory}
              aria-label="Previous category"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="m12 19-7-7 7-7"></path>
              </svg>
            </button>

            <div className="category-pagination-dots" role="tablist" aria-label="Category slides">
              {FASHION_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.num}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === idx}
                  aria-label={`Go to slide ${cat.num}: ${cat.title}`}
                  className={`category-pagination-dot ${activeCategory === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(idx)}
                />
              ))}
            </div>

            <button
              type="button"
              className="category-nav-btn next"
              onClick={handleNextCategory}
              aria-label="Next category"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Selected Work / The Collection Grid */}
      <section className="selected-work-section" id="collections" aria-label="The Collection">
        <div className="container">
          <div className="selected-work-header">
            <div>
              <p className="section-eyebrow-accent">Selected work</p>
              <h2 className="selected-work-title">The collection.</h2>
            </div>
            <Link
              to="/products"
              className="view-all-link"
              data-cursor="ATELIER"
            >
              <span>View all work</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </Link>
          </div>

          <div className="selected-work-grid">
            {SELECTED_COLLECTIONS.map((item) => (
              <article
                key={item.id}
                className={`selected-work-card ${item.stagger ? 'stagger-card' : ''}`}
                data-cursor="EXPLORE"
              >
                <a
                  href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Mahesh Designers on Instagram"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="selected-work-img-wrap">
                    {item.videoSrc ? (
                      <VideoSegmentPlayer
                        src={item.videoSrc}
                        poster={item.img}
                        className="selected-work-img"
                      />
                    ) : (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="selected-work-img"
                        loading="lazy"
                      />
                    )}
                    {/* Subtle Spatial Hover Card Scrim */}
                    <div className="selected-work-hover-overlay">
                      <span className="selected-work-hover-tag">OPEN LOOKBOOK</span>
                    </div>
                    {/* Index Indicator */}
                    <div className="selected-work-card-idx">{item.index}</div>
                  </div>
                  <div className="selected-work-meta-row">
                    <p className="selected-work-tag">{item.tag}</p>
                  </div>
                  <h3 className="selected-work-name">{item.title}</h3>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. A Practice in Detail Quote Banner & Cinematic Couture Scissors Page Cut Transition */}
      <div className={`couture-cut-stage ${isQuoteVisible ? 'is-cutting-active' : ''}`}>
        {/* Couture Tailoring Scissors SVG Animated Runner */}
        <div className="couture-scissors-runner" aria-hidden="true">
          <svg className="couture-scissors-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="blade-top">
              <circle cx="18" cy="30" r="14" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
              <path d="M28 36 L85 48 L40 50 Z" fill="url(#silverGrad)" stroke="#A0A0A0" strokeWidth="0.8" />
            </g>
            <g className="blade-bottom">
              <circle cx="18" cy="70" r="14" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
              <path d="M28 64 L85 52 L40 50 Z" fill="url(#silverGrad)" stroke="#A0A0A0" strokeWidth="0.8" />
            </g>
            <circle cx="40" cy="50" r="3.5" fill="#D4AF37" stroke="#07261E" strokeWidth="1" />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F3E5AB" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B38F24" />
              </linearGradient>
              <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E0E0E0" />
                <stop offset="100%" stopColor="#999999" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Animated Fabric Seam Cut Line */}
        <div className="couture-cut-seam-line" aria-hidden="true">
          <div className="cut-spark-line" />
        </div>

        <section 
          ref={quoteRef} 
          className={`practice-quote-section ${isQuoteVisible ? 'is-visible' : ''}`} 
          id="about"
        >
          <div className="container">
            <div className="practice-quote-grid">
              <div className="practice-quote-sidebar">
                <p className="practice-quote-eyebrow">A practice in detail</p>
                <div className="practice-quote-mark" aria-hidden="true">“</div>
                <div className="practice-quote-line" aria-hidden="true" />
              </div>
              <div className="practice-quote-content">
                <h2 className="practice-quote-heading">
                  The most personal thing you can wear is a sense of self.
                </h2>
                <p className="practice-quote-subtext">
                  From the first sketch to the final fitting, every Mahesh piece is built through conversation, craft, and a belief that elegance should feel like you.
                </p>
                <Link
                  to="/custom-stitching"
                  className="practice-quote-cta magnetic-btn"
                  data-cursor="CONNECT"
                >
                  <span>Start a conversation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow-icon">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. How We Work / Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="services-grid">
            <div className="services-intro">
              <p className="section-eyebrow-accent">How we work</p>
              <h2 className="services-main-title">Made for your moment.</h2>
              <a
                href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="services-preview-dock" 
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Visit Mahesh Designers on Instagram"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                {/* Layered Crossfade Slides Container */}
                <div className="services-preview-track">
                  {SERVICES.map((srv, idx) => (
                    <div 
                      key={srv.num} 
                      className={`services-preview-slide ${activeService === idx ? 'is-active' : ''}`}
                    >
                      <img
                        src={srv.previewImg}
                        alt={srv.name}
                        className="services-preview-img"
                        loading="lazy"
                      />
                      <div className="services-slide-overlay">
                        <span className="services-slide-badge">{srv.num} / {srv.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Indicators */}
                <div className="services-dock-footer">
                  <div className="services-dock-dots">
                    {SERVICES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveService(idx);
                        }}
                        className={`services-dock-dot ${activeService === idx ? 'active' : ''}`}
                        aria-label={`Show ${SERVICES[idx].name}`}
                      />
                    ))}
                  </div>
                </div>
              </a>
            </div>

            <div 
              className="services-list-wrap"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {SERVICES.map((srv, idx) => {
                const isActive = activeService === idx;

                return (
                  <a
                    key={srv.num}
                    href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`service-row-item group ${isActive ? 'active-row' : ''}`}
                    onMouseEnter={() => setActiveService(idx)}
                    aria-label={`View ${srv.name} on Instagram`}
                    data-cursor={srv.cursor}
                  >
                    <div className="service-left">
                      <span className="service-mono-num">{srv.num}</span>
                      <span className="service-name">{srv.name}</span>
                    </div>
                    <div className="service-right">
                      <span className="service-status-tag">{srv.tag}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-row-arrow">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
