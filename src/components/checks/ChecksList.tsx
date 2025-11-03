import React from "react";
import type { Check } from "../../types";
import { db } from "../../../src/db";
import CheckItem from "./CheckItem";
import "./ChecksList.css";

export default function ChecksList({
  checks,
  onChange,
}: {
  checks: Check[];
  onChange?: () => void;
}) {
  async function remove(id: string) {
    if (!confirm("آیا مطمئن هستید؟")) return;
    await db.deleteCheck(id);
    onChange?.();
  }

  async function markNotified(item: Check) {
    item.notified = true;
    await db.putCheck(item);
    onChange?.();
  }

  return (
    <div className="checks-container">
      <table className="checks-table">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>شماره چک</th>
            <th>بانک</th>
            <th>کد شعبه</th>
            <th>نام شعبه</th>
            <th>شهر</th>
            <th>تاریخ سررسید</th>
            <th>روز مانده</th>
            <th>مبلغ</th>
            <th>یادداشت</th>
            <th>کد صیادی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {checks
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .map((c) => (
              <CheckItem
                key={c.id}
                check={c}
                onMarkNotified={markNotified}
                onDelete={remove}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
