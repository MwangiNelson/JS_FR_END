/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#D1D1D6',
        ghost: '#E0E8EE',
        dull: '#303233',
      }
    },
  },
  plugins: [require("daisyui")],
}

