import type { Metadata } from "next";
import { LegalLayout, Section, Ul } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Job Application AI",
  description: "CGU de JobApplication.fr — conditions d'utilisation, responsabilité, intelligence artificielle.",
};

export default function CGU() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" updated="21 mai 2026">

      <Section title="1. Objet">
        <p className="text-muted-foreground">
          JobApplication.fr fournit un service d&apos;assistance à la recherche d&apos;emploi reposant notamment
          sur des technologies d&apos;intelligence artificielle.
        </p>
      </Section>

      <Section title="2. Acceptation">
        <p className="text-muted-foreground">
          L&apos;utilisation du site implique l&apos;acceptation pleine et entière des présentes conditions.
        </p>
      </Section>

      <Section title="3. Utilisation du service">
        <p className="text-muted-foreground">L&apos;utilisateur demeure responsable :</p>
        <Ul items={[
          "Des informations renseignées",
          "Des documents importés",
          "Des contenus générés",
          "De l'utilisation finale des documents produits",
        ]} />
        <p className="text-muted-foreground">L&apos;utilisateur s&apos;engage à ne pas utiliser le service dans un cadre :</p>
        <Ul items={[
          "Illégal",
          "Frauduleux",
          "Contraire à la réglementation applicable",
          "Portant atteinte aux droits de tiers",
        ]} />
      </Section>

      <Section title="4. Disponibilité">
        <p className="text-muted-foreground">
          JobApplication.fr s&apos;efforce d&apos;assurer un accès continu au service.
        </p>
        <p className="text-muted-foreground">
          Toutefois, le service peut être interrompu temporairement pour maintenance, évolution technique
          ou incident indépendant de la volonté de l&apos;éditeur.
        </p>
      </Section>

      <Section title="5. Intelligence artificielle">
        <p className="text-muted-foreground">
          Les contenus produits constituent une assistance automatisée.
        </p>
        <p className="text-muted-foreground">
          L&apos;utilisateur demeure responsable de la vérification, validation et utilisation finale
          des documents générés.
        </p>
      </Section>

      <Section title="6. Limitation de responsabilité">
        <p className="text-muted-foreground">JobApplication.fr ne saurait être tenu responsable :</p>
        <Ul items={[
          "D'une décision de recrutement",
          "D'un refus de candidature",
          "D'une absence d'entretien",
          "D'informations incorrectes fournies par l'utilisateur",
          "D'une indisponibilité temporaire du service",
          "D'erreurs ou limitations liées aux technologies d'intelligence artificielle",
        ]} />
      </Section>

      <Section title="7. Propriété intellectuelle">
        <p className="text-muted-foreground">
          Les éléments originaux composant le service demeurent protégés conformément aux règles
          applicables en matière de propriété intellectuelle.
        </p>
      </Section>

      <Section title="8. Modification">
        <p className="text-muted-foreground">
          Les présentes conditions peuvent être modifiées à tout moment.
        </p>
      </Section>

      <Section title="9. Droit applicable">
        <p className="text-muted-foreground">
          Les présentes conditions sont soumises au droit français.
        </p>
        <p className="text-muted-foreground">
          Tout litige relève des juridictions françaises compétentes.
        </p>
      </Section>

    </LegalLayout>
  );
}
