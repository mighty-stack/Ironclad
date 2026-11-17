import SplitText from './SplitText';
import Embers from './Embers';

export default function PageHero({ title, sub, children }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="heat-bg absolute inset-0 opacity-60" />
      <Embers count={28} />
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-24 md:px-16 md:py-32">
        <SplitText
          as="h1"
          text={title}
          delay={0.8}
          className="cond block max-w-4xl text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.94]"
        />
        <p className="mt-7 max-w-xl text-lg text-frost">{sub}</p>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
