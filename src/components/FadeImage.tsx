"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/components/motion/motion";
import { useImageLoaded } from "@/hooks/use-image-loaded";

const MotionImage = motion.create(Image);

/**
 * Image with a skeleton placeholder: a quiet pulsing block holds the frame
 * until the file loads, then the picture fades in. Only opacity is animated,
 * so CSS hover transforms on the img keep working.
 */
export default function FadeImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const { loaded, ref, onLoad } = useImageLoaded();

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <MotionImage
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={eager}
        onLoad={onLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={imgClassName}
      />
      {!loaded && <div aria-hidden className="pointer-events-none absolute inset-0 animate-pulse bg-muted" />}
    </div>
  );
}
