import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import ServiceAccordion from '../ui/ServiceAccordion';

export default function ServicesOverview() {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20">
        <SectionHeading
          eyebrow="Solutions"
          title="Mould design and manufacturing — built to lower your per-part cost."
          subtitle="Three integrated capabilities that show up in your P&L as fewer rejections, shorter cycles, and PPAP-ready documentation."
        />

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left — Benefit-led description */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-navy-700 mb-4 leading-snug">
              Lower cost.<br />Tighter tolerances.<br />Predictable supply.
            </h3>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Mould design done in-house means cycle-time and gating problems get caught at DFM — not after the steel is cut. Manufacturing under the same roof means quality holds batch-to-batch. The result: fewer rejected parts, shorter lead times, and a delivery date we hold instead of revise.
            </p>
            <Link
              to="/solutions"
              className="inline-block mt-6 text-copper-600 hover:text-copper-700 text-sm font-semibold transition-colors"
            >
              See how we work &rarr;
            </Link>
          </div>

          {/* Right — Image Accordion (clickable) */}
          <div className="lg:col-span-3">
            <ServiceAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
