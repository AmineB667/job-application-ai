#!/usr/bin/env node
/**
 * Generate 50 SEO articles (FR + EN) via DeepSeek API
 * Run: node scripts/generate-articles.mjs
 * Progress is saved to scripts/progress.json — safe to re-run after a failure.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Load .env.local ────────────────────────────────────────────────────────
function parseEnv(text) {
  const vars = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=][^=]*)=(.*)$/);
    if (m) vars[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return vars;
}
const env = parseEnv(readFileSync(join(ROOT, ".env.local"), "utf-8"));
const API_KEY = env.DEEPSEEK_API_KEY;
const BASE_URL = env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const MODEL = env.DEEPSEEK_MODEL || "deepseek-chat";

if (!API_KEY) throw new Error("DEEPSEEK_API_KEY missing from .env.local");

// ─── Files ───────────────────────────────────────────────────────────────────
const PROGRESS_FILE = join(__dirname, "progress.json");
const OUTPUT_FILE = join(ROOT, "lib", "articles-new.ts");

// ─── Template article (written by Sonnet 4.6) ────────────────────────────────
const TEMPLATE_FR = {
  title: "Lettre de motivation moderne : guide complet",
  description:
    "Tout ce qu'il faut savoir pour rédiger une lettre de motivation percutante en 2026 : structure, longueur, erreurs à éviter, personnalisation rapide et impact ATS.",
  content: `<p>En 2026, la lettre de motivation n'est pas morte — elle s'est réinventée. Les recruteurs reçoivent en moyenne 150 candidatures par offre, et votre lettre est souvent la première impression humaine que vous laissez. <strong>Une lettre moderne, ciblée et percutante peut littéralement décider de votre entretien</strong>.</p>

<h2>Pourquoi la lettre "classique" ne fonctionne plus</h2>
<p>La lettre classique commence par "Suite à votre offre publiée sur...", récite le CV et se conclut par "En espérant que ma candidature retiendra votre attention." Ce format est devenu si prévisible qu'il ne retient plus l'attention.</p>
<p>Ce que les recruteurs cherchent aujourd'hui :</p>
<ul>
  <li>Une <strong>accroche percutante</strong> qui donne envie de lire la suite</li>
  <li>Une <strong>valeur ajoutée concrète</strong> — ce que vous apportez, pas ce que vous attendez</li>
  <li>Un <strong>lien direct</strong> avec les besoins spécifiques du poste</li>
  <li>Une <strong>personnalité authentique</strong> — pas un copier-coller générique</li>
</ul>

<h2>La structure d'une lettre moderne en 4 blocs</h2>
<h3>1. L'accroche (2-3 lignes)</h3>
<p>Oubliez "Je me permets de vous adresser ma candidature." Commencez par une phrase qui prouve que vous avez fait vos recherches.</p>
<p><strong>Exemple efficace :</strong> "Votre service client IA lancé en mars m'a convaincu que [Entreprise] est à l'avant-garde de la relation client — exactement le défi que je cherche à relever avec mes 3 ans d'expérience en satisfaction client B2B."</p>

<h3>2. La valeur ajoutée (2 paragraphes)</h3>
<p>C'est le cœur de la lettre. Pas "j'ai fait ça", mais "voici ce que j'ai accompli et ce que ça signifie pour vous".</p>
<ul>
  <li>Citez 2-3 résultats <strong>quantifiés</strong> : "+18% de satisfaction client", "réduction de 30% des délais"</li>
  <li>Reliez chaque réalisation à un besoin de la fiche de poste</li>
  <li>Expliquez pourquoi vous, pas n'importe quel candidat</li>
</ul>

<h3>3. La motivation réelle (1 paragraphe)</h3>
<p>Pourquoi cette entreprise, ce secteur, ce poste ? Les recruteurs détectent immédiatement les motivations génériques. Citez un produit récent, une valeur qui vous parle, une direction stratégique.</p>

<h3>4. La conclusion et appel à l'action</h3>
<p>Soyez proactif. Au lieu de "Dans l'attente de votre réponse", préférez : "Je serais ravi d'échanger sur la façon dont je pourrais contribuer à [objectif de l'entreprise] lors d'un entretien à votre convenance."</p>

<h2>La longueur idéale en 2026</h2>
<p>Règle simple : <strong>une page maximum, 200 à 250 mots</strong>. Les recruteurs passent en moyenne 7 secondes sur une candidature. Une lettre dense sera ignorée. Une lettre courte et ciblée sera lue.</p>
<p>Test pratique : chaque phrase doit répondre à "qu'est-ce que ça apporte au recruteur ?" Supprimez tout ce qui échoue ce test.</p>

<h2>Les 6 erreurs qui font supprimer une lettre</h2>
<ul>
  <li><strong>Le copier-coller générique :</strong> "Je suis rigoureux, dynamique et motivé" — dit par 90% des candidats</li>
  <li><strong>Raconter son CV :</strong> la lettre est un argumentaire, pas un résumé de parcours</li>
  <li><strong>L'obséquiosité excessive :</strong> "Je me permets humblement de..." n'inspire pas confiance</li>
  <li><strong>Ignorer les mots-clés de l'offre :</strong> les ATS analysent aussi les lettres de motivation</li>
  <li><strong>La lettre non personnalisée :</strong> le nom de l'entreprise et les besoins du poste doivent apparaître</li>
  <li><strong>Les fautes d'orthographe :</strong> rédhibitoires, sans exception</li>
</ul>

<h2>Lettre de motivation et ATS</h2>
<p>De plus en plus d'entreprises utilisent des ATS pour filtrer les candidatures avant qu'un humain les lise. Pour passer ces filtres :</p>
<ul>
  <li>Intégrez les <strong>mots-clés exacts</strong> de la fiche de poste</li>
  <li>Utilisez un <strong>format texte pur</strong> — pas de colonnes ni d'images</li>
  <li>Évitez les en-têtes Word pour les informations importantes</li>
  <li>Nommez explicitement le titre du poste visé</li>
</ul>

<h2>Comment personnaliser une lettre en 15 minutes</h2>
<ol>
  <li><strong>Créez une base de 200 mots</strong> sur vos compétences et 2-3 réalisations clés</li>
  <li><strong>Analysez l'offre en 5 minutes</strong> : identifiez les 3 besoins prioritaires</li>
  <li><strong>Rédigez 50 mots personnalisés</strong> : l'accroche + le lien entreprise/poste</li>
</ol>

<h2>Exemples d'accroches par secteur</h2>
<h3>Marketing digital</h3>
<p>"Votre campagne [Produit] qui a généré 2M d'impressions organiques en avril confirme l'approche data-driven de [Entreprise] — c'est l'environnement dans lequel j'ai développé mes compétences ces 4 dernières années."</p>
<h3>Développement logiciel</h3>
<p>"Votre migration vers une architecture microservices annoncée sur votre blog tech correspond exactement à l'environnement dans lequel j'ai travaillé les 2 dernières années, où j'ai contribué à diviser par 3 les temps de déploiement."</p>
<h3>Alternance</h3>
<p>"Étudiant en 2e année de BTS Commerce, j'ai analysé votre catalogue et identifié 3 segments sous-exploités — des opportunités concrètes que je serais enthousiaste à développer lors de mon alternance."</p>

<h2>La lettre de motivation à l'ère de l'IA</h2>
<p>Des outils comme JobApplication.fr génèrent une première version personnalisée en quelques secondes. Mais attention : l'IA est un point de départ, pas une solution clé en main. <strong>Relisez, personnalisez, ajoutez votre ton.</strong> Les recruteurs détectent de mieux en mieux les lettres 100% générées par IA — trop lisses, trop parfaites, sans âme.</p>`,
};

const TEMPLATE_EN = {
  title: "Modern Cover Letter: The Complete Guide",
  description:
    "Everything you need to write a compelling cover letter in 2026: structure, ideal length, common mistakes, quick personalisation method, and ATS optimisation.",
  content: `<p>In 2026, the cover letter isn't dead — it's been reinvented. Recruiters receive an average of 150 applications per role, and your cover letter is often the first human impression you make. <strong>A modern, targeted cover letter can literally determine whether you get an interview</strong>.</p>

<h2>Why the traditional cover letter no longer works</h2>
<p>The standard letter opens with "I am writing to apply for...", lists everything on the CV, and closes with "I look forward to hearing from you." This format is so predictable it no longer captures attention.</p>
<p>What recruiters look for today:</p>
<ul>
  <li>A <strong>compelling hook</strong> that makes them want to keep reading</li>
  <li><strong>Concrete value</strong> — what you'll bring to them, not what you're hoping to gain</li>
  <li>A <strong>direct connection</strong> to the specific needs of the role</li>
  <li><strong>Authentic personality</strong> — not a generic template</li>
</ul>

<h2>The structure of a modern cover letter</h2>
<h3>1. The opening hook (2-3 lines)</h3>
<p>Skip "I am writing to express my interest in..." Start with a line that shows you've done your research.</p>
<p><strong>Strong example:</strong> "Your AI-powered customer service platform launched in March confirmed that [Company] is leading the way in customer experience — exactly the challenge I want to tackle, backed by 3 years of B2B customer success experience."</p>

<h3>2. Your value proposition (2 paragraphs)</h3>
<p>This is the core of your letter. Not "I have done this" but "here's what I've achieved and what it means for you".</p>
<ul>
  <li>Reference 2-3 <strong>quantified results</strong>: "+18% customer satisfaction", "reduced delivery time by 30%"</li>
  <li>Link each achievement to a specific need in the job description</li>
  <li>Explain why you — not just any candidate</li>
</ul>

<h3>3. Genuine motivation (1 paragraph)</h3>
<p>Why this company, this sector, this role? Recruiters instantly spot generic motivation. Reference a recent product launch, a value that resonates, or a strategic direction.</p>

<h3>4. Strong closing and call to action</h3>
<p>Be proactive. Instead of "I look forward to your response", try: "I would welcome the chance to discuss how I could contribute to [specific company goal] at your convenience."</p>

<h2>The ideal length in 2026</h2>
<p>Simple rule: <strong>one page maximum, 200–250 words</strong>. Recruiters spend an average of 7 seconds on an application. A dense letter will be skipped. A short, targeted letter will be read.</p>
<p>Practical test: every sentence must answer "what does this give the recruiter?" Cut anything that fails.</p>

<h2>6 mistakes that get cover letters deleted</h2>
<ul>
  <li><strong>Generic copy-paste:</strong> "I am a motivated team player" — said by 90% of applicants</li>
  <li><strong>Restating your CV:</strong> the cover letter is a pitch, not a work history summary</li>
  <li><strong>Excessive formality:</strong> overly stiff language signals lack of confidence</li>
  <li><strong>Ignoring job description keywords:</strong> ATS systems scan cover letters too</li>
  <li><strong>Zero personalisation:</strong> the company name and role requirements must appear explicitly</li>
  <li><strong>Spelling and grammar errors:</strong> an immediate dealbreaker</li>
</ul>

<h2>Cover letters and ATS</h2>
<p>A growing number of companies use Applicant Tracking Systems to screen applications automatically. To get through:</p>
<ul>
  <li>Include the <strong>exact keywords</strong> from the job description</li>
  <li>Use <strong>plain text formatting</strong> — no columns or images</li>
  <li>Keep important information out of headers and footers</li>
  <li>Explicitly name the job title you're applying for</li>
</ul>

<h2>How to personalise a cover letter in 15 minutes</h2>
<ol>
  <li><strong>Build a 200-word base</strong> covering your core skills and 2–3 key achievements</li>
  <li><strong>Analyse the job description in 5 minutes</strong>: identify the 3 priority needs</li>
  <li><strong>Write 50 tailored words</strong>: the hook + your specific company/role connection</li>
</ol>

<h2>Strong opening examples by industry</h2>
<h3>Digital marketing</h3>
<p>"Your product launch campaign that generated 2M organic impressions confirms [Company]'s data-driven approach — the same environment where I've built my skills over the past 4 years."</p>
<h3>Software development</h3>
<p>"Your move to a microservices architecture matches exactly the environment I've been working in for the past 2 years, where I helped reduce deployment times by 3x."</p>
<h3>Work-study / Internship</h3>
<p>"As a second-year Business Studies student, I've analysed your product range and spotted 3 under-tapped segments — concrete opportunities I'd be keen to develop during my placement."</p>

<h2>Cover letters in the age of AI</h2>
<p>Tools like JobApplication.fr generate a personalised first draft in seconds. But AI is a starting point, not a finished product. <strong>Review it, personalise it, add your own voice.</strong> Recruiters are increasingly skilled at detecting 100% AI-generated letters — too polished, too smooth, lacking personality.</p>`,
};

// ─── Article metadata ─────────────────────────────────────────────────────────
const ARTICLES_META = [
  // ── Lettre de motivation ──────────────────────────────────────────────────
  { slug: "lettre-motivation-moderne-guide-complet",   title: "Lettre de motivation moderne : guide complet",                    cat: "Lettre de motivation", readTime: 7, publishAt: "2026-01-15", isTemplate: true },
  { slug: "faut-il-encore-lettre-motivation",           title: "Faut-il encore faire une lettre de motivation ?",                cat: "Lettre de motivation", readTime: 5, publishAt: "2026-02-03" },
  { slug: "personnaliser-lettre-motivation-rapidement", title: "Comment personnaliser une lettre de motivation rapidement",       cat: "Lettre de motivation", readTime: 5, publishAt: "2026-04-09" },
  { slug: "exemples-lettres-motivation-efficaces",      title: "10 exemples de lettres de motivation efficaces",                  cat: "Lettre de motivation", readTime: 8, publishAt: "2026-05-07" },
  // ── CV & ATS ──────────────────────────────────────────────────────────────
  { slug: "cv-premier-emploi-guide",                    title: "Comment faire un CV premier emploi",                              cat: "CV & ATS",             readTime: 8, publishAt: "2026-02-17" },
  { slug: "cv-sans-experience-convaincre-recruteur",    title: "CV sans expérience : comment convaincre un recruteur",            cat: "CV & ATS",             readTime: 7, publishAt: "2026-02-24" },
  { slug: "cv-etudiant-guide-complet",                  title: "CV étudiant : guide complet",                                     cat: "CV & ATS",             readTime: 8, publishAt: "2026-03-05" },
  { slug: "ats-vs-cv-design",                           title: "ATS vs CV design : lequel gagne ?",                               cat: "CV & ATS",             readTime: 6, publishAt: "2026-03-19" },
  { slug: "pdf-ou-word-pour-ats",                       title: "PDF ou Word : quel format choisir pour un ATS",                   cat: "CV & ATS",             readTime: 5, publishAt: "2026-04-02" },
  { slug: "criteres-recruteurs-cv-2026",                title: "Les critères qu'analysent les recruteurs aujourd'hui",            cat: "CV & ATS",             readTime: 6, publishAt: "2026-04-16" },
  { slug: "comment-entreprises-trient-cv-2026",         title: "Comment les entreprises trient les CV en 2026",                   cat: "CV & ATS",             readTime: 7, publishAt: "2026-04-23" },
  { slug: "erreurs-qui-font-rejeter-cv",                title: "Les 15 erreurs qui font rejeter un CV",                           cat: "CV & ATS",             readTime: 7, publishAt: "2026-04-30" },
  { slug: "competences-mettre-cv-2026",                 title: "Les compétences à mettre sur un CV en 2026",                      cat: "CV & ATS",             readTime: 6, publishAt: "2026-05-14" },
  { slug: "rediger-resume-professionnel",               title: "Comment rédiger un résumé professionnel efficace",                cat: "CV & ATS",             readTime: 6, publishAt: "2026-05-19" },
  { slug: "quantifier-resultats-cv",                    title: "Comment quantifier ses résultats sur un CV",                      cat: "CV & ATS",             readTime: 5, publishAt: "2026-05-28" },
  // ── Stratégie ─────────────────────────────────────────────────────────────
  { slug: "pourquoi-pas-dentretiens",                   title: "Pourquoi vous n'obtenez pas d'entretiens",                        cat: "Stratégie",            readTime: 7, publishAt: "2026-06-04" },
  { slug: "trouver-emploi-rapidement",                  title: "Comment trouver un emploi plus rapidement",                       cat: "Stratégie",            readTime: 8, publishAt: "2026-06-11" },
  { slug: "organiser-recherche-emploi",                 title: "Comment organiser sa recherche d'emploi efficacement",            cat: "Stratégie",            readTime: 7, publishAt: "2026-06-18" },
  { slug: "linkedin-optimiser-profil-recruteurs",       title: "LinkedIn : optimiser son profil pour les recruteurs",             cat: "Stratégie",            readTime: 7, publishAt: "2026-06-25" },
  { slug: "relancer-recruteur-apres-candidature",       title: "Comment relancer un recruteur après une candidature",             cat: "Stratégie",            readTime: 5, publishAt: "2026-07-02" },
  { slug: "meilleures-plateformes-trouver-emploi",      title: "Les meilleures plateformes pour trouver un emploi",               cat: "Stratégie",            readTime: 6, publishAt: "2026-07-09" },
  { slug: "combien-candidatures-envoyer-semaine",       title: "Combien de candidatures envoyer par semaine",                     cat: "Stratégie",            readTime: 5, publishAt: "2026-07-16" },
  { slug: "limites-ia-recherche-emploi",                title: "Les limites de l'IA dans la recherche d'emploi",                  cat: "Stratégie",            readTime: 6, publishAt: "2026-07-23" },
  { slug: "ia-recrutement-ce-qui-change-2026",          title: "IA et recrutement : ce qui change en 2026",                       cat: "Stratégie",            readTime: 7, publishAt: "2026-07-30" },
  // ── Alternance & Stage ────────────────────────────────────────────────────
  { slug: "cv-pour-alternance-france",                  title: "Comment faire un CV pour une alternance en France",               cat: "Alternance & Stage",   readTime: 7, publishAt: "2026-03-12" },
  { slug: "cv-pour-stage",                              title: "Comment faire un CV pour un stage",                               cat: "Alternance & Stage",   readTime: 7, publishAt: "2026-03-26" },
  { slug: "trouver-alternance-rapidement",              title: "Comment trouver une alternance rapidement",                       cat: "Alternance & Stage",   readTime: 7, publishAt: "2026-05-21" },
  { slug: "decrocher-stage-sans-experience",            title: "Comment décrocher un stage sans expérience",                      cat: "Alternance & Stage",   readTime: 6, publishAt: "2026-08-06" },
  { slug: "pourquoi-pas-dalternance",                   title: "Pourquoi je ne trouve pas d'alternance",                          cat: "Alternance & Stage",   readTime: 6, publishAt: "2026-08-13" },
  // ── Exemples CV ───────────────────────────────────────────────────────────
  { slug: "exemple-cv-etudiant-sans-experience",        title: "Exemple CV étudiant sans expérience",                             cat: "Exemples",             readTime: 5, publishAt: "2026-08-20" },
  { slug: "exemple-cv-alternance-2026",                 title: "Exemple CV alternance 2026",                                      cat: "Exemples",             readTime: 5, publishAt: "2026-08-27" },
  { slug: "exemple-cv-alternance-bts-mco",              title: "Exemple CV alternance BTS MCO",                                   cat: "Exemples",             readTime: 5, publishAt: "2026-09-03" },
  { slug: "exemple-cv-alternance-bts-ndrc",             title: "Exemple CV alternance BTS NDRC",                                  cat: "Exemples",             readTime: 5, publishAt: "2026-09-10" },
  { slug: "exemple-cv-stage-etudiant",                  title: "Exemple CV stage étudiant",                                       cat: "Exemples",             readTime: 5, publishAt: "2026-09-17" },
  { slug: "exemple-cv-sans-experience",                 title: "Exemple CV sans expérience",                                      cat: "Exemples",             readTime: 5, publishAt: "2026-09-24" },
  { slug: "exemple-cv-etudiant",                        title: "Exemple CV étudiant",                                             cat: "Exemples",             readTime: 4, publishAt: "2026-10-01" },
  { slug: "exemple-cv-etudiant-master",                 title: "Exemple CV étudiant master",                                      cat: "Exemples",             readTime: 5, publishAt: "2026-10-08" },
  { slug: "exemple-cv-premier-emploi",                  title: "Exemple CV premier emploi",                                       cat: "Exemples",             readTime: 5, publishAt: "2026-10-15" },
  { slug: "exemple-cv-alternance-marketing",            title: "Exemple CV alternance marketing",                                  cat: "Exemples",             readTime: 5, publishAt: "2026-10-22" },
  { slug: "exemple-cv-developpeur-informatique",        title: "Exemple CV développeur informatique",                             cat: "Exemples",             readTime: 5, publishAt: "2026-10-29" },
  { slug: "exemple-cv-marketing-digital",               title: "Exemple CV marketing digital",                                    cat: "Exemples",             readTime: 5, publishAt: "2026-11-05" },
  { slug: "exemple-cv-chef-projet-2026",                title: "Exemple CV chef de projet 2026",                                  cat: "Exemples",             readTime: 5, publishAt: "2026-11-12" },
  // ── Exemples Lettres ──────────────────────────────────────────────────────
  { slug: "exemple-lettre-motivation-alternance",       title: "Exemple lettre de motivation alternance",                         cat: "Exemples",             readTime: 5, publishAt: "2026-11-19" },
  { slug: "exemple-lettre-motivation-alternance-rh",    title: "Exemple lettre de motivation alternance RH",                      cat: "Exemples",             readTime: 5, publishAt: "2026-11-26" },
  { slug: "exemple-lettre-motivation-stage-bts",        title: "Exemple lettre de motivation stage BTS",                          cat: "Exemples",             readTime: 5, publishAt: "2026-12-03" },
  { slug: "exemple-lettre-motivation-stage-master",     title: "Exemple lettre de motivation stage master",                       cat: "Exemples",             readTime: 5, publishAt: "2026-12-05" },
  { slug: "exemple-lettre-motivation-stage-licence",    title: "Exemple lettre de motivation stage licence",                      cat: "Exemples",             readTime: 5, publishAt: "2026-12-07" },
  { slug: "exemple-lettre-motivation-premier-emploi",   title: "Exemple lettre de motivation premier emploi sans expérience",     cat: "Exemples",             readTime: 5, publishAt: "2026-12-08" },
  { slug: "exemple-lettre-motivation-alternance-info",  title: "Exemple lettre de motivation alternance informatique",            cat: "Exemples",             readTime: 5, publishAt: "2026-12-10" },
  { slug: "exemple-lettre-motivation-alternance-mkt",   title: "Exemple lettre de motivation alternance marketing",               cat: "Exemples",             readTime: 5, publishAt: "2026-12-12" },
];

// ─── System prompts ───────────────────────────────────────────────────────────
const FR_SYSTEM = `Tu es un expert en rédaction de contenu SEO pour des candidats à l'emploi en France.
Tu rédiges des articles de blog pratiques, bien structurés et optimisés SEO pour jobapplication.fr.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec le contenu HTML — sans balises <html>, <head>, <body>, <article>
2. Balises autorisées : <p> <h2> <h3> <ul> <li> <ol> <strong> <em>
3. Pour les articles "Exemple" (CV ou lettre), inclus un vrai exemple formaté dans une balise :
   <div style="border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px;margin:24px 0;background:#f8fafc;font-size:14px;line-height:1.7">
4. Longueur : 800-1200 mots pour les guides, 600-900 mots + exemple pour les articles "Exemple"
5. Ton : professionnel, direct, pratique — jamais académique
6. Ne commence JAMAIS par le titre de l'article — commence directement par <p>
7. Mots-clés SEO naturellement intégrés dans le premier paragraphe et les H2
8. Pour "alternance" : toujours préciser le contexte du système éducatif français
9. Inclus une mention naturelle de JobApplication.fr comme outil utile (max 1 fois)

ARTICLE DE RÉFÉRENCE QUALITÉ (lettre de motivation moderne) :
${TEMPLATE_FR.content.substring(0, 800)}
[...]`;

const EN_SYSTEM = `You are a professional content writer for English-speaking job seekers (UK and US markets).
You are adapting French job-application articles for an anglophone audience.

CRITICAL RULES:
1. Do NOT translate literally — ADAPT for English/Anglo-Saxon conventions
2. Output ONLY the HTML content — no <html>, <head>, <body>
3. Cover letters in English: shorter, more direct, less formal than French style
4. "CV" in UK English; "resume" in US English → use "CV/resume"
5. "alternance" → ALWAYS write "work-study program (alternance en France)"
6. "stage" → "internship" or "placement"
7. French formal phrases → replace with direct English equivalents
8. Keep HTML structure identical (same h2, h3, ul, li, etc.)
9. Adapt examples and cultural references for UK/US context while noting French specificity where relevant
10. The article must read as if written by a native English speaker, NOT as a translation
11. Maintain the same SEO quality in English`;

// ─── API call ────────────────────────────────────────────────────────────────
async function deepseek(system, user, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          temperature: 0.7,
          max_tokens: 2500,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API ${res.status}: ${err}`);
      }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("Empty response from API");
      return content.trim();
    } catch (e) {
      if (attempt === retries) throw e;
      console.log(`  ↻ retry ${attempt + 1}/${retries} after error: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

// ─── Generate one article (FR then EN) ───────────────────────────────────────
async function generateArticle(meta) {
  const isExample = meta.cat === "Exemples";

  // FR content
  const frPrompt = isExample
    ? `Rédige un article SEO complet en HTML pour le sujet : "${meta.title}"
Catégorie : ${meta.cat}
IMPORTANT : inclus un vrai exemple complet (CV ou lettre selon le sujet) dans un div stylisé.
L'exemple doit être réaliste, avec un vrai nom fictif, des vraies formations, des vraies expériences adaptées au profil.
Commence par une courte intro (<p>), puis explique comment lire/utiliser l'exemple, puis montre l'exemple.`
    : `Rédige un article SEO complet en HTML pour le sujet : "${meta.title}"
Catégorie : ${meta.cat}
L'article doit être pratique, avec des conseils actionnables, des exemples concrets et une structure claire.`;

  console.log(`  → FR: ${meta.title}`);
  const frContent = await deepseek(FR_SYSTEM, frPrompt);

  // Extract description from first paragraph
  const frDescMatch = frContent.match(/<p>(.*?)<\/p>/s);
  const frDesc = frDescMatch
    ? frDescMatch[1].replace(/<[^>]+>/g, "").substring(0, 200).trim()
    : meta.title;

  // EN adaptation
  const enPrompt = `Adapt this French article about "${meta.title}" for English-speaking job seekers.
Follow all the CRITICAL RULES from your instructions.

FRENCH CONTENT TO ADAPT:
${frContent}`;

  console.log(`  → EN: ${meta.title}`);
  const enContent = await deepseek(EN_SYSTEM, enPrompt);

  // EN title and description
  const enTitlePrompt = `Give me:
1. An English title for this article (SEO-optimized, natural English — not literal translation of "${meta.title}")
2. A 160-character meta description in English

Reply in this exact format:
TITLE: [title here]
DESC: [description here]`;

  const enMeta = await deepseek(
    "You are an SEO expert. Reply only with TITLE: and DESC: as instructed.",
    enTitlePrompt
  );
  const enTitleMatch = enMeta.match(/TITLE:\s*(.+)/);
  const enDescMatch = enMeta.match(/DESC:\s*(.+)/);
  const enTitle = enTitleMatch ? enTitleMatch[1].trim() : meta.title + " (EN)";
  const enDesc = enDescMatch ? enDescMatch[1].trim() : frDesc;

  return {
    slug: meta.slug,
    date: meta.publishAt,
    publishAt: meta.publishAt,
    readTime: meta.readTime,
    category: meta.cat,
    fr: { title: meta.title, description: frDesc, content: frContent },
    en: { title: enTitle, description: enDesc, content: enContent },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Load progress
  const progress = existsSync(PROGRESS_FILE)
    ? JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"))
    : {};

  const results = { ...progress };
  const todo = ARTICLES_META.filter((m) => !results[m.slug]);

  console.log(`\n📝 Articles to generate: ${todo.length} / ${ARTICLES_META.length}`);
  console.log(`✅ Already done: ${Object.keys(results).length}\n`);

  // Add template article immediately (no API call needed)
  if (!results[ARTICLES_META[0].slug]) {
    const templateMeta = ARTICLES_META[0];
    results[templateMeta.slug] = {
      slug: templateMeta.slug,
      date: templateMeta.publishAt,
      publishAt: templateMeta.publishAt,
      readTime: templateMeta.readTime,
      category: templateMeta.cat,
      fr: TEMPLATE_FR,
      en: TEMPLATE_EN,
    };
    writeFileSync(PROGRESS_FILE, JSON.stringify(results, null, 2));
    console.log(`✅ Template article saved: ${templateMeta.slug}`);
  }

  // Generate remaining articles — batches of 4 in parallel
  const remaining = ARTICLES_META.filter((m) => !results[m.slug]);
  const BATCH = 4;

  for (let i = 0; i < remaining.length; i += BATCH) {
    const batch = remaining.slice(i, i + BATCH);
    const batchNum = Math.floor(i / BATCH) + 1;
    const totalBatches = Math.ceil(remaining.length / BATCH);
    console.log(`\n⚙️  Batch ${batchNum}/${totalBatches}: ${batch.map((b) => b.slug).join(", ")}`);

    const settled = await Promise.allSettled(batch.map((meta) => generateArticle(meta)));

    for (let j = 0; j < settled.length; j++) {
      const res = settled[j];
      const meta = batch[j];
      if (res.status === "fulfilled") {
        results[meta.slug] = res.value;
        console.log(`  ✅ Done: ${meta.slug}`);
      } else {
        console.error(`  ❌ Failed: ${meta.slug} — ${res.reason?.message}`);
      }
    }

    // Save progress after each batch
    writeFileSync(PROGRESS_FILE, JSON.stringify(results, null, 2));
    console.log(`  💾 Progress saved (${Object.keys(results).length}/${ARTICLES_META.length})`);

    // Small pause between batches
    if (i + BATCH < remaining.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Generate TypeScript output
  const orderedResults = ARTICLES_META.map((m) => results[m.slug]).filter(Boolean);
  console.log(`\n📄 Generating TypeScript file with ${orderedResults.length} articles...`);

  const escape = (s) => (s || "").replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

  const tsContent = `// AUTO-GENERATED — do not edit manually
// Run: node scripts/generate-articles.mjs
// Generated: ${new Date().toISOString()}

import type { Article } from "./articles";

export const NEW_ARTICLES: Article[] = [
${orderedResults
  .map(
    (a) => `  {
    slug: ${JSON.stringify(a.slug)},
    date: ${JSON.stringify(a.date)},
    publishAt: ${JSON.stringify(a.publishAt)},
    readTime: ${a.readTime},
    category: ${JSON.stringify(a.category)},
    fr: {
      title: ${JSON.stringify(a.fr.title)},
      description: ${JSON.stringify(a.fr.description)},
      content: \`${escape(a.fr.content)}\`,
    },
    en: {
      title: ${JSON.stringify(a.en.title)},
      description: ${JSON.stringify(a.en.description)},
      content: \`${escape(a.en.content)}\`,
    },
  }`
  )
  .join(",\n")}
];
`;

  writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`\n✅ Written to ${OUTPUT_FILE}`);
  console.log(`📊 Total: ${orderedResults.length} articles generated`);
  const future = orderedResults.filter((a) => new Date(a.publishAt) > new Date()).length;
  console.log(`📅 Scheduled for future: ${future} articles`);
  console.log(`📅 Published already: ${orderedResults.length - future} articles`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
