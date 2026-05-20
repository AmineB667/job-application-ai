"use client";

import * as React from "react";
import { LayoutDashboard, Sparkles, FileText, Mail, History, Settings2, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type View = "new" | "ats" | "cv" | "letter" | "history" | "profile" | "settings";

export function Sidebar({ view, onView }: { view: View; onView: (v: View) => void }) {
  const items: { id: View; label: string; icon: React.ElementType }[] = [
    { id: "new", label: "Nouvelle candidature", icon: Sparkles },
    { id: "ats", label: "Analyse ATS", icon: LayoutDashboard },
    { id: "cv", label: "Mon CV", icon: FileText },
    { id: "letter", label: "Ma lettre", icon: Mail },
    { id: "history", label: "Historique", icon: History },
    { id: "profile", label: "Mon profil", icon: User },
    { id: "settings", label: "Paramètres", icon: Settings2 },
  ];

  return (
    <aside className="hidden lg:flex h-screen w-60 flex-col border-r bg-card/40 px-4 py-6 sticky top-0">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Briefcase className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Job Tool</p>
          <p className="text-[10px] text-muted-foreground">Amine Ben Bouazza</p>
        </div>
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
      <div className="mt-auto pt-6 text-[10px] text-muted-foreground px-2">
        <p>V1 MVP local • DeepSeek</p>
        <p className="mt-0.5">Stockage local, 0 cloud.</p>
      </div>
    </aside>
  );
}
