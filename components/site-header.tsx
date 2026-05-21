"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  activePage?: "ressources" | "contact" | "legal" | undefined;
}

export function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="container max-w-6xl flex items-center justify-between px-6 h-14">
        {/* Logo — clickable, returns home */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="inline-flex bg-white rounded-md px-2 py-1">
            <Image
              src="/logo.png"
              alt="JobApplication.fr"
              width={180}
              height={44}
              className="h-11 w-auto"
              priority
            />
          </span>
        </Link>

        {/* Nav + controls */}
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/ressources"
            className={cn(
              "transition-colors hidden sm:block",
              activePage === "ressources"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Ressources
          </Link>
          <Link
            href="/contact"
            className={cn(
              "transition-colors hidden sm:block",
              activePage === "contact"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Contact
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
