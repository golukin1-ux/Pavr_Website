import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';

export default function SmoothScroll({ children }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return children;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
