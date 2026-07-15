export default function StatCard({ label, value, hint, icon: Icon, tone = "ink" }) {
  const toneMap = {
    ink: "bg-ink-700/10 text-ink-700",
    gold: "bg-gold-500/15 text-gold-600",
    merah: "bg-merah-600/10 text-merah-600",
  };

  return (
    <div className="surface-card flex items-start gap-4 p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${toneMap[tone] ?? toneMap.ink}`}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-ink-900">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
      </div>
    </div>
  );
}
