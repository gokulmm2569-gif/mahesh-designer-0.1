import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const GARMENT_TYPES = [
  { id: 'bridal-blouse', title: 'Bridal Aari Blouse', icon: '👘', basePrice: 4500, desc: 'Handcrafted Aari & Pure Silk' },
  { id: 'lehenga-set', title: 'Custom Lehenga & Choli', icon: '👗', basePrice: 18500, desc: 'Kalidar Skirt & Blouse Set' },
  { id: 'reception-gown', title: 'Reception Evening Gown', icon: '✨', basePrice: 14000, desc: 'Floor-Length Trail Couture' },
  { id: 'anarkali-suit', title: 'Flared Anarkali Suit', icon: '🥻', basePrice: 8500, desc: 'Royal Kalidar Silhouette' },
  { id: 'designer-kurti', title: 'Designer Kurti Set', icon: '👚', basePrice: 3200, desc: 'Everyday Festive Elegance' },
];

const FABRICS = [
  { id: 'kanjivaram-silk', name: 'Pure Kanjivaram Silk', extra: 3000, desc: 'Master Loom Cocoon Silk' },
  { id: 'raw-silk', name: 'Premium Raw Silk', extra: 1800, desc: 'Royal Structured Texture' },
  { id: 'velvet-crepe', name: 'Royal Velvet & Crepe', extra: 2200, desc: 'Deep Jewel Tone Drape' },
  { id: 'organza-tissue', name: 'Organza / Tissue Silk', extra: 1500, desc: 'Luminous Sheer Sheen' },
  { id: 'cotton-silk', name: 'Chanderi Cotton-Silk', extra: 800, desc: 'Breathable Festive Weave' },
];

const NECKLINES = [
  { id: 'sweetheart', name: 'Sweetheart Neck', icon: '💖' },
  { id: 'princess-u', name: 'Princess Deep U', icon: '👑' },
  { id: 'boat-neck', name: 'Royal Boat Neck', icon: '⛵' },
  { id: 'high-collar', name: 'High Collar Keyhole', icon: '🪡' },
  { id: 'square-deep', name: 'Broad Square Neck', icon: '🔲' },
];

const SLEEVE_STYLES = [
  { id: 'elbow-aari', name: 'Elbow (Heavy Aari)', icon: '✨' },
  { id: 'cap-sleeves', name: 'Cap Sleeves', icon: '🌸' },
  { id: 'full-sheer', name: 'Full Sheer Sleeves', icon: '🌟' },
  { id: 'sleeveless', name: 'Modern Sleeveless', icon: '✂️' },
  { id: 'bell-sleeves', name: 'Flared Bell Sleeves', icon: '🔔' },
];

const EMBROIDERY_LEVELS = [
  { id: 'heavy-aari', name: 'Heavy Bridal Aari & Zardozi', extra: 4500, desc: 'All-over Zari, Pearls & Cutdana' },
  { id: 'medium-maggam', name: 'Medium Maggam & Mirror Work', extra: 2800, desc: 'Highlighted Neck & Sleeves' },
  { id: 'minimal-border', name: 'Minimal Piping & Border Zari', extra: 1200, desc: 'Subtle Elegant Highlights' },
  { id: 'thread-floral', name: 'Resham Floral Thread Work', extra: 2000, desc: 'Pastel Floral Embroidery' },
];

