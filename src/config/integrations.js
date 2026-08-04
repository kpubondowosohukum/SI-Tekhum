/**
 * Konfigurasi integrasi eksternal — terpusat di satu file agar mudah
 * ditambah/diganti tanpa menyentuh kode komponen.
 *
 * VITE_GOOGLE_SCRIPT_URL diisi lewat file .env (lihat .env.example dan
 * google-apps-script/README.md untuk panduan lengkap setup).
 */
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

export const isGoogleDriveConfigured = Boolean(GOOGLE_SCRIPT_URL);
