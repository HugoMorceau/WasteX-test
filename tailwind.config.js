/** @type {import('tailwindcss').Config} */
export default {
  content : ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
    }
  },
  plugins: [],
}

