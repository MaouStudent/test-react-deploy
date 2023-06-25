/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluegreen1: '#D1F9FF',
        bluegreen2: '#D1F900',
      },
    },
  },
  plugins: [],
}