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
    icon: Wrench,
    title: 'Mold Manufacturing',
    short: 'Precision tooling in P20 & H13 steel.',
    to: '/solutions#mold-manufacturing',
  },
  {
    num: '03',
    icon: Wrench,
    title: 'Mold Repair',
    short: '24–48 hour emergency turnaround.',
    to: '/solutions#mold-repair',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Battery Components',
    short: 'LFP & NMC packs for EV and solar storage.',
    to: '/solutions#battery-components',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Services"
          title="How we can help"
          subtitle="Four core capabilities under one roof, each backed by decades of expertise and in-house tooling."
        />

        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left — Plain text description */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-navy-700 mb-4">Everything under one roof</h3>
            <p className="text-stone-600 text-[15px] leading-relaxed">
              End-to-end manufacturing — from precision injection molding and custom mold fabrication to rapid mold repair and battery component production. In-house tooling, fewer handoffs, faster delivery.
            </p>
            <Link
              to="/solutions"
              className="inline-block mt-6 text-copper-600 hover:text-copper-700 text-sm font-semibold transition-colors"
            >
              View all solutions &rarr;
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
