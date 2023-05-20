/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin')
import plugin from 'tailwindcss/plugin'
export default {
  content: ['./src/**/*.{js,jsx,tsx,ts}', './index.html'],
  theme: {
    extend: {
      colors: {
        main: '#86EFAC',
        primary: '#020202',
        secondary: '#606C38'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scroll-hidden': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    })
  ]
};
