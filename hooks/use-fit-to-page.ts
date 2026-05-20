"use client";

import { useLayoutEffect, useRef } from "react";

// Hook qui ajuste la font-size d'un élément interne pour qu'il remplisse
// exactement son conteneur parent (sans déborder).
// Utilise une recherche dichotomique sur la font-size pour trouver
// la plus grande valeur qui tient sans overflow.

export function useFitToPage<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const containerRef = useRef<T | null>(null);
  const innerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const fit = () => {
      const targetH = container.clientHeight;
      if (targetH <= 0) return;

      let lo = 7;
      let hi = 16;
      let best = 10;
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2;
        inner.style.fontSize = mid + "px";
        // Force reflow then read scrollHeight
        const actualH = inner.scrollHeight;
        if (actualH <= targetH) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
        if (hi - lo < 0.1) break;
      }
      inner.style.fontSize = best + "px";
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef, innerRef };
}
