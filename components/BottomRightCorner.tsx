"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function BottomRightCorner({ ready = true, light = false }: { ready?: boolean; light?: boolean }) {
  const cls =
    "absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-paper rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6 cursor-pointer group";

  const inner = (
    <>
      {/* Top intersection mask */}
      <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#FAFAF6" />
        </svg>
      </div>

      {/* Left intersection mask */}
      <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#FAFAF6" />
        </svg>
      </div>

      <div className="bg-brand-green-soft w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-brand-green/15 transition-transform group-hover:scale-105">
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
      </div>

      <div className="flex items-center gap-1 text-ink group-hover:text-brand-green transition-colors">
        <span className="text-[15px] md:text-[20px] font-bold">Каталог продукції</span>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
      </div>
    </>
  );

  if (light) {
    return (
      <a
        href="#products"
        className={`${cls} transition-opacity duration-500`}
        style={{ opacity: ready ? 1 : 0 }}
      >
        {inner}
      </a>
    );
  }

  return (
    <motion.a
      href="#products"
      initial={{ y: 20, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={cls}
    >
      {inner}
    </motion.a>
  );
}
