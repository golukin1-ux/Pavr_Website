import React, {
  useRef, useEffect, useState, createElement,
  useMemo, useCallback, memo,
} from "react";

// ─── Tag enum (plain object for JSX) ────────────────────────────────────────
export const Tag = { H1: "h1", H2: "h2", H3: "h3", P: "p" };

// ─── VaporizeTextCycle ───────────────────────────────────────────────────────
export default function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = { fontFamily: "sans-serif", fontSize: "50px", fontWeight: 400 },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = { vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 0.5 },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const isInView = useIsInView(wrapperRef);
  const lastFontRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") return window.devicePixelRatio * 1.5 || 1;
    return 1;
  }, []);

  const wrapperStyle = useMemo(() => ({ width: "100%", height: "100%", pointerEvents: "none" }), []);
  const canvasStyle  = useMemo(() => ({ minWidth: "30px", minHeight: "20px", pointerEvents: "none" }), []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION:  (animation.fadeInDuration  ?? 1) * 1000,
    WAIT_DURATION:     (animation.waitDuration     ?? 0.5) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const fontConfig = useMemo(() => {
    const fontSize = parseInt(font.fontSize?.replace("px", "") || "50");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 400} ${fontSize * globalDpr}px ${font.fontFamily}`,
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr]);

  const memoizedUpdateParticles = useCallback((particles, vaporizeX, deltaTime) => {
    return updateParticles(
      particles, vaporizeX, deltaTime,
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction, transformedDensity
    );
  }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  const memoizedRenderParticles = useCallback((ctx, particles) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  // Start / stop animation cycle based on visibility
  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setAnimationState("vaporizing"), 0);
      return () => clearTimeout(t);
    } else {
      setAnimationState("static");
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isInView]);

  // Animation loop
  useEffect(() => {
    if (!isInView) return;
    let lastTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (animationState) {
        case "static": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);
          const textBoundaries = canvas.textBoundaries;
          if (!textBoundaries) break;

          const progress  = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? textBoundaries.left + textBoundaries.width * progress / 100
            : textBoundaries.right - textBoundaries.width * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
          memoizedRenderParticles(ctx, particlesRef.current);

          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;
          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          particlesRef.current.forEach(particle => {
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha;
            const c = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.fillStyle = c;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
          });
          ctx.restore();

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
              setAnimationState("vaporizing");
              vaporizeProgressRef.current = 0;
              resetParticles(particlesRef.current);
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }
        case "waiting": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        default: break;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => { if (frameId) cancelAnimationFrame(frameId); };
  }, [
    animationState, isInView, texts.length, direction, globalDpr,
    memoizedUpdateParticles, memoizedRenderParticles,
    animationDurations.FADE_IN_DURATION, animationDurations.WAIT_DURATION, animationDurations.VAPORIZE_DURATION,
  ]);

  useEffect(() => {
    renderCanvas({ framerProps: { texts, font, color, alignment }, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, transformedDensity });
    const currentFont = font.fontFamily || "sans-serif";
    return handleFontChange({ currentFont, lastFontRef, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, transformedDensity, framerProps: { texts, font, color, alignment } });
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

  // Resize observer
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
      }
      renderCanvas({
        framerProps: { texts, font, color, alignment },
        canvasRef,
        wrapperSize: { width: container.clientWidth, height: container.clientHeight },
        particlesRef, globalDpr, currentTextIndex, transformedDensity,
      });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [wrapperRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initial size
  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

// ─── SEO element ─────────────────────────────────────────────────────────────
const SeoElement = memo(({ tag = Tag.P, texts }) => {
  const style = useMemo(() => ({
    position: "absolute",
    width: "0",
    height: "0",
    overflow: "hidden",
    userSelect: "none",
    pointerEvents: "none",
  }), []);
  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

// ─── Font change handler ──────────────────────────────────────────────────────
const handleFontChange = ({ currentFont, lastFontRef, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, transformedDensity, framerProps }) => {
  if (currentFont !== lastFontRef.current) {
    lastFontRef.current = currentFont;
    const id = setTimeout(() => {
      cleanup({ canvasRef, particlesRef });
      renderCanvas({ framerProps, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, transformedDensity });
    }, 1000);
    return () => { clearTimeout(id); cleanup({ canvasRef, particlesRef }); };
  }
  return undefined;
};

// ─── Cleanup ─────────────────────────────────────────────────────────────────
const cleanup = ({ canvasRef, particlesRef }) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (particlesRef.current) particlesRef.current = [];
};

// ─── Render canvas ────────────────────────────────────────────────────────────
const renderCanvas = ({ framerProps, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, transformedDensity }) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = wrapperSize;
  canvas.style.width  = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width  = Math.floor(width  * globalDpr);
  canvas.height = Math.floor(height * globalDpr);

  const fontSize = parseInt(framerProps.font?.fontSize?.replace("px", "") || "50");
  const font     = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr}px ${framerProps.font?.fontFamily ?? "sans-serif"}`;
  const color    = parseColor(framerProps.color ?? "rgb(153, 153, 153)");

  let textX;
  const textY      = canvas.height / 2;
  const currentText = framerProps.texts[currentTextIndex] || "";

  // For "left", offset by 6 logical px so particles don't pile up at canvas edge 0
  const dpr = canvas.width / parseInt(canvas.style.width || canvas.width);
  if (framerProps.alignment === "center")      textX = canvas.width / 2;
  else if (framerProps.alignment === "left")   textX = Math.round(6 * dpr);
  else                                         textX = canvas.width - Math.round(6 * dpr);

  const { particles, textBoundaries } = createParticles(ctx, canvas, currentText, textX, textY, font, color, framerProps.alignment || "left");
  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
};

// ─── Particle system ──────────────────────────────────────────────────────────
const createParticles = (ctx, canvas, text, textX, textY, font, color, alignment) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle  = color;
  ctx.font       = font;
  ctx.textAlign  = alignment;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;
  if ("fontKerning" in ctx)    ctx.fontKerning    = "normal";
  if ("textRendering" in ctx)  ctx.textRendering  = "geometricPrecision";

  const metrics   = ctx.measureText(text);
  const textWidth = metrics.width;
  let textLeft;
  if      (alignment === "center") textLeft = textX - textWidth / 2;
  else if (alignment === "left")   textLeft = textX;
  else                             textLeft = textX - textWidth;

  const textBoundaries = { left: textLeft, right: textLeft + textWidth, width: textWidth };

  ctx.fillText(text, textX, textY);
  const imageData  = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data       = imageData.data;
  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const baseDPR    = 3;
  const sampleRate = Math.max(1, Math.round(currentDPR / baseDPR));
  const particles  = [];

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const idx   = (y * canvas.width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha > 0) {
        const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
        particles.push({
          x, y,
          originalX: x, originalY: y,
          color: `rgba(${data[idx]}, ${data[idx + 1]}, ${data[idx + 2]}, ${originalAlpha})`,
          opacity: originalAlpha,
          originalAlpha,
          velocityX: 0, velocityY: 0,
          angle: 0, speed: 0,
        });
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
};

const updateParticles = (particles, vaporizeX, deltaTime, MULTIPLIED_VAPORIZE_SPREAD, VAPORIZE_DURATION, direction, density) => {
  let allVaporized = true;

  particles.forEach(particle => {
    const shouldVaporize = direction === "left-to-right"
      ? particle.originalX <= vaporizeX
      : particle.originalX >= vaporizeX;

    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle    = Math.random() * Math.PI * 2;
        particle.speed    = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }

      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const damp = Math.max(0.95, 1 - dist / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        const rs   = MULTIPLIED_VAPORIZE_SPREAD * 3;

        particle.velocityX = (particle.velocityX + (Math.random() - 0.5) * rs + dx * 0.002) * damp;
        particle.velocityY = (particle.velocityY + (Math.random() - 0.5) * rs + dy * 0.002) * damp;

        const maxV = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const curV = Math.sqrt(particle.velocityX ** 2 + particle.velocityY ** 2);
        if (curV > maxV) { const s = maxV / curV; particle.velocityX *= s; particle.velocityY *= s; }

        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        const fadeRate = 0.25 * (2000 / VAPORIZE_DURATION);
        particle.opacity = Math.max(0, particle.opacity - deltaTime * fadeRate);
      }

      if (particle.opacity > 0.01) allVaporized = false;
    } else {
      allVaporized = false;
    }
  });

  return allVaporized;
};

