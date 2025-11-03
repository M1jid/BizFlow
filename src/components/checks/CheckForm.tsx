import React, { useState } from "react";
import { db } from "../../../src/db";
import type { Check } from "../../types";
import { todayISO } from "../../utils/dateUtils";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function CheckForm({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState("");
  const [cediCode, setCediCode] = useState(""); // کد صیادی
  const [registered, setRegistered] = useState(false); // وضعیت ثبت شده / ثبت نشده

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const item: Check = {
      id: uid(),
      title: title || "چک جدید",
      checkNumber,
      bankName,
      branchCode,
      branchName,
      city,
      amount: Number(amount) || 0,
      dueDate: new Date(dueDate).toISOString(),
      notes,
      cediCode,
      registered, // ذخیره وضعیت
      createdAt: todayISO(),
      notified: false,
    };
    await db.addCheck(item);

    // ریست فرم
    setTitle("");
    setCheckNumber("");
    setBankName("");
    setBranchCode("");
    setBranchName("");
    setCity("");
    setAmount("");
    setNotes("");
    setDueDate(new Date().toISOString().slice(0, 10));
    setCediCode("");
    setRegistered(false);
    onSaved?.();
  }

  return (
    <form onSubmit={submit} className="check-form">
      <div className="form-grid">
        <input
          className="input"
          placeholder="عنوان چک"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="شماره چک"
          value={checkNumber}
          onChange={(e) => setCheckNumber(e.target.value)}
        />
        <input
          className="input"
          placeholder="نام بانک"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <input
          className="input"
          placeholder="کد شعبه"
          value={branchCode}
          onChange={(e) => setBranchCode(e.target.value)}
        />
        <input
          className="input"
          placeholder="نام شعبه"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
        />
        <input
          className="input"
          placeholder="شهر"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="مبلغ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          className="input"
          placeholder="کد صیادی"
          value={cediCode}
          onChange={(e) => setCediCode(e.target.value)}
        />

        {/* وضعیت ثبت شده / ثبت نشده */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            id="registered"
            checked={registered}
            onChange={(e) => setRegistered(e.target.checked)}
          />
          <label htmlFor="registered">
            {registered ? "ثبت شده" : "ثبت نشده"}
          </label>
        </div>
      </div>

      <textarea
        className="input textarea"
        placeholder="یادداشت (اختیاری)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="btn" type="submit">
        افزودن چک
      </button>

      <style jsx>{`
        .check-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
          font-family: Vazirmatn, sans-serif;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 8px;
          align-items: center;
        }
        .input {
          padding: 8px 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }
        .textarea {
          resize: vertical;
          min-height: 60px;
        }
        .btn {
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          background-color: #2563eb;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn:hover {
          background-color: #1d4ed8;
        }
      `}</style>
    </form>
  );
}
