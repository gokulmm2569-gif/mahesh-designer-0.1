import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CoutureScissorsCutSection from '../interactive/CoutureScissorsCutSection';

const CONFIG_OPTIONS = {
  silhouettes: [
    { id: 'bridal-blouse', name: 'Bridal Aari Blouse', base: 4500, icon: '👘', desc: 'Handcrafted zardozi & silk' },
    { id: 'royal-lehenga', name: 'Kalidar Bridal Lehenga', base: 28000, icon: '👗', desc: '24-kali heirloom volume' },
    { id: 'reception-gown', name: 'Trail Reception Gown', base: 18500, icon: '✨', desc: 'Structured drape & trail' },
  ],
  fabrics: [
    { id: 'kanchipuram-silk', name: 'Pure Kanchipuram Raw Silk', price: 2500, badge: 'Heritage 100%' },
    { id: 'micro-velvet', name: 'Imperial Emerald Velvet', price: 3200, badge: 'Plush Royal' },
    { id: 'banarasi-brocade', name: 'Banarasi Antique Brocade', price: 2800, badge: 'Loom Woven' },
  ],
  necklines: [
    { id: 'sweetheart', name: 'Royal Sweetheart Neck', price: 0, desc: 'Classic bridal plunge' },
    { id: 'princess-cut', name: 'Princess Cut Deep U', price: 500, desc: 'Sculpted structural seam' },
    { id: 'boat-neck', name: 'High Illusion Boat Neck', price: 800, desc: 'Sheer antique zari collar' },
  ],
  embroideries: [
    { id: 'heavy-aari', name: 'Heavy Bridal Aari & Zardozi', price: 4800, time: '7 Days Handwork' },
    { id: 'temple-zari', name: 'Authentic Temple Zari Border', price: 2200, time: '4 Days Handwork' },
    { id: 'pearl-cutdana', name: 'Moti (Pearl) & Cutdana Relief', price: 3600, time: '5 Days Handwork' },
  ]
};

// Dynamic image asset mapping based on Silhouette + Fabric selection
const GARMENT_ASSETS = {
  'bridal-blouse': {
    'kanchipuram-silk': '/images/770387738_18098593040578086_6478356792783263711_n.jpg',
    'micro-velvet': '/images/780070284_18100128413578086_122324511139491431_n.jpg',
    'banarasi-brocade': '/images/Screenshot%202026-08-26%20115803.png'
  },
  'royal-lehenga': {
    'kanchipuram-silk': '/images/Screenshot%202026-08-26%20122048.png',
    'micro-velvet': '/images/Screenshot%202026-08-26%20122355.png',
    'banarasi-brocade': '/images/Screenshot%202026-08-26%20122156.png'
  },
  'reception-gown': {
    'kanchipuram-silk': '/images/Screenshot%202026-08-26%20121947.png',
    'micro-velvet': '/images/Screenshot%202026-08-26%20122320.png',
    'banarasi-brocade': '/images/Screenshot%202026-08-26%20122438.png'
  }
};

const STEPS = [
  { num: '01', title: 'SILHOUETTE' },
  { num: '02', title: 'FABRIC' },
  { num: '03', title: 'ARCHITECTURE' },
  { num: '04', title: 'EMBROIDERY' }
];

