"use client";

import * as React from "react";
import { LayoutDashboard, Sparkles, FileText, Mail, History, Settings2, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useT } from "@/hooks/use-t";

export type View = "new" | "ats" | "cv" | "letter" | "history" | "profile" | "settings";

export function Sidebar({ view, onView }: { view: View; onView: (v: View) => void }) {
  const t = useT();
  const uiLang = useStore((s) => s.uiLang);
  const setUILang = useStore((s) => s.setUILang);

  const items: { id: View; label: string; icon: React.ElementType }[] = [
    { id: "new", label: t.nav.new, icon: Sparkles },
    { id: "ats", label: t.nav.ats, icon: LayoutDashboard },
    { id: "cv", label: t.nav.cv, icon: FileText },
    { id: "letter", label: t.nav.letter, icon: Mail },
    { id: "history", label: t.nav.history, icon: History },
    { id: "profile", label: t.nav.profile, icon: User },
    { id: "settings", label: t.nav.settings, icon: Settings2 },
  ];

  return (
    <aside className="hidden lg:flex h-screen w-60 flex-col border-r bg-card/40 px-4 py-6 sticky top-0">
      <div className="flex items-center px-2 mb-8">
        <Image
          src="/logo.svg"
          alt="Job Application AI"
          width={180}
          height={53}
          className="dark:invert"
          priority
        />
      </div>
      <nav className="space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onView(it.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 text-[10px] text-muted-foreground px-2 space-y-2">
        {/* Toggle langue UI */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setUILang("fr")}
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors",
              uiLang === "fr"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            🇫🇷 FR
          </button>
          <button
            onClick={() => setUILang("en")}
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors",
              uiLang === "en"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            🇬🇧 EN
          </button>
        </div>

        <p>{t.footer.version}</p>
        <p>{t.footer.privacy}</p>
        <p>
          <a
            href="mailto:benbouazzamine@gmail.com"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            {t.footer.contact}
          </a>
        </p>
      </div>
    </aside>
  );
}
