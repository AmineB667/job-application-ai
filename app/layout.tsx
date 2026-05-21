import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { CookieBanner } from "@/components/cookie-banner";
import { GTMLoader, GTMNoScript } from "@/components/gtm-loader";

export const metadata: Metadata = {
  title: "Job Application AI",
  description: "Outil IA gratuit pour optimiser votre CV et rédiger des lettres de motivation personnalisées en FR ou EN. Score ATS, 3 templates, export PDF + DOCX.",
  metadataBase: new URL("https://jobapplication.fr"),
  openGraph: {
    title: "Job Application AI",
    description: "Analysez votre CV face à une offre, générez un CV ATS-optimisé et une lettre de motivation en 20 secondes.",
    url: "https://jobapplication.fr",
    siteName: "Job Application AI",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* GTM noscript — rendu uniquement après consentement */}
        <GTMNoScript />
        {/* GTM loader conditionnel au consentement cookies */}
        <GTMLoader />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" />
          {/* Bandeau cookies RGPD */}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
