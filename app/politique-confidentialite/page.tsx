import type { Metadata } from "next";
import { LegalLayout, Section, Dl, Ul } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Job Application AI",
  description: "Politique de confidentialité de JobApplication.fr — traitement des données, prestataires, droits.",
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="21 mai 2026">

      <Section title="1. Objet">
        <p className="text-muted-foreground">
          La présente politique décrit les modalités de traitement des informations liées à
          l&apos;utilisation du service JobApplication.fr.
        </p>
      </Section>

      <Section title="2. Fonctionnement du service">
        <p className="text-muted-foreground">
          JobApplication.fr fournit des outils d&apos;assistance à la recherche d&apos;emploi permettant notamment :
        </p>
        <Ul items={[
          "Personnalisation de CV",
          "Génération de lettres de motivation",
          "Analyse ATS",
          "Adaptation des candidatures",
        ]} />
      </Section>

      <Section title="3. Traitement des informations">
        <p className="text-muted-foreground">
          JobApplication.fr privilégie le traitement local des contenus lorsque cette fonctionnalité est disponible.
        </p>
        <p className="text-muted-foreground">
          Les contenus importés dans l&apos;outil (CV, lettres de motivation, offres d&apos;emploi ou informations
          similaires) ne sont pas volontairement stockés sur les serveurs de JobApplication.fr lorsque le
          fonctionnement local est utilisé.
        </p>
        <p className="text-muted-foreground">
          Selon les fonctionnalités utilisées, certaines informations peuvent être transmises à des prestataires
          techniques nécessaires au fonctionnement du service.
        </p>
      </Section>

      <Section title="4. Prestataires techniques">
        <p className="text-muted-foreground">
          Le site utilise des services techniques permettant le fonctionnement, la sécurité, la mesure
          d&apos;audience ou l&apos;exécution des fonctionnalités proposées.
        </p>
        <p className="text-muted-foreground font-medium">Prestataire d&apos;hébergement :</p>
        <Dl rows={[
          ["Société", "Render Services Inc."],
          ["Adresse", <span key="a">525 Brannan Street, Suite 300<br />San Francisco, CA 94107, États-Unis</span>],
        ]} />
        <p className="text-muted-foreground">
          Le service peut également utiliser des fournisseurs de technologies d&apos;intelligence artificielle
          nécessaires aux fonctionnalités proposées.
        </p>
      </Section>

      <Section title="5. Mesure d'audience et technologies techniques">
        <p className="text-muted-foreground">
          Le site peut utiliser des outils de mesure d&apos;audience, d&apos;analyse technique ou de performance
          afin d&apos;améliorer le fonctionnement du service.
        </p>
        <p className="text-muted-foreground">
          Des cookies ou technologies similaires peuvent être utilisés conformément à la réglementation
          applicable.
        </p>
      </Section>

      <Section title="6. Conservation">
        <p className="text-muted-foreground">
          JobApplication.fr ne conserve pas volontairement les contenus importés lorsque le fonctionnement
          local est utilisé.
        </p>
        <p className="text-muted-foreground">
          Certaines données techniques nécessaires à la sécurité, à la maintenance ou au fonctionnement
          des infrastructures peuvent être temporairement traitées par les prestataires techniques.
        </p>
      </Section>

      <Section title="7. Vos droits">
        <p className="text-muted-foreground">
          Conformément à la réglementation applicable, vous pouvez contacter l&apos;éditeur du site pour
          toute question relative au traitement des données.
        </p>
        <p>
          <span className="text-muted-foreground">Contact : </span>
          <a href="mailto:benbouazzamine@gmail.com" className="underline underline-offset-2 hover:text-primary transition-colors">
            benbouazzamine@gmail.com
          </a>
        </p>
      </Section>

      <Section title="8. Modifications">
        <p className="text-muted-foreground">
          La présente politique peut évoluer afin de refléter les évolutions techniques, réglementaires
          ou fonctionnelles du service.
        </p>
      </Section>

    </LegalLayout>
  );
}
