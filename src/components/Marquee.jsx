import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

/** Ticker that speeds up and reverses with scroll velocity. */
export default function Marquee({ items, className = '' }) {
  const root = useRef(null);
  const list = [...items, ...items];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = root.current.querySelector('[data-track]');
        const tl = gsap.to(track, { xPercent: -50, ease: 'none', duration: 36, repeat: -1 });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            tl.timeScale(self.direction * boost);
            gsap.to(tl, { timeScale: self.direction, duration: 1.2, overwrite: true });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`} aria-hidden="true">
      <div data-track className="flex w-max items-center">
        {list.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-display cond text-2xl font-black md:text-4xl">{item}</span>
            <span className="mx-8 inline-block h-3 w-3 rotate-45 bg-orange md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}
