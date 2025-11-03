import React, { useState } from "react";
import { db } from "../../../src/db";
import { todayISO } from "../../utils/dateUtils";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function SaleForm({ onSaved }: { onSaved?: () => void }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<string>(""); // نگهداری به صورت string برای placeholder
  const [cost, setCost] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [quantity, setQuantity] = useState<string>("1");

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const item = {
      id: uid(),
      productName: productName || "بدون نام",
      price: Number(price) || 0,
      cost: Number(cost) || 0,
      date: new Date(date).toISOString(),
      quantity: Number(quantity) || 1,
      createdAt: todayISO(),
    };
    await db.addSale(item);

    // ریست کردن فرم
    setProductName("");
    setPrice("");
    setCost("");
    setQuantity("1");
    setDate(new Date().toISOString().slice(0, 10));

    onSaved?.();
  }

  return (
<form onSubmit={submit} style={{ display: "flex", gap: "8px", flexWrap: "wrap", direction: "rtl", alignItems: "center" }}>
  <input className="input" placeholder="نام محصول" style={{ flex: 2 }} value={productName} onChange={e => setProductName(e.target.value)} />
  <input className="input" type="number" placeholder="قیمت فروش" style={{ width: 120 }} value={price} onChange={e => setPrice(e.target.value)} />
  <input className="input" type="number" placeholder="هزینه" style={{ width: 120 }} value={cost} onChange={e => setCost(e.target.value)} />
  <input className="input" type="date" style={{ width: 120 }} value={date} onChange={e => setDate(e.target.value)} />
  <input className="input" type="number" placeholder="تعداد" style={{ width: 100 }} value={quantity} onChange={e => setQuantity(e.target.value)} />

  {/* دکمه در انتها */}
  <div style={{ marginRight: "auto" }}>
    <button className="btn" type="submit" style={{ width: 120 }}>ثبت</button>
  </div>
</form>

  );
}
