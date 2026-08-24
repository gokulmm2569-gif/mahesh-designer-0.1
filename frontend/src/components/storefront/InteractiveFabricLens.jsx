import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const FABRIC_SWATCHES = [
  {
    id: 'aari-silk',
    name: 'Antique Gold Aari Embroidery on Raw Silk',
    subtitle: 'Hand-guided needlework with 24K electroplated Zari & pearls',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400',
    origin: 'Kanchipuram, Tamil Nadu',
    density: '480,000 Micro Stitches',
    hotspots: [
      { top: '35%', left: '42%', title: 'Hand-turned Zari Floral Petals', detail: 'Crafted with master needle precision' },
      { top: '65%', left: '60%', title: 'Pure Raw Mulberry Silk Warp', detail: '100% genuine cocoon silk base' },
      { top: '25%', left: '70%', title: 'Cutdana Glass Beading', detail: 'Imported micro-bead embellishments' }
    ]
  },
  {
    id: 'kanjivaram-korvai',
    name: 'Temple Korvai Pure Silk Zari Weave',
    subtitle: 'Interlocked border technique woven on authentic pit looms',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1400',
    origin: 'Heritage Weavers Guild',
    density: '3-Ply Silk Warp & Weft',
    hotspots: [
      { top: '40%', left: '30%', title: 'Mayil (Peacock) Motif', detail: 'Symbol of auspicious royal heritage' },
      { top: '60%', left: '75%', title: 'Pure Silver Zari Dipped in Gold', detail: 'Hallmarked heavy border density' }
    ]
  },
  {
    id: 'velvet-zardozi',
    name: 'Imperial Emerald Micro Velvet with Zardozi',
    subtitle: 'Plush bridal velvet with heavy metallic french wire relief',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400',
    origin: 'Atelier Signature Vault',
    density: 'High-relief 3D wirework',
    hotspots: [
      { top: '30%', left: '50%', title: 'Dabka & Salma Wirework', detail: 'Intricate coiled metallic threading' },
      { top: '70%', left: '40%', title: 'Emerald Velvet Luster', detail: 'Deep jewel tone light refraction' }
    ]
  }
];

export default function InteractiveFabricLens() {
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_SWATCHES[0]);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, clientX: 0, clientY: 0 });
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(2.2);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      clientX: e.clientX - rect.left,
      clientY: e.clientY - rect.top
    });
  };

  return (
    <section className="fabric-lens-section" id="craftsmanship" aria-label="Haute Couture Fabric Inspection Studio">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto var(--space-12)' }}>
          <div className="section-tag light" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>🔍</span> INTERACTIVE CRAFTSMANSHIP LENS
          </div>
          <h2 className="section-title" style={{ color: 'var(--clr-ivory)', marginTop: 'var(--space-2)' }}>
            Examine The Mastery In Ultra-High Definition.<br />
            <span style={{ color: 'var(--clr-gold-light)', fontStyle: 'italic' }}>Zoom, Hover & Inspect Authentic Silks.</span>
          </h2>
          <p style={{ color: 'rgba(253, 251, 247, 0.85)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginTop: 4 }}>
            Hover or drag across the fabric swatch to activate the 2.5x high-precision inspection loupe. Experience why genuine Mahesh Designer stitching remains peerless.
          </p>
        </div>

        {/* Interactive Swatch Switcher Tabs */}
        <div className="fabric-tabs-bar">
          {FABRIC_SWATCHES.map((fabric) => (
            <button
              key={fabric.id}
              type="button"
              className={`fabric-tab-btn ${selectedFabric.id === fabric.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedFabric(fabric);
                setActiveHotspot(null);
              }}
            >
              <span className="tab-indicator">✦</span>
              <span>{fabric.name.split(' on ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Lens Showcase Grid */}
        <div className="fabric-lens-grid">
          {/* Left: Interactive Zoom Magnifier Canvas */}
          <div
            ref={containerRef}
            className="fabric-lens-canvas"
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedFabric.img}
              alt={selectedFabric.name}
              className="fabric-base-img"
            />

            {/* Hotspot Pins */}
            {selectedFabric.hotspots.map((hs, i) => (
              <div
                key={i}
                className={`fabric-hotspot ${activeHotspot === i ? 'active' : ''}`}
                style={{ top: hs.top, left: hs.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === i ? null : i);
                }}
              >
                <div className="hotspot-pulse" />
                <div className="hotspot-core">✦</div>

                {/* Hotspot Tooltip */}
                <div className="hotspot-card">
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--clr-gold-dark)', textTransform: 'uppercase' }}>
                    Artisan Detail
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--clr-charcoal)', marginTop: 2 }}>
                    {hs.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--clr-slate)', marginTop: 2 }}>
                    {hs.detail}
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Circular Magnifier Loupe */}
            {zoomActive && (
              <div
                className="fabric-magnifier-loupe"
                style={{
                  left: `${zoomPos.clientX}px`,
                  top: `${zoomPos.clientY}px`,
                  backgroundImage: `url(${selectedFabric.img})`,
                  backgroundSize: `${zoomLevel * 100}%`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`
                }}
              >
                <div className="loupe-reticle">
                  <span className="reticle-label">{zoomLevel}x ZOOM</span>
                </div>
              </div>
            )}

            {/* Instruction Floating Pill */}
            {!zoomActive && (
              <div className="fabric-lens-hint">
                <span>🔎 Move Cursor to Activate {zoomLevel}x Zoom Loupe</span>
              </div>
            )}
          </div>

          {/* Right: Technical Provenance Specs & Live Controls */}
          <div className="fabric-spec-panel">
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--clr-gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ✦ AUTHENTIC HERITAGE PROVENANCE
            </div>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: '#FFFFFF', margin: '6px 0 8px' }}>
              {selectedFabric.name}
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(253, 251, 247, 0.85)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
              {selectedFabric.subtitle}
            </p>

            {/* Spec Matrix */}
            <div className="fabric-metric-matrix">
              <div className="metric-box">
                <div className="metric-lbl">Weaving Loom / Origin</div>
                <div className="metric-val">{selectedFabric.origin}</div>
              </div>
              <div className="metric-box">
                <div className="metric-lbl">Stitch & Fiber Density</div>
                <div className="metric-val">{selectedFabric.density}</div>
              </div>
              <div className="metric-box">
                <div className="metric-lbl">Silk Mark Certified</div>
                <div className="metric-val">100% Pure Tested Cocoon</div>
              </div>
              <div className="metric-box">
                <div className="metric-lbl">Embroidery Longevity</div>
                <div className="metric-val">Anti-Tarnish Lifetime Guard</div>
              </div>
            </div>

            {/* Zoom Power Adjuster Slider */}
            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'rgba(7, 38, 30, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--clr-gold-light)' }}>
                  🔍 Magnifier Power: {zoomLevel}x
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(253, 251, 247, 0.7)' }}>Drag to adjust magnification</span>
              </div>
              <input
                type="range"
                min="1.8"
                max="3.5"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--clr-gold)', cursor: 'pointer' }}
              />
            </div>

            {/* Action Triggers */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <Link to="/custom-stitching" className="btn btn-gold btn-lg" style={{ flex: 1, textAlign: 'center' }}>
                🪡 Stitch With This Fabric →
              </Link>
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline-white btn-lg"
              >
                View Catalog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
