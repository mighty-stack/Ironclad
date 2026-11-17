import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';
import VideoSlot from '../components/VideoSlot';
import Embers from '../components/Embers';
import SplitText from '../components/SplitText';
import Magnetic from '../components/Magnetic';
import Counter from '../components/Counter';
import Marquee from '../components/Marquee';
import QuoteForm from '../components/QuoteForm';
import ServiceCard from '../components/ServiceCard';
import { CheckIcon, ClockIcon, ShieldIcon, TagIcon } from '../components/Icons';
import { PHONE, PHONE_HREF, marqueeItems, reasons, services } from '../data';

const reasonIcons = { tag: TagIcon, shield: ShieldIcon, clock: ClockIcon };

function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-in]', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 1.5,
        });
        gsap.from('[data-panel]', {
          xPercent: 12,
          rotate: 2,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 1.3,
        });
        // headline drifts up slower than the page, video holds still
        gsap.to('[data-parallax]', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-navy text-white">
      <VideoSlot />
      <Embers />
      <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-14 px-6 py-20 md:px-16 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div data-parallax>
          <h1 className="cond text-[clamp(3.2rem,8.5vw,7rem)] font-black leading-[0.92]">
            <SplitText text="Your heating breaks." delay={0.6} className="block" />
            <SplitText text="We fix it today." delay={0.95} className="block text-orange" />
          </h1>
          <p data-hero-in className="mt-7 max-w-[480px] text-lg text-frost">
            Licensed HVAC technicians covering boiler repair, installation, and emergency callouts across London. Most
            jobs completed same-day.
          </p>
          <div data-hero-in className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a href="#quote" className="block bg-orange px-8 py-4 text-base font-bold">
                Get a free quote
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={PHONE_HREF}
                className="block border-2 border-white px-7 py-3.5 text-base font-bold transition-colors hover:bg-white hover:text-ink"
              >
                {PHONE}
              </a>
            </Magnetic>
          </div>
          <dl data-hero-in className="mt-12 flex flex-wrap gap-x-9 gap-y-5 text-sm text-[#9AA6B1]">
            <div>
              <dt className="sr-only">Years in business</dt>
              <dd>
                <strong className="block font-display text-xl text-white">
                  <Counter to={15} suffix="+" />
                </strong>
                Years in business
              </dd>
            </div>
            <div>
              <dt className="sr-only">Emergency callouts</dt>
              <dd>
                <strong className="block font-display text-xl text-white">
                  <Counter to={24} suffix="/7" />
                </strong>
                Emergency callouts
              </dd>
            </div>
            <div>
              <dt className="sr-only">Google rating</dt>
              <dd>
                <strong className="block font-display text-xl text-white">
                  <Counter to={4.8} decimals={1} suffix="★" />
                </strong>
                Google rating
              </dd>
            </div>
          </dl>
        </div>

        <div id="quote" data-panel>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

function Services() {
  const root = useRef(null);
  return (
    <section ref={root} className="mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-28">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SplitText
          as="h2"
          inView
          text="Straightforward pricing for every job we handle."
          className="cond block max-w-xl text-4xl font-black leading-[0.98] md:text-6xl"
        />
        <p className="max-w-[280px] text-[15px] text-grey">
          No hidden call-out fees. You'll know the cost before we start.
        </p>
      </div>
      <div className="grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.title} service={s} />
        ))}
      </div>
      <Link to="/services" className="mt-8 inline-block border-b-2 border-orange pb-1 font-bold">
        See what each service includes
      </Link>
    </section>
  );
}

/** Pinned section: the reasons stack in one by one while the headline stays put. */
function Why() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray('[data-reason]');
        gsap.set(items, { opacity: 0.18, x: 40 });
        gsap.set(items[0], { opacity: 1, x: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=1800',
            pin: true,
            scrub: 0.6,
          },
        });
        items.forEach((el, i) => {
          if (i === 0) return;
          tl.to(items[i - 1], { opacity: 0.18, x: 40, duration: 1 }, i * 1.4)
            .to(el, { opacity: 1, x: 0, duration: 1 }, i * 1.4)
            .to('[data-bar]', { scaleY: (i + 1) / items.length, duration: 1 }, i * 1.4);
        });
        gsap.set('[data-bar]', { scaleY: 1 / items.length, transformOrigin: '50% 0%' });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-ink text-white lg:flex lg:min-h-screen lg:items-center">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-6 py-24 md:px-16 lg:grid-cols-2 lg:gap-20 lg:py-0">
        <SplitText
          as="h2"
          inView
          text="Homeowners choose Ironclad because we show up when we say we will."
          className="cond block max-w-lg text-4xl font-black leading-[0.98] md:text-6xl"
        />
        <div className="relative pl-8">
          <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-white/15">
            <div data-bar className="h-full w-full origin-top bg-orange" />
          </div>
          {reasons.map((r, i) => {
            const Icon = reasonIcons[r.icon];
            return (
              <div key={r.title} data-reason className="flex gap-5 border-b border-[#333B42] py-7 last:border-b-0">
                <Icon className="mt-1 h-7 w-7 shrink-0 text-orange" />
                <div>
                  <h3 className="mb-2 text-lg font-black">{r.title}</h3>
                  <p className="text-[15px] text-[#C6CDD3]">{r.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Checklist() {
  const items = ['Flat-rate quote before work starts', 'Same-day response, 7 days a week', 'No overtime or weekend charges'];
  return (
    <section className="border-b-2 border-ink bg-paper py-10">
      <Marquee items={marqueeItems} />
      <ul className="mx-auto mt-10 flex max-w-[1320px] flex-col gap-4 px-6 md:flex-row md:gap-10 md:px-16">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-3 text-[15px] font-semibold">
            <CheckIcon className="h-5 w-5 text-orange" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Checklist />
      <Services />
      <Why />
    </>
  );
}
