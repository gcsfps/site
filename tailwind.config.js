/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
          600: '#242424',
          500: '#2A2A2A',
        },
        accent: {
          purple: '#B624FF',
          pink: '#FF2D6C',
          blue: '#24A5FF',
        },
        gold: {
          500: '#FFD700',
          400: '#FFE144',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
