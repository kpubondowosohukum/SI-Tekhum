import { useLocation } from "react-router-dom";
import { Menu, Wifi, ChevronRight } from "lucide-react";
import { findActiveNavItem } from "../../config/navigation.js";

export default function Navbar({ onOpenSidebar }) {
  const { pathname } = useLocation();
  const active = findActiveNavItem(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenSidebar}
        className="rounded-md p-2 text-ink-700 hover:bg-slate-100 lg:hidden"
        aria-label="Buka menu navigasi"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb / identitas halaman */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Portal Tekhum</span>
          {active && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-500">{active.group}</span>
            </>
          )}
        </div>
        <h1 className="truncate text-base font-semibold text-ink-900 sm:text-lg">
          {active?.label ?? "Halaman tidak ditemukan"}
        </h1>
      </div>

      {/* Status sistem */}
      <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Sistem Aktif
      </div>

      <div className="hidden items-center gap-1.5 text-xs text-slate-400 md:flex">
        <Wifi size={14} />
        Data lokal
      </div>

      {/* Identitas pengguna (placeholder — ganti dengan sistem auth bila diperlukan) */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-700 text-xs font-semibold text-white">
        SB
      </div>
    </header>
  );
}
