"use client";

import { useEffect, useState } from "react";
import { List, Phone, X, InstagramLogo, FacebookLogo, TiktokLogo, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Logo from "./Logo";
import { usePopup } from "./PopupContext";

const NAV = [
  { href: "#about", label: "Про компанію" },
  { href: "#products", label: "Продукція" },
  { href: "#benefits", label: "Переваги" },
  { href: "#certificates", label: "Сертифікати" },
];

const PHONE_DISPLAY = "+38 (098) 780 21 84";
const PHONE_HREF = "tel:+380987802184";
const VIBER_HREF = "viber://chat?number=%2B380987802184";
const TELEGRAM_HREF = "https://t.me/+380987802184";

function ViberIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.8 4.2C18.5 3 16.5 2.4 13.6 2.3h-.1c-2.3 0-5.2.1-7.1 1.9C5 5.7 4.5 7.7 4.4 10c-.1 1.7-.1 3.4.6 5.1.4.9 1 1.6 1.7 2.3v2.7c0 .3.2.6.5.7.1 0 .2.1.3.1.2 0 .4-.1.6-.2l2.2-2.1c.4.1.8.1 1.2.1 2.3.1 5.3.1 7.2-1.7 1.8-1.8 1.9-4.5 2-6.7 0-2-.4-4.7-1.9-6.1zm-3.3 8.6c-.4.4-1.4.9-1.9.7-1.5-.5-2.9-1.4-4-2.6-1.1-1.2-1.9-2.5-2.4-4-.1-.5.3-1.5.7-1.9.2-.2.5-.3.7-.3.1 0 .2 0 .3.1l1 1.6c.1.2.1.5-.1.7l-.4.5c-.1.1-.1.2-.1.3 0 0 .8 2.3 3.3 3.3.1 0 .2 0 .3-.1l.5-.4c.2-.2.5-.2.7-.1l1.6 1c.2.2.2.5 0 .8z"/>
    </svg>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = usePopup();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
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
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`border-b transition-colors ${
            scrolled ? "border-line bg-paper/90 backdrop-blur" : "border-transparent bg-paper/0"
          }`}
        >
          <div className="container-x">
            {/* Row 1: logo · phone+socials · CTA */}
            <div className="flex h-16 flex-nowrap items-center justify-between gap-3 lg:h-[68px] lg:gap-6">
              <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                <Logo />
              </div>

              <div className="hidden items-center gap-4 lg:flex">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink/85 transition hover:text-brand-green"
                >
                  <Phone size={16} weight="bold" />
                  {PHONE_DISPLAY}
                </a>
                <div className="flex items-center gap-1.5">
                  <a
                    href={VIBER_HREF}
                    target="_blank"
                    rel="noopener"
                    aria-label="Viber"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#7360F2]/10 text-[#7360F2] transition hover:bg-[#7360F2] hover:text-white"
                  >
                    <ViberIcon size={16} />
                  </a>
                  <a
                    href={TELEGRAM_HREF}
                    target="_blank"
                    rel="noopener"
                    aria-label="Telegram"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#229ED9]/10 text-[#229ED9] transition hover:bg-[#229ED9] hover:text-white"
                  >
                    <TelegramLogo size={16} weight="fill" />
                  </a>
                </div>
                <div className="h-5 w-px bg-line" aria-hidden />
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://www.instagram.com/remico.ua/"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 transition hover:bg-ink/5 hover:text-ink"
                  >
                    <InstagramLogo size={18} weight="bold" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577934616633"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 transition hover:bg-ink/5 hover:text-ink"
                  >
                    <FacebookLogo size={18} weight="bold" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@remico.ua"
                    target="_blank"
                    rel="noopener"
                    aria-label="TikTok"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 transition hover:bg-ink/5 hover:text-ink"
                  >
                    <TiktokLogo size={18} weight="bold" />
                  </a>
                </div>
              </div>

              <div className="flex flex-nowrap items-center gap-3">
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

            {/* Row 2: navigation */}
            <nav
              className="hidden h-12 flex-nowrap items-center justify-center gap-1 border-t border-line/60 lg:flex"
              aria-label="Основна навігація"
            >
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
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
            <div className="flex items-center gap-2">
              <a
                href={VIBER_HREF}
                target="_blank"
                rel="noopener"
                aria-label="Viber"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#7360F2]/10 text-[#7360F2]"
              >
                <ViberIcon size={18} />
              </a>
              <a
                href={TELEGRAM_HREF}
                target="_blank"
                rel="noopener"
                aria-label="Telegram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#229ED9]/10 text-[#229ED9]"
              >
                <TelegramLogo size={18} weight="fill" />
              </a>
            </div>
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
              <a href="https://www.instagram.com/remico.ua/" target="_blank" rel="noopener" className="hover:text-ink">Instagram</a>
              <span>·</span>
              <a href="https://www.facebook.com/profile.php?id=61577934616633" target="_blank" rel="noopener" className="hover:text-ink">Facebook</a>
              <span>·</span>
              <a href="https://www.tiktok.com/@remico.ua" target="_blank" rel="noopener" className="hover:text-ink">TikTok</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
