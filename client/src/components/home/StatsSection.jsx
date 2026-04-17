import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { stats } from '../../data/stats';

export default function StatsSection() {
  return (
    <section className="py-20 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-200">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center lg:px-8"
            >
              <div className="text-4xl lg:text-5xl text-stone-700">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-[11px] text-stone-400 uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
