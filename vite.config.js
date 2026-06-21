import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: the /api serverless functions only run when deployed to Vercel
// (or locally via `vercel dev`, run from the project root). Plain
// `npm run dev` here serves the frontend only — pages that fetch from
// /api will fall back to their built-in FALLBACK data, which is fine
// for UI development.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
