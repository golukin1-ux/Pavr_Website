import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoCarousel from '../ui/PhotoCarousel';

export default function ProductDetailPanel({ product, onClose }) {
  const variants = product?.variants ?? [];
  const specs = product?.specifications ? Object.entries(product.specifications) : [];

  return (
    <AnimatePresence>
      {product && (
        <motion.aside
          key="panel"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[400px] lg:w-[440px] flex-shrink-0 bg-white border-l border-stone-200 shadow-2xl flex flex-col sticky top-20 h-[calc(100vh-5rem)] overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-navy-800 flex items-start justify-between bg-navy-900 flex-shrink-0">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-copper-400 mb-1">
                {variants.length} variant{variants.length !== 1 ? 's' : ''} available
              </p>
              <h3 className="font-display text-base text-white leading-snug pr-4">{product.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10 flex-shrink-0 mt-0.5"
              aria-label="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image carousel */}
          {product.images?.length > 0 && (
            <PhotoCarousel images={product.images} className="h-56 flex-shrink-0" />
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Description */}
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-2">Description</p>
              <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* General specs */}
            {specs.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-3">General Specifications</p>
                <div className="border border-stone-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-stone-100">
                      {specs.map(([k, v]) => (
                        <tr key={k} className="hover:bg-stone-50 transition-colors">
                          <td className="px-4 py-2.5 text-stone-500 font-mono text-xs w-2/5">{k}</td>
                          <td className="px-4 py-2.5 text-stone-800 text-xs font-medium">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Variants table */}
            {variants.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-3">Available Variants</p>
                <div className="border border-stone-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-stone-50 border-b border-stone-200">
                      <tr>
                        <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-stone-500">#</th>
                        <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-stone-500">Variant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {variants.map((v, i) => (
                        <tr key={i} className="hover:bg-stone-50 transition-colors">
                          <td className="px-4 py-2.5 text-stone-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                          <td className="px-4 py-2.5 text-stone-800 text-xs font-medium">{product.name} {v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex-shrink-0">
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-copper-600 hover:bg-copper-700 text-white text-sm font-semibold rounded-md transition-colors"
            >
              Request a Quote for This Product
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
