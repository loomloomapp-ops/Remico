"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface PopupValue {
  isOpen: boolean;
  source: string;
  open: (source?: string) => void;
  close: () => void;
}

const PopupContext = createContext<PopupValue | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("popup");

  const open = useCallback((src?: string) => {
    setSource(src || "popup");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const value = useMemo<PopupValue>(() => ({ isOpen, source, open, close }), [isOpen, source, open, close]);

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}

export function usePopup(): PopupValue {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used inside <PopupProvider />");
  return ctx;
}
