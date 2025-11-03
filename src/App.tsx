import './index.css';
import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import ChecksPage from "./pages/ChecksPage";
import SalesPage from "./pages/SalesPage";

export default function App() {
  const [route, setRoute] = useState<"dashboard"|"checks"|"sales">("dashboard");

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "1") setRoute("dashboard");
      if (e.ctrlKey && e.key === "2") setRoute("checks");
      if (e.ctrlKey && e.key === "3") setRoute("sales");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="container">
      <header className="card row" style={{justifyContent:"space-between", alignItems:"center"}}>
        <h2>سامانه مدیریت چک و فروش</h2>
        <nav>
          <button className="btn" onClick={() => setRoute("dashboard")} style={{marginRight:8}}>داشبورد</button>
          <button className="btn" onClick={() => setRoute("checks")} style={{marginRight:8}}>چک‌ها</button>
          <button className="btn" onClick={() => setRoute("sales")}>فروش‌ها</button>
        </nav>
      </header>

      {route === "dashboard" && <Dashboard />}
      {route === "checks" && <ChecksPage />}
      {route === "sales" && <SalesPage />}
    </div>
  );
}
