import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    API_BASE_URL: JSON.stringify("http://localhost:3000")
  },
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, '../common')
    }
  }
})
