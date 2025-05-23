// tailwind.config.js
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      // Ajoute d'autres dossiers si nécessaire
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            teal: '#005D7C',
            gold1: '#CE9226',
            gold2: '#FEDE32',
          },
          complementary: {
            orange: '#E05A1B',
            brown: '#593B0B',
          },
        },
        fontFamily: {
          primary: ['Bahnschrift', 'sans-serif'],
          secondary: ['Arial', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  