import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function Counter({ to, decimals = 0, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const fmt = (v) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = ref.current;
        const o = { v: 0 };
        el.textContent = fmt(0);
        gsap.to(o, {
          v: to,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = fmt(o.v);
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {fmt(to)}
    </span>
  );
}
