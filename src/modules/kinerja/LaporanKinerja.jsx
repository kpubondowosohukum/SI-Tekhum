import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  ExternalLink,
  X,
  SlidersHorizontal,
  Paperclip,
  Loader2,
  CloudOff,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import { isGoogleDriveConfigured } from "../../config/integrations.js";
import { fetchLaporanKinerja, fetchStorageStatus, submitLaporanKinerja } from "../../services/driveApi.js";
import { fileToBase64, MAX_FILE_SIZE_MB } from "../../utils/file.js";

/**
 * ============================================================================
 *  LAPORAN KINERJA — tersambung ke Google Drive & Google Sheets
 * ============================================================================
 *  - Saat halaman dibuka, data diambil dari Google Sheets lewat Google Apps
 *    Script (lihat src/services/driveApi.js + google-apps-script/Code.gs).
 *  - Saat "Tambah Laporan Baru" disimpan, file evidence (Word/PDF/gambar)
 *    otomatis di-upload ke folder Google Drive, dan satu baris baru
 *    ditambahkan ke Google Sheets — keduanya lewat Apps Script yang sama,
 *    TANPA pengguna perlu login akun Google (sesuai Opsi A).
 *  - Kalau VITE_GOOGLE_SCRIPT_URL belum diisi di .env, halaman ini otomatis
 *    jatuh ke data contoh (dummy) supaya tampilan tetap bisa di-preview,
 *    lengkap dengan pemberitahuan bahwa koneksi belum aktif.
 *
 *  Panduan setup lengkap: google-apps-script/README.md
 * ============================================================================
 */

const dataDummy = [
  {
    no: 1, tanggalInput: "8-Jan-2026", subBagian: "HUKUM",
    tupoksi: "Penyusunan Produk Hukum",
    deskripsi: "Menyusun draft SK Penetapan PPK dan PPS Kabupaten",
    pic: "FIRLIA DCR", tanggalMulai: "1/1/2026", tanggalSelesai: "8/1/2026",
    linkEvidence: "https://drive.google.com/drive/folders/contoh-evidence-1",
    keterangan: "Firlia DCR, Rohimatul H",
  },
  {
    no: 2, tanggalInput: "9-Jan-2026", subBagian: "TEKNIS",
    tupoksi: "Pemutakhiran Data Pemilih",
    deskripsi: "Verifikasi faktual data pemilih hasil pencocokan",
    pic: "DIAH AW", tanggalMulai: "2/1/2026", tanggalSelesai: "10/1/2026",
    linkEvidence: "https://drive.google.com/drive/folders/contoh-evidence-2",
    keterangan: "Diah AW, M Ilyas PA",
  },
  {
    no: 3, tanggalInput: "12-Jan-2026", subBagian: "LAINNYA",
    tupoksi: "Administrasi Umum",
    deskripsi: "Pengarsipan surat masuk dan keluar bulan Januari",
    pic: "MULYADI", tanggalMulai: "5/1/2026", tanggalSelesai: "12/1/2026",
    linkEvidence: "", keterangan: "Mulyadi",
  },
  {
    no: 4, tanggalInput: "14-Jan-2026", subBagian: "HUKUM",
    tupoksi: "Fasilitasi Sengketa Proses",
    deskripsi: "Menyusun tanggapan atas gugatan sengketa pencalonan",
    pic: "A PUGUH H", tanggalMulai: "10/1/2026", tanggalSelesai: "14/1/2026",
    linkEvidence: "https://drive.google.com/drive/folders/contoh-evidence-4",
    keterangan: "A Puguh H, Firlia DCR",
  },
  {
    no: 5, tanggalInput: "16-Jan-2026", subBagian: "TEKNIS",
    tupoksi: "Penetapan Dapil",
    deskripsi: "Kajian teknis penataan daerah pemilihan kabupaten",
    pic: "M ILYAS PA", tanggalMulai: "12/1/2026", tanggalSelesai: "16/1/2026",
    linkEvidence: "https://drive.google.com/drive/folders/contoh-evidence-5",
    keterangan: "M Ilyas PA, Diah AW",
  },
];

