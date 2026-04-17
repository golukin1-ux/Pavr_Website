import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-copper-500 relative overflow-hidden">
      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-copper-600/30 clip-path-diagonal pointer-events-none"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Ready to start your project?
          </h2>
          <p className="text-copper-100/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get a free DFM review and quote for your injection molding, tooling, or battery component project. Our engineers respond within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-press inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-[15px] rounded-lg shadow-sm transition-colors duration-200"
            >
              Request a Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-copper-600/40 hover:bg-copper-600/60 text-white font-semibold text-[15px] rounded-lg transition-all duration-200"
            >
              <Phone size={16} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
