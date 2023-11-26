const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Montserrat"', 'sans-serif'],
    },
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        graphite: {
          400: '#516d96',
          500: '#2e3242',
          600: '#232632',
        },
        primary: {
          light: colors.blue[500],
          dark: colors.blue[600],
        },
        secondary: {
          neon: '#44bf9f',
          light: colors.green[500],
          dark: colors.green[600],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
