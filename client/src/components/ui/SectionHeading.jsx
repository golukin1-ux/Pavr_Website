import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', dark = false }) {
  const isLeft = align === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${isLeft ? '' : 'text-center'}`}
    >
      {eyebrow && (
        <span className={`inline-block font-mono text-xs tracking-widest uppercase mb-4 ${
          dark ? 'text-copper-300' : 'text-copper-600'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] ${
        dark ? 'text-stone-50' : 'text-stone-700'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${
          isLeft ? '' : 'mx-auto'
        } ${dark ? 'text-stone-400' : 'text-stone-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
