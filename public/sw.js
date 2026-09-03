/**
 * Service Worker SI-Tekhum — sengaja dibuat SEDERHANA:
 *  1. Memenuhi syarat teknis agar browser menawarkan "Install"/"Add to Home
 *     Screen" (butuh manifest + service worker dengan fetch handler).
 *  2. Menyimpan app shell (halaman inti) di cache supaya tetap bisa dibuka
 *     walau koneksi terputus sesaat.
 *
 * SENGAJA TIDAK meng-cache/meng-intercept request lintas origin (mis. ke
 * Google Drive/Sheets/Looker Studio yang dipakai di iframe JDIH, Silakon,
 * Simoku, SIKAP, dst). Request-request itu dibiarkan lewat langsung supaya
 * sistem eksternal tersebut tetap berjalan normal tanpa risiko cache/CORS.
 *
 * Catatan versi: setiap kali isi file ini diubah & di-deploy ulang, browser
 * otomatis mendeteksi perubahan dan menjalankan siklus update (lihat event
 * "install"/"activate" di bawah). Kalau ingin memaksa semua cache lama
 * dibuang, cukup naikkan angka di CACHE_NAME (mis. jadi "v2").
 */

const CACHE_NAME = "si-tekhum-cache-v1";

// Hanya aset dengan nama file STABIL (tidak hashed) yang aman di-precache
// langsung di sini. Aset hasil build (JS/CSS dengan hash) akan otomatis
// masuk cache saat pertama kali diakses lewat strategi "fetch" di bawah.
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {
        // Jangan sampai kegagalan precache satu aset membuat instalasi SW gagal total.
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

// Mekanisme eksplisit tambahan: kalau suatu saat ingin men-trigger update
// secara manual dari sisi client (mis. tombol "Perbarui sekarang" di UI),
// cukup kirim: navigator.serviceWorker.controller.postMessage({type: "SKIP_WAITING"})
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Hanya tangani GET dari origin sendiri. Request lintas origin (Google
  // Drive/Sheets/Looker Studio, dll) dibiarkan lewat apa adanya.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Navigasi (pindah rute SPA / buka ulang halaman): coba jaringan dulu
  // supaya konten selalu terbaru, fallback ke app shell dari cache kalau
  // sedang offline.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("./index.html")));
    return;
  }

  // Aset lain (JS/CSS/gambar hasil build): tampilkan dari cache dulu kalau
  // ada (supaya cepat), sambil diam-diam memperbarui cache dari jaringan
  // untuk kunjungan berikutnya ("stale-while-revalidate").
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
