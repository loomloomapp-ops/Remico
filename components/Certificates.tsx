import { DownloadSimple, FilePdf, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import OpenPopupButton from "./OpenPopupButton";

interface Doc {
  title: string;
  desc: string;
  meta: string;
  href: string; // place real PDF in /public/docs/ and update this path
}

const DOCS: Doc[] = [
  {
    title: "Висновок державної санітарно-епідеміологічної експертизи",
    desc: "Підтвердження безпеки засобів REMICO для побутового використання згідно з вимогами МОЗ України.",
    meta: "PDF · офіційний документ",
    href: "/docs/remico-cert-1.pdf",
  },
  {
    title: "Декларація відповідності",
    desc: "Декларація виробника про відповідність продукції технічним регламентам України та свідоцтво на торговельну марку.",
    meta: "PDF · 2 сторінки",
    href: "/docs/remico-cert-2.pdf",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="certs-title">
      <span aria-hidden className="bubble bubble-green bubble-float" style={{ width: 200, height: 200, left: "-50px", bottom: "10%" }} />
      <span aria-hidden className="bubble bubble-float-slow" style={{ width: 100, height: 100, right: "10%", top: "12%" }} />
      <div className="container-x relative">
        <div>
          <p className="section-eyebrow">Сертифікати</p>
          <h2 id="certs-title" className="mt-3 text-h2 font-extrabold text-ink">
            Сертифікати
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2">
          {DOCS.map((d) => (
            <article
              key={d.title}
              className="group flex flex-col rounded-3xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-card sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green-deep">
                  <FilePdf size={24} weight="duotone" />
                </span>
                <span className="rounded-full border border-line bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">
                  Документ
                </span>
              </div>
              <h3 className="mt-5 text-lg font-extrabold leading-snug text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                {d.meta}
              </p>
              <a
                href={d.href}
                target={d.href.startsWith("/docs") ? "_blank" : undefined}
                rel={d.href.startsWith("/docs") ? "noopener" : undefined}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green-deep transition group-hover:gap-3"
              >
                <DownloadSimple size={16} weight="bold" />
                Завантажити
              </a>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-brand-green/20 bg-brand-green-soft p-7 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white">
              <ShieldCheck size={24} weight="duotone" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green-deep">
                Повний пакет — за запитом
              </p>
              <p className="mt-2 max-w-[44ch] text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                Запросимо документи й погодимо умови співпраці під ваш канал.
              </p>
            </div>
          </div>
          <OpenPopupButton source="certificates" withArrow className="w-full sm:w-auto">
            Запросити документи та умови
          </OpenPopupButton>
        </div>
      </div>
    </section>
  );
}
