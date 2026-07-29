import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import AppRouter from "../../router/AppRouter.jsx";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AppRouter />
          </div>
        </main>
        <footer className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
          SI-Tekhum · Subbagian Teknis dan Hukum, KPU Kabupaten — dikelola melalui repositori GitHub
        </footer>
      </div>
    </div>
  );
}
