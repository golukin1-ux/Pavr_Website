import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import Badge from '../ui/Badge';

export default function ProductCard({ product, index = 0 }) {
  const specs = product.specifications
    ? Object.entries(product.specifications).slice(0, 3)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.09)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="group h-full bg-white border border-stone-200 hover:border-copper-300 rounded-lg overflow-hidden transition-colors duration-200 flex flex-col"
      >
        {/* Image placeholder */}
        <div className="h-48 bg-stone-100 flex items-center justify-center relative overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-300">
              <Package size={36} strokeWidth={1} />
            </div>
          )}
          {product.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-copper-500 text-white text-[10px] font-mono font-medium uppercase tracking-wider rounded-md">
              Featured
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="mb-3">
            <Badge category={product.category} />
          </div>
          <h3 className="font-display text-lg text-stone-700 mb-2 leading-snug">{product.name}</h3>
          <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>

          {specs.length > 0 && (
            <div className="space-y-2 mb-4 py-3 border-t border-stone-100">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-stone-400 font-mono">{k}</span>
                  <span className="text-stone-600 font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <Link
              to={`/products/${product.slug || product.id}`}
              className="inline-flex items-center gap-2 text-copper-500 text-sm font-medium group-hover:gap-3 transition-all duration-200"
            >
              View Details <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
