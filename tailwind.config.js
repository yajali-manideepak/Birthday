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
          50: '#fffef0',
          100: '#fefcdb',
          200: '#fcf8b5',
          300: '#faef82',
          400: '#f5de4c',
          500: '#e5c158',
          600: '#d4af37',
          700: '#aa771c',
          800: '#895b1b',
          900: '#573e04',
          light: '#fbf5b7',
          DEFAULT: '#d4af37',
          dark: '#aa771c',
          amber: '#f59e0b',
        },
        obsidian: {
          950: '#040406',
          900: '#08080c',
          850: '#0e0e14',
          800: '#14141d',
          700: '#1c1c27',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.8, filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.4))' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 35px rgba(212,175,55,0.8))' },
        }
      }
    },
  },
  plugins: [],
}
