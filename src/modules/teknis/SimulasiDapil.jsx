import { useMemo, useState } from "react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

/**
 * Contoh fitur interaktif sederhana: kalkulator alokasi kursi per dapil
 * berdasarkan jumlah penduduk dan jumlah kursi DPRD kabupaten.
 * Ganti logika di dalam `hitungAlokasi` dengan metode resmi yang berlaku.
 */
function hitungAlokasi(jumlahPenduduk, jumlahKursi, jumlahDapil) {
  if (!jumlahPenduduk || !jumlahKursi || !jumlahDapil) return [];
  const kursiPerDapil = Math.floor(jumlahKursi / jumlahDapil);
  const sisa = jumlahKursi % jumlahDapil;
  return Array.from({ length: jumlahDapil }, (_, i) => ({
    dapil: `Dapil ${i + 1}`,
    kursi: kursiPerDapil + (i < sisa ? 1 : 0),
    estimasiPenduduk: Math.round(jumlahPenduduk / jumlahDapil),
  }));
}

export default function SimulasiDapil() {
  const [penduduk, setPenduduk] = useState(450000);
  const [kursi, setKursi] = useState(35);
  const [dapil, setDapil] = useState(6);

  const hasil = useMemo(() => hitungAlokasi(penduduk, kursi, dapil), [penduduk, kursi, dapil]);

  return (
    <>
      <PageHeader
        eyebrow="Divisi Teknis Penyelenggaraan"
        title="Simulasi Dapil"
        description="Alat bantu estimasi alokasi kursi per daerah pemilihan. Nilai default hanya contoh — sesuaikan dengan data resmi kabupaten."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Parameter" className="lg:col-span-1">
          <div className="space-y-4">
            <Field label="Jumlah Penduduk" value={penduduk} onChange={setPenduduk} />
            <Field label="Jumlah Kursi DPRD" value={kursi} onChange={setKursi} />
            <Field label="Jumlah Dapil" value={dapil} onChange={setDapil} />
          </div>
        </Card>

        <Card title="Estimasi Alokasi per Dapil" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2 font-medium">Dapil</th>
                  <th className="pb-2 font-medium">Estimasi Kursi</th>
                  <th className="pb-2 font-medium">Estimasi Penduduk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hasil.map((h) => (
                  <tr key={h.dapil}>
                    <td className="py-2.5 font-medium text-ink-900">{h.dapil}</td>
                    <td className="py-2.5 text-slate-600">{h.kursi} kursi</td>
                    <td className="py-2.5 text-slate-600">
                      {h.estimasiPenduduk.toLocaleString("id-ID")} jiwa
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Perhitungan ini bersifat estimasi kasar (pembagian rata) dan belum memperhitungkan
            batas administratif maupun prinsip penataan dapil (proporsionalitas, integralitas
            wilayah, dsb). Gantikan dengan metode resmi sebelum dipakai untuk kajian aktual.
          </p>
        </Card>
      </div>
    </>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink-900 focus:border-ink-500"
      />
    </label>
  );
}