export default function CustomStitchingPage() {
  const { addToCart, setCartOpen } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Customization State
  const [selectedGarment, setSelectedGarment] = useState(GARMENT_TYPES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedNeckline, setSelectedNeckline] = useState(NECKLINES[0]);
  const [selectedSleeve, setSelectedSleeve] = useState(SLEEVE_STYLES[0]);
  const [selectedEmbroidery, setSelectedEmbroidery] = useState(EMBROIDERY_LEVELS[0]);
  const [fabricColor, setFabricColor] = useState('Emerald Green & Antique Gold');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [measurements, setMeasurements] = useState({
    bust: '36',
    waist: '30',
    hip: '38',
    blouse_length: '14.5',
    shoulder: '14',
    front_neck_depth: '7',
    back_neck_depth: '9',
    sleeve_length: '11',
    armhole: '15',
  });
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Price Calculation
  const totalPrice = selectedGarment.basePrice + selectedFabric.extra + selectedEmbroidery.extra;
  const formatPrice = (p) => `₹${parseFloat(p || 0).toLocaleString('en-IN')}`;

  const handleMeasurementChange = (e) => {
    setMeasurements((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReferenceImage(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    // Add bespoke order
    const res = await addToCart(6, 'Custom Fit', 1);
    setIsSubmitting(false);
    if (res.success) {
      setCartOpen(true);
    } else {
      alert(res.error || 'Could not add bespoke outfit to cart. Please try again.');
    }
  };

  return (
    <div style={{ paddingBottom: 'var(--space-24)', background: 'var(--clr-ivory)' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--clr-surface)', padding: 'var(--space-12) 0', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container text-center">
          <div className="section-eyebrow">BESPOKE COUTURE ATELIER</div>
          <h1 className="section-title">Your Measurements. Your Style. Your Dress.</h1>
          <p className="section-subtitle">
            Configure every stitch, fabric, neckline, and embroidery pattern. Engineered by master tailors to your exact silhouette.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'var(--space-10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-8)' }}>
          {/* Left Column: Multi-Step Studio */}
          <div className="stitching-studio-wrap">
            {/* Step Navigation Tabs */}
            <div className="studio-steps-header">
              <button className={`studio-step-tab ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                01. Garment
              </button>
              <button className={`studio-step-tab ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                02. Fabric & Color
              </button>
              <button className={`studio-step-tab ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>
                03. Neck & Sleeves
              </button>
              <button className={`studio-step-tab ${step === 4 ? 'active' : ''}`} onClick={() => setStep(4)}>
                04. Embroidery
              </button>
              <button className={`studio-step-tab ${step === 5 ? 'active' : ''}`} onClick={() => setStep(5)}>
                05. Measurements & Date
              </button>
            </div>

            <div className="studio-content-body">
              {/* Step 1: Garment Type */}
              {step === 1 && (
                <div>
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div className="section-tag" style={{ marginBottom: 4 }}>✦ STEP 01 • SILHOUETTE</div>
                    <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-charcoal)', margin: '2px 0 4px', fontWeight: 800 }}>
                      Select Your Signature Silhouette
                    </h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', letterSpacing: '0.02em' }}>
                      Tailored from scratch to your exact measurements.
                    </p>
                  </div>

                  <div className="style-option-grid">
                    {GARMENT_TYPES.map((g) => (
                      <div
                        key={g.id}
                        className={`style-option-card ${selectedGarment.id === g.id ? 'selected' : ''}`}
                        onClick={() => setSelectedGarment(g)}
                      >
                        <div className="style-option-icon">{g.icon}</div>
                        <div>
                          <div className="style-option-title">{g.title}</div>
                          <div className="style-option-desc">{g.desc}</div>
                        </div>
                        <div className="style-option-price">Starts at {formatPrice(g.basePrice)}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary" onClick={() => setStep(2)}>Next: Fabric & Color →</button>
                  </div>
                </div>
              )}


              {/* Step 2: Fabric & Color */}
              {step === 2 && (
                <div>
                  <div className="section-tag">✦ STEP 02: PURE FABRIC</div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-4)' }}>
                    Select Pure Silk or Fabric & Preferred Shade
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                    {FABRICS.map((f) => (
                      <div
                        key={f.id}
                        className={`style-option-card ${selectedFabric.id === f.id ? 'selected' : ''}`}
                        onClick={() => setSelectedFabric(f)}
                      >
                        <div className="style-option-title">{f.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginTop: 4 }}>{f.desc}</div>
                        <div className="style-option-price">+{formatPrice(f.extra)}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'var(--space-6)' }}>
                    <label className="form-label">Preferred Fabric Color / Shade</label>
                    <input
                      type="text"
                      className="form-input"
                      value={fabricColor}
                      onChange={(e) => setFabricColor(e.target.value)}
                      placeholder="e.g. Imperial Emerald, Antique Gold, Deep Maroon, Ivory Silk"
                      style={{ marginTop: 'var(--space-2)' }}
                    />
                  </div>

                  <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(3)}>Next: Neck & Sleeves →</button>
                  </div>
                </div>
              )}

              {/* Step 3: Neckline & Sleeves */}
              {step === 3 && (
                <div>
                  <div className="section-tag">✦ STEP 03: STYLING & CUT</div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-4)' }}>
                    Choose Neckline & Sleeve Cut
                  </h3>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div className="section-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Front & Back Neck Pattern</div>
                    <div className="style-option-grid">
                      {NECKLINES.map((n) => (
                        <div
                          key={n.id}
                          className={`style-option-card ${selectedNeckline.id === n.id ? 'selected' : ''}`}
                          onClick={() => setSelectedNeckline(n)}
                        >
                          <div className="style-option-icon">{n.icon}</div>
                          <div className="style-option-title">{n.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="section-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Sleeve Pattern & Length</div>
                    <div className="style-option-grid">
                      {SLEEVE_STYLES.map((s) => (
                        <div
                          key={s.id}
                          className={`style-option-card ${selectedSleeve.id === s.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSleeve(s)}
                        >
                          <div className="style-option-icon">{s.icon}</div>
                          <div className="style-option-title">{s.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(4)}>Next: Embroidery Work →</button>
                  </div>
                </div>
              )}

              {/* Step 4: Embroidery Work */}
              {step === 4 && (
                <div>
                  <div className="section-tag">✦ STEP 04: WORKMANSHIP</div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-4)' }}>
                    Handcrafted Embroidery & Zari Workmanship
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                    {EMBROIDERY_LEVELS.map((e) => (
                      <div
                        key={e.id}
                        className={`style-option-card ${selectedEmbroidery.id === e.id ? 'selected' : ''}`}
                        onClick={() => setSelectedEmbroidery(e)}
                      >
                        <div className="style-option-title">{e.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginTop: 4 }}>{e.desc}</div>
                        <div className="style-option-price">+{formatPrice(e.extra)}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost" onClick={() => setStep(3)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(5)}>Next: Measurements & Date →</button>
                  </div>
                </div>
              )}

              {/* Step 5: Body Measurements, Image Upload, & Date */}
              {step === 5 && (
                <div>
                  <div className="section-tag">✦ STEP 05: MEASUREMENT & SPECIFICATIONS</div>
                  <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-4)' }}>
                    Precision Body Measurements (Inches)
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', marginBottom: 'var(--space-6)' }}>
                    💡 Tip: Enter measurements using an inch tape. Our atelier adds 1.5 inches inner margin for adjustments.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Bust / Chest (in)</label>
                      <input type="number" step="0.5" name="bust" className="form-input" value={measurements.bust} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Waist (in)</label>
                      <input type="number" step="0.5" name="waist" className="form-input" value={measurements.waist} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Hip (in)</label>
                      <input type="number" step="0.5" name="hip" className="form-input" value={measurements.hip} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Blouse Length (in)</label>
                      <input type="number" step="0.5" name="blouse_length" className="form-input" value={measurements.blouse_length} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Shoulder Width (in)</label>
                      <input type="number" step="0.5" name="shoulder" className="form-input" value={measurements.shoulder} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Front Neck Depth (in)</label>
                      <input type="number" step="0.5" name="front_neck_depth" className="form-input" value={measurements.front_neck_depth} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Back Neck Depth (in)</label>
                      <input type="number" step="0.5" name="back_neck_depth" className="form-input" value={measurements.back_neck_depth} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sleeve Length (in)</label>
                      <input type="number" step="0.5" name="sleeve_length" className="form-input" value={measurements.sleeve_length} onChange={handleMeasurementChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Armhole Round (in)</label>
                      <input type="number" step="0.5" name="armhole" className="form-input" value={measurements.armhole} onChange={handleMeasurementChange} />
                    </div>
                  </div>

                  {/* Reference Image Upload & Delivery Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
                    <div className="form-group">
                      <label className="form-label">Upload Reference Image / Sketch</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-input"
                        style={{ padding: '0.6rem' }}
                      />
                      {referenceImage && (
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-emerald)', marginTop: 4, fontWeight: 600 }}>
                          ✓ Attached: {referenceImage}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Requested Delivery Date / Event Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
                    <label className="form-label">Special Customization Notes / Instructions</label>
                    <textarea
                      rows={3}
                      className="form-input"
                      placeholder="e.g. Include latkans on back dori, cups padding required, extra margin on waist..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost" onClick={() => setStep(4)}>← Back</button>
                    <button className="btn btn-primary btn-lg" onClick={handleAddToCart} disabled={isSubmitting}>
                      {isSubmitting ? 'Configuring Order...' : `✨ Add to Bag (${formatPrice(totalPrice)})`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Digital Atelier Blueprint */}
          <div>
            <div style={{ background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', border: '1.5px solid var(--clr-gold)', position: 'sticky', top: 100, boxShadow: 'var(--shadow-md)' }}>
              <div className="section-tag">✦ LIVE CUSTOMIZATION SUMMARY</div>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-xl)', color: 'var(--clr-charcoal)', marginBottom: 'var(--space-4)' }}>
                {selectedGarment.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--clr-border)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Garment Base:</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(selectedGarment.basePrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Fabric ({selectedFabric.name}):</span>
                  <span style={{ fontWeight: 700 }}>+{formatPrice(selectedFabric.extra)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Embroidery ({selectedEmbroidery.name}):</span>
                  <span style={{ fontWeight: 700 }}>+{formatPrice(selectedEmbroidery.extra)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Neck Pattern:</span>
                  <span style={{ fontWeight: 700 }}>{selectedNeckline.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Sleeve Cut:</span>
                  <span style={{ fontWeight: 700 }}>{selectedSleeve.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--clr-slate)' }}>Color Shade:</span>
                  <span style={{ fontWeight: 700 }}>{fabricColor}</span>
                </div>
                {deliveryDate && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--clr-slate)' }}>Target Date:</span>
                    <span style={{ fontWeight: 700, color: 'var(--clr-emerald)' }}>{deliveryDate}</span>
                  </div>
                )}
                {referenceImage && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--clr-slate)' }}>Sketch Attached:</span>
                    <span style={{ fontWeight: 700, color: 'var(--clr-gold-dark)' }}>Yes</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
                <span style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--clr-charcoal)' }}>Estimated Total</span>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--clr-emerald)' }}>{formatPrice(totalPrice)}</span>
              </div>

              <button className="btn btn-gold w-full btn-lg" onClick={handleAddToCart} disabled={isSubmitting}>
                {isSubmitting ? 'Configuring...' : '🪡 Add Bespoke Outfit to Bag'}
              </button>

              <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', textAlign: 'center', lineHeight: 1.5 }}>
                🛡️ Includes 3 complimentary fitting adjustments and video measurement consultation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

