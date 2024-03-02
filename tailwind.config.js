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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '25%': { opacity: '20%' },
          '50%': { opacity: '45%' },
          '75%': { opacity: '70%' },
          '100%': { opacity: '100%' },
        },
        slideLeft: {
          '0%': { left: '100vw' },
          '25%': { left: '80vw' },
          '50%': { left: '50vw' },
          '75%': { left: '30vw' },
          '100%': { left: '0vw' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s linear',
        slideLeft: 'slideLeft 0.3s linear',
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
};
