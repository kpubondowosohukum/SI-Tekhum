import { useMemo, useState } from "react";
import { Search, FileDown } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

/**
 * Data contoh — pada implementasi nyata, ganti dengan fetch ke
 * JSON statis di /public/data/jdih.json atau API JDIH resmi,
 * sehingga daftar regulasi bisa diperbarui tanpa mengubah kode.
 */
const dataRegulasi = [
  { nomor: "PKPU 7/2024", judul: "Tahapan, Program, dan Jadwal Penyelenggaraan Pemilu", jenis: "PKPU", tahun: 2024 },
  { nomor: "PKPU 8/2024", judul: "Pencalonan Anggota DPRD Kabupaten/Kota", jenis: "PKPU", tahun: 2024 },
  { nomor: "SK 112/2023", judul: "Penetapan Daerah Pemilihan dan Alokasi Kursi", jenis: "SK KPU", tahun: 2023 },
  { nomor: "SE 45/2023", judul: "Pedoman Teknis Pemutakhiran Data Pemilih", jenis: "Surat Edaran", tahun: 2023 },
];

export default function JdihArsip() {
  const [kata, setKata] = useState("");

  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();
    if (!q) return dataRegulasi;
    return dataRegulasi.filter(
      (d) => d.judul.toLowerCase().includes(q) || d.nomor.toLowerCase().includes(q)
    );
  }, [kata]);

  return (
    <>
      <PageHeader
        eyebrow="Divisi Hukum & JDIH"
        title="Arsip Regulasi (JDIH)"
        description="Pusat pencarian produk hukum kepemiluan. Data contoh — hubungkan ke sumber JDIH resmi untuk data langsung."
      />

      <Card>
        <div className="relative mb-4">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={kata}
            onChange={(e) => setKata(e.target.value)}
            placeholder="Cari nomor atau judul regulasi..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-ink-500"
          />
        </div>

        <div className="divide-y divide-slate-100">
          {hasil.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">
              Tidak ada regulasi yang cocok dengan pencarian "{kata}".
            </p>
          )}
          {hasil.map((d) => (
            <div key={d.nomor} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink-900">{d.nomor}</p>
                  <Badge tone="gold">{d.jenis}</Badge>
                </div>
                <p className="mt-0.5 truncate text-sm text-slate-500">{d.judul}</p>
              </div>
              <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-slate-50">
                <FileDown size={14} />
                Unduh
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
