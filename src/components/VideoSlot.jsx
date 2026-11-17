import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Full-bleed background video.
 * Drop your file at /public/videos/hero.mp4 (and optionally hero-poster.jpg),
 * or pass a different src. Until a playable file exists, the animated heat
 * gradient shows instead, so nothing looks broken.
 */
export default function VideoSlot({
  src = '/videos/hero.mp4',
  poster = '/videos/hero-poster.jpg',
  overlay = 'bg-navy/65',
}) {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="heat-bg absolute inset-0" />
      {!reduced && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setReady(false)}
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
    </div>
  );
}
