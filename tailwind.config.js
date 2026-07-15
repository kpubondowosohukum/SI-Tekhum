/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palet resmi Tekhum Portal — jangan diganti sembarangan di komponen,
        // selalu pakai token ini agar identitas visual konsisten di semua modul baru.
        ink: {
          950: "#0B1526", // teks utama & sidebar aktif
          900: "#101E38",
          800: "#16294A",
          700: "#1C3661", // navy utama (identitas satker)
          600: "#26467F",
          500: "#35619E",
        },
        slate: {
          50: "#F6F7FA",
          100: "#EEF1F6",
          200: "#DFE4EC",
          300: "#C6CEDA",
          400: "#98A4B8",
          500: "#6B7A93",
          600: "#4E5C74",
        },
        gold: {
          400: "#D9A94E", // aksen kehormatan/legal — dipakai tipis, bukan dominan
          500: "#C4913A",
          600: "#A6772B",
        },
        merah: {
          600: "#B5292F", // aksen status/urgensi, selaras identitas kepemiluan
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 30, 56, 0.04), 0 8px 24px -12px rgba(16, 30, 56, 0.12)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
