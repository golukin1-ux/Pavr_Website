import { useReducedMotion, motion, useTransform, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';
import HeroScrubCanvas from './HeroScrubCanvas';

const TRANSITION = { ease: [0.16, 1, 0.3, 1], duration: 0.7 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 1, y: 18 },
  show:   { opacity: 1, y: 0, transition: TRANSITION },
};

const revealLine = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { ...TRANSITION, delay: 0.7 } },
};

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const sectionRef   = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX  = useSpring(useTransform(mouseX, [0, 1], [-25, 25]), { stiffness: 60, damping: 20 });
  const glowY  = useSpring(useTransform(mouseY, [0, 1], [-25, 25]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (shouldReduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top)  / r.height);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [shouldReduce, mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-navy-900">

        <HeroScrubCanvas sectionRef={sectionRef} />

        {/* Overlays — deeper for clearer text on large type */}
        <div className="absolute inset-0 bg-navy-900/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/75 via-navy-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-navy-900 to-transparent" />

        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

        {/* Mouse-reactive warm glow — copper at low intensity */}
        <motion.div
          className="absolute w-[700px] h-[500px] bg-copper-500/[0.05] rounded-full blur-[120px] pointer-events-none"
          style={{ x: glowX, y: glowY, top: '20%', right: '15%' }}
        />

        {/* Vertical accent lines */}
        <div className="absolute top-0 right-[18%] w-px h-full bg-gradient-to-b from-transparent via-copper-500/15 to-transparent" />
        <div className="absolute top-0 right-[38%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

        {/* Content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 h-full flex items-end pb-20 md:pb-24"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
            <motion.div
              variants={shouldReduce ? {} : stagger}
              initial="hidden"
              animate="show"
              className="max-w-4xl"
            >
              {/* Kicker — tiny mono eyebrow */}
              <motion.p
                variants={slideUp}
                className="font-mono text-[11px] tracking-[0.24em] uppercase text-copper-400 mb-5 sm:mb-6"
              >
                Pavr Tools &amp; Technologies &nbsp;·&nbsp; Est. 2009
              </motion.p>

              {/* Headline — three benefits the client cares about */}
              <h1 className="font-sans text-white mb-5 sm:mb-7 font-semibold tracking-tight leading-[1] text-[clamp(1.75rem,5vw,4.25rem)]">
                <motion.span variants={slideUp} className="block">Reduce cost.</motion.span>
                <motion.span variants={slideUp} className="block text-copper-500">Improve quality.</motion.span>
                <motion.span variants={slideUp} className="block">Scale production.</motion.span>
              </h1>

              {/* Copper rule */}
              <motion.div
                variants={revealLine}
                className="w-20 h-[3px] bg-copper-500 mb-5 sm:mb-6"
              />

              {/* Subhead — positioning + capability proof */}
              <motion.p variants={slideUp} className="text-stone-200 text-sm sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-5 sm:mb-7">
                Precision injection moulding &amp; mould manufacturing — helping manufacturers in battery, automotive, medical, and clean-energy reduce cost, improve quality, and scale production. Fifteen years. One roof. ±0.05&nbsp;mm.
              </motion.p>

              {/* Value hook — instant-gratification subtext above CTAs */}
              <motion.p
                variants={slideUp}
                className="font-mono text-[11px] sm:text-[12px] tracking-[0.22em] uppercase text-copper-400 mb-5 sm:mb-7"
              >
                Keep improving quality.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={slideUp} className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link
                  to="/contact"
                  className="btn-press group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-copper-600 hover:bg-copper-700 text-white font-semibold text-[14px] sm:text-[15px] rounded-md transition-colors duration-200"
                >
                  Start Your Project
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/solutions"
                  className="btn-press inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/20 hover:border-copper-500/60 text-stone-200 hover:text-white font-medium text-[14px] sm:text-[15px] rounded-md transition-all duration-200"
                >
                  See capabilities
                </Link>
              </motion.div>

              {/* Stats row — defensible numbers only */}
              <motion.div
                variants={slideUp}
                className="pt-5 sm:pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 sm:gap-x-10 max-w-2xl"
              >
                {[
                  { value: '15+', label: 'Years' },
                  { value: '50+', label: 'Clients' },
                  { value: '12',  label: 'Engineers' },
                  { value: '70+', label: 'Total Team' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...TRANSITION, delay: 0.6 + i * 0.07 }}
                  >
                    <p className="font-sans text-xl sm:text-[28px] text-white font-semibold tracking-tight">{stat.value}</p>
                    <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-[0.18em] mt-1.5">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-stone-400" />
          </motion.div>
          <p className="text-stone-400 text-[10px] font-mono uppercase tracking-[0.2em] mt-1">Scroll</p>
        </motion.div>
      </div>
    </section>
  );
}
