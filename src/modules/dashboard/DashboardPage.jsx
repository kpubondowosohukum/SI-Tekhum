import { useNavigate } from "react-router-dom";
import { findItemById, goToItem } from "../../config/navigation.js";
import HeroCarousel from "../../components/ui/HeroCarousel.jsx";
import QuickAccessCard from "../../components/ui/QuickAccessCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

/**
 * Beranda SI-Tekhum — hero banner carousel + grid "Eksplor Layanan".
 *
 * PENTING: halaman ini TIDAK menyimpan URL/label sendiri. Semua tujuan klik
 * (slide carousel maupun kartu quick-access) diambil lewat `findItemById()`
 * dari src/config/navigation.js — satu-satunya sumber data menu. Kalau
 * suatu saat sebuah link diperbarui di navigation.js, halaman ini otomatis
 * ikut ter-update tanpa perlu disentuh.
 */
export default function DashboardPage() {
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: "hukum-silakon",
      eyebrow: "Layanan Hukum",
      title: "SILAKON",
      description: "Layanan konsultasi hukum kepemiluan — akses data dan status konsultasi secara langsung.",
      ctaLabel: "Akses Sekarang",
      gradient: "bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-900",
    },
    {
      id: "hukum-ba-sikap",
      eyebrow: "Dashboard Pleno",
      title: "SIKAP",
      description: "Dashboard visualisasi Sistem Informasi Kegiatan dan Administrasi Pleno.",
      ctaLabel: "Lihat Dashboard",
      gradient: "bg-gradient-to-br from-emerald-800 via-teal-700 to-ink-950",
    },
    {
      id: "hukum-jdih",
      eyebrow: "Jaringan Dokumentasi & Informasi Hukum",
      title: "JDIH KPU Bondowoso",
      description: "Portal resmi produk hukum kepemiluan KPU Kabupaten Bondowoso.",
      ctaLabel: "Kunjungi Portal",
      gradient: "bg-gradient-to-br from-ink-950 via-ink-800 to-ink-600",
    },
    {
      id: "kinerja-laporan",
      eyebrow: "Kinerja",
      title: "Laporan Kinerja",
      description: "Rekapitulasi laporan kinerja harian Subbagian Teknis dan Hukum.",
      ctaLabel: "Buka Laporan",
      gradient: "bg-gradient-to-br from-amber-700 via-orange-700 to-red-800",
    },
  ]
    .map((slide) => {
      const item = findItemById(slide.id);
      if (!item) return null; // aman kalau suatu saat id-nya berubah/dihapus
      return { ...slide, Icon: item.icon, onClick: () => goToItem(item, navigate) };
    })
    .filter(Boolean);

  const quickAccessIds = [
    { id: "kinerja-laporan", accent: "bg-amber-500/15 text-amber-700" },
    { id: "hukum-silakon", accent: "bg-blue-600/10 text-blue-700" },
    { id: "hukum-simoku", accent: "bg-purple-600/10 text-purple-700" },
    { id: "hukum-jdih", accent: "bg-ink-700/10 text-ink-700" },
    { id: "hukum-medsos-jdih", accent: "bg-pink-600/10 text-pink-700" },
    { id: "hukum-ba-sikap", accent: "bg-emerald-600/10 text-emerald-700" },
  ]
    .map(({ id, accent }) => {
      const item = findItemById(id);
      if (!item) return null;
      return { item, accent };
    })
    .filter(Boolean);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <div className="mt-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">Eksplor</p>
          <h2 className="text-xl font-bold text-ink-900">Eksplor Layanan SI-Tekhum</h2>
          <p className="mt-1 text-sm text-slate-500">Akses cepat ke layanan yang paling sering digunakan.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickAccessIds.map(({ item, accent }) => (
            <QuickAccessCard
              key={item.id}
              label={item.label}
              Icon={item.icon}
              accent={accent}
              onClick={() => goToItem(item, navigate)}
            />
          ))}
        </div>
      </div>

      <Card
        className="mt-10"
        title="Cara menambah sub-menu baru"
        description="Struktur navigasi dirancang agar tumbuh tanpa merombak kode yang sudah ada."
      >
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
          <li>
            Buka{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              src/config/navigation.js
            </code>
            , tambahkan satu object baru ke <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">submenu</code>{" "}
            pada grup yang dituju.
          </li>
          <li>
            Pilih bentuknya: halaman internal (<Badge tone="gold">type</Badge>/
            <Badge tone="gold">element</Badge>), link langsung (
            <Badge tone="gold">external: true</Badge>), atau submenu bertingkat (
            <Badge tone="gold">children</Badge>).
          </li>
          <li>Commit &amp; push ke GitHub — deploy otomatis akan memperbarui website.</li>
        </ol>
      </Card>
    </>
  );
}
