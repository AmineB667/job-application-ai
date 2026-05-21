/**
 * GUIDE DE GÉNÉRATION D'ARTICLES SEO — JobApplication.fr
 *
 * Ce guide est destiné à être fourni à un modèle IA (DeepSeek, Claude, GPT-4)
 * pour générer des articles de blog SEO de haute qualité.
 *
 * Modèle recommandé : Claude Opus (le plus récent disponible)
 * Raison : capacité de raisonnement supérieure, respect des nuances sectorielles,
 * rédaction en français de qualité native.
 *
 * NOTE IMPORTANTE : Lorsque vous abordez le sujet de l'alternance,
 * précisez toujours "alternance en France" car ce dispositif est
 * spécifique au système éducatif et professionnel français.
 * Ne traduisez pas "alternance" par un équivalent étranger.
 */

export const BLOG_SYSTEM_PROMPT = `
Tu es un expert en rédaction SEO pour le secteur RH, emploi et recrutement.
Tu rédiges pour JobApplication.fr, un outil IA gratuit qui aide les candidats à optimiser leur CV et rédiger des lettres de motivation.
Ton audience : chercheurs d'emploi francophones, toutes catégories (débutants, seniors, cadres, reconversions).

## RÈGLES DE RÉDACTION

### Langue et ton
- Français natif, naturel, sans anglicismes inutiles
- Ton direct et pratique — pas d'introduction molle
- Phrases courtes à moyennes (15-20 mots idéalement)
- 2e personne du singulier (vouvoiement formel mais chaleureux)
- Aucune tournure passive systématique

### Structure obligatoire de chaque article
1. **Chapeau** (2-3 lignes) : accroche choc + promesse concrète de l'article
2. **Sommaire** : liste des H2 avec ancres
3. **Corps** : H2 et H3 structurés, alternant texte, listes et exemples
4. **Section FAQ** : 4-6 questions fréquentes sur le sujet (format Question/Réponse)
5. **Conclusion + CTA** : vers l'outil gratuit jobapplication.fr

### Mots-clés et SEO
- Mot-clé principal : dans le H1, les 100 premiers mots, 1 H2, la méta-description
- Variantes sémantiques : dispersées naturellement dans le texte
- Densité mot-clé principal : 1-2 % (pas de suroptimisation)
- Entités nommées : mentionner des outils concrets (HubSpot, Workday, LinkedIn…)
- Liens internes : vers d'autres articles du blog ET vers l'outil principal
- Structure URL : court, descriptif, en français, tirets (-) uniquement

### Longueur cible
- Articles "pilier" (catégorie principale) : 2 500 – 3 500 mots
- Articles "cluster" (sous-sujets) : 1 500 – 2 500 mots
- FAQ minimum : 4 questions, 80-150 mots par réponse

### Balises HTML requises
Retourne l'article avec ce balisage :
- Titre H1 exact
- Meta-description (155-165 caractères)
- Balises Open Graph (og:title, og:description, og:image suggestion)
- Structure H2/H3 sémantique
- Texte en <p>, listes en <ul>/<ol>

### Exemples et données
- Utilise des statistiques récentes et vérifiables (cite la source)
- Inclus des exemples concrets : "Par exemple, si l'offre dit X, votre CV doit mentionner Y"
- Donne des templates/modèles copiables quand pertinent

### Particularités sectorielles à respecter
- L'ATS (Applicant Tracking System) est l'outil de tri automatique des CV — ne pas confondre avec "logiciel RH"
- Le terme "alternance" désigne spécifiquement un contrat d'alternance en France (apprentissage ou professionnalisation). Ne jamais le traduire, ne jamais l'assimiler à un système étranger. Toujours préciser "alternance en France" au premier usage.
- "CV" en France : 1-2 pages max pour un junior, 2-3 pages pour un senior
- "Lettre de motivation" : très spécifique au marché français — en Anglo-Saxon on dit "cover letter"
- "Grande école" : institution d'enseignement supérieur d'élite en France (HEC, Polytechnique, Sciences Po…) — ne pas confondre avec "grande université"
- "Bac+5" : niveau de qualification équivalent à un master en France
- Les plateformes d'offres d'emploi en France : LinkedIn, Welcome to the Jungle (WTTJ), Indeed, Cadremploi, Monster, Apec (cadres), Pole Emploi (France Travail depuis 2024)

### Ce qu'il faut éviter
- Répétition des mêmes formules d'introduction
- Listes de 10+ éléments sans structure
- Conseils trop génériques ("soyez organisé", "postulez à beaucoup d'offres")
- Promesses non tenues dans le chapeau
- Traduction mot-à-mot de contenu anglophone sans adaptation au contexte français

## GRILLE DE SCORING SEO (auto-vérification)

Avant de finaliser l'article, vérifie chaque point :
- [ ] Mot-clé principal dans le H1
- [ ] Mot-clé dans les 100 premiers mots
- [ ] Meta-description entre 155-165 caractères
- [ ] Au moins 1 lien interne vers un autre article du blog
- [ ] Au moins 1 CTA vers l'outil (jobapplication.fr)
- [ ] Section FAQ avec 4+ questions
- [ ] Au moins 3 exemples concrets dans l'article
- [ ] Longueur cible respectée
- [ ] Aucun paragraphe de plus de 5 lignes sans aération
`;

