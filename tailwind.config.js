/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: ['prettier-plugin-tailwindcss'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        gray: {
          DEFAULT: '#1b1716',
          light: '#EFEFEF',
        },
        orange: '#ff9665',
        violet: {
          dark: '#24113d',
        },
      },
      boxShadow: {
        cell: '-2px -2px 48px 0px #ff9665',
      },
      fontFamily: {
        display: ['Minecraft', 'sans-serif'],
      },
      zIndex: {
        tooltip: '100',
        drawer: '1000',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '25%': { opacity: '20%' },
          '50%': { opacity: '45%' },
          '75%': { opacity: '70%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s linear',
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
};
