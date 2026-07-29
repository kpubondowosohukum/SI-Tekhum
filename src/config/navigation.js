import { lazy } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  ClipboardList,
  FileText,
  Vote,
  Building2,
  FileStack,
  FileCheck2,
  ScrollText,
  Scale,
  ShieldCheck,
  Share2,
  Link2,
  Database,
  Users,
  MonitorSmartphone,
} from "lucide-react";

/**
 * ============================================================================
 *  REGISTRY NAVIGASI SI-TEKHUM
 * ============================================================================
 *  File inilah SATU-SATUNYA sumber kebenaran untuk struktur menu + routing.
 *  Sidebar, breadcrumb, dan router semuanya digenerate otomatis dari sini.
 *
 *  STRUKTUR DATA
 *  - `topLevel`  : link tanpa submenu, tampil di atas grup collapsible (Beranda).
 *  - `navigationGroups` : 4 menu utama, masing-masing punya array `submenu`.
 *
 *  SETIAP ITEM SUBMENU MEMILIKI:
 *    id          -> string unik (key React + breadcrumb)
 *    label       -> teks yang tampil di sidebar
 *    path        -> path unik untuk routing (harus diawali "/")
 *    icon        -> komponen ikon lucide-react
 *    type        -> salah satu dari: "dokumen" | "data" | "sistem" | "placeholder"
 *                   (menentukan TEMPLATE UI yang dipakai — lihat modules/shared/)
 *    description -> teks singkat, tampil di header halaman
 *    meta        -> data spesifik per-tipe (lihat contoh di masing-masing entri)
 *    element     -> (opsional) override komponen kustom (lazy-loaded), dipakai
 *                   kalau halaman butuh logika khusus (bukan sekadar template)
 *
 *  CARA MENAMBAH SUB-MENU BARU (tanpa mengubah file lain):
 *   1. Tentukan tipe template yang paling sesuai: "dokumen", "data", "sistem",
 *      atau "placeholder" (default, kalau belum jelas kontennya).
 *   2. Tambahkan satu object baru ke array `submenu` pada grup terkait.
 *   3. Kalau butuh tampilan/logika khusus (mis. kalkulator, chart interaktif),
 *      buat file komponen di src/modules/<grup>/NamaFitur.jsx lalu isi
 *      `element: lazy(() => import("../modules/<grup>/NamaFitur.jsx"))`.
 *      Field `type` boleh diisi bebas kalau `element` sudah ada.
 * ============================================================================
 */

// --- Halaman inti ---
const DashboardPage = lazy(() => import("../modules/dashboard/DashboardPage.jsx"));

export const topLevel = [
  {
    id: "beranda",
    label: "Beranda",
    path: "/",
    icon: LayoutDashboard,
    element: DashboardPage,
  },
];

