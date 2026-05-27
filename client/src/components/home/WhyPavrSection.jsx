import { motion } from 'framer-motion';
import { Factory, Gauge, Wallet, Crosshair } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const pillars = [
  {
    icon: Factory,
    title: 'In-house mould + production',
    desc: 'Tool room, moulding bay, and quality lab inside one perimeter. No subcontracting, no hand-offs that lose a week.',
  },
  {
    icon: Gauge,
    title: 'Faster turnaround',
    desc: 'DFM review in 48 hours. T1 samples in 4–10 weeks. Scheduled supply with dates we hold — not estimates we revise.',
  },
  {
    icon: Wallet,
    title: 'Cost optimization',
    desc: 'We flag wall-thickness, gating, and cycle-time problems before steel is cut. Saves you tooling rework and per-shot cost.',
  },
  {
    icon: Crosshair,
    title: 'Precision engineering',
    desc: 'Machining to ±0.005 mm. Moulded parts to ±0.05 mm. 100% dimensional inspection on every PPAP run.',
  },
];

export default function WhyPavrSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Why PAVR"
          title="Four reasons buyers stop shopping around."
          subtitle="Most of our customers came to us after a tooling vendor missed a milestone or a moulder shipped out-of-spec parts. These are the four things we don't compromise on."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 bg-stone-50 rounded-lg border border-stone-200 hover:border-copper-300 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-stone-200 group-hover:bg-copper-50 group-hover:border-copper-200 flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={22} className="text-stone-500 group-hover:text-copper-500 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-stone-900 text-lg font-semibold mb-2 leading-snug">{p.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
