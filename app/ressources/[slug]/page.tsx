import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import { ArticlePageContent } from "@/components/article-page-content";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const fr = article.fr;
  return {
    title: `${fr.title} | Job Application AI`,
    description: fr.description,
    metadataBase: new URL("https://jobapplication.fr"),
    openGraph: {
      title: fr.title,
      description: fr.description,
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

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <ArticlePageContent article={article} />;
}
