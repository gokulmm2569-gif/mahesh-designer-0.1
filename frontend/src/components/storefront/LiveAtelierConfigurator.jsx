import { useState } from 'react';
import { Link } from 'react-router-dom';

const CONFIG_OPTIONS = {
  silhouettes: [
    { id: 'bridal-blouse', name: 'Bridal Aari Blouse', base: 4500, icon: '👘' },
    { id: 'royal-lehenga', name: 'Kalidar Bridal Lehenga', base: 28000, icon: '👗' },
    { id: 'reception-gown', name: 'Trail Reception Gown', base: 18500, icon: '✨' },
  ],
  fabrics: [
    { id: 'kanchipuram-silk', name: 'Pure Kanchipuram Raw Silk', price: 2500, badge: 'Heritage 100%' },
    { id: 'micro-velvet', name: 'Imperial Emerald Velvet', price: 3200, badge: 'Plush Royal' },
    { id: 'banarasi-brocade', name: 'Banarasi Antique Brocade', price: 2800, badge: 'Loom Woven' },
  ],
  necklines: [
    { id: 'sweetheart', name: 'Royal Sweetheart Neck', price: 0 },
    { id: 'princess-cut', name: 'Princess Cut Deep U', price: 500 },
    { id: 'boat-neck', name: 'High Illusion Boat Neck', price: 800 },
  ],
  embroideries: [
    { id: 'heavy-aari', name: 'Heavy Bridal Aari & Zardozi', price: 4800, time: '7 Days Handwork' },
    { id: 'temple-zari', name: 'Authentic Temple Zari Border', price: 2200, time: '4 Days Handwork' },
    { id: 'pearl-cutdana', name: 'Moti (Pearl) & Cutdana Relief', price: 3600, time: '5 Days Handwork' },
  ]
};

export default function LiveAtelierConfigurator() {
  const [silhouette, setSilhouette] = useState(CONFIG_OPTIONS.silhouettes[0]);
  const [fabric, setFabric] = useState(CONFIG_OPTIONS.fabrics[0]);
  const [neckline, setNeckline] = useState(CONFIG_OPTIONS.necklines[0]);
  const [embroidery, setEmbroidery] = useState(CONFIG_OPTIONS.embroideries[0]);

  const totalPrice = silhouette.base + fabric.price + neckline.price + embroidery.price;

  return (
    <section className="atelier-configurator-section" id="atelier" aria-label="Interactive Atelier Customizer Preview">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto var(--space-12)' }}>
          <div className="section-tag">✦ LIVE ATELIER DESIGN STUDIO</div>
          <h2 className="section-title">
            Configure Your Silhouette In Real Time.<br />
            <span style={{ color: 'var(--clr-emerald)', fontStyle: 'italic' }}>Instant Quote & Tailoring Blueprint.</span>
          </h2>
          <p style={{ color: 'var(--clr-slate)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
            Customize your dream ensemble. Select silhouette, pure fabric, neckline, and handcrafted embroidery to calculate your bespoke price instantly.
          </p>
        </div>

        <div className="configurator-grid">
          {/* Left: Customization Controls */}
          <div className="configurator-controls">
            {/* Step 1: Garment Silhouette */}
            <div className="config-group">
              <label className="config-label">1. Select Garment Silhouette</label>
              <div className="config-pill-grid">
                {CONFIG_OPTIONS.silhouettes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`config-pill-btn ${silhouette.id === s.id ? 'active' : ''}`}
                    onClick={() => setSilhouette(s)}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>Base ₹{s.base.toLocaleString('en-IN')}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pure Fabric */}
            <div className="config-group">
              <label className="config-label">2. Authentic Fabric Selection</label>
              <div className="config-pill-grid">
                {CONFIG_OPTIONS.fabrics.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`config-pill-btn ${fabric.id === f.id ? 'active' : ''}`}
                    onClick={() => setFabric(f)}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--clr-emerald)', fontWeight: 600 }}>+₹{f.price.toLocaleString('en-IN')} • {f.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Neckline Style */}
            <div className="config-group">
              <label className="config-label">3. Neckline & Cut Architecture</label>
              <div className="config-pill-grid">
                {CONFIG_OPTIONS.necklines.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className={`config-pill-btn ${neckline.id === n.id ? 'active' : ''}`}
                    onClick={() => setNeckline(n)}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{n.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--clr-slate)' }}>{n.price === 0 ? 'Included' : `+₹${n.price}`}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Workmanship Level */}
            <div className="config-group">
              <label className="config-label">4. Handcrafted Embroidery Masterwork</label>
              <div className="config-pill-grid">
                {CONFIG_OPTIONS.embroideries.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`config-pill-btn ${embroidery.id === e.id ? 'active' : ''}`}
                    onClick={() => setEmbroidery(e)}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>{e.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--clr-gold-dark)', fontWeight: 700 }}>+₹{e.price.toLocaleString('en-IN')} ({e.time})</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Blueprint & Floating Price Card */}
          <div className="configurator-preview-box">
            {/* Live Visual Silhouette Canvas with Floating Badges */}
            <div className="blueprint-visual-card">
              <img
                src={
                  silhouette.id === 'royal-lehenga'
                    ? 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'
                    : silhouette.id === 'reception-gown'
                    ? 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'
                    : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
                }
                alt="Bespoke Blueprint Preview"
                className="blueprint-img"
              />

              {/* Floating Blueprint Badge Top */}
              <div className="floating-badge-blueprint-top">
                <span>📐 Live 3D Blueprint</span>
                <span className="live-pulse-dot" />
              </div>

              {/* Floating Specification Card */}
              <div className="floating-blueprint-specs">
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--clr-gold)', textTransform: 'uppercase' }}>
                  ✦ BESPOKE BLUEPRINT SUMMARY
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', margin: '3px 0' }}>
                  {silhouette.name}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(253, 251, 247, 0.85)', lineHeight: 1.5 }}>
                  🧵 {fabric.name}<br />
                  ✂ {neckline.name} • {embroidery.name}
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="configurator-price-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--clr-slate)', fontWeight: 700 }}>
                    Estimated Bespoke Total
                  </span>
                  <div style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--clr-emerald)' }}>
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', background: 'var(--clr-gold-subtle)', color: 'var(--clr-emerald-dark)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                    100% Fit Guarantee
                  </span>
                  <div style={{ fontSize: '10px', color: 'var(--clr-slate)', marginTop: 4 }}>Dispatches in 7-10 Days</div>
                </div>
              </div>

              <Link
                to={`/custom-stitching?silhouette=${silhouette.id}&fabric=${encodeURIComponent(fabric.name)}&neckline=${encodeURIComponent(neckline.name)}&embroidery=${encodeURIComponent(embroidery.name)}`}
                className="btn btn-primary btn-lg w-full"
                style={{ borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <span>🪡</span> Submit My Exact Measurements →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
