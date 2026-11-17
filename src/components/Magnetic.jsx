import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/** Wrapper that pulls its child toward the cursor. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const outer = useRef(null);
  const inner = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const xTo = gsap.quickTo(inner.current, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(inner.current, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
        const el = outer.current;
        const move = (e) => {
          const r = inner.current.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        return () => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        };
      });
    },
    { scope: outer }
  );

  return (
    <span ref={outer} className={`inline-block p-3 -m-3 ${className}`}>
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </span>
  );
}
