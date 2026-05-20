// Section titles utilisés par les templates CV (preview + PDF + DOCX).
// Tout autre texte (résumé, bullets, headlines, etc.) est généré par l'IA
// dans la langue cible et n'a pas besoin d'i18n.

import type { OutputLanguage } from "./types";

export const CV_STRINGS = {
  fr: {
    sectionExperience: "Expérience professionnelle",
    sectionEducation: "Formation",
    sectionSkills: "Compétences",
    sectionCertifications: "Certifications",
    sectionLanguages: "Langues",
    sectionSkillsCombined: "Compétences et langues",
    labelCertifications: "Certifications",
    labelLanguages: "Langues",
    expShort: "Expérience",
    eduShort: "Formation",
    skillsShort: "Compétences",
  },
  en: {
    sectionExperience: "Professional Experience",
    sectionEducation: "Education",
    sectionSkills: "Skills",
    sectionCertifications: "Certifications",
    sectionLanguages: "Languages",
    sectionSkillsCombined: "Skills and Languages",
    labelCertifications: "Certifications",
    labelLanguages: "Languages",
    expShort: "Experience",
    eduShort: "Education",
    skillsShort: "Skills",
  },
} as const;

export const LETTER_STRINGS = {
  fr: { subject: "Objet" },
  en: { subject: "Subject" },
} as const;

export function tCV(lang: OutputLanguage) {
  return CV_STRINGS[lang];
}

export function tLetter(lang: OutputLanguage) {
  return LETTER_STRINGS[lang];
}
