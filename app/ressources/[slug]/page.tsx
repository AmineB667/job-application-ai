import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug, getAllSlugs } from "@/lib/articles";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Job Application AI`,
    description: article.description,
    metadataBase: new URL("https://jobapplication.fr"),
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://jobapplication.fr/ressources/${article.slug}`,
      siteName: "Job Application AI",
      locale: "fr_FR",
      type: "article",
      publishedTime: article.date,
    },
    alternates: {
      canonical: `https://jobapplication.fr/ressources/${article.slug}`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateStr)
  );
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-6xl flex items-center justify-between px-6 h-14">
          <Link href="/" className="font-bold text-sm hover:text-primary transition-colors">
            ← Job Application AI
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/ressources" className="text-muted-foreground hover:text-foreground transition-colors">
              Ressources
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container max-w-3xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-foreground transition-colors">Ressources</Link>
          <span>›</span>
          <span className="text-foreground">{article.category}</span>
        </nav>
      </div>

      {/* Article header */}
      <div className="container max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground">{article.readTime} min de lecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">{article.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-4">
          <time dateTime={article.date}>Publié le {formatDate(article.date)}</time>
        </div>
      </div>

      {/* Article content */}
      <main className="container max-w-3xl mx-auto px-6 pb-12">
        <div
          className="prose prose-gray dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:leading-relaxed prose-p:text-muted-foreground
            prose-li:text-muted-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-pre:bg-muted prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:p-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA inline */}
        <div className="my-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center space-y-3">
          <p className="font-semibold">Testez votre CV contre cette offre gratuitement</p>
          <p className="text-sm text-muted-foreground">
            Score ATS en 20 secondes, CV refondu + lettre de motivation personnalisée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Analyser mon CV →
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="text-base font-semibold mb-5">Articles similaires</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/ressources/${r.slug}`}
                  className="group rounded-lg border p-4 hover:border-primary/40 hover:bg-muted/40 transition-all"
                >
                  <p className="text-xs text-muted-foreground mb-1">{r.readTime} min</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="container max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} JobApplication.fr</span>
          <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
          <Link href="/cgu" className="hover:text-foreground transition-colors">CGU</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
