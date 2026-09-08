"use client";

import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/motion/motion";

/* ── Aster — the house mark for footnotes and marginalia ───────────────── */

export function Aster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M12 4v16M5 8l14 8M19 8L5 16" />
    </svg>
  );
}

/* ── Squiggle — hand-drawn underline that draws itself in view ─────────── */

export function Squiggle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" className={className} aria-hidden>
      <motion.path
        d="M2 8 C 12 2, 22 10, 32 6 S 52 3, 62 7 S 82 10, 92 5 S 110 4, 118 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px 60px 0px" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </svg>
  );
}

/* ── ArrowDoodle — a small hand-drawn pointer ──────────────────────────── */

export function ArrowDoodle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 60 46" fill="none" className={className} aria-hidden>
      <motion.path
        d="M5 5 C 22 6, 46 12, 49 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px 60px 0px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      />
      <motion.path
        d="M41 29 L 49.5 34 M 53 24 L 49.5 34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px 60px 0px" }}
        transition={{ duration: 0.4, delay: delay + 0.7, ease: EASE }}
      />
    </svg>
  );
}

/* ── CropMarks — printer's registration marks for image frames ─────────── */

export function CropMarks({ className = "" }: { className?: string }) {
  const base = "pointer-events-none absolute h-2.5 w-2.5 border-muted-foreground/60";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${base} -left-2.5 -top-2.5 border-l border-t`} />
      <span className={`${base} -right-2.5 -top-2.5 border-r border-t`} />
      <span className={`${base} -bottom-2.5 -left-2.5 border-b border-l`} />
      <span className={`${base} -bottom-2.5 -right-2.5 border-b border-r`} />
    </div>
  );
}

/* ── Barcode — deterministic fake barcode from any string ──────────────── */

export function Barcode({ code, className = "" }: { code: string; className?: string }) {
  const rects: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < code.length * 2; i++) {
    const n = code.charCodeAt(i % code.length) + i * 7;
    const w = (n % 3) + 1;
    rects.push({ x, w });
    x += w + ((n >> 3) % 2) + 1;
  }
  return (
    <svg
      viewBox={`0 0 ${x} 30`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={`Reference code ${code}`}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={0} width={r.w} height={30} fill="currentColor" />
      ))}
    </svg>
  );
}

/* ── Stamp — circular studio seal ──────────────────────────────────────── */

export function Stamp({
  text,
  className = "",
  spin = false,
}: {
  text: string;
  className?: string;
  spin?: boolean;
}) {
  const id = useId();
  return (
    <div className={`${spin ? "animate-[spin_36s_linear_infinite]" : ""} ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 3" />
        <text className="font-mono2 uppercase" fontSize="8" letterSpacing="1.8" fill="currentColor">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
        <path
          d="M50 42v16M42 50h16M44.3 44.3l11.4 11.4M55.7 44.3L44.3 55.7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ── MarginNote — vertical mono annotation for wide screens ────────────── */

export function MarginNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      aria-hidden
      className={`hidden select-none font-mono2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 [writing-mode:vertical-rl] lg:block ${className}`}
    >
      {children}
    </p>
  );
}

/* ── Asterism — the classic ⁂ section breath ───────────────────────────── */

export function Asterism({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-muted-foreground ${className}`} aria-hidden>
      <Aster className="h-2.5 w-2.5" />
      <Aster className="h-3 w-3" />
      <Aster className="h-2.5 w-2.5" />
    </div>
  );
}

/* ── EndMark — tombstone at the end of an article ──────────────────────── */

export function EndMark({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block h-2.5 w-2.5 bg-foreground ${className}`} />;
}

/* ── Footnote — small mono annotation with a marker ────────────────────── */

export function Footnote({
  children,
  className = "",
  marker = "*",
}: {
  children: ReactNode;
  className?: string;
  marker?: string;
}) {
  return (
    <p className={`flex items-start gap-2.5 font-mono2 text-[10px] leading-relaxed tracking-[0.06em] text-muted-foreground ${className}`}>
      <span className="mt-px shrink-0 text-foreground/60">{marker}</span>
      <span>{children}</span>
    </p>
  );
}

/* ── DottedLeader — table-of-contents dot rule ─────────────────────────── */

export function DottedLeader({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`mx-3 mb-1 flex-1 border-b border-dotted border-border ${className}`} />;
}
