import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AtelierFilmShowcase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="atelier-film-section" id="atelier-film" aria-label="Haute Couture Atelier Craftsmanship Film">
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <div className="section-tag" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--clr-gold-subtle)',
            color: 'var(--clr-gold-dark)',
            border: '1px solid var(--clr-border-gold)',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: 'var(--text-xs)',
            fontWeight: '600',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)'
          }}>
            ✦ HAUTE COUTURE CINEMA & CRAFTSMANSHIP
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: '500',
            color: 'var(--clr-emerald-dark)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 'var(--space-3)'
          }}>
            Crafted In Silence. <span style={{ fontStyle: 'italic', color: 'var(--clr-gold-dark)' }}>Revealed In Grandeur.</span>
          </h2>
          
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--clr-slate)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.65
          }}>
            Witness the full-length couture journey from hand-woven Kanchipuram silk to master artisan needlework and finished bridal silhouettes.
          </p>
        </div>

        {/* Video Player Card */}
        <div 
          ref={playerContainerRef}
          className="luxury-video-card"
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            background: '#041510',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 25px 60px -15px rgba(13, 59, 46, 0.3), 0 0 40px rgba(212, 175, 55, 0.15)',
            aspectRatio: '16 / 9',
            maxHeight: '740px',
            width: '100%',
            margin: '0 auto'
          }}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src="/videos/IN_THIS_VIDEO_I_WANT_FULL_LENG.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#041510',
              cursor: 'pointer',
              display: 'block'
            }}
          />

          {/* Top Floating Badge */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(7, 38, 30, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '999px',
            padding: '6px 14px',
            color: '#FDFBF7',
            fontSize: 'var(--text-xs)',
            fontWeight: '600',
            letterSpacing: '0.08em',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 10px #10B981',
              animation: 'pulse 2s infinite'
            }} />
            MAHESH DESIGNER ATELIER // 4K ARCHIVE
          </div>

          {/* Center Play/Pause Floating Overlay (Shows when paused) */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                cursor: 'pointer',
                zIndex: 15
              }}
            >
              <button 
                type="button"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--clr-gold)',
                  border: 'none',
                  color: '#07261E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(212, 175, 55, 0.5)',
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}

          {/* Bottom HUD Bar & Controls */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(4, 21, 16, 0.95) 0%, rgba(4, 21, 16, 0.7) 60%, transparent 100%)',
            padding: '24px 20px 16px 20px',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Scrubber Bar */}
            <div 
              onClick={handleSeek}
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'height 0.15s ease'
              }}
            >
              <div 
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #B38F24, #D4AF37, #F3E5AB)',
                  borderRadius: '3px',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  right: '-4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 0 6px rgba(0,0,0,0.5)'
                }} />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FDFBF7'
            }}>
              {/* Left Group: Play/Pause & Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#D4AF37',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    borderRadius: '6px'
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                <div style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(253, 251, 247, 0.85)',
                  letterSpacing: '0.05em'
                }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Group: Sound Toggle & Fullscreen */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  type="button"
                  onClick={toggleMute}
                  style={{
                    background: isMuted ? 'rgba(255, 255, 255, 0.1)' : 'var(--clr-gold)',
                    color: isMuted ? '#FDFBF7' : '#07261E',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMuted ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                      </svg>
                      Unmute Audio
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                      Audio Active
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FDFBF7',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Toggle Fullscreen"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges & CTA Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-6)',
          marginTop: 'var(--space-10)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--clr-emerald-light)',
              color: 'var(--clr-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              🪡
            </div>
            <div>
              <h4 style={{ fontWeight: '600', color: 'var(--clr-emerald-dark)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                Hand-Guided Needlework
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)', lineHeight: 1.5 }}>
                Master artisans spend over 60+ hours sculpting intricate peacock and floral motifs with genuine metallic threads.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--clr-gold-subtle)',
              color: 'var(--clr-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              👑
            </div>
            <div>
              <h4 style={{ fontWeight: '600', color: 'var(--clr-emerald-dark)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                Pure Heritage Silks
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)', lineHeight: 1.5 }}>
                Authentic Kanchipuram and Banarasi fabrics woven to heirloom standards for bridal royalty.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--clr-emerald-light)',
              color: 'var(--clr-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              ✨
            </div>
            <div>
              <h4 style={{ fontWeight: '600', color: 'var(--clr-emerald-dark)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                Bespoke Fit Matrix
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-slate)', lineHeight: 1.5 }}>
                18-point tailoring architecture ensures every lehenga and blouse drapes to perfection.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div style={{
          marginTop: 'var(--space-8)',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/custom-stitching"
            className="btn btn-gold btn-lg magnetic-btn"
            data-cursor="CUSTOM"
            style={{
              padding: '14px 32px',
              fontSize: 'var(--text-sm)',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            🪡 Book Custom Stitching Studio →
          </Link>
          <Link
            to="/products"
            className="btn btn-outline-dark btn-lg magnetic-btn"
            data-cursor="BROWSE"
            style={{
              padding: '14px 32px',
              fontSize: 'var(--text-sm)',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            Browse Bridal Collection
          </Link>
        </div>

      </div>
    </section>
  );
}
