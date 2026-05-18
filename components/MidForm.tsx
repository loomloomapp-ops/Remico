import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import LeadForm from "./LeadForm";

const POINTS = [
  "Прайс і умови — у відповідь на заявку",
  "Логістика по всій Україні",
  "Підтримка маркетингом і акціями для покупця",
];

export default function MidForm() {
  return (
    <section
      id="mid-form"
      aria-labelledby="mid-form-title"
      className="relative overflow-hidden bg-brand-green text-white"
    >
      {/* Decorative product silhouette + dimming overlay so the form card always sits on a darker zone */}
      <div className="pointer-events-none absolute -right-16 bottom-0 hidden h-[110%] w-[55%] opacity-20 lg:block">
        <Image
          src="/brand/powders-5kg-shot.png"
          alt=""
          fill
          sizes="55vw"
          className="object-contain object-right"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green-deep via-brand-green to-brand-green/70"
        aria-hidden="true"
      />

      <div className="container-x relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Заявка партнера</p>
            <h2
              id="mid-form-title"
              className="mt-3 text-h2 font-extrabold leading-tight text-white"
            >
              Хочете додати REMICO у свій асортимент?
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/90">
              Залиште контакти — ми надішлемо умови співпраці та обговоримо формат партнерства для вашого
              бізнесу.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white">
              {POINTS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-white" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* White elevated form card — high contrast against green background */}
          <div className="relative">
            <div className="absolute -inset-1 -z-0 rounded-[2rem] bg-white/15 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <LeadForm source="mid-form" submitLabel="Отримати партнерські умови" variant="card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
