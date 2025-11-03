import React, { useEffect, useState } from "react";
import { db } from "../../src/db";

export default function ProfitSummary() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [profit, setProfit] = useState(0);

  async function calc() {
    const sales = await db.getAllSales();
    let rev = 0;
    let cost = 0;
    for (const s of sales) {
      const q = Number(s.quantity ?? 1);
      const p = Number(s.price ?? 0);
      const c = Number(s.cost ?? 0);
      rev += p * q;
      cost += c * q;
    }
    setTotalRevenue(rev);
    setTotalCost(cost);
    setProfit(rev - cost);
  }

  useEffect(() => {
    calc();
  }, []);

  return (
    <div style={{ direction: "rtl", fontFamily: "Tahoma, Arial, sans-serif" }}>
      <div className="row" style={{ display: "flex", gap: "12px" }}>
        <div className="col card" style={{ flex: 1, padding: "12px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="small" style={{ color: "#555", marginBottom: "4px" }}>جمع فروش</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{totalRevenue.toLocaleString()} تومان</div>
        </div>

        <div className="col card" style={{ flex: 1, padding: "12px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="small" style={{ color: "#555", marginBottom: "4px" }}>جمع هزینه</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{totalCost.toLocaleString()} تومان</div>
        </div>

        <div className="col card" style={{ flex: 1, padding: "12px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="small" style={{ color: "#555", marginBottom: "4px" }}>سود / زیان</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: profit >= 0 ? "#065f46" : "#b91c1c" }}>
            {profit.toLocaleString()} تومان
          </div>
        </div>
      </div>
    </div>
  );
}
