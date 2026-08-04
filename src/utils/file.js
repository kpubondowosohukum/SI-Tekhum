/**
 * Mengubah File (dari <input type="file">) menjadi string base64 murni
 * (tanpa prefix "data:mime/type;base64,"), siap dikirim ke Google Apps Script.
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const base64 = String(result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

// Batas ukuran file evidence (aman untuk Google Apps Script berbasis base64).
export const MAX_FILE_SIZE_MB = 20;
