import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Job Application AI",
    short_name: "JobApp AI",
    description:
      "Outil IA gratuit pour optimiser votre CV, analyser votre compatibilité ATS et rédiger des lettres de motivation personnalisées.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    orientation: "portrait-primary",
    lang: "fr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["productivity", "education", "business"],
    screenshots: [],
  };
}
