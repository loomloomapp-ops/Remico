"use client";

import { useEffect, useRef, useState } from "react";
import { List, Phone, X } from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";
import { usePopup } from "./PopupContext";

const NAV = [
  { href: "#about", label: "Про компанію" },
  { href: "#benefits", label: "Переваги" },
  { href: "#certificates", label: "Сертифікати" },
  { href: "#partner", label: "Стати партнером" },
];

const PHONE_DISPLAY = "+38 (067) 000 00 00";
const PHONE_HREF = "tel:+380670000000";

export default function Header() {
  const [hidden, setHidden] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const { open } = usePopup();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      // Hide entirely while the hero card owns the first viewport — its built-in
      // navbar handles navigation there, so the global header would just clash.
      if (y < window.innerHeight * 0.6) {
        setHidden(true);
      } else if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`border-b transition-colors ${
            scrolled ? "border-line bg-paper/85 backdrop-blur" : "border-transparent bg-paper/0"
          }`}
        >
          <div className="container-x flex h-16 flex-nowrap items-center justify-between gap-4 lg:h-20 lg:gap-6">
            <div className="flex min-w-0 items-center gap-3 lg:gap-4">
              <Logo />
            </div>

            <nav
              className="hidden flex-nowrap items-center gap-0.5 lg:flex"
              aria-label="Основна навігація"
            >
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-nowrap items-center gap-3">
              <a
                href={PHONE_HREF}
                className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink/85 transition hover:text-brand-green xl:inline-flex"
              >
                <Phone size={16} weight="bold" />
                {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={() => open("header")}
                className="btn-primary hidden h-11 whitespace-nowrap px-5 py-0 text-xs sm:inline-flex"
              >
                Стати партнером
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Відкрити меню"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white lg:hidden"
              >
                <List size={20} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-label="Меню"
          aria-modal="true"
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-paper shadow-card transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Закрити меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-3 py-6" aria-label="Мобільна навігація">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="rounded-2xl px-4 py-3 text-lg font-semibold text-ink transition hover:bg-brand-green-soft"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 border-t border-line p-5">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
            >
              <span>{PHONE_DISPLAY}</span>
              <Phone size={18} weight="bold" className="text-brand-green" />
            </a>
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                open("mobile-drawer");
              }}
              className="btn-primary w-full"
            >
              Стати партнером
            </button>
            <div className="flex items-center gap-3 pt-1 text-xs text-muted">
              <a href="#" className="hover:text-ink">Instagram</a>
              <span>·</span>
              <a href="#" className="hover:text-ink">Facebook</a>
              <span>·</span>
              <a href="#" className="hover:text-ink">Telegram</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
