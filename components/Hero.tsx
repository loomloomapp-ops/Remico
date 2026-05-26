"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import HeroBadge from "./HeroBadge";
import BottomLeftCard from "./BottomLeftCard";
import BottomRightCorner from "./BottomRightCorner";
import { useRemicoReady } from "@/lib/useRemicoReady";

// Decorative animated foam bubbles — desktop only. Mobile gets static dots to keep paint cheap.
const BUBBLES = [
  { size: 320, left: "8%", top: "62%", delay: 0, duration: 14, opacity: 0.35 },
  { size: 180, left: "22%", top: "20%", delay: 1.5, duration: 11, opacity: 0.5 },
  { size: 120, left: "52%", top: "78%", delay: 2.8, duration: 9, opacity: 0.6 },
  { size: 220, left: "70%", top: "30%", delay: 0.8, duration: 13, opacity: 0.4 },
  { size: 90, left: "40%", top: "50%", delay: 3.2, duration: 8, opacity: 0.55 },
  { size: 260, left: "82%", top: "70%", delay: 2, duration: 15, opacity: 0.3 },
  { size: 70, left: "14%", top: "42%", delay: 1.1, duration: 7, opacity: 0.7 },
];

function useLightMode() {
  const [light, setLight] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const update = () => setLight(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return light;
}

export default function Hero() {
  const ready = useRemicoReady();
  const light = useLightMode();
  const hidden = { opacity: 0 };

  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-5 pt-[120px] md:pt-[140px] bg-paper">
      <section
        id="top"
        className="relative w-full max-w-[1536px] min-h-[calc(100dvh-140px)] md:min-h-[calc(100dvh-160px)] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center group bg-gradient-to-br from-[#D9EDDF] via-[#F1F7EE] to-[#E8F4EB]"
      >
        <div
          aria-hidden
          className="hidden md:block absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(31,143,61,0.28), rgba(31,143,61,0))" }}
        />
        <div
          aria-hidden
          className="hidden md:block absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(107,77,224,0.22), rgba(107,77,224,0))" }}
        />

        {!light && (
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {BUBBLES.map((b, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full will-change-transform"
                style={{
                  width: b.size,
                  height: b.size,
                  left: b.left,
                  top: b.top,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 70%)",
                  boxShadow: "inset 0 0 24px rgba(255,255,255,0.4)",
                  opacity: b.opacity,
                }}
                animate={{
                  y: [0, -22, 0, 14, 0],
                  x: [0, 10, -8, 6, 0],
                  scale: [1, 1.04, 0.98, 1.02, 1],
                }}
                transition={{
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Desktop / tablet — hero family render on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-2%] bottom-[4%] z-[1] hidden md:block w-[52%] max-w-[760px]"
        >
          {light ? (
            <div className="relative aspect-[4/3]">
              <Image
                src="/brand/family.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 760px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(15,20,16,0.22)]"
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
              className="relative aspect-[4/3] will-change-transform"
            >
              <Image
                src="/brand/family.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 760px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(15,20,16,0.22)]"
              />
            </motion.div>
          )}
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center">
          {/* Mobile */}
          <div className="flex md:hidden flex-col items-center px-5 pt-10 pb-32 w-full">
            <HeroBadge ready={ready} light />
            <h1
              className="text-[1.6rem] sm:text-4xl font-extrabold text-ink mb-3 tracking-tight leading-[1.15] text-center transition-opacity duration-500"
              style={{ opacity: ready ? 1 : 0 }}
            >
              Побутова хімія для магазинів і дистриб&apos;юторів{" "}
              <span className="text-brand-green">по Україні</span>
            </h1>

            <div
              className="relative mt-6 w-[92%] max-w-[420px] aspect-[4/3] transition-opacity duration-500 delay-300"
              style={{ opacity: ready ? 1 : 0 }}
            >
              <Image
                src="/brand/family.png"
                alt="Лінійка побутової хімії REMICO"
                fill
                sizes="90vw"
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex w-full flex-col items-start pt-10 md:pt-16 px-10 lg:px-16 max-w-[1100px]">
            <HeroBadge ready={ready} />
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={ready ? { opacity: 1, scale: 1 } : hidden}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-extrabold text-ink mb-3 tracking-tight leading-[1.05] max-w-[18ch]"
            >
              Побутова хімія для магазинів і дистриб&apos;юторів{" "}
              <span className="text-brand-green">по Україні</span>
            </motion.h1>
          </div>

          <BottomLeftCard ready={ready} light={light} />
          <BottomRightCorner ready={ready} light={light} />
        </div>
      </section>
    </div>
  );
}
