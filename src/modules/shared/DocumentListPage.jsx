import { FileDown, Inbox } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

/**
 * Template untuk sub-menu type: "dokumen"
 * Dipakai oleh: Rencana/Laporan Kinerja, Dokumen BA/SK, Laporan JDIH/SPIP, dll.
 *
 * Sumber data saat ini: `menu.meta.documents` (array statis di navigation.js).
 * Untuk produksi, ganti dengan fetch ke /public/data/<slug>.json atau API,
 * tanpa perlu mengubah tampilan komponen ini.
 */
export default function DocumentListPage({ menu }) {
  const documents = menu?.meta?.documents ?? [];

  return (
    <>
      <PageHeader
        eyebrow={menu?.group}
        title={menu?.label}
        description={menu?.description}
      />

      <Card title="Daftar Dokumen" description="Placeholder — hubungkan ke sumber data resmi.">
        {documents.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y divide-slate-100">
            {documents.map((d, i) => (
              <div
                key={`${d.nama}-${i}`}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink-900">{d.nama}</p>
                    {d.kategori && <Badge tone="gold">{d.kategori}</Badge>}
                  </div>
                  {d.tahun && <p className="mt-0.5 text-xs text-slate-400">Tahun {d.tahun}</p>}
                </div>
                <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-slate-50">
                  <FileDown size={14} />
                  Unduh
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Inbox size={32} className="mb-3 text-slate-300" />
      <p className="text-sm font-medium text-slate-500">Belum ada dokumen terdaftar</p>
      <p className="mt-1 max-w-sm text-xs text-slate-400">
        Tambahkan dokumen lewat field <code className="rounded bg-slate-100 px-1">meta.documents</code>{" "}
        pada entri terkait di <code className="rounded bg-slate-100 px-1">src/config/navigation.js</code>.
      </p>
    </div>
  );
}
