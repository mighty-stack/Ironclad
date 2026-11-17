import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import PageHero from '../components/PageHero';
import Counter from '../components/Counter';
import { StarIcon } from '../components/Icons';
import { ratingBars, reviews } from '../data';

function Stars({ n = 5 }) {
  return (
    <span className="flex gap-0.5 text-orange" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </span>
  );
}

function Summary() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-bar]', {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="mx-auto grid max-w-[1100px] gap-12 px-6 py-20 md:grid-cols-[auto_1fr] md:gap-20 md:px-16">
      <div>
        <p className="cond font-display text-[7rem] font-black leading-none md:text-[9rem]">
          <Counter to={4.8} decimals={1} />
        </p>
        <Stars />
        <p className="mt-2 text-sm text-grey">Google rating</p>
      </div>
      <div className="flex flex-col justify-center gap-3">
        {ratingBars.map((b) => (
          <div key={b.stars} className="flex items-center gap-4 text-sm font-semibold">
            <span className="w-12">{b.stars} star</span>
            <div className="h-3 flex-1 bg-ink/10">
              <div data-bar className="h-full bg-orange" style={{ width: `${b.pct}%` }} />
            </div>
            <span className="w-10 text-right text-grey">{b.pct}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({ r }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const el = ref.current;
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        const move = (e) => {
          const b = el.getBoundingClientRect();
          ry(((e.clientX - b.left) / b.width - 0.5) * 10);
          rx(-((e.clientY - b.top) / b.height - 0.5) * 10);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        return () => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <div style={{ perspective: 900 }} data-card>
      <figure
        ref={ref}
        className="h-full border-2 border-ink bg-white p-7 transition-shadow duration-300 hover:shadow-hard"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Stars />
        <blockquote className="mt-4 text-[16px] leading-relaxed">{r.text}</blockquote>
        <figcaption className="mt-6 text-sm">
          <span className="font-bold">{r.name}</span>
          <span className="text-grey">
            {', '}
            {r.area}, {r.service}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Reviews() {
  const grid = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-card]', {
          y: 90,
          rotate: (i) => (i % 2 ? 2.5 : -2.5),
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: { trigger: grid.current, start: 'top 80%', once: true },
        });
      });
    },
    { scope: grid }
  );

  return (
    <>
      <PageHero title="What customers say." sub="Rated 4.8 on Google across boiler repairs, installs and emergency callouts." />
      <Summary />
      <section ref={grid} className="mx-auto max-w-[1320px] px-6 pb-28 md:px-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </div>
        <p className="mt-8 text-sm text-grey">Sample reviews shown for demonstration.</p>
      </section>
    </>
  );
}
