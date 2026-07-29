Folder ini untuk komponen KUSTOM khusus grup ini (mis. kalkulator, chart interaktif).
Sub-menu yang cukup memakai template generik (dokumen/data/sistem/placeholder)
TIDAK perlu file di sini — cukup didaftarkan di src/config/navigation.js.

Contoh menambah komponen kustom:
1. Buat file NamaFitur.jsx di folder ini.
2. Di navigation.js, tambahkan pada entri terkait:
   element: lazy(() => import("../modules/<grup>/NamaFitur.jsx"))
