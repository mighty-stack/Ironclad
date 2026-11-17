import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import Header, { Topbar } from './components/Header';
import Footer from './components/Footer';
import ScrollGauge from './components/ScrollGauge';
import PageWrap from './components/PageWrap';
import Home from './pages/Home';
import Services from './pages/Services';
import Emergency from './pages/Emergency';
import Reviews from './pages/Reviews';
import Areas from './pages/Areas';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-white px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Topbar />
      <Header />
      <ScrollGauge />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrap><Home /></PageWrap>} />
          <Route path="/services" element={<PageWrap><Services /></PageWrap>} />
          <Route path="/emergency" element={<PageWrap><Emergency /></PageWrap>} />
          <Route path="/reviews" element={<PageWrap><Reviews /></PageWrap>} />
          <Route path="/areas" element={<PageWrap><Areas /></PageWrap>} />
          <Route path="*" element={<PageWrap><Home /></PageWrap>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
