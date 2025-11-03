import React, { useState } from "react";
import type { Check } from "../../types";
import CheckItem from "./CheckItem";
import "./ChecksList.css"; // اضافه کن به بالای CheckTable.tsx


type Props = {
  checks?: Check[]; // optional now
  onMarkNotified?: (check: Check) => void;
  onDelete?: (id: string) => void;
};

export default function CheckTable({ checks = [], onMarkNotified, onDelete }: Props) {
  const [titleFilter, setTitleFilter] = useState("");
  const [bankFilter, setBankFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [cediFilter, setCediFilter] = useState("");
  const [registeredFilter, setRegisteredFilter] = useState<"all" | "registered" | "unregistered">("all");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");

  const filteredChecks = checks
    .filter((c) => c.title?.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter((c) => c.bankName?.toLowerCase().includes(bankFilter.toLowerCase()))
    .filter((c) => c.city?.toLowerCase().includes(cityFilter.toLowerCase()))
    .filter((c) => c.cediCode?.toLowerCase().includes(cediFilter.toLowerCase()))
    .filter((c) =>
      registeredFilter === "all" ? true :
      registeredFilter === "registered" ? c.registered :
      !c.registered
    )
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="checks-container">
      {/* فیلترها */}
      <div className="filters" style={{ marginBottom: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input placeholder="فیلتر بر اساس عنوان" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
        <input placeholder="فیلتر بر اساس بانک" value={bankFilter} onChange={(e) => setBankFilter(e.target.value)} />
        <input placeholder="فیلتر بر اساس شهر" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
        <input placeholder="فیلتر بر اساس کد صیادی" value={cediFilter} onChange={(e) => setCediFilter(e.target.value)} />
        <select value={registeredFilter} onChange={(e) => setRegisteredFilter(e.target.value as any)}>
          <option value="all">همه</option>
          <option value="registered">ثبت شده</option>
          <option value="unregistered">ثبت نشده</option>
        </select>
        <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value as any)}>
          <option value="asc">تاریخ نزدیک‌تر</option>
          <option value="desc">تاریخ دورتر</option>
        </select>
      </div>

      {/* جدول */}
      <table className="checks-table">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>شماره چک</th>
            <th>نام بانک</th>
            <th>کد شعبه</th>
            <th>نام شعبه</th>
            <th>شهر</th>
            <th>تاریخ سررسید</th>
            <th>روز باقی‌مانده</th>
            <th>مبلغ</th>
            <th>یادداشت</th>
            <th>کد صیادی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredChecks.map((check) => (
            <CheckItem key={check.id || Math.random()} check={check} onMarkNotified={onMarkNotified} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
