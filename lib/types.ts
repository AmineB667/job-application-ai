// Schémas partagés entre serveur et UI.

export type OutputLanguage = "fr" | "en";

// =====================================================================
// PROFIL UTILISATEUR — désormais multi-user (stocké en localStorage côté
// client, envoyé au serveur à chaque appel d'analyse).
// =====================================================================
export type ProfileExperience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string | null;
  current: boolean;
  isPrimary?: boolean;
  bullets: string[];
};

export type ProfileEducation = {
  degree: string;
  school: string;
  location?: string;
  start: string;
  end: string;
};

export type ProfileLanguage = { name: string; level: string };
export type ProfileReference = { name: string; role: string; email: string };

export type UserProfile = {
  identity: {
    fullName: string;
    title: string;
    birthDate?: string;
    nationality?: string;
    location: string;
    remote?: string;
    internationalMobility?: boolean;
    drivingLicense?: string;
    email: string;
    phone: string;
    linkedin?: string;
    websites?: string[];
  };
  primaryRole: string;
  pitch: string;
  experiences: ProfileExperience[];
  education: ProfileEducation[];
  certifications: string[];
  skills: { group: string; items: string[] }[];
  languages: ProfileLanguage[];
  references?: ProfileReference[];
  achievementsBank?: string[];
};


export type CVTemplate = "classic" | "modern" | "minimal";

export const CV_TEMPLATES: { id: CVTemplate; label: string; description: string }[] = [
  { id: "classic", label: "Classique", description: "Polices Helvetica, structure traditionnelle, headers en majuscules. Lecture rapide, scan ATS optimal." },
  { id: "modern", label: "Moderne", description: "Accent typographique sur le nom, hiérarchie plus marquée, légère touche de couleur. Reste ATS safe." },
  { id: "minimal", label: "Minimal", description: "Très épuré, gros blancs, focus sur le contenu. Conseillé pour postes seniors et cabinets de conseil." },
];

export type CVTone =
  | "ats-maximal"
  | "corporate"
  | "startup"
  | "freelance"
  | "marketing-digital"
  | "consulting";

export type LetterTone =
  | "startup"
  | "scaleup"
  | "grand-groupe"
  | "cabinet-conseil"
  | "freelance"
  | "pme";

export type ATSAnalysis = {
  scores: {
    overall: number;
    keywords: number;
    experience: number;
    skills: number;
    ats: number;
  };
  extracted: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
    technologies: string[];
    certifications: string[];
    experienceLevel: string;
    priorityKeywords: string[];
    actionVerbs: string[];
    implicitSkills: string[];
  };
  gaps: {
    missingSkills: string[];
    missingKeywords: string[];
    skillsToReframe: string[];
    titleSuggestions: string[];
    parsingIssues: string[];
    weakSections: string[];
  };
  atsCompat: {
    workday: number;
    taleo: number;
    greenhouse: number;
    lever: number;
    smartrecruiters: number;
  };
  optimizations: string[];
  warnings: string[];
};

export type CVDocument = {
  title: string;
  headline: string;
  summary: string;
  experiences: {
    role: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  }[];
  education: { degree: string; school: string; period: string }[];
  certifications: string[];
  skills: { group: string; items: string[] }[];
  languages: { name: string; level: string }[];
  keywordDensity: { keyword: string; count: number }[];
};

export type CoverLetter = {
  subject: string;
  greeting: string;
  parts: {
    intro: string; // pourquoi le poste / l'entreprise / lien activité
    proof: string; // compétence → action → résultat (chiffrés)
    fit: string; // pourquoi mon profil répond précisément au besoin
    close: string; // conclusion concise
  };
  signature: string;
  wordCount: number;
};

export type CoachAdvice = {
  candidatureScore: number;
  scoreReason: string;
  skillsToGrow: string[];
  certificationsToConsider: string[];
  cvImprovements: string[];
  letterImprovements: string[];
  estimatedInterviewProbability:
    | "faible" | "moyenne" | "forte" | "très forte"
    | "low" | "medium" | "strong" | "very strong";
};

export type AnalysisResult = {
  ats: ATSAnalysis;
  cv: CVDocument;
  letter: CoverLetter;
  coach: CoachAdvice;
  meta: {
    targetCompany: string | null;
    jobTitle: string | null;
    cvTone: CVTone;
    letterTone: LetterTone;
    language: OutputLanguage;
    generatedAt: string;
  };
};
