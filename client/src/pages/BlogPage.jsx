import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import { breadcrumbs } from '../data/structuredData';
import { motion } from 'framer-motion';
import api from '../utils/api';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const categories = [
  { value: '',                 label: 'All Articles' },
  { value: 'injection-molding', label: 'Injection Moulding' },
  { value: 'battery-tech',     label: 'Battery Tech' },
  { value: 'manufacturing',    label: 'Manufacturing' },
  { value: 'industry-news',    label: 'Industry News' },
  { value: 'company-news',     label: 'Company News' },
];

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || '';
  const page     = parseInt(searchParams.get('page') || '1');
  const limit    = 9;
  const queryKey = `${category}|${page}`;

  // One state object keyed by the query it belongs to. `loading` is derived
  // rather than set, so the effect only writes state from its async callbacks.
  const [result, setResult] = useState({ key: null, posts: [], total: 0, failed: false });
  const loading = result.key !== queryKey;

  useEffect(() => {
    let cancelled = false;
    const params = { page, limit };
    if (category) params.category = category;
    api.get('/blog', { params })
      .then(data => {
        if (!cancelled) setResult({ key: queryKey, posts: data.data, total: data.total, failed: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ key: queryKey, posts: [], total: 0, failed: true });
      });
    return () => { cancelled = true; };
  }, [category, page, queryKey]);

  const { posts, total, failed } = result;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Seo
        title="Blog"
        description="Industry insights, technical guides, and company news from Pavr's manufacturing experts."
        jsonLd={breadcrumbs([['Home', '/'], ['Blog', '/blog']])}
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-copper-400 mb-6">
              <span className="w-8 h-px bg-copper-500" />
              Insights & Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-5">The Pavr Blog</h1>
            <p className="text-stone-400 text-lg max-w-2xl">
              Technical guides, industry news, and manufacturing insights from our engineering team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSearchParams(value ? { category: value } : {})}
                className={`px-4 min-h-[44px] inline-flex items-center rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  category === value
                    ? 'bg-copper-500 text-white'
                    : 'bg-white text-stone-500 hover:text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : failed ? (
            <div className="text-center py-20">
              <p className="text-stone-500 mb-2">We couldn&rsquo;t load the articles just now.</p>
              <p className="text-stone-400 text-sm">
                Please refresh, or{' '}
                <Link to="/contact" className="text-copper-500 hover:text-copper-600 underline underline-offset-4">
                  get in touch
                </Link>{' '}
                if you need something specific.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400">No articles found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <BlogCard key={post.id || post.slug} post={post} index={i} />
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
