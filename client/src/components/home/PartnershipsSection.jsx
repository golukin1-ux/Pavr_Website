import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { partners } from '../../data/partners';

function PartnerLogo({ name, industry, logo, website }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 3);

  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-white rounded-xl border border-stone-200 hover:border-copper-300 hover:shadow-card transition-all duration-300 min-w-[210px] mx-2 group"
    >
      {/* Logo image or initials fallback */}
      <div className="w-14 h-10 flex items-center justify-center flex-shrink-0">
        {logo && !imgFailed ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-stone-100 group-hover:bg-copper-50 flex items-center justify-center font-mono text-xs font-medium text-stone-400 group-hover:text-copper-600 transition-all duration-300">
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-stone-700 text-xs font-semibold group-hover:text-stone-900 transition-colors leading-snug">{name}</p>
        <p className="text-stone-400 text-[10px] font-mono uppercase tracking-wider mt-0.5">{industry}</p>
      </div>
    </a>
  );
}

export default function PartnershipsSection() {
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          dark
          eyebrow="Partnership"
          title="Trusted by industry leaders"
          subtitle="India's leading battery manufacturers rely on Pavr for precision components."
        />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden py-6 mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {doubled.map((partner, i) => (
            <PartnerLogo key={i} {...partner} />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-px bg-navy-700 rounded-lg overflow-hidden"
        >
          {[
            { label: 'Industries Served', value: '6+' },
            { label: 'Countries Exported To', value: '8+' },
            { label: 'Years in Business', value: '9+' },
          ].map((item) => (
            <div key={item.label} className="bg-stone-800 py-8 px-4 text-center">
              <p className="font-display text-3xl text-white mb-1">{item.value}</p>
              <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
