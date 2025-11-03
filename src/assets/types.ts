export type ID = string;

export interface Check {
  id: ID;
  title: string;
  amount?: number; 
  dueDate: string; 
  notes?: string;
  createdAt: string;
  notified?: boolean; 
}

export interface Sale {
  id: ID;
  productName: string;
  price: number; 
  cost?: number; 
  date: string; 
  quantity?: number;
  notes?: string;
  createdAt: string;
}
