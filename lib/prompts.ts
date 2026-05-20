import type { CVTone, LetterTone, OutputLanguage, UserProfile } from "./types";

// =====================================================================
// LETTRES DE MOTIVATION FRANÇAIS — BIBLIOTHÈQUE DE RÉFÉRENCE (Opus 4.7).
// Règles strictes : aucun tiret cadratin/demi-cadratin, aucun trait
// d'union comme séparateur, aucune liste à puces, aucune formule
// creuse RH. 300 à 380 mots. Voix d'Amine : 28 ans, CEO d'agence,
// calcule vite, pas impressionné par le jargon.
// =====================================================================
const LETTER_GOLD_EXAMPLES_FR = `
EXEMPLE 1. Scale-up SaaS B2B. Head of Growth.

Bonjour,

Trois choses m'ont fait poster cette candidature. D'abord votre dernier article sur la friction onboarding et son impact sur le LTV, qui décrit avec une honnêteté assez rare le moment où une scale-up arrête de pouvoir tirer sa croissance des canaux d'acquisition seuls. Ensuite la composition de votre comex, qui suggère que la fonction marketing est traitée comme un sujet de direction et non comme une variable d'ajustement budgétaire. Enfin l'offre elle même, qui ne parle pas de KPI mais de mécanique, ce qui en dit long sur la maturité de la fonction.

Je dirige depuis 2023 Riff Agency, une structure que j'ai bâtie en parallèle de Bendigital, l'agence digitale que j'ai co fondée en 2022. Mes équipes pilotent des budgets paid de 5k à 200k euros par mois pour une douzaine de clients, dont TotalEnergies, Inwi et plusieurs labels indépendants. Sur un client mode l'an dernier, nous avons divisé le coût d'acquisition par 2,4 en six semaines, simplement en remplaçant des audiences lookalike génériques par des cohortes construites sur les segments comportementaux remontés par GA4. Sur un client SaaS B2B, la même logique appliquée au tunnel a porté la conversion lead to SQL de 8 à 19 pour cent en un trimestre.

Ce que je viendrais chercher chez {{COMPANY}}, c'est précisément l'échelle qu'une agence ne peut pas offrir. La possibilité de pousser un système d'acquisition sur la durée, d'en mesurer les effets sur des cycles produit longs, et de structurer une équipe interne plutôt que d'arbitrer en permanence du temps client.

Je serais ravi d'en discuter sur un échange court avant la fin du mois.

[Candidate name]


EXEMPLE 2. Grand groupe. Direction marketing institutionnel.

Madame, Monsieur,

Votre dernière prise de parole publique sur {{TOPIC}} m'a interpellé pour une raison précise. Vous y défendez l'idée que la marque institutionnelle se construit dans les détails opérationnels, et non dans les grands plans de communication. C'est exactement le constat que j'ai fait en accompagnant TotalEnergies et la Commune de Paris 1871 via Bendigital, l'agence digitale que je co pilote depuis 2022. Une charte ne sauve jamais une expérience client défaillante et un bon discours ne compense pas un parcours mal pensé.

Mon parcours combine trois angles que je vois rarement réunis dans une candidature. Cinq ans d'opérationnel growth sur Google Ads, Meta Ads et GA4, avec des résultats mesurables sur des comptes B2C et B2B. Trois ans de conseil stratégique en ingénierie de certification auprès de Sciences Po, l'ENSAM, Ferrandi et ESIEE IT. Et l'expérience entrepreneuriale de deux agences que je dirige aujourd'hui entre Paris et Casablanca. Sur un dossier RNCP récent, j'ai porté l'instruction complète jusqu'à validation France Compétences en neuf mois, là où la moyenne sectorielle dépasse quinze.

Ce que je propose à {{COMPANY}}, c'est cette capacité hybride à challenger un brief stratégique, à le traduire en plan d'exécution chiffré et à le tenir jusqu'au reporting. Sans le glissement habituel entre l'intention et la mise en œuvre.

Je reste disponible pour un entretien à votre convenance.

[Candidate name]


EXEMPLE 3. Startup pré PMF. Marketing Lead.

Bonjour {{FIRST_NAME}},

J'ai pris le temps de lire votre dernier mémo investisseur publié sur LinkedIn, et l'analyse que vous y faites de votre courbe d'activation me semble plus utile que cent fiches de poste. Vous décrivez un produit qui retient à dix jours et qui décroche à trente, ce qui suggère que vous n'avez pas un problème d'acquisition mais un problème de promesse. C'est une nuance que beaucoup ratent à votre stade et c'est précisément la raison pour laquelle je candidate.

Depuis 2023, je dirige Riff Agency, et je continue à co piloter Bendigital, deux structures qui tournent et que j'ai construites de zéro. Le terrain pré PMF, je l'ai vu côté agence sur plusieurs clients early stage, et côté entrepreneur sur mes propres marques. La conclusion que j'en tire est toujours la même. À votre stade, on n'a pas besoin d'un marketeur qui sait optimiser un canal, on a besoin de quelqu'un qui sait poser la bonne question, écrire un test propre, lire le résultat et en tirer une décision produit.

Concrètement, je suis capable d'arriver lundi avec une lecture honnête de votre funnel actuel, trois hypothèses de levier prioritaires et une feuille de route à six semaines qui ne demande pas de doubler le budget. Si la lecture est bonne, on construit. Si elle est fausse, on en parle et on ajuste.

Mon agenda est ouvert cette semaine.

[Candidate name]


EXEMPLE 4. PME industrielle. Chef de projet marketing.

Bonjour,

Je découvre votre entreprise en lisant la page "Histoire" de votre site, et je dois reconnaître que peu de candidats ont la chance de répondre à une offre dans laquelle le métier de base s'enseigne encore par compagnonnage. Vous fabriquez quelque chose que vous savez expliquer, vendu à des gens qui savent l'apprécier, et la maîtrise d'œuvre tient sur trois noms propres.

Mon ambition serait simple. Faire en sorte que la qualité que vous mettez dans le produit se retrouve dans la première impression que prospects et clients ont de vous en ligne. J'accompagne des PME via Bendigital depuis 2022 sur exactement ce sujet. Pour un client artisan que je ne peux pas citer ici, la refonte du site couplée à une stratégie de contenu locale a multiplié les demandes entrantes par trois en quatre mois, à budget paid constant. La méthode n'a rien de magique. On commence par écouter les vendeurs, on comprend ce qui fait dire oui ou non au client, puis on rapatrie ce langage sur le site, dans les emails et dans les annonces.

Je serais ravi de passer une demi journée chez vous pour comprendre vos enjeux six à douze mois.

[Candidate name]


EXEMPLE 5. Cabinet de conseil en stratégie. Senior Consultant.

Madame, Monsieur,

Votre cabinet figure parmi les références que je cite depuis le début de mon parcours conseil. Trois ans chez Lafayette Associés m'ont appris ce qu'est un livrable bien construit, et l'effet qu'un diagnostic précis peut avoir sur la décision d'un comité de direction. Aujourd'hui, en parallèle de mes deux agences, je continue à instruire des dossiers de certification RNCP pour des écoles comme Sciences Po, l'ENSAM et Ferrandi.

Ce que j'aimerais apporter à {{COMPANY}} relève autant de la méthode que de la posture. Je sais cadrer un sujet flou, le découper en hypothèses testables, mener les entretiens, modéliser les chiffres et restituer une recommandation que le commanditaire peut défendre sans avoir besoin de moi à la réunion suivante. Sur un dossier RNCP récent, j'ai conduit cette chaîne complète en neuf mois jusqu'à validation France Compétences, là où la moyenne sectorielle dépasse quinze mois.

Mon profil hybride entre conseil et opérationnel agence vous donnerait un consultant capable de défendre une recommandation devant un comex le matin et de la mettre en production l'après midi. Je suis disponible pour un entretien à votre convenance.

[Candidate name]
`;

