import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

const tahapan = [
  { nama: "Pemutakhiran Data Pemilih", progres: 62, status: "Berjalan", tone: "gold" },
  { nama: "Verifikasi Faktual Partai", progres: 100, status: "Selesai", tone: "hijau" },
  { nama: "Penetapan Dapil", progres: 20, status: "Berjalan", tone: "gold" },
  { nama: "Rekrutmen Badan Ad Hoc", progres: 0, status: "Belum mulai", tone: "neutral" },
];

export default function TeknisIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Divisi Teknis Penyelenggaraan"
        title="Progres Tahapan"
        description="Pemantauan status tahapan penyelenggaraan pemilu secara ringkas. Placeholder — hubungkan ke sumber data resmi (mis. Sirekap/SIDALIH) pada iterasi berikutnya."
      />

      <Card title="Status Tahapan Aktif">
        <div className="divide-y divide-slate-100">
          {tahapan.map((t) => (
            <div key={t.nama} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink-900">{t.nama}</p>
                  <Badge tone={t.tone}>{t.status}</Badge>
                </div>
                <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-ink-700"
                    style={{ width: `${t.progres}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-500 sm:w-12 sm:text-right">
                {t.progres}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
