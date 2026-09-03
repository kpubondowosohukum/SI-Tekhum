import { useParams, Navigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { findItemById } from "../../config/navigation.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

/**
 * Rute dinamis "/buka/:id" — dipakai KHUSUS saat aplikasi berjalan sebagai
 * PWA ter-install (standalone). Tujuannya: link eksternal (JDIH, Silakon,
 * Simoku, SIKAP, Laporan, dll) tetap dibuka DI DALAM shell aplikasi
 * (bukan "terlempar" ke Chrome/Safari), sehingga mode standalone tidak
 * rusak.
 *
 * Datanya diambil lewat `findItemById(id)` dari navigation.js — halaman ini
 * TIDAK menyimpan URL/label sendiri, jadi tetap satu sumber kebenaran.
 *
 * PENTING — batasan yang jujur perlu diketahui: sebagian situs (terutama
 * JDIH karena domain resmi pemerintah, dan kadang dashboard Looker Studio
 * tertentu) mengunci header `X-Frame-Options`/`Content-Security-Policy`
 * sehingga MENOLAK ditampilkan lewat iframe di mana pun — ini pembatasan
 * dari sisi server tujuan, tidak bisa "diakali" lewat kode di sisi kita.
 * Karena itu tombol "Buka di Browser" TETAP disediakan sebagai jalan
 * keluar yang jujur: sengaja membuka tab/browser sungguhan di luar shell
 * PWA, khusus untuk situs yang menolak di-embed.
 */
export default function EmbeddedViewerPage() {
  const { id } = useParams();
  const item = findItemById(id);

  // id tidak dikenali (mis. link lama/salah ketik) -> kembali ke Beranda
  // daripada menampilkan halaman kosong.
  if (!item || !item.url) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Dibuka dari SI-Tekhum"
        title={item.label}
        description="Halaman ini ditampilkan di dalam aplikasi supaya Anda tetap berada di SI-Tekhum. Kalau konten di bawah tidak muncul, situs tujuan mungkin tidak mengizinkan tampilan tertanam — gunakan tombol di kanan."
        actions={
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-600"
          >
            <ExternalLink size={16} />
            Buka di Browser
          </a>
        }
      />

      <Card>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <iframe src={item.url} title={item.label} className="w-full" style={{ height: "75vh" }} loading="lazy" />
        </div>
      </Card>
    </>
  );
}
