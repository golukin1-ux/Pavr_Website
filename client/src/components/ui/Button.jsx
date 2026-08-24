import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', href, to, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 cursor-pointer';

  const variants = {
    primary:        'px-7 py-3.5 bg-copper-600 hover:bg-copper-700 text-white rounded-sm',
    secondary:      'px-7 py-3.5 bg-navy-700 hover:bg-navy-800 text-white rounded-sm',
    outline:        'px-7 py-3.5 border border-stone-300 hover:border-navy-700 text-stone-700 hover:text-navy-700 rounded-sm',
    'outline-light':'px-7 py-3.5 border border-white/15 hover:border-copper-500/50 text-stone-300 hover:text-white rounded-sm',
    ghost:          'px-4 py-2 text-stone-600 hover:text-copper-600 hover:bg-copper-500/10 rounded-sm',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (to)   return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}
