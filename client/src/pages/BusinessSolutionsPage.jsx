import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Layers, Wrench, Zap, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CTASection from '../components/home/CTASection';
import { services } from '../data/services';

const iconMap = { Layers, Tool: Wrench, Wrench, Zap };

// Photos per service id. Extend these arrays to add more.
const servicePhotos = {
  'injection-molding': [
    '/photos/injection-molding/1.webp',
    '/photos/injection-molding/2.webp',
    '/photos/injection-molding/3.webp',
    '/photos/injection-molding/4.webp',
    '/photos/injection-molding/5.webp',
    '/photos/injection-molding/6.webp',
  ],
  'mold-manufacturing': [
    '/photos/mold-manufacturing/1.webp',
    '/photos/mold-manufacturing/2.webp',
  ],
  'battery-components': [
    '/photos/battery-components/1.webp',
    '/photos/battery-components/2.webp',
  ],

};

function HoverPhotoPanel({ photos, Icon, tagline }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    if (paused || photos.length < 2) return;
    timerRef.current = setInterval(next, 2800);
    return () => clearInterval(timerRef.current);
  }, [paused, photos.length]);

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-xl bg-navy-900 p-10 h-72 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Icon size={40} className="text-copper-400" strokeWidth={1.2} />
          </div>
          <p className="text-stone-400 font-display text-lg italic">{tagline}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl bg-navy-900 h-72 sm:h-80 relative overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.img
          key={photos[index]}
          src={photos[index]}
          alt=""
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale:   { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient + tagline overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent pointer-events-none" />

      {/* Prev / Next arrows — visible on hover */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <p className="text-white/90 font-display text-base sm:text-lg italic drop-shadow pointer-events-none">{tagline}</p>
        {photos.length > 1 && (
          <div className="flex gap-1 items-center">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 bg-copper-400' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
            <HoverPhotoPanel
              photos={servicePhotos[service.id] || []}
              Icon={Icon}
              tagline={service.tagline}
            />

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
        <meta name="description" content="Injection molding, mold manufacturing, and battery component solutions from Pavr." />
      </Helmet>

      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        {/* Background photo — contained (less zoom), centered */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/photos/solutions-hero-bg.webp')",
            backgroundSize: '140% auto',
            filter: 'grayscale(0.65) contrast(1.05) brightness(0.55)',
          }}
        />
        {/* Navy color wash for brand tint */}
        <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply" />
        {/* Radial vignette — fades all four edges into navy so the letterbox disappears */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(5,18,40,0.55) 65%, #051228 95%)',
          }}
        />
        {/* Side gradient fills for extra corner softening */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-transparent to-navy-900 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-transparent to-navy-900 pointer-events-none" />
        {/* Copper accent glow */}
        <div className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full bg-copper-500/15 blur-[140px] pointer-events-none" />
        {/* Blueprint grid on top for texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay pointer-events-none" />

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
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">
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
