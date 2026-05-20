import Image from "next/image";
import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import LeadForm from "./LeadForm";

export default function FinalForm() {
  return (
    <section
      id="partner"
      aria-labelledby="final-title"
      className="relative overflow-hidden bg-paper py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] blob-green" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] blob-purple" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="section-eyebrow">Стати партнером REMICO</p>
            <h2 id="final-title" className="mt-3 text-h2 font-extrabold leading-tight text-ink">
              Станьте партнером REMICO у своєму регіоні
            </h2>
            <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-muted">
              Залиште заявку — ми зв'яжемось з вами, уточнимо формат вашої діяльності та запропонуємо умови
              співпраці.
            </p>
            <p className="mt-4 max-w-[58ch] text-sm font-medium text-ink/75">
              Підходить для магазинів, інтернет-магазинів, оптовиків, дилерів, мереж магазинів та
              дистриб'юторів по всій Україні.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <ContactRow
                icon={<Phone size={18} weight="bold" />}
                label="Відділ продажів"
                value="+38 (098) 780 21 84"
                href="tel:+380987802184"
              />
              <ContactRow
                icon={<EnvelopeSimple size={18} weight="bold" />}
                label="Email"
                value="remico2025@gmail.com"
                href="mailto:remico2025@gmail.com"
              />
              <ContactRow
                icon={<MapPin size={18} weight="bold" />}
                label="Графік"
                value="Пн–Сб · 08:00–18:00"
              />
              <ContactRow
                icon={<MapPin size={18} weight="bold" />}
                label="Логістика"
                value="По всій Україні"
              />
            </div>

            <div className="mt-10 hidden overflow-hidden rounded-3xl border border-line bg-white lg:block">
              <Image
                src="/brand/family.png"
                alt=""
                width={2400}
                height={821}
                sizes="50vw"
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <LeadForm source="final" submitLabel="Надіслати заявку" />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green-deep">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">{label}</span>
        <span className="mt-0.5 block text-base font-semibold text-ink">{value}</span>
      </span>
    </>
  );
  const className = "flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3";
  return href ? (
    <a href={href} className={`${className} transition hover:border-brand-green/40`}>
      {Inner}
    </a>
  ) : (
    <div className={className}>{Inner}</div>
  );
}
