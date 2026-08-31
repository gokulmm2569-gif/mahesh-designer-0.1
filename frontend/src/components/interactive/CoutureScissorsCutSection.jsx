import { useState, useEffect, useRef } from 'react';

export default function CoutureScissorsCutSection({ children, id, className = '' }) {
  const sectionRef = useRef(null);
  const [isCuttingActive, setIsCuttingActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCuttingActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`couture-cut-stage ${isCuttingActive ? 'is-cutting-active' : ''} ${className}`}
    >
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

      {/* Actual Section Content */}
      <div className="couture-cut-content">
        {children}
      </div>
    </div>
  );
}
