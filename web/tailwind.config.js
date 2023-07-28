/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pacific-blue': {
          500: '#1DAABB',
          600: '#157b87',
        },
        'rich-black': {
          500: '#093545',
        },
        'dark-slate-gray': {
          500: '#224957',
        },
      },
    },
  },
}
