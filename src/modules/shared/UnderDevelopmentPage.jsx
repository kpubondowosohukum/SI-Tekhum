import { Construction, MessageCircleQuestion } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

/**
 * Template untuk sub-menu type: "developing"
 * Dipakai untuk fitur yang statusnya masih dalam pengembangan (mis. SPIP).
 * Isi `meta.message` di navigation.js untuk mengatur teks pemberitahuannya.
 */
export default function UnderDevelopmentPage({ menu }) {
  const message = menu?.meta?.message || "Fitur ini masih dalam tahap pengembangan.";

  return (
    <>
      <PageHeader
        eyebrow={menu?.group}
        title={menu?.label}
        description={menu?.description}
        actions={<Badge tone="gold">On The Way</Badge>}
      />

      <Card>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
            <Construction size={26} />
          </div>
          <p className="max-w-md text-sm font-medium text-ink-900">{message}</p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <MessageCircleQuestion size={14} />
            Halaman ini akan otomatis aktif begitu fiturnya siap dirilis.
          </p>
        </div>
      </Card>
    </>
  );
}
