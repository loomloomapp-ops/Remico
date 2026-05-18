import Image from "next/image";

export default function Logo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <a href="#top" aria-label="REMICO — на головну" className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="REMICO"
        width={392}
        height={66}
        priority
        sizes="(max-width: 640px) 140px, 220px"
        className={`h-9 w-auto shrink-0 sm:h-10 lg:h-11 ${invert ? "brightness-0 invert" : ""}`}
      />
    </a>
  );
}
