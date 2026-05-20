// Profil consolidé d'Amine Ben Bouazza.
// Sert maintenant de PROFIL DÉMO : pré-chargé dans l'app au premier lancement
// ou via le bouton "Charger profil démo". Chaque visiteur peut le remplacer
// par le sien depuis la page Profil.
//
// IMPORTANT : pour ne plus afficher tes vraies coordonnées sur le déploiement
// public, ajuste les champs identity ci-dessous (email, téléphone) ou
// utilise un profil "Demo Candidate" générique.

import type { UserProfile } from "./types";

export const AMINE_PROFILE: UserProfile = {
  identity: {
    fullName: "Amine Ben Bouazza",
    title: "CEO Riff Agency • Co-fondateur Bendigital • Consultant ingénierie de certification",
    birthDate: "1998-04-03",
    nationality: "Française",
    location: "Paris, France",
    remote: "Télétravail ou présentiel",
    internationalMobility: true,
    drivingLicense: "Permis B",
    email: "benbouazzamine@gmail.com",
    phone: "+33 6 80 44 65 93",
    linkedin: "https://www.linkedin.com/in/aminebenbouazza",
    websites: ["riff.business", "bendigital.net"],
  },

  // PRIMARY ROLE : Riff Agency (rôle actuel principal d'Amine en 2026).
  // Doit apparaître en haut du CV et être systématiquement valorisé dans la lettre.
  primaryRole: "CEO Riff Agency",

  pitch: `CEO de Riff Agency et co-fondateur de Bendigital, Amine pilote deux agences actives entre Paris et Casablanca tout en conseillant l'enseignement supérieur français en ingénierie de certification (Sciences Po, ENSAM, Ferrandi). 5 ans d'expérience cumulée entre opérationnel growth (Meta Ads, Google Ads, GA4, CRO) et direction stratégique, avec un portefeuille clients de la PME au grand compte (TotalEnergies, Inwi, EA Productions). Bilingue FR/EN, IA-driven, orientation ROI.`,

  experiences: [
    {
      role: "CEO • Co-fondateur",
      company: "Riff Agency (riff.business)",
      location: "Paris & Casablanca",
      start: "2023",
      end: null,
      current: true,
      isPrimary: true,
      bullets: [
        "Direction générale d'une agence music business positionnée sur l'axe MENA-Europe pour la scène hip-hop et urbaine contemporaine",
        "Pilotage de 8 verticales intégrées : marketing digital, relations presse FR/MENA/international, release et distribution DSP, artist management, booking et live, brand partnerships et sync, direction créative, merch et e-commerce",
        "Conception et exécution de campagnes Meta Ads chirurgicales pour remplissage de salles et drive de releases, avec ciblages comportementaux diaspora et audiences régionales",
        "Structuration de l'équipe, pilotage P&L, négociation des partenariats stratégiques avec promoteurs et labels",
        "Clients et partenaires : EA Productions (promoteur Paris), 212 Live off (promoteur MENA), artistes indépendants en développement",
      ],
    },
    {
      role: "Fondateur • Consultant indépendant en ingénierie de certification",
      company: "BEN&Co",
      location: "Paris",
      start: "2025-07",
      end: null,
      current: true,
      bullets: [
        "Accompagnement d'organismes de formation et établissements d'enseignement supérieur dans leurs projets de certification professionnelle (RNCP et RS)",
        "Rédaction, dépôt et suivi de dossiers RNCP/RS auprès de France Compétences",
        "Études de marché et cartographie des métiers, analyse d'insertion professionnelle et d'adéquation emploi-formation",
        "Rédaction et structuration de référentiels d'activités, de compétences et d'évaluation",
        "Intégration de l'IA dans les processus d'ingénierie de certification et de veille sectorielle",
      ],
    },
    {
      role: "Co-fondateur",
      company: "Bendigital (bendigital.net)",
      location: "Paris & Casablanca",
      start: "2022",
      end: null,
      current: true,
      bullets: [
        "Co-fondation et pilotage d'une agence spécialisée en branding, web design et marketing digital",
        "Définition de stratégies de marque et de communication pour PME, grands comptes et institutions",
        "Conception et pilotage de sites web (UX/UI, WordPress, Webflow, Shopify) avec optimisation Lighthouse",
        "Mise en place de stratégies marketing complètes : SEO, SEA, Meta Ads, content marketing, A/B testing, CRO",
        "Clients : Inwi (campagne Dir Iddik), TotalEnergies, Commune de Paris 1871, Talc Paris, EAProductions, Centre Multisens Tanger",
      ],
    },
    {
      role: "Consultant en ingénierie de certification",
      company: "Lafayette Associés",
      location: "Paris",
      start: "2022",
      end: "2025",
      current: false,
      bullets: [
        "Intégration des outils IA dans les tâches quotidiennes pour améliorer l'efficacité opérationnelle des équipes",
        "Conseil stratégique en création de parcours de formation et de certifications professionnelles",
        "Accompagnement d'établissements vers les reconnaissances officielles RNCP / RS auprès de France Compétences",
        "Gestion de projets de création et de renouvellement de certifications, conduite d'études d'adéquation emploi-formation",
        "Utilisation d'outils de data analyse pour cartographier les métiers et les formations",
        "Clients : Neoma, Sciences Po, Ferrandi, ENSAM, ESIEE IT, SUP DE PUB, Autograf, Ecole Cube, CCI, ASE Formation, Ecoris, Franck Thomas",
      ],
    },
    {
      role: "Chef de Projet Digital Junior",
      company: "Merci e-commerce",
      location: "Paris",
      start: "2021",
      end: "2022",
      current: false,
      bullets: [
        "Participation à des projets digitaux pour des clients influents (audience cumulée 3M+ abonnés)",
        "Réalisation de campagnes publicitaires sociales (Meta Ads) pour grands comptes",
        "Mise en œuvre d'actions d'email marketing avec amélioration des taux d'ouverture",
        "Exécution de campagnes SMA et SEA avec approche orientée ROI",
        "Clients : AtelierTB, Blush Intimacy, BIG. Paris, Benlux, Everycheck, Martha Paris, M-swim, Angelina Design",
      ],
    },
  ],

  education: [
    {
      degree: "Mastère Stratégie e-business — Mention Très Bien",
      school: "IIM — Institut Léonard de Vinci",
      location: "Paris La Défense",
      start: "2021",
      end: "2022",
    },
    {
      degree: "Master Ingénierie des Projets Entrepreneuriaux",
      school: "Université de Caen Normandie",
      location: "Caen",
      start: "2019",
      end: "2021",
    },
  ],

  certifications: [
    "Certification Google Ads",
    "Certification Google Analytics (GA4)",
    "Data-driven planning by The Trade Desk",
    "Sales Hub by HubSpot",
  ],

  skills: [
    {
      group: "Growth & acquisition",
      items: ["Stratégie marketing & branding", "Growth marketing", "SEO technique & éditorial", "SEA (Google Ads)", "Meta Ads", "Content marketing", "CRO", "A/B testing"],
    },
    {
      group: "Data & analytics",
      items: ["Google Analytics 4 (GA4)", "Meta Pixel", "Tag Manager", "Segmentation d'audience", "Dashboards & reporting", "Pilotage data-driven"],
    },
    {
      group: "IA & automatisation",
      items: ["IA générative (contenu, visuels)", "Prompt engineering", "Intégration IA workflows", "Automatisation marketing", "Veille IA"],
    },
    {
      group: "Web, UX/UI & plateformes",
      items: ["UX/UI orienté performance", "WordPress", "Webflow", "Shopify", "Optimisation parcours", "CMS & e-commerce"],
    },
    {
      group: "Gestion de projets & conseil",
      items: ["Pilotage projets digitaux", "Conseil stratégique marketing", "Coordination prestataires", "Relation client B2B/B2C", "Ingénierie de certification RNCP/RS"],
    },
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant professionnel" },
  ],

  references: [
    { name: "Alain Gouet", role: "Consultant manager, Lafayette Associés", email: "alain.gouet@lafayetteassocies.com" },
    { name: "Johana Bolender", role: "CEO, Merci e-commerce", email: "Johana@merci-ecommerce.fr" },
    { name: "Alexandre Maïsetti", role: "CEO, Talc Paris & Commune de Paris 1871", email: "alexandre@talc-paris.fr" },
  ],

  // Réalisations chiffrées plausibles à utiliser pour étoffer (à confirmer en entretien).
  // L'IA peut s'appuyer dessus pour ajouter de l'impact business.
  achievementsBank: [
    "Pilotage d'un portefeuille de 12+ clients PME et grands comptes en parallèle",
    "Co-fondation de 2 agences (Bendigital + Riff Agency) actives Paris & Casablanca",
    "Dossiers RNCP/RS instruits pour des écoles classées (Sciences Po, Ferrandi, ENSAM, ESIEE IT)",
    "Campagnes Meta Ads à audiences segmentées (diaspora MENA, grand public FR, B2B SaaS)",
    "Sites web livrés sous WordPress/Webflow/Shopify avec scores Lighthouse > 90",
    "Intégration d'IA générative dans les workflows de production de contenu et de référentiels",
    "Études de cartographie métiers/formations utilisées pour décisions d'investissement formation",
  ],
};

// Profil vide utilisable par défaut au premier lancement (nouveaux visiteurs).
// L'utilisateur peut cliquer "Charger profil démo" pour le remplir avec AMINE_PROFILE
// et voir l'app en action.
export const EMPTY_PROFILE: UserProfile = {
  identity: {
    fullName: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    websites: [],
  },
  primaryRole: "",
  pitch: "",
  experiences: [],
  education: [],
  certifications: [],
  skills: [],
  languages: [],
  achievementsBank: [],
};
