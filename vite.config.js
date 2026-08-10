import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SI-Tekhum/", // Sesuaikan dengan nama repository di GitHub
  plugins: [react()],
  server: {
    port: 5173,
  },
});
