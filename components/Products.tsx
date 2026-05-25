"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { usePopup } from "./PopupContext";

interface Product {
  id: string;
  name: string;
  image: string;
  volume: string;
  barcode: string;
  packaging: string;
  rrc: string;
  prices: { range: string; price: string }[];
  tier4: string;
  promoFee: string;
}

const PRODUCTS: Product[] = [
  {
    id: "gel-uni-6",
    name: "Гель для прання універсальний 6 літрів",
    image: "/brand/products/gel-uni-6l.png",
    volume: "6 000 мл",
    barcode: "4820292250015",
    packaging: "3 шт / ящик · 90 або 120 шт / піддон",
    rrc: "349 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "187,64 грн/шт." },
      { range: "7 – 15 тис. грн", price: "176,09 грн/шт." },
      { range: "15 – 30 тис. грн", price: "165,99 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+10 грн/шт.",
  },
  {
    id: "gel-color-6",
    name: "Гель для прання кольорових тканин 6 літрів",
    image: "/brand/products/gel-color-6l.png",
    volume: "6 000 мл",
    barcode: "4820292250022",
    packaging: "3 шт / ящик · 90 або 120 шт / піддон",
    rrc: "349 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "187,64 грн/шт." },
      { range: "7 – 15 тис. грн", price: "176,09 грн/шт." },
      { range: "15 – 30 тис. грн", price: "165,99 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+10 грн/шт.",
  },
  {
    id: "powder-uni-5",
    name: "Пральний порошок універсальний 5 кг",
    image: "/brand/products/powder-uni-5kg.png",
    volume: "5 000 г",
    barcode: "4820292250039",
    packaging: "75 шт / піддон",
    rrc: "376 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "204,30 грн/шт." },
      { range: "7 – 15 тис. грн", price: "191,72 грн/шт." },
      { range: "15 – 30 тис. грн", price: "180,72 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+11 грн/шт.",
  },
  {
    id: "powder-color-5",
    name: "Пральний порошок для кольорових тканин 5 кг",
    image: "/brand/products/powder-color-5kg.png",
    volume: "5 000 г",
    barcode: "4820292250046",
    packaging: "75 шт / піддон",
    rrc: "376 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "204,30 грн/шт." },
      { range: "7 – 15 тис. грн", price: "191,72 грн/шт." },
      { range: "15 – 30 тис. грн", price: "180,72 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+11 грн/шт.",
  },
  {
    id: "powder-uni-10",
    name: "Пральний порошок універсальний 10 кг",
    image: "/brand/products/powder-uni-10kg.png",
    volume: "10 000 г",
    barcode: "4820292250053",
    packaging: "50 шт / піддон",
    rrc: "685 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "372,42 грн/шт." },
      { range: "7 – 15 тис. грн", price: "349,51 грн/шт." },
      { range: "15 – 30 тис. грн", price: "329,45 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+14 грн/шт.",
  },
  {
    id: "powder-color-10",
    name: "Пральний порошок для кольорових тканин 10 кг",
    image: "/brand/products/powder-color-10kg.png",
    volume: "10 000 г",
    barcode: "4820292250060",
    packaging: "50 шт / піддон",
    rrc: "685 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "372,42 грн/шт." },
      { range: "7 – 15 тис. грн", price: "349,51 грн/шт." },
      { range: "15 – 30 тис. грн", price: "329,45 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+14 грн/шт.",
  },
  {
    id: "milo-apple",
    name: "Засіб для миття посуду з ароматом яблука 5 літрів",
    image: "/brand/products/milo-apple-5l.png",
    volume: "5 000 мл",
    barcode: "4820292250077",
    packaging: "4 шт / ящ. · 108 або 144 шт / піддон",
    rrc: "342 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "180,59 грн/шт." },
      { range: "7 – 15 тис. грн", price: "169,47 грн/шт." },
      { range: "15 – 30 тис. грн", price: "159,75 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+10 грн/шт.",
  },
  {
    id: "milo-lemon",
    name: "Засіб для миття посуду з ароматом лимона 5 літрів",
    image: "/brand/products/milo-lemon-5l.png",
    volume: "5 000 мл",
    barcode: "4820292250084",
    packaging: "4 шт / ящ. · 108 або 144 шт / піддон",
    rrc: "342 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "180,59 грн/шт." },
      { range: "7 – 15 тис. грн", price: "169,47 грн/шт." },
      { range: "15 – 30 тис. грн", price: "159,75 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+10 грн/шт.",
  },
  {
    id: "milo-strawberry",
    name: "Засіб для миття посуду з ароматом полуниці 5 літрів",
    image: "/brand/products/milo-strawberry-5l.png",
    volume: "5 000 мл",
    barcode: "4820292250091",
    packaging: "4 шт / ящ. · 108 або 144 шт / піддон",
    rrc: "342 грн зі знижкою 22%",
    prices: [
      { range: "2 – 7 тис. грн", price: "180,59 грн/шт." },
      { range: "7 – 15 тис. грн", price: "169,47 грн/шт." },
      { range: "15 – 30 тис. грн", price: "159,75 грн/шт." },
    ],
    tier4: "Від 30 тис. грн — індивідуальні ціни",
    promoFee: "+10 грн/шт.",
  },
];

export default function Products() {
  const [active, setActive] = useState<Product | null>(null);
  const { open: openPartnerPopup } = usePopup();

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <section id="products" className="relative overflow-hidden bg-paper py-24 sm:py-32" aria-labelledby="products-title">
        <span aria-hidden className="bubble bubble-float-slow" style={{ width: 180, height: 180, left: "5%", top: "8%" }} />
        <span aria-hidden className="bubble bubble-green bubble-float" style={{ width: 120, height: 120, right: "4%", top: "30%" }} />
        <span aria-hidden className="bubble bubble-float" style={{ width: 240, height: 240, right: "-80px", bottom: "5%" }} />
        <div className="container-x relative">
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="section-eyebrow">Продукція</p>
              <h2 id="products-title" className="mt-3 text-h2 font-extrabold text-ink">
                Каталог продукції REMICO
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted lg:text-[17px]">
              Гелі для прання, пральні порошки і миючі засоби для посуду. Натисніть на товар, щоб побачити
              деталі: фасування, штрих-код, РРЦ та умови.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p)}
                className="product-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white text-left transition duration-200 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-card"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-brand-green-soft">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-extrabold leading-snug text-ink">{p.name}</h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-deep transition group-hover:gap-2.5">
                    Переглянути деталі
                    <ArrowUpRight size={16} weight="bold" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-popup-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl bg-paper shadow-card sm:rounded-3xl">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Закрити"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8 sm:p-8">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-green-soft">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-contain p-6"
                />
              </div>
              <div>
                <p className="section-eyebrow">Товар REMICO</p>
                <h3
                  id="product-popup-title"
                  className="mt-2 text-2xl font-extrabold leading-tight text-ink sm:text-3xl"
                >
                  {active.name}
                </h3>

                <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 text-sm">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">Фасування</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{active.volume}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">Штрих-код</dt>
                    <dd className="mt-0.5 font-mono text-[13px] font-semibold text-ink">{active.barcode}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">Пакування</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{active.packaging}</dd>
                  </div>
                </dl>

                <div className="mt-5 rounded-2xl border border-brand-green/20 bg-brand-green-soft p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-green-deep">
                    РРЦ (рекомендована роздрібна ціна)
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-ink">{active.rrc}</p>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">
                    Ціни залежать від обороту на місяць
                  </p>
                  <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-white">
                    {active.prices.map((tier) => (
                      <li key={tier.range} className="flex items-center justify-between px-4 py-2.5 text-sm">
                        <span className="text-ink/70">{tier.range}</span>
                        <span className="font-bold text-ink">{tier.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted">{active.tier4}</p>
                </div>

                <p className="mt-4 text-xs text-muted">
                  <span className="font-semibold text-ink">Акційна бірка:</span> ціни вказано без акційної бірки.
                  Доплата за бірку і участь у акції: {active.promoFee}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    openPartnerPopup("product:" + active.id);
                  }}
                  className="btn-primary mt-6 w-full"
                >
                  Запитати умови
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
