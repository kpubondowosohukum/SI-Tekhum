import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight, Wifi } from "lucide-react";
import {
  topLevel,
  navigationGroups,
  findActiveGroupId,
  isExternalLink,
  hasChildren,
} from "../../config/navigation.js";
import logoKpu from "../../assets/logo-kpu.png";

export default function TopNav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const activeGroupId = findActiveGroupId(pathname);

  const beranda = topLevel.find((item) => item.id === "beranda");
  const topLevelSisanya = topLevel.filter((item) => item.id !== "beranda");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + identitas */}
        <NavLink to="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
          {logoError ? (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-ink-600 to-ink-900 text-xs font-bold text-gold-400">
              ST
            </div>
          ) : (
            <img
              src={logoKpu}
              alt="Logo KPU Kabupaten Bondowoso"
              className="h-9 w-9 shrink-0 object-contain"
              onError={() => setLogoError(true)}
            />
          )}
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-bold leading-tight text-ink-900">SI-Tekhum</p>
            <p className="whitespace-normal text-[10px] leading-tight text-slate-500">
              KPU Kabupaten Bondowoso
            </p>
          </div>
        </NavLink>

        {/* Menu mendatar — desktop */}
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {beranda && <TopLevelLink item={beranda} />}

          {navigationGroups.map((group) => (
            <DesktopDropdown key={group.id} group={group} isActiveGroup={group.id === activeGroupId} />
          ))}

          {topLevelSisanya.map((item) => (
            <TopLevelLink key={item.id} item={item} />
          ))}
        </nav>

        {/* Kanan: status sistem (desktop) + tombol hamburger (mobile) */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 md:flex">
            <Wifi size={13} />
            Sistem Aktif
          </div>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-ink-700 hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function TopLevelLink({ item }) {
  if (isExternalLink(item)) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink-900"
      >
        {item.label}
        <ArrowUpRight size={13} className="text-slate-400" />
      </a>
    );
  }

  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) =>
        [
          "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-ink-700 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink-900",
        ].join(" ")
      }
    >
      {item.label}
    </NavLink>
  );
}

function DesktopDropdown({ group, isActiveGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function openNow() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={[
          "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          isActiveGroup ? "bg-ink-700 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink-900",
        ].join(" ")}
      >
        {group.label}
        <ChevronDown size={14} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full w-72 pt-2">
          <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-card">
            {group.submenu.map((item) => (
              <DropdownRow key={item.id} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownRow({ item, onNavigate }) {
  const Icon = item.icon;

  if (hasChildren(item)) {
    return (
      <div className="mb-1 last:mb-0">
        <p className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <Icon size={13} />
          {item.label}
        </p>
        <div className="ml-2 space-y-0.5 border-l border-slate-100 pl-2">
          {item.children.map((child) => (
            <DropdownRow key={child.id} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    );
  }

  if (isExternalLink(item)) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-ink-900"
      >
        <Icon size={16} className="shrink-0 text-ink-500" />
        <span className="flex-1 truncate">{item.label}</span>
        <ArrowUpRight size={13} className="shrink-0 text-slate-400" />
      </a>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
          isActive ? "bg-ink-700/10 font-medium text-ink-700" : "text-slate-600 hover:bg-slate-50 hover:text-ink-900",
        ].join(" ")
      }
    >
      <Icon size={16} className="shrink-0 text-ink-500" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

function MobileMenu({ pathname, onClose }) {
  const beranda = topLevel.find((item) => item.id === "beranda");
  const topLevelSisanya = topLevel.filter((item) => item.id !== "beranda");

  const [openGroups, setOpenGroups] = useState(() => {
    const active = findActiveGroupId(pathname);
    return active ? new Set([active]) : new Set();
  });
  const [openSub, setOpenSub] = useState(new Set());

  function toggleGroup(id) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSub(id) {
    setOpenSub((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="max-h-[75vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
      {beranda && (
        <NavLink
          to={beranda.path}
          end
          onClick={onClose}
          className={({ isActive }) =>
            [
              "block rounded-lg px-3 py-2.5 text-sm font-medium",
              isActive ? "bg-ink-700 text-white" : "text-slate-700 hover:bg-slate-50",
            ].join(" ")
          }
        >
          {beranda.label}
        </NavLink>
      )}

      {navigationGroups.map((group) => {
        const isOpen = openGroups.has(group.id);
        const GroupIcon = group.icon;
        return (
          <div key={group.id} className="mt-1">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <GroupIcon size={17} className="text-ink-600" />
              <span className="flex-1 text-left">{group.label}</span>
              <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="ml-3 space-y-0.5 border-l border-slate-100 py-1 pl-3">
                {group.submenu.map((item) => (
                  <MobileRow
                    key={item.id}
                    item={item}
                    onNavigate={onClose}
                    isSubOpen={openSub.has(item.id)}
                    onToggleSub={() => toggleSub(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {topLevelSisanya.map((item) =>
        isExternalLink(item) ? (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {item.label}
            <ArrowUpRight size={13} className="text-slate-400" />
          </a>
        ) : (
          <NavLink
            key={item.id}
            to={item.path}
            end
            onClick={onClose}
            className={({ isActive }) =>
              [
                "mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive ? "bg-ink-700 text-white" : "text-slate-700 hover:bg-slate-50",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </div>
  );
}

function MobileRow({ item, onNavigate, isSubOpen, onToggleSub }) {
  const Icon = item.icon;

  if (hasChildren(item)) {
    return (
      <div>
        <button
          onClick={onToggleSub}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Icon size={15} className="shrink-0" />
          <span className="flex-1 truncate text-left">{item.label}</span>
          <ChevronDown size={13} className={`transition-transform ${isSubOpen ? "rotate-180" : ""}`} />
        </button>
        {isSubOpen && (
          <div className="ml-3 space-y-0.5 border-l border-slate-100 pl-3">
            {item.children.map((child) => (
              <MobileRow key={child.id} item={child} onNavigate={onNavigate} isSubOpen={false} onToggleSub={() => {}} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isExternalLink(item)) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        <Icon size={15} className="shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        <ArrowUpRight size={13} className="shrink-0 text-slate-400" />
      </a>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm",
          isActive ? "bg-ink-700/10 font-medium text-ink-700" : "text-slate-600 hover:bg-slate-50",
        ].join(" ")
      }
    >
      <Icon size={15} className="shrink-0" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}