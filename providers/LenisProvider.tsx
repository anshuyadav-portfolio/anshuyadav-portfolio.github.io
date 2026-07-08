"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLenis as useLenisHook } from "@/hooks/useLenis";

const LenisContext = createContext<any>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenis = useLenisHook();

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  return useContext(LenisContext);
}
