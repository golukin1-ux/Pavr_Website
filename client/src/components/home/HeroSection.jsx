import { useReducedMotion, motion, useTransform, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';

const TRANSITION = { ease: [0.16, 1, 0.3, 1], duration: 0.7 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: TRANSITION },
};

const revealLine = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { ...TRANSITION, delay: 0.6 } },
};

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);

  // Detect mobile (pointer-coarse = touch; ≤768px = phone/small tablet).
  // Mobile skips expensive scroll-scrub video and parallax glow — autoplays a looping video instead.
  const isMobile = typeof window !== 'undefined'
    && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);


  // ─── Parallax text fade (Framer Motion tracks section scroll) ────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // ─── Desktop: buffer video once for scroll-scrub ─────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduce || isMobile) return;

    const init = () => {
      video.play()
        .then(() => { video.pause(); video.currentTime = 0; })
        .catch(() => { /* autoplay policy blocked; video still seekable */ });
    };

    if (video.readyState >= 2) {
      init();
    } else {
      video.addEventListener('canplay', init, { once: true });
      return () => video.removeEventListener('canplay', init);
    }
  }, [shouldReduce, isMobile]);

  // ─── Desktop: scroll → scrub video currentTime ───────────────────────────
  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || shouldReduce || isMobile) return;

    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId;

    const getProgress = () => {
      const top = -section.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, top / (window.innerHeight * 2)));
    };

    const onScroll = () => { targetProgress = getProgress(); };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      smoothProgress += (targetProgress - smoothProgress) * 0.55;

      if (!video.duration || !isFinite(video.duration)) return;
      const targetTime = smoothProgress * video.duration;

      if (Math.abs(targetTime - video.currentTime) > 1 / 60) {
        video.currentTime = targetTime;
      }
    };

    targetProgress = getProgress();
    smoothProgress = targetProgress;

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduce, isMobile]);

  // ─── Mouse parallax glow ─────────────────────────────────────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX  = useSpring(useTransform(mouseX, [0, 1], [-25, 25]), { stiffness: 60, damping: 20 });
  const glowY  = useSpring(useTransform(mouseY, [0, 1], [-25, 25]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (shouldReduce || isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top)  / r.height);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [shouldReduce, isMobile, mouseX, mouseY]);

  return (
    <section ref={sectionRef} className={isMobile ? 'relative h-[100dvh]' : 'relative h-[300vh]'}>
      {/* Sticky viewport — stays pinned while section scrolls */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-navy-900">

        {/* Video background — desktop: scrubbed by scroll; mobile: autoplay loop for performance */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload={isMobile ? 'metadata' : 'auto'}
          autoPlay={isMobile}
          loop={isMobile}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlays — lightened so video detail is more visible */}
        <div className="absolute inset-0 bg-navy-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/65 via-navy-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-navy-900 to-transparent" />

        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

        {/* Mouse-reactive glow */}
        <motion.div
          className="absolute w-[700px] h-[500px] bg-copper-500/[0.06] rounded-full blur-[120px] pointer-events-none"
          style={{ x: glowX, y: glowY, top: '20%', right: '15%' }}
        />

        {/* Vertical line accents */}
        <div className="absolute top-0 right-[18%] w-px h-full bg-gradient-to-b from-transparent via-copper-500/15 to-transparent" />
        <div className="absolute top-0 right-[38%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

        {/* Content — fades and lifts on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 h-full flex items-center"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
            <motion.div
              variants={shouldReduce ? {} : stagger}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              {/* Headline */}
              <motion.h1
                variants={slideUp}
                className="font-display text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] sm:leading-[1] text-white mb-6 sm:mb-8 font-bold tracking-tight"
              >
                Precision-engineered{' '}
                <span className="text-copper-500">components</span>
                <br className="hidden sm:block" />
                {' '}for the industries that matter
              </motion.h1>

              {/* Rule */}
              <motion.div
                variants={revealLine}
                className="w-full h-px bg-gradient-to-r from-white/10 via-copper-500/30 to-transparent mb-6 sm:mb-8"
              />

              {/* Subheading */}
              <motion.p variants={slideUp} className="text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-12">
                From injection molds to battery pack assemblies — Pavr manufactures the critical parts that power automotive, defense, medical, and clean energy sectors.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={slideUp} className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-16">
                <Link
                  to="/contact"
                  className="btn-press group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-copper-500 hover:bg-copper-600 text-navy-900 font-bold text-[15px] rounded-lg transition-colors duration-200"
                >
                  Request a Quote
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/solutions"
                  className="btn-press inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/15 hover:border-copper-500/40 text-stone-300 hover:text-white font-medium text-[15px] rounded-lg transition-all duration-200"
                >
                  Our Capabilities
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={slideUp}
                className="pt-6 sm:pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
              >
                {[
                  { value: '15+',   label: 'Years' },
                  { value: '500+',  label: 'Clients' },
                  { value: '1000+', label: 'Products' },
                  { value: '50+',   label: 'Engineers' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...TRANSITION, delay: 0.5 + i * 0.07 }}
                  >
                    <p className="font-display text-2xl sm:text-3xl text-white font-bold">{stat.value}</p>
                    <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider mt-1">{stat.label}</p>
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
            <ChevronDown size={18} className="text-stone-500" />
          </motion.div>
          <p className="text-stone-500 text-[10px] font-mono uppercase tracking-widest mt-1">Scroll</p>
        </motion.div>
      </div>
    </section>
  );
}
