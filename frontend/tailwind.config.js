/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-editorial': '-0.04em',
        'tight-title': '-0.025em',
        'wide-badge': '0.15em',
        'ultra-wide': '0.24em',
      },
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf6',
          200: '#c3d8ec',
          300: '#95bee0',
          400: '#609fd0',
          500: '#3c82bd',
          600: '#2b68a3',
          700: '#235384',
          800: '#1e3a5f',
          900: '#08284d',
          950: '#051830',
        },
        royal: {
          DEFAULT: '#00458b',
          dark: '#003366',
          light: '#1e68b5',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f37021',
          600: '#ea580c',
          700: '#c2410c',
        },
        sky: {
          DEFAULT: '#74b9ff',
          light: '#eaf4ff',
        },
        brand: {
          navy: '#08284d',
          royal: '#00458b',
          orange: '#f37021',
          bg: '#f8fafc',
          card: '#ffffff',
          accent: '#00bcd4',
        }
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
