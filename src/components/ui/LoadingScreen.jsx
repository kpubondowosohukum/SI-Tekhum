/**
 * Loading screen kustom — dipakai di dua tempat:
 *  1. Sebagai fallback <Suspense> saat berpindah halaman/sub-menu
 *     (lihat src/router/AppRouter.jsx).
 *  2. Sebagai overlay saat iframe (Google Apps Script/Looker Studio/Sheets)
 *     masih memuat data (lihat src/modules/shared/ExternalSystemPage.jsx).
 *
 * Prop `overlay`: kalau true, komponen mengisi penuh parent-nya secara
 * absolute (dipakai untuk menutupi iframe selagi loading). Kalau false
 * (default), tampil sebagai blok biasa di tengah halaman.
 */
export default function LoadingScreen({ overlay = false, message }) {
  const pesan = message || "NUNGGUIN YAAAAA? Sabar, orang sabar disayang ALLAH";

  return (
    <div
      className={
        overlay
          ? "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm"
          : "flex flex-col items-center justify-center gap-4 py-24"
      }
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-gold-500 border-r-gold-500" />
      </div>
      <p className="max-w-xs px-4 text-center text-sm font-medium text-slate-500">{pesan}</p>
    </div>
  );
}
