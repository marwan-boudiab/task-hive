/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // cursor: {
      //   default: "url(/cursor/default.svg), default",
      //   pointer: "url(/cursor/pointer.svg), pointer",
      // },
      backgroundImage: {
        'tasks-bg': "url('/assets/bg.png')",
      },
      colors: {
        primary: {
          DEFAULT: '#7a92fa',
          500: '#677ee0',
          800: '#5168c9',
        },

        tertiary: '#f2f2f7',
        text_color: '#4b4d52',

        error: '#fa4b7a',
        edit: '#343438',

        priority: {
          low: '#7a92fa',
          mid: '#ffd15e',
          high: '#fc0f4a',
        },
      },
    },
  },
  plugins: [],
};
