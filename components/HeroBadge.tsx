"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function HeroBadge({ ready = true }: { ready?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/40 mx-auto mb-4 w-fit shadow-sm"
    >
      <Sparkles className="w-4 h-4 text-brand-green" />
      <span className="text-[13px] font-semibold text-ink/85 uppercase tracking-[0.14em]">
        Український виробник · B2B
      </span>
    </motion.div>
  );
}
