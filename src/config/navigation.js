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
  MonitorSmartphone,
  MapPinned,
  FileSpreadsheet,
} from "lucide-react";

/**
 * ============================================================================
 *  REGISTRY NAVIGASI SI-TEKHUM
 * ============================================================================
 *  File inilah SATU-SATUNYA sumber kebenaran untuk struktur menu + routing.
 *  Sidebar, breadcrumb, dan router semuanya digenerate otomatis dari sini.
 *
 *  STRUKTUR DATA
 *  - `topLevel`         : link tanpa submenu, tampil di atas grup (Beranda).
 *  - `navigationGroups` : menu utama, masing-masing punya array `submenu`.
 *
 *  SETIAP ITEM SUBMENU BISA BERUPA SALAH SATU DARI 3 BENTUK:
 *
 *  1) HALAMAN INTERNAL (biasa) — dirender di dalam SI-Tekhum:
 *     { id, label, path, icon, type: "dokumen"|"data"|"sistem"|"placeholder"|"developing",
 *       description, meta }
 *     atau pakai `element` (komponen kustom) alih-alih `type`.
 *
 *  2) LINK LANGSUNG (external) — WAJIB langsung membuka URL tujuan saat
 *     diklik, TANPA halaman perantara/tombol tambahan:
 *     { id, label, icon, external: true, url: "https://..." }
 *     Sidebar akan merender ini sebagai tautan biasa (bukan rute internal).
 *
 *  3) SUBMENU BERTINGKAT (nested) — item yang punya anak sendiri (masing-
 *     masing anak boleh berbentuk (1) atau (2) di atas):
 *     { id, label, icon, children: [ ...item (1) atau (2)... ] }
 *
 *  CARA MENAMBAH SUB-MENU BARU (tanpa mengubah file lain):
 *   - Halaman internal biasa -> tambah object bentuk (1) ke `submenu`.
 *   - Link langsung ke sistem luar -> tambah object bentuk (2) ke `submenu`.
 *   - Submenu dengan anak -> tambah object bentuk (3) ke `submenu`.
 * ============================================================================
 */

// --- Halaman inti ---
const DashboardPage = lazy(() => import("../modules/dashboard/DashboardPage.jsx"));

// --- Komponen kustom (bukan template shared) ---
const MedsosJdih = lazy(() => import("../modules/hukum/MedsosJdih.jsx"));

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
        // Link langsung ke Google Apps Script Web App (bukan lagi halaman
        // tabel internal). Lihat catatan di README bagian "Laporan Kinerja"
        // soal konsekuensi perubahan ini.
        id: "kinerja-laporan",
        label: "Laporan Kinerja",
        icon: FileText,
        external: true,
        url: "https://script.google.com/macros/s/AKfycbymKKzYGt7-19NnZMUWvzhTVwUFxgENRCGURasNjXyMjJ6Hep7EqIREeQMD3bpXUbDq2A/exec",
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
      {
        // Belum ada link/kontennya — ditandai "developing" dengan pesan
        // santai sesuai permintaan, gampang diganti nanti begitu linknya ada.
        id: "teknis-sidapil",
        label: "SIDAPIL",
        path: "/teknis/sidapil",
        icon: MapPinned,
        type: "developing",
        description: "Sistem Informasi Daerah Pemilihan (SIDAPIL).",
        meta: {
          message: "Bentar ya aku cari dulu linknya wkwk",
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
        // Submenu bertingkat: "Berita Acara (BA)" punya 2 anak, keduanya
        // link langsung ke sistem luar.
        id: "hukum-ba",
        label: "Berita Acara (BA)",
        icon: FileCheck2,
        children: [
          {
            id: "hukum-ba-rekap",
            label: "Rekapitulasi BA",
            icon: ScrollText,
            external: true,
            url: "https://docs.google.com/spreadsheets/d/1bm5oIUvrjGHjWszF6MsN9gS8XQlSBWKGkxdkp_kbQko/edit?usp=drive_link",
          },
          {
            id: "hukum-ba-sikap",
            label: "SIKAP",
            icon: MonitorSmartphone,
            external: true,
            url: "https://datastudio.google.com/u/0/reporting/6c3431bb-54a5-49e7-b3fa-3cb0e1c5fb11/page/VS3qF",
          },
        ],
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
        icon: Scale,
        external: true,
        url: "https://jdih.kpu.go.id/jatim/bondowoso",
      },
      {
        id: "hukum-spip",
        label: "SPIP (Sip Sekali)",
        path: "/hukum/spip",
        icon: ShieldCheck,
        type: "developing",
        description: "Aplikasi pemantauan Sistem Pengendalian Intern Pemerintah.",
        meta: {
          message:
            "Fitur SPIP (Sip Sekali) masih OTW (On The Way). Silakan hubungi Hima untuk informasi lebih lanjut.",
        },
      },
      {
        id: "hukum-medsos-jdih",
        label: "Medsos JDIH",
        path: "/hukum/medsos-jdih",
        icon: Share2,
        description: "Kanal media sosial publikasi produk hukum JDIH.",
        element: MedsosJdih,
      },
      {
        id: "hukum-silakon",
        label: "Silakon",
        icon: Link2,
        external: true,
        url: "https://docs.google.com/spreadsheets/d/10QPJkrj2vbXl6XQReO-bE7_g9hB17bIYMq-Da8D0h5k/edit?usp=sharing",
      },
      {
        id: "hukum-simoku",
        label: "Simoku",
        icon: Database,
        external: true,
        url: "https://datastudio.google.com/u/0/reporting/c3ddcb09-0287-405e-97f0-c3486c2eca7e/page/iCBrF",
      },
    ],
  },
  {
    id: "laporan",
    label: "Laporan",
    icon: FileSpreadsheet,
    submenu: [
      {
        id: "laporan-2026",
        label: "Laporan 2026",
        icon: FileText,
        external: true,
        url: "https://script.google.com/macros/s/AKfycbypReHXbOBl5tpJWO1eva3ijhADUdCIAyK9Zg4lG5__3i1UIoOla8uMWrK7Tf9e1MXM/exec",
      },
    ],
  },
];

