"use client";

import * as React from "react";
import { CONSENT_KEY } from "@/components/cookie-banner";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

const GTM_ID = "GTM-PMDHSWW8";

function injectGTM() {
  if (typeof window === "undefined") return;
  if (document.getElementById("gtm-script")) return; // déjà chargé

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.insertBefore(script, document.head.firstChild);
}

/**
 * Charge GTM uniquement si l'utilisateur a accepté les cookies.
 * S'abonne à l'événement dispatché par CookieBanner pour une activation en temps réel.
 */
export function GTMLoader() {
  React.useEffect(() => {
    // Déjà accepté lors d'une visite précédente
    if (localStorage.getItem(CONSENT_KEY) === "accepted") {
      injectGTM();
    }

    // Consentement donné pendant cette session
    window.addEventListener("cookie-consent-accepted", injectGTM);
    return () => window.removeEventListener("cookie-consent-accepted", injectGTM);
  }, []);

  return null;
}

/** Noscript fallback GTM — rendu uniquement côté client après consentement. */
export function GTMNoScript() {
  const [consented, setConsented] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "accepted") setConsented(true);
    const handler = () => setConsented(true);
    window.addEventListener("cookie-consent-accepted", handler);
    return () => window.removeEventListener("cookie-consent-accepted", handler);
  }, []);

  if (!consented) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
