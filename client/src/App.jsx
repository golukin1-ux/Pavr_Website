import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Navbar       from './components/layout/Navbar';
import Footer       from './components/layout/Footer';
import ScrollToTop  from './components/layout/ScrollToTop';
import SmoothScroll from './components/layout/SmoothScroll';

const HomePage              = lazy(() => import('./pages/HomePage'));
const BusinessSolutionsPage = lazy(() => import('./pages/BusinessSolutionsPage'));
const ProductsPage          = lazy(() => import('./pages/ProductsPage'));
const AboutPage             = lazy(() => import('./pages/AboutPage'));
const ContactPage           = lazy(() => import('./pages/ContactPage'));
const BlogPage              = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage        = lazy(() => import('./pages/BlogDetailPage'));
const NotFoundPage          = lazy(() => import('./pages/NotFoundPage'));

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  in:      { opacity: 1, y: 0 },
  out:     { opacity: 0, y: -4 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="relative"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
          <Routes location={location}>
            <Route path="/"           element={<HomePage />} />
            <Route path="/solutions"  element={<BusinessSolutionsPage />} />
            <Route path="/products"   element={<ProductsPage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/contact"    element={<ContactPage />} />
            <Route path="/blog"       element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="*"           element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col grain">
          <Navbar />
          <main id="main-content" className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  );
}
