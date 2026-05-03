import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoCarousel({ images = [], className = '' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  useEffect(() => {
    if (paused || images.length < 2) return;
    timer.current = setInterval(next, 2800);
    return () => clearInterval(timer.current);
  }, [paused, images.length]);

  if (!images.length) return null;

  return (
    <div
      className={`relative overflow-hidden bg-stone-100 group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          width={900}
          height={502}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.4 }, scale: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next"
          >
            <ChevronRight size={15} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
