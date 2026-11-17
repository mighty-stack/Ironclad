import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, useGSAP } from '../lib/gsap';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import Magnetic from '../components/Magnetic';
import { PhoneIcon } from '../components/Icons';
import { PHONE, PHONE_HREF, faqs } from '../data';

const steps = [
  { t: 'You call', d: 'The emergency line is answered by a person who takes the details of the fault and your postcode.' },
  { t: 'We quote', d: 'You get a flat-rate price over the phone before anyone is sent out.' },
  { t: 'Engineer dispatched', d: 'A licensed, background-checked engineer is on the way the same day, any day of the week.' },
  { t: 'Fixed and signed off', d: 'The repair is completed and tested. The invoice matches the quote.' },
];

function Timeline() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: '50% 0%',
            scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 70%', scrub: 0.5 },
          }
        );
        gsap.utils.toArray('[data-step]').forEach((el) => {
          const dot = el.querySelector('[data-dot]');
          gsap.fromTo(
            dot,
            { scale: 0.6, backgroundColor: '#fff' },
            {
              scale: 1.15,
              backgroundColor: '#E8622C',
              ease: 'back.out(3)',
              duration: 0.5,
              scrollTrigger: { trigger: el, start: 'top 62%', toggleActions: 'play none none reverse' },
            }
          );
          gsap.from(el.querySelector('[data-body]'), {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 72%', once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="mx-auto max-w-[900px] px-6 py-24 md:px-16">
      <h2 className="cond mb-14 text-4xl font-black leading-none md:text-6xl">What happens after you call</h2>
      <div ref={root} className="relative pl-12 md:pl-16">
        <div className="absolute bottom-0 left-[11px] top-0 w-[3px] bg-ink/10 md:left-[15px]">
          <div data-line className="h-full w-full bg-orange" />
        </div>
        {steps.map((s, i) => (
          <div key={s.t} data-step className="relative pb-14 last:pb-0">
            <span
              data-dot
              className="absolute -left-12 top-1 h-6 w-6 rounded-full border-[3px] border-ink bg-white md:-left-16 md:h-8 md:w-8"
            />
            <div data-body>
              <p className="text-sm font-bold text-orange">Step {i + 1}</p>
              <h3 className="mt-1 text-2xl font-black">{s.t}</h3>
              <p className="mt-2 max-w-md text-grey">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[900px] px-6 pb-24 md:px-16">
      <h2 className="cond mb-8 text-4xl font-black leading-none md:text-5xl">Common questions</h2>
      <div className="border-t-2 border-ink">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b-2 border-ink">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-bold"
              >
                {f.q}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="text-3xl leading-none text-orange"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-6 text-grey">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Emergency() {
  return (
    <>
      <PageHero
        title="No heating? Call now."
        sub="Same-day response, 7 days a week, no overtime charges. Price quoted before we start."
      >
        <Magnetic strength={0.3}>
          <a href={PHONE_HREF} className="relative flex items-center gap-4 bg-orange px-8 py-5 text-xl font-black">
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="pulse-ring absolute inset-0 rounded-full bg-white/70" />
              <PhoneIcon className="relative h-6 w-6" />
            </span>
            {PHONE}
          </a>
        </Magnetic>
      </PageHero>

      <Timeline />

      <section className="bg-navy px-6 py-24 md:px-16">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <h2 className="cond text-4xl font-black leading-none md:text-6xl">Prefer we call you?</h2>
            <p className="mt-5 max-w-md text-frost">
              Leave your number and postcode. We call back with a flat-rate price.
            </p>
          </div>
          <QuoteForm title="Request an emergency callback" button="Call me back" withPostcode />
        </div>
      </section>

      <div className="pt-24">
        <Faq />
      </div>
    </>
  );
}
