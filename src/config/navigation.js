import { lazy } from "react";
import {
  LayoutDashboard,
  MapPinned,
  ClipboardCheck,
  Gavel,
  FileStack,
  ListChecks,
} from "lucide-react";

/**
 * ============================================================================
 *  REGISTRY NAVIGASI & ROUTING TEKHUM PORTAL
 * ============================================================================
 *  Ini adalah SATU-SATUNYA file yang perlu Anda sentuh untuk menambah menu
 *  atau fitur baru. Sidebar, breadcrumb, dan router semua dibaca dari sini.
 *
 *  CARA MENAMBAH FITUR BARU (3 langkah):
 *   1. Buat folder+file komponen baru di src/modules/<divisi>/NamaFitur.jsx
 *   2. Import komponennya di bawah dengan lazy() (agar bundle tetap kecil)
 *   3. Tambahkan satu object baru ke array `navigation` di bawah ini
 *
 *  Tidak perlu mengubah AppRouter.jsx, Sidebar.jsx, atau App.jsx sama sekali.
 * ============================================================================
 */

// --- Halaman inti (selalu ada) ---
const DashboardPage = lazy(() => import("../modules/dashboard/DashboardPage.jsx"));

// --- Divisi Teknis Penyelenggaraan ---
const TeknisIndex = lazy(() => import("../modules/teknis/TeknisIndex.jsx"));
const SimulasiDapil = lazy(() => import("../modules/teknis/SimulasiDapil.jsx"));

// --- Divisi Hukum & JDIH ---
const HukumIndex = lazy(() => import("../modules/hukum/HukumIndex.jsx"));
const JdihArsip = lazy(() => import("../modules/hukum/JdihArsip.jsx"));

/**
 * Struktur satu item menu:
 * {
 *   id:       string unik (dipakai sebagai React key & penanda breadcrumb)
 *   label:    teks yang tampil di sidebar
 *   path:     path relatif (tanpa perlu "/" di depan untuk sub-item)
 *   icon:     komponen ikon dari lucide-react
 *   element:  komponen halaman (lazy-loaded)
 *   badge:    (opsional) label kecil, mis. "Baru" atau jumlah notifikasi
 * }
 */
export const navigation = [
  {
    group: "Utama",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
        element: DashboardPage,
      },
    ],
  },
  {
    group: "Divisi Teknis Penyelenggaraan",
    items: [
      {
        id: "teknis-ringkasan",
        label: "Progres Tahapan",
        path: "/teknis",
        icon: ClipboardCheck,
        element: TeknisIndex,
      },
      {
        id: "teknis-simulasi-dapil",
        label: "Simulasi Dapil",
        path: "/teknis/simulasi-dapil",
        icon: MapPinned,
        element: SimulasiDapil,
        badge: "Baru",
      },
      // Tambahkan fitur teknis berikutnya di sini, contoh:
      // {
      //   id: "teknis-rekap-logistik",
      //   label: "Rekap Logistik",
      //   path: "/teknis/rekap-logistik",
      //   icon: ListChecks,
      //   element: lazy(() => import("../modules/teknis/RekapLogistik.jsx")),
      // },
    ],
  },
  {
    group: "Divisi Hukum & JDIH",
    items: [
      {
        id: "hukum-ringkasan",
        label: "SOP & Kepatuhan",
        path: "/hukum",
        icon: Gavel,
        element: HukumIndex,
      },
      {
        id: "hukum-jdih",
        label: "Arsip Regulasi (JDIH)",
        path: "/hukum/jdih-arsip",
        icon: FileStack,
        element: JdihArsip,
      },
    ],
  },
];

// Versi datar dari seluruh item menu — dipakai oleh router untuk
// generate <Route> tanpa perlu ditulis manual satu per satu.
export const flatNavigation = navigation.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.group }))
);

// Utilitas kecil untuk mencari metadata halaman aktif (dipakai Navbar/breadcrumb)
export function findActiveNavItem(pathname) {
  return (
    flatNavigation.find((item) => item.path === pathname) ||
    // fallback: cocokkan prefix terpanjang, untuk rute dinamis di masa depan
    flatNavigation
      .filter((item) => item.path !== "/" && pathname.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0]
  );
}
