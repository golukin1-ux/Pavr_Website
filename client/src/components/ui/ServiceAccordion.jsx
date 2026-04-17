import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const panels = [
  {
    num: '01',
    title: 'Injection Molding',
    image: '/images/injection-molding.jpg',
    to: '/solutions#injection-molding',
  },
  {
    num: '02',
    title: 'Mold Manufacturing',
    image: '/images/cnc-vl1300.jpg',
    to: '/solutions#mold-manufacturing',
  },
  {
    num: '03',
    title: 'Mold Repair',
    image: '/images/tool-room.jpg',
    to: '/solutions#mold-repair',
  },
  {
    num: '04',
    title: 'Battery Components',
    image: '/images/battery-components.jpg',
    to: '/solutions#battery-components',
  },
];

export default function ServiceAccordion() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile: 2×2 grid of tappable cards */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {panels.map((panel) => (
          <button
            key={panel.num}
            onClick={() => navigate(panel.to)}
            className="relative aspect-square overflow-hidden rounded-xl group text-left"
          >
            <img
              src={panel.image}
              alt={panel.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
              onError={(e) => { e.target.src = '/images/factory-exterior.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-navy-900/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="font-mono text-[10px] text-copper-400 tracking-widest block mb-1">/{panel.num}</span>
              <div className="flex items-end justify-between gap-2">
                <span className="text-white text-sm font-bold font-display leading-tight">{panel.title}</span>
                <ArrowUpRight size={16} className="text-copper-400 flex-shrink-0" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: hover-driven horizontal accordion */}
      <div className="hidden md:flex h-[360px] gap-2 rounded-2xl overflow-hidden">
        {panels.map((panel, i) => {
          const isActive = active === i;
          return (
            <div
              key={panel.num}
              onMouseEnter={() => setActive(i)}
              onClick={() => navigate(panel.to)}
              style={{ transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
              className={`relative overflow-hidden cursor-pointer rounded-xl ${
                isActive ? 'flex-[4]' : 'flex-[0.6]'
              }`}
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.src = '/images/factory-exterior.jpg'; }}
              />

              <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/20 ${
                isActive ? 'opacity-70' : 'opacity-90'
              }`} />

              {/* Inactive — vertical label */}
              <div className={`absolute inset-0 flex flex-col items-center justify-end pb-6 transition-opacity duration-300 ${
                isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <span className="font-mono text-[10px] text-copper-400 tracking-widest mb-2">/{panel.num}</span>
                <span
                  className="text-white text-sm font-semibold tracking-wide whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  {panel.title}
                </span>
              </div>

              {/* Active — horizontal label */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}>
                <span className="font-mono text-[11px] text-copper-400 tracking-widest block mb-1">/{panel.num}</span>
                <span className="text-white text-xl font-bold font-display">{panel.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
