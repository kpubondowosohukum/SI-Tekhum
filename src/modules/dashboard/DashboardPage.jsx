import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navigationGroups, isExternalLink, hasChildren } from "../../config/navigation.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ringkasan"
        title="Selamat datang di SI-Tekhum"
        description="Titik akses tunggal untuk seluruh alat kerja, dokumen, dan sistem Divisi Teknis Penyelenggaraan, Hukum, dan Kinerja."
      />

      {/* Kartu ini digenerate otomatis dari navigationGroups — menambah
          grup/submenu baru di navigation.js akan otomatis tampil di sini
          tanpa perlu mengubah halaman ini. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {navigationGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <Card
              key={group.id}
              title={group.label}
              description={`${group.submenu.length} sub-menu tersedia`}
              actions={
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-700/10 text-ink-700">
                  <GroupIcon size={18} />
                </div>
              }
            >
              <ul className="space-y-2 text-sm">
                {group.submenu.map((item) => (
                  <SubmenuLink key={item.id} item={item} />
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <Card
        className="mt-6"
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

function SubmenuLink({ item }) {
  if (hasChildren(item)) {
    return (
      <li>
        <p className="font-medium text-slate-500">{item.label}</p>
        <ul className="mt-1 space-y-1.5 pl-3">
          {item.children.map((child) => (
            <SubmenuLink key={child.id} item={child} />
          ))}
        </ul>
      </li>
    );
  }

  if (isExternalLink(item)) {
    return (
      <li>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-ink-700 hover:underline"
        >
          {item.label}
          <ArrowUpRight size={13} />
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link to={item.path} className="font-medium text-ink-700 hover:underline">
        {item.label} →
      </Link>
    </li>
  );
}
