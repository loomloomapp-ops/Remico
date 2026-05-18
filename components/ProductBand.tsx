import Image from "next/image";

export default function ProductBand() {
  return (
    <section id="products" aria-label="Лінійка продукції REMICO" className="relative mt-20 overflow-hidden sm:mt-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-green-soft via-white to-brand-purple-soft px-6 pb-0 pt-10 sm:px-12 sm:pt-14">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-eyebrow">Лінійка REMICO</p>
              <h2 className="mt-3 max-w-[28ch] text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                Готова поличка: гелі, порошки, миючі для посуду
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              Зрозумілий мерчандайзинг, читабельна етикетка і однакова бренд-система для всієї категорії —
              швидко стає на полицю і легко продається.
            </p>
          </div>
          <div className="mt-8 -mx-6 sm:-mx-12">
            <Image
              src="/brand/family.png"
              alt="Повна лінійка побутової хімії REMICO: гелі, порошки, миючі засоби"
              width={2400}
              height={821}
              sizes="100vw"
              priority
              fetchPriority="high"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
