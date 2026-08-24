import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Seo from '../components/seo/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <div className="font-display text-[120px] text-copper-500/20 leading-none mb-2">404</div>
        <h1 className="font-display text-2xl text-stone-700 mb-3">Page not found</h1>
        <p className="text-stone-400 text-sm leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-lg transition-all duration-200"
          >
            <Home size={15} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-200 hover:border-copper-300 text-stone-500 hover:text-copper-600 font-medium text-sm rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={15} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
    </>
  );
}