// =====================================================================
// COVER LETTERS ENGLISH — REFERENCE LIBRARY (Opus quality).
// Strict rules: no em dashes (—), no en dashes (–), no hyphens used as
// sentence separators, no bulleted lists, no clichés ("passionate about",
// "team player", "results-driven", "self-starter"). 250 to 340 words.
// Voice: 28, agency CEO, reads a lot, runs the numbers, unimpressed by
// buzzwords. Direct, specific, achievement-led, no fluff. Modern
// English business style, no formal closings beyond "Best regards" or
// "Sincerely".
// =====================================================================
const LETTER_GOLD_EXAMPLES_EN = `
EXAMPLE 1. US Series B SaaS. Head of Growth.

Dear Sarah,

Your recent essay on activation churn cut through what I usually read on the subject. Most teams treat churn as a top of funnel problem. You frame it as a promise problem, and that distinction is precisely why I am writing.

I have spent the last three years running Riff Agency in parallel with Bendigital, the digital agency I co founded in 2022. Across both shops my teams manage paid budgets ranging from 5k to 200k EUR per month for clients including TotalEnergies, Inwi, and several independent music labels. On a B2B SaaS account last year we moved lead to SQL conversion from 8 to 19 percent in one quarter by replacing generic lookalike audiences with cohorts built on GA4 behavioral segments. On a DTC fashion account, the same approach cut CAC by 58 percent in six weeks at constant spend.

What draws me to {{COMPANY}} is the discipline of the team you have already assembled. You do not need someone to introduce attribution thinking or to set up a tracking stack. You need someone who can step into a system that already works and find the next 30 percent of efficiency, which is the part of growth I find most interesting.

I would be glad to walk through a specific case on a 30 minute call this week.

Best,
[Candidate name]


EXAMPLE 2. UK Strategy Consultancy. Senior Consultant.

Dear Hiring Manager,

I have been reading your firm's published work since my consulting years at Lafayette Associés, and what consistently sets it apart is the unwillingness to deliver a recommendation that the client cannot execute on. That is the standard I want to operate at.

Today I run Riff Agency, the music business I founded in 2023, and I co pilot Bendigital, which I started in 2022. Both businesses are stable and the teams operate without me in the room. I also continue to instruct RNCP certification dossiers for French Grandes Écoles including Sciences Po, ENSAM, Ferrandi and ESIEE IT. The most recent one closed with France Compétences validation in nine months, against a sector average above fifteen.

What I would bring to {{COMPANY}} is a hybrid profile few candidates can credibly claim. I can scope a fuzzy strategic question, structure it into testable hypotheses, run the interviews, model the numbers, and deliver a recommendation that a CXO can defend in committee. I also know what it takes to run the playbook afterwards, because that is what I do every week on the agency side.

I would welcome the chance to discuss your current case load.

Sincerely,
[Candidate name]


EXAMPLE 3. EU Scale-up SaaS. Senior Marketing Manager.

Hello,

Your latest funding announcement included a sentence most companies would not write, that you intend to grow without doubling headcount. That commitment changes the brief for whoever leads marketing next, because it forces leverage thinking from day one. That is exactly the operating constraint I prefer to work under.

I have spent the last three years scaling Riff Agency and co piloting Bendigital, two businesses I built from scratch between Paris and Casablanca. My teams handle paid budgets from 5k to 200k EUR per month for clients ranging from TotalEnergies and Inwi to independent music labels. On one B2B SaaS account, we moved lead to SQL conversion from 8 to 19 percent in one quarter by rebuilding the funnel around GA4 behavioral segments. On a fashion DTC account, we cut CAC by 58 percent in six weeks without raising spend.

The reason I am applying now rather than in six months is straightforward. Both my agencies are stable, the teams are autonomous, and I want to commit to a single product on a longer horizon. {{COMPANY}} is the type of company where I would do my sharpest work.

I am available this week for an introductory call.

Best regards,
[Candidate name]


EXAMPLE 4. Big Tech EMEA. Marketing Manager.

Dear Hiring Team,

The product page you launched last quarter has stayed with me for one specific reason. The decision to lead with a customer testimonial rather than a feature list is the kind of editorial discipline that does not happen by accident, and it is the marketing culture I want to contribute to.

I am currently CEO of Riff Agency, the music business I founded in 2023, and co founder of Bendigital, the digital agency I co started in 2022. Both teams run paid budgets ranging from 5k to 200k EUR monthly across paid social, search and DSPs, with documented outcomes on accounts including TotalEnergies and Inwi. On a recent SaaS B2B account, we moved lead to SQL conversion from 8 to 19 percent in one quarter by rebuilding the acquisition funnel around behavioral cohorts pulled from GA4, rather than the standard lookalike approach.

What I would bring to {{COMPANY}} is the operator habit. I read dashboards, I write briefs that do not waste anyone's time, and I treat each campaign as a small experiment with documented learnings. I am bilingual French English, which matters for the EMEA scope of the role.

I would be glad to discuss your roadmap on a short call.

Best,
[Candidate name]


EXAMPLE 5. International Music Industry. Label or Festival.

Hello,

The role you are describing maps directly to the work I do every day at Riff Agency, the music business I founded in 2023. We operate between Paris and Casablanca, with a focus on hip hop and urban music on the MENA EU axis. The team covers digital marketing, paid Meta campaigns, DSP releases, artist management, booking, and brand partnerships. Our clients include EA Productions in Paris and 212 Live off in Morocco, and we develop a roster of independent artists across both scenes.

What I would bring to {{COMPANY}} is a data discipline still rare in our industry. Most live and label operators work on instinct, which holds up on home turf but falls apart the moment you need to break an artist outside their natural audience. On the campaigns I run to fill rooms in France and Morocco, the lift does not come from budget, it comes from segmentation. The audiences we build are behavioral cohorts cross referenced with real time ticket sales, which keeps bid efficiency tight.

The same logic applies to streaming, sync and merch. I would be glad to share a few specific cases on a call this week.

Best,
[Candidate name]


EXAMPLE 6. International Luxury Brand. Marketing Manager.

Dear Hiring Manager,

A brand like yours is best judged by what it chooses not to show. The restraint in collaborations, the rarity of public statements, the deliberate cadence of campaign drops. That discipline is rare and it sets the entire downstream marketing brief.

I have spent the last three years running Riff Agency and co piloting Bendigital, with clients spanning French institutions like TotalEnergies and Commune de Paris 1871, and MENA accounts including the Inwi telecom group and partners of the 212 Live off festival. Working across both registers has taught me how to adjust the voice without diluting the signature, which is the central challenge of an international marketing role inside a house like yours.

On the digital execution side, I have led web rebuilds that pass Lighthouse audits above 90, set up clean GA4 tracking, and run paid campaigns precise enough to serve a target audience without addressing it bluntly. For a luxury brand, that precision is what protects brand equity over a campaign cycle.

I would be honored to discuss the international priorities of the seasons ahead with your team.

Sincerely,
[Candidate name]


EXAMPLE 7. EdTech or Higher Education. Marketing Lead.

Dear Hiring Committee,

Your institution sits among the schools I have had the privilege to support in my certification engineering work. Three years at Lafayette Associés followed by founding BEN&Co in 2025 gave me the opportunity to instruct RNCP and RS dossiers for Sciences Po, ENSAM, Ferrandi, ESIEE IT and Neoma. I know the formalism that France Compétences expects, the logic behind competency frameworks, and the difference a well grounded labor market mapping makes to a dossier.

What I would add to {{COMPANY}}, beyond that regulatory experience, is a marketing reading of the certification question. A credential that sells well does two things. It addresses a documented market need, and it is carried by a clear, accessible and differentiated narrative. At Riff Agency and Bendigital I design those narratives for private brands every week. Combined with the rigor of the regulatory framework, that perspective produces what your direction is ultimately looking for, certifications that pass and that fill cohorts.

I am bilingual French English, which allows me to work across both your domestic programs and the international tracks you likely develop. I would welcome the chance to discuss the role.

Best regards,
[Candidate name]


EXAMPLE 8. Boutique Consulting. Senior Associate.

Dear Partner,

The way your firm describes its engagements on the website caught my attention. You write about clients in the second person, you do not promise outcomes you cannot evidence, and the case studies read like the work of people who actually held the pen. That is what made me want to apply.

I bring a hybrid profile. Three years of consulting work at Lafayette Associés, where I instructed certification dossiers for Sciences Po, ENSAM and Ferrandi. Three years of agency leadership at Bendigital and Riff Agency, where I run paid acquisition budgets from 5k to 200k EUR monthly for clients including TotalEnergies and Inwi. On the consulting side, my most recent RNCP dossier closed with France Compétences in nine months, against a sector baseline above fifteen. On the agency side, a SaaS B2B project last year moved lead to SQL from 8 to 19 percent in one quarter.

What I would add to {{COMPANY}} is the ability to scope a strategic question in the morning and validate the operational execution of its conclusions in the afternoon. That double posture is rare in candidates still in the first decade of their careers.

I would welcome the opportunity for a conversation at your convenience.

Sincerely,
[Candidate name]
`;

