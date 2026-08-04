# SI-Tekhum — Sistem Informasi Teknis dan Hukum KPU Kabupaten

SPA (Single Page Application) internal untuk Subbagian Teknis dan Hukum,
dengan 4 menu utama (Kinerja, Teknis, Hukum, Pleno) yang masing-masing punya
sub-menu dinamis. Dirancang agar menambah sub-menu baru cukup lewat data —
tanpa membuat file baru, kecuali dibutuhkan tampilan/logika khusus.

## Struktur navigasi saat ini

```
Beranda
Kinerja
├── Rencana Kinerja
└── Laporan Kinerja
Teknis
├── Hasil Pemilu 2024
├── Hasil Pemilihan 2024
└── Laporan Pemutakhiran Data Partai Politik Berkelanjutan
Hukum
├── Dokumen BA
├── Dokumen SK
├── Laporan JDIH
├── Laporan SPIP
├── JDIH
├── SPIP (Sip Sekali)
├── Medsos JDIH
├── Silakon
└── Simoku
Pleno
└── SIKAP
```

## Tech stack

Vite + React + Tailwind CSS + React Router (`HashRouter`, aman untuk refresh
URL di GitHub Pages). Lihat versi sebelumnya di git history untuk detail
alasan pemilihan stack.

## Arsitektur & prinsip modular

```
src/
├── components/
│   ├── layout/           Sidebar (accordion 4 menu), Navbar, AppLayout
│   └── ui/                Card, Badge, StatCard, PageHeader, PageLoader
├── config/
│   └── navigation.js      ⭐ SATU-SATUNYA file untuk mengatur menu + routing
├── modules/
│   ├── dashboard/          Beranda & halaman 404
│   ├── shared/              ⭐ Template generik dipakai lintas sub-menu:
│   │   ├── DocumentListPage.jsx    (type: "dokumen")
│   │   ├── DataResultPage.jsx      (type: "data")
│   │   ├── ExternalSystemPage.jsx  (type: "sistem")
│   │   └── PlaceholderPage.jsx     (type: "placeholder" / fallback)
│   ├── kinerja/  teknis/  hukum/  pleno/
│   │   (kosong kecuali ada komponen KUSTOM — lihat README di masing-masing folder)
├── router/
│   └── AppRouter.jsx       Generate <Route> otomatis, pilih template sesuai `type`
├── App.jsx
└── main.jsx
```

### Bagaimana satu sub-menu dirender

`navigation.js` mendefinisikan setiap sub-menu sebagai data:

```js
{
  id: "hukum-jdih",
  label: "JDIH",
  path: "/hukum/jdih",
  icon: Scale,
  type: "sistem",              // <- menentukan template yang dipakai
  description: "Portal Jaringan Dokumentasi dan Informasi Hukum...",
  meta: { url: "" },            // <- data spesifik untuk template "sistem"
}
```

`AppRouter.jsx` membaca `type: "sistem"` lalu otomatis merender
`ExternalSystemPage` dan mengoper seluruh object di atas sebagai prop `menu`.
Tidak ada routing manual yang perlu ditulis.

### 4 tipe template yang tersedia

| type          | Dipakai untuk                                   | Data di `meta`                    |
|---------------|--------------------------------------------------|-------------------------------------|
| `dokumen`     | Rencana/Laporan Kinerja, Dokumen BA/SK, Laporan JDIH/SPIP | `documents: [{ nama, kategori, tahun }]` |
| `data`        | Hasil Pemilu 2024, Hasil Pemilihan 2024           | `stats: [{ label, value }]`         |
| `sistem`      | JDIH, SPIP, Medsos JDIH, Silakon, Simoku, SIKAP   | `url: "https://..."` (iframe + fallback link) |
| `placeholder` | Default, sub-menu yang belum ditentukan bentuknya | — |

## Cara menambah sub-menu baru

**Skenario A — cukup pakai template yang sudah ada (paling umum):**

1. Buka `src/config/navigation.js`.
2. Tambahkan satu object baru ke array `submenu` pada grup yang dituju, mis. `Teknis`:

   ```js
   {
     id: "teknis-rekap-logistik",
     label: "Rekap Logistik",
     path: "/teknis/rekap-logistik",
     icon: PackageCheck, // import dari lucide-react di bagian atas file
     type: "dokumen",
     description: "Rekapitulasi distribusi logistik pemilu.",
     meta: { documents: [] },
   },
   ```
3. Commit & push — selesai. Sidebar, breadcrumb, dan routing otomatis mengenali menu baru.

**Skenario B — butuh tampilan/logika khusus (kalkulator, chart interaktif, dll):**

