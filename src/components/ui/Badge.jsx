const tones = {
  neutral: "bg-slate-100 text-slate-600",
  gold: "bg-gold-500/15 text-gold-600",
  merah: "bg-merah-600/10 text-merah-600",
  hijau: "bg-emerald-500/10 text-emerald-600",
};

export default function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}