export const navigationGroups = [
  {
    id: "kinerja",
    label: "Kinerja",
    icon: TrendingUp,
    submenu: [
      {
        id: "kinerja-rencana",
        label: "Rencana Kinerja",
        path: "/kinerja/rencana-kinerja",
        icon: ClipboardList,
        type: "dokumen",
        description: "Dokumen perencanaan kinerja tahunan Subbagian Tekhum.",
        meta: {
          documents: [
            { nama: "Rencana Kinerja Tahunan 2026", kategori: "RKT", tahun: 2026 },
            { nama: "Perjanjian Kinerja Subbagian Tekhum 2026", kategori: "PK", tahun: 2026 },
          ],
        },
      },
      {
        id: "kinerja-laporan",
        label: "Laporan Kinerja",
        path: "/kinerja/laporan-kinerja",
        icon: FileText,
        type: "dokumen",
        description: "Laporan capaian dan evaluasi kinerja periode berjalan.",
        meta: {
          documents: [
            { nama: "Laporan Kinerja Triwulan I 2026", kategori: "LKj", tahun: 2026 },
          ],
        },
      },
    ],
  },
  {
    id: "teknis",
    label: "Teknis",
    icon: Vote,
    submenu: [
      {
        id: "teknis-hasil-pemilu-2024",
        label: "Hasil Pemilu 2024",
        path: "/teknis/hasil-pemilu-2024",
        icon: Vote,
        type: "data",
        description: "Rekapitulasi hasil Pemilu Anggota DPR, DPD, dan DPRD 2024.",
        meta: {
          stats: [
            { label: "TPS Terekap", value: "—" },
            { label: "Partisipasi Pemilih", value: "—" },
            { label: "Status Rekap", value: "Belum terhubung" },
          ],
        },
      },
      {
        id: "teknis-hasil-pemilihan-2024",
        label: "Hasil Pemilihan 2024",
        path: "/teknis/hasil-pemilihan-2024",
        icon: Building2,
        type: "data",
        description: "Rekapitulasi hasil Pemilihan Bupati/Wakil Bupati 2024.",
        meta: {
          stats: [
            { label: "TPS Terekap", value: "—" },
            { label: "Partisipasi Pemilih", value: "—" },
            { label: "Status Rekap", value: "Belum terhubung" },
          ],
        },
      },
      {
        id: "teknis-pemutakhiran-parpol",
        label: "Laporan Pemutakhiran Data Partai Politik Berkelanjutan",
        path: "/teknis/pemutakhiran-parpol",
        icon: FileStack,
        type: "dokumen",
        description: "Laporan pemutakhiran data keanggotaan partai politik secara berkelanjutan.",
        meta: {
          documents: [
            { nama: "Laporan Pemutakhiran Parpol - Semester I 2026", kategori: "Laporan", tahun: 2026 },
          ],
        },
      },
    ],
  },
  {
    id: "hukum",
    label: "Hukum",
    icon: Scale,
    submenu: [
      {
        id: "hukum-dokumen-ba",
        label: "Dokumen BA",
        path: "/hukum/dokumen-ba",
        icon: FileCheck2,
        type: "dokumen",
        description: "Arsip Berita Acara rapat, pleno, dan kegiatan kehukuman.",
        meta: { documents: [] },
      },
      {
        id: "hukum-dokumen-sk",
        label: "Dokumen SK",
        path: "/hukum/dokumen-sk",
        icon: FileText,
        type: "dokumen",
        description: "Arsip Surat Keputusan KPU Kabupaten.",
        meta: { documents: [] },
      },
      {
        id: "hukum-laporan-jdih",
        label: "Laporan JDIH",
        path: "/hukum/laporan-jdih",
        icon: ScrollText,
        type: "dokumen",
        description: "Laporan pengelolaan Jaringan Dokumentasi dan Informasi Hukum.",
        meta: { documents: [] },
      },
      {
        id: "hukum-laporan-spip",
        label: "Laporan SPIP",
        path: "/hukum/laporan-spip",
        icon: ClipboardList,
        type: "dokumen",
        description: "Laporan Sistem Pengendalian Intern Pemerintah.",
        meta: { documents: [] },
      },
      {
        id: "hukum-jdih",
        label: "JDIH",
        path: "/hukum/jdih",
        icon: Scale,
        type: "sistem",
        description: "Portal Jaringan Dokumentasi dan Informasi Hukum KPU Kabupaten.",
        meta: { url: "" },
      },
      {
        id: "hukum-spip",
        label: "SPIP (Sip Sekali)",
        path: "/hukum/spip",
        icon: ShieldCheck,
        type: "sistem",
        description: "Aplikasi pemantauan Sistem Pengendalian Intern Pemerintah.",
        meta: { url: "" },
      },
      {
        id: "hukum-medsos-jdih",
        label: "Medsos JDIH",
        path: "/hukum/medsos-jdih",
        icon: Share2,
        type: "sistem",
        description: "Kanal media sosial publikasi produk hukum JDIH.",
        meta: { url: "" },
      },
      {
        id: "hukum-silakon",
        label: "Silakon",
        path: "/hukum/silakon",
        icon: Link2,
        type: "sistem",
        description: "Sistem layanan konsultasi hukum kepemiluan.",
        meta: { url: "" },
      },
      {
        id: "hukum-simoku",
        label: "Simoku",
        path: "/hukum/simoku",
        icon: Database,
        type: "sistem",
        description: "Sistem informasi monitoring kepatuhan/kearsipan hukum.",
        meta: { url: "" },
      },
    ],
  },
  {
    id: "pleno",
    label: "Pleno",
    icon: Users,
    submenu: [
      {
        id: "pleno-sikap",
        label: "SIKAP",
        path: "/pleno/sikap",
        icon: MonitorSmartphone,
        type: "sistem",
        description: "Sistem Informasi Kegiatan dan Administrasi Pleno.",
        meta: { url: "" },
      },
    ],
  },
];

// Gabungan semua item yang punya path (topLevel + seluruh submenu) — dipakai
// oleh AppRouter untuk generate <Route> dan oleh Navbar untuk breadcrumb.
export const flatNavigation = [
  ...topLevel.map((item) => ({ ...item, group: "Beranda" })),
  ...navigationGroups.flatMap((group) =>
    group.submenu.map((item) => ({ ...item, group: group.label }))
  ),
];

// Cari metadata halaman aktif berdasarkan path saat ini (untuk breadcrumb/judul).
export function findActiveNavItem(pathname) {
  return (
    flatNavigation.find((item) => item.path === pathname) ||
    flatNavigation
      .filter((item) => item.path !== "/" && pathname.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0]
  );
}

// Cari grup mana yang sedang aktif (dipakai Sidebar untuk auto-expand accordion).
export function findActiveGroupId(pathname) {
  const group = navigationGroups.find((g) =>
    g.submenu.some((item) => item.path === pathname || pathname.startsWith(item.path))
  );
  return group?.id ?? null;
}