// === Profil sérialisé pour le system prompt. Multi-user : prend le profil du visiteur.
// Si le profil est vide (nouveau visiteur sans setup), on s'appuie uniquement sur le cvText.
function profileSummary(profile: UserProfile | null, lang: OutputLanguage): string {
  if (!profile || !profile.identity.fullName) {
    return lang === "en"
      ? "NO STRUCTURED PROFILE PROVIDED. Extract everything from the candidate CV text below. Be conservative, never invent jobs, degrees or certifications absent from the CV."
      : "AUCUN PROFIL STRUCTURÉ FOURNI. Extraire tout depuis le texte du CV ci-dessous. Être conservateur, ne jamais inventer postes, diplômes ou certifications absents du CV.";
  }

  const expSummary = profile.experiences
    .map(
      (e) =>
        `${e.isPrimary ? "[PRIMARY CURRENT ROLE] " : ""}${e.role} at ${e.company} (${e.start}${e.end ? ` to ${e.end}` : " to present"})\n  ${e.bullets.join("\n  ")}`
    )
    .join("\n\n");
  const skills = (profile.skills || [])
    .map((g) => `${g.group} : ${g.items.join(", ")}`)
    .join("\n");
  const header = lang === "en" ? `PROFILE OF ${profile.identity.fullName.toUpperCase()}` : `PROFIL CIBLE — ${profile.identity.fullName.toUpperCase()}`;
  const websites = profile.identity.websites?.length ? profile.identity.websites.join(", ") : "";
  return `
${header}

IDENTITY
${profile.identity.fullName}
${profile.identity.title}
${profile.identity.email}, ${profile.identity.phone}, ${profile.identity.location}
LinkedIn ${profile.identity.linkedin || "n/a"}
Sites ${websites}

PRIMARY CURRENT ROLE
${profile.primaryRole}. Always feature this role first in the CV and mention it in the cover letter when relevant.

PITCH
${profile.pitch}

EXPERIENCES (the role tagged [PRIMARY CURRENT ROLE] must always appear first)
${expSummary}

EDUCATION
${profile.education.map((e) => `${e.degree} at ${e.school} (${e.start} to ${e.end})`).join("\n")}

CERTIFICATIONS
${profile.certifications.join(", ")}

SKILLS
${skills}

LANGUAGES
${profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}

${profile.achievementsBank?.length ? `ACHIEVEMENTS BANK (use to flesh out bullets)\n${profile.achievementsBank.join("\n")}` : ""}
  `.trim();
}

