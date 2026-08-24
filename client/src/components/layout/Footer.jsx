import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { site } from '../../data/site';

const quickLinks = [
  { label: 'Home',               to: '/' },
  { label: 'Business Solutions', to: '/solutions' },
  { label: 'Products',           to: '/products' },
  { label: 'About Us',           to: '/about' },
  { label: 'Blog',               to: '/blog' },
  { label: 'Contact',            to: '/contact' },
];

const services = [
  { label: 'Injection Moulding',   to: '/solutions#injection-molding' },
  { label: 'Mould Manufacturing',  to: '/solutions#mold-manufacturing' },
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
              Precision injection moulding, mould manufacturing, and battery component solutions from Reliance MET City, Jhajjar, Haryana.
            </p>
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
                  Sondhi, {site.address.locality} – {site.address.postalCode}, {site.address.region}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-copper-500 flex-shrink-0" />
                <a href={`tel:${site.phoneE164}`} className="text-stone-300 hover:text-copper-400 transition-colors">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-copper-500 flex-shrink-0" />
                <a href={`mailto:${site.email}`} className="text-stone-300 hover:text-copper-400 transition-colors">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>&copy; {new Date().getFullYear()} {site.legalName}</p>
          {(site.cin || site.gst) && (
            <p className="font-mono text-[10px]">
              {[site.cin && `CIN: ${site.cin}`, site.gst && `GST: ${site.gst}`]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
