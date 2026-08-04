/**
 * ============================================================================
 *  SI-TEKHUM — Backend Google Apps Script (versi scope minimal / least privilege)
 * ============================================================================
 *  Script ini SENGAJA dibatasi hanya boleh mengakses folder & spreadsheet
 *  yang dibuat oleh script ini sendiri — bukan seluruh Google Drive akun.
 *  Ini dicapai dengan scope OAuth "drive.file" (lihat appsscript.json),
 *  bukan scope "drive" penuh. Konsekuensinya: FOLDER_ID/SPREADSHEET_ID
 *  TIDAK diisi manual, melainkan dibuat otomatis oleh script saat pertama
 *  kali dijalankan, lalu disimpan di Script Properties.
 *
 *  Kenapa harus begini? Scope "drive.file" hanya mengizinkan akses ke
 *  file/folder yang "lahir" dari aplikasi ini. Kalau kita menunjuk folder
 *  lama yang dibuat manual lewat Drive UI, scope sempit ini akan menolak
 *  aksesnya (Error: permission denied) — itu justru bukti scope-nya benar2
 *  sempit, bukan bug.
 *
 *  SETELAH folder otomatis dibuat, Anda BEBAS memindahkannya ke lokasi lain
 *  di Drive lewat drag-and-drop biasa di Drive UI — itu aksi normal sebagai
 *  pemilik file, sama sekali tidak memengaruhi akses script (ID foldernya
 *  tidak berubah walau dipindah).
 *
 *  CARA PAKAI — lihat panduan lengkap di google-apps-script/README.md
 * ============================================================================
 */

const PROP = PropertiesService.getScriptProperties();
const SHEET_NAME = "Laporan Kinerja";
const FOLDER_NAME = "SI-Tekhum - Evidence Laporan Kinerja";
const SPREADSHEET_NAME = "LAPORAN KINERJA TEKHUM 2026";

const HEADER = [
  "NO", "TANGGAL INPUT", "SUB BAGIAN", "TUPOKSI", "DESKRIPSI TUGAS",
  "PIC", "TANGGAL MULAI", "TANGGAL SELESAI", "LINK EVIDENCE", "KETERANGAN",
];

/**
 * GET /exec?action=list   -> daftar semua laporan
 * GET /exec?action=status -> info folder & spreadsheet yang sedang dipakai
 *                            (untuk verifikasi setelah setup pertama kali)
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "list";

    if (action === "status") {
      const folder = getOrCreateFolder_();
      const sheet = getOrCreateSheet_();
      return jsonResponse_({
        success: true,
        folderName: folder.getName(),
        folderUrl: folder.getUrl(),
        spreadsheetUrl: sheet.getParent().getUrl(),
        scope: "drive.file (akses terbatas hanya pada folder & spreadsheet di atas)",
      });
    }

    const sheet = getOrCreateSheet_();
    const rows = sheet.getDataRange().getValues();
    const data = rows.slice(1).map((row) => rowToObject_(row));
    return jsonResponse_({ success: true, data });
  } catch (err) {
    return jsonResponse_({ success: false, message: String(err) });
  }
}

/**
 * POST /exec — tambah satu laporan baru (+ upload file evidence jika ada).
 * Body dikirim sebagai text/plain berisi JSON, lihat src/services/driveApi.js
 * di project React untuk detail kenapa (menghindari CORS preflight).
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    let linkEvidence = "";

    if (payload.fileBase64 && payload.fileName) {
      const folder = getOrCreateFolder_();
      const decoded = Utilities.base64Decode(payload.fileBase64);
      const blob = Utilities.newBlob(decoded, payload.fileMimeType || "application/octet-stream", payload.fileName);
      const file = folder.createFile(blob);
      // Supaya tombol "Buka Evidence" di website bisa langsung dibuka tanpa
      // pengguna perlu login Google.
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      linkEvidence = file.getUrl();
    }

    const sheet = getOrCreateSheet_();
    const nomorBaru = sheet.getLastRow(); // baris 1 = header

    const rowBaru = [
      nomorBaru,
      payload.tanggalInput || "",
      payload.subBagian || "",
      payload.tupoksi || "",
      payload.deskripsi || "",
      payload.pic || "",
      payload.tanggalMulai || "",
      payload.tanggalSelesai || "",
      linkEvidence,
      payload.keterangan || "",
    ];

    sheet.appendRow(rowBaru);

    return jsonResponse_({ success: true, data: rowToObject_(rowBaru) });
  } catch (err) {
    return jsonResponse_({ success: false, message: String(err) });
  }
}

// --- Fungsi bantu: dapatkan folder/sheet yang SUDAH dibuat script ini,
//     atau buat baru kalau ini pertama kalinya dijalankan. ---

function getOrCreateFolder_() {
  const savedId = PROP.getProperty("EVIDENCE_FOLDER_ID");
  if (savedId) {
    try {
      return DriveApp.getFolderById(savedId);
    } catch (err) {
      // ID tersimpan tapi foldernya sudah tidak bisa diakses (mis. dihapus
      // permanen) -> buat folder baru di bawah ini.
    }
  }
  const folder = DriveApp.createFolder(FOLDER_NAME);
  PROP.setProperty("EVIDENCE_FOLDER_ID", folder.getId());
  return folder;
}

function getOrCreateSheet_() {
  const savedId = PROP.getProperty("SPREADSHEET_ID");
  let ss;

  if (savedId) {
    try {
      ss = SpreadsheetApp.openById(savedId);
    } catch (err) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create(SPREADSHEET_NAME);
    PROP.setProperty("SPREADSHEET_ID", ss.getId());
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight("bold").setBackground("#173404").setFontColor("#ffffff");
  }
  return sheet;
}

function rowToObject_(row) {
  return {
    no: row[0],
    tanggalInput: row[1],
    subBagian: row[2],
    tupoksi: row[3],
    deskripsi: row[4],
    pic: row[5],
    tanggalMulai: row[6],
    tanggalSelesai: row[7],
    linkEvidence: row[8],
    keterangan: row[9],
  };
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
