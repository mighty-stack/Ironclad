/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#16263A',
        orange: '#E8622C',
        paper: '#FBFAF7',
        ink: '#1B1F23',
        grey: '#5C6570',
        frost: '#B7C2CD',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 #1B1F23',
        'hard-orange': '8px 8px 0 #E8622C',
        'hard-sm': '4px 4px 0 #E8622C',
      },
    },
  },
  plugins: [],
};
