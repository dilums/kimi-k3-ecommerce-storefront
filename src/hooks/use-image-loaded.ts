"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Load-state for images that must fade in only once pixels are ready.
 *
 * With SSR, the <img> exists in the HTML before React hydrates — if the
 * browser serves it from cache, the load event can fire BEFORE hydration
 * attaches onLoad, and the handler never runs. Checking `complete` on mount
 * covers that race; onLoad covers everything else.
 */
export function useImageLoaded() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return { loaded, ref, onLoad: () => setLoaded(true) };
}
