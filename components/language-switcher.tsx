"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const uiLang = useStore((s) => s.uiLang);
  const setUILang = useStore((s) => s.setUILang);

  return (
    <div className="flex items-center rounded-md border text-xs overflow-hidden">
      <button
        onClick={() => setUILang("fr")}
        className={cn(
          "px-2.5 py-1.5 font-medium transition-colors",
          uiLang === "fr"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        FR
      </button>
      <button
        onClick={() => setUILang("en")}
        className={cn(
          "px-2.5 py-1.5 font-medium transition-colors",
          uiLang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
