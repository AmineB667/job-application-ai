"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useStore } from "@/lib/store";
import { ARTICLES, getArticleLocale } from "@/lib/articles";

const UI = {
  fr: {
    badge: "Guides gratuits",
    hero: "Ressources pour votre recherche d'emploi",
    heroDesc:
      "Guides pratiques sur l'optimisation ATS, l'IA pour l'emploi et la rédaction de candidatures percutantes.",
    read: "min",
    readLabel: "Lire →",
    ctaTitle: "Prêt à optimiser votre CV ?",
    ctaDesc:
      "Testez gratuitement l'analyse ATS, la réécriture de CV et la génération de lettre de motivation en 20 secondes.",
    ctaBtn: "Analyser mon CV gratuitement →",
  },
  en: {
    badge: "Free guides",
    hero: "Resources for your job search",
    heroDesc:
      "Practical guides on ATS optimization, AI for job hunting, and writing compelling applications.",
    read: "min",
    readLabel: "Read →",
    ctaTitle: "Ready to optimize your CV?",
    ctaDesc:
      "Try the ATS analysis, CV rewrite, and cover letter generation for free in 20 seconds.",
    ctaBtn: "Analyze my CV for free →",
  },
};

function formatDate(dateStr: string, lang: string) {
  const locale = lang === "en" ? "en-US" : "fr-FR";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function RessourcesContent() {
  const uiLang = useStore((s) => s.uiLang);
  const t = UI[uiLang] ?? UI.fr;

  const byCategory = ARTICLES.reduce<Record<string, typeof ARTICLES>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activePage="ressources" />

      {/* Hero */}
      <section className="py-16 px-6 text-center border-b">
        <div className="container max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
            {t.badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t.hero}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.heroDesc}</p>
        </div>
      </section>

      {/* Articles grid */}
      <main className="container max-w-6xl mx-auto px-6 py-12">
        {Object.entries(byCategory).map(([category, articles]) => (
          <section key={category} className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
              {category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const loc = getArticleLocale(article, uiLang);
                return (
                  <Link
                    key={article.slug}
                    href={`/ressources/${article.slug}`}
                    className="group flex flex-col rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.readTime} {t.read}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors mb-2 flex-1">
                      {loc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {loc.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <time dateTime={article.date}>{formatDate(article.date, uiLang)}</time>
                      <span className="group-hover:text-primary transition-colors">
                        {t.readLabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* CTA */}
      <section className="border-t py-12 text-center bg-muted/30">
        <div className="container max-w-2xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
          <p className="text-muted-foreground">{t.ctaDesc}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.ctaBtn}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="container max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} JobApplication.fr</span>
          <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="hover:text-foreground transition-colors"
          >
            Confidentialité
          </Link>
          <Link href="/cgu" className="hover:text-foreground transition-colors">
            CGU
          </Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">
            Cookies
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
