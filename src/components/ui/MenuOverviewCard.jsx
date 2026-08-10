/**
 * Kartu untuk section "Eksplor Layanan Tekhum" di Beranda — MURNI kartu
 * informasi/deskripsi (bukan tautan/tombol navigasi). Sengaja pakai <div>,
 * bukan <button>/<a>, dan tidak ada handler klik sama sekali — tapi efek
 * hover visual (terangkat, shadow membesar) tetap dipertahankan supaya
 * kartunya tetap terasa hidup/interaktif secara visual.
 */
export default function MenuOverviewCard({ label, description, Icon, accent = "bg-ink-700/10 text-ink-700" }) {
  return (
    <div className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-card">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${accent}`}
      >
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink-900">{label}</h3>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
}
