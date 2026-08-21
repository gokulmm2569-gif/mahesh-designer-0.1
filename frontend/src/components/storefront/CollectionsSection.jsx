import { Link, useNavigate } from 'react-router-dom';

const FASHION_CATEGORIES = [
  {
    title: 'Traditional',
    subtitle: 'Rooted in heritage',
    slug: 'sarees',
    categoryQuery: 'sarees'
  },
  {
    title: 'Modern',
    subtitle: 'Cut for now',
    slug: 'party-wear',
    categoryQuery: 'party-wear'
  },
  {
    title: 'Bridal',
    subtitle: 'For the beginning',
    slug: 'bridal-wear',
    categoryQuery: 'bridal-wear'
  },
  {
    title: 'Custom',
    subtitle: 'Made around you',
    slug: 'custom-stitching',
    isCustom: true
  }
];

const SELECTED_COLLECTIONS = [
  {
    id: 1,
    title: 'The Quiet Ceremony',
    tag: 'Bridal / 2026',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000',
    slug: 'bridal-wear',
    stagger: false,
  },
  {
    id: 2,
    title: 'Lines of Inheritance',
    tag: 'Traditional / 2025',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000',
    slug: 'designer-blouses',
    stagger: true,
  },
  {
    id: 3,
    title: 'Afterlight',
    tag: 'Modern / 2025',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000',
    slug: 'sarees',
    stagger: false,
  }
];

export default function CollectionsSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. Category Strip (matching mahesh-designer-lake.vercel.app) */}
      <section className="category-strip-section" aria-label="Fashion categories">
        <div className="container">
          <div className="category-strip-grid">
            {FASHION_CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.title}
                to={cat.isCustom ? '/custom-stitching' : `/products?category=${cat.categoryQuery}`}
                className="category-strip-item group"
              >
                <div>
                  <h3 className="category-strip-title">{cat.title}</h3>
                  <p className="category-strip-subtitle">{cat.subtitle}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-strip-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>
            ))}
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
            <Link to="/products" className="view-all-link">
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
                onClick={() => navigate(`/products?category=${item.slug}`)}
              >
                <div className="selected-work-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="selected-work-img"
                    loading="lazy"
                  />
                </div>
                <p className="selected-work-tag">{item.tag}</p>
                <h3 className="selected-work-name">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. A Practice in Detail Quote Banner (Emerald & Gold) */}
      <section className="practice-quote-section" id="about">
        <div className="container">
          <div className="practice-quote-grid">
            <p className="practice-quote-eyebrow">A practice in detail</p>
            <div>
              <h2 className="practice-quote-heading">
                The most personal thing you can wear is a sense of self.
              </h2>
              <p className="practice-quote-subtext">
                From the first sketch to the final fitting, every Mahesh piece is built through conversation, craft, and a belief that elegance should feel like you.
              </p>
              <Link to="/custom-stitching" className="practice-quote-cta">
                <span>Start a conversation</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Work / Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="services-grid">
            <div>
              <p className="section-eyebrow-accent">How we work</p>
              <h2 className="services-main-title">Made for your moment.</h2>
            </div>

            <div className="services-list-wrap">
              <Link to="/custom-stitching" className="service-row-item group">
                <div className="service-left">
                  <span className="service-mono-num">01</span>
                  <span className="service-name">Custom clothing</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-row-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>

              <Link to="/products?category=bridal-wear" className="service-row-item group">
                <div className="service-left">
                  <span className="service-mono-num">02</span>
                  <span className="service-name">Bridal and wedding wear</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-row-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>

              <Link to="/products?category=sarees" className="service-row-item group">
                <div className="service-left">
                  <span className="service-mono-num">03</span>
                  <span className="service-name">Traditional occasion wear</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-row-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>

              <Link to="/products?category=party-wear" className="service-row-item group">
                <div className="service-left">
                  <span className="service-mono-num">04</span>
                  <span className="service-name">Modern wardrobe design</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-row-arrow">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
