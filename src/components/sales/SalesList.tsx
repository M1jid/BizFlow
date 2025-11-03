import React, { useEffect, useState } from "react";
import { db } from "../../../src/db";
import { formatDate } from "../../utils/dateUtils";

export default function SalesList({ reloadSignal }: { reloadSignal?: number }) {
  const [sales, setSales] = useState<any[]>([]);

  async function load() {
    setSales(await db.getAllSales());
  }

  useEffect(() => {
    load();
  }, [reloadSignal]);

  async function remove(id: string) {
    if (!confirm("آیا مطمئن هستید که می‌خواهید حذف شود؟")) return;
    await db.deleteSale(id);
    load();
  }

  return (
    <div style={{ overflowX: "auto", direction: "rtl" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
        <thead className="small" style={{ background: "#f3f4f6" }}>
          <tr>
            <th style={{ padding: "8px" }}>نام محصول</th>
            <th style={{ padding: "8px" }}>قیمت فروش</th>
            <th style={{ padding: "8px" }}>هزینه</th>
            <th style={{ padding: "8px" }}>تعداد</th>
            <th style={{ padding: "8px" }}>تاریخ</th>
            <th style={{ padding: "8px" }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((s) => (
              <tr
                key={s.id}
                style={{
                  borderTop: "1px solid #eee",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "6px" }}>{s.productName}</td>
                <td style={{ padding: "6px" }}>{s.price.toLocaleString()}</td>
                <td style={{ padding: "6px" }}>{s.cost ? s.cost.toLocaleString() : "-"}</td>
                <td style={{ padding: "6px" }}>{s.quantity ?? 1}</td>
                <td style={{ padding: "6px" }}>{formatDate(s.date)}</td>
                <td style={{ padding: "6px" }}>
                  <button
                    className="btn"
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
                    onClick={() => remove(s.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
