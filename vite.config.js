import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" -> aset selalu dicari relatif terhadap index.html.
// Ini membuat build yang SAMA bisa langsung dipakai di GitHub Pages
// (project page seperti /nama-repo/), Vercel, Netlify, atau subfolder server lain,
// tanpa perlu mengubah konfigurasi setiap kali di-deploy ulang.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
