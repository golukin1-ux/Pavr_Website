import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Wrench, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import CTASection from '../components/home/CTASection';
import { services } from '../data/services';

const iconMap = { Layers, Tool: Wrench, Wrench, Zap };

function MetricCard({ label, value }) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-center">
      <p className="font-display text-xl text-copper-600">{value}</p>
      <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

function ServiceBlock({ service, index }) {
  const isEven = index % 2 === 0;
  const Icon = iconMap[service.icon] || Zap;

  return (
    <section id={service.id} className={`py-24 ${isEven ? 'bg-white' : 'bg-stone-50'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-start`}>
          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-5/12 w-full lg:sticky lg:top-24"
          >
            <div className="rounded-xl bg-navy-900 p-10 h-72 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-50" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={40} className="text-copper-400" strokeWidth={1.2} />
                </div>
                <p className="text-stone-400 font-display text-lg italic">{service.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {service.metrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          </motion.div>

          {/* Content panel */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-7/12 w-full"
          >
            <span className="font-mono text-xs text-copper-500 tracking-widest uppercase mb-4 block">
              0{index + 1}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-stone-700 mb-4">{service.title}</h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-10">{service.description}</p>

            {/* Capabilities */}
            <div className="mb-10">
              <h4 className="text-stone-700 font-semibold text-sm uppercase tracking-wider mb-4">Key Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-sage-500 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-500 text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-10">
              <h4 className="text-stone-700 font-semibold text-sm uppercase tracking-wider mb-5">Our Process</h4>
              <div className="space-y-4">
                {service.process.map((step) => (
                  <div key={step.step} className="flex gap-5">
                    <div className="w-8 h-8 rounded-md bg-copper-500 flex items-center justify-center text-white font-mono text-xs font-medium flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="pt-1">
                      <p className="text-stone-700 font-medium text-sm">{step.title}</p>
                      <p className="text-stone-400 text-sm mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-lg transition-all duration-200"
            >
              Get a Quote for {service.title} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BusinessSolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Business Solutions — Pavr Tools & Technologies</title>
        <meta name="description" content="Injection molding, mold manufacturing, mold repair, and battery component solutions from Pavr." />
      </Helmet>

      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              Our Capabilities
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-5 max-w-3xl leading-[1.05]">
              Business Solutions
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">
              Four core manufacturing capabilities, all under one roof. From tooling design to final part delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {services.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}

      <CTASection />
    </>
  );
}
