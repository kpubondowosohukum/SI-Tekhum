export default function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-ink-700" />
        Memuat modul...
      </div>
    </div>
  );
}
