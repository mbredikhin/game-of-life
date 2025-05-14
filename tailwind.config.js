/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: ['prettier-plugin-tailwindcss'],
  theme: {
    extend: {
      colors: {
        white: '#f1f7ed',
        black: '#211c1e',
        gray: {
          DEFAULT: '#7a7a7a',
          dark: '#333333',
          light: '#e0e0e0',
        },
        orange: '#ff9665',
      },
      boxShadow: {
        cell: '-2px -2px 48px 0px #ff9665',
      },
      fontFamily: {
        display: ['Minecraft', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
      zIndex: {
        'cell-glow': '10',
        'app-header': '100',
        tooltip: '100',
        popup: '100',
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
