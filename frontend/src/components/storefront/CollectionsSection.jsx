import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FASHION_CATEGORIES = [
  {
    num: '01',
    title: 'Traditional',
    subtitle: 'Rooted in heritage',
    target: 'craftsmanship',
    isCustom: false,
    tag: 'HERITAGE'
  },
  {
    num: '02',
    title: 'Modern',
    subtitle: 'Cut for now',
    target: 'collections',
    isCustom: false,
    tag: 'CONTEMPORARY'
  },
  {
    num: '03',
    title: 'Bridal',
    subtitle: 'For the beginning',
    target: 'collections',
    isCustom: false,
    tag: 'CEREMONY'
  },
  {
    num: '04',
    title: 'Custom',
    subtitle: 'Made around you',
    target: 'atelier',
    isCustom: false,
    tag: 'BESPOKE'
  }
];

const SELECTED_COLLECTIONS = [
  {
    id: 1,
    index: '01',
    title: 'The Quiet Ceremony',
    tag: 'Bridal / 2026',
    img: '/images/780070284_18100128413578086_122324511139491431_n.jpg',
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
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
      {/* 1. Category Strip / Spatial Interactive Nodes */}
      <section className="category-strip-section" aria-label="Fashion categories">
        <div className="container">
          <div className="category-strip-grid">
            {/* Traditional */}
            <a
              href="#craftsmanship"
              onClick={(e) => { e.preventDefault(); scrollTo('craftsmanship'); }}
              className="category-strip-item group"
              data-cursor="DISCOVER"
            >
              <div className="category-strip-top">
                <span className="category-strip-mono">01</span>
                <span className="category-strip-pill">HERITAGE</span>
              </div>
              <div className="category-strip-content">
                <h3 className="category-strip-title">Traditional</h3>
                <p className="category-strip-subtitle">Rooted in heritage</p>
              </div>
              <div className="category-strip-arrow-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-strip-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </a>

            {/* Modern */}
            <a
              href="#collections"
              onClick={(e) => { e.preventDefault(); scrollTo('collections'); }}
              className="category-strip-item group"
              data-cursor="DISCOVER"
            >
              <div className="category-strip-top">
                <span className="category-strip-mono">02</span>
                <span className="category-strip-pill">NOW</span>
              </div>
              <div className="category-strip-content">
                <h3 className="category-strip-title">Modern</h3>
                <p className="category-strip-subtitle">Cut for now</p>
              </div>
              <div className="category-strip-arrow-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-strip-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </a>

            {/* Bridal */}
            <a
              href="#collections"
              onClick={(e) => { e.preventDefault(); scrollTo('collections'); }}
              className="category-strip-item group"
              data-cursor="DISCOVER"
            >
              <div className="category-strip-top">
                <span className="category-strip-mono">03</span>
                <span className="category-strip-pill">COUTURE</span>
              </div>
              <div className="category-strip-content">
                <h3 className="category-strip-title">Bridal</h3>
                <p className="category-strip-subtitle">For the beginning</p>
              </div>
              <div className="category-strip-arrow-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-strip-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </a>

            {/* Custom */}
            <a
              href="#atelier"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('atelier');
              }}
              className="category-strip-item group is-custom-highlight"
              data-cursor="STUDIO"
            >
              <div className="category-strip-top">
                <span className="category-strip-mono">04</span>
                <span className="category-strip-pill gold">BESPOKE</span>
              </div>
              <div className="category-strip-content">
                <h3 className="category-strip-title">Custom</h3>
                <p className="category-strip-subtitle">Made around you</p>
              </div>
              <div className="category-strip-arrow-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-strip-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
            </a>
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
            <a
              href="#atelier"
              onClick={(e) => { e.preventDefault(); scrollTo('atelier'); }}
              className="view-all-link"
              data-cursor="ATELIER"
            >
              <span>View all work</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>

          <div className="selected-work-grid">
            {SELECTED_COLLECTIONS.map((item) => (
              <article
                key={item.id}
                className={`selected-work-card ${item.stagger ? 'stagger-card' : ''}`}
                onClick={() => scrollTo('atelier')}
                data-cursor="EXPLORE"
              >
                <div className="selected-work-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="selected-work-img"
                    loading="lazy"
                  />
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. A Practice in Detail Quote Banner (Emerald & Gold Editorial Showcase) */}
      <section className="practice-quote-section" id="about">
        <div className="container">
          <div className="practice-quote-grid">
            <div className="practice-quote-sidebar">
              <p className="practice-quote-eyebrow">A practice in detail</p>
              <div className="practice-quote-mark" aria-hidden="true">“</div>
            </div>
            <div className="practice-quote-content">
              <h2 className="practice-quote-heading">
                The most personal thing you can wear is a sense of self.
              </h2>
              <p className="practice-quote-subtext">
                From the first sketch to the final fitting, every Mahesh piece is built through conversation, craft, and a belief that elegance should feel like you.
              </p>
              <a
                href="#atelier"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('atelier');
                }}
                className="practice-quote-cta magnetic-btn"
                data-cursor="CONNECT"
              >
                <span>Start a conversation</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow-icon">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Work / Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="services-grid">
            <div className="services-intro">
              <p className="section-eyebrow-accent">How we work</p>
              <h2 className="services-main-title">Made for your moment.</h2>
              <div 
                className="services-preview-dock" 
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Services preview showcase"
              >
                {/* Vertical Auto-Scrolling Track */}
                <div 
                  className="services-preview-track"
                  style={{ transform: `translateY(-${activeService * (100 / SERVICES.length)}%)` }}
                >
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
                        onClick={() => setActiveService(idx)}
                        className={`services-dock-dot ${activeService === idx ? 'active' : ''}`}
                        aria-label={`Show ${SERVICES[idx].name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="services-list-wrap"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {SERVICES.map((srv, idx) => {
                const isActive = activeService === idx;
                const commonProps = {
                  className: `service-row-item group ${isActive ? 'active-row' : ''}`,
                  onMouseEnter: () => setActiveService(idx),
                  'data-cursor': srv.cursor,
                };

                const rowContent = (
                  <>
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
                  </>
                );

                if (srv.isRouter) {
                  return (
                    <Link key={srv.num} to={srv.link} {...commonProps}>
                      {rowContent}
                    </Link>
                  );
                }

                return (
                  <a
                    key={srv.num}
                    href={`#${srv.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(srv.target);
                    }}
                    {...commonProps}
                  >
                    {rowContent}
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
