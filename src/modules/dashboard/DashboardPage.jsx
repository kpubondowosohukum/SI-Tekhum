import { Link } from "react-router-dom";
import { navigationGroups } from "../../config/navigation.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ringkasan"
        title="Selamat datang di SI-Tekhum"
        description="Titik akses tunggal untuk seluruh alat kerja, dokumen, dan sistem Divisi Teknis Penyelenggaraan, Hukum, Kinerja, dan Pleno."
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
                  <li key={item.id}>
                    <Link to={item.path} className="font-medium text-ink-700 hover:underline">
                      {item.label} →
                    </Link>
                  </li>
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
            Tentukan <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">type</code>:{" "}
            <Badge tone="gold">dokumen</Badge> <Badge tone="gold">data</Badge>{" "}
            <Badge tone="gold">sistem</Badge> <Badge tone="neutral">placeholder</Badge> — halaman
            akan otomatis memakai template yang sesuai.
          </li>
          <li>
            Butuh tampilan khusus? Buat file di{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              src/modules/&lt;grup&gt;/
            </code>{" "}
            dan daftarkan lewat field <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">element</code>.
          </li>
          <li>Commit &amp; push ke GitHub — deploy otomatis akan memperbarui website.</li>
        </ol>
      </Card>
    </>
  );
}
