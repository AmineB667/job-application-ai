"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CONSENT_KEY = "cookie-consent";
export type ConsentValue = "accepted" | "rejected";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Afficher uniquement si l'utilisateur n'a pas encore fait de choix
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    // Déclencher le chargement de GTM
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t bg-background/98 backdrop-blur shadow-xl"
    >
      <div className="container max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre expérience.
          Vos données personnelles ne sont pas stockées sur nos serveurs.{" "}
          <Link href="/cookies" className="underline underline-offset-2 hover:text-foreground transition-colors">
            En savoir plus
          </Link>
          {" "}·{" "}
          <Link href="/politique-confidentialite" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Politique de confidentialité
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={reject}>
            Refuser
          </Button>
          <Button size="sm" onClick={accept}>
            Tout accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
