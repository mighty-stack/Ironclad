# Ironclad Heating & Air (demo site)

React 18, Vite, Tailwind CSS, GSAP (ScrollTrigger), Framer Motion, Lenis smooth scroll, Formik + Yup.

## Run
    npm install
    npm run dev

## Add your hero video
Put your file at `public/videos/hero.mp4` (optional poster at `public/videos/hero-poster.jpg`).
It autoplays muted and loops behind the home hero. Until the file exists, an animated heat
gradient shows instead. To change the path or overlay darkness, edit the props on
`<VideoSlot />` in `src/pages/Home.jsx`. Keep the clip under about 8 MB, 1080p, H.264.

## Where things are
- `src/components/QuoteForm.jsx`  Formik + Yup form (fake submit, 1.7s delay, success screen).
  To send real submissions, replace the body of `onSubmit`.
- `src/data.js`  all copy, services, reviews, areas. The reviews are sample content.
- `src/components/`  SplitText, Magnetic, Counter, Marquee, Embers, ScrollGauge, PageWrap (route transitions)
- `tailwind.config.js`  palette from the original mockup

Reduced-motion users get a static version of every animation.
