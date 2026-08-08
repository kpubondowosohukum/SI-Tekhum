import { useEffect, useState } from "react";
import { NotebookPen, Plus, Trash2, X, CalendarDays } from "lucide-react";
import Card from "../../components/ui/Card.jsx";

const STORAGE_KEY = "si-tekhum:catatan-rapat";

function loadCatatan() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // localStorage tidak tersedia (mis. mode private ketat) — anggap kosong,
    // fitur tetap jalan, hanya saja tidak tersimpan permanen.
    return [];
  }
}

function saveCatatan(list) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // diamkan — kegagalan simpan tidak boleh membuat halaman error
  }
}

function formatTanggal(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Section "Catatan Hasil Rapat Tekhum" di Beranda — form tambah catatan
 * (Tanggal, Judul, Isi Catatan) dan grid preview card, semua tersimpan di
 * localStorage browser (tidak terhubung ke Drive/Sheets — murni catatan
 * cepat personal/tim di perangkat masing-masing).
 */
export default function CatatanRapatSection() {
  const [catatan, setCatatan] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCatatan(loadCatatan());
  }, []);

  function tambahCatatan(baru) {
    setCatatan((prev) => {
      const next = [{ id: crypto.randomUUID?.() || String(Date.now()), ...baru }, ...prev];
      saveCatatan(next);
      return next;
    });
    setModalOpen(false);
  }

  function hapusCatatan(id) {
    setCatatan((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveCatatan(next);
      return next;
    });
  }

  const terurut = [...catatan].sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">Notulensi</p>
          <h2 className="text-xl font-bold text-ink-900">Catatan Hasil Rapat Tekhum</h2>
          <p className="mt-1 text-sm text-slate-500">
            Catatan cepat hasil rapat tim, tersimpan di perangkat ini.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-ink-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-600"
        >
          <Plus size={16} />
          Tambah Catatan
        </button>
      </div>

      {terurut.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <NotebookPen size={30} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">Belum ada catatan rapat</p>
            <p className="mt-1 text-xs text-slate-400">
              Klik "Tambah Catatan" untuk mulai mencatat hasil rapat tim.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terurut.map((c) => (
            <div key={c.id} className="surface-card group relative flex flex-col p-5">
              <button
                onClick={() => hapusCatatan(c.id)}
                aria-label={`Hapus catatan ${c.judul}`}
                className="absolute right-3 top-3 rounded-md p-1 text-slate-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </button>
              <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays size={13} />
                {formatTanggal(c.tanggal)}
              </div>
              <h3 className="pr-6 text-sm font-semibold text-ink-900">{c.judul}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-500">{c.isi}</p>
            </div>
          ))}
        </div>
      )}

      {modalOpen && <FormModal onClose={() => setModalOpen(false)} onSubmit={tambahCatatan} />}
    </div>
  );
}

function FormModal({ onClose, onSubmit }) {
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;
    onSubmit({ tanggal, judul: judul.trim(), isi: isi.trim() });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4">
      <div className="w-full max-w-lg rounded-xl2 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">Tambah Catatan Rapat</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Tanggal</span>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Judul</span>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="contoh: Rapat Koordinasi Tahapan Pencalonan"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Isi Catatan</span>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              rows={5}
              placeholder="Ringkasan pembahasan, keputusan, dan tindak lanjut..."
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
            />
          </label>

          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Catatan disimpan di penyimpanan lokal (localStorage) perangkat ini — tidak
            tersinkron ke perangkat lain.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-ink-700 px-4 py-2 text-sm font-medium text-white hover:bg-ink-600"
            >
              Simpan Catatan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
