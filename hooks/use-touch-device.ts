import { useSyncExternalStore } from "react";

const getSnapshot = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
const getServerSnapshot = () => false;
const subscribe = (callback: () => void) => {
  window.addEventListener("touchstart", callback, { once: true });
  return () => window.removeEventListener("touchstart", callback);
};

export function useIsTouchDevice() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
