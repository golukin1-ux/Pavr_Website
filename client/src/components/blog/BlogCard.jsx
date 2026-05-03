import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatDate, readingTime } from '../../utils/formatters';

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/blog/${post.slug}`} className="group block h-full">
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.09)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="h-full bg-white border border-stone-200 hover:border-copper-300 rounded-lg overflow-hidden transition-colors duration-200 flex flex-col"
        >
          {/* Thumbnail */}
          <div className="h-44 bg-stone-100 flex items-center justify-center relative">
            {post.image ? (
              <img src={post.image} alt={post.title} width={1600} height={900} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            ) : (
              <FileText size={32} className="text-stone-300" strokeWidth={1} />
            )}
            {post.featured && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-copper-500 text-white text-[10px] font-mono font-medium uppercase tracking-wider rounded-md">
                Featured
              </span>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="mb-3">
              <Badge category={post.category} />
            </div>

            <h3 className="font-display text-lg text-stone-700 leading-snug mb-2 group-hover:text-copper-600 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-3 text-stone-400 text-xs font-mono">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {readingTime(post.content)} min
                </span>
              </div>
              <ArrowRight size={14} className="text-copper-400 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
