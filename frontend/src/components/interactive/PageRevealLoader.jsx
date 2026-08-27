import { useState, useEffect } from 'react';

let hasGlobalLoaderExecuted = false;

export default function PageRevealLoader({ onComplete }) {
  const [animationState, setAnimationState] = useState(() => {
    // If loader has already executed once in this session, initialize directly to 'done' (return null)
    if (hasGlobalLoaderExecuted || typeof window === 'undefined') {
      return 'done';
    }
    hasGlobalLoaderExecuted = true;
    return 'initial';
  });

  useEffect(() => {
    if (animationState === 'done') return;

    // 0.8s: Trigger 5-column bottom-to-top panel reveal animation
    const startTimer = setTimeout(() => {
      setAnimationState('animating');
    }, 800);

    // 1.80s: Staggered panels clear the viewport; website is fully revealed underneath
    const revealTimer = setTimeout(() => {
      setAnimationState('revealed');
      if (onComplete) onComplete();
    }, 1800);

    // 2.20s: Unmount loader overlay cleanly from DOM
    const cleanupTimer = setTimeout(() => {
      setAnimationState('done');
    }, 2200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(revealTimer);
      clearTimeout(cleanupTimer);
    };
  }, [onComplete, animationState]);

  if (animationState === 'done') {
    return null;
  }

  const panels = [
    { id: 1, colorClass: 'panel-1', delay: '0ms' },
    { id: 2, colorClass: 'panel-2', delay: '85ms' },
    { id: 3, colorClass: 'panel-3', delay: '170ms' },
    { id: 4, colorClass: 'panel-4', delay: '255ms' },
    { id: 5, colorClass: 'panel-5', delay: '340ms' },
  ];

  return (
    <div 
      className={`page-reveal-overlay ${animationState === 'animating' ? 'is-revealing' : ''} ${animationState === 'revealed' ? 'is-revealed' : ''}`}
      aria-hidden="true"
    >
      {/* Background Staggered Vertical Columns (Bottom -> Top Reveal) */}
      <div className="reveal-panels-container">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`reveal-panel ${panel.colorClass}`}
            style={{ '--panel-delay': panel.delay }}
          >
            <div className="panel-inner-glow" />
            <div className="panel-border-line" />
          </div>
        ))}
      </div>

      {/* Center Cinematic "Mahesh Designer" Brand Intro */}
      <div className="reveal-content-container">
        <div className="reveal-brand-lockup">
          {/* Monogram Crest */}
          <div className="reveal-crest-wrapper">
            <div className="reveal-crest-ring">
              <span className="reveal-crest-monogram">MD</span>
            </div>
            <div className="reveal-crest-accent-star">✦</div>
          </div>

          {/* Luxury Typography */}
          <div className="reveal-title-mask">
            <h1 className="reveal-brand-title">
              <span>MAHESH</span>
              <span className="reveal-title-spacer"> </span>
              <span className="reveal-gold-accent">DESIGNER</span>
            </h1>
          </div>

          {/* Subtitle / Atelier Tag */}
          <div className="reveal-subtitle-mask">
            <p className="reveal-brand-subtitle">
              <span>MODERN INDIAN COUTURE</span>
              <span className="reveal-dot-separator">•</span>
              <span>ATELIER SPEC 2026</span>
            </p>
          </div>

          {/* Minimalist Gold Line */}
          <div className="reveal-line-wrapper">
            <div className="reveal-gold-line" />
          </div>
        </div>
      </div>
    </div>
  );
}



