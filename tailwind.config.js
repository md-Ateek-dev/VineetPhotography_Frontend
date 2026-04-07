/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#D4A843',
          600: '#B8860B',
          700: '#996515',
          800: '#7A4F0E',
          900: '#5C3A0A',
        },
        dark: {
          50: '#2A2A2A',
          100: '#232323',
          200: '#1E1E1E',
          300: '#1A1A1A',
          400: '#151515',
          500: '#111111',
          600: '#0D0D0D',
          700: '#0A0A0A',
          800: '#070707',
          900: '#030303',
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'Playfair Display', 'serif'],
        body: ['Poppins', 'Montserrat', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
