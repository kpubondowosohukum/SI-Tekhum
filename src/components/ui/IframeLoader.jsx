import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen.jsx";

// Overlay loading TIDAK BOLEH hilang lebih cepat dari ini, supaya pengguna
// benar-benar sempat melihat animasi + pesannya (bukan cuma kedip sekilas).
const MIN_LOADING_MS = 2200;

// Jaring pengaman: kalau event `onLoad` iframe TIDAK PERNAH terpicu (mis.
// karena browser/CSP tertentu memblokirnya secara diam-diam), overlay tetap
// dipaksa hilang setelah durasi ini supaya pengguna tidak terjebak melihat
// spinner selamanya.
const MAX_LOADING_MS = 9000;

/**
 * Pembungkus <iframe> dengan overlay loading yang STABIL. Dua masalah umum
 * pada implementasi iframe+loading naif:
 *  1. Event `onLoad` kadang terpicu terlalu cepat/tidak konsisten di
 *     berbagai browser, membuat spinner "berkedip" atau tidak sempat terlihat.
 *  2. Kalau `onLoad` tidak pernah terpicu sama sekali, spinner bisa
 *     tersangkut selamanya.
 *
 * Solusi di sini: overlay hanya disembunyikan setelah KEDUA syarat
 * terpenuhi — iframe sudah `onLoad` DAN durasi minimum sudah lewat — dengan
 * batas waktu maksimum sebagai jaring pengaman.
 *
 * `key={src}` pada elemen <iframe> memastikan iframe benar-benar remount
 * (bukan sekadar ganti atribut src) setiap kali berpindah sub-menu, supaya
 * status loading selalu mulai dari awal dengan bersih.
 */
export default function IframeLoader({ src, title, height = "70vh" }) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const iframeReady = useRef(false);
  const minTimeReady = useRef(false);

  useEffect(() => {
    setOverlayVisible(true);
    iframeReady.current = false;
    minTimeReady.current = false;

    const minTimer = setTimeout(() => {
      minTimeReady.current = true;
      if (iframeReady.current) setOverlayVisible(false);
    }, MIN_LOADING_MS);

    const maxTimer = setTimeout(() => {
      setOverlayVisible(false);
    }, MAX_LOADING_MS);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [src]);

  function handleLoad() {
    iframeReady.current = true;
    if (minTimeReady.current) setOverlayVisible(false);
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200">
      {overlayVisible && <LoadingScreen overlay />}
      <iframe
        key={src}
        src={src}
        title={title}
        className="w-full"
        style={{ height }}
        loading="lazy"
        onLoad={handleLoad}
      />
    </div>
  );
}
