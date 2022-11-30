/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    screens: {
      'laptop': {'max': '1344px'},
    },
    fontSize: {
      base: ['1rem', '1.625rem'],
      smallTitle: ['1.5rem', '2.4rem'],
      mediumTitle: ['2rem', '3.2rem'],
      bigTitle: ['3.4rem', '4.8rem']
    },
    extend: {
      backgroundImage: {
        fundo: "url('/fundo.png')",
        nlw: "linear-gradient(89.86deg, #9572FC -5%, #43E7AD 77.0%, #E1D55D 7.0%)",
        'game-text': " linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)"
      }
    },
  },
  plugins: [],
}
