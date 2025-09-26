import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // server: {
  //   proxy: {
  //     "/support-service": {
  //       target: "https://api.zenevo.in",
  //       changeOrigin: true,
  //       secure: true,
  //     },
  //   },
  // },
})
