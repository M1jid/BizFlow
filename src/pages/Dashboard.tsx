// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../src/db";
import ProfitSummary from "../components/ProfitSummary";
import AlertsPanel from "../components/AlertsPanel";
import { formatDate } from "../utils/dateUtils";
import "./Dashboard.css";

export default function Dashboard() {
  const [checksCount, setChecksCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [latestChecks, setLatestChecks] = useState<any[]>([]);
  const [latestSales, setLatestSales] = useState<any[]>([]);

  async function load() {
    const ch = await db.getAllChecks();
    const sa = await db.getAllSales();
    setChecksCount(ch.length);
    setSalesCount(sa.length);
    setLatestChecks(
      ch.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
    );
    setLatestSales(
      sa.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
    );
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="stats-row">
        <div className="stat-card checks">
          <div className="stat-header">چک‌ها</div>
          <div className="stat-value">{checksCount}</div>
        </div>
        <div className="stat-card sales">
          <div className="stat-header">فروش‌ها</div>
          <div className="stat-value">{salesCount}</div>
        </div>
      </div>

      <div className="panels-row">
        <div className="panel-card">
          <h3>هشدارها</h3>
          <AlertsPanel />
        </div>

        <div className="panel-card">
          <h3>خلاصه سود و زیان</h3>
          <ProfitSummary />
        </div>
      </div>

      <div className="lists-row">
        <div className="list-card">
          <h4>آخرین چک‌ها</h4>
          <table>
            <thead>
              <tr>
                <th>عنوان</th>
                <th>تاریخ سررسید</th>
              </tr>
            </thead>
            <tbody>
              {latestChecks.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{formatDate(c.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="list-card">
          <h4>آخرین فروش‌ها</h4>
          <table>
            <thead>
              <tr>
                <th>محصول</th>
                <th>قیمت</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {latestSales.map((s) => (
                <tr key={s.id}>
                  <td>{s.productName}</td>
                  <td>{s.price.toLocaleString()} ریال</td>
                  <td>{formatDate(s.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
