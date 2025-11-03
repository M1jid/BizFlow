export function todayISO() {
  return new Date().toISOString();
}

export function daysBetween(fromISO: string, toISO = new Date().toISOString()) {
  const f = new Date(fromISO);
  const t = new Date(toISO);
  const diff = f.getTime() - t.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)); 
}

export function isPast(iso: string) {
  return new Date(iso).getTime() < Date.now();
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}
