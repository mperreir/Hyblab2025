import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Ajout de la prise en charge de React (si utilisé)

export default defineConfig({
  base: '/nantes2025/brief/', // Chemin de base pour la production
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Proxy pour les requêtes API en dev
    },
  },
  build: {
    outDir: 'dist', // Dossier de sortie pour les fichiers buildés
    emptyOutDir: true, // Vider le dossier de sortie avant de générer
  },
  plugins: [react()], // Si React est utilisé dans votre projet
});
