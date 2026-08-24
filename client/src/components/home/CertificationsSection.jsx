import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { certifications } from '../../data/certifications';

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
          {certifications.map((cert, i) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}
                className="group p-7 bg-stone-50 rounded-lg border border-stone-200/80 hover:border-copper-300 transition-colors duration-200 w-full max-w-sm mx-auto text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center mb-5 mx-auto">
                  <Award size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-mono text-sm font-medium text-copper-600 mb-1">{cert.code}</h3>
                <p className="font-display text-lg text-stone-700 mb-3">{cert.title}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{cert.description}</p>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
