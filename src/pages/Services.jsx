import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { CheckIcon, serviceIcons } from '../components/Icons';
import { services } from '../data';

function Row({ s, i }) {
  const root = useRef(null);
  const Icon = serviceIcons[s.icon];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const paths = root.current.querySelectorAll('svg path, svg circle');
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        // the big icon draws as the row scrolls through the viewport
        gsap.to(paths, {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 25%', scrub: 0.5 },
        });
        gsap.from(root.current.querySelectorAll('[data-pt]'), {
          x: -30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
        });
        gsap.fromTo(
          root.current.querySelector('[data-rule]'),
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: '0% 50%',
            ease: 'power3.inOut',
            duration: 1.1,
            scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-16 md:py-20">
      <div data-rule className="absolute inset-x-0 top-0 h-[2px] bg-ink" />
      <div className="grid items-start gap-10 lg:grid-cols-[0.5fr_1fr_1fr]">
        <Icon className="h-24 w-24 text-orange md:h-36 md:w-36" strokeWidth={1} />
        <div>
          <h2 className="cond text-4xl font-black leading-none md:text-6xl">{s.title}</h2>
          <p className="mt-5 max-w-md text-[17px] text-grey">{s.detail}</p>
        </div>
        <ul className="space-y-3 lg:pt-2">
          {s.points.map((p) => (
            <li key={p} data-pt className="flex items-start gap-3 text-[15px] font-medium">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHero
        title="Every job priced before we start."
        sub="Boiler repair, AC installation, annual servicing and emergency callouts. Flat-rate quotes, licensed engineers, no hidden call-out fees."
      />
      <div className="mx-auto max-w-[1320px] px-6 md:px-16">
        {services.map((s, i) => (
          <Row key={s.title} s={s} i={i} />
        ))}
      </div>
      <section className="bg-navy px-6 py-24 md:px-16">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <h2 className="cond text-4xl font-black leading-none md:text-6xl">Not sure which one you need?</h2>
            <p className="mt-5 max-w-md text-frost">
              Describe what is happening and an engineer will call you back with a flat-rate quote.
            </p>
          </div>
          <QuoteForm title="Describe the problem" />
        </div>
      </section>
    </>
  );
}
