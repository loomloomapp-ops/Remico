import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <span aria-hidden className="bubble bubble-green bubble-float-slow" style={{ width: 220, height: 220, left: "-60px", top: "10%" }} />
      <span aria-hidden className="bubble bubble-float" style={{ width: 90, height: 90, right: "8%", top: "18%" }} />
      <span aria-hidden className="bubble bubble-green bubble-float" style={{ width: 140, height: 140, right: "-40px", bottom: "12%" }} />
      <div className="container-x relative">
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="section-eyebrow">Про REMICO</p>
            <h2 id="about-title" className="mt-3 text-h2 font-extrabold text-ink">
              REMICO — український бренд побутової хімії для щоденного використання
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted lg:text-[17px]">
            <p>
              REMICO — український бренд побутової хімії, створений для щоденного використання. Ми розробляємо
              продукцію, яка ефективно працює, допомагає економити кошти та залишається зрозумілим і практичним
              вибором для дому.
            </p>
            <p>
              Бренд REMICO орієнтований як на кінцевого покупця, так і на партнерів: дистриб&apos;юторів, дилерів,
              оптові компанії та торгові мережі. Ми прагнемо будувати системний та впізнаваний бренд, який
              виглядає цілісно в усіх точках контакту — від упаковки та акцій до рекламних матеріалів і
              комунікації.
            </p>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-line bg-white sm:mt-20">
          <Image
            src="/brand/about-photo.png"
            alt="Виробництво REMICO"
            width={2400}
            height={1350}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
