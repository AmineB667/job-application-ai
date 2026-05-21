import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import { LanguageSwitcher } from "@/components/language-switcher";

export const metadata: Metadata = {
  title: "Ressources — CV, ATS & IA pour l'emploi | Job Application AI",
  description:
    "Guides pratiques et articles SEO sur l'optimisation de CV, les logiciels ATS, l'utilisation de l'IA dans la recherche d'emploi et la rédaction de lettres de motivation.",
  metadataBase: new URL("https://jobapplication.fr"),
  openGraph: {
    title: "Ressources — CV, ATS & IA pour l'emploi",
    description:
      "Guides gratuits pour optimiser votre CV, comprendre les ATS et utiliser l'IA dans votre recherche d'emploi.",
    url: "https://jobapplication.fr/ressources",
    siteName: "Job Application AI",
    locale: "fr_FR",
    type: "website",
  },
};

const CATEGORIES = ["Tous", "CV & ATS", "Stratégie", "IA & Emploi"];

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateStr)
  );
}

export default function RessourcesPage() {
  const byCategory = ARTICLES.reduce<Record<string, typeof ARTICLES>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-6xl flex items-center justify-between px-6 h-14">
          <Link href="/" className="font-bold text-sm hover:text-primary transition-colors">
            ← Job Application AI
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/ressources" className="font-semibold text-primary">
              Ressources
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 text-center border-b">
        <div className="container max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
            Guides gratuits
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Ressources pour votre recherche d&apos;emploi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guides pratiques sur l&apos;optimisation ATS, l&apos;IA pour l&apos;emploi et la rédaction de candidatures percutantes.
          </p>
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
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ressources/${article.slug}`}
                  className="group flex flex-col rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                  </div>
                  <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors mb-2 flex-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span className="group-hover:text-primary transition-colors">Lire →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CTA */}
      <section className="border-t py-12 text-center bg-muted/30">
        <div className="container max-w-2xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl font-bold">Prêt à optimiser votre CV ?</h2>
          <p className="text-muted-foreground">
            Testez gratuitement l&apos;analyse ATS, la réécriture de CV et la génération de lettre de motivation en 20 secondes.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
          >
            Analyser mon CV gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="container max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} JobApplication.fr</span>
          <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
          <Link href="/cgu" className="hover:text-foreground transition-colors">CGU</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
