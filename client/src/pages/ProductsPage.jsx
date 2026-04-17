import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LIMIT = 12;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);

  const category = searchParams.get('category') || '';
  const page     = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = { page, limit: LIMIT };
    if (category) params.category = category;
    api.get('/products', { params })
      .then(data => { if (!cancelled) { setProducts(data.data); setTotal(data.total); } })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [category, page]);

  const totalPages = Math.ceil(total / LIMIT);

  const handleFilterChange = (val) => {
    const params = {};
    if (val) params.category = val;
    setSearchParams(params);
  };

  return (
    <>
      <Helmet>
        <title>Products — Pavr Tools & Technologies</title>
        <meta name="description" content="Battery containers, vent plugs, side packing, terminal protectors, injection moulded parts, molds, and precision components by Pavr Tools & Technologies." />
      </Helmet>

      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              Product Catalog
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">Our Products</h1>
            <p className="text-stone-400 text-lg max-w-2xl">
              Battery components, injection moulded parts, molds & tooling, and precision components — manufactured at our Jhajjar facility.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <ProductFilters active={category} onChange={handleFilterChange} />

          {loading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <ProductCard key={product.id || product.slug} product={product} index={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSearchParams({ ...(category && { category }), page: p })}
                      className={`w-10 h-10 rounded-md font-mono text-sm transition-all ${
                        p === page
                          ? 'bg-copper-500 text-white'
                          : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
