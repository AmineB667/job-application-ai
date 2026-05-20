// PROFIL DÉMO — données fictives.
// Affiché aux visiteurs qui cliquent "Load demo profile" depuis la page Profile.
// Ne représente personne en particulier. Sert uniquement à démontrer ce qu'un
// profil bien rempli donne en sortie (CV + lettre de motivation).
//
// Pour utiliser l'app avec ton vrai profil :
// 1. Va dans "Mon profil"
// 2. Clique "Import JSON" et charge ton propre profil JSON
// 3. Ou édite manuellement les champs

import type { UserProfile } from "./types";

export const AMINE_PROFILE: UserProfile = {
  identity: {
    fullName: "Jordan Martin",
    title: "Head of Growth — SaaS B2B",
    nationality: "Française",
    location: "Paris, France",
    remote: "Hybride ou télétravail",
    internationalMobility: true,
    email: "jordan.martin@example.com",
    phone: "+33 6 00 00 00 00",
    linkedin: "https://www.linkedin.com/in/jordan-martin-demo",
    websites: ["jordanmartin.example"],
  },

  primaryRole: "Head of Growth at MetricFlow",

  pitch: `Head of Growth chez MetricFlow, une scale-up SaaS B2B en série B, j'ai construit la fonction acquisition de zéro à 8M€ d'ARR sur 24 mois. Profil hybride opérationnel et stratégique, je manipule indifféremment Google Ads, Meta Ads, LinkedIn Ads, GA4 et HubSpot, et je sais cadrer une équipe de 5 marketeurs autour de cycles d'expérimentation hebdomadaires. Bilingue FR/EN, data-driven, orientation ROI.`,

  experiences: [
    {
      role: "Head of Growth",
      company: "MetricFlow",
      location: "Paris",
      start: "2023",
      end: null,
      current: true,
      isPrimary: true,
      bullets: [
        "Construction de la fonction acquisition d'une scale-up SaaS B2B de zéro à 8M€ d'ARR en 24 mois, avec une équipe de 5 marketeurs internalisés",
        "Pilotage d'un budget paid annuel de 1.8M€ répartis entre LinkedIn Ads, Google Ads et Meta, avec un CAC blended ramené de 1400€ à 620€",
        "Mise en place d'une stack tracking GA4 + HubSpot + Looker permettant l'attribution multi-touch et l'identification des canaux à plus fort levier",
        "Lancement d'une stratégie SEO B2B qui génère aujourd'hui 30 leads qualifiés par mois à coût marginal proche de zéro",
      ],
    },
    {
      role: "Senior Growth Manager",
      company: "PixelHive Agency",
      location: "Paris",
      start: "2021",
      end: "2023",
      current: false,
      bullets: [
        "Gestion d'un portefeuille de 12 clients SaaS et DTC, avec des budgets paid de 5k à 150k€ par mois et des résultats CAC documentés",
        "Refonte du funnel d'un client e-commerce mode ayant divisé le coût d'acquisition par 2.4 en six semaines à budget constant",
        "Conception et exécution de plans de contenu SEO et social pour des marques institutionnelles et early-stage",
        "Coordination quotidienne avec les équipes créatives, dev et data pour livrer des campagnes intégrées",
      ],
    },
    {
      role: "Marketing Manager",
      company: "Velocity Commerce",
      location: "Lyon",
      start: "2019",
      end: "2021",
      current: false,
      bullets: [
        "Lancement et structuration de la fonction marketing d'un acteur DTC en hypercroissance, passage de 800k€ à 4M€ de CA annuel",
        "Mise en place des premiers tracking et reporting permettant un pilotage data-driven des campagnes paid et email",
        "Animation d'une équipe de 3 personnes couvrant content, paid et CRM, avec une cadence d'expérimentation bi-mensuelle",
        "Négociation et exécution de partenariats d'influence avec des créateurs représentant 5M+ d'audience cumulée",
      ],
    },
    {
      role: "Marketing Analyst",
      company: "Nordica E-commerce",
      location: "Paris",
      start: "2017",
      end: "2019",
      current: false,
      bullets: [
        "Analyse de la performance des campagnes acquisition pour un portefeuille de marques DTC européennes représentant 2M€ de budget annuel",
        "Construction de dashboards Looker partagés entre marketing, finance et direction pour aligner les décisions sur des données fiables",
        "Recommandations d'arbitrage budgétaire ayant permis de réallouer 25% du budget paid vers les canaux à meilleur ROAS",
        "Veille concurrentielle continue sur les outils, plateformes et tendances acquisition pour le comité de direction",
      ],
    },
  ],

  education: [
    {
      degree: "Master Marketing Digital et Stratégie e-business",
      school: "ESCP Business School",
      location: "Paris",
      start: "2015",
      end: "2017",
    },
    {
      degree: "Bachelor Business Administration",
      school: "Université Paris Dauphine",
      location: "Paris",
      start: "2012",
      end: "2015",
    },
  ],

  certifications: [
    "Google Ads Certification",
    "Google Analytics 4 Certification",
    "HubSpot Inbound Marketing",
    "Meta Blueprint Certified Buying",
  ],

  skills: [
    {
      group: "Growth & acquisition",
      items: ["Stratégie growth", "SEA (Google Ads)", "Meta Ads", "LinkedIn Ads", "SEO B2B", "Marketing automation", "CRO", "A/B testing"],
    },
    {
      group: "Data & analytics",
      items: ["Google Analytics 4 (GA4)", "Looker", "HubSpot", "Tag Manager", "Attribution multi-touch", "Segmentation comportementale"],
    },
    {
      group: "Management & leadership",
      items: ["Recrutement et structuration d'équipe", "Pilotage budget annuel", "Reporting comex", "Coaching individuel", "OKR"],
    },
    {
      group: "Outils & stack",
      items: ["HubSpot", "Webflow", "Notion", "Figma", "Zapier", "n8n"],
    },
    {
      group: "Soft skills",
      items: ["Communication écrite et orale", "Esprit analytique", "Décision sous incertitude", "Curiosité produit", "Autonomie"],
    },
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant professionnel (C1)" },
    { name: "Espagnol", level: "Intermédiaire (B1)" },
  ],

  achievementsBank: [
    "Construction d'une fonction acquisition de zéro à 8M€ d'ARR en 24 mois",
    "Diminution du CAC blended de 1400€ à 620€ sur 18 mois",
    "Lancement et structuration de plusieurs équipes marketing (3 à 8 personnes)",
    "Pilotage de budgets paid mensuels de 50k à 200k€",
    "Refonte de funnels ayant divisé le CAC par 2 sur des comptes DTC",
    "Mise en place de stacks tracking propres (GA4 + HubSpot + Looker) pour pilotage attribution",
  ],
};

// Profil vide utilisé par défaut au premier lancement (nouveaux visiteurs).
// L'utilisateur peut cliquer "Load demo profile" pour le remplir avec AMINE_PROFILE
// (ci-dessus, fictif) et voir l'app en action, puis remplacer par ses propres données.
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