const TONE_HINT_CV_FR: Record<CVTone, string> = {
  "ats-maximal": "Parsing ATS optimisé. Titres standards en français (Expérience professionnelle, Formation, Compétences, Certifications, Langues). Aucun tableau, aucune colonne, dates au format Mois Année.",
  corporate: "Ton institutionnel. Vocabulaire de cadre : pilotage, conduite, gouvernance, parties prenantes.",
  startup: "Ton entrepreneurial. Ownership, autonomie, full stack, itération, KPI court terme.",
  freelance: "Ton de consultant indépendant. Missions livrées, secteurs clients, livrables.",
  "marketing-digital": "Vocabulaire pur growth. CAC, ROAS, CTR, CVR, LTV, attribution, funnel, A B test.",
  consulting: "Ton cabinet de conseil. Diagnostic, recommandation, plan d'action, livrable.",
};

const TONE_HINT_CV_EN: Record<CVTone, string> = {
  "ats-maximal": "ATS optimized parsing. Standard English section titles (Professional Experience, Education, Skills, Certifications, Languages). No tables, no columns, date format Month Year.",
  corporate: "Institutional tone. Executive vocabulary: led, owned, governed, stakeholder management, P&L.",
  startup: "Entrepreneurial tone. Ownership, autonomy, full stack, iteration, short cycle KPIs.",
  freelance: "Independent consultant tone. Engagements delivered, client sectors, deliverables, client ROI per mandate.",
  "marketing-digital": "Pure growth vocabulary. CAC, ROAS, CTR, CVR, LTV, attribution, funnel, A/B test, behavioral cohorts.",
  consulting: "Consulting firm tone. Diagnostic, recommendation, action plan, deliverable, methodology.",
};