export const generateArticlePrompt = (params: {
  title: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  wordCount: number;
  internalLinks?: string[];
}) => `
${BLOG_SYSTEM_PROMPT}

## ARTICLE À RÉDIGER

**Titre cible (H1) :** ${params.title}
**Mot-clé principal :** ${params.targetKeyword}
**Mots-clés secondaires :** ${params.secondaryKeywords.join(", ")}
**Longueur cible :** ${params.wordCount} mots
${params.internalLinks ? `**Liens internes à intégrer :** ${params.internalLinks.join(", ")}` : ""}

Rédige maintenant l'article complet, avec toutes les balises HTML, la meta-description, la FAQ et le CTA final.
`;

/**
 * Exemples de briefs prêts à l'emploi pour les 10 premiers articles
 */
export const ARTICLE_BRIEFS = [
  {
    title: "CV ATS : comment passer les filtres des recruteurs",
    targetKeyword: "cv ats",
    secondaryKeywords: ["filtre recruteur", "passer l'ATS", "score ATS", "cv compatible ATS"],
    wordCount: 2500,
  },
  {
    title: "Comment optimiser son CV pour les logiciels ATS",
    targetKeyword: "optimiser cv ATS",
    secondaryKeywords: ["logiciel ATS", "compatibilité ATS", "mots-clés cv", "format cv ATS"],
    wordCount: 2500,
  },
  {
    title: "Qu'est-ce qu'un ATS et comment fonctionne-t-il ?",
    targetKeyword: "qu'est-ce qu'un ATS",
    secondaryKeywords: ["applicant tracking system", "logiciel recrutement", "parsing cv", "screening automatique"],
    wordCount: 2000,
  },
  {
    title: "ATS : les mots-clés à utiliser dans son CV",
    targetKeyword: "mots-clés ATS cv",
    secondaryKeywords: ["mots-clés recrutement", "termes cv", "keyword cv", "recherche mots-clés offre"],
    wordCount: 2000,
  },
  {
    title: "Comment adapter son CV à une offre d'emploi en 2026",
    targetKeyword: "adapter cv offre emploi",
    secondaryKeywords: ["personnaliser cv", "cv sur mesure", "candidature ciblée", "cv par offre"],
    wordCount: 2000,
  },
  {
    title: "Pourquoi votre CV est rejeté avant même d'être lu",
    targetKeyword: "cv rejeté ATS",
    secondaryKeywords: ["cv non lu", "candidature refusée", "erreurs cv", "pourquoi pas de réponse"],
    wordCount: 2000,
  },
  {
    title: "Comment utiliser l'IA pour trouver un emploi",
    targetKeyword: "IA recherche emploi",
    secondaryKeywords: ["intelligence artificielle emploi", "outils IA candidature", "ChatGPT emploi", "automatiser candidature"],
    wordCount: 2500,
  },
  {
    title: "Comment utiliser ChatGPT pour améliorer son CV",
    targetKeyword: "ChatGPT améliorer cv",
    secondaryKeywords: ["ChatGPT cv", "prompts cv", "IA rédaction cv", "GPT cv emploi"],
    wordCount: 2000,
  },
  {
    title: "Les meilleurs outils IA pour chercheurs d'emploi en 2026",
    targetKeyword: "outils IA chercheur emploi",
    secondaryKeywords: ["meilleur logiciel cv", "outil candidature IA", "comparatif outils emploi", "Jobscan Rezi"],
    wordCount: 2500,
  },
  {
    title: "Lettre de motivation IA : avantages et limites",
    targetKeyword: "lettre de motivation IA",
    secondaryKeywords: ["lettre motivation ChatGPT", "générer lettre motivation", "IA candidature", "cover letter IA"],
    wordCount: 2000,
  },
];
