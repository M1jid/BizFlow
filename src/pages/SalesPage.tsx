import React, { useState } from "react";
import SaleForm from "../components/sales/SaleForm";
import SalesList from "../components/sales/SalesList";
import ProfitSummary from "../components/ProfitSummary";

export default function SalesPage() {
  const [reloader, setReloader] = useState(0);

  return (
    <div className="container" style={{ padding: "16px", direction: "rtl", fontFamily: "Tahoma, Arial, sans-serif" }}>
      {/* هدر صفحه */}
      <header className="page-header" style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "24px" }}>مدیریت فروش و هزینه‌ها</h2>
      </header>

      {/* فرم ثبت فروش / هزینه */}
      <section className="card" style={{ padding: "16px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "12px" }}>ثبت فروش / هزینه</h3>
        <SaleForm onSaved={() => setReloader(r => r + 1)} />
      </section>

      {/* لیست فاکتورها */}
      <section className="card" style={{ padding: "16px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "12px" }}>فاکتور‌ها / فروش‌ها</h3>
        <SalesList reloadSignal={reloader} />
      </section>

      {/* خلاصه سود و زیان */}
      <section className="card" style={{ padding: "16px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "12px" }}>خلاصه سود / زیان</h3>
        <ProfitSummary />
      </section>
    </div>
  );
}
