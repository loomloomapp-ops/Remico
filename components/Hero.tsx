"use client";

import Image from "next/image";
import { motion } from "motion/react";
import HeroNavbar from "./HeroNavbar";
import HeroBadge from "./HeroBadge";
import BottomLeftCard from "./BottomLeftCard";
import BottomRightCorner from "./BottomRightCorner";
import { useRemicoReady } from "@/lib/useRemicoReady";

// Decorative animated foam bubbles — sized + delayed once, stable across renders.
const BUBBLES = [
  { size: 320, left: "8%", top: "62%", delay: 0, duration: 14, opacity: 0.35 },
  { size: 180, left: "22%", top: "20%", delay: 1.5, duration: 11, opacity: 0.5 },
  { size: 120, left: "52%", top: "78%", delay: 2.8, duration: 9, opacity: 0.6 },
  { size: 220, left: "70%", top: "30%", delay: 0.8, duration: 13, opacity: 0.4 },
  { size: 90, left: "40%", top: "50%", delay: 3.2, duration: 8, opacity: 0.55 },
  { size: 260, left: "82%", top: "70%", delay: 2, duration: 15, opacity: 0.3 },
  { size: 70, left: "14%", top: "42%", delay: 1.1, duration: 7, opacity: 0.7 },
];

export default function Hero() {
  const ready = useRemicoReady();
  // Variants keyed off the preloader signal so nothing animates behind the curtain.
  const hidden = { opacity: 0 };
  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-5 bg-paper">
      <section
        id="top"
        className="relative w-full max-w-[1536px] h-[calc(100dvh-24px)] md:h-[calc(100dvh-40px)] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center group bg-gradient-to-br from-[#D9EDDF] via-[#F1F7EE] to-[#E8F4EB]"
      >
        {/* Soft accent washes */}
        <div
          aria-hidden
          className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(31,143,61,0.28), rgba(31,143,61,0))" }}
        />
        <div
          aria-hidden
          className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(107,77,224,0.22), rgba(107,77,224,0))" }}
        />

        {/* Foam bubbles */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          {BUBBLES.map((b, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
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

        {/* Product hero render — desktop / tablet */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, x: 60, rotate: -4 }}
          animate={ready ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 60, rotate: -4 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          className="pointer-events-none absolute right-[-4%] bottom-[6%] z-[1] hidden md:block w-[44%] max-w-[680px]"
        >
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square"
          >
            <Image
              src="/brand/hero-gel-color.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 60vw, 680px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(15,20,16,0.22)]"
            />
          </motion.div>
        </motion.div>

        {/* Content layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <HeroNavbar />

          {/* Mobile: stacked column — copy then product image */}
          <div className="flex md:hidden flex-col items-center px-5 pt-2 pb-32 w-full">
            <HeroBadge ready={ready} />
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={ready ? { opacity: 1, scale: 1 } : hidden}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2rem] sm:text-5xl font-extrabold text-ink mb-3 tracking-tight leading-[1.05] text-center"
            >
              Чистота, що{" "}
              <span className="text-brand-green">тримає полицю</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : hidden}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[13px] sm:text-base text-ink/70 leading-relaxed max-w-md font-normal text-center"
            >
              Побутова хімія для дистриб&apos;юторів, магазинів та мережевих гіпермаркетів по всій Україні.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mt-5 w-[78%] max-w-[320px] aspect-square"
            >
              <Image
                src="/brand/hero-gel-color.png"
                alt="Гелі для прання REMICO"
                fill
                sizes="80vw"
                priority
                className="object-contain drop-shadow-[0_24px_44px_rgba(15,20,16,0.22)]"
              />
            </motion.div>
          </div>

          {/* Desktop / tablet: centered copy, product floats right */}
          <div className="hidden md:flex w-full flex-col items-center pt-6 md:pt-10 px-6 text-center max-w-4xl">
            <HeroBadge ready={ready} />
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={ready ? { opacity: 1, scale: 1 } : hidden}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold text-ink mb-3 tracking-tight leading-[1.02]"
            >
              Чистота, що{" "}
              <span className="text-brand-green">тримає полицю</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : hidden}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-ink/70 leading-relaxed max-w-xl font-normal"
            >
              Побутова хімія для дистриб&apos;юторів, магазинів та мережевих гіпермаркетів по всій Україні.
            </motion.p>
          </div>

          <BottomLeftCard ready={ready} />
          <BottomRightCorner ready={ready} />
        </div>
      </section>
    </div>
  );
}