const TONE_HINT_LETTER_FR: Record<LetterTone, string> = {
  startup: "Direct, énergique, phrases courtes. Vouvoiement chaleureux. Focus impact rapide et capacité à faire avancer un sujet sans process.",
  scaleup: "Rigueur structure et énergie startup. Mentionner traction, scaling, structuration d'une fonction.",
  "grand-groupe": "Vouvoiement, formules de politesse complètes mais sans cliché. Vocabulaire stratégique.",
  "cabinet-conseil": "Précision méthodologique. Vocabulaire de mission, livrables, diagnostic, recommandation.",
  freelance: "Ton de prestataire. Autonomie, exemples de missions livrées, capacité à entrer en production rapidement.",
  pme: "Chaleureux, concret, opérationnel. Montrer qu'on comprend les contraintes d'une PME.",
};

const TONE_HINT_LETTER_EN: Record<LetterTone, string> = {
  startup: "Direct, energetic, short sentences. First-name greeting when culture allows. Focus on rapid impact and ability to move a topic without process. Close with 'Best,'.",
  scaleup: "Mix of structural rigor and startup energy. Mention traction, scaling, function structuring. Reference the latest funding round or growth phase if deducible. Close with 'Best regards,' or 'Best,'.",
  "grand-groupe": "Formal address ('Dear Hiring Manager,' or 'Dear [Name],'). Strategic vocabulary, governance, gravitas. No clichés. Close with 'Sincerely,' or 'Best regards,'.",
  "cabinet-conseil": "Methodological precision. Engagement vocabulary, deliverables, diagnostic, recommendation. Demonstrate ability to structure a fuzzy topic. Close with 'Sincerely,'.",
  freelance: "Service provider tone. Autonomy, examples of delivered engagements, ability to ramp fast, focus on concrete deliverable and timeline. Close with 'Best,'.",
  pme: "Warm, concrete, operational. Show you understand the constraints of a smaller business and respect the existing team. Close with 'Best regards,'.",
};

