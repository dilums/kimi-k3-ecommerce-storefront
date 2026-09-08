"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { useImageLoaded } from "@/hooks/use-image-loaded";

const MotionImage = motion.create(Image);

/** Signature easing — a long, soft deceleration. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Scroll-triggered reveal ─────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px 100px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Masked line reveal (headlines) ──────────────────────────────────── */

export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.2em] -mb-[0.2em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "125%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Stagger container + item ─────────────────────────────────────────── */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Stagger({
  children,
  className,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  inView?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      {...(inView
        ? { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px 100px 0px" } }
        : { animate: "show" as const })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* ── Grid-cell content reveal ────────────────────────────────────────────
   Use INSIDE a static grid cell: the cell (and its borders) never moves —
   only the content fades/slides in, with a light index-based cascade. */

export function CellIn({
  children,
  className,
  index = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 80px 0px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.045, 0.35), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Image reveal — scale-out-of-frame effect with load placeholder ────── */

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  sizes?: string;
}) {
  const { loaded, ref, onLoad } = useImageLoaded();
  return (
    <motion.div
      className={`relative overflow-hidden bg-muted ${className ?? ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.6, delay }}
    >
      {!loaded && <div aria-hidden className="absolute inset-0 z-10 animate-pulse bg-muted" />}
      <MotionImage
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority
        onLoad={onLoad}
        className={imgClassName}
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      />
    </motion.div>
  );
}
