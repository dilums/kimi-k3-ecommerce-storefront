"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/motion/motion";

/** template.tsx re-mounts on every navigation, so each page fades/slides in.
 *  (Exit transitions aren't possible across App Router navigations without
 *  freezing the router — enter-only keeps motion reliable.) */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="flex-1"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
