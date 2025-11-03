import { useEffect, useRef, useCallback } from "react";

interface UseIntervalOptions {
  immediate?: boolean;  // آیا یک بار بلافاصله اجرا شود
}

export function useInterval(
  callback: () => void,
  delay: number | null,
  options: UseIntervalOptions = {}
) {
  const savedCallback = useRef(callback);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  // همیشه آخرین callback را به‌روز نگه می‌دارد
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (delay === null) return;
    if (intervalId.current) clear(); // interval قبلی را پاک کن
    if (options.immediate) savedCallback.current();
    intervalId.current = setInterval(() => savedCallback.current(), delay);
  }, [delay, clear, options.immediate]);

  const pause = useCallback(() => {
    clear();
  }, [clear]);

  // شروع interval و پاکسازی هنگام unmount یا تغییر delay
  useEffect(() => {
    if (delay !== null) start();
    return clear;
  }, [delay, start, clear]);

  return { start, pause, clear };
}
