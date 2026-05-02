import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-stone-50 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[56px] text-stone-900 mb-7 leading-[1.05] tracking-tight font-semibold">
            Start a new project with us.
          </h2>

          <p className="text-stone-600 text-lg leading-relaxed mb-10 max-w-xl">
            DFM review is included. No deposit to start. Your brief goes to an engineer who's seen a few thousand parts like yours — not a form-response queue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="btn-press group inline-flex items-center justify-center gap-3 px-7 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-[15px] rounded-md transition-colors duration-200"
            >
              Contact us
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              to="/solutions"
              className="btn-press inline-flex items-center justify-center gap-3 px-7 py-4 border border-stone-300 hover:border-stone-500 text-stone-700 hover:text-stone-900 font-medium text-[15px] rounded-md transition-all duration-200"
            >
              See capabilities
            </Link>
          </div>

          {/* Response-time badge */}
          <div className="mt-12 pt-8 border-t border-stone-200 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Response time</p>
              <p className="font-sans text-stone-900 text-sm font-medium">Within 24 hours, Mon–Sat</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">DFM review</p>
              <p className="font-sans text-stone-900 text-sm font-medium">Included, no deposit</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Typical tolerance</p>
              <p className="font-sans text-stone-900 text-sm font-medium">±0.05 mm</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
