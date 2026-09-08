"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/store/ThemeContext";
import { ShopProvider } from "@/store/ShopContext";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ShopProvider>
        {children}
        <Toaster position="bottom-right" />
      </ShopProvider>
    </ThemeProvider>
  );
}