const subBagianStyle = {
  HUKUM: "bg-amber-100 text-amber-800",
  TEKNIS: "bg-slate-200 text-slate-700",
  LAINNYA: "bg-emerald-100 text-emerald-700",
};

const picPalette = [
  "bg-emerald-800", "bg-blue-800", "bg-orange-700", "bg-rose-800",
  "bg-teal-800", "bg-indigo-800", "bg-amber-700", "bg-purple-800", "bg-cyan-800",
];

function picColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return picPalette[Math.abs(hash) % picPalette.length];
}

const emptyForm = {
  tanggalInput: "", subBagian: "HUKUM", tupoksi: "", deskripsi: "", pic: "",
  tanggalMulai: "", tanggalSelesai: "", keterangan: "",
};

export default function LaporanKinerja() {
  const [data, setData] = useState(dataDummy);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [usingDummy, setUsingDummy] = useState(!isGoogleDriveConfigured);

  const [search, setSearch] = useState("");
  const [filterSubBagian, setFilterSubBagian] = useState("Semua");
  const [filterPic, setFilterPic] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusError, setStatusError] = useState("");

  async function cekStatusPenyimpanan() {
    setStatusOpen(true);
    setStatusError("");
    try {
      const hasil = await fetchStorageStatus();
      setStatus(hasil);
    } catch (err) {
      setStatusError(err.message);
    }
  }

  async function muatData() {
    if (!isGoogleDriveConfigured) {
      setUsingDummy(true);
      return;
    }
    setLoading(true);
    setLoadError("");
    try {
      const hasil = await fetchLaporanKinerja();
      setData(hasil.length > 0 ? hasil : dataDummy);
      setUsingDummy(hasil.length === 0);
    } catch (err) {
      setLoadError(err.message);
      setUsingDummy(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    muatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const daftarPic = useMemo(
    () => ["Semua", ...Array.from(new Set(data.map((d) => d.pic)))],
    [data]
  );

  const hasil = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((d) => {
      const cocokCari =
        !q ||
        d.deskripsi.toLowerCase().includes(q) ||
        d.pic.toLowerCase().includes(q) ||
        d.tupoksi.toLowerCase().includes(q);
      const cocokSubBagian = filterSubBagian === "Semua" || d.subBagian === filterSubBagian;
      const cocokPic = filterPic === "Semua" || d.pic === filterPic;
      return cocokCari && cocokSubBagian && cocokPic;
    });
  }, [data, search, filterSubBagian, filterPic]);

  function handleExportCSV() {
    const header = [
      "NO", "TANGGAL INPUT", "SUB BAGIAN", "TUPOKSI", "DESKRIPSI TUGAS",
      "PIC", "TANGGAL MULAI", "TANGGAL SELESAI", "LINK EVIDENCE", "KETERANGAN",
    ];
    const baris = hasil.map((d) => [
      d.no, d.tanggalInput, d.subBagian, d.tupoksi, d.deskripsi,
      d.pic, d.tanggalMulai, d.tanggalSelesai, d.linkEvidence, d.keterangan,
    ]);
    const csv = [header, ...baris]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan-kinerja-tekhum-2026.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader
        eyebrow="Kinerja"
        title="Laporan Kinerja"
        description="Rekapitulasi laporan kinerja harian Subbagian Teknis dan Hukum tahun 2026."
        actions={
          <div className="flex gap-2">
            <button
              onClick={muatData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Muat Ulang
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 hover:bg-slate-50"
            >
              <Download size={16} />
              Export Data
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-600"
            >
              <Plus size={16} />
              Tambah Laporan Baru
            </button>
          </div>
        }
      />

      {usingDummy && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <CloudOff size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Belum tersambung ke Google Drive/Sheets</p>
            <p className="mt-0.5 text-xs text-amber-700">
              {loadError ||
                "VITE_GOOGLE_SCRIPT_URL belum diisi di file .env. Tabel di bawah menampilkan data contoh."}{" "}
              Ikuti panduan di{" "}
              <code className="rounded bg-white/60 px-1">google-apps-script/README.md</code> untuk
              mengaktifkan penyimpanan permanen.
            </p>
          </div>
        </div>
      )}

      {!usingDummy && (
        <div className="mb-4">
          <button
            onClick={cekStatusPenyimpanan}
            className="flex items-center gap-1.5 text-xs font-medium text-ink-600 hover:underline"
          >
            <ShieldCheck size={14} />
            Cek folder Drive yang sedang dipakai
          </button>

          {statusOpen && (
            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              {statusError && <p className="text-red-600">{statusError}</p>}
              {!statusError && !status && <p>Memuat status penyimpanan...</p>}
              {status && (
                <div className="space-y-1">
                  <p>
                    <span className="font-medium text-slate-700">Folder evidence:</span>{" "}
                    <a href={status.folderUrl} target="_blank" rel="noopener noreferrer" className="text-ink-700 hover:underline">
                      {status.folderName}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Spreadsheet:</span>{" "}
                    <a href={status.spreadsheetUrl} target="_blank" rel="noopener noreferrer" className="text-ink-700 hover:underline">
                      Buka di Google Sheets
                    </a>
                  </p>
                  <p className="text-slate-400">Scope akses: {status.scope}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari deskripsi tugas, tupoksi, atau nama PIC..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-ink-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="hidden shrink-0 text-slate-400 sm:block" />
            <select
              value={filterSubBagian}
              onChange={(e) => setFilterSubBagian(e.target.value)}
              className="rounded-lg border border-slate-200 py-2.5 px-3 text-sm text-slate-600 focus:border-ink-500"
            >
              {["Semua", "HUKUM", "TEKNIS", "LAINNYA"].map((s) => (
                <option key={s} value={s}>{s === "Semua" ? "Semua Sub Bagian" : s}</option>
              ))}
            </select>

            <select
              value={filterPic}
              onChange={(e) => setFilterPic(e.target.value)}
              className="rounded-lg border border-slate-200 py-2.5 px-3 text-sm text-slate-600 focus:border-ink-500"
            >
              {daftarPic.map((p) => (
                <option key={p} value={p}>{p === "Semua" ? "Semua PIC" : p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead>
              <tr className="bg-green-900 text-xs font-bold uppercase tracking-wide text-white">
                <Th className="w-12">No</Th>
                <Th>Tanggal Input</Th>
                <Th>Sub Bagian</Th>
                <Th>Tupoksi</Th>
                <Th className="min-w-[220px]">Deskripsi Tugas</Th>
                <Th>PIC</Th>
                <Th>Tanggal Mulai</Th>
                <Th>Tanggal Selesai</Th>
                <Th>Link Evidence</Th>
                <Th className="min-w-[160px]">Keterangan</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={10} className="py-10 text-center text-sm text-slate-400">
                    <Loader2 size={18} className="mx-auto mb-2 animate-spin" />
                    Memuat data dari Google Sheets...
                  </td>
                </tr>
              )}
              {!loading && hasil.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-sm text-slate-400">
                    Tidak ada laporan yang cocok dengan pencarian/filter.
                  </td>
                </tr>
              )}
              {!loading && hasil.map((d) => (
                <tr key={d.no} className="align-top hover:bg-slate-50">
                  <Td className="font-medium text-slate-500">{d.no}</Td>
                  <Td className="whitespace-nowrap">{d.tanggalInput}</Td>
                  <Td>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${subBagianStyle[d.subBagian] ?? "bg-slate-100 text-slate-600"}`}>
                      {d.subBagian}
                    </span>
                  </Td>
                  <Td className="text-slate-600">{d.tupoksi}</Td>
                  <Td className="text-slate-700">{d.deskripsi}</Td>
                  <Td>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold text-white ${picColor(d.pic)}`}>
                      {d.pic}
                    </span>
                  </Td>
                  <Td className="whitespace-nowrap text-slate-500">{d.tanggalMulai}</Td>
                  <Td className="whitespace-nowrap text-slate-500">{d.tanggalSelesai}</Td>
                  <Td>
                    {d.linkEvidence ? (
                      <a
                        href={d.linkEvidence}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-ink-700 hover:bg-slate-50"
                      >
                        <ExternalLink size={13} />
                        Buka Evidence
                      </a>
                    ) : (
                      <span className="text-xs text-slate-300">Belum ada</span>
                    )}
                  </Td>
                  <Td className="text-slate-500">{d.keterangan}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Menampilkan {hasil.length} dari {data.length} laporan.{" "}
          {usingDummy
            ? "Data contoh — belum tersambung ke Google Sheets."
            : "Data langsung dari Google Sheets."}
        </p>
      </Card>

      {modalOpen && (
        <FormModal
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            muatData();
          }}
        />
      )}
    </>
  );
}

function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 first:pl-5 last:pr-5 ${className}`}>{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 first:pl-5 last:pr-5 ${className}`}>{children}</td>;
}

function FormModal({ onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return setFile(null);
    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran file melebihi ${MAX_FILE_SIZE_MB}MB. Pilih file yang lebih kecil.`);
      return;
    }
    setError("");
    setFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let fileData = {};
      if (file) {
        const base64 = await fileToBase64(file);
        fileData = { fileName: file.name, fileMimeType: file.type, fileBase64: base64 };
      }

      if (!isGoogleDriveConfigured) {
        throw new Error(
          "VITE_GOOGLE_SCRIPT_URL belum dikonfigurasi. Ikuti google-apps-script/README.md terlebih dahulu."
        );
      }

      await submitLaporanKinerja({ ...form, ...fileData });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl2 bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">Tambah Laporan Baru</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Tanggal Input" placeholder="contoh: 25-Jan-2026" value={form.tanggalInput} onChange={(v) => update("tanggalInput", v)} required />

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Sub Bagian</span>
            <select
              value={form.subBagian}
              onChange={(e) => update("subBagian", e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
            >
              {["HUKUM", "TEKNIS", "LAINNYA"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <Field label="Tupoksi" value={form.tupoksi} onChange={(v) => update("tupoksi", v)} required />
          <Field label="Deskripsi Tugas" value={form.deskripsi} onChange={(v) => update("deskripsi", v)} textarea required />
          <Field label="PIC" placeholder="contoh: FIRLIA DCR" value={form.pic} onChange={(v) => update("pic", v)} required />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal Mulai" placeholder="1/1/2026" value={form.tanggalMulai} onChange={(v) => update("tanggalMulai", v)} />
            <Field label="Tanggal Selesai" placeholder="1/1/2026" value={form.tanggalSelesai} onChange={(v) => update("tanggalSelesai", v)} />
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              File Evidence (Word/PDF/gambar — opsional, otomatis ter-upload ke Google Drive)
            </span>
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm text-slate-500">
              <Paperclip size={16} className="shrink-0" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-ink-700 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-ink-600"
              />
            </div>
            {file && <p className="mt-1 text-xs text-slate-400">Dipilih: {file.name}</p>}
          </label>

          <Field label="Keterangan" value={form.keterangan} onChange={(v) => update("keterangan", v)} />

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
          )}

          {!isGoogleDriveConfigured && !error && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Google Drive/Sheets belum tersambung — laporan tidak akan tersimpan permanen sampai{" "}
              <code className="rounded bg-white/60 px-1">VITE_GOOGLE_SCRIPT_URL</code> diisi.
            </p>
          )}

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
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-4 py-2 text-sm font-medium text-white hover:bg-ink-600 disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving ? "Menyimpan..." : "Simpan Laporan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, textarea }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={2}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-ink-500"
        />
      )}
    </label>
  );
}
