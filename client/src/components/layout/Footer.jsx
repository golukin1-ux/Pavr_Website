import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home',               to: '/' },
  { label: 'Business Solutions', to: '/solutions' },
  { label: 'Products',           to: '/products' },
  { label: 'About Us',           to: '/about' },
  { label: 'Blog',               to: '/blog' },
  { label: 'Contact Us',         to: '/contact' },
];

const services = [
  { label: 'Injection Molding',    to: '/solutions#injection-molding' },
  { label: 'Mold Manufacturing',   to: '/solutions#mold-manufacturing' },
  { label: 'Mold Repair',          to: '/solutions#mold-repair' },
  { label: 'Battery Components',   to: '/solutions#battery-components' },
  { label: 'Precision Components', to: '/products' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand — wider column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6" aria-label="Pavr Tools & Technologies — Home">
              <img
                src="/logo-dark.svg"
                alt="Pavr Tools & Technologies"
                width="200"
                height="56"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed mb-8 max-w-xs">
              Precision injection molding, mold manufacturing, and battery component solutions from Gurugram, India.
            </p>
            <div className="flex gap-3">
              {[
                { name: 'LinkedIn', abbr: 'Li' },
                { name: 'Twitter', abbr: 'Tw' },
                { name: 'YouTube', abbr: 'Yt' },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  title={s.name}
                  className="w-9 h-9 rounded-md bg-stone-800 hover:bg-copper-500/20 hover:text-copper-400 flex items-center justify-center text-stone-300 transition-all duration-200 text-[10px] font-mono font-medium"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-stone-300 font-mono text-[11px] uppercase tracking-widest mb-5">Navigate</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-stone-300 hover:text-copper-400 text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-stone-300 font-mono text-[11px] uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-stone-300 hover:text-copper-400 text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-stone-300 font-mono text-[11px] uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={14} className="text-copper-500 flex-shrink-0 mt-1" />
                <span className="text-stone-300 leading-relaxed">
                  Plot No. 12B, Sector 7B, Reliance MET City,<br />
                  Sondhi, Jhajjar – 124103, Haryana
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-copper-500 flex-shrink-0" />
                <a href="tel:+917428766242" className="text-stone-300 hover:text-copper-400 transition-colors">
                  +91 74287 66242
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-copper-500 flex-shrink-0" />
                <a href="mailto:pavrtoolsandtechnologies@gmail.com" className="text-stone-300 hover:text-copper-400 transition-colors">
                  pavrtoolsandtechnologies@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>&copy; {new Date().getFullYear()} Pavr Tools and Technologies Pvt Ltd</p>
          <p className="font-mono text-[10px]">CIN: U28910HR2009PTC012345 &middot; GST: 06AAACP0000A1Z5</p>
        </div>
      </div>
    </footer>
  );
}
