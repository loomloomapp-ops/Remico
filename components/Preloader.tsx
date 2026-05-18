"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CSSProperties, useEffect, useState } from "react";
import { REMICO_READY_EVENT } from "@/lib/useRemicoReady";

// Minimum on-screen time so the intro animation always reads as intentional,
// even on a warm cache where `load` fires almost instantly.
const MIN_DISPLAY_MS = 1600;

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  // Trigger exit once the document is fully loaded (or we hit min display).
  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setDone(true), wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  // Lock body scroll while curtain is up — without breaking layout width.
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  const handleExitComplete = () => {
    (window as unknown as { __remicoReady?: boolean }).__remicoReady = true;
    window.dispatchEvent(new Event(REMICO_READY_EVENT));
  };

  // CSS variables for easy theming.
  const cssVars: CSSProperties = {
    // @ts-expect-error -- custom CSS properties
    "--preloader-bg": "#FAFAF6",
    "--preloader-ink": "#0F1410",
    "--preloader-accent": "#1F8F3D",
    "--preloader-logo-w": "clamp(160px, 22vw, 280px)",
    "--preloader-duration": "1.1s",
  };

  const easing = [0.7, 0, 0.2, 1] as const;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Завантаження REMICO"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: reduce ? 0.2 : 0.7, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            ...cssVars,
            background: "var(--preloader-bg)",
          }}
        >
          {/* Subtle ambient wash so the white doesn't feel flat */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(31,143,61,0.06), rgba(31,143,61,0) 70%)",
            }}
          />

          <div
            className="relative flex flex-col items-center"
            style={{ width: "var(--preloader-logo-w)" }}
          >
            {/* Logo wipe-reveal */}
            <div className="relative w-full">
              {/* Ghost layer to keep box height stable */}
              <div className="invisible">
                <Image
                  src="/brand/logo.png"
                  alt=""
                  width={560}
                  height={94}
                  priority
                  className="w-full h-auto"
                />
              </div>

              {/* Real logo, clipped left-to-right */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{
                  duration: reduce ? 0.4 : 1.15,
                  delay: 0.25,
                  ease: easing,
                }}
              >
                <Image
                  src="/brand/logo.png"
                  alt="REMICO"
                  width={560}
                  height={94}
                  priority
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Accent scanning line — travels across the logo */}
              <motion.span
                aria-hidden
                className="absolute top-0 bottom-0 w-[2px] rounded-full"
                style={{
                  left: 0,
                  background: "var(--preloader-accent)",
                  boxShadow: "0 0 18px rgba(31,143,61,0.55)",
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: "var(--preloader-logo-w)",
                  opacity: reduce ? [0, 0.9, 0.9, 0] : [0, 1, 1, 0],
                }}
                transition={{
                  duration: reduce ? 0.4 : 1.15,
                  delay: 0.25,
                  ease: easing,
                  times: [0, 0.1, 0.88, 1],
                }}
              />
            </div>

            {/* Underline draw */}
            <div
              className="mt-5 h-px w-full overflow-hidden"
              style={{ background: "rgba(15,20,16,0.08)" }}
            >
              <motion.div
                className="h-full origin-left"
                style={{ background: "var(--preloader-accent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduce ? 0.4 : 1.4,
                  delay: 0.5,
                  ease: easing,
                }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-5 text-[10px] sm:text-[11px] font-semibold uppercase text-center"
              style={{
                color: "rgba(15,20,16,0.55)",
                letterSpacing: "0.32em",
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
            >
              Український бренд<br className="sm:hidden" /> побутової хімії
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
