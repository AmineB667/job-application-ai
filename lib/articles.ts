import type { UILang } from "./ui-lang";
import { NEW_ARTICLES } from "./articles-new";

export type ArticleLang = {
  title: string;
  description: string;
  content: string; // HTML
};

export type Article = {
  slug: string;
  fr: ArticleLang;
  en: ArticleLang;
  date: string;
  publishAt?: string; // ISO date — hidden until this date; undefined = always visible
  readTime: number;
  category: string;
};

/** Articles visible today (publishAt <= now or not set) */
export function getPublishedArticles(): Article[] {
  const now = new Date();
  return ARTICLES.filter((a) => !a.publishAt || new Date(a.publishAt) <= now);
}

export function getArticleLocale(article: Article, lang: UILang): ArticleLang {
  return article[lang] ?? article.fr;
}

const _BASE_ARTICLES: Article[] = [
  {
    slug: "cv-ats-passer-filtres-recruteurs",
    date: "2026-05-20",
    readTime: 8,
    category: "CV & ATS",
    fr: {
      title: "CV ATS : comment passer les filtres des recruteurs",
      description: "Découvrez comment rédiger un CV optimisé ATS pour franchir les filtres automatiques des recruteurs et maximiser vos chances d'entretien en 2026.",
      content: `
<p>Vous envoyez des dizaines de candidatures sans jamais recevoir de réponse ? La cause est souvent invisible : votre CV est éliminé <strong>avant même d'être lu par un humain</strong>. En 2026, plus de 95 % des grandes entreprises utilisent un <strong>logiciel ATS</strong> pour trier automatiquement les candidatures.</p>
<h2>Qu'est-ce qu'un filtre ATS ?</h2>
<p>Un ATS scanne votre CV à la recherche de mots-clés, de structures et de formats compatibles. Si votre CV ne répond pas aux critères, il est rejeté automatiquement — parfois avec un score aussi bas que 20/100.</p>
<p>Les filtres ATS analysent :</p>
<ul>
  <li>La présence de <strong>mots-clés spécifiques</strong> issus de la fiche de poste</li>
  <li>La <strong>structure du CV</strong> (en-tête, expériences, formations, compétences)</li>
  <li>Le <strong>format du fichier</strong> (DOCX ou PDF standard, jamais d'image)</li>
  <li>La <strong>chronologie</strong> des expériences</li>
  <li>Les <strong>titres de postes</strong> et leur correspondance avec l'offre</li>
</ul>
<h2>Les 7 erreurs qui font rejeter votre CV</h2>
<h3>1. Format trop graphique</h3>
<p>Tableaux, colonnes multiples, zones de texte flottantes et barres de progression sont mal lus par les parsers ATS. Préférez un design <strong>single-column</strong>, propre et épuré.</p>
<h3>2. Ignorer les mots-clés de l'offre</h3>
<p>Si l'offre demande "gestion de projet Agile" et que votre CV mentionne uniquement "pilotage de projets", l'ATS peut ne pas faire le lien. Reprenez <strong>exactement les termes utilisés</strong>.</p>
<h3>3. Coordonnées dans l'en-tête Word</h3>
<p>Les en-têtes et pieds de page Word ne sont pas toujours lus par les ATS. Assurez-vous que vos coordonnées figurent dans le corps du document.</p>
<h3>4. Polices non standard</h3>
<p>Restez sur <strong>Arial, Calibri, Garamond ou Inter</strong>. Les polices décoratives créent des problèmes de parsing.</p>
<h3>5. Dates incohérentes</h3>
<p>Utilisez toujours le même format de date dans tout le CV. Les ATS calculent vos années d'expérience à partir de ces dates.</p>
<h3>6. Pas de section compétences dédiée</h3>
<p>Une section "Compétences" explicite avec les outils listés clairement est cruciale pour le matching ATS.</p>
<h3>7. PDF non textuel</h3>
<p>Un CV scanné ou en image est illisible pour un ATS. Vérifiez que le texte de votre PDF est sélectionnable.</p>
<h2>Comment optimiser votre CV en 5 étapes</h2>
<h3>Étape 1 : Analysez l'offre mot à mot</h3>
<p>Listez tous les termes techniques, soft skills et outils mentionnés. Vous devez retrouver au moins 70 % de ces termes dans votre CV.</p>
<h3>Étape 2 : Adaptez votre titre de poste</h3>
<p>Si l'offre cherche un "Business Developer SaaS B2B", rapprochez votre titre au maximum de cette formulation.</p>
<h3>Étape 3 : Structure standard</h3>
<p>Utilisez : <strong>Expériences, Formation, Compétences, Langues, Certifications</strong>. Ces sections sont reconnues par tous les ATS.</p>
<h3>Étape 4 : Densité de mots-clés</h3>
<p>Intégrez les mots-clés naturellement dans vos bullets d'expérience avec des résultats quantifiés.</p>
<h3>Étape 5 : Testez votre score</h3>
<p>Utilisez <a href="/">Job Application AI</a> pour obtenir une analyse ATS instantanée et un CV refondu en 20 secondes. Gratuit.</p>
<h2>Score ATS idéal</h2>
<p>Un score de <strong>70 % ou plus</strong> est satisfaisant. Au-delà de 85 %, vous maximisez vos chances d'atteindre le recruteur.</p>
      `,
    },
    en: {
      title: "ATS Resume: How to Pass Recruiter Filters",
      description: "Learn how to write an ATS-optimized resume to pass automatic recruiter filters and maximize your interview chances in 2026.",
      content: `
<p>Sending dozens of applications with no response? The cause is often invisible: your resume is rejected <strong>before a human even reads it</strong>. In 2026, over 95% of large companies use an <strong>ATS (Applicant Tracking System)</strong> to automatically screen candidates.</p>
<h2>What Is an ATS Filter?</h2>
<p>An ATS scans your resume for keywords, structure and compatible formats. If your resume doesn't meet the criteria, it's automatically rejected — sometimes with a score as low as 20/100.</p>
<p>ATS filters analyze:</p>
<ul>
  <li><strong>Specific keywords</strong> from the job description</li>
  <li>Your <strong>resume structure</strong> (header, experience, education, skills)</li>
  <li><strong>File format</strong> (standard DOCX or PDF, never an image)</li>
  <li>The <strong>chronology</strong> of your experience</li>
  <li><strong>Job titles</strong> and their match with the offer</li>
</ul>
<h2>7 Mistakes That Get Your Resume Rejected</h2>
<h3>1. Overly Graphic Design</h3>
<p>Tables, multi-column layouts, text boxes and skill progress bars are poorly read by ATS parsers. Use a clean <strong>single-column</strong> design.</p>
<h3>2. Ignoring Keywords From the Job Posting</h3>
<p>If the job asks for "Agile project management" but your resume only says "team coordination," the ATS may not make the connection. Mirror <strong>the exact language used</strong> in the posting.</p>
<h3>3. Contact Info in Word Headers/Footers</h3>
<p>ATS systems don't always read Word headers and footers. Make sure your contact details are in the main document body.</p>
<h3>4. Non-Standard Fonts</h3>
<p>Stick to <strong>Arial, Calibri, or similar</strong> web-safe fonts. Decorative typefaces cause parsing errors.</p>
<h3>5. Inconsistent Date Formats</h3>
<p>Use the same date format throughout. ATS software calculates your total experience from these dates.</p>
<h3>6. No Dedicated Skills Section</h3>
<p>A clearly labeled "Skills" section listing tools, technologies and certifications is crucial for ATS matching.</p>
<h3>7. Non-Selectable PDF</h3>
<p>A scanned or image-based resume is unreadable by ATS. Verify your PDF's text is selectable (Ctrl+A test).</p>
<h2>5-Step ATS Optimization Process</h2>
<h3>Step 1: Dissect the Job Posting</h3>
<p>List every technical term, tool and skill mentioned. Aim to have at least 70% of those terms in your resume.</p>
<h3>Step 2: Mirror the Job Title</h3>
<p>If the role is "Senior Product Manager — SaaS," your resume title should be as close to that as possible.</p>
<h3>Step 3: Standard Section Names</h3>
<p>Use: <strong>Work Experience, Education, Skills, Languages, Certifications</strong>. These labels are recognized by all major ATS platforms.</p>
<h3>Step 4: Keyword Density</h3>
<p>Weave keywords naturally into your experience bullets alongside quantified results. Never stuff them randomly.</p>
<h3>Step 5: Test Your Score Before Sending</h3>
<p>Use <a href="/">Job Application AI</a> for an instant ATS analysis and a fully rewritten, keyword-optimized resume in 20 seconds. Free.</p>
<h2>What's a Good ATS Score?</h2>
<p>A score of <strong>70% or higher</strong> is generally considered good. Above 85%, you maximize your chances of landing in a recruiter's inbox.</p>
      `,
    },
  },
  {
    slug: "optimiser-cv-logiciels-ats",
    date: "2026-05-19",
    readTime: 9,
    category: "CV & ATS",
    fr: {
      title: "Comment optimiser son CV pour les logiciels ATS",
      description: "Guide complet pour optimiser votre CV face aux logiciels ATS : format, mots-clés, structure et bonnes pratiques pour 2026.",
      content: `
<p>L'optimisation d'un CV pour les ATS est devenue une compétence indispensable. Ce guide vous donne toutes les clés pour <strong>maximiser votre score ATS</strong> et franchir la première barrière automatique du recrutement.</p>
<h2>Comprendre le fonctionnement d'un ATS</h2>
<p>Un ATS fonctionne comme un moteur de recherche spécialisé. Il parse votre CV, extrait les entités (entreprises, titres, dates, compétences), compare ces données aux critères du recruteur et attribue un score de compatibilité.</p>
<h2>Format : les règles d'or</h2>
<h3>Format de fichier</h3>
<p>Le <strong>format DOCX</strong> est le plus compatible. Le PDF est acceptable si textuel. Évitez ODT, RTF et HTML.</p>
<h3>Design épuré</h3>
<p>Le design "single column" est le plus sûr. Si deux colonnes, utilisez un tableau Word — jamais deux zones de texte flottantes.</p>
<h3>Taille et polices</h3>
<ul>
  <li>Corps : 10-12pt, titres : 13-16pt</li>
  <li>Polices : Calibri, Arial, Helvetica, Times New Roman</li>
  <li>Aucune icône SVG ni image de compétences</li>
</ul>
<h2>Structure optimale d'un CV ATS</h2>
<h3>1. En-tête</h3>
<p>Prénom + Nom, titre actuel, email, téléphone, ville, LinkedIn. Dans le corps du document.</p>
<h3>2. Résumé professionnel (3-5 lignes)</h3>
<p>Intégrez votre positionnement, années d'expérience et 3-4 mots-clés stratégiques. C'est la zone la plus indexée par l'ATS.</p>
<h3>3. Section compétences structurée</h3>
<p>Organisez par catégories : Langages/frameworks, Outils/plateformes, Méthodologies, Soft skills.</p>
<h3>4. Expériences professionnelles</h3>
<p>Format : Titre | Entreprise | Ville | Dates. Puis 4-6 bullets quantifiés avec mots-clés de l'offre.</p>
<h3>5. Formation et certifications</h3>
<p>Diplôme | Établissement | Année. Listez toutes les certifications avec l'organisme délivrant.</p>
<h2>La stratégie des mots-clés</h2>
<p>Méthode : copiez l'offre, relevez 15-20 termes techniques, classez-les par fréquence, intégrez les répétés 2+ fois en priorité. Utilisez à la fois les acronymes et formes développées : "SEO (Search Engine Optimization)".</p>
<h2>Quantifier pour convaincre</h2>
<p>Visez 50 % de bullets quantifiés : "Augmenté le taux de conversion de <strong>23 %</strong>", "Géré un budget de <strong>450 k€</strong>", "Formé <strong>45 collaborateurs</strong>".</p>
<h2>Tester avant d'envoyer</h2>
<p><a href="/">Job Application AI</a> donne en 20 secondes : score ATS, mots-clés manquants, sections à renforcer, et un CV entièrement refondu.</p>
      `,
    },
    en: {
      title: "How to Optimize Your Resume for ATS Software",
      description: "Complete guide to optimizing your resume for ATS tools: format, keywords, structure and best practices for 2026.",
      content: `
<p>Resume optimization for ATS has become a must-have skill for every job seeker. This guide gives you everything you need to <strong>maximize your ATS score</strong> and clear the first automatic screening barrier.</p>
<h2>How ATS Software Works</h2>
<p>An ATS works like a specialized search engine. It parses your resume, extracts entities (companies, titles, dates, skills), compares that data against the recruiter's criteria, and assigns a compatibility score.</p>
<h2>Format: The Golden Rules</h2>
<h3>File Format</h3>
<p><strong>DOCX</strong> is the most compatible format. Plain PDF is acceptable. Avoid ODT, RTF and HTML.</p>
<h3>Clean Layout</h3>
<p>Single-column is the safest layout. If using two columns, create them with a Word table — never with floating text boxes.</p>
<h3>Font & Size</h3>
<ul>
  <li>Body: 10-12pt, headings: 13-16pt</li>
  <li>Fonts: Calibri, Arial, Helvetica, Times New Roman</li>
  <li>No SVG icons or skill-bar graphics</li>
</ul>
<h2>Optimal ATS Resume Structure</h2>
<h3>1. Header</h3>
<p>Full name, current title, email, phone, city, LinkedIn. All in the document body — not in Word headers/footers.</p>
<h3>2. Professional Summary (3-5 lines)</h3>
<p>Include your positioning, years of experience, and 3-4 strategic keywords. This is the highest-indexed zone of your resume.</p>
<h3>3. Structured Skills Section</h3>
<p>Organize by category: Languages/frameworks, Tools/platforms, Methodologies, Soft skills.</p>
<h3>4. Work Experience</h3>
<p>Format: Title | Company | Location | Dates. Then 4-6 quantified bullets with keywords from the job posting.</p>
<h3>5. Education & Certifications</h3>
<p>Degree | Institution | Year. List all certifications with the issuing organization.</p>
<h2>Keyword Strategy</h2>
<p>Method: copy the job posting, list 15-20 technical terms, rank by frequency, prioritize those appearing 2+ times. Use both acronyms and expanded forms: "SEO (Search Engine Optimization)".</p>
<h2>Quantify to Convince</h2>
<p>Target 50% of bullets with numbers: "Increased conversion rate by <strong>23%</strong>", "Managed a <strong>$500K</strong> budget", "Trained <strong>45 employees</strong>".</p>
<h2>Test Before Sending</h2>
<p><a href="/">Job Application AI</a> delivers in 20 seconds: ATS score, missing keywords, weak sections, and a fully rewritten resume.</p>
      `,
    },
  },
  {
    slug: "quest-ce-qu-ats-comment-fonctionne",
    date: "2026-05-18",
    readTime: 7,
    category: "CV & ATS",
    fr: {
      title: "Qu'est-ce qu'un ATS et comment fonctionne-t-il ?",
      description: "Tout comprendre sur les logiciels ATS : définition, fonctionnement, acteurs du marché et impact sur votre recherche d'emploi.",
      content: `
<p>Si vous avez candidaté en ligne sans jamais recevoir de réponse, un <strong>ATS</strong> a probablement filtré votre candidature avant qu'un humain ne la lise.</p>
<h2>Définition</h2>
<p>ATS = <strong>Applicant Tracking System</strong> (Système de Suivi des Candidatures). Logiciel RH qui automatise la réception, le tri, la gestion et le suivi des candidatures.</p>
<h2>À quoi sert un ATS ?</h2>
<ul>
  <li><strong>Centraliser</strong> toutes les candidatures (parfois des centaines par offre)</li>
  <li><strong>Trier automatiquement</strong> selon des critères prédéfinis</li>
  <li><strong>Scorer</strong> les candidats selon leur compatibilité avec l'offre</li>
  <li><strong>Communiquer</strong> avec les candidats (accusés de réception, rejets)</li>
  <li><strong>Stocker</strong> les profils pour de futures opportunités</li>
</ul>
<h2>Le parsing de CV</h2>
<p>Le parser extrait : Identité (nom, email, téléphone), Titre actuel, Expériences (entreprise, poste, dates, description), Formation, Compétences, Langues. Si votre CV est mal structuré, ces données sont mal interprétées ou ignorées.</p>
<h2>Le scoring et le ranking</h2>
<p>L'ATS compare votre CV aux critères du recruteur et attribue un score basé sur : mots-clés, titre de poste, années d'expérience, niveau d'études, localisation, certifications. Les candidatures sont classées par score décroissant.</p>
<h2>Les principaux ATS en France</h2>
<ul>
  <li><strong>Workday</strong> — CAC 40, multinationales</li>
  <li><strong>SAP SuccessFactors</strong> — Industrie, banque, assurance</li>
  <li><strong>Oracle Taleo</strong> — Grandes entreprises, secteur public</li>
  <li><strong>Greenhouse / Lever</strong> — Startups et scale-ups</li>
  <li><strong>Flatchr / Recruitee</strong> — PME françaises</li>
</ul>
<h2>L'IA dans les ATS modernes</h2>
<p>Les ATS nouvelle génération intègrent du machine learning pour identifier des profils "cachés", prédire la performance et détecter les biais. Un profil cohérent, bien rédigé et quantifié sera mieux valorisé.</p>
<h2>Ce que vous pouvez faire</h2>
<p>Adaptez votre CV pour chaque candidature, utilisez les bons mots-clés et testez votre compatibilité avec <a href="/">Job Application AI</a> avant d'envoyer.</p>
      `,
    },
    en: {
      title: "What Is an ATS and How Does It Work?",
      description: "Everything you need to know about Applicant Tracking Systems: definition, how they work, major platforms and their impact on your job search.",
      content: `
<p>If you've applied online and never heard back, an <strong>ATS</strong> likely filtered your application before any human saw it.</p>
<h2>Definition</h2>
<p>ATS = <strong>Applicant Tracking System</strong>. HR software that automates the receipt, screening, management and tracking of job applications.</p>
<h2>What Does an ATS Do?</h2>
<ul>
  <li><strong>Centralize</strong> all applications (sometimes hundreds per role)</li>
  <li><strong>Auto-screen</strong> based on pre-set criteria</li>
  <li><strong>Score</strong> candidates on job compatibility</li>
  <li><strong>Communicate</strong> with applicants (confirmations, rejections)</li>
  <li><strong>Store</strong> profiles for future opportunities</li>
</ul>
<h2>Resume Parsing</h2>
<p>The parser extracts: Identity (name, email, phone), Current title, Work experience (company, role, dates, description), Education, Skills, Languages. If your resume is poorly structured, this data is misread or ignored entirely.</p>
<h2>Scoring and Ranking</h2>
<p>The ATS compares your resume against the recruiter's criteria and assigns a score based on: keywords, job title match, years of experience, education level, location, certifications. Applications are ranked highest to lowest.</p>
<h2>Major ATS Platforms</h2>
<ul>
  <li><strong>Workday</strong> — Fortune 500, multinationals</li>
  <li><strong>SAP SuccessFactors</strong> — Industrial, banking, insurance sectors</li>
  <li><strong>Oracle Taleo</strong> — Large enterprises, public sector</li>
  <li><strong>Greenhouse / Lever</strong> — Tech startups and scale-ups</li>
  <li><strong>BambooHR / Recruitee</strong> — SMBs</li>
</ul>
<h2>AI in Modern ATS</h2>
<p>Next-gen ATS platforms use machine learning to surface "hidden" profiles, predict future performance and detect bias in hiring. A coherent, well-written and quantified resume performs better with these algorithms.</p>
<h2>What You Can Do</h2>
<p>Tailor your resume for each application, use the right keywords and test your compatibility with <a href="/">Job Application AI</a> before hitting send.</p>
      `,
    },
  },
  {
    slug: "ats-mots-cles-utiliser-cv",
    date: "2026-05-17",
    readTime: 8,
    category: "CV & ATS",
    fr: {
      title: "ATS : les mots-clés à utiliser dans son CV",
      description: "Comment trouver et intégrer les bons mots-clés dans votre CV pour maximiser votre score ATS et décrocher plus d'entretiens.",
      content: `
<p>Les mots-clés sont le carburant de votre CV dans un monde dominé par les ATS. Sans les bons termes, même le meilleur profil peut passer à la trappe.</p>
<h2>Les 5 types de mots-clés ATS</h2>
<h3>1. Hard skills techniques</h3>
<p>Langages (Python, SQL, Java), outils (Salesforce, HubSpot, Tableau), frameworks (React, Django), cloud (AWS, Azure).</p>
<h3>2. Titres de postes</h3>
<p>Miroir exact du titre de l'offre dans votre résumé et vos expériences. "Product Manager" ≠ "Chef de produit" pour l'ATS.</p>
<h3>3. Certifications et diplômes</h3>
<p>Google Analytics, PMP, Prince2, AWS Certified. Nom complet du diplôme (Master, MBA, Ingénieur).</p>
<h3>4. Soft skills sectoriels</h3>
<p>Évitez les généralités. Préférez : "négociation grands comptes", "gestion d'équipes cross-fonctionnelles", "growth hacking".</p>
<h3>5. Termes sectoriels</h3>
<p>Finance : "due diligence", "LBO", "EBITDA". Digital : "funnel de conversion", "A/B testing", "SEO technique".</p>
<h2>Comment trouver les bons mots-clés</h2>
<p>Lisez l'offre 3 fois, surlignez tous les termes techniques à la 2e lecture, identifiez ceux répétés 2+ fois à la 3e. Ces termes répétés = vos priorités absolues.</p>
<p>Analysez aussi 5-10 offres similaires : les mots-clés communs à toutes sont les "core keywords" du métier.</p>
<p>Ou utilisez <a href="/">Job Application AI</a> qui extrait automatiquement les mots-clés prioritaires et les intègre dans votre CV.</p>
<h2>Comment intégrer les mots-clés</h2>
<h3>Dans le résumé (impact maximum)</h3>
<p>5-8 mots-clés stratégiques dans les 5 premières lignes. Ex : "Responsable marketing digital avec 7 ans d'expérience en <strong>SEO, SEA, marketing automation (HubSpot)</strong>."</p>
<h3>Dans les bullets d'expérience</h3>
<p>❌ "Développé la stratégie digitale"<br/>✅ "Déployé une stratégie <strong>inbound marketing</strong> via <strong>HubSpot</strong>, générant 340 leads/mois (+67 %)"</p>
<h3>Dans la section compétences</h3>
<p>Liste structurée scannée en priorité par l'ATS pour le matching technique.</p>
<h2>Les erreurs à éviter</h2>
<p><strong>Keyword stuffing</strong> : répéter 15 fois le même mot-clé pénalise certains ATS. <strong>Mots-clés hors-contexte</strong> : lister des compétences sans expérience correspondante est détecté. <strong>Oublier les synonymes</strong> : utilisez "développeur back-end" ET "ingénieur serveur" si les deux sont pertinents.</p>
      `,
    },
    en: {
      title: "ATS Keywords: What to Include in Your Resume",
      description: "How to find and integrate the right keywords in your resume to maximize your ATS score and land more interviews.",
      content: `
<p>Keywords are the fuel that powers your resume in an ATS-driven world. Without the right terms, even the best profile gets filtered out.</p>
<h2>The 5 Types of ATS Keywords</h2>
<h3>1. Hard Technical Skills</h3>
<p>Languages (Python, SQL, Java), tools (Salesforce, HubSpot, Tableau), frameworks (React, Django), cloud platforms (AWS, Azure).</p>
<h3>2. Job Titles</h3>
<p>Mirror the exact title from the job posting in your summary and experience sections. "Product Manager" ≠ "Product Lead" in ATS logic.</p>
<h3>3. Certifications and Degrees</h3>
<p>Google Analytics, PMP, Scrum Master, AWS Certified. Always spell out the full credential name.</p>
<h3>4. Sector-Specific Soft Skills</h3>
<p>Avoid generic terms like "team player." Use specific ones: "enterprise account negotiation", "cross-functional team leadership", "growth hacking".</p>
<h3>5. Industry Jargon</h3>
<p>Finance: "due diligence", "LBO", "EBITDA". Digital: "conversion funnel", "A/B testing", "technical SEO".</p>
<h2>How to Find the Right Keywords</h2>
<p>Read the job posting 3 times. Highlight all technical and role-specific terms on the second read. Identify terms that appear 2+ times on the third — those are your top priorities.</p>
<p>Also analyze 5-10 similar job postings. Keywords appearing across all of them are the "core keywords" of that profession — essential to include.</p>
<p>Or use <a href="/">Job Application AI</a> which automatically extracts priority keywords from the posting and integrates them into your resume.</p>
<h2>How to Integrate Keywords</h2>
<h3>In the Summary (Highest Impact)</h3>
<p>Pack 5-8 strategic keywords into your first 5 lines. E.g.: "Digital marketing manager with 7 years of experience in <strong>SEO, PPC, marketing automation (HubSpot, Marketo)</strong>."</p>
<h3>In Experience Bullets</h3>
<p>❌ "Developed digital strategy"<br/>✅ "Deployed an <strong>inbound marketing</strong> strategy via <strong>HubSpot</strong>, generating 340 qualified leads/month (+67%)"</p>
<h3>In the Skills Section</h3>
<p>A structured list that the ATS scans first for technical matching. Use clear categories.</p>
<h2>Mistakes to Avoid</h2>
<p><strong>Keyword stuffing</strong>: repeating a term 15 times actually penalizes you with modern ATS. <strong>Context-free keywords</strong>: listing skills you haven't used in any role is flagged. <strong>Missing synonyms</strong>: use both "back-end developer" and "server-side engineer" if both are relevant.</p>
      `,
    },
  },
  {
    slug: "adapter-cv-offre-emploi-2026",
    date: "2026-05-16",
    readTime: 8,
    category: "Stratégie",
    fr: {
      title: "Comment adapter son CV à une offre d'emploi en 2026",
      description: "Méthode complète pour personnaliser votre CV à chaque offre d'emploi en 2026 : analyse, adaptation, optimisation et gain de temps avec l'IA.",
      content: `
<p>Un CV générique envoyé en masse est l'erreur numéro un des chercheurs d'emploi. En 2026, avec la généralisation des ATS, <strong>adapter son CV à chaque offre est devenu incontournable</strong>.</p>
<h2>Pourquoi adapter son CV à chaque offre ?</h2>
<ul>
  <li>Les ATS filtrent par mots-clés spécifiques — un CV générique rate souvent les termes clés</li>
  <li>Les recruteurs voient des dizaines de CV — un CV qui "parle" directement à leur besoin ressort</li>
  <li>Un même poste chez une PME et une multinationale ne demande pas le même focus</li>
</ul>
<h2>L'anatomie d'une offre d'emploi</h2>
<h3>Le titre</h3>
<p>Mot-clé prioritaire numéro 1. Rapprochez votre titre de CV au maximum de celui de l'offre.</p>
<h3>Les missions</h3>
<p>Chaque mission listée est une opportunité. Identifiez les 3-4 principales et assurez-vous d'avoir une expérience correspondante.</p>
<h3>Le profil recherché</h3>
<p>La "checklist" du recruteur. Concentrez-vous sur les "requis" (must-have) avant les "souhaités".</p>
<h2>La méthode d'adaptation en 6 étapes</h2>
<ol>
  <li><strong>Listez les exigences</strong> : "Indispensable" vs "Un plus"</li>
  <li><strong>Auditez votre CV</strong> : avez-vous une preuve pour chaque exigence indispensable ?</li>
  <li><strong>Adaptez résumé et titre</strong> : ciblez précisément ce poste, cette entreprise</li>
  <li><strong>Réécrivez les bullets clés</strong> en reprenant les termes de l'offre</li>
  <li><strong>Mettez à jour les compétences</strong> : ajoutez les outils cités, supprimez les non pertinents</li>
  <li><strong>Vérifiez le score ATS</strong> : visez 70-80 % avant d'envoyer</li>
</ol>
<h2>Combien de temps ça prend ?</h2>
<p>Sans outil IA : <strong>45 à 90 minutes</strong> par candidature.<br/>Avec <a href="/">Job Application AI</a> : <strong>20 secondes</strong>. L'IA s'occupe de l'analyse ATS, de la réécriture et de l'optimisation des mots-clés.</p>
<h2>Ce qu'il ne faut PAS adapter</h2>
<p>N'inventez pas d'expériences, de compétences, de résultats ou de diplômes que vous n'avez pas. L'adaptation = mettre en lumière ce qui est pertinent, reformuler avec les bons termes, hiérarchiser correctement.</p>
      `,
    },
    en: {
      title: "How to Tailor Your Resume to a Job Posting in 2026",
      description: "A complete method for customizing your resume for every job opportunity in 2026: analysis, tailoring, optimization and time savings with AI.",
      content: `
<p>A generic resume sent in bulk is the number one mistake of job seekers. In 2026, with ATS now standard, <strong>tailoring your resume for each application is non-negotiable</strong>.</p>
<h2>Why Tailor for Every Posting?</h2>
<ul>
  <li>ATS filters by specific keywords — a generic resume misses them constantly</li>
  <li>Recruiters see dozens of resumes — one that speaks directly to their needs stands out</li>
  <li>The same title at a startup vs. a Fortune 500 requires different emphasis</li>
</ul>
<h2>Anatomy of a Job Posting</h2>
<h3>The Job Title</h3>
<p>Priority keyword #1. Mirror it in your resume's headline.</p>
<h3>Responsibilities</h3>
<p>Each listed responsibility is an opportunity. Identify the 3-4 main ones and ensure you have matching experience.</p>
<h3>Required Profile</h3>
<p>The recruiter's "checklist." Focus on must-haves before nice-to-haves.</p>
<h2>6-Step Tailoring Method</h2>
<ol>
  <li><strong>List requirements</strong>: "Must-have" vs "Nice-to-have"</li>
  <li><strong>Audit your resume</strong>: do you have evidence for each must-have?</li>
  <li><strong>Rewrite summary and title</strong>: target this specific role and company</li>
  <li><strong>Rewrite key bullets</strong>: use the posting's exact language</li>
  <li><strong>Update your skills section</strong>: add cited tools, remove irrelevant ones</li>
  <li><strong>Check your ATS score</strong>: aim for 70-80% before sending</li>
</ol>
<h2>How Long Does It Take?</h2>
<p>Without AI tools: <strong>45 to 90 minutes</strong> per application.<br/>With <a href="/">Job Application AI</a>: <strong>20 seconds</strong>. The AI handles the ATS analysis, rewriting and keyword optimization.</p>
<h2>What NOT to Adapt</h2>
<p>Don't invent experience, skills, results or credentials you don't have. Tailoring means highlighting what's relevant, rephrasing with the right terms, and prioritizing correctly — never fabricating.</p>
      `,
    },
  },
  {
    slug: "pourquoi-cv-rejete-avant-etre-lu",
    date: "2026-05-15",
    readTime: 7,
    category: "CV & ATS",
    fr: {
      title: "Pourquoi votre CV est rejeté avant même d'être lu",
      description: "Les vraies raisons pour lesquelles votre CV ne génère pas de réponses : ATS, format, mots-clés, et comment y remédier.",
      content: `
<p>Vous envoyez des candidatures régulièrement et le silence persiste ? Ce n'est pas forcément votre profil. Dans la majorité des cas, votre CV est <strong>rejeté avant qu'un humain ne le lise</strong>.</p>
<h2>La réalité du marché</h2>
<ul>
  <li>Une offre LinkedIn reçoit en moyenne <strong>250 candidatures</strong></li>
  <li><strong>75 %</strong> des grandes entreprises utilisent un ATS</li>
  <li>Seulement <strong>20 %</strong> des CV passent le premier filtre</li>
  <li>Un recruteur passe <strong>7 secondes</strong> sur un CV</li>
</ul>
<h2>Raison #1 : Mots-clés manquants</h2>
<p>L'ATS cherche des termes spécifiques issus de l'offre. Si vous êtes "expert en référencement naturel" mais l'offre cherche un "SEO Manager", vous n'utilisez pas les mêmes mots.</p>
<h2>Raison #2 : Format incompatible</h2>
<p>Tableaux, zones de texte, colonnes multiples, photos — tout cela pose de sérieux problèmes aux parsers ATS. Votre design créatif peut devenir une bouillie illisible pour le logiciel.</p>
<h2>Raison #3 : Titre de poste inadapté</h2>
<p>L'ATS donne un poids énorme au titre dans votre en-tête. Si l'offre cherche "Responsable e-commerce" et que votre titre est "Digital Manager", vous perdez des points cruciaux.</p>
<h2>Raison #4 : Pas de section compétences</h2>
<p>Lister ses compétences uniquement dans les descriptions d'expérience et non dans une section dédiée est une erreur fréquente.</p>
<h2>Raison #5 : PDF non sélectionnable</h2>
<p>Un CV scanné ou généré en image est illisible pour un ATS. Ctrl+A dans votre PDF — si le texte ne se sélectionne pas, régénérez depuis Word.</p>
<h2>Raison #6 : Résumé absent ou générique</h2>
<p>Le résumé est la section la plus impactante. "Professionnel motivé cherchant à relever de nouveaux défis" ne génère aucun score ATS.</p>
<h2>Le test des 7 secondes</h2>
<p>Même en passant l'ATS, votre CV doit passer le test humain. En 7 secondes, le recruteur cherche : titre + entreprise actuelle, nom de l'école, 2-3 résultats quantifiés. Si ces éléments ne ressortent pas immédiatement, vous perdez l'attention.</p>
<h2>Diagnostiquez votre CV</h2>
<p><a href="/">Job Application AI</a> analyse votre CV face à une offre en 20 secondes : score ATS, mots-clés manquants, sections faibles, CV refondu + lettre de motivation.</p>
      `,
    },
    en: {
      title: "Why Your Resume Gets Rejected Before Anyone Reads It",
      description: "The real reasons your resume isn't generating responses: ATS, format, keywords — and how to fix each one.",
      content: `
<p>You're applying consistently and the silence continues? It may not be your profile. In most cases, your resume is <strong>rejected before a human ever sees it</strong>.</p>
<h2>Market Reality</h2>
<ul>
  <li>A LinkedIn posting gets an average of <strong>250 applications</strong></li>
  <li><strong>75%</strong> of large companies use an ATS</li>
  <li>Only <strong>20%</strong> of resumes pass the first filter</li>
  <li>Recruiters spend an average of <strong>7 seconds</strong> on a resume</li>
</ul>
<h2>Reason #1: Missing Keywords</h2>
<p>The ATS looks for specific terms from the job posting. If you're an "SEO specialist" but the posting wants an "SEO Manager," those aren't the same keywords.</p>
<h2>Reason #2: Incompatible Format</h2>
<p>Tables, text boxes, multiple columns, photos — all of these cause serious problems for ATS parsers. Your creative design may become unreadable gibberish for the software.</p>
<h2>Reason #3: Mismatched Job Title</h2>
<p>ATS gives enormous weight to the title in your header. If the posting wants "E-commerce Manager" and your title is "Digital Lead," you're losing critical points.</p>
<h2>Reason #4: No Dedicated Skills Section</h2>
<p>Embedding skills only in job description paragraphs — rather than a clearly labeled section — is a common and costly mistake.</p>
<h2>Reason #5: Non-Selectable PDF</h2>
<p>A scanned or image-based resume is invisible to ATS. Press Ctrl+A in your PDF — if the text doesn't highlight, regenerate it from Word.</p>
<h2>Reason #6: Absent or Generic Summary</h2>
<p>Your summary is the highest-impact section. "Motivated professional seeking new challenges" generates zero ATS score.</p>
<h2>The 7-Second Human Test</h2>
<p>Even after passing the ATS, your resume must pass the human scan. In 7 seconds, recruiters look for: current title + company, school name, 2-3 quantified results. If these don't pop immediately, you've lost their attention.</p>
<h2>Diagnose Your Resume</h2>
<p><a href="/">Job Application AI</a> analyzes your resume against any job posting in 20 seconds: ATS score, missing keywords, weak sections, rewritten resume + cover letter.</p>
      `,
    },
  },
  {
    slug: "utiliser-ia-trouver-emploi",
    date: "2026-05-14",
    readTime: 9,
    category: "AI & Jobs",
    fr: {
      title: "Comment utiliser l'IA pour trouver un emploi",
      description: "Guide pratique pour utiliser l'intelligence artificielle dans votre recherche d'emploi : CV, lettres de motivation, entretiens et stratégie.",
      content: `
<p>L'IA a profondément transformé la recherche d'emploi. En 2026, les candidats qui l'utilisent intelligemment ont un avantage concurrentiel significatif.</p>
<h2>Les 4 fronts où l'IA vous aide</h2>
<ol>
  <li><strong>Création et optimisation des documents</strong> : CV, lettre de motivation</li>
  <li><strong>Analyse et matching</strong> : compatibilité ATS, score d'adéquation</li>
  <li><strong>Préparation aux entretiens</strong> : simulations, Q&A, feedback</li>
  <li><strong>Stratégie</strong> : ciblage d'entreprises, personal branding, réseau</li>
</ol>
<h2>1. Optimiser son CV avec l'IA</h2>
<p><a href="/">Job Application AI</a> analyse votre CV face à une offre et donne en 20 secondes : score ATS, mots-clés manquants, CV entièrement refondu + lettre personnalisée. Gratuit.</p>
<h2>2. Rédiger sa lettre de motivation avec l'IA</h2>
<p>L'IA adapte le ton (startup vs corporate), personnalise selon l'entreprise, évite les clichés et intègre vos accomplissements clés. Gain de temps : 30 à 60 minutes par candidature.</p>
<h2>3. Préparer ses entretiens</h2>
<p>ChatGPT ou Claude peuvent simuler un entretien. Donnez-leur la fiche de poste, demandez-leur de jouer le recruteur. Entraînez-vous sur les questions comportementales, techniques et les pièges courants.</p>
<h2>4. Construire sa stratégie</h2>
<ul>
  <li><strong>Ciblage d'entreprises</strong> : décrivez votre profil et vos critères, l'IA suggère des cibles</li>
  <li><strong>LinkedIn</strong> : l'IA réécrit votre titre, résumé et descriptions d'expérience pour maximiser la visibilité</li>
  <li><strong>Prospection</strong> : créez des messages personnalisés et impactants pour chaque contact</li>
</ul>
<h2>Les limites à connaître</h2>
<ul>
  <li><strong>L'IA peut halluciner</strong> : vérifiez toujours les faits, notamment les chiffres de l'entreprise</li>
  <li><strong>Le style doit rester le vôtre</strong> : personnalisez systématiquement</li>
  <li><strong>L'IA ne remplace pas le réseau</strong> : 30-50 % des postes se pourvoyent sans offre publique</li>
</ul>
      `,
    },
    en: {
      title: "How to Use AI to Find a Job",
      description: "A practical guide to using artificial intelligence in your job search: resumes, cover letters, interview prep and strategy.",
      content: `
<p>AI has fundamentally transformed the job search. In 2026, candidates who use it intelligently have a meaningful competitive edge.</p>
<h2>4 Areas Where AI Helps You</h2>
<ol>
  <li><strong>Document creation and optimization</strong>: resume, cover letter</li>
  <li><strong>Analysis and matching</strong>: ATS compatibility, fit score</li>
  <li><strong>Interview preparation</strong>: mock sessions, Q&A, feedback</li>
  <li><strong>Strategy</strong>: company targeting, personal branding, networking</li>
</ol>
<h2>1. Optimize Your Resume With AI</h2>
<p><a href="/">Job Application AI</a> analyzes your resume against any job posting and delivers in 20 seconds: ATS score, missing keywords, fully rewritten resume + personalized cover letter. Free.</p>
<h2>2. Write Your Cover Letter With AI</h2>
<p>AI adapts the tone (startup vs. corporate), personalizes for the specific company, eliminates clichés and weaves in your key achievements. Time saved: 30-60 minutes per application.</p>
<h2>3. Prepare for Interviews</h2>
<p>ChatGPT or Claude can simulate an interview. Give it the job description and ask it to play recruiter. Practice behavioral, technical and curveball questions.</p>
<h2>4. Build Your Strategy</h2>
<ul>
  <li><strong>Company targeting</strong>: describe your profile and criteria, AI suggests targets</li>
  <li><strong>LinkedIn optimization</strong>: AI rewrites your headline, about section and experience descriptions to maximize recruiter visibility</li>
  <li><strong>Outreach</strong>: craft personalized, impactful messages for each contact</li>
</ul>
<h2>Know the Limits</h2>
<ul>
  <li><strong>AI can hallucinate</strong>: always verify facts, especially company-specific data</li>
  <li><strong>Your voice must stay yours</strong>: always personalize the output</li>
  <li><strong>AI doesn't replace your network</strong>: 30-50% of positions are filled without a public posting</li>
</ul>
      `,
    },
  },
  {
    slug: "utiliser-chatgpt-ameliorer-cv",
    date: "2026-05-13",
    readTime: 8,
    category: "AI & Jobs",
    fr: {
      title: "Comment utiliser ChatGPT pour améliorer son CV",
      description: "Tutoriel pratique avec prompts pour utiliser ChatGPT et améliorer votre CV : réécriture, optimisation ATS, personnalisation et limites.",
      content: `
<p>ChatGPT peut transformer votre CV — à condition de savoir l'utiliser correctement. Les prompts vagues donnent des résultats médiocres. Voici les prompts exacts.</p>
<h2>Ce que ChatGPT peut faire pour votre CV</h2>
<ul>
  <li>Réécrire vos bullets d'expérience de façon plus impactante</li>
  <li>Quantifier vos accomplissements à partir de vos données brutes</li>
  <li>Optimiser les mots-clés pour une offre spécifique</li>
  <li>Rédiger votre résumé professionnel</li>
  <li>Corriger la grammaire et améliorer le style</li>
  <li>Adapter le ton selon le type d'entreprise</li>
</ul>
<h2>Les prompts essentiels</h2>
<h3>Réécriture de bullets</h3>
<pre>"Réécris ces bullets en méthode STAR avec des verbes d'action forts. Intègre ces mots-clés : [liste]. Mes missions : [liste]. Mes résultats : [chiffres]."</pre>
<h3>Résumé ciblé</h3>
<pre>"Rédige un résumé professionnel de 4-5 lignes pour ce poste : [titre] chez [entreprise]. Mon profil : [expérience, compétences]. Mots-clés de l'offre : [liste]. Sans clichés."</pre>
<h3>Optimisation ATS</h3>
<pre>"Voici mon CV et l'offre d'emploi. Identifie les 15 mots-clés les plus importants de l'offre absents ou sous-représentés dans mon CV. Pour chacun, suggère comment l'intégrer naturellement."</pre>
<h2>Méthode en 4 étapes</h2>
<ol>
  <li><strong>Contexte complet</strong> : collez l'offre, dites qui vous êtes</li>
  <li><strong>Section par section</strong> : travaillez résumé, puis chaque expérience, puis compétences</li>
  <li><strong>Itérez</strong> : donnez du feedback ("trop long", "intègre X", "plus concis")</li>
  <li><strong>Personnalisez</strong> : gardez votre voix, corrigez les inexactitudes</li>
</ol>
<h2>ChatGPT vs outils spécialisés</h2>
<p>ChatGPT excelle pour la réécriture textuelle mais n'analyse pas votre score ATS ni ne génère un CV visuellement mis en page. La combinaison gagnante : <a href="/">Job Application AI</a> (ATS + CV + lettre) + ChatGPT (préparation entretien + personal branding).</p>
      `,
    },
    en: {
      title: "How to Use ChatGPT to Improve Your Resume",
      description: "Practical tutorial with exact prompts to use ChatGPT for resume improvement: rewriting, ATS optimization, personalization and what to watch out for.",
      content: `
<p>ChatGPT can genuinely transform your resume — but only if you use it correctly. Vague prompts produce mediocre results. Here are the exact prompts that work.</p>
<h2>What ChatGPT Can Do for Your Resume</h2>
<ul>
  <li>Rewrite experience bullets to be more impactful</li>
  <li>Quantify your achievements from raw inputs</li>
  <li>Optimize keywords for a specific job posting</li>
  <li>Write your professional summary</li>
  <li>Correct grammar and improve clarity</li>
  <li>Adapt the tone for different company types</li>
</ul>
<h2>Essential Prompts</h2>
<h3>Bullet Rewriting</h3>
<pre>"Rewrite these bullets using the STAR method with strong action verbs. Integrate these keywords: [list]. My responsibilities: [list]. My results: [numbers]."</pre>
<h3>Targeted Summary</h3>
<pre>"Write a 4-5 line professional summary for this role: [title] at [company]. My background: [experience, skills]. Job keywords: [list]. No clichés."</pre>
<h3>ATS Optimization</h3>
<pre>"Here's my resume and the job posting. Identify the 15 most important keywords from the posting that are absent or under-represented in my resume. For each, suggest how to integrate it naturally."</pre>
<h2>4-Step Method</h2>
<ol>
  <li><strong>Full context first</strong>: paste the full job posting, describe your background</li>
  <li><strong>Section by section</strong>: summary first, then each experience, then skills</li>
  <li><strong>Iterate</strong>: give feedback ("too long", "add keyword X", "more concise")</li>
  <li><strong>Personalize</strong>: keep your voice, fix inaccuracies, add specific anecdotes</li>
</ol>
<h2>ChatGPT vs. Specialized Tools</h2>
<p>ChatGPT excels at text rewriting but doesn't measure your ATS score or generate a formatted resume. The winning combo: <a href="/">Job Application AI</a> (ATS + resume + cover letter) + ChatGPT (interview prep + personal branding).</p>
      `,
    },
  },
  {
    slug: "meilleurs-outils-ia-chercheurs-emploi",
    date: "2026-05-12",
    readTime: 9,
    category: "AI & Jobs",
    fr: {
      title: "Les meilleurs outils IA pour chercheurs d'emploi en 2026",
      description: "Comparatif des meilleurs outils IA pour votre recherche d'emploi en 2026 : analyse ATS, CV, lettres, entretiens et LinkedIn.",
      content: `
<p>Le marché des outils IA pour l'emploi a explosé. Voici un comparatif honnête par catégorie.</p>
<h2>Catégorie 1 : Analyse ATS et optimisation de CV</h2>
<h3>Job Application AI (jobapplication.fr)</h3>
<p><strong>Forces :</strong> Analyse ATS complète, CV refondu + lettre en 20 secondes, 3 templates, export PDF/DOCX, interface FR/EN, 100 % gratuit.<br/><strong>Idéal pour :</strong> Workflow complet en une seule étape. <a href="/">Tester →</a></p>
<h3>Rezi</h3>
<p><strong>Forces :</strong> Score ATS en temps réel, bibliothèque de mots-clés par secteur.<br/><strong>Limites :</strong> Interface EN uniquement, fonctionnalités avancées payantes.</p>
<h3>Jobscan</h3>
<p><strong>Forces :</strong> Comparaison CV vs offre très détaillée, données sur les ATS utilisés par les entreprises.<br/><strong>Limites :</strong> Payant après quelques analyses.</p>
<h2>Catégorie 2 : Création de CV</h2>
<ul>
  <li><strong>Kickresume</strong> — Templates pro avec IA intégrée, import LinkedIn</li>
  <li><strong>Resume.io</strong> — Interface intuitive, IA pour descriptions de poste</li>
  <li><strong>Enhancv</strong> — Focus storytelling et accomplissements</li>
</ul>
<h2>Catégorie 3 : Préparation aux entretiens</h2>
<ul>
  <li><strong>Final Round AI</strong> — Coach IA en temps réel pendant l'entretien</li>
  <li><strong>Interview Warmup (Google)</strong> — Gratuit, questions sectorielles</li>
  <li><strong>ChatGPT / Claude</strong> — Simulation d'entretien, recherche sur l'entreprise</li>
</ul>
<h2>Mon stack recommandé</h2>
<h3>En recherche active</h3>
<ol>
  <li><a href="/">Job Application AI</a> → pour chaque candidature (20 secondes)</li>
  <li>ChatGPT → préparation entretiens + personal branding</li>
  <li>Taplio → pour booster LinkedIn si vous êtes en personal branding</li>
</ol>
<h2>Ce que l'IA ne remplacera jamais</h2>
<p>Votre réseau, votre authenticité en entretien, votre expertise réelle. Les outils IA amplifient votre efficacité — ils ne compensent pas un manque de fond.</p>
      `,
    },
    en: {
      title: "Best AI Tools for Job Seekers in 2026",
      description: "An honest comparison of the best AI tools for your job search in 2026: ATS analysis, resumes, cover letters, interview prep and LinkedIn.",
      content: `
<p>The AI job search tool market has exploded. Here's an honest breakdown by category.</p>
<h2>Category 1: ATS Analysis and Resume Optimization</h2>
<h3>Job Application AI (jobapplication.fr)</h3>
<p><strong>Strengths:</strong> Complete ATS analysis, rewritten resume + cover letter in 20 seconds, 3 templates, PDF/DOCX export, FR/EN interface, 100% free.<br/><strong>Best for:</strong> Full workflow in one shot. <a href="/">Try it →</a></p>
<h3>Rezi</h3>
<p><strong>Strengths:</strong> Real-time ATS score as you type, keyword library by industry.<br/><strong>Limits:</strong> English only, advanced features are paid.</p>
<h3>Jobscan</h3>
<p><strong>Strengths:</strong> Very detailed resume vs. job posting comparison, data on which ATS companies actually use.<br/><strong>Limits:</strong> Free tier is limited.</p>
<h2>Category 2: Resume Creation</h2>
<ul>
  <li><strong>Kickresume</strong> — Professional templates with built-in AI, LinkedIn import</li>
  <li><strong>Resume.io</strong> — Intuitive interface, AI for experience descriptions</li>
  <li><strong>Enhancv</strong> — Focus on storytelling and achievements</li>
</ul>
<h2>Category 3: Interview Prep</h2>
<ul>
  <li><strong>Final Round AI</strong> — Real-time AI coach during live interviews</li>
  <li><strong>Interview Warmup (Google)</strong> — Free, industry-specific question banks</li>
  <li><strong>ChatGPT / Claude</strong> — Mock interviews, company research</li>
</ul>
<h2>My Recommended Stack</h2>
<h3>Active Job Search</h3>
<ol>
  <li><a href="/">Job Application AI</a> → for every application (20 seconds)</li>
  <li>ChatGPT → interview prep + personal branding</li>
  <li>Resume Worded → LinkedIn optimization for recruiter visibility</li>
</ol>
<h2>What AI Will Never Replace</h2>
<p>Your network, your authenticity in interviews, your real expertise. AI tools amplify your efficiency — they don't compensate for a lack of substance.</p>
      `,
    },
  },
  {
    slug: "lettre-motivation-ia-avantages-limites",
    date: "2026-05-11",
    readTime: 7,
    category: "AI & Jobs",
    fr: {
      title: "Lettre de motivation IA : avantages et limites",
      description: "Analyse complète des avantages et limites de la rédaction de lettres de motivation par IA, avec méthode pour obtenir les meilleurs résultats.",
      content: `
<p>La lettre de motivation générée par IA est devenue courante en 2026. Bonne idée ? Quels sont les vrais gains ? Les risques ? Et comment l'utiliser correctement ?</p>
<h2>Les avantages</h2>
<h3>Gain de temps massif</h3>
<p>Une bonne lettre prend 45 min à 2h à rédiger. Une IA produit une base solide en 20 secondes. Sur une recherche de 3 mois avec 10 candidatures/semaine : gain de 30-80 heures.</p>
<h3>Personnalisation à l'échelle</h3>
<p>L'IA adapte ton, vocabulaire, missions citées selon l'entreprise, le secteur et le type d'organisation (startup, grand groupe, PME, conseil).</p>
<h3>Élimination des clichés</h3>
<p>Une IA bien configurée évite "Je me permets de vous adresser ma candidature" et "Ma polyvalence et ma capacité d'adaptation". Elle produit un texte plus direct et factuel.</p>
<h3>Cohérence avec le CV</h3>
<p><a href="/">Job Application AI</a> génère le CV et la lettre simultanément, assurant une cohérence parfaite entre les deux documents.</p>
<h2>Les limites</h2>
<h3>Style "IA" reconnaissable</h3>
<p>Les recruteurs expérimentés repèrent les lettres générées : trop parfaites, trop académiques, sans détails personnels. Risque plus élevé pour les postes de communication ou RH.</p>
<h3>Manque de vraie personnalisation</h3>
<p>L'IA ne connaît pas votre anecdote avec ce client difficile, ni votre vrai "pourquoi" pour cette entreprise.</p>
<h2>La méthode gagnante</h2>
<ol>
  <li>Donnez le maximum de contexte : offre complète, 3 accomplissements clés, motivation réelle</li>
  <li>Générez une première version</li>
  <li><strong>Ajoutez une anecdote personnelle</strong> dans un paragraphe (détail que seul vous pouvez connaître)</li>
  <li>Vérifiez la précision des informations sur l'entreprise</li>
  <li>Adaptez le ton à votre voix naturelle</li>
</ol>
<p>Formule gagnante : <strong>IA pour la structure et les mots-clés + votre touche personnelle</strong>.</p>
      `,
    },
    en: {
      title: "AI Cover Letters: Benefits and Limitations",
      description: "A complete analysis of the benefits and limitations of AI-generated cover letters, with a method for getting the best results.",
      content: `
<p>AI-generated cover letters have become mainstream in 2026. Is it a good idea? What are the real gains? The risks? And how do you use it correctly?</p>
<h2>The Benefits</h2>
<h3>Massive Time Savings</h3>
<p>A good cover letter takes 45 minutes to 2 hours to write. AI produces a solid draft in 20 seconds. Over a 3-month search sending 10 applications per week: that's 30-80 hours saved.</p>
<h3>Personalization at Scale</h3>
<p>AI adapts tone, vocabulary and mission references based on the company, sector and organization type (startup, enterprise, SMB, consulting).</p>
<h3>Cliché Elimination</h3>
<p>A well-configured AI avoids "Please find attached my application" and "My versatility and adaptability." It produces more direct, fact-based prose.</p>
<h3>Consistency With Your Resume</h3>
<p><a href="/">Job Application AI</a> generates both resume and cover letter simultaneously, ensuring perfect consistency between the two documents.</p>
<h2>The Limitations</h2>
<h3>Recognizable "AI Style"</h3>
<p>Experienced recruiters are starting to spot AI-generated letters: too polished, too academic, no personal specifics. Higher risk for communication, HR or writing-heavy roles.</p>
<h3>Lack of Real Personalization</h3>
<p>AI doesn't know your story with that difficult client, or your real "why" behind wanting this specific company.</p>
<h2>The Winning Method</h2>
<ol>
  <li>Give maximum context: full posting, your 3 key achievements, real motivation</li>
  <li>Generate a first draft</li>
  <li><strong>Add one personal anecdote</strong> — a detail only you could know</li>
  <li>Verify company-specific information for accuracy</li>
  <li>Adjust the tone to match your natural voice</li>
</ol>
<p>The winning formula: <strong>AI for structure and keywords + your personal touch</strong>.</p>
      `,
    },
  },
];

// All articles: 10 original + 50 generated
export const ARTICLES: Article[] = [..._BASE_ARTICLES, ...NEW_ARTICLES];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