// --- Helper: apakah sebuah item adalah link langsung (bukan rute internal) ---
export function isExternalLink(item) {
  return Boolean(item?.external && item?.url);
}

// --- Helper: apakah sebuah item punya anak (submenu bertingkat) ---
export function hasChildren(item) {
  return Array.isArray(item?.children) && item.children.length > 0;
}

// Meratakan seluruh item yang PUNYA RUTE INTERNAL (path + bukan external),
// termasuk yang bersarang di dalam `children` — dipakai AppRouter untuk
// generate <Route> dan Navbar untuk breadcrumb. Item external TIDAK
// dimasukkan karena memang tidak punya halaman/rute di dalam SI-Tekhum.
function flattenRoutable(items, groupLabel) {
  return items.flatMap((item) => {
    if (hasChildren(item)) {
      return flattenRoutable(item.children, groupLabel);
    }
    if (isExternalLink(item)) {
      return [];
    }
    return [{ ...item, group: groupLabel }];
  });
}

export const flatNavigation = [
  ...topLevel.map((item) => ({ ...item, group: "Beranda" })),
  ...navigationGroups.flatMap((group) => flattenRoutable(group.submenu, group.label)),
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
// Menelusuri juga ke dalam `children` untuk submenu bertingkat.
function containsActivePath(items, pathname) {
  return items.some((item) => {
    if (hasChildren(item)) return containsActivePath(item.children, pathname);
    if (isExternalLink(item)) return false;
    return item.path === pathname || pathname.startsWith(item.path);
  });
}

export function findActiveGroupId(pathname) {
  const group = navigationGroups.find((g) => containsActivePath(g.submenu, pathname));
  return group?.id ?? null;
}

// Cari satu item menu (di mana pun posisinya — top level, submenu, atau
// bersarang di dalam children) berdasarkan id-nya. Dipakai oleh komponen
// presentasi (mis. hero carousel, grid quick-access di Beranda) supaya
// mereka TIDAK PERNAH menyalin ulang URL/label — selalu ambil langsung dari
// satu sumber data ini.
function searchById(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (hasChildren(item)) {
      const found = searchById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function findItemById(id) {
  const top = topLevel.find((item) => item.id === id);
  if (top) return top;
  for (const group of navigationGroups) {
    const found = searchById(group.submenu, id);
    if (found) return found;
  }
  return null;
}

// Navigasi ke sebuah item menu: kalau external, buka tab baru; kalau
// halaman internal, pindah rute lewat react-router `navigate`.
export function goToItem(item, navigate) {
  if (!item) return;
  if (isExternalLink(item)) {
    window.open(item.url, "_blank", "noopener,noreferrer");
  } else if (item.path) {
    navigate(item.path);
  }
}
