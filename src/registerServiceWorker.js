/**
 * Registrasi Service Worker + logika AUTO-UPDATE.
 *
 * Sengaja pakai path RELATIF ("sw.js", tanpa "/" di depan) — bukan
 * "/sw.js" — dengan alasan yang sama dengan `base: "./"` di vite.config.js:
 * project ini bisa di-deploy di root domain (Vercel/Netlify) MAUPUN di
 * subfolder (GitHub Pages project page, mis. /nama-repo/). Path relatif
 * otomatis resolve ke lokasi yang benar di kedua kasus tanpa perlu
 * konfigurasi tambahan.
 *
 * ALUR AUTO-UPDATE (supaya shortcut di HP pengguna selalu pakai versi
 * terbaru tanpa perlu install ulang):
 *  1. Browser cek file sw.js tiap kali app dibuka. Kalau ISI file berubah
 *     (Anda deploy versi baru), browser otomatis menginstal service worker
 *     baru di belakang layar.
 *  2. sw.js sudah dikonfigurasi `self.skipWaiting()` — service worker baru
 *     langsung aktif tanpa menunggu semua tab lama ditutup.
 *  3. Begitu service worker baru "mengambil alih" (event `controllerchange`),
 *     kode di bawah ini me-reload halaman SATU KALI secara otomatis —
 *     sehingga pengguna otomatis melihat versi terbaru tanpa tindakan apa pun.
 *
 * `reloaded` sebagai flag mencegah reload berulang tanpa henti kalau event
 * `controllerchange` sempat terpicu lebih dari sekali.
 */
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Registrasi Service Worker gagal:", err);
    });
  });
}
