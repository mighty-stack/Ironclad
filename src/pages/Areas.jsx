import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, useGSAP } from '../lib/gsap';
import PageHero from '../components/PageHero';
import { postcodeSchema } from '../components/QuoteForm';
import { areaGroups, coveredPrefixes } from '../data';

function outward(code) {
  const m = code.trim().toUpperCase().match(/^([A-Z]{1,2})\d/);
  return m ? m[1] : '';
}

function Checker() {
  const [result, setResult] = useState(null);
  const formik = useFormik({
    initialValues: { postcode: '' },
    validationSchema: Yup.object({ postcode: postcodeSchema }),
    onSubmit: (v, h) => {
      const covered = coveredPrefixes.includes(outward(v.postcode));
      setResult({ covered, code: v.postcode.trim().toUpperCase() });
      h.setSubmitting(false);
    },
  });
  const error = formik.touched.postcode && formik.errors.postcode;

  return (
    <div className="mt-2 max-w-xl">
      <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="pc" className="sr-only">
            Postcode
          </label>
          <input
            id="pc"
            name="postcode"
            placeholder="Enter your postcode"
            autoComplete="postal-code"
            value={formik.values.postcode}
            onChange={(e) => {
              setResult(null);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'pc-error' : undefined}
            className="w-full border-2 border-white bg-white px-4 py-4 text-ink outline-none"
          />
        </div>
        <button type="submit" className="bg-orange px-7 py-4 font-bold transition-colors hover:bg-white hover:text-ink">
          Check coverage
        </button>
      </form>
      {error && (
        <p id="pc-error" role="alert" className="mt-3 text-sm font-semibold text-[#FFB59A]">
          {error}
        </p>
      )}
      <AnimatePresence mode="wait">
        {result && (
          <motion.p
            key={result.code + result.covered}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            role="status"
            className={`mt-4 inline-block px-4 py-3 font-bold ${result.covered ? 'bg-white text-ink' : 'bg-orange text-white'}`}
          >
            {result.covered
              ? `Yes, we cover ${result.code}. Same-day response available.`
              : `${result.code} is outside our usual area. Call us and we will check whether we can reach you.`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Areas() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-group]').forEach((g) => {
          gsap.from(g.querySelectorAll('[data-chip]'), {
            scale: 0.4,
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'back.out(2.2)',
            stagger: { each: 0.045, from: 'random' },
            scrollTrigger: { trigger: g, start: 'top 82%', once: true },
          });
          gsap.fromTo(
            g.querySelector('[data-rule]'),
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: '0% 50%',
              duration: 1,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: g, start: 'top 85%', once: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <>
      <PageHero title="Where we work." sub="Greater London and the surrounding boroughs. Check your postcode to see if we cover it.">
        <Checker />
      </PageHero>
      <section ref={root} className="mx-auto max-w-[1320px] px-6 py-24 md:px-16">
        <div className="space-y-14">
          {Object.entries(areaGroups).map(([group, list]) => (
            <div key={group} data-group className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
              <div>
                <div data-rule className="mb-4 h-[2px] bg-ink" />
                <h2 className="cond text-4xl font-black leading-none">{group}</h2>
              </div>
              <ul className="flex flex-wrap gap-3 pt-0 md:pt-6">
                {list.map((a) => (
                  <li
                    key={a}
                    data-chip
                    className="cursor-default border-2 border-ink bg-white px-4 py-2 text-[15px] font-semibold transition-colors duration-200 hover:bg-orange hover:text-white"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
