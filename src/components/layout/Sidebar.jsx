import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { navigation } from "../../config/navigation.js";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay khusus mobile */}
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
              TH
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">Portal Tekhum</p>
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
          {navigation.map((group) => (
            <div key={group.group} className="mb-6">
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {group.group}
              </p>
              <ul className="space-y-1">
                {group.items.map(({ id, label, path, icon: Icon, badge }) => (
                  <li key={id}>
                    <NavLink
                      to={path}
                      end={path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-ink-700 text-white shadow-card"
                            : "text-slate-300 hover:bg-white/5 hover:text-white",
                        ].join(" ")
                      }
                    >
                      <Icon size={18} className="shrink-0 text-gold-400/90" />
                      <span className="flex-1 truncate">{label}</span>
                      {badge && (
                        <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-semibold text-gold-400">
                          {badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
