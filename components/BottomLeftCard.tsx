"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function BottomLeftCard({ ready = true }: { ready?: boolean }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={ready ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/60 backdrop-blur-xl border border-white/50 flex flex-col gap-2 lg:gap-3 min-w-[150px] md:min-w-[160px] lg:min-w-[200px] w-fit shadow-card"
    >
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight tabular-nums">
          120+
        </span>
        <span className="text-[10px] md:text-[11px] font-semibold text-ink/60 uppercase tracking-[0.14em]">
          Партнерів по Україні
        </span>
      </div>

      <motion.a
        href="#partner"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center bg-ink rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-ink/90 transition-colors self-start group"
      >
        <div className="bg-brand-green p-1 rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
        <span className="text-[13px] font-semibold text-white">Стати партнером</span>
      </motion.a>
    </motion.div>
  );
}
