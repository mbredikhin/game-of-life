/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: ['prettier-plugin-tailwindcss'],
  theme: {
    extend: {
      colors: {
        black: '#16100d',
        gray: {
          DEFAULT: '#1b1716',
          light: '#333333',
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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '25%': { opacity: '20%' },
          '50%': { opacity: '45%' },
          '75%': { opacity: '70%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s linear',
      },
    },
  },
};
