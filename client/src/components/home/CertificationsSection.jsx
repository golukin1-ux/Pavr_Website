import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { certifications } from '../../data/certifications';

const accentMap = {
  'from-blue-600 to-blue-800':     'bg-blue-50 text-blue-600',
  'from-amber-600 to-orange-700':  'bg-amber-50 text-amber-600',
  'from-green-600 to-green-800':   'bg-emerald-50 text-emerald-600',
  'from-purple-600 to-purple-800': 'bg-violet-50 text-violet-600',
};

export default function CertificationsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Quality & Compliance"
          title="Certified, audited, trusted"
          subtitle="Our certifications are proof of an unwavering commitment to quality systems, safety, and continuous improvement."
        />

        <div className="flex flex-wrap justify-center gap-5">
          {certifications.map((cert, i) => {
            const accent = accentMap[cert.color] || 'bg-stone-100 text-stone-600';
            return (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}
                className="group p-7 bg-stone-50 rounded-lg border border-stone-200/80 hover:border-copper-300 transition-colors duration-200 w-full max-w-sm mx-auto text-center"
              >
                <div className={`w-12 h-12 rounded-lg ${accent} flex items-center justify-center mb-5 mx-auto`}>
                  <Award size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-mono text-sm font-medium text-copper-600 mb-1">{cert.code}</h3>
                <p className="font-display text-lg text-stone-700 mb-3">{cert.title}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{cert.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
