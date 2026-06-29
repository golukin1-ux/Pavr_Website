import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductDetailPanel from '../components/products/ProductDetailPanel';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const total = products.length;

  return (
    <>
      <Helmet>
        <title>Products — Pavr Tools & Technologies</title>
        <meta name="description" content="Battery containers, vent plugs, side packing, terminal protectors, injection moulded parts, moulds, and precision components by Pavr Tools & Technologies." />
      </Helmet>

      {/* ─── Page Hero ───────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-20 w-[520px] h-[520px] rounded-full bg-copper-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              The Catalogue
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">
              The parts we quietly put inside everyday things.
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl">
              Battery containers that power two-wheelers at 5 AM. Vent plugs sealed against acid for a decade.
              Precision moulds that run a million shots without complaint. Browse what we make — or
              <Link to="/contact" className="text-copper-400 hover:text-copper-300 underline decoration-copper-500/40 underline-offset-4 ml-1">
                tell us what you need
              </Link>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Catalogue ───────────────────────────────────────────────── */}
      <section className="bg-stone-50 min-h-screen">
        <div className="flex items-start relative">

          {/* Grid column */}
          <div className="flex-1 min-w-0 py-16 sm:py-20 px-5 sm:px-8 lg:px-10">

            {/* Count */}
            <div className="flex items-center justify-end mb-10">
              {total > 0 && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400 whitespace-nowrap">
                  <span className="text-stone-700">{total}</span> products
                </p>
              )}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-24 max-w-md mx-auto">
                <p className="font-display text-2xl text-stone-600 mb-3">Nothing here yet.</p>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  We don't have a ready-made listing for this category. If you have a drawing or a sample,
                  we likely already make something close — or can tool up for it.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-copper-500 hover:bg-copper-600 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <MessageSquare size={14} /> Talk to an engineer
                </Link>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 sm:gap-7 ${selectedProduct ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {products.map((product, i) => (
                    <ProductCard
                      key={product.id || product.slug}
                      product={product}
                      index={i}
                      onSelect={setSelectedProduct}
                      isSelected={selectedProduct?.id === product.id || selectedProduct?.slug === product.slug}
                    />
                  ))}
                </div>

              </>
            )}
          </div>

          {/* Side panel */}
          <ProductDetailPanel
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      </section>

      {/* ─── Humanised CTA band ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-600 mb-5">
            <span className="w-8 h-px bg-copper-500" />
            Don't see your part?
            <span className="w-8 h-px bg-copper-500" />
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-navy-700 mb-5 leading-tight tracking-tight">
            Most of what we make isn't on this page.
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Ninety percent of our work is custom — drawings you send, samples you hand over, or problems you describe on a call.
            Send it across and someone from the shop floor will look at it, not a sales bot.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Start Your Project
            </Link>
            <Link
              to="/solutions"
              className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-800 font-medium text-sm rounded-lg transition-colors"
            >
              See our capabilities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
