import type { Metadata } from "next";
import { LegalLayout, Section, Ul } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Politique cookies — Job Application AI",
  description: "Politique relative aux cookies de JobApplication.fr — fonctionnement, consentement, préférences.",
};

export default function Cookies() {
  return (
    <LegalLayout title="Politique relative aux cookies" updated="21 mai 2026">

      <Section title="Utilisation des cookies">
        <p className="text-muted-foreground">
          JobApplication.fr utilise des cookies ou technologies similaires pouvant être nécessaires :
        </p>
        <Ul items={[
          "Au fonctionnement du service",
          "À la sécurité du site",
          "À la mesure d'audience",
          "À l'amélioration des performances",
        ]} />
        <p className="text-muted-foreground">
          Des outils techniques ou prestataires tiers peuvent déposer certains traceurs conformément
          à leur fonctionnement.
        </p>
      </Section>

      <Section title="Consentement">
        <p className="text-muted-foreground">
          Lorsque la réglementation applicable exige un consentement préalable, celui-ci est recueilli
          avant l&apos;activation des traceurs concernés.
        </p>
        <p className="text-muted-foreground">
          L&apos;utilisateur peut modifier ses préférences relatives aux cookies à tout moment en cliquant
          sur le bandeau de gestion des cookies présent sur le site.
        </p>
      </Section>

    </LegalLayout>
  );
}
