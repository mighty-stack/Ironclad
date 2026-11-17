import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Magnetic from './Magnetic';
import { PHONE, PHONE_HREF, navLinks } from '../data';

export function Topbar() {
  return (
    <div className="flex justify-between gap-4 bg-navy px-6 py-2.5 text-[13px] text-[#CBD5DE] md:px-16">
      <span>Serving Greater London &amp; surrounding areas</span>
      <a href={PHONE_HREF} className="hidden sm:inline">
        Emergency line: {PHONE}
      </a>
    </div>
  );
}

const menuVariants = {
  closed: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  open: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

export default function Header() {
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 220);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return undefined;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-ink bg-white px-6 py-4 md:px-16 md:py-5"
      >
        <Link to="/" className="font-display text-[22px] font-black" aria-label="Ironclad Heating and Air, home">
          IRON<span className="text-orange">CLAD</span>
        </Link>

        <nav className="hidden gap-9 text-[15px] font-medium md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className="relative py-1">
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-orange"
                      transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <a href={PHONE_HREF} className="block bg-orange px-6 py-3 text-[15px] font-bold text-white">
              Call Now
            </a>
          </Magnetic>
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0, backgroundColor: open ? '#fff' : '#1B1F23' }}
              className="block h-[2px] w-6"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0, backgroundColor: open ? '#fff' : '#1B1F23' }}
              className="block h-[2px] w-6"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy px-8 text-white md:hidden"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <div key={l.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <Link to={l.to} className="cond block font-display text-5xl font-black leading-tight">
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <a href={PHONE_HREF} className="mt-10 block bg-orange py-4 text-center text-lg font-bold">
              Call {PHONE}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
