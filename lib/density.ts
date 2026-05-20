// Calcule un facteur d'échelle uniforme à appliquer aux polices et marges
// pour qu'un CV remplisse harmonieusement une page A4, quel que soit le
// volume de contenu produit par l'IA.
//
// Principe :
// 1. On totalise tous les caractères significatifs du CV (résumé, expériences, bullets, compétences, etc.)
// 2. On compare ce total à un baseline calibré pour qu'un CV "dense" remplisse A4 à police 10pt.
// 3. Si le contenu est plus court, on monte la police. S'il est plus long, on la baisse.
//    La racine carrée du ratio donne un comportement smooth (sensible mais pas violent).

import type { CVDocument } from "./types";

export function computeCVDensityScale(cv: CVDocument): number {
  const headerChars = (cv.title?.length ?? 0) + (cv.headline?.length ?? 0);
  const summaryChars = cv.summary?.length ?? 0;

  const expChars = cv.experiences.slice(0, 4).reduce((s, e) => {
    const meta = e.role.length + e.company.length + e.location.length + e.period.length;
    const bullets = e.bullets.slice(0, 4).reduce((sb, b) => sb + b.length, 0);
    return s + meta + bullets;
  }, 0);

  const eduChars = cv.education.reduce((s, ed) => s + ed.degree.length + ed.school.length + ed.period.length, 0);

  const skillsChars = cv.skills.slice(0, 5).reduce(
    (s, g) => s + g.group.length + g.items.join(", ").length,
    0
  );

  const certChars = cv.certifications.join(", ").length;
  const langChars = cv.languages.map((l) => `${l.name} ${l.level}`).join(", ").length;

  const totalChars = headerChars + summaryChars + expChars + eduChars + skillsChars + certChars + langChars;

  // Baseline calibré : à ~3400 caractères, la page est bien remplie à 10pt.
  // Sous 3400, on grossit. Au-dessus, on rétrécit.
  const BASELINE = 3400;
  const raw = Math.sqrt(BASELINE / Math.max(totalChars, 1500));

  // Clamp pour rester dans la zone lisible et imprimable.
  return Math.min(Math.max(raw, 0.88), 1.35);
}
