import { FileText, ShieldCheck, Scale } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

const sop = [
  {
    icon: FileText,
    judul: "SOP Penanganan Sengketa Administrasi",
    ringkas: "Alur kerja penanganan sengketa dari penerimaan berkas hingga putusan Bawaslu.",
  },
  {
    icon: ShieldCheck,
    judul: "SOP Kajian Hukum Produk Kebijakan",
    ringkas: "Prosedur telaah legal sebelum penerbitan SK/keputusan KPU Kabupaten.",
  },
  {
    icon: Scale,
    judul: "SOP Fasilitasi Sengketa Proses Pemilu",
    ringkas: "Mekanisme mediasi dan musyawarah untuk penyelesaian sengketa proses.",
  },
];

export default function HukumIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Divisi Hukum & JDIH"
        title="SOP & Kepatuhan"
        description="Ringkasan prosedur operasional standar yang berlaku di lingkup hukum kepemiluan. Placeholder konten — lengkapi dengan dokumen resmi terbaru."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sop.map((s) => (
          <Card key={s.judul}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ink-700/10 text-ink-700">
              <s.icon size={20} />
            </div>
            <h3 className="text-sm font-semibold text-ink-900">{s.judul}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{s.ringkas}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
