"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import LeadForm from "./LeadForm";
import { usePopup } from "./PopupContext";

export default function PopupForm() {
  const { isOpen, source, close } = usePopup();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl bg-paper shadow-card sm:rounded-3xl">
        <button
          type="button"
          onClick={close}
          aria-label="Закрити форму"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="grid gap-6 p-6 sm:p-10">
          <div>
            <p className="section-eyebrow">Стати партнером</p>
            <h2 id="popup-title" className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Залиште заявку — надішлемо умови співпраці
            </h2>
            <p className="mt-3 text-base text-muted">
              Менеджер зв'яжеться з вами протягом робочого дня, уточнить формат і запропонує умови для вашого
              каналу — магазин, мережа, опт чи дистрибуція.
            </p>
          </div>
          <LeadForm source={source} variant="bare" compact submitLabel="Надіслати заявку" />
        </div>
      </div>
    </div>
  );
}
