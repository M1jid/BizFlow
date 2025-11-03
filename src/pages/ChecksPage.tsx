import React, { useEffect, useState } from "react";
import CheckForm from "../components/checks/CheckForm";
import CheckTable from "../components/checks/CheckTable"; // ← این رو ایمپورت کن
import { db } from "../../src/db";
import type { Check } from "../types";

export default function ChecksPage() {
  const [checks, setChecks] = useState<Check[]>([]);

  async function load() {
    const allChecks = await db.getAllChecks();
    setChecks(allChecks);
  }

  // حذف چک
  async function remove(id: string) {
    if (!confirm("آیا مطمئن هستید؟")) return;
    await db.deleteCheck(id);
    load();
  }

  // علامت هشدار زدن
  async function markNotified(check: Check) {
    check.notified = true;
    await db.putCheck(check);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="card">
        <h3>ثبت / ویرایش چک</h3>
        <CheckForm onSaved={load} />
      </div>

      <div className="card">
        <h3>لیست چک‌ها</h3>
        <CheckTable
          checks={checks} 
          onDelete={remove} 
          onMarkNotified={markNotified} 
        />
      </div>
    </div>
  );
}
