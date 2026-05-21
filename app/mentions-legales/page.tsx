import type { Metadata } from "next";
import { LegalLayout, Section, Dl } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Mentions légales — Job Application AI",
  description: "Mentions légales de JobApplication.fr — éditeur, hébergement, propriété intellectuelle, responsabilité.",
};

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">

      <Section title="Éditeur du site">
        <Dl rows={[
          ["Site", "JobApplication.fr"],
          ["Éditeur", "Mohamed Amine BEN BOUAZZA"],
          ["Statut", "Entrepreneur individuel"],
          ["SIREN", "899 982 581"],
          ["Adresse", <span key="addr">68 Rue Blanche<br />75009 Paris<br />France</span>],
          ["Contact", <a key="email" href="mailto:benbouazzamine@gmail.com" className="underline underline-offset-2 hover:text-primary transition-colors">benbouazzamine@gmail.com</a>],
          ["Responsable de publication", "Mohamed Amine BEN BOUAZZA"],
        ]} />
      </Section>

      <Section title="Hébergement">
        <Dl rows={[
          ["Société", "Render Services Inc."],
          ["Adresse", <span key="raddr">525 Brannan Street, Suite 300<br />San Francisco, CA 94107<br />États-Unis</span>],
          ["Site", <a key="rsite" href="https://render.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">https://render.com</a>],
        ]} />
      </Section>

      <Section title="Propriété intellectuelle">
        <p className="text-muted-foreground">
          Les éléments originaux présents sur JobApplication.fr, notamment les textes, interfaces,
          éléments graphiques, fonctionnalités, structure du site et contenus originaux sont protégés
          par les dispositions applicables relatives à la propriété intellectuelle.
        </p>
        <p className="text-muted-foreground">
          Toute reproduction, adaptation, diffusion ou exploitation non autorisée peut être interdite
          conformément à la réglementation applicable.
        </p>
        <p className="text-muted-foreground">
          Les contenus appartenant à des tiers demeurent la propriété de leurs titulaires respectifs.
        </p>
      </Section>

      <Section title="Responsabilité">
        <p className="text-muted-foreground">
          JobApplication.fr fournit une assistance à la recherche d&apos;emploi via des outils d&apos;intelligence artificielle.
        </p>
        <p className="text-muted-foreground">
          Les contenus générés constituent une aide à la rédaction et à la personnalisation des candidatures.
        </p>
        <p className="text-muted-foreground">
          L&apos;utilisateur demeure responsable des informations renseignées, des documents importés et de
          l&apos;utilisation finale des contenus générés.
        </p>
        <p className="text-muted-foreground">
          JobApplication.fr ne garantit ni l&apos;obtention d&apos;un entretien ni l&apos;obtention d&apos;un emploi.
        </p>
      </Section>

    </LegalLayout>
  );
}
