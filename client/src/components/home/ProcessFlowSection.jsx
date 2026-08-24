import { motion } from 'framer-motion';
import { FileSearch, Hammer, FlaskConical, Cog, Truck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  { icon: FileSearch,    title: 'Design Review (DFM)', desc: 'Free 48-hour DFM. We flag undercuts, gating, wall-thickness, and cycle-time risks before any steel is cut.' },
  { icon: Hammer,        title: 'Mould Development',   desc: 'Engineering drawings, mould-flow simulation, in-house tool build in P20 / H13 / S136 / NAK80.' },
  { icon: FlaskConical,  title: 'Testing',             desc: 'T1 samples, full dimensional report, material certification, and PPAP submission. Sign-off before scale-up.' },
  { icon: Cog,           title: 'Production',          desc: 'Scheduled runs with SPC and 100% dimensional inspection. Consistency cycle-to-cycle across 500K+ shot runs.' },
  { icon: Truck,         title: 'Delivery',            desc: 'Weekly or monthly draws. You get a date — we hold it. Full material traceability on every shipment.' },
];

export default function ProcessFlowSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-stone-50 border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="How we work"
          title="From drawing to dock — one floor, five steps."
          subtitle="No subcontracted tooling, no hand-offs to a separate moulder. Every phase happens inside the same building, run by the same engineers."
        />

        {/* Desktop: horizontal connected timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-copper-300 to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-copper-400 flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={20} className="text-copper-500" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-[10px] text-copper-600 tracking-[0.2em] uppercase mb-2">0{i + 1}</span>
                  <h3 className="font-sans text-stone-900 text-base font-semibold mb-2">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed px-2">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="lg:hidden relative space-y-6">
          <div className="absolute left-7 top-2 bottom-2 w-px bg-copper-200" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5"
              >
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-copper-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon size={20} className="text-copper-500" strokeWidth={1.6} />
                </div>
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-copper-600 tracking-[0.2em] uppercase block mb-1">0{i + 1}</span>
                  <h3 className="font-sans text-stone-900 text-base font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
