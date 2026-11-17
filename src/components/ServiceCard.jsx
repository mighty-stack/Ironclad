import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { serviceIcons } from './Icons';

/** Card with a fill that sweeps up from the cursor edge, and an icon that draws itself. */
export default function ServiceCard({ service }) {
  const root = useRef(null);
  const Icon = serviceIcons[service.icon];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const paths = root.current.querySelectorAll('svg path, svg circle');
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        });

        const fill = root.current.querySelector('[data-fill]');
        const enter = (e) => {
          const r = root.current.getBoundingClientRect();
          const fromTop = e.clientY - r.top < r.height / 2;
          gsap.set(fill, { transformOrigin: fromTop ? '50% 0%' : '50% 100%' });
          gsap.to(fill, { scaleY: 1, duration: 0.45, ease: 'power3.out' });
        };
        const leave = (e) => {
          const r = root.current.getBoundingClientRect();
          const toTop = e.clientY - r.top < r.height / 2;
          gsap.set(fill, { transformOrigin: toTop ? '50% 0%' : '50% 100%' });
          gsap.to(fill, { scaleY: 0, duration: 0.45, ease: 'power3.inOut' });
        };
        root.current.addEventListener('mouseenter', enter);
        root.current.addEventListener('mouseleave', leave);
        return () => {
          root.current?.removeEventListener('mouseenter', enter);
          root.current?.removeEventListener('mouseleave', leave);
        };
      });
    },
    { scope: root }
  );

  return (
    <article
      ref={root}
      className="group relative overflow-hidden border-b-2 border-r-2 border-ink p-8 [&:nth-child(2n)]:border-r-2"
    >
      <div data-fill className="absolute inset-0 origin-bottom scale-y-0 bg-ink" />
      <div className="relative transition-colors duration-300 group-hover:text-white">
        <Icon
          className={`mb-6 h-10 w-10 text-orange ${service.icon === 'flame' ? 'flicker' : ''}`}
        />
        <h3 className="mb-3 text-xl font-black">{service.title}</h3>
        <p className="text-sm text-grey transition-colors duration-300 group-hover:text-frost">{service.blurb}</p>
      </div>
    </article>
  );
}
