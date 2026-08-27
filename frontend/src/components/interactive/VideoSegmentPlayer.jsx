import { useEffect, useRef } from 'react';

export default function VideoSegmentPlayer({ src, startTime = 0, endTime, poster, className, style, loop = true, onEnded }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (startTime > 0) {
        video.currentTime = startTime;
      }
    };

    const handleTimeUpdate = () => {
      if (endTime && video.currentTime >= endTime) {
        if (onEnded) {
          onEnded();
        } else {
          video.currentTime = startTime;
        }
      } else if (startTime > 0 && video.currentTime < startTime - 0.3) {
        video.currentTime = startTime;
      }
    };

    const handleEnded = () => {
      if (onEnded) {
        onEnded();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (endTime) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }
    video.addEventListener('ended', handleEnded);

    // Pause when offscreen using IntersectionObserver for maximum performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (endTime) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
      video.removeEventListener('ended', handleEnded);
      observer.disconnect();
    };
  }, [startTime, endTime, onEnded]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop={endTime ? false : loop}
      playsInline
      className={className}
      style={style}
    />
  );
}

