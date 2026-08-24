import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import { article, breadcrumbs } from '../data/structuredData';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Badge from '../components/ui/Badge';
import { formatDate, readingTime } from '../utils/formatters';

function plainTextToHtml(text) {
  if (!text) return '';
  // If it already looks like HTML, pass through unchanged
  if (/<[a-z][\s\S]*>/i.test(text)) return text;

  return text
    .split(/\n\n+/)
    .map(block => {
      const lines = block.split('\n').filter(l => l.trim());
      // Split into runs of bullet lines and non-bullet lines
      const parts = [];
      let current = null;
      for (const line of lines) {
        const isBullet = /^[-*]\s/.test(line.trim());
        if (!current || current.type !== (isBullet ? 'list' : 'text')) {
          current = { type: isBullet ? 'list' : 'text', lines: [] };
          parts.push(current);
        }
        current.lines.push(line);
      }
      return parts.map(part => {
        if (part.type === 'list') {
          const items = part.lines
            .map(l => `<li>${l.replace(/^[-*]\s*/, '').trim()}</li>`)
            .join('');
          return `<ul>${items}</ul>`;
        }
        return `<p>${part.lines.join('<br>')}</p>`;
      }).join('');
    })
    .join('');
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  // Keyed by slug so `loading` is derived, not set synchronously in the effect.
  const [state, setState] = useState({ key: null, post: null, related: [], error: false });

  useEffect(() => {
    let cancelled = false;
    let article = null;
    api.get(`/blog/${slug}`)
      .then(data => {
        article = data.data;
        return api.get('/blog', { params: { category: article.category, limit: 3 } });
      })
      .then(relData => {
        if (cancelled) return;
        setState({
          key: slug,
          post: article,
          related: relData.data.filter(p => p.slug !== slug).slice(0, 2),
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        // The article itself may have loaded even if related posts failed.
        setState({ key: slug, post: article, related: [], error: !article });
      });
    return () => { cancelled = true; };
  }, [slug]);

  const { post, related, error } = state;
  const loading = state.key !== slug;

  if (loading) return <div className="pt-32 bg-stone-50"><LoadingSpinner /></div>;

  if (error || !post) {
    return (
      <div className="pt-32 text-center py-20 bg-stone-50">
        <p className="text-stone-500 text-lg mb-4">Article not found.</p>
        <Link to="/blog" className="text-copper-600 hover:text-copper-600 transition-colors">&larr; Back to Blog</Link>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.image || undefined}
        jsonLd={[
          article(post),
          breadcrumbs([['Home', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]]),
        ]}
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-stone-400 hover:text-copper-400 text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-5">
              <Badge category={post.category} />
              {post.tags?.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-white/5 text-stone-400 text-[10px] font-mono uppercase tracking-wider rounded-md">{tag}</span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-stone-500 font-mono pb-6 border-b border-white/10">
              <span className="flex items-center gap-2"><User size={13} /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={13} /> {formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-2"><Clock size={13} /> {readingTime(post.content)} min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 prose prose-stone max-w-none
                prose-headings:font-display prose-headings:text-stone-700
                prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-stone-500 prose-p:leading-relaxed
                prose-ul:text-stone-500 prose-li:marker:text-copper-500
                prose-a:text-copper-600 prose-a:no-underline hover:prose-a:text-copper-600
                prose-strong:text-stone-700"
              dangerouslySetInnerHTML={{ __html: plainTextToHtml(post.content) }}
            />

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Share */}
                <div className="bg-white border border-stone-200 rounded-lg p-5">
                  <p className="text-stone-500 text-[10px] font-mono font-medium uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Share2 size={12} /> Share
                  </p>
                  <div className="flex gap-2">
                    <a href={`https://linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium rounded-md transition-all duration-200">
                      <ExternalLink size={12} /> LinkedIn
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium rounded-md transition-all duration-200">
                      <ExternalLink size={12} /> Tweet
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-copper-50 border border-copper-200 rounded-lg p-5">
                  <p className="text-stone-700 font-semibold text-sm mb-2">Have a project in mind?</p>
                  <p className="text-stone-500 text-xs mb-4">Our engineers are ready to discuss your requirements.</p>
                  <Link to="/contact" className="block text-center py-2.5 bg-copper-600 hover:bg-copper-700 text-white font-semibold text-sm rounded-md transition-all duration-200">
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-stone-200">
              <h2 className="font-display text-xl text-stone-700 mb-7">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map(p => (
                  <Link key={p.id || p.slug} to={`/blog/${p.slug}`} className="group block p-5 bg-white hover:bg-stone-50 border border-stone-200 hover:border-copper-300 rounded-lg transition-all duration-300">
                    <Badge category={p.category} />
                    <h3 className="font-display text-base text-stone-700 mt-3 mb-1 group-hover:text-copper-600 transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-stone-500 text-sm line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
