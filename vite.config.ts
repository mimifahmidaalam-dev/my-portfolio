import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project sites are served from a subpath (e.g. /my-portfolio/),
  // so the deploy workflow sets VITE_BASE_PATH. Local dev and other hosts use '/'.
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})