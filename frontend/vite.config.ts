import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',  // Exportar los archivos compilados a la carpeta estática de Django
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
