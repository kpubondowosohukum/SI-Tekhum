/**
 * Satu kartu di grid "Eksplor Layanan SI-Tekhum" — ikon besar dalam kotak
 * rounded soft, judul di bawahnya, efek hover terangkat + shadow membesar.
 * `onClick` di-resolve oleh pemanggil lewat goToItem() (lihat DashboardPage),
 * jadi komponen ini murni presentasi.
 */
export default function QuickAccessCard({ label, Icon, onClick, accent = "bg-ink-700/10 text-ink-700" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${accent}`}
      >
        <Icon size={26} />
      </div>
      <span className="text-sm font-semibold text-ink-900">{label}</span>
    </button>
  );
}
