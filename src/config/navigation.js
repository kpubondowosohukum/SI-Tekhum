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
  {
    // Menu mandiri tanpa dropdown — klik langsung buka Apps Script,
    // sesuai permintaan "Laporan" jadi menu tunggal (bukan grup submenu).
    id: "laporan",
    label: "Laporan",
    icon: FileSpreadsheet,
    description: "Akses cepat ke laporan konsolidasi tahun berjalan.",
    external: true,
    url: "https://script.google.com/macros/s/AKfycbypReHXbOBl5tpJWO1eva3ijhADUdCIAyK9Zg4lG5__3i1UIoOla8uMWrK7Tf9e1MXM/exec",
  },
];

export const navigationGroups = [
  {
    id: "teknis",
    label: "Teknis",
    icon: Vote,
    description: "Data hasil pemilu, pemilihan, dan alat teknis kepemiluan.",
    submenu: [
      {
        id: "teknis-hasil-pemilu-2024",
        label: "Hasil Pemilu 2024",
        icon: Vote,
        description: "Rekapitulasi hasil Pemilu Anggota PPWP, DPR, DPD, dan DPRD 2024.",
        children: [
          {
            id: "ppwp-2024",
            label: "PPWP Bondowoso 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbxcwJtDV2fE8fmihDJpHCJll0LY6gtVbLix0Hw7bwo1CbovrHc_mhliXvKfWwjolg5V2g/exec",
          },
          {
            id: "dpr-2024",
            label: "DPR Bondowoso 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbxNe9aVqIEgKGqtfFgY2PmuVh-s8mBlCs1jcOI_H4pZv7qtHkZNXOpRURxcDk5IIa1oZw/exec",
          },
          {
            id: "dpd-2024",
            label: "DPD Bondowoso 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbwZ_--NxFg7Zrh7trUSoJurCubfwVj0g3EKUxr5NRek35ZAOBw75345XBJYGFyqJMFs-Q/exec",
          },
          {
            id: "dprd-prov-2024",
            label: "DPRD Provinsi 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbwsKUxWbcmYcBp6beSBaop_eklTrNyn5WHe7OqCSpw0eA7gtSbpmj52GJZp7IAh4-PhNw/exec",
          },
          {
            id: "dprd-kab-2024",
            label: "DPRD Kabupaten/Kota 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycby4EXTZJkl_REiorBH5odkFvp5-qXAs8-sJc3elfSrVGsp-_lNtGV8yv5S3_QB5tCf9SA/exec",
          },
        ],
      },
      {
        id: "teknis-hasil-pemilihan-2024",
        label: "Hasil Pilkada 2024",
        path: "/teknis/hasil-pemilihan-2024",
        icon: Building2,
        type: "data",
        description: "Rekapitulasi hasil Pemilihan Bupati/Wakil Bupati 2024.",
        children: [
          {
            id: "pilgub-2024",
            label: "Pemilihan Gubernur Bondowoso 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbzckeYSpJOUpMclbPFIln6sQgi6I1UEXTqw9UvxLFgvMTV0Gm8eOl8XbnQSP5f1OYQ/exec",
          },
          {
            id: "pilbub-2024",
            label: "Pemilihan Bupati Bondowoso 2024",
            icon: Vote,
            external: true,
            url: "https://script.google.com/macros/s/AKfycbyqp2mIV66UsHcVm095XS7izefZGG3skZkDEIfzqXr9WAt0sHvczpQ27JQb0qYuodv6/exec",
          },
        ],
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
        id: "teknis-sidapil",
        label: "SIDAPIL",
        icon: MapPinned,
        external: true,
        url: "https://script.google.com/macros/s/AKfycbw4aVcZvUcItgwHKjEB_mSPQserxAKaw3WWTCSiBNg2OEcroncTB56-x4CCs7DOBSGexw/exec",
      },
    ],
  },
  {
    id: "hukum",
    label: "Hukum",
    icon: Scale,
    description: "Produk hukum, dokumen resmi, dan layanan konsultasi hukum.",
    submenu: [
      {
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
    id: "kinerja",
    label: "Kinerja",
    icon: TrendingUp,
    description: "Rencana dan laporan capaian kinerja Subbagian Tekhum.",
    submenu: [
      {
        id: "kinerja-rencana",
        label: "Rencana Kinerja",
        icon: ClipboardList,
        external: true,
        url: "https://docs.google.com/spreadsheets/d/1XS3XFoe7CgUv34R_oouI-LzDrIGq7yZ22UhMlYNX294/edit?usp=sharing",
      },
      {
        id: "kinerja-laporan",
        label: "Laporan Kinerja",
        icon: FileText,
        external: true,
        url: "https://script.google.com/macros/s/AKfycbymKKzYGt7-19NnZMUWvzhTVwUFxgENRCGURasNjXyMjJ6Hep7EqIREeQMD3bpXUbDq2A/exec",
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
  ...topLevel.filter((item) => !isExternalLink(item)).map((item) => ({ ...item, group: "Beranda" })),
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
// bersarang di dalam children) berdasarkan id-nya.
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

// Menentukan tujuan klik untuk sebuah GRUP menu
export function getGroupEntryPoint(group) {
  for (const item of group.submenu) {
    if (hasChildren(item)) {
      if (item.children.length > 0) return item.children[0];
      continue;
    }
    return item;
  }
  return null;
}

// Navigasi ke sebuah item menu
export function goToItem(item, navigate) {
  if (!item) return;
  if (isExternalLink(item)) {
    window.open(item.url, "_blank", "noopener,noreferrer");
  } else if (item.path) {
    navigate(item.path);
  }
}