import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/storefront/ProductCard';
import { productsAPI, categoriesAPI } from '../services/api';
import { SAMPLE_PRODUCTS } from '../services/sampleData';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
];

const FABRIC_TYPES = ['Pure Silk', 'Kanjivaram Silk', 'Banarasi Silk', 'Raw Silk', 'Velvet Crepe', 'Organza / Tissue', 'Georgette'];
const EMBROIDERY_TYPES = ['Aari with Zari', 'Heavy Zardozi', 'Maggam Work', 'Thread Embroidery', 'Sequin Work', 'Mirror Work'];
const SIZES = ['All', 'XS', 'S', 'M', 'L', 'XL', '2XL', 'Custom Fit'];
const COLORS = ['All Colors', 'Emerald Green', 'Antique Gold', 'Crimson Red', 'Royal Blue', 'Ivory Cream', 'Blush Pink'];
const OCCASIONS = ['All Occasions', 'Bridal & Wedding', 'Reception Gowns', 'Sangeet & Mehendi', 'Festive Celebration', 'Daily Luxury'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [activeFabric, setActiveFabric] = useState('');
  const [activeEmb, setActiveEmb] = useState('');
  const [activeSize, setActiveSize] = useState('All');
  const [activeColor, setActiveColor] = useState('All Colors');
  const [activeOccasion, setActiveOccasion] = useState('All Occasions');
  const [stitchingType, setStitchingType] = useState('all'); // all, ready-to-wear, custom-stitching
  const [maxPrice, setMaxPrice] = useState(85000);

  useEffect(() => {
    categoriesAPI.list().then((r) => {
      if (r.data && r.data.length > 0) setCategories(r.data);
    }).catch(() => {});
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = { sort_by: sortBy };
    if (activeCategory) params.category_slug = activeCategory;
    if (activeFabric) params.fabric_type = activeFabric;
    if (activeEmb) params.embroidery_type = activeEmb;
    if (searchParams.get('is_featured')) params.is_featured = true;
    if (search) params.search = search;

    productsAPI
      .list(params)
      .then((r) => {
        let list = (r.data && r.data.length > 0) ? r.data : SAMPLE_PRODUCTS;
        if (activeCategory) {
          list = list.filter(p => p.category?.slug === activeCategory);
        }
        if (activeFabric) {
          list = list.filter(p => p.fabric_type?.toLowerCase().includes(activeFabric.toLowerCase()));
        }
        if (activeEmb) {
          list = list.filter(p => p.embroidery_type?.toLowerCase().includes(activeEmb.toLowerCase()));
        }
        if (search) {
          list = list.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()));
        }
        if (maxPrice < 85000) {
          list = list.filter(p => (p.discount_price || p.original_price || 0) <= maxPrice);
        }
        if (stitchingType === 'custom-stitching') {
          list = list.filter(p => p.is_customizable || p.category?.slug === 'designer-blouses');
        }
        setProducts(list);
      })
      .catch(() => {
        let list = SAMPLE_PRODUCTS;
        if (activeCategory) list = list.filter(p => p.category?.slug === activeCategory);
        if (search) list = list.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
        setProducts(list);
      })
      .finally(() => setLoading(false));
  }, [sortBy, activeCategory, activeFabric, activeEmb, search, searchParams, maxPrice, stitchingType]);


  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const clearFilters = () => {
    setActiveCategory('');
    setActiveFabric('');
    setActiveEmb('');
    setActiveSize('All');
    setActiveColor('All Colors');
    setActiveOccasion('All Occasions');
    setStitchingType('all');
    setMaxPrice(85000);
    setSearch('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <main style={{ background: 'var(--clr-ivory)', paddingBottom: 'var(--space-20)' }}>
      {/* Page Header Banner */}
      <div style={{ background: 'var(--clr-surface)', padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container">
          <div className="section-eyebrow">HAUTE COUTURE CATALOG</div>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-2)' }}>
            {activeCategory
              ? categories.find((c) => c.slug === activeCategory)?.name || 'Designer Collection'
              : 'All Boutique Collections'}
          </h1>
          <p style={{ color: 'var(--clr-slate)', fontSize: 'var(--text-base)' }}>
            Explore our handcrafted bridal lehengas, Aari blouses, pure silk sarees, or launch custom stitching.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-10) var(--space-6)' }}>
        {/* Custom Stitching Callout Banner */}
        <div style={{ background: 'var(--clr-emerald-dark)', color: 'var(--clr-ivory)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6) var(--space-8)', marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', border: '1.5px solid var(--clr-gold)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--clr-gold)', fontWeight: 700 }}>
              ✦ BESPOKE CUSTOM STITCHING STUDIO
            </div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--clr-gold-light)', marginTop: 2 }}>
              Have a specific bridal blouse, lehenga, or saree silhouette in mind?
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(253, 251, 247, 0.85)', marginTop: 2 }}>
              Customize your fabric, neckline, sleeves, Aari embroidery, and enter exact measurements online.
            </div>
          </div>
          <Link to="/custom-stitching" className="btn btn-gold btn-sm">
            🪡 Launch Stitching Studio ↗
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'flex-start' }}>
          {/* Left Sidebar Filters */}
          <aside style={{ width: 290, background: 'var(--clr-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', position: 'sticky', top: 90, flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--clr-charcoal)' }}>
                Filter Collection
              </span>
              <button className="btn btn-ghost btn-sm" onClick={clearFilters} id="clear-filters-btn" style={{ fontSize: '11px', color: 'var(--clr-emerald)' }}>
                Reset All
              </button>
            </div>

            {/* Ready-to-Wear vs Custom Stitching */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label">Shopping Preference</label>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                <button
                  className={`btn btn-sm ${stitchingType === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '11px' }}
                  onClick={() => setStitchingType('all')}
                >
                  All
                </button>
                <button
                  className={`btn btn-sm ${stitchingType === 'ready-to-wear' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '11px' }}
                  onClick={() => setStitchingType('ready-to-wear')}
                >
                  Ready-to-Wear
                </button>
                <button
                  className={`btn btn-sm ${stitchingType === 'custom-stitching' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '11px' }}
                  onClick={() => setStitchingType('custom-stitching')}
                >
                  Custom Fit
                </button>
              </div>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label" htmlFor="products-search-input">Search Designs</label>
              <input
                id="products-search-input"
                type="search"
                className="form-input"
                placeholder="Blouse, Zari, Silk, Lehenga..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginTop: 'var(--space-2)' }}
              />
            </div>

            {/* Categories Filter */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label">Boutique Category</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
                <button
                  className={`btn btn-sm ${activeCategory === '' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  onClick={() => setActiveCategory('')}
                >
                  ✦ All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={`btn btn-sm ${activeCategory === c.slug ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                    onClick={() => setActiveCategory(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label">Size</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    className={`btn btn-sm ${activeSize === sz ? 'btn-gold' : 'btn-ghost'}`}
                    style={{ minWidth: 40, padding: '0.35rem 0.6rem', border: '1px solid var(--clr-border)' }}
                    onClick={() => setActiveSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Max Price</label>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--clr-emerald)' }}>
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={85000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--clr-gold)', marginTop: 'var(--space-2)' }}
              />
            </div>

            {/* Fabric Filter */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label">Authentic Fabric</label>
              <select
                className="form-input"
                value={activeFabric}
                onChange={(e) => setActiveFabric(e.target.value)}
                style={{ marginTop: 'var(--space-2)' }}
              >
                <option value="">All Authentic Fabrics</option>
                {FABRIC_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Embroidery / Workmanship Filter */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label">Artisanal Workmanship</label>
              <select
                className="form-input"
                value={activeEmb}
                onChange={(e) => setActiveEmb(e.target.value)}
                style={{ marginTop: 'var(--space-2)' }}
              >
                <option value="">All Workmanship</option>
                {EMBROIDERY_TYPES.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="form-label">Occasion</label>
              <select
                className="form-input"
                value={activeOccasion}
                onChange={(e) => setActiveOccasion(e.target.value)}
                style={{ marginTop: 'var(--space-2)' }}
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div style={{ flex: 1 }}>
            {/* Top Bar Sort & Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', background: 'var(--clr-surface)', padding: 'var(--space-4) var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)' }}>
                Displaying <strong>{products.length}</strong> haute couture creations
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clr-charcoal)' }}>Sort By:</span>
                <select
                  id="products-sort-select"
                  className="form-input"
                  style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center" style={{ padding: 'var(--space-20)', color: 'var(--clr-emerald)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🪡</div>
                Loading bespoke boutique creations...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center" style={{ padding: 'var(--space-20)', background: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>✨</div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-2)' }}>
                  No outfits found matching your filters
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)', marginBottom: 'var(--space-6)' }}>
                  Try adjusting your filter options or launch custom stitching to create a bespoke design from scratch.
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>Reset Filters</button>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
