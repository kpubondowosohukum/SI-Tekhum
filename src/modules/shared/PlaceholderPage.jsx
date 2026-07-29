import { Construction } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

/**
 * Template fallback (type: "placeholder" atau type tidak dikenali).
 * Gunakan ini sebagai titik awal saat konten sub-menu belum ditentukan
 * bentuknya (dokumen/data/sistem) — bisa diganti tipe lain kapan saja
 * cukup dengan mengubah field `type` di navigation.js.
 */
export default function PlaceholderPage({ menu }) {
  return (
    <>
      <PageHeader eyebrow={menu?.group} title={menu?.label} description={menu?.description} />
      <Card>
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <Construction size={32} className="mb-3 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">Konten belum tersedia</p>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            Halaman ini siap diisi. Tentukan tipe template yang sesuai
            (<code className="rounded bg-slate-100 px-1">dokumen</code>,{" "}
            <code className="rounded bg-slate-100 px-1">data</code>, atau{" "}
            <code className="rounded bg-slate-100 px-1">sistem</code>) pada{" "}
            <code className="rounded bg-slate-100 px-1">src/config/navigation.js</code>, atau buat
            komponen kustom sendiri.
          </p>
        </div>
      </Card>
    </>
  );
}
