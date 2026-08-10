import { useNavigate } from "react-router-dom";
import { navigationGroups, topLevel, findItemById, goToItem } from "../../config/navigation.js";
import HeroCarousel from "../../components/ui/HeroCarousel.jsx";
import MenuOverviewCard from "../../components/ui/MenuOverviewCard.jsx";
import CatatanRapatSection from "./CatatanRapatSection.jsx";

/**
 * Beranda SI-Tekhum — hero banner carousel + 4 kartu "Menu Utama" + catatan
 * rapat.
 *
 * PENTING: halaman ini TIDAK menyimpan URL/label sendiri. Data hero carousel
 * diambil lewat `findItemById()` dari src/config/navigation.js — satu-
 * satunya sumber data menu. Kartu "Eksplor Layanan Tekhum" murni kartu
 * informasi (bukan tautan), jadi hanya mengambil label/deskripsi/ikon.
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

  // 4 kartu "Menu Utama" (murni informasi, tidak bisa diklik): 3 grup
  // (Kinerja, Teknis, Hukum) + 1 menu mandiri (Laporan).
  const menuUtamaCards = [
    { group: navigationGroups.find((g) => g.id === "kinerja"), accent: "bg-amber-500/15 text-amber-700" },
    { group: navigationGroups.find((g) => g.id === "teknis"), accent: "bg-blue-600/10 text-blue-700" },
    { group: navigationGroups.find((g) => g.id === "hukum"), accent: "bg-ink-700/10 text-ink-700" },
    { item: topLevel.find((i) => i.id === "laporan"), accent: "bg-purple-600/10 text-purple-700" },
  ]
    .map(({ group, item, accent }) => {
      if (group) {
        return {
          key: group.id,
          label: group.label,
          description: group.description,
          Icon: group.icon,
          accent,
        };
      }
      if (item) {
        return {
          key: item.id,
          label: item.label,
          description: item.description,
          Icon: item.icon,
          accent,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <div className="mt-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">Eksplor</p>
          <h2 className="text-xl font-bold text-ink-900">Eksplor Layanan Tekhum</h2>
          <p className="mt-1 text-sm text-slate-500">Empat menu utama SI-Tekhum, akses langsung dari sini.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menuUtamaCards.map((card) => (
            <MenuOverviewCard
              key={card.key}
              label={card.label}
              description={card.description}
              Icon={card.Icon}
              accent={card.accent}
            />
          ))}
        </div>
      </div>

      <CatatanRapatSection />
    </>
  );
}
