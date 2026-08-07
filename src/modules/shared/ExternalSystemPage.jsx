import { ExternalLink, AlertTriangle, Link2Off } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

/**
 * Template untuk sub-menu type: "sistem"
 * Dipakai oleh: JDIH, Silakon, Simoku, SIKAP, SPIP, dll — sub-menu yang
 * merupakan pintasan/embed ke sistem/dashboard eksternal.
 *
 * Field yang dibaca dari `menu.meta`:
 *  - url          : (wajib) alamat yang dibuka lewat tombol "Buka di tab baru"
 *  - embedUrl      : (opsional) alamat KHUSUS untuk ditaruh di iframe, kalau
 *                     beda dari `url` (mis. link edit Google Sheets perlu
 *                     diubah ke versi /preview supaya bisa di-embed). Kalau
 *                     kosong, `url` dipakai juga untuk iframe.
 *  - buttonLabel   : (opsional) teks tombol, default "Buka di tab baru"
 *  - height        : (opsional) tinggi iframe, default "70vh"
 *
 * Tombol "Buka di tab baru"/label custom SELALU tersedia sebagai fallback,
 * karena banyak sistem (terutama situs pemerintah) mengunci header
 * X-Frame-Options sehingga tidak bisa di-embed langsung.
 */
export default function ExternalSystemPage({ menu }) {
  const url = menu?.meta?.url;
  const embedUrl = menu?.meta?.embedUrl || url;
  const buttonLabel = menu?.meta?.buttonLabel || "Buka di tab baru";
  const height = menu?.meta?.height || "70vh";

  return (
    <>
      <PageHeader
        eyebrow={menu?.group}
        title={menu?.label}
        description={menu?.description}
        actions={
          url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-600"
            >
              <ExternalLink size={16} />
              {buttonLabel}
            </a>
          ) : null
        }
      />

      <Card>
        {!url ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <Link2Off size={32} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">URL sistem belum dikonfigurasi</p>
            <p className="mt-1 max-w-sm text-xs text-slate-400">
              Isi <code className="rounded bg-slate-100 px-1">meta.url</code> pada entri{" "}
              <Badge tone="gold">{menu?.label}</Badge> di{" "}
              <code className="rounded bg-slate-100 px-1">src/config/navigation.js</code>.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <p>
                Sebagian sistem tidak mengizinkan tampilan tertanam (embed). Jika area di bawah
                kosong/gagal muat, gunakan tombol "{buttonLabel}" di atas.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <iframe
                src={embedUrl}
                title={menu?.label}
                className="w-full"
                style={{ height }}
                loading="lazy"
              />
            </div>
          </>
        )}
      </Card>
    </>
  );
}
