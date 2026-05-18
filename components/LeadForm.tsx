"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle, PaperPlaneTilt, Warning } from "@phosphor-icons/react/dist/ssr";
import { ACTIVITY_TYPES, LeadPayload, LeadResponse } from "@/lib/types";
import { FieldErrors, validateLead } from "@/lib/validation";

type Variant = "card" | "inverse" | "bare";

interface LeadFormProps {
  source: string;
  submitLabel?: string;
  variant?: Variant;
  compact?: boolean;
}

const emptyForm: LeadPayload = {
  name: "",
  phone: "",
  activity_type: "",
  comment: "",
  privacy: false,
};

export default function LeadForm({
  source,
  submitLabel = "Надіслати заявку",
  variant = "card",
  compact = false,
}: LeadFormProps) {
  const [form, setForm] = useState<LeadPayload>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const uid = useId();

  function update<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateLead(form);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, website: honeypot }),
      });
      const data: LeadResponse = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(data.error || "Не вдалося надіслати. Спробуйте ще раз.");
        return;
      }
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
      setServerError("Перевірте з'єднання з інтернетом.");
    }
  }

  const inverse = variant === "inverse";
  const bare = variant === "bare";

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-start gap-4 rounded-3xl p-6 sm:p-8 ${
          inverse ? "bg-white/10 text-white" : "bg-brand-green-soft text-ink"
        }`}
        role="status"
      >
        <CheckCircle size={48} weight="fill" className={inverse ? "text-white" : "text-brand-green"} />
        <h3 className="text-2xl font-extrabold leading-tight">
          Дякуємо! Ми отримали вашу заявку та зв'яжемось з вами для обговорення умов співпраці.
        </h3>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-2 text-sm font-semibold underline-offset-4 hover:underline ${
            inverse ? "text-white/90" : "text-brand-green-deep"
          }`}
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={
        bare
          ? "grid gap-4"
          : `grid gap-4 rounded-3xl border ${
              inverse ? "border-white/10 bg-white/[0.06] backdrop-blur" : "border-line bg-white shadow-card"
            } ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`
      }
      aria-describedby={serverError ? `${uid}-srv` : undefined}
    >
      {!bare && !compact && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            inverse ? "text-white/60" : "text-ink/55"
          }`}
        >
          Форма заявки
        </p>
      )}

      {/* Honeypot — hidden from users, autofilled by spam bots. Filled value triggers silent rejection on server. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Не заповнюйте це поле
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Ім'я"
          error={errors.name}
          inverse={inverse}
        >
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Олександр"
            className={`field-input ${errors.name ? "field-input-invalid" : ""} ${
              inverse ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white" : ""
            }`}
            aria-invalid={!!errors.name}
            required
          />
        </Field>

        <Field
          id={`${uid}-phone`}
          label="Номер телефону"
          error={errors.phone}
          inverse={inverse}
        >
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+380 ___ ___ __ __"
            className={`field-input ${errors.phone ? "field-input-invalid" : ""} ${
              inverse ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white" : ""
            }`}
            aria-invalid={!!errors.phone}
            required
          />
        </Field>
      </div>

      <Field
        id={`${uid}-activity`}
        label="Тип діяльності"
        error={errors.activity_type}
        inverse={inverse}
      >
        <div className="relative">
          <select
            id={`${uid}-activity`}
            value={form.activity_type}
            onChange={(e) => update("activity_type", e.target.value as LeadPayload["activity_type"])}
            className={`field-input appearance-none pr-12 ${errors.activity_type ? "field-input-invalid" : ""} ${
              inverse ? "border-white/15 bg-white/10 text-white focus:border-white" : ""
            } ${!form.activity_type ? (inverse ? "text-white/40" : "text-ink/40") : ""}`}
            aria-invalid={!!errors.activity_type}
            required
          >
            <option value="" disabled>
              Оберіть зі списку
            </option>
            {ACTIVITY_TYPES.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
          <svg
            className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
              inverse ? "text-white/60" : "text-ink/50"
            }`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Field>

      <Field
        id={`${uid}-comment`}
        label="Коментар"
        hint="Необов'язково"
        inverse={inverse}
      >
        <textarea
          id={`${uid}-comment`}
          value={form.comment || ""}
          onChange={(e) => update("comment", e.target.value)}
          placeholder="Регіон, обсяг закупівлі, питання…"
          rows={compact ? 2 : 3}
          className={`field-input resize-none ${
            inverse ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-white" : ""
          }`}
        />
      </Field>

      <label
        className={`flex cursor-pointer items-start gap-3 text-sm ${
          inverse ? "text-white/80" : "text-ink/75"
        } ${errors.privacy ? "text-brand-red" : ""}`}
      >
        <input
          type="checkbox"
          checked={form.privacy}
          onChange={(e) => update("privacy", e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-brand-green"
          aria-invalid={!!errors.privacy}
          required
        />
        <span>
          Погоджуюсь з{" "}
          <a href="#privacy" className="font-semibold underline-offset-4 hover:underline">
            політикою конфіденційності
          </a>
          .
        </span>
      </label>
      {errors.privacy && <p className="field-error -mt-2">{errors.privacy}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-2 w-full sm:w-auto"
      >
        <PaperPlaneTilt size={18} weight="bold" />
        {status === "loading" ? "Надсилаємо…" : submitLabel}
      </button>

      {serverError && (
        <p id={`${uid}-srv`} className="flex items-center gap-2 text-sm text-brand-red">
          <Warning size={18} weight="fill" />
          {serverError}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  inverse,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  inverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={`field-label ${inverse ? "text-white/70" : ""}`}>
        {label}
        {hint && <span className={`ml-2 normal-case tracking-normal ${inverse ? "text-white/40" : "text-ink/40"}`}>· {hint}</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
