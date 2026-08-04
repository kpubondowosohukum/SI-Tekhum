import { GOOGLE_SCRIPT_URL } from "../config/integrations.js";

/**
 * Mengambil info folder Drive & spreadsheet yang SEDANG dipakai backend —
 * berguna untuk memverifikasi bahwa script memang hanya mengakses satu
 * folder tertentu (bukan seluruh Drive), sesuai scope "drive.file".
 */
export async function fetchStorageStatus() {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("VITE_GOOGLE_SCRIPT_URL belum dikonfigurasi di file .env");
  }
  const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=status`);
  if (!res.ok) throw new Error(`Gagal mengambil status (status ${res.status})`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Gagal mengambil status penyimpanan");
  return json;
}

/**
 * Mengambil seluruh data Laporan Kinerja dari Google Sheets
 * (lewat Google Apps Script Web App yang berperan sebagai API).
 */
export async function fetchLaporanKinerja() {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("VITE_GOOGLE_SCRIPT_URL belum dikonfigurasi di file .env");
  }
  const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=list`);
  if (!res.ok) throw new Error(`Gagal mengambil data (status ${res.status})`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Gagal mengambil data dari server");
  return json.data;
}

/**
 * Mengirim satu laporan baru (+ file evidence opsional) ke Google Apps
 * Script, yang akan meng-upload file ke Drive dan menambah baris di Sheets.
 *
 * PENTING: Content-Type sengaja "text/plain" (bukan "application/json") agar
 * browser TIDAK mengirim preflight OPTIONS request — Google Apps Script Web
 * App tidak menangani preflight, sehingga request akan gagal CORS kalau
 * memakai application/json langsung.
 */
export async function submitLaporanKinerja(payload) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("VITE_GOOGLE_SCRIPT_URL belum dikonfigurasi di file .env");
  }
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Gagal mengirim data (status ${res.status})`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Gagal menyimpan laporan");
  return json.data;
}
