import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/** Thermometer on the right edge: the page warms up as you scroll. */
export default function ScrollGauge() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const fill = root.current.querySelector('[data-fill]');
        const bulb = root.current.querySelector('[data-bulb]');
        const temp = root.current.querySelector('[data-temp]');
        const o = { t: 8 };
        gsap.set(fill, { scaleY: 0.04, transformOrigin: '50% 100%' });
        gsap.to(fill, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        });
        gsap.to([fill, bulb], {
          backgroundColor: '#E8622C',
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        });
        gsap.to(o, {
          t: 22,
          ease: 'none',
          onUpdate: () => {
            temp.textContent = `${Math.round(o.t)}°C`;
          },
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        });
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      aria-hidden="true"
    >
      <span data-temp className="font-display text-xs font-bold text-ink mix-blend-difference [color:#fff]">
        8°C
      </span>
      <div className="relative h-40 w-[6px] overflow-hidden rounded-full bg-ink/15">
        <div data-fill className="absolute inset-0 rounded-full" style={{ backgroundColor: '#7FA6C9' }} />
      </div>
      <div data-bulb className="h-4 w-4 rounded-full" style={{ backgroundColor: '#7FA6C9' }} />
    </div>
  );
}
