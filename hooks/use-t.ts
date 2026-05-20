"use client";

import { useStore } from "@/lib/store";
import { UI } from "@/lib/ui-lang";

/** Retourne le dictionnaire UI dans la langue active (fr ou en). */
export function useT() {
  const uiLang = useStore((s) => s.uiLang);
  return UI[uiLang];
}
