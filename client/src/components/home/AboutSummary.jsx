import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Parallax from '../ui/Parallax';

const strengths = [
  { year: '2010', text: 'Founded in a Gurugram garage as AVR Tools — making precision moulds for OEMs that trusted a young shop.' },
  { year: '2018', text: 'Launched the battery components division. Today it ships to two-wheeler EV and industrial battery lines across India.' },
  { year: '2025', text: 'Relocated to Reliance MET City, Jhajjar. Rebranded as Pavr Tools & Technologies — same people, bigger floor.' },
  { year: '2026', text: 'Pursuing IATF 16949 to qualify for global automotive OEM supply chains.' },
];

export default function AboutSummary() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="About"
          title="A tool room that grew into a factory — slowly, on purpose."
          subtitle="Fifteen years, one family of engineers, one shared discipline: pick up the phone, own the mistake, ship the part."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — vision & strengths */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-stone-700 text-lg leading-relaxed mb-5">
              We exist for one reason — to make parts other factories quietly rely on. Battery containers, medical-grade components, the moulds behind both. No drama, no missed milestones.
            </p>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-6">
              Why customers trust us: an engineer answers when you call, DFM review is free, and the same team that designed your mould runs the moulding bay. That's the whole pitch. The numbers — ±0.05 mm, 500K+ shot moulds, 98% batch-to-batch consistency — are how we keep that promise.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-copper-600 hover:text-copper-700 text-sm font-semibold transition-colors"
            >
              Read the full story <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Right — historical journey, lags gently against scroll for depth */}
          <Parallax speed={0.06} className="lg:col-span-5">
            <motion.ol
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 border-l border-copper-200 pl-6"
            >
              {strengths.map((s) => (
                <li key={s.year} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-copper-500 ring-4 ring-white" />
                  <p className="font-mono text-[10px] text-copper-600 uppercase tracking-[0.22em] mb-1">{s.year}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{s.text}</p>
                </li>
              ))}
            </motion.ol>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
