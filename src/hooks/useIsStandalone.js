import { useEffect, useState } from "react";

/**
 * Deteksi apakah SI-Tekhum sedang berjalan sebagai PWA ter-install
 * (standalone) — baik di Android/desktop (media query `display-mode`)
 * maupun iOS Safari (`navigator.standalone`, properti non-standar khusus
 * Apple yang tidak dikenali `matchMedia`).
 *
 * Dipakai untuk memutuskan perilaku klik menu eksternal (lihat TopNav.jsx):
 * - Standalone (terinstall)  -> tetap di dalam shell aplikasi (embedded viewer)
 * - Browser tab biasa        -> buka tab baru seperti perilaku website normal
 */
export function useIsStandalone() {
  const [isStandalone, setIsStandalone] = useState(() => detect());

  useEffect(() => {
    const mql = window.matchMedia("(display-mode: standalone)");
    const handler = () => setIsStandalone(detect());
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return isStandalone;
}

function detect() {
  if (typeof window === "undefined") return false;
  const viaMediaQuery = window.matchMedia?.("(display-mode: standalone)").matches;
  const viaIosSafari = window.navigator?.standalone === true; // iOS Safari only
  return Boolean(viaMediaQuery || viaIosSafari);
}
