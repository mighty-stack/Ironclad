import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import SplitText from './SplitText';
import { PHONE, PHONE_HREF, navLinks } from '../data';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-orange px-6 pb-10 pt-20 text-white md:px-16">
      <div className="flex flex-col items-start justify-between gap-10 border-b border-white/30 pb-12 lg:flex-row lg:items-center">
        <SplitText
          as="h2"
          inView
          text="Heating gone out? Don't wait it out."
          className="cond max-w-3xl text-5xl font-black leading-[0.95] md:text-7xl"
        />
        <Magnetic strength={0.4}>
          <a href={PHONE_HREF} className="block bg-ink px-9 py-5 text-lg font-bold">
            Call {PHONE}
          </a>
        </Magnetic>
      </div>

      <div className="grid gap-8 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-black">
            IRON<span className="text-ink">CLAD</span>
          </p>
          <p className="mt-2 max-w-xs text-[#FFE3D6]">Licensed heating and air technicians across Greater London.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 font-medium">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="w-fit underline-offset-4 hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-[#FFE3D6]">Emergency callouts 24/7. Same-day response, 7 days a week.</p>
      </div>

      <div className="flex flex-col justify-between gap-2 pt-6 text-[13px] text-[#FFE3D6] md:flex-row">
        <span>© 2026 Ironclad Heating &amp; Air Ltd</span>
        <span>Gas Safe Registered, Fully Insured</span>
      </div>
    </footer>
  );
}
