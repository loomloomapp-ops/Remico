"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Phone, List, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePopup } from "./PopupContext";

const MENU: { label: string; href: string; hasDropdown?: boolean }[] = [
  { label: "Про компанію", href: "#about" },
  { label: "Продукція", href: "#products", hasDropdown: true },
  { label: "Переваги", href: "#benefits" },
  { label: "Сертифікати", href: "#certificates" },
];

const PHONE_DISPLAY = "+38 (098) 780 21 84";
const PHONE_HREF = "tel:+380987802184";

export default function HeroNavbar() {
  const { open } = usePopup();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="flex items-center justify-between py-5 md:py-6 px-5 md:px-10 w-full relative z-10">
        {/* Brand */}
        <div className="flex shrink-0 items-center lg:flex-1">
          <a
            href="#top"
            aria-label="REMICO — на головну"
            className="inline-flex items-center gap-3"
          >
            <Image
              src="/brand/logo.png"
              alt="REMICO"
              width={392}
              height={66}
              priority
              sizes="(max-width: 640px) 160px, 220px"
              className="h-10 w-auto shrink-0 sm:h-11 lg:h-12"
            />
          </a>
        </div>

        {/* Center menu */}
        <ul className="hidden lg:flex items-center gap-7 text-ink/85 font-medium text-sm">
          {MENU.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="cursor-pointer hover:text-brand-green transition-colors flex items-center gap-1 group"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex-1 flex justify-end items-center gap-2 md:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-ink/85 hover:text-brand-green transition-colors"
          >
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => open("hero-nav")}
            className="hidden sm:flex items-center bg-brand-green text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-brand-green-deep transition-colors shadow-cta"
          >
            <span className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </span>
            <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
              Стати партнером
            </span>
          </motion.button>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Відкрити меню"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 backdrop-blur text-ink"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-paper shadow-card transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Image
              src="/brand/logo.png"
              alt="REMICO"
              width={196}
              height={33}
              className="h-7 w-auto"
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Закрити меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-3 py-6">
            {MENU.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
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
              <Phone className="w-4 h-4 text-brand-green" />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                open("mobile-hero-drawer");
              }}
              className="btn-primary w-full"
            >
              Стати партнером
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
