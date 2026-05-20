import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Job Application AI",
  description: "Mentions légales de JobApplication.fr — éditeur, hébergeur, données personnelles.",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-12 px-6 space-y-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">Mentions légales</h1>

        {/* Éditeur */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold border-b pb-2">Éditeur du site</h2>
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Site</dt><dd>JobApplication.fr</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Éditeur</dt><dd>Mohamed Amine BEN BOUAZZA</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Statut</dt><dd>Entrepreneur individuel</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">SIREN</dt><dd>899 982 581</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Adresse</dt><dd>68 Rue Blanche, 75009 Paris, France</dd></div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground w-48 shrink-0">Email</dt>
              <dd>
                <a href="mailto:benbouazzamine@gmail.com" className="underline underline-offset-2 hover:text-primary transition-colors">
                  benbouazzamine@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* Responsable publication */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold border-b pb-2">Responsable de publication</h2>
          <p className="text-sm">Mohamed Amine BEN BOUAZZA</p>
        </section>

        {/* Hébergement */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold border-b pb-2">Hébergement</h2>
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Société</dt><dd>Render Services Inc.</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground w-48 shrink-0">Adresse</dt><dd>525 Brannan Street, Suite 300<br />San Francisco, CA 94107<br />États-Unis</dd></div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground w-48 shrink-0">Site</dt>
              <dd>
                <a href="https://render.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">
                  render.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <hr className="border-border" />

        {/* Utilisation */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Utilisation du service</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            JobApplication.fr est un outil d&apos;assistance à la recherche d&apos;emploi permettant notamment :
          </p>
          <ul className="text-sm space-y-1.5 list-none">
            {[
              "La personnalisation de CV",
              "La génération de lettres de motivation",
              "L'analyse ATS",
              "L'aide à l'adaptation des candidatures",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              Les contenus générés constituent une aide à la rédaction et à la personnalisation des candidatures.
            </p>
            <p>
              L&apos;utilisateur demeure responsable des informations renseignées et de l&apos;utilisation finale des documents générés.
            </p>
            <p>
              JobApplication.fr ne garantit pas l&apos;obtention d&apos;un entretien ou d&apos;un emploi.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Données personnelles */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Données personnelles</h2>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              JobApplication.fr privilégie le traitement local des données.
            </p>
            <p>
              Les données personnelles renseignées dans l&apos;outil ne sont pas envoyées ni stockées sur nos serveurs lorsque le fonctionnement local est utilisé.
            </p>
            <p>
              Pour toute demande relative aux données personnelles :
            </p>
          </div>
          <p className="text-sm">
            <span className="text-muted-foreground">Contact : </span>
            <a href="mailto:benbouazzamine@gmail.com" className="underline underline-offset-2 hover:text-primary transition-colors">
              benbouazzamine@gmail.com
            </a>
          </p>
        </section>

        {/* Footer page */}
        <div className="pt-6 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} JobApplication.fr — Mohamed Amine BEN BOUAZZA
        </div>

      </div>
    </div>
  );
}
