import OpenPopupButton from "./OpenPopupButton";

const BENEFITS = [
  {
    n: "01",
    title: "Сильне співвідношення ціна / якість",
    desc: "Одне з найкращих співвідношень на ринку. Партнер пропонує покупцю зрозумілий продукт для щоденного використання без завищеної ціни — категорія залишається доступною, а маржа — здоровою.",
    tag: "Маржа",
  },
  {
    n: "02",
    title: "Щедрі акції для кінцевого споживача",
    desc: "Акції REMICO — одні з найщедріших на ринку. Вони створюють додаткову мотивацію для покупця, прискорюють обертання товару на полиці й сприяють зростанню продажів партнера.",
    tag: "Обертання",
  },
  {
    n: "03",
    title: "Маркування відповідно до законодавства України",
    desc: "Уся продукція маркована за чинним законодавством. Партнер не отримує ризик зняття з полиць через невідповідність — товар чисто проходить аудити мережі.",
    tag: "Compliance",
  },
  {
    n: "04",
    title: "Категорії регулярного масового попиту",
    desc: "Гелі для прання, пральні порошки і миючі для посуду — товари, які потрібні покупцю щотижня. Стабільний попит замість сезонних провалів.",
    tag: "Стабільний попит",
  },
  {
    n: "05",
    title: "Підходить для retail, опту і дистрибуції",
    desc: "Бренд готовий до будь-якого каналу: магазин, інтернет-магазин, мережа, опт, дилерська або дистриб'юторська модель. Однакова бренд-система в усіх точках контакту.",
    tag: "Будь-який канал",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="bg-paper py-24 sm:py-32" aria-labelledby="benefits-title">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="section-eyebrow">Переваги для партнерів</p>
            <h2 id="benefits-title" className="mt-3 text-h2 font-extrabold text-ink">
              Чому REMICO вигідний для B2B-партнерів
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted lg:text-[17px]">
            П'ять аргументів, чому магазинам, мережам, оптовикам і дистриб'юторам зручно ставити REMICO на
            полицю та повторно замовляти.
          </p>
        </div>

        <ol className="mt-14 space-y-4 sm:mt-20 sm:space-y-5">
          {BENEFITS.map((b, i) => (
            <li
              key={b.n}
              className={`group grid grid-cols-[auto_1fr] items-start gap-5 rounded-3xl border border-line bg-white p-6 transition hover:border-brand-green/40 sm:grid-cols-[120px_1fr_auto] sm:gap-8 sm:p-8 ${
                i % 2 === 1 ? "sm:ml-8 lg:ml-16" : ""
              }`}
            >
              <span className="text-3xl font-extrabold tabular-nums tracking-tight text-brand-green sm:text-5xl">
                {b.n}
              </span>
              <div className="sm:max-w-[60ch]">
                <h3 className="text-xl font-extrabold leading-tight text-ink sm:text-2xl">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{b.desc}</p>
              </div>
              <span className="hidden self-center rounded-full border border-line bg-brand-green-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green-deep sm:inline-flex">
                {b.tag}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-ink p-7 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Готові обговорити умови?
            </p>
            <p className="mt-2 max-w-[40ch] text-2xl font-extrabold leading-tight sm:text-3xl">
              Розрахуємо прайс і умови під ваш канал.
            </p>
          </div>
          <OpenPopupButton source="benefits" variant="red" withArrow className="w-full sm:w-auto">
            Обговорити співпрацю
          </OpenPopupButton>
        </div>
      </div>
    </section>
  );
}
