import { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from '../lib/gsap';

const ease = [0.76, 0, 0.24, 1];

/** Route wrapper: orange curtain wipes up over the old page, then off the new one. */
export default function PageWrap({ children }) {
  useLayoutEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.main id="main">
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-orange"
        variants={{
          initial: { scaleY: 1, originY: 0 },
          enter: { scaleY: 0, originY: 0, transition: { duration: 0.8, ease, delay: 0.05 } },
          leave: { scaleY: 1, originY: 1, transition: { duration: 0.6, ease, originY: { duration: 0 } } },
        }}
        initial="initial"
        animate="enter"
        exit="leave"
      />
    </motion.main>
  );
}
