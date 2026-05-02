import { Link } from 'react-router-dom';
import { Layers, Wrench, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceAccordion from '../ui/ServiceAccordion';

const services = [
  {
    num: '01',
    icon: Layers,
    title: 'Injection Molding',
    short: 'Prototype to high-volume — all major thermoplastics.',
    to: '/solutions#injection-molding',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Battery Components',
    short: 'PP containers, vent plugs & separators for battery manufacturers.',
    to: '/solutions#battery-components',
  },
  {
    num: '03',
    icon: Wrench,
    title: 'Mold Manufacturing',
    short: 'Precision tooling in P20 & H13 steel.',
    to: '/solutions#mold-manufacturing',
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20">
        <SectionHeading
          eyebrow="What we do"
          title="Your spec sheet deserves a straight answer."
          subtitle="Injection molding, mold manufacturing, and battery components. DFM review included."
        />

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left — Plain text description */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-navy-700 mb-4 leading-snug">
              One floor, one team,<br />fewer phone calls.
            </h3>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              Most of what our clients send us — drawings, samples, half-finished prototypes — passes through the same building from start to finish. The tool room, the molding bay, the quality lab, all within walking distance. It's slower to set up but faster to deliver, and a lot cheaper to fix when something needs changing.
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
