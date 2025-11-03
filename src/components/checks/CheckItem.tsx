// src/components/checks/CheckItem.tsx
import React from "react";
import type { Check } from "../../types";
import { formatDate, daysBetween, isPast } from "../../utils/dateUtils";

type Props = {
  check: Check;
  onMarkNotified?: (check: Check) => void;
  onDelete?: (id: string) => void;
};

export default function CheckItem({ check, onMarkNotified, onDelete }: Props) {
  const days = daysBetween(check.dueDate);
  const past = isPast(check.dueDate);

  // رنگ سطر بر اساس ثبت شده / ثبت نشده
  const rowStyle: React.CSSProperties = {
    backgroundColor: check.registered ? "#d1fae5" : "#fee2e2", // سبز یا قرمز
    transition: "background-color 0.3s ease",
  };

  return (
    <tr style={rowStyle} className={past ? "past" : ""}>
      <td>{check.title || "-"}</td>
      <td>{check.checkNumber || "-"}</td>
      <td>{check.bankName || "-"}</td>
      <td>{check.branchCode || "-"}</td>
      <td>{check.branchName || "-"}</td>
      <td>{check.city || "-"}</td>
      <td>{formatDate(check.dueDate)}</td>
      <td className={`days-cell ${past ? "expired" : days <= 10 ? "warning" : "ok"}`}>
        {past ? `${Math.abs(days)} روز گذشته` : `${days} روز مانده`}
      </td>
      <td>{check.amount ? `${check.amount.toLocaleString()} ریال` : "-"}</td>
      <td>{check.notes || "-"}</td>

      {/* ستون کد صیادی فقط نمایش */}
      <td style={{ fontWeight: 500, color: "#1f2937" }}>{check.cediCode || "-"}</td>

      <td>
        <div className="actions">
          <button
            className={`btn notify ${check.notified ? "notified" : ""}`}
            onClick={() => onMarkNotified?.(check)}
            disabled={check.notified}
          >
            {check.notified ? "هشدار زده شد" : "علامت هشدار"}
          </button>
          <button className="btn delete" onClick={() => onDelete?.(check.id)}>
            حذف
          </button>
        </div>
      </td>
    </tr>
  );
}
