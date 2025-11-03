import React, { useEffect, useState } from "react";
import { db } from "../../src/db";
import type { Check } from "../types";
import { daysBetween } from "../utils/dateUtils";
import { useInterval } from "../utils/useInterval";

const THRESHOLD_DAYS = 10;

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<(Check & { daysLeft: number })[]>([]);

  // بارگذاری هشدارها
  async function checkAlerts() {
    const checks = await db.getAllChecks();
    const upcoming = checks
      .map(c => ({ ...c, daysLeft: daysBetween(c.dueDate) }))
      .filter(c => !c.notified && c.daysLeft <= THRESHOLD_DAYS)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    setAlerts(upcoming);

    // ارسال Notification (فقط اگر اجازه داده شده باشد)
    if ("Notification" in window && Notification.permission === "granted") {
      upcoming.slice(0, 3).forEach(c => {
        new Notification("هشدار چک", {
          body: `${c.title} — ${c.daysLeft > 0 ? `${c.daysLeft} روز مانده` : `${Math.abs(c.daysLeft)} روز گذشته`}`,
        });
      });
    }
  }

  // علامت گذاری هشدار به عنوان دیده شده
  async function markNotified(check: Check) {
    check.notified = true;
    await db.putCheck(check);
    checkAlerts(); // بروزرسانی هشدارها
  }

  useEffect(() => {
    // درخواست مجوز Notification
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    checkAlerts();
  }, []);

  // بررسی هشدار هر دقیقه
  useInterval(checkAlerts, 60 * 1000);

  return (
    <div className="alerts-panel">
      {alerts.length === 0 ? (
        <div className="small">هشدار فعال نیست.</div>
      ) : (
        <ul>
          {alerts.map(a => (
            <li
              key={a.id}
              className={
                a.daysLeft < 0
                  ? "expired"
                  : a.daysLeft <= 3
                  ? "urgent"
                  : "warning"
              }
            >
              <div className="alert-content">
                <span>
                  <strong>{a.title}</strong> —{" "}
                  {a.daysLeft > 0
                    ? `${a.daysLeft} روز مانده`
                    : `${Math.abs(a.daysLeft)} روز گذشته`}
                </span>
                <button className="btn mark" onClick={() => markNotified(a)}>
                  علامت زده شد
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* استایل داخلی حرفه‌ای */}
      <style>{`
        .alerts-panel ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .alerts-panel li {
          padding: 10px 12px;
          margin-bottom: 6px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.1s, box-shadow 0.1s;
        }

        .alerts-panel li:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .alerts-panel li.warning {
          background: #fef3c7; /* زرد روشن */
          color: #b45309;
        }

        .alerts-panel li.urgent {
          background: #fee2e2; /* قرمز روشن */
          color: #b91c1c;
          font-weight: bold;
        }

        .alerts-panel li.expired {
          background: #fef2f2; /* خاکستری/قرمز کم رنگ */
          color: #7f1d1d;
          font-style: italic;
        }

        .alerts-panel .small {
          color: #6b7280;
          font-size: 13px;
        }

        .alerts-panel .alert-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .alerts-panel .btn.mark {
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 13px;
          transition: background 0.2s, transform 0.1s;
        }

        .alerts-panel .btn.mark:hover {
          background: #1e3a8a;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