const renderParticles = (ctx, particles, globalDpr) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  ctx.restore();
};

const resetParticles = (particles) => {
  particles.forEach(p => {
    p.x = p.originalX; p.y = p.originalY;
    p.opacity = p.originalAlpha;
    p.speed = 0; p.velocityX = 0; p.velocityY = 0;
  });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calculateVaporizeSpread = (fontSize) => {
  const size   = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  const points = [{ size: 20, spread: 0.2 }, { size: 50, spread: 0.5 }, { size: 100, spread: 1.5 }];
  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  const p1 = points[i], p2 = points[i + 1];
  return p1.spread + (size - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
};

const parseColor = (color) => {
  const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgba) return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4] ?? 1})`;
  return "rgba(0, 0, 0, 1)";
};

function transformValue(input, inputRange, outputRange, clamp = false) {
  const progress = (input - inputRange[0]) / (inputRange[1] - inputRange[0]);
  let result = outputRange[0] + progress * (outputRange[1] - outputRange[0]);
  if (clamp) result = outputRange[1] > outputRange[0]
    ? Math.min(Math.max(result, outputRange[0]), outputRange[1])
    : Math.min(Math.max(result, outputRange[1]), outputRange[0]);
  return result;
}

function useIsInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0, rootMargin: "50px" });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}
