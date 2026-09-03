import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { registerServiceWorker } from "./registerServiceWorker.js";
import "./index.css";

// HashRouter dipakai secara sengaja (bukan BrowserRouter):
// GitHub Pages menyajikan file statis tanpa rewrite server-side, sehingga
// URL seperti /teknis/simulasi-dapil akan 404 jika di-refresh langsung
// menggunakan BrowserRouter. HashRouter (contoh: #/teknis/simulasi-dapil)
// selalu berhasil di-refresh di GitHub Pages, Vercel, Netlify, maupun folder statis biasa,
// tanpa perlu konfigurasi rewrite tambahan.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

registerServiceWorker();
