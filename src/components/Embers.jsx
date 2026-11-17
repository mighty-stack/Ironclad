import { useEffect, useRef } from 'react';

/** Rising embers on a canvas. Pauses off-screen and under reduced motion. */
export default function Embers({ count = 42 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = r.width * dpr;
      h = canvas.height = r.height * dpr;
    };
    const make = (scatter) => ({
      x: Math.random() * w,
      y: scatter ? Math.random() * h : h + 20,
      r: (Math.random() * 2 + 0.6) * dpr,
      vy: -(Math.random() * 0.6 + 0.25) * dpr,
      vx: (Math.random() - 0.5) * 0.3 * dpr,
      a: Math.random() * 0.7 + 0.2,
      ph: Math.random() * Math.PI * 2,
    });

    resize();
    const dots = Array.from({ length: count }, () => make(true));

    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx + Math.sin(t / 900 + d.ph) * 0.25 * dpr;
        d.y += d.vy;
        if (d.y < -20) dots[i] = make(false);
        const fade = Math.min(1, d.y / (h * 0.5));
        ctx.fillStyle = `rgba(232, 98, 44, ${(d.a * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