export type AnalyzeInput = {
  cvText: string;
  jobOffer: string;
  jobOfferUrl?: string | null;
  targetCompany?: string | null;
  linkedinUrl?: string | null;
  cvTone: CVTone;
  letterTone: LetterTone;
  outputLanguage: OutputLanguage;
  userProfile?: UserProfile | null;
  /** Clé DeepSeek apportée par l'utilisateur (BYOK). Si présente, prime sur la clé d'env. */
  apiKey?: string | null;
};

export function buildAnalysisPrompt(input: AnalyzeInput): {
  system: string;
  user: string;
} {
  const isEN = input.outputLanguage === "en";
  const goldExamples = isEN ? LETTER_GOLD_EXAMPLES_EN : LETTER_GOLD_EXAMPLES_FR;
  const toneCV = isEN ? TONE_HINT_CV_EN[input.cvTone] : TONE_HINT_CV_FR[input.cvTone];
  const toneLetter = isEN ? TONE_HINT_LETTER_EN[input.letterTone] : TONE_HINT_LETTER_FR[input.letterTone];

  const langInstruction = isEN
    ? `OUTPUT LANGUAGE
All textual content of the CV and the cover letter MUST be in fluent natural English. This includes: the headline, summary, every bullet, every skill group label and item, every section title in the data (if relevant), the certifications (translate generic ones, keep proper names), education degree names (translate generic, keep institution names), languages, and the entire cover letter. Proper nouns ([Candidate name], Riff Agency, Bendigital, BEN&Co, Lafayette Associés, Sciences Po, ENSAM, Ferrandi, ESIEE IT, Neoma, TotalEnergies, Inwi, EA Productions, 212 Live off, IIM Léonard de Vinci, Université de Caen Normandie) MUST stay in their original form. The "language" field of meta MUST be "en".`
    : `LANGUE DE SORTIE
Tout le contenu textuel du CV et de la lettre DOIT être en français naturel. Aucun mot anglais sauf marques et noms propres. Le champ "language" de meta DOIT être "fr".`;

  const cvRules = isEN
    ? `STRICT CV RULES TO FILL ONE A4 PAGE
A. EXACTLY 4 work experiences, no more, no less. The candidate's primary current role must be first.
B. EXACTLY 4 bullets per experience, each between 22 and 30 words (about 140 to 200 characters).
C. Summary: 4 full lines, 55 to 75 words, opens by mentioning the candidate's primary current role.
D. EXACTLY 5 skill groups, each with 4 to 6 items.
E. If you lack material, draw from the achievementsBank to flesh out.`
    : `CONTRAINTES CV STRICTES POUR REMPLIR A4
A. EXACTEMENT 4 expériences. Le rôle actuel principal du candidat en première position.
B. EXACTEMENT 4 bullets par expérience, chacun entre 22 et 30 mots (140 à 200 caractères).
C. Résumé en 4 lignes pleines, 55 à 75 mots, ouvre sur le rôle actuel principal du candidat.
D. EXACTEMENT 5 groupes de compétences, chacun avec 4 à 6 items.
E. Si tu manques de matière, utilise achievementsBank pour étoffer.`;

  const letterRules = isEN
    ? `COVER LETTER STRICT RULES
A. NO em dashes (—), NO en dashes (–), NO hyphens used as sentence separators. Hyphens are only allowed in proper compound names.
B. NO bulleted lists, NO line breaks for enumeration, NO line starting with -, •, *, a number followed by a dot, or a letter followed by a parenthesis. Use full sentences with commas or semicolons instead.
C. BANNED phrases: "I am passionate about", "results-driven", "self-starter", "team player", "out of the box", "go-getter", "synergy", "leverage" (as a verb in vague sense), "actively seeking", "dynamic", "motivated", "hard-working", "I believe that", "I am writing to express my interest".
D. Paragraph 1 MUST open on a specific observation about the company. Not "I am writing", not "your role caught my eye". Reference their product, recent move, positioning, or public statement.
E. Paragraph 2 MUST contain at least one concrete number, ideally two. Anchor the example in the candidate's current main role or one of their experiences.
F. Paragraph 3 answers "why me now", not just "why I fit".
G. Paragraph 4 proposes a concrete next step.
H. Length: 250 to 340 words. Four full paragraphs, no headers.
I. Close with "Best,", "Best regards," or "Sincerely," according to the letter tone, then a blank line, then the signature.
J. Voice: 28, agency CEO, reads a lot, runs the numbers, unimpressed by jargon.`
    : `LETTRE MOTIVATION RÈGLES STRICTES
A. AUCUN tiret cadratin (—), AUCUN demi cadratin (–), AUCUN trait d'union comme séparateur de phrase. Tirets autorisés seulement dans les noms propres composés.
B. AUCUNE liste à puces, AUCUNE énumération avec retours à la ligne, AUCUNE ligne commençant par -, •, *, un chiffre suivi d'un point, ou une lettre suivie d'une parenthèse.
C. AUCUNE formule creuse : "motivé", "dynamique", "rigoureux", "veuillez agréer", "permettez moi", "convaincu que", "passionné par", "force de proposition", "savoir être".
D. Paragraphe 1 OBLIGATOIREMENT observation spécifique sur l'entreprise. Pas "je candidate", pas "votre offre m'intéresse".
E. Paragraphe 2 OBLIGATOIREMENT au moins un chiffre concret. Ancrer l'exemple dans le rôle actuel principal ou une expérience du candidat.
F. Paragraphe 3 répond à "pourquoi moi maintenant", pas seulement "pourquoi je colle".
G. Paragraphe 4 propose une suite concrète.
H. Longueur 300 à 380 mots. Quatre paragraphes pleins, sans sous titres.
I. Voix : 28 ans, CEO d'agence, calcule vite, pas impressionné par le jargon.`;

  const candidateName = input.userProfile?.identity.fullName || "the candidate";
  const primaryRoleNote = input.userProfile?.primaryRole
    ? `When in doubt, the PROFILE wins, particularly for the candidate's primary current role which is ${input.userProfile.primaryRole}.`
    : "When in doubt, prefer the PROFILE over the CV text where they conflict, and never invent material absent from either.";

  const system = `You are the personal AI agent of ${candidateName} for optimizing job applications.
You are an ATS expert (Workday, Taleo, Greenhouse, Lever, SmartRecruiters) and a senior CV and cover letter writer in both French and English.

SOURCE OF TRUTH
The PROFILE section below is the absolute source of truth. The CV text uploaded may be incomplete or outdated. ${primaryRoleNote}

QUALITY STANDARD FOR LETTERS
You will see ${isEN ? "8 reference letters in English" : "5 lettres de référence en français"} at the end of this prompt. They were written at the highest quality bar.
Imitate their LEVEL, STRUCTURE, REGISTER and PHRASING PATTERNS, but NEVER reuse the proper names from them.
All company names, agency names and client names that appear in the examples (such as Riff Agency, Bendigital, Lafayette Associés, BEN&Co, Sciences Po, ENSAM, Ferrandi, ESIEE IT, Neoma, TotalEnergies, Inwi, EA Productions, 212 Live off, IIM Léonard de Vinci, Université de Caen Normandie, Commune de Paris 1871) are PLACEHOLDERS from the example author's portfolio. You MUST substitute them with the ACTUAL companies, clients and schools from the candidate's profile.
The signature [Candidate name] must be replaced by the actual candidate's full name.
If a sentence sounds like filler, remove it. If it does not carry information, remove it.

${langInstruction}

GENERAL RULES
1. Maximize the candidate's value within credibility. Reframe, quantify, expand. Never invent a job, degree or certification absent from the profile.
2. Always Skill then Action then Result then Business Impact. Prefer figures, KPIs, ROI, growth, acquisition, conversion.
3. ${input.userProfile?.primaryRole ? `Always feature the candidate's primary current role (${input.userProfile.primaryRole}) first in the CV.` : "Order experiences with the most recent first, primary current role highlighted."}
4. Naturally integrate ATS keywords from the offer in the summary and bullets, no over-optimization.
5. Never generic. Each output is calibrated for the specific offer and company.

${cvRules}

${letterRules}

${profileSummary(input.userProfile ?? null, input.outputLanguage)}

REFERENCE COVER LETTERS (your quality standard, imitate strictly in style, register and structure)
${goldExamples}
`;

  const user = `INPUT TO ANALYZE

JOB OFFER
${input.jobOffer}

TARGET COMPANY
${input.targetCompany || "to be inferred from the offer if possible"}

OFFER URL
${input.jobOfferUrl || "not provided"}

CANDIDATE LINKEDIN
${input.linkedinUrl || input.userProfile?.identity.linkedin || "not provided"}

CURRENT CV (raw extract, may be incomplete, PROFILE wins on conflict)
${input.cvText}

CV TONE
${input.cvTone}. ${toneCV}

LETTER TONE
${input.letterTone}. ${toneLetter}

OUTPUT LANGUAGE
${input.outputLanguage === "en" ? "English" : "Français"}

TASK
Produce a single valid JSON object, no markdown, no backticks, no comment, strictly matching this schema:

{
  "ats": {
    "scores": {
      "overall": <int 0-100>, "keywords": <int 0-100>, "experience": <int 0-100>, "skills": <int 0-100>, "ats": <int 0-100>
    },
    "extracted": {
      "hardSkills": [string], "softSkills": [string], "tools": [string], "technologies": [string],
      "certifications": [string], "experienceLevel": string,
      "priorityKeywords": [string], "actionVerbs": [string], "implicitSkills": [string]
    },
    "gaps": {
      "missingSkills": [string], "missingKeywords": [string], "skillsToReframe": [string],
      "titleSuggestions": [string], "parsingIssues": [string], "weakSections": [string]
    },
    "atsCompat": {
      "workday": <int>, "taleo": <int>, "greenhouse": <int>, "lever": <int>, "smartrecruiters": <int>
    },
    "optimizations": [string],
    "warnings": [string]
  },
  "cv": {
    "title": "${input.userProfile?.identity.fullName || "Candidate"}",
    "headline": "<role headline in target language, tailored to the offer>",
    "summary": "<4 full lines, 55-75 words, target language, opens with the candidate's primary current role, includes 5-7 keywords from the offer>",
    "experiences": [
      <EXACTLY 4 entries, primary current role first>
      { "role": string, "company": string, "location": string, "period": string, "bullets": [<EXACTLY 4 bullets, 22-30 words each, in target language>] }
    ],
    "education": [{ "degree": string, "school": string, "period": string }],
    "certifications": [string],
    "skills": [<EXACTLY 5 groups>{ "group": string, "items": [<4-6 items>] }],
    "languages": [{ "name": string, "level": string }],
    "keywordDensity": [{ "keyword": string, "count": <int> }]
  },
  "letter": {
    "subject": "<in target language>",
    "greeting": "<in target language, appropriate to the tone>",
    "parts": {
      "intro": "<paragraph 1, opens on a specific company observation>",
      "proof": "<paragraph 2, at least one concrete number, anchored in the candidate's primary current role or another experience>",
      "fit": "<paragraph 3, why me now>",
      "close": "<paragraph 4, concrete next step, ends with the appropriate closing phrase>"
    },
    "signature": "${input.userProfile?.identity.fullName || "Candidate"}",
    "wordCount": <int>
  },
  "coach": {
    "candidatureScore": <int 0-100>,
    "scoreReason": "<2-3 sentences in target language>",
    "skillsToGrow": [string],
    "certificationsToConsider": [string],
    "cvImprovements": [string],
    "letterImprovements": [string],
    "estimatedInterviewProbability": "${isEN ? "low|medium|strong|very strong" : "faible|moyenne|forte|très forte"}"
  },
  "meta": {
    "targetCompany": "<inferred>",
    "jobTitle": "<inferred>",
    "cvTone": "${input.cvTone}",
    "letterTone": "${input.letterTone}",
    "language": "${input.outputLanguage}",
    "generatedAt": "${new Date().toISOString()}"
  }
}

FINAL CHECKS BEFORE RETURNING
1. The letter contains NO em dash, NO en dash, NO hyphen as sentence separator.
2. The letter contains NO bulleted list, NO line starting with -, •, * or a numbered point.
3. The letter word count is ${isEN ? "between 250 and 340" : "between 300 and 380"}.
4. The letter opens on a specific company observation.
5. The CV has EXACTLY 4 experiences, EXACTLY 4 bullets each, each bullet 22-30 words.
6. The candidate's primary current role is first in the experiences.
7. No banned cliché.
8. The "language" field in meta is "${input.outputLanguage}".
9. All textual content is in ${isEN ? "English" : "French"}.

RETURN ONLY THE JSON.`;

  return { system, user };
}
