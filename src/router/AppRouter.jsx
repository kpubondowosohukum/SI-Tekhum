import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { flatNavigation } from "../config/navigation.js";
import LoadingScreen from "../components/ui/LoadingScreen.jsx";
import NotFoundPage from "../modules/dashboard/NotFoundPage.jsx";

const DocumentListPage = lazy(() => import("../modules/shared/DocumentListPage.jsx"));
const DataResultPage = lazy(() => import("../modules/shared/DataResultPage.jsx"));
const ExternalSystemPage = lazy(() => import("../modules/shared/ExternalSystemPage.jsx"));
const PlaceholderPage = lazy(() => import("../modules/shared/PlaceholderPage.jsx"));
const UnderDevelopmentPage = lazy(() => import("../modules/shared/UnderDevelopmentPage.jsx"));

// Peta type -> komponen template. Tambahkan tipe baru di sini kalau suatu
// saat butuh kategori template lain (mis. "chart", "kalender", dst).
const TEMPLATE_BY_TYPE = {
  dokumen: DocumentListPage,
  data: DataResultPage,
  sistem: ExternalSystemPage,
  placeholder: PlaceholderPage,
  developing: UnderDevelopmentPage,
};

/**
 * AppRouter tidak perlu diedit saat menambah sub-menu baru.
 * Untuk setiap item di `flatNavigation`:
 *  - Jika item punya `element` kustom (didaftarkan di navigation.js), pakai itu.
 *  - Jika tidak, pilih template generik berdasarkan `item.type`.
 *  - Item ditandai lewat prop `menu` sehingga template generik tahu
 *    label, deskripsi, dan meta data apa yang harus ditampilkan.
 */
export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {flatNavigation.map((item) => {
          const isCustom = Boolean(item.element);
          const Element = item.element ?? TEMPLATE_BY_TYPE[item.type] ?? PlaceholderPage;

          return (
            <Route
              key={item.id}
              path={item.path}
              element={isCustom ? <Element /> : <Element menu={item} />}
            />
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
