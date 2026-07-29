import { BarChart3 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import StatCard from "../../components/ui/StatCard.jsx";

/**
 * Template untuk sub-menu type: "data"
 * Dipakai oleh: Hasil Pemilu 2024, Hasil Pemilihan 2024.
 *
 * Saat ini menampilkan kartu ringkasan (dari `menu.meta.stats`) + area
 * placeholder untuk tabel/chart rekapitulasi. Sambungkan ke Sirekap atau
 * sumber data resmi lain pada iterasi berikutnya.
 */
export default function DataResultPage({ menu }) {
  const stats = menu?.meta?.stats ?? [];

  return (
    <>
      <PageHeader eyebrow={menu?.group} title={menu?.label} description={menu?.description} />

      {stats.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} icon={BarChart3} tone="ink" />
          ))}
        </div>
      )}

      <Card
        title="Rekapitulasi per Wilayah"
        description="Tabel/chart rekapitulasi akan tampil di sini setelah data resmi tersambung."
      >
        <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 text-center">
          <BarChart3 size={28} className="mb-2 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">Data belum tersambung</p>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            Isi sumber data pada komponen ini (mis. fetch ke Sirekap/SIDALIH), atau ganti dengan
            komponen kustom lewat field <code className="rounded bg-slate-100 px-1">element</code>{" "}
            di <code className="rounded bg-slate-100 px-1">navigation.js</code>.
          </p>
        </div>
      </Card>
    </>
  );
}
