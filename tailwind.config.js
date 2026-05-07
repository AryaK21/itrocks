/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magical: {
          dark: '#050a14',
          fog: '#0a1526',
          gold: '#cba153',
          glow: '#4b7be5'
        }
      },
      fontFamily: {
        cinematic: ['Inter', 'sans-serif'], // Fallback if no specific font
      }
    },
  },
  plugins: [],
}
