import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { flatNavigation } from "../config/navigation.js";
import PageLoader from "../components/ui/PageLoader.jsx";
import NotFoundPage from "../modules/dashboard/NotFoundPage.jsx";

/**
 * AppRouter tidak perlu diedit ketika menambah fitur baru.
 * Ia hanya membaca `flatNavigation` dari config/navigation.js dan
 * men-generate <Route> secara otomatis untuk setiap item yang terdaftar.
 */
export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {flatNavigation.map(({ id, path, element: Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
