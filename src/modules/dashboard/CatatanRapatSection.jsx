import { useEffect, useState } from "react";
import { NotebookPen, Plus, Pencil, Trash2, X, CalendarDays, Check } from "lucide-react";
import Card from "../../components/ui/Card.jsx";

const STORAGE_KEY = "si-tekhum:catatan-rapat";

// Palet warna soft untuk kartu catatan. `id` disimpan di localStorage,
// `card` dipakai untuk background+border kartu, `dot` untuk swatch di form.
export const WARNA_OPTIONS = [
  { id: "kuning", label: "Kuning Soft", card: "bg-amber-50 border-amber-200", dot: "bg-amber-300" },
  { id: "hijau", label: "Hijau Soft", card: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-300" },
  { id: "biru", label: "Biru Soft", card: "bg-blue-50 border-blue-200", dot: "bg-blue-300" },
  { id: "merah", label: "Merah Soft", card: "bg-rose-50 border-rose-200", dot: "bg-rose-300" },
  { id: "ungu", label: "Ungu Soft", card: "bg-purple-50 border-purple-200", dot: "bg-purple-300" },
];
const DEFAULT_WARNA = WARNA_OPTIONS[0].id;
const FALLBACK_CARD_STYLE = "bg-white border-slate-200"; // untuk catatan lama tanpa field warna

function loadCatatan() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
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
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function warnaCardClass(warnaId) {
  return WARNA_OPTIONS.find((w) => w.id === warnaId)?.card || FALLBACK_CARD_STYLE;
}

/**
 * Section "Catatan Hasil Rapat Tekhum" di Beranda — kartu-kartu disusun
 * mendatar (scroll horizontal), masing-masing punya tombol Edit & Hapus,
 * dan bisa diberi warna latar sesuai pilihan pengguna.
 */
export default function CatatanRapatSection() {
  const [catatan, setCatatan] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  // null = mode tambah baru; object = mode edit (berisi catatan yang diedit)
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    setCatatan(loadCatatan());
  }, []);

  function bukaFormTambah() {
    setEditTarget(null);
    setFormOpen(true);
  }

  function bukaFormEdit(note) {
    setEditTarget(note);
    setFormOpen(true);
  }

  function tutupForm() {
    setFormOpen(false);
    setEditTarget(null);
  }

  // Dipakai untuk mode tambah MAUPUN edit — dibedakan lewat ada/tidaknya `id`.
  function simpanCatatan(data) {
    setCatatan((prev) => {
      const next = data.id
        ? prev.map((c) => (c.id === data.id ? { ...c, ...data } : c))
        : [{ id: crypto.randomUUID?.() || String(Date.now()), ...data }, ...prev];
      saveCatatan(next);
      return next;
    });
    tutupForm();
  }

  function hapusCatatan(id, judul) {
    const yakin = window.confirm(`Apakah Anda yakin ingin menghapus catatan "${judul}"?`);
    if (!yakin) return;
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
          onClick={bukaFormTambah}
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
        <div className="flex gap-4 overflow-x-auto pb-2">
          {terurut.map((c) => (
            <div
              key={c.id}
              className={`group relative flex w-72 shrink-0 flex-col rounded-xl2 border p-5 ${warnaCardClass(c.warna)}`}
            >
              <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => bukaFormEdit(c)}
                  aria-label={`Edit catatan ${c.judul}`}
                  className="rounded-md p-1 text-slate-400 hover:bg-black/5 hover:text-ink-700"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => hapusCatatan(c.id, c.judul)}
                  aria-label={`Hapus catatan ${c.judul}`}
                  className="rounded-md p-1 text-slate-400 hover:bg-black/5 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarDays size={13} />
                {formatTanggal(c.tanggal)}
              </div>
              <h3 className="pr-10 text-sm font-semibold text-ink-900">{c.judul}</h3>
              <p className="mt-2 line-clamp-4 text-sm text-slate-600">{c.isi}</p>
            </div>
          ))}
        </div>
      )}

      {formOpen && <FormModal initial={editTarget} onClose={tutupForm} onSubmit={simpanCatatan} />}
    </div>
  );
}

// `initial`: null saat mode tambah baru, atau object catatan saat mode edit
// (form otomatis terisi/pre-filled dari data itu).
function FormModal({ initial, onClose, onSubmit }) {
  const isEdit = Boolean(initial);

  const [tanggal, setTanggal] = useState(initial?.tanggal || new Date().toISOString().slice(0, 10));
  const [judul, setJudul] = useState(initial?.judul || "");
  const [isi, setIsi] = useState(initial?.isi || "");
  const [warna, setWarna] = useState(initial?.warna || DEFAULT_WARNA);

  function handleSubmit(e) {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;
    onSubmit({
      id: initial?.id, // undefined saat tambah baru -> ditangani sebagai catatan baru
      tanggal,
      judul: judul.trim(),
      isi: isi.trim(),
      warna,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4">
      <div className="w-full max-w-lg rounded-xl2 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">
            {isEdit ? "Edit Catatan Rapat" : "Tambah Catatan Rapat"}
          </h2>
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

          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-500">Warna Kartu</span>
            <div className="flex flex-wrap gap-2">
              {WARNA_OPTIONS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWarna(w.id)}
                  title={w.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${w.dot} ${
                    warna === w.id ? "ring-2 ring-ink-700 ring-offset-2" : ""
                  }`}
                >
                  {warna === w.id && <Check size={15} className="text-ink-900" />}
                </button>
              ))}
            </div>
          </div>

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
              {isEdit ? "Simpan Perubahan" : "Simpan Catatan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
