import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const looped = [...partners, ...partners];

  return (
    <section
      className="pt-14 sm:pt-20 pb-28 sm:pb-36 bg-navy-900 relative overflow-x-hidden"
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8 sm:mb-10 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-4">
          <span className="w-8 h-px bg-copper-500" />
          Our Clients
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-semibold max-w-xl leading-snug mb-8">
          Trusted by India's leading<br className="hidden sm:block" /> battery manufacturers
        </h2>
        <div className="flex gap-8 sm:gap-10">
          {[
            { label: 'Industries Served', value: '6+' },
            { label: 'Delivery', value: 'Pan-India' },
            { label: 'Years Active', value: '9+' },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-2xl sm:text-3xl text-white font-semibold">{item.value}</p>
              <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Seamless infinite marquee */}
      <div className="relative z-20 overflow-hidden py-3">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />
        <div
          className="flex"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
            willChange: 'transform',
          }}
        >
          {looped.map((partner, i) => (
            <PartnerLogo key={i} {...partner} />
          ))}
        </div>
      </div>
      {/* Gradient + frosted blur transition overlay — sits below marquee (z-10) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none backdrop-blur-md"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.85) 75%, #ffffff 100%)',
        }}
      />
    </section>
  );
}
