import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function MidCTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24 lg:py-28 border-y border-navy-800">
      {/* Copper accent glow */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-copper-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-copper-400 mb-5">
              <span className="w-8 h-px bg-copper-500" />
              Mid-funnel
            </span>
            <h2 className="font-sans text-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] mb-4">
              Want to optimize your manufacturing process?
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Lower per-part cost, tighter tolerances, fewer rejections. Our engineers review your part, your tooling, and your run rates — then tell you exactly where the savings are.
            </p>
          </div>

          <Link
            to="/contact"
            className="btn-press group inline-flex items-center justify-center gap-3 px-7 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-[15px] rounded-md transition-colors duration-200 whitespace-nowrap self-start lg:self-end"
          >
            Talk to Our Team
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
