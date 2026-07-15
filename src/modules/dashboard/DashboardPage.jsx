import { ClipboardCheck, FileStack, MapPinned, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ringkasan"
        title="Selamat datang di Portal Tekhum"
        description="Titik akses tunggal untuk alat kerja, progres tahapan, dan arsip regulasi Subbagian Teknis dan Hukum."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Tahapan Berjalan"
          value="Pemutakhiran Data Pemilih"
          hint="Progres 62% — lihat detail di menu Teknis"
          icon={ClipboardCheck}
          tone="ink"
        />
        <StatCard
          label="Regulasi Termutakhir"
          value="14 Dokumen"
          hint="Diperbarui minggu ini"
          icon={FileStack}
          tone="gold"
        />
        <StatCard
          label="Perlu Perhatian"
          value="2 Isu"
          hint="Menunggu kajian hukum"
          icon={AlertTriangle}
          tone="merah"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card
          title="Divisi Teknis Penyelenggaraan"
          description="Alat bantu simulasi dan pemantauan tahapan pemilu."
          actions={<Badge tone="gold">2 fitur</Badge>}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/teknis" className="font-medium text-ink-700 hover:underline">
                Progres Tahapan →
              </Link>
            </li>
            <li>
              <Link to="/teknis/simulasi-dapil" className="font-medium text-ink-700 hover:underline">
                Simulasi Dapil →
              </Link>
            </li>
          </ul>
        </Card>

        <Card
          title="Divisi Hukum & JDIH"
          description="SOP internal dan pusat arsip regulasi resmi."
          actions={<Badge tone="gold">2 fitur</Badge>}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/hukum" className="font-medium text-ink-700 hover:underline">
                SOP & Kepatuhan →
              </Link>
            </li>
            <li>
              <Link to="/hukum/jdih-arsip" className="font-medium text-ink-700 hover:underline">
                Arsip Regulasi (JDIH) →
              </Link>
            </li>
          </ul>
        </Card>
      </div>

      <Card
        className="mt-6"
        title="Cara menambah fitur baru"
        description="Portal ini dirancang agar tumbuh tanpa merombak kode yang sudah ada."
      >
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
          <li>
            Buat file komponen baru di{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/modules/&lt;divisi&gt;/</code>
          </li>
          <li>
            Daftarkan komponen tersebut di{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/config/navigation.js</code>
          </li>
          <li>
            Commit &amp; push ke GitHub — deploy otomatis akan memperbarui website secara langsung.
          </li>
        </ol>
      </Card>
    </>
  );
}
