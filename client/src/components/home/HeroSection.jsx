import { useReducedMotion, motion, useTransform, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';

const TRANSITION = { ease: [0.16, 1, 0.3, 1], duration: 0.7 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: TRANSITION },
};

const revealLine = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { ...TRANSITION, delay: 0.7 } },
};

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const sectionRef   = useRef(null);
  const videoRef     = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduce) return;
    const init = () => {
      video.play()
        .then(() => { video.pause(); video.currentTime = 0; })
        .catch(() => {});
    };
    if (video.readyState >= 2) init();
    else {
      video.addEventListener('canplay', init, { once: true });
      return () => video.removeEventListener('canplay', init);
    }
  }, [shouldReduce]);

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || shouldReduce) return;

    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId = null;
    let visible = false;

    const getProgress = () => {
      const top = -section.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, top / (window.innerHeight * 2)));
    };

    const onScroll = () => { if (visible) targetProgress = getProgress(); };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      smoothProgress += (targetProgress - smoothProgress) * 0.55;
      if (!video.duration || !isFinite(video.duration)) return;
      const targetTime = smoothProgress * video.duration;
      if (Math.abs(targetTime - video.currentTime) > 1 / 60) {
        video.currentTime = targetTime;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) {
          targetProgress = getProgress();
          rafId = requestAnimationFrame(tick);
        } else if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(section);

    targetProgress = getProgress();
    smoothProgress = targetProgress;

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [shouldReduce]);

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

        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

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
          className="relative z-10 h-full flex items-center"
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
                className="font-mono text-[11px] tracking-[0.24em] uppercase text-copper-400 mb-6 sm:mb-8"
              >
                Pavr Tools &amp; Technologies &nbsp;·&nbsp; Est. 2009
              </motion.p>

              {/* Headline — three stacked claims (Option E, three-fact cadence) */}
              <h1 className="font-sans text-white mb-8 sm:mb-10 font-semibold tracking-tight leading-[0.98] text-[clamp(2.5rem,6.5vw,5.25rem)]">
                <motion.span variants={slideUp} className="block">Precision engineering.</motion.span>
                <motion.span variants={slideUp} className="block text-copper-500">Integrated tooling.</motion.span>
                <motion.span variants={slideUp} className="block">Scheduled supply.</motion.span>
              </h1>

              {/* Copper rule */}
              <motion.div
                variants={revealLine}
                className="w-20 h-[3px] bg-copper-500 mb-8 sm:mb-10"
              />

              {/* Subhead — capability-led, industry-neutral */}
              <motion.p variants={slideUp} className="text-stone-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-10 sm:mb-12 font-light">
                From DFM review to the final molded part — Pavr builds precision molds and components for battery, automotive, medical, and clean-energy manufacturers. Fifteen years. One roof. ±0.05&nbsp;mm.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={slideUp} className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-20">
                <Link
                  to="/contact"
                  className="btn-press group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-[15px] rounded-md transition-colors duration-200"
                >
                  Send a drawing
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/solutions"
                  className="btn-press inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-white/20 hover:border-copper-500/60 text-stone-200 hover:text-white font-medium text-[15px] rounded-md transition-all duration-200"
                >
                  See capabilities
                </Link>
              </motion.div>

              {/* Stats row — defensible numbers only */}
              <motion.div
                variants={slideUp}
                className="pt-7 sm:pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6 sm:gap-x-10 max-w-2xl"
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
                    <p className="font-sans text-2xl sm:text-[28px] text-white font-semibold tracking-tight">{stat.value}</p>
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
