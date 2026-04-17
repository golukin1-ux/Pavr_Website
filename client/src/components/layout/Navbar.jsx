import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home',               to: '/' },
  { label: 'Business Solutions', to: '/solutions' },
  { label: 'Products',           to: '/products' },
  { label: 'About Us',           to: '/about' },
  { label: 'Blog',               to: '/blog' },
  { label: 'Contact',            to: '/contact' },
];

// SVG distortion filter — renders once, invisible
function GlassFilter() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <defs>
        <filter
          id="navbar-glass-distortion"
          x="0%" y="0%" width="100%" height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1"  offset="0"   />
            <feFuncB type="gamma" amplitude="0" exponent="1"  offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0" k2="1" k3="1" k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname }            = useLocation();

  const isDarkPage = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  // Fully transparent only on hero, before scroll
  const showLight = isDarkPage && !scrolled;
  // Glass effect whenever the bar needs a background
  const showGlass = !showLight;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={showGlass ? {
        boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.15)',
      } : undefined}
    >
      {/* Hidden SVG filter definition */}
      <GlassFilter />

      {/* Dark scrim — only on hero (transparent mode) for text contrast */}
      {showLight && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)',
          }}
        />
      )}

      {/* Glass layers — only when we need a background */}
      {showGlass && (
        <>
          {/* Layer 1: blur + distortion */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 overflow-hidden"
            style={{
              backdropFilter: 'blur(14px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
              filter: 'url(#navbar-glass-distortion)',
              isolation: 'isolate',
            }}
          />
          {/* Layer 2: warm white tint */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{ background: 'rgba(250, 248, 245, 0.72)' }}
          />
          {/* Layer 3: glass rim (inner highlight) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2]"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.25)',
            }}
          />
        </>
      )}

      {/* ─── Nav content ─── */}
      <nav className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700/30 rounded-sm"
            aria-label="Pavr Tools & Technologies — Home"
          >
            <img
              src={showLight ? '/logo-dark-compact.svg' : '/logo-light.svg'}
              alt="Pavr Tools & Technologies"
              height="40"
              className="h-10 w-auto transition-opacity duration-300"
            />
            <span
              className={`font-display text-2xl font-bold tracking-tight transition-colors duration-300 ${
                showLight ? 'text-white' : 'text-navy-900'
              }`}
              style={showLight ? { textShadow: '0 1px 8px rgba(0,0,0,0.6)' } : undefined}
            >
              PAVR
            </span>
            <span
              aria-hidden="true"
              className={`hidden sm:block h-7 w-px transition-colors duration-300 ${
                showLight ? 'bg-white/30' : 'bg-stone-300'
              }`}
            />
            <span
              className={`hidden sm:flex flex-col leading-tight transition-colors duration-300 ${
                showLight ? 'text-white' : 'text-navy-900'
              }`}
              style={showLight ? { textShadow: '0 1px 8px rgba(0,0,0,0.6)' } : undefined}
            >
              <span className="font-display text-[13px] font-semibold tracking-wide">
                Tools &amp; Technologies
              </span>
              <span
                className={`font-mono text-[9px] tracking-[0.2em] uppercase ${
                  showLight ? 'text-white/70' : 'text-stone-500'
                }`}
              >
                Private Limited
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={showLight ? { textShadow: '0 1px 8px rgba(0,0,0,0.8)' } : undefined}
                className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive(to)
                    ? showLight ? 'text-white' : 'text-copper-600'
                    : showLight
                      ? 'text-white hover:text-white'
                      : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {label}
                {isActive(to) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-3.5 right-3.5 h-px ${
                      showLight ? 'bg-white' : 'bg-copper-500'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={`btn-press hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-lg transition-colors duration-200 ${
                showLight
                  ? 'bg-white text-stone-700 hover:bg-stone-100'
                  : 'bg-copper-500 text-white hover:bg-copper-600'
              }`}
            >
              Get a Quote <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                showLight
                  ? 'text-white hover:bg-white/10'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden relative z-10"
            style={{
              background: 'rgba(250, 248, 245, 0.85)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderTop: '1px solid rgba(255,255,255,0.4)',
            }}
          >
            <div className="px-5 py-5 flex flex-col gap-0.5">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'text-copper-600 bg-copper-50'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 px-4 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-lg text-center transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
