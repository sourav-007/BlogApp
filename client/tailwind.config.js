/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bauhaus: ['BauhausStd'], 
      },
      colors: {
        'special': '#24a32a',
        'special-hover': '#209326',
        'heading': '#2bc332',
        'primary-text': '#1f2937',
        'primary-btn': '#1f2937',
        'primary-btn-text': '#ffffff',
      },
      keyframes: {
        blink: {
          '0%, 100%': { color: 'transparent' },
          '50%': { color: '#b91c1c' },
        }
      },
      animation: {
        blink: 'blink 2s infinite',
      },
    },
  },
  plugins: [],
}