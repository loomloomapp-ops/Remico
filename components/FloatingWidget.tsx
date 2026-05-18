"use client";

import { useEffect, useState } from "react";
import { Handshake } from "@phosphor-icons/react/dist/ssr";
import { usePopup } from "./PopupContext";

export default function FloatingWidget() {
  const { open } = usePopup();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => open("floating-widget")}
      aria-label="Залишити заявку"
      className={`fixed bottom-8 right-8 z-40 hidden items-center gap-3 rounded-full bg-ink py-3 pl-3 pr-5 text-sm font-bold uppercase tracking-wider text-white shadow-card transition lg:inline-flex ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      } hover:bg-brand-green`}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
        <Handshake size={18} weight="bold" />
      </span>
      Залишити заявку
    </button>
  );
}
