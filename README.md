# Portal Tekhum — Subbagian Teknis dan Hukum KPU Kabupaten

SPA (Single Page Application) internal untuk menampung fitur, alat kerja, dan
visualisasi data Divisi Teknis Penyelenggaraan dan Divisi Hukum/JDIH,
dirancang agar mudah tumbuh: menambah fitur baru cukup dengan menambah file
komponen dan mendaftarkannya di satu file konfigurasi.

## Tech stack & alasan pemilihan

| Layer      | Pilihan                     | Alasan |
|------------|------------------------------|--------|
| Build tool | **Vite**                    | Dev server sangat cepat, build teroptimasi, output statis siap deploy ke mana saja |
| UI         | **React**                   | Sistem komponen matang, cocok untuk dashboard yang fitur-fiturnya terus bertambah |
| Routing    | **React Router (HashRouter)** | SPA berpindah halaman tanpa reload; `HashRouter` dipilih agar refresh URL tetap berfungsi di GitHub Pages tanpa konfigurasi server tambahan |
| Styling    | **Tailwind CSS**             | Konsisten, tidak perlu menulis CSS terpisah per komponen, mudah dipertahankan banyak kontributor |
| Ikon       | **lucide-react**             | Set ikon konsisten, ringan, tree-shakeable |

**Kenapa bukan "Tailwind + Vanilla JS"?** Untuk situs statis kecil itu valid,
tetapi karena Anda menyebutkan fitur akan terus bertambah (dashboard,
simulasi, arsip dokumen, dll — masing-masing dengan state sendiri), React +
routing berbasis registry akan jauh lebih mudah dirawat dalam jangka panjang
dibanding vanilla JS yang mengatur DOM secara manual.

## Arsitektur & prinsip modular

```
src/
├── components/
│   ├── layout/         # Sidebar, Navbar, AppLayout — kerangka aplikasi
│   └── ui/              # Card, Badge, StatCard, PageHeader — dipakai lintas modul
├── config/
│   └── navigation.js    # ⭐ SATU-SATUNYA file yang perlu diedit untuk fitur baru
├── modules/
│   ├── dashboard/        # Halaman utama & 404
│   ├── teknis/           # Semua fitur Divisi Teknis Penyelenggaraan
│   └── hukum/             # Semua fitur Divisi Hukum & JDIH
├── router/
│   └── AppRouter.jsx     # Generate <Route> otomatis dari navigation.js
├── App.jsx
└── main.jsx
```

Alur data satu arah: `navigation.js` → dibaca oleh `Sidebar.jsx` (untuk
tampilan menu) dan `AppRouter.jsx` (untuk routing) sekaligus. Anda tidak
pernah perlu menyentuh dua file itu lagi setelah setup awal.

## Cara menambah fitur baru (tanpa merombak kode)

Contoh: menambah fitur "Rekap Logistik" di Divisi Teknis.

1. Buat file baru: `src/modules/teknis/RekapLogistik.jsx`

   ```jsx
   import PageHeader from "../../components/ui/PageHeader.jsx";
   import Card from "../../components/ui/Card.jsx";

   export default function RekapLogistik() {
     return (
       <>
         <PageHeader
           eyebrow="Divisi Teknis Penyelenggaraan"
           title="Rekap Logistik"
           description="Deskripsi singkat fitur ini."
         />
         <Card title="Konten fitur">{/* isi fitur Anda */}</Card>
       </>
     );
   }
   ```

2. Buka `src/config/navigation.js`, import lazy dan tambahkan satu entri:

   ```js
   const RekapLogistik = lazy(() => import("../modules/teknis/RekapLogistik.jsx"));

   // di dalam group "Divisi Teknis Penyelenggaraan" -> items:
   {
     id: "teknis-rekap-logistik",
     label: "Rekap Logistik",
     path: "/teknis/rekap-logistik",
     icon: ListChecks, // import dari lucide-react
     element: RekapLogistik,
   },
   ```

3. `git commit` & `git push` — jika GitHub Actions sudah aktif (lihat di
   bawah), website akan otomatis ter-update. Selesai — Sidebar dan routing
   otomatis mengenali menu baru tanpa mengubah file lain.

## Menjalankan secara lokal

```bash
npm install
npm run dev       # buka http://localhost:5173
npm run build     # menghasilkan folder dist/ siap deploy
npm run preview   # preview hasil build
```

## Opsi deployment

### 1. GitHub Pages (sudah disiapkan otomatis)

Workflow di `.github/workflows/deploy.yml` akan build & deploy otomatis
setiap kali ada push ke branch `main`. Aktifkan sekali saja di repo:

1. Settings → Pages → Source → pilih **GitHub Actions**.
2. Push ke `main`, tunggu workflow selesai di tab **Actions**.
3. Situs akan tersedia di `https://<username>.github.io/<nama-repo>/`.

### 2. Vercel / Netlify

Import repositori langsung dari dashboard Vercel/Netlify:

- Build command: `npm run build`
- Output directory: `dist`

Tidak perlu konfigurasi tambahan — `vite.config.js` sudah menggunakan
`base: "./"` sehingga build yang sama bekerja di semua platform tersebut.

## Mengganti data contoh dengan data nyata

Beberapa halaman (`SimulasiDapil.jsx`, `JdihArsip.jsx`) memakai data contoh
langsung di dalam komponen. Untuk produksi, disarankan:

- Pindahkan data statis ke `public/data/*.json` dan `fetch()` saat komponen
  dimuat, sehingga admin non-teknis bisa memperbarui data tanpa build ulang, atau
- Hubungkan ke API/Google Sheets/Airtable sesuai kebutuhan divisi.

## Identitas visual

Token warna & tipografi terpusat di `tailwind.config.js`
(`ink`, `slate`, `gold`, `merah`) dan font di `index.html`
(Plus Jakarta Sans untuk teks, IBM Plex Mono untuk data/kode). Gunakan token
ini di komponen baru agar identitas visual tetap konsisten.
