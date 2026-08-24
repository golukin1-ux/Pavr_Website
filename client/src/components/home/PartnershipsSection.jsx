import { useState } from 'react';
import { partners } from '../../data/partners';

function PartnerLogo({ name, industry, logo, width, height, website, duplicate }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 3);

  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="flex-shrink-0 flex items-center gap-5 px-8 py-6 bg-white rounded-2xl border border-stone-200 hover:border-copper-300 hover:shadow-card transition-all duration-300 min-w-[280px] sm:min-w-[320px] mx-3 group"
    >
      {/* Logo image or initials fallback */}
      <div className="w-20 h-14 sm:w-24 sm:h-16 flex items-center justify-center flex-shrink-0">
        {logo && !imgFailed ? (
          <img
            src={logo}
            alt={`${name} logo`}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full w-auto h-auto object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-14 h-14 rounded-md bg-stone-100 group-hover:bg-copper-50 flex items-center justify-center font-mono text-sm font-medium text-stone-500 group-hover:text-copper-600 transition-all duration-300">
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-stone-900 text-sm font-semibold group-hover:text-stone-900 transition-colors leading-snug">{name}</p>
        <p className="text-stone-500 text-[11px] font-mono uppercase tracking-wider mt-1">{industry}</p>
      </div>
    </a>
  );
}

export default function PartnershipsSection() {
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const looped = [
    ...partners.map((p) => ({ ...p, duplicate: false })),
    ...partners.map((p) => ({ ...p, duplicate: true })),
  ];

  return (
    <section className="pt-14 sm:pt-20 pb-20 sm:pb-24 bg-stone-100 relative overflow-x-hidden">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .pavr-marquee {
          animation: marquee-scroll 14s linear infinite;
          will-change: transform;
        }
        @media (min-width: 768px) {
          .pavr-marquee { animation-duration: 22s; }
        }
      `}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

      {/* Header — eyebrow only, brand-clean */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-10 sm:mb-12 flex flex-col items-center text-center">
        <span className="block w-12 h-[2px] bg-copper-500 mb-6" />
        <span className="inline-flex items-center gap-4 font-mono text-base sm:text-lg tracking-[0.28em] uppercase text-navy-900 font-semibold">
          <span className="w-2 h-2 rounded-full bg-copper-500" />
          Our Clients
          <span className="w-2 h-2 rounded-full bg-copper-500" />
        </span>
      </div>

      {/* Seamless infinite marquee — larger tiles, faster on mobile */}
      <div className="relative z-20 overflow-hidden py-3">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="flex pavr-marquee">
          {looped.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
