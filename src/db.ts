
import type { Check, Sale } from "./types";

const DB_NAME = "local_finance_checks_db";
const DB_VERSION = 1;
const STORE_CHECKS = "checks";
const STORE_SALES = "sales";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_CHECKS)) {
        db.createObjectStore(STORE_CHECKS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_SALES)) {
        db.createObjectStore(STORE_SALES, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(storeName: string, mode: IDBTransactionMode = "readonly") {
  return openDB().then((db) => {
    const t = db.transaction(storeName, mode);
    const store = t.objectStore(storeName);
    return { t, store };
  });
}

export const db = {
  async getAllChecks(): Promise<Check[]> {
    const { store } = await tx(STORE_CHECKS);
    return new Promise((res, rej) => {
      const req = store.getAll();
      req.onsuccess = () => res(req.result as Check[]);
      req.onerror = () => rej(req.error);
    });
  },
  async addCheck(item: Check): Promise<void> {
    const { store, t } = await tx(STORE_CHECKS, "readwrite");
    return new Promise((res, rej) => {
      const req = store.add(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
      t.oncomplete = () => {};
    });
  },
  async putCheck(item: Check): Promise<void> {
    const { store } = await tx(STORE_CHECKS, "readwrite");
    return new Promise((res, rej) => {
      const req = store.put(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },
  async deleteCheck(id: string): Promise<void> {
    const { store } = await tx(STORE_CHECKS, "readwrite");
    return new Promise((res, rej) => {
      const req = store.delete(id);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },

  async getAllSales(): Promise<Sale[]> {
    const { store } = await tx(STORE_SALES);
    return new Promise((res, rej) => {
      const req = store.getAll();
      req.onsuccess = () => res(req.result as Sale[]);
      req.onerror = () => rej(req.error);
    });
  },
  async addSale(item: Sale): Promise<void> {
    const { store } = await tx(STORE_SALES, "readwrite");
    return new Promise((res, rej) => {
      const req = store.add(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },
  async putSale(item: Sale): Promise<void> {
    const { store } = await tx(STORE_SALES, "readwrite");
    return new Promise((res, rej) => {
      const req = store.put(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },
  async deleteSale(id: string): Promise<void> {
    const { store } = await tx(STORE_SALES, "readwrite");
    return new Promise((res, rej) => {
      const req = store.delete(id);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },
};
