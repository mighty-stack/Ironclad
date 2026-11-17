import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Masked word-by-word headline reveal.
 * Set inView to trigger on scroll instead of on mount.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  inView = false,
  stagger = 0.06,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = ref.current.querySelectorAll('[data-w]');
        gsap.from(words, {
          yPercent: 120,
          rotate: 5,
          duration: 1.1,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: inView
            ? { trigger: ref.current, start: 'top 88%', once: true }
            : undefined,
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="-mb-[0.1em] -mt-[0.1em] inline-block overflow-hidden pb-[0.1em] pt-[0.1em] align-bottom"
        >
          <span data-w className="inline-block origin-left will-change-transform">
            {word}
          </span>
          {' '}
        </span>
      ))}
    </Tag>
  );
}
