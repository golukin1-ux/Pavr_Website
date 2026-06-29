import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Translates children vertically against scroll for depth.
 * speed: roughly -0.3..0.3 — negative drifts up slower (background feel),
 * positive drifts down (foreground lag). 0.1 ≈ 64px of total travel.
 */
export default function Parallax({ children, speed = -0.1, className = '' }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 320, speed * -320]);

  return (
    <motion.div ref={ref} style={shouldReduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
