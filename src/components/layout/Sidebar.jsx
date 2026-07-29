import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { topLevel, navigationGroups, findActiveGroupId } from "../../config/navigation.js";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();

  // Grup yang sedang terbuka (bisa lebih dari satu). Grup yang berisi
  // halaman aktif otomatis ikut terbuka saat pertama kali render/berpindah.
  const [openGroups, setOpenGroups] = useState(() => {
    const active = findActiveGroupId(pathname);
    return active ? new Set([active]) : new Set();
  });

  useEffect(() => {
    const active = findActiveGroupId(pathname);
    if (active) {
      setOpenGroups((prev) => new Set(prev).add(active));
    }
  }, [pathname]);

  function toggleGroup(id) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <>
      {open && (
        <button
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink-950/40 lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-ink-950 text-slate-200",
          "transition-transform duration-200 ease-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ink-600 to-ink-800 text-sm font-bold text-gold-400 ring-1 ring-white/10">
              ST
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">SI-Tekhum</p>
              <p className="text-xs text-slate-400">KPU Kabupaten</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {/* Link tanpa submenu, mis. Beranda */}
          <ul className="mb-4 space-y-1">
            {topLevel.map(({ id, label, path, icon: Icon }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-ink-700 text-white shadow-card"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon size={18} className="shrink-0 text-gold-400/90" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Menu Utama
          </p>

          {/* 4 menu utama, masing-masing collapsible berisi submenu */}
          <ul className="space-y-1">
            {navigationGroups.map((group) => {
              const isOpen = openGroups.has(group.id);
              const GroupIcon = group.icon;
              const groupIsActive = group.submenu.some((item) => pathname.startsWith(item.path));

              return (
                <li key={group.id}>
                  <button
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className={[
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      groupIsActive
                        ? "text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    <GroupIcon size={18} className="shrink-0 text-gold-400/90" />
                    <span className="flex-1 text-left">{group.label}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <ul className="min-h-0 space-y-0.5 py-1 pl-4">
                      {group.submenu.map(({ id, label, path, icon: SubIcon }) => (
                        <li key={id}>
                          <NavLink
                            to={path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              [
                                "flex items-center gap-2.5 rounded-lg border-l-2 py-2 pl-3 pr-3 text-[13px] font-medium transition-colors",
                                isActive
                                  ? "border-gold-400 bg-ink-700/70 text-white"
                                  : "border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-white",
                              ].join(" ")
                            }
                          >
                            <SubIcon size={15} className="shrink-0" />
                            <span className="truncate">{label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-[11px] text-slate-500">
          Struktur menu dikelola dari{" "}
          <code className="rounded bg-white/5 px-1 py-0.5 text-slate-400">
            src/config/navigation.js
          </code>
        </div>
      </aside>
    </>
  );
}
