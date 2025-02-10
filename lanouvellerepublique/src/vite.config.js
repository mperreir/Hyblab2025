import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nantes2025/lanouvellerepublique/',
  server: {
    historyApiFallback: true, // Fixes refresh issue
  },
})
