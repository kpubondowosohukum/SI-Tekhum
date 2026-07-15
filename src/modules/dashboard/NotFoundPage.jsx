import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <CompassIcon size={40} className="mb-4 text-slate-300" />
      <h1 className="text-lg font-semibold text-ink-900">Halaman tidak ditemukan</h1>
      <p className="mt-1 text-sm text-slate-500">
        Menu yang Anda tuju mungkin belum terdaftar di navigasi.
      </p>
      <Link
        to="/"
        className="mt-5 rounded-lg bg-ink-700 px-4 py-2 text-sm font-medium text-white hover:bg-ink-600"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
