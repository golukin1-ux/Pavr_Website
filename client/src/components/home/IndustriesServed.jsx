import { motion } from 'framer-motion';
import { Car, Cpu, Heart, Shield, Package, Settings } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { industries } from '../../data/industries';

const iconMap = { Car, Cpu, Heart, Shield, Package, Settings };

export default function IndustriesServed() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-stone-100/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Industries"
          title="Trusted across sectors"
          subtitle="Our precision manufacturing capabilities power critical applications in the world's most demanding industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => {
            const Icon = iconMap[ind.icon];
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.99 }}
                className="group flex gap-5 p-6 bg-white rounded-lg border border-stone-200/80 hover:border-copper-300 transition-colors duration-200 cursor-default"
              >
                <div className="w-11 h-11 rounded-lg bg-stone-100 group-hover:bg-copper-50 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon size={20} className="text-stone-400 group-hover:text-copper-500 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-stone-700 mb-1">{ind.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{ind.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
