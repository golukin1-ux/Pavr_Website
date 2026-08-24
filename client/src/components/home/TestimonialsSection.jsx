import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-stone-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-stone-200 p-8 md:p-12"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-copper-400 fill-copper-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-2xl md:text-3xl text-stone-700 leading-snug mb-10">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-copper-100 flex items-center justify-center font-display text-copper-600 text-sm">
                  {testimonials[current].name.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <p className="text-stone-700 font-semibold text-sm">{testimonials[current].name}</p>
                  <p className="text-stone-500 text-sm">{testimonials[current].title}, {testimonials[current].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer group"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-copper-500' : 'w-3 bg-stone-300 group-hover:bg-stone-400'
                  }`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous testimonial" className="min-w-[44px] min-h-[44px] rounded-lg border border-stone-200 hover:border-copper-300 flex items-center justify-center text-stone-400 hover:text-copper-600 transition-all duration-200 cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} aria-label="Next testimonial" className="min-w-[44px] min-h-[44px] rounded-lg border border-stone-200 hover:border-copper-300 flex items-center justify-center text-stone-400 hover:text-copper-600 transition-all duration-200 cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
