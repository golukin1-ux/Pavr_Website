import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const FRAME_COUNT = 90;

function frameUrl(i, mobile) {
  const num = String(i + 1).padStart(3, '0');
  return `/hero-frames/frame_${num}${mobile ? '-mobile' : ''}.webp`;
}

export default function HeroScrubCanvas({ sectionRef }) {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ctx = canvas.getContext('2d', { alpha: false });

    let targetIdx = 0;
    let smoothIdx = 0;
    let rafId = null;
    let visible = true;
    let firstDrawn = false;

    const drawCover = (img) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) {
        dh = ch; dw = ch * ir;
        dx = (cw - dw) / 2; dy = 0;
      } else {
        dw = cw; dh = cw / ir;
        dx = 0; dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const drawFrame = (i) => {
      const img = framesRef.current[i];
      if (img && img.complete && img.naturalWidth) {
        drawCover(img);
        return;
      }
      for (let d = 1; d < FRAME_COUNT; d++) {
        const a = framesRef.current[i - d];
        if (a?.complete && a.naturalWidth) return drawCover(a);
        const b = framesRef.current[i + d];
        if (b?.complete && b.naturalWidth) return drawCover(b);
      }
    };

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.round(smoothIdx));
    };

    const getProgress = () => {
      const top = -section.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, top / (window.innerHeight * 2)));
    };

    const onScroll = () => {
      if (!visible) return;
      targetIdx = getProgress() * (FRAME_COUNT - 1);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      smoothIdx += (targetIdx - smoothIdx) * 0.18;
      drawFrame(Math.round(smoothIdx));
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      if (i === 0) img.fetchPriority = 'high';
      img.src = frameUrl(i, isMobile);
      img.onload = () => {
        if (i === 0 && !firstDrawn) {
          firstDrawn = true;
          setSize();
        }
      };
      framesRef.current[i] = img;
    }

    setSize();
    window.addEventListener('resize', setSize);

    if (shouldReduce) {
      return () => window.removeEventListener('resize', setSize);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) {
          targetIdx = getProgress() * (FRAME_COUNT - 1);
          smoothIdx = targetIdx;
          rafId = requestAnimationFrame(tick);
        } else if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(section);

    targetIdx = getProgress() * (FRAME_COUNT - 1);
    smoothIdx = targetIdx;
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setSize);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      framesRef.current.forEach(img => { img.onload = null; img.src = ''; });
      framesRef.current = [];
    };
  }, [shouldReduce, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
