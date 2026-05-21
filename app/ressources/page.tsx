import type { Metadata } from "next";
import { RessourcesContent } from "@/components/ressources-content";

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
  alternates: {
    canonical: "https://jobapplication.fr/ressources",
  },
};

export default function RessourcesPage() {
  return <RessourcesContent />;
}
