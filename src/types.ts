// src/types.ts


// src/types.ts
export type ID = string;

export interface Check {
  id: ID;
  title: string;
  checkNumber: string;
  bankName: string;
  branchCode: string;
  branchName: string;
  city: string;
  amount: number;
  dueDate: string;  // ISO
  notes?: string;
  createdAt: string;
  notified?: boolean; // آیا هشدار داده شده؟
}


export interface Sale {
  id: ID;
  productName: string; // نام کالا یا خدمت
  price: number; // مبلغ فروش
  cost?: number; // هزینه خرید (اختیاری)
  date: string; // تاریخ (ISO)
  quantity?: number; // تعداد
  notes?: string; // توضیحات
  createdAt: string; // زمان ثبت
}
