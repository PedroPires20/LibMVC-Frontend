import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "../common")
    }
  },
  define: {
    API_BASE_URL: JSON.stringify("http://localhost:3000")
  }
})
