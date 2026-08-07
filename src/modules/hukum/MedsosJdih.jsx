import { Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";

/**
 * Halaman kustom (bukan template shared) karena kebutuhannya — grid card
 * hub media sosial dengan logo & warna khas tiap platform — di luar
 * template generik "dokumen"/"data"/"sistem".
 *
 * Untuk menambah/mengubah akun media sosial, cukup edit array `akunMedsos`
 * di bawah — tidak perlu mengubah bagian tampilan (JSX) sama sekali.
 */
const akunMedsos = [
  {
    platform: "Instagram",
    handle: "@jdih.kpubondowoso",
    url: "https://www.instagram.com/jdih.kpubondowoso",
    icon: Instagram,
    iconBg: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400",
  },
  {
    platform: "TikTok",
    handle: "@jdihkpubondowoso",
    url: "https://www.tiktok.com/@jdihkpubondowoso",
    icon: TiktokGlyph,
    iconBg: "bg-black",
  },
  {
    platform: "Facebook",
    handle: "jdihkpubondowoso",
    url: "https://www.facebook.com/jdihkpubondowoso",
    icon: Facebook,
    iconBg: "bg-blue-600",
  },
  {
    platform: "X (Twitter)",
    handle: "@jdihkpubws",
    url: "https://x.com/jdihkpubws",
    icon: XGlyph,
    iconBg: "bg-black",
  },
  {
    platform: "YouTube",
    handle: "JDIH KPU Bondowoso",
    url: "https://www.youtube.com/channel/UCBJkJGqD9WJC3-NAZjURiuA",
    icon: Youtube,
    iconBg: "bg-red-600",
  },
];

export default function MedsosJdih() {
  return (
    <>
      <PageHeader
        eyebrow="Hukum"
        title="Medsos JDIH"
        description="Kanal media sosial resmi Jaringan Dokumentasi dan Informasi Hukum KPU Kabupaten Bondowoso."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {akunMedsos.map((akun) => (
          <Card key={akun.platform} className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${akun.iconBg}`}>
                <akun.icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-900">{akun.platform}</p>
                <p className="truncate text-sm text-slate-500">{akun.handle}</p>
              </div>
            </div>

            <a
              href={akun.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-sm font-medium text-ink-700 hover:bg-slate-50"
            >
              Kunjungi Akun
              <ArrowUpRight size={15} />
            </a>
          </Card>
        ))}
      </div>
    </>
  );
}

// lucide-react belum menyediakan ikon resmi TikTok & "X" (logo baru Twitter),
// jadi dibuat sebagai SVG inline ringan yang mengikuti gaya ikon lucide
// (24x24, stroke/fill currentColor) supaya konsisten secara visual.
function TiktokGlyph({ size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function XGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={props.size ?? 22} height={props.size ?? 22} aria-hidden="true">
      <path d="M18.24 3H21l-6.6 7.54L22 21h-6.24l-4.9-6.4L4.9 21H2.13l7.06-8.07L2 3h6.4l4.43 5.85L18.24 3Zm-1.09 16.17h1.53L7.06 4.74H5.4l11.75 14.43Z" />
    </svg>
  );
}
