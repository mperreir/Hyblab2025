/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Le fichier HTML d'entrée
    "./src/**/*.{js,jsx,ts,tsx}" // Tous les fichiers dans src avec des extensions .js, .jsx, .ts, et .tsx
  ],
  theme: {
    extend: {
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

