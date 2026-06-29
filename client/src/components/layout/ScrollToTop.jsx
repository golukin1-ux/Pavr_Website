import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const prevPath = useRef(null);

  useEffect(() => {
    const crossPage = prevPath.current !== pathname;
    prevPath.current = pathname;

    const scrollTo = (top, smooth) => {
      if (lenis) lenis.scrollTo(top, { immediate: !smooth });
      else window.scrollTo(0, top);
    };

    if (!hash) {
      scrollTo(0, false);
      return;
    }

    const jump = (el, smooth) => {
      const navHeight = document.querySelector('header')?.offsetHeight ?? 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      scrollTo(top, smooth);
    };

    // Pages are lazy-loaded — poll until the anchor target exists.
    const id = hash.slice(1);
    let tries = 0;
    let settleTimer;
    let interval;
    const tryFind = () => {
      const el = document.getElementById(id);
      if (el) {
        clearInterval(interval);
        // Cross-page: jump instantly (smooth fly-bys across a fresh page are
        // disorienting and the route transition makes mid-flight targets stale),
        // then re-assert once after the transition and lazy content settle.
        // Same-page: smooth scroll.
        jump(el, !crossPage);
        if (crossPage) settleTimer = setTimeout(() => jump(el, false), 600);
        return true;
      }
      if (++tries > 40) clearInterval(interval);
      return false;
    };
    if (!tryFind()) interval = setInterval(tryFind, 100);
    return () => { clearInterval(interval); clearTimeout(settleTimer); };
  }, [pathname, hash, lenis]);

  return null;
}
