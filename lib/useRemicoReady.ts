"use client";

import { useEffect, useState } from "react";

const READY_EVENT = "remico:ready";

/**
 * Returns `true` once the brand preloader finishes (or after a safety timeout
 * if it never mounts). Hero animations gate their `animate` props on this so
 * they don't play behind the curtain.
 */
export function useRemicoReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // If the preloader already finished before this component subscribed,
    // a global flag lets us pick the signal up immediately.
    if ((window as unknown as { __remicoReady?: boolean }).__remicoReady) {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener(READY_EVENT, onReady);
    // Safety net so hero is never stuck if Preloader is absent or errors.
    const safety = window.setTimeout(onReady, 4500);
    return () => {
      window.removeEventListener(READY_EVENT, onReady);
      window.clearTimeout(safety);
    };
  }, []);

  return ready;
}

export const REMICO_READY_EVENT = READY_EVENT;
