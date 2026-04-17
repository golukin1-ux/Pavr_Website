import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', href, to, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700/40 cursor-pointer';

  const variants = {
    primary:   'px-7 py-3.5 bg-copper-500 hover:bg-copper-600 text-white rounded-lg shadow-sm hover:shadow-glow',
    secondary: 'px-7 py-3.5 bg-navy-700 hover:bg-navy-800 text-white rounded-lg',
    outline:   'px-7 py-3.5 border border-stone-300 hover:border-navy-700 text-stone-600 hover:text-navy-700 rounded-lg',
    'outline-light': 'px-7 py-3.5 border border-white/20 hover:border-copper-400/60 text-white hover:text-copper-300 rounded-lg',
    ghost:     'px-4 py-2 text-stone-500 hover:text-copper-600 hover:bg-copper-50 rounded-md',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}