1. Buat file komponen di `src/modules/<grup>/NamaFitur.jsx` (mis. `src/modules/teknis/SimulasiDapil.jsx`).
2. Di `navigation.js`, import lazy di bagian atas:
   ```js
   const SimulasiDapil = lazy(() => import("../modules/teknis/SimulasiDapil.jsx"));
   ```
3. Tambahkan entri submenu dengan field `element` (field `type` boleh diabaikan):
   ```js
   {
     id: "teknis-simulasi-dapil",
     label: "Simulasi Dapil",
     path: "/teknis/simulasi-dapil",
     icon: MapPinned,
     element: SimulasiDapil,
     description: "Alat bantu estimasi alokasi kursi per dapil.",
   },
   ```

Tidak ada file lain (Sidebar, Navbar, AppRouter, App.jsx) yang perlu diubah
di kedua skenario di atas.

## Menambah menu utama (grup ke-5, dst.)

Tambahkan object baru ke array `navigationGroups` di `navigation.js` dengan
struktur yang sama (id, label, icon, submenu). Sidebar accordion akan
otomatis menampilkannya sebagai grup collapsible baru.

## Integrasi Google Drive & Google Sheets (Laporan Kinerja)

Sub-menu **Laporan Kinerja** sudah tersambung ke Google Drive (untuk file
evidence) dan Google Sheets (sebagai "database" baris laporan), lewat Google
Apps Script — tanpa pengguna perlu login akun Google (Opsi A), dan dengan
**scope akses seminimal mungkin (`drive.file`)**: script hanya bisa
mengakses satu folder & satu spreadsheet yang dibuatnya sendiri, sama sekali
tidak bisa menyentuh file lain di akun Google tersebut.

**Panduan setup lengkap (10–15 menit, sekali saja):** lihat
[`google-apps-script/README.md`](./google-apps-script/README.md)

Ringkasan arsitektur:
```
Form "Tambah Laporan Baru" (React)
        │ fetch() dengan file evidence sebagai base64
        ▼
Google Apps Script Web App (google-apps-script/Code.gs)
   scope: drive.file (bukan drive penuh) — lihat appsscript.json
        │                              │
        ▼                              ▼
Folder Google Drive              Google Sheets
(dibuat otomatis oleh          (dibuat otomatis oleh
 script, hanya folder ini        script, hanya sheet ini
 yang bisa diakses)               yang bisa diakses)
```

File terkait di frontend:
- `src/config/integrations.js` — baca URL Web App dari `VITE_GOOGLE_SCRIPT_URL`
- `src/services/driveApi.js` — `fetchLaporanKinerja()`, `submitLaporanKinerja()`, `fetchStorageStatus()`
- `src/utils/file.js` — konversi file ke base64 sebelum dikirim
- `src/modules/kinerja/LaporanKinerja.jsx` — halaman yang memakai semua di atas, termasuk panel "Cek folder Drive yang sedang dipakai" untuk verifikasi mandiri

Kalau `VITE_GOOGLE_SCRIPT_URL` belum diisi, halaman otomatis menampilkan data
contoh + pemberitahuan bahwa koneksi belum aktif, sehingga tampilan tetap
bisa di-preview tanpa setup backend terlebih dahulu.

## Menjalankan secara lokal



```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # menghasilkan folder dist/ siap deploy
npm run preview
```

## Deployment

Workflow GitHub Actions (`.github/workflows/deploy.yml`) sudah tersedia:
push ke branch `main` akan otomatis build & deploy ke GitHub Pages (aktifkan
sekali di Settings → Pages → Source → GitHub Actions). Build yang sama juga
langsung bisa dipakai di Vercel/Netlify (`npm run build`, output `dist`).

## Mengisi konten sungguhan

- **type: "dokumen"** — pindahkan `meta.documents` ke `public/data/<slug>.json`
  dan `fetch()` di `DocumentListPage.jsx`, agar admin non-teknis bisa update
  data tanpa build ulang.
- **type: "data"** — sambungkan `DataResultPage.jsx` ke sumber data resmi
  (mis. Sirekap/SIDALIH) menggantikan area placeholder tabel/chart.
- **type: "sistem"** — isi `meta.url` dengan alamat sistem terkait
  (JDIH, SPIP, Silakon, Simoku, SIKAP, dll). Jika sistem tersebut memblokir
  embed (`X-Frame-Options`), pengguna tetap bisa memakai tombol
  "Buka di tab baru" yang selalu tersedia.

## Identitas visual

Token warna & tipografi terpusat di `tailwind.config.js`
(`ink`, `slate`, `gold`, `merah`) dan font di `index.html`
(Plus Jakarta Sans + IBM Plex Mono). Gunakan token ini di komponen baru agar
identitas visual tetap konsisten di seluruh sub-menu.
