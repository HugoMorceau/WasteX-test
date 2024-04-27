
/** @type {import('tailwindcss').Config} */
export default {
  content : ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#1a1a1a',
          200: '#242424',
          hover: '#f9f9f9',
          text: 'rgba(235, 235, 235, 0.8)'
        },
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
        


      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  plugins: [],
}

