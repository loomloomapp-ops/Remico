"use client";

import { useEffect, useState } from "react";
import { Storefront } from "@phosphor-icons/react/dist/ssr";
import { usePopup } from "./PopupContext";

export default function StickyMobileCTA() {
  const { open } = usePopup();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper to-transparent" />
      <div className="relative p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => open("sticky-mobile")}
          className="btn-primary w-full text-sm"
        >
          <Storefront size={18} weight="bold" />
          Стати партнером
        </button>
      </div>
    </div>
  );
}
