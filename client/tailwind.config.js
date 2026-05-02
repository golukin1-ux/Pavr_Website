/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm neutral — body text, dividers, light surfaces
        stone: {
          50:  '#F5F2ED',
          100: '#EDEAE5',
          200: '#E5E0D9',
          300: '#C5BFB5',
          400: '#8A857D',
          500: '#6B6560',
          600: '#4A4640',
          700: '#2B2825',
          800: '#1A1917',
          900: '#0D0C0A',
          950: '#070706',
        },
        // Primary brand navy — exact logo color #0F2C59
        navy: {
          50:  '#EBF0F9',
          100: '#C7D6EE',
          200: '#90ADE2',
          300: '#5983D1',
          400: '#305EBF',
          500: '#163C9C',
          600: '#112E7A',
          700: '#0F2C59',  // ← logo bg, headers, dark sections
          800: '#091F40',
          900: '#051228',
          950: '#020A14',
        },
        // Accent — burnt copper / terracotta #C45D2C (editorial-industrial, locked 2026-04-19)
        copper: {
          50:  '#FBF1EC',
          100: '#F5DCCB',
          200: '#ECBAA0',
          300: '#DF9872',
          400: '#D07953',
          500: '#C45D2C',  // ← brand accent, CTAs, highlights
          600: '#A84B20',  // ← CTA hover
          700: '#883A18',
          800: '#672B11',
          900: '#461C0C',
          950: '#2B1007',
        },
        // Cream — exact logo text color on dark #F7F6E7
        cream: {
          50:  '#FDFDE0',
          100: '#FAFAD9',
          200: '#F7F6E7',  // ← logo text on dark bg
          300: '#EAE8D0',
          400: '#D0CEAB',
        },
        sage: {
          50:  '#F0F5F1',
          100: '#D8E6DB',
          200: '#B5CCB9',
          300: '#8FB396',
          400: '#7EA68A',
          500: '#5B8C6D',
          600: '#4A7359',
        },
      },
      fontFamily: {
        display: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        sans:    ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        serif:   ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'reveal':   'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade':     'fade 0.6s ease forwards',
        'marquee':      'marquee 40s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'spin-slow':'spin 3s linear infinite',
      },
      keyframes: {
        reveal: {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(15,44,89,0.04), 0 4px 16px rgba(15,44,89,0.06)',
        'card-lg': '0 2px 6px rgba(15,44,89,0.05), 0 8px 32px rgba(15,44,89,0.08)',
        'focus':   '0 0 0 2px #F5F2ED, 0 0 0 4px #C45D2C',
      },
      backgroundImage: {
        'grid-pattern': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='none' stroke='%23ffffff' stroke-opacity='.04' stroke-width='.5'/%3E%3C/svg%3E")`,
        'dot-pattern':  `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='%23C5BFB5' fill-opacity='.3'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
