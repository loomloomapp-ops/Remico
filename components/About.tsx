import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const CATEGORIES = [
  {
    title: "Гелі для прання",
    desc: "Універсальний і для кольорових тканин. Концентрована формула, зручне дозування, до 120 прань з пляшки.",
    image: "/brand/gels-shot.png",
    alt: "Гелі для прання REMICO Universal та Colored Fabrics",
    badge: "Концентрат",
  },
  {
    title: "Пральні порошки",
    desc: "Формати 5 кг і 10 кг — для дому та HoReCa. Універсальний і для кольорового. Ефективно при низьких температурах.",
    image: "/brand/powders-10kg-shot.jpg",
    alt: "Пральні порошки REMICO 10 кг — universal та color",
    badge: "5 кг · 10 кг",
  },
  {
    title: "Миючі засоби для посуду",
    desc: "Лінійка з ароматами яблука, лимона та полуниці. М'яка дія до шкіри рук, ефективне розчинення жиру.",
    image: "/brand/dish-shot.jpg",
    alt: "Миючі засоби REMICO для посуду",
    badge: "3 аромати",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="section-eyebrow">Про REMICO</p>
            <h2 id="about-title" className="mt-3 text-h2 font-extrabold text-ink">
              REMICO — український бренд побутової хімії для щоденного використання
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted lg:text-[17px]">
            <p>
              REMICO — український бренд побутової хімії, створений для щоденного використання та масового
              споживача. Ми розробляємо продукцію, яка ефективно працює, допомагає економити кошти та
              залишається зрозумілим і практичним вибором для дому.
            </p>
            <p>
              Бренд REMICO орієнтований як на кінцевого покупця, так і на партнерів: дистриб'юторів, дилерів,
              оптові компанії та торгові мережі. Ми прагнемо будувати системний та впізнаваний бренд, який
              виглядає цілісно в усіх точках контакту — від упаковки та акцій до рекламних матеріалів і
              комунікації.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <article
              key={c.title}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-card ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-brand-green-soft">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="eager"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient so the badge stays readable over any image */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 via-black/0 to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
                  {c.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-extrabold text-ink">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{c.desc}</p>
                <a
                  href="#partner"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-deep transition group-hover:gap-2.5"
                >
                  Запитати умови
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-2xl rounded-2xl border border-line bg-brand-green-soft/60 px-5 py-4 text-sm text-ink/75">
          <strong className="font-bold text-ink">REMICO — бренд для полиці масового попиту.</strong> Категорії
          щоденного використання, які потрібні покупцеві кожного тижня — і повертають його у точку продажу.
        </p>
      </div>
    </section>
  );
}