export default function LiveAtelierConfigurator() {
  const { addToCart, setCartOpen } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [silhouette, setSilhouette] = useState(CONFIG_OPTIONS.silhouettes[0]);
  const [fabric, setFabric] = useState(CONFIG_OPTIONS.fabrics[0]);
  const [neckline, setNeckline] = useState(CONFIG_OPTIONS.necklines[0]);
  const [embroidery, setEmbroidery] = useState(CONFIG_OPTIONS.embroideries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = silhouette.base + fabric.price + neckline.price + embroidery.price;

  // Resolve current active garment image based on selection combination
  const previewImage = GARMENT_ASSETS[silhouette.id]?.[fabric.id] || GARMENT_ASSETS['royal-lehenga']['micro-velvet'];

  const handleAddBespokeToCart = async () => {
    setIsSubmitting(true);
    const res = await addToCart(6, 'Custom Fit', 1);
    setIsSubmitting(false);
    if (res.success) {
      setCartOpen(true);
    } else {
      alert(res.error || 'Could not add bespoke outfit to bag. Please try again.');
    }
  };

  const handleSilhouetteSelect = (s) => {
    setSilhouette(s);
    if (activeStep === 0) setActiveStep(1);
  };

  const handleFabricSelect = (f) => {
    setFabric(f);
    if (activeStep === 1) setActiveStep(2);
  };

  const handleNecklineSelect = (n) => {
    setNeckline(n);
    if (activeStep === 2) setActiveStep(3);
  };

  const handleEmbroiderySelect = (e) => {
    setEmbroidery(e);
  };

  return (
    <section className="atelier-configurator-section" id="atelier" aria-label="Interactive Atelier Customizer Preview">
      <div className="container">
        {/* Section Header */}
        <div className="atelier-header-box">
          <div className="section-tag">✦ LIVE ATELIER DESIGN STUDIO</div>
          <h2 className="section-title">
            Configure Your Silhouette In Real Time.<br />
            <span className="section-title-highlight">Instant Quote & Tailoring Blueprint.</span>
          </h2>
        </div>

        {/* Main 2-Panel Atelier Layout */}
        <div className="configurator-grid">
          {/* Left Panel: Customization Controls */}
          <div className="configurator-controls">
            {/* Step 1: Garment Silhouette */}
            <div className="config-group group-active">
              <div className="config-group-header">
                <span className="config-group-num">01</span>
                <label className="config-label">Select Garment Silhouette</label>
              </div>
              <div className="config-options-stack">
                {CONFIG_OPTIONS.silhouettes.map((s) => {
                  const isSelected = silhouette.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`config-option-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSilhouetteSelect(s)}
                      data-cursor="SILHOUETTE"
                    >
                      <div className="option-card-left">
                        <span className="option-icon">{s.icon}</span>
                        <div className="option-text-wrap">
                          <div className="option-name">{s.name}</div>
                          <div className="option-desc">{s.desc}</div>
                        </div>
                      </div>
                      <div className="option-card-right">
                        <span className="option-price">Base ₹{s.base.toLocaleString('en-IN')}</span>
                        {isSelected && <span className="option-check">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pure Fabric */}
            <div className="config-group group-active">
              <div className="config-group-header">
                <span className="config-group-num">02</span>
                <label className="config-label">Authentic Fabric Selection</label>
              </div>
              <div className="config-options-stack">
                {CONFIG_OPTIONS.fabrics.map((f) => {
                  const isSelected = fabric.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      className={`config-option-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleFabricSelect(f)}
                      data-cursor="FABRIC"
                    >
                      <div className="option-card-left">
                        <div className="option-text-wrap">
                          <div className="option-name">{f.name}</div>
                          <span className="option-badge">{f.badge}</span>
                        </div>
                      </div>
                      <div className="option-card-right">
                        <span className="option-price">+₹{f.price.toLocaleString('en-IN')}</span>
                        {isSelected && <span className="option-check">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Neckline Style */}
            <div className="config-group group-active">
              <div className="config-group-header">
                <span className="config-group-num">03</span>
                <label className="config-label">Neckline & Cut Architecture</label>
              </div>
              <div className="config-options-stack">
                {CONFIG_OPTIONS.necklines.map((n) => {
                  const isSelected = neckline.id === n.id;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      className={`config-option-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleNecklineSelect(n)}
                      data-cursor="NECK"
                    >
                      <div className="option-card-left">
                        <div className="option-text-wrap">
                          <div className="option-name">{n.name}</div>
                          <div className="option-desc">{n.desc}</div>
                        </div>
                      </div>
                      <div className="option-card-right">
                        <span className="option-price">{n.price === 0 ? 'Included' : `+₹${n.price}`}</span>
                        {isSelected && <span className="option-check">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Workmanship Level */}
            <div className="config-group group-active">
              <div className="config-group-header">
                <span className="config-group-num">04</span>
                <label className="config-label">Handcrafted Embroidery Masterwork</label>
              </div>
              <div className="config-options-stack">
                {CONFIG_OPTIONS.embroideries.map((e) => {
                  const isSelected = embroidery.id === e.id;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={`config-option-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleEmbroiderySelect(e)}
                      data-cursor="ZARI"
                    >
                      <div className="option-card-left">
                        <div className="option-text-wrap">
                          <div className="option-name">{e.name}</div>
                          <div className="option-time">⏳ {e.time}</div>
                        </div>
                      </div>
                      <div className="option-card-right">
                        <span className="option-price">+₹{e.price.toLocaleString('en-IN')}</span>
                        {isSelected && <span className="option-check">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: 60% Live Garment Preview Canvas & Price Breakdown */}
          <div className="configurator-preview-panel">
            <div className="blueprint-visual-card">
              {/* Dynamic Garment Canvas Image with Smooth Crossfade */}
              <div className="blueprint-img-wrap" key={previewImage}>
                <a
                  href="https://www.instagram.com/_mahesh_designers_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Mahesh Designers on Instagram"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  <img
                    src={previewImage}
                    alt={`${silhouette.name} - ${fabric.name}`}
                    className="blueprint-img"
                    loading="lazy"
                  />
                </a>
                <div className="blueprint-scrim-overlay" />
              </div>

              {/* Architectural Caliper Lines */}
              <div className="blueprint-caliper-overlay" aria-hidden="true">
                <div className="caliper-line top" />
                <div className="caliper-line bottom" />
                <div className="caliper-crosshair" />
              </div>

              {/* Floating Live Badge Top */}
              <div className="floating-badge-blueprint-top">
                <span className="live-pulse-dot" />
                <span>LIVE ATELIER CANVAS</span>
              </div>

              {/* Floating Blueprint Specification Summary */}
              <div className="floating-blueprint-specs">
                <div className="blueprint-summary-tag">✦ YOUR BESPOKE BLUEPRINT</div>
                <div className="blueprint-garment-title">{silhouette.name}</div>
                <div className="blueprint-specs-row">
                  <span>🧵 {fabric.name}</span>
                  <span>✂ {neckline.name}</span>
                  <span>✨ {embroidery.name}</span>
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown & Submission Card */}
            <div className="configurator-price-card">
              <div className="price-card-header">
                <div>
                  <span className="price-label">Estimated Bespoke Total</span>
                  <div className="price-value">₹{totalPrice.toLocaleString('en-IN')}</div>
                </div>
                <div className="price-guarantee-box">
                  <span className="guarantee-badge">100% Custom Fit Guarantee</span>
                  <div className="dispatch-time">Dispatches in 7-10 Days</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBespokeToCart}
                disabled={isSubmitting}
                className="btn-bespoke-submit magnetic-btn"
                data-cursor="ADD"
              >
                <span>🪡</span> {isSubmitting ? 'Adding Bespoke Outfit...' : 'Add Bespoke Outfit to Bag →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
