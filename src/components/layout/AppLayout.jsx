import TopNav from "./TopNav.jsx";
import AppRouter from "../../router/AppRouter.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AppRouter />
        </div>
      </main>

      <footer className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
        SI-Tekhum · Subbagian Teknis dan Hukum, KPU Kabupaten — dikelola melalui repositori GitHub
      </footer>
    </div>
  );
}
