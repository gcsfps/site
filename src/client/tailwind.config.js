module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9ff',
          100: '#e8eaff',
          200: '#c5caff',
          300: '#a2a9ff',
          400: '#7f89ff',
          500: '#5c68ff',
          600: '#3947ff',
          700: '#1626ff',
          800: '#0011f3',
          900: '#000dc4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
