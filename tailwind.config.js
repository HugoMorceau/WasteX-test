/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#1a1a1a',
          200: '#242424',
          hover: '#f9f9f9',
          text: 'rgba(235, 235, 235, 0.8)'
        },
        secondary: {
          100: 'rgb(180, 83, 9, 1)',
          200: 'rgb(146, 64, 14, 1)'
        }
      }
    },
    container: {
      center: true,
      padding: '1rem'
    },
    screens: {
      sm: { max: '639px' },
      md: { min: '640px', max: '767px' },
      lg: { min: '768px', max: '1023px' },
      xl: { min: '1024px', max: '1279px' }
    }
  },
  plugins: []
}
