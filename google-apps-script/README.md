# Menghubungkan "Laporan Kinerja" ke Google Drive & Sheets (Scope Minimal)

Versi ini sengaja dibatasi dengan prinsip **least privilege**: script HANYA
bisa mengakses satu folder Drive dan satu spreadsheet yang dibuatnya sendiri
— sama sekali tidak bisa menyentuh file lain di akun Google tersebut, bahkan
kalau URL Web App-nya bocor ke orang lain.

Total waktu setup: sekitar 10–15 menit, dilakukan sekali saja.

## Kenapa foldernya "dibuat otomatis", bukan saya pilih sendiri?

Google membedakan dua level izin untuk akses Drive:

| Scope | Jangkauan akses | Dipakai di sini? |
|---|---|---|
| `drive` (penuh) | Bisa baca/tulis **seluruh file** di akun Google tersebut | ❌ Tidak — terlalu luas |
| `drive.file` (per-file) | Hanya bisa akses file/folder yang **dibuat oleh aplikasi itu sendiri** | ✅ Dipakai di versi ini |

Konsekuensi dari memilih `drive.file`: script tidak diizinkan "meminjam" folder
lama yang Anda buat manual lewat Drive — ia harus membuat foldernya sendiri
supaya secara teknis "memiliki" izin atasnya. Ini tukar-tambah yang wajar:
sedikit kurang fleksibel di awal, tapi jauh lebih aman.

> **Folder & spreadsheet-nya tetap bisa Anda pindah-pindahkan** ke lokasi
> mana pun di Drive lewat drag-and-drop biasa setelah dibuat — itu aksi Anda
> sebagai pemilik file, tidak memengaruhi akses script sama sekali (ID
> foldernya tidak berubah walau dipindah ke folder lain).

---

## Langkah 1 — Buat project Google Apps Script

1. Buka [script.google.com](https://script.google.com) → **New project**.
2. Hapus kode default di file `Code.gs`, ganti dengan isi file
   `google-apps-script/Code.gs` pada project ini.
3. Di sidebar kiri, klik ikon gerigi ⚙️ **Project Settings** → centang
   **"Show appsscript.json manifest file in editor"**.
4. Kembali ke tab **Editor**, buka file `appsscript.json` yang baru muncul,
   ganti isinya dengan isi file `google-apps-script/appsscript.json` pada
   project ini (berisi deklarasi scope `drive.file`, bukan `drive` penuh).
5. Beri nama project, mis. "SI-Tekhum Backend", lalu **Save** (`Ctrl+S`).

## Langkah 2 — Deploy sebagai Web App

1. Klik **Deploy** → **New deployment**.
2. Klik ikon gerigi ⚙️ di samping "Select type" → pilih **Web app**.
3. Isi:
   - **Execute as**: **Me** (folder & spreadsheet akan otomatis dibuat di Drive akun ini)
   - **Who has access**: **Anyone** (supaya pengguna website tidak perlu login, sesuai Opsi A)
4. Klik **Deploy**.
5. Saat diminta otorisasi: pilih akun Google Anda → kalau muncul peringatan
   "Google hasn't verified this app", klik **Advanced** → **Go to [nama
   project] (unsafe)** (ini normal untuk script buatan sendiri) → **Allow**.
   - **Perhatikan layar izin yang diminta** — karena scope-nya sudah
     dipersempit, Anda akan melihat permintaan izin yang jauh lebih spesifik
     (`"See, edit, create, and delete only the specific Google Drive files
     you use with this app"`), bukan lagi "See, edit, create, and delete all
     of your Google Drive files". Ini konfirmasi visual bahwa pembatasan
     scope-nya berhasil.
6. Salin **Web app URL** yang muncul (formatnya
   `https://script.google.com/macros/s/AKfycby.../exec`).

## Langkah 3 — Sambungkan ke website

1. Salin `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
2. Isi `VITE_GOOGLE_SCRIPT_URL` dengan URL dari Langkah 2.
3. Jalankan `npm run dev`.

## Langkah 4 — Verifikasi folder yang benar-benar dipakai

1. Buka halaman **Laporan Kinerja** di website.
2. Karena ini pertama kali dijalankan, script otomatis membuat:
   - Folder Drive bernama **"SI-Tekhum - Evidence Laporan Kinerja"**
   - Spreadsheet bernama **"LAPORAN KINERJA TEKHUM 2026"**
3. Klik link kecil **"Cek folder Drive yang sedang dipakai"** di atas tabel —
   akan muncul link langsung ke folder & spreadsheet tersebut, supaya Anda
   bisa memverifikasi sendiri persis folder mana yang dipakai.
4. (Opsional) Pindahkan folder/spreadsheet itu ke lokasi lain di Drive Anda
   lewat drag-and-drop biasa — tidak akan merusak koneksi.

## Menguji coba fitur upload

1. Klik **Tambah Laporan Baru**, isi form, lampirkan file evidence, **Simpan**.
2. Buka folder yang linknya didapat dari Langkah 4 — file evidence harusnya
   sudah muncul di sana.
3. Buka spreadsheet-nya — baris baru harusnya sudah otomatis bertambah.

## Deploy ke GitHub Pages/Vercel/Netlify

Sama seperti sebelumnya — isi `VITE_GOOGLE_SCRIPT_URL` lewat pengaturan
environment variable platform (bukan di-commit ke repo):

- **GitHub Pages (GitHub Actions):** Settings → Secrets and variables →
  Actions → **New repository secret** dengan nama `VITE_GOOGLE_SCRIPT_URL`,
  lalu tambahkan ke `.github/workflows/deploy.yml`:
  ```yaml
  - name: Build project
    run: npm run build
    env:
      VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
  ```
- **Vercel/Netlify:** Project Settings → Environment Variables.

## Catatan jujur soal batas scope ini

- Scope `drive.file` di atas mengunci akses Drive hanya ke folder evidence
  yang dibuat script. Namun scope `spreadsheets` yang dipakai untuk membaca/
  menulis baris laporan **secara teknis tetap scope standar Google Sheets**
  (belum ada versi "per-file" khusus untuk Sheets seperti `drive.file` di
  Drive). Mitigasinya: script ini hanya PERNAH membuat dan memakai **satu**
  spreadsheet (ID-nya tersimpan otomatis), jadi walau scope-nya secara teknis
  lebih luas, kode ini sendiri tidak pernah menyentuh spreadsheet lain.
- Kalau Anda butuh pembatasan maksimal (termasuk untuk penyimpanan data
  tabelnya, bukan cuma file evidence), saya bisa buatkan versi alternatif
  yang menyimpan data laporan sebagai file JSON di dalam folder yang sama
  (bukan Google Sheets) — konsekuensinya, laporan tidak lagi bisa dibuka
  langsung sebagai spreadsheet biasa untuk direkap manual. Beri tahu saya
  kalau ingin versi ini.
- Ukuran file evidence maksimal sekitar **20–25 MB** per upload.
- Setiap update pada `Code.gs`/`appsscript.json` **harus di-deploy ulang**
  (Deploy → Manage deployments → ikon pensil → Version: New version → Deploy).
