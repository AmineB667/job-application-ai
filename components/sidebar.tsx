"use client";

import * as React from "react";
import { LayoutDashboard, Sparkles, FileText, Mail, History, Settings2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

export type View = "new" | "ats" | "cv" | "letter" | "history" | "profile" | "settings";

export function Sidebar({ view, onView }: { view: View; onView: (v: View) => void }) {
  const t = useT();

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
          width={155}
          height={42}
          className="dark:hidden"
          priority
        />
        <Image
          src="/logo-dark.svg"
          alt="Job Application AI"
          width={155}
          height={42}
          className="hidden dark:block"
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
        {/* Contact */}
        <p>
          <a
            href="mailto:benbouazzamine@gmail.com"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            {t.footer.contact}
          </a>
        </p>

        {/* Liens légaux */}
        <div className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed">
          <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Mentions légales
          </Link>
          <span>·</span>
          <Link href="/cgu" className="underline underline-offset-2 hover:text-foreground transition-colors">
            CGU
          </Link>
          <span>·</span>
          <Link href="/politique-confidentialite" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Confidentialité
          </Link>
          <span>·</span>
          <Link href="/cookies" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </aside>
  );
}
