"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { usePopup } from "./PopupContext";

type Variant = "primary" | "red" | "ghost";

interface Props {
  source: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}

export default function OpenPopupButton({
  source,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: Props) {
  const { open } = usePopup();
  const base =
    variant === "red" ? "btn-red" : variant === "ghost" ? "btn-ghost" : "btn-primary";
  return (
    <button type="button" onClick={() => open(source)} className={`${base} ${className}`}>
      {children}
      {withArrow && <ArrowRight size={18} weight="bold" />}
    </button>
  );
}
