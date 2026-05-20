// Génération PDF (jsPDF) et DOCX (docx) avec auto-scale densité.
// Tout le rendu utilise un facteur d'échelle global calculé depuis le contenu
// pour remplir A4 sans débordement, peu importe la quantité de texte produit
// par DeepSeek. PDF et DOCX partagent ce même facteur pour cohérence
// visuelle avec le preview à l'écran.

import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
} from "docx";
import type { CVDocument, CoverLetter, CVTemplate, OutputLanguage, UserProfile } from "./types";
import { computeCVDensityScale } from "./density";
import { tCV, tLetter } from "./i18n";

type Identity = UserProfile["identity"];

const EMPTY_IDENTITY: Identity = {
  fullName: "",
  title: "",
  location: "",
  email: "",
  phone: "",
  linkedin: "",
  websites: [],
};

const A4_W = 595;
const A4_H = 842;

function contactLine(p: Identity): string {
  const parts = [p.email, p.phone, p.location, p.linkedin].filter(Boolean);
  return parts.join("  ·  ");
}

export function cvToPdf(
  cv: CVDocument,
  template: CVTemplate = "classic",
  lang: OutputLanguage = "fr",
  identity: Identity = EMPTY_IDENTITY
): Uint8Array {
  const scale = computeCVDensityScale(cv);
  const t = tCV(lang);
  switch (template) {
    case "modern":
      return cvPdfModern(cv, scale, t, identity);
    case "minimal":
      return cvPdfMinimal(cv, scale, t, identity);
    case "classic":
    default:
      return cvPdfClassic(cv, scale, t, identity);
  }
}

type CVT = ReturnType<typeof tCV>;

// =================== CLASSIC PDF ===================
function cvPdfClassic(cv: CVDocument, s: number, t: CVT, identity: Identity): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 40 * Math.min(s, 1.1); // marge légèrement scalée
  const W = A4_W;
  const MW = W - M * 2;

  // base font sizes (multipliés par s)
  const F = {
    name: 22 * s,
    headline: 12 * s,
    contact: 8.5 * s,
    summary: 10 * s,
    section: 9.5 * s,
    role: 11 * s,
    period: 8.8 * s,
    location: 8.8 * s,
    bullet: 9.7 * s,
    edu: 9.7 * s,
    skill: 9.5 * s,
  };
  const LH = 1.45;
  let y = M;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(F.name);
  doc.setTextColor(20, 20, 20);
  doc.text(cv.title, M, y + F.name * 0.85);
  y += F.name * 1.05;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(F.headline);
  doc.setTextColor(60, 60, 60);
  doc.text(cv.headline, M, y);
  y += F.headline * 1.2;

  doc.setFontSize(F.contact);
  doc.setTextColor(105, 105, 105);
  doc.text(contactLine(identity), M, y);
  y += F.contact * 0.5;
  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(1.3);
  doc.line(M, y, W - M, y);
  y += F.contact * 1.5;

  doc.setTextColor(35, 35, 35);
  doc.setFontSize(F.summary);
  const sum = doc.splitTextToSize(cv.summary, MW);
  doc.text(sum, M, y, { align: "justify", maxWidth: MW });
  y += sum.length * F.summary * LH + F.section * 0.6;

  const sectionTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(F.section);
    doc.setTextColor(20, 20, 20);
    doc.text(title.toUpperCase(), M, y);
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.line(M, y + 3, W - M, y + 3);
    y += F.section * 1.4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 20, 20);
  };

  sectionTitle(t.sectionExperience);
  cv.experiences.slice(0, 4).forEach((e) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(F.role);
    doc.text(`${e.role} · ${e.company}`, M, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(F.period);
    doc.setTextColor(110, 110, 110);
    const pw = doc.getTextWidth(e.period);
    doc.text(e.period, W - M - pw, y);
    y += F.role * 1.05;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(F.location);
    doc.text(e.location, M, y);
    doc.setFont("helvetica", "normal");
    y += F.location * 1.2;
    doc.setFontSize(F.bullet);
    doc.setTextColor(25, 25, 25);
    e.bullets.slice(0, 4).forEach((b) => {
      const lines = doc.splitTextToSize(`•  ${b}`, MW - 6);
      doc.text(lines, M + 6, y);
      y += lines.length * F.bullet * LH;
    });
    y += F.bullet * 0.5;
  });

  sectionTitle(t.sectionEducation);
  doc.setFontSize(F.edu);
  cv.education.forEach((ed) => {
    doc.setFont("helvetica", "bold");
    doc.text(ed.degree, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    const w = doc.getTextWidth(ed.period);
    doc.text(ed.period, W - M - w, y);
    doc.setTextColor(82, 82, 91);
    doc.text(` · ${ed.school}`, M + doc.getTextWidth(ed.degree), y);
    doc.setTextColor(25, 25, 25);
    y += F.edu * 1.4;
  });

  sectionTitle(t.sectionSkillsCombined);
  doc.setFontSize(F.skill);
  cv.skills.slice(0, 5).forEach((g) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${g.group} :`, M, y);
    const labW = doc.getTextWidth(`${g.group} :`);
    doc.setFont("helvetica", "normal");
    const items = doc.splitTextToSize(" " + g.items.join(" · "), MW - labW);
    doc.text(items[0], M + labW + 2, y);
    y += F.skill * LH;
    for (let i = 1; i < items.length; i++) {
      doc.text(items[i], M, y);
      y += F.skill * LH;
    }
  });
  y += F.skill * 0.3;
  doc.setFont("helvetica", "bold");
  const certLabel = `${t.labelCertifications} :`;
  doc.text(certLabel, M, y);
  const cw = doc.getTextWidth(certLabel);
  doc.setFont("helvetica", "normal");
  const certs = doc.splitTextToSize(" " + cv.certifications.join(" · "), MW - cw);
  doc.text(certs[0], M + cw + 2, y);
  y += F.skill * LH;
  doc.setFont("helvetica", "bold");
  const langLabel = `${t.labelLanguages} :`;
  doc.text(langLabel, M, y);
  const lw = doc.getTextWidth(langLabel);
  doc.setFont("helvetica", "normal");
  doc.text(" " + cv.languages.map((l) => `${l.name} (${l.level})`).join(" · "), M + lw + 2, y);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}

// =================== MODERN PDF ===================
function cvPdfModern(cv: CVDocument, s: number, t: CVT, identity: Identity): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 42 * Math.min(s, 1.1);
  const W = A4_W;
  const MW = W - M * 2;

  const F = {
    name: 26 * s,
    headline: 11.5 * s,
    contact: 9 * s,
    summary: 10 * s,
    section: 11 * s,
    role: 11 * s,
    period: 8.8 * s,
    company: 9.5 * s,
    bullet: 9.7 * s,
    edu: 9.8 * s,
    skill: 9.5 * s,
  };
  const LH = 1.45;
  let y = M;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(F.name);
  doc.setTextColor(15, 15, 15);
  doc.text(cv.title, M, y + F.name * 0.85);
  y += F.name * 1.0;

  doc.setFillColor(16, 185, 129);
  doc.rect(M, y - 3, 32, 4, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(F.headline);
  doc.setTextColor(40, 40, 40);
  doc.text(cv.headline, M + 40, y + 1);
  y += F.headline * 1.2;

  doc.setFontSize(F.contact);
  doc.setTextColor(105, 105, 105);
  doc.text(contactLine(identity), M, y);
  y += F.contact * 1.6;

  doc.setTextColor(35, 35, 35);
  doc.setFontSize(F.summary);
  const sum = doc.splitTextToSize(cv.summary, MW);
  doc.text(sum, M, y, { align: "justify", maxWidth: MW });
  y += sum.length * F.summary * LH + F.section * 0.5;

  const sectionTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(F.section);
    doc.setTextColor(5, 122, 85);
    doc.text(title.toUpperCase(), M, y);
    y += F.section * 1.4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 25, 25);
  };

  sectionTitle(t.expShort);
  cv.experiences.slice(0, 4).forEach((e) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(M + 2.5, y - F.role * 0.35, 2.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(F.role);
    doc.setTextColor(15, 15, 15);
    doc.text(e.role, M + 10, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(F.period);
    doc.setTextColor(105, 105, 105);
    const pw = doc.getTextWidth(e.period);
    doc.text(e.period, W - M - pw, y);
    y += F.role * 1.05;
    doc.setFontSize(F.company);
    doc.setTextColor(5, 122, 85);
    doc.text(`${e.company}  ·  ${e.location}`, M + 10, y);
    y += F.company * 1.2;
    doc.setFontSize(F.bullet);
    doc.setTextColor(25, 25, 25);
    e.bullets.slice(0, 4).forEach((b) => {
      const lines = doc.splitTextToSize(b, MW - 18);
      doc.setTextColor(16, 185, 129);
      doc.text("›", M + 12, y);
      doc.setTextColor(25, 25, 25);
      doc.text(lines, M + 20, y);
      y += lines.length * F.bullet * LH;
    });
    y += F.bullet * 0.45;
  });

  sectionTitle(t.eduShort);
  doc.setFontSize(F.edu);
  cv.education.forEach((ed) => {
    doc.setFont("helvetica", "bold");
    doc.text(ed.degree, M, y);
    const w1 = doc.getTextWidth(ed.degree);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(105, 105, 105);
    doc.text(`  ·  ${ed.school}  ·  ${ed.period}`, M + w1, y);
    doc.setTextColor(25, 25, 25);
    y += F.edu * 1.35;
  });

  sectionTitle(t.skillsShort);
  doc.setFontSize(F.skill);
  cv.skills.slice(0, 5).forEach((g) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 122, 85);
    doc.text(`${g.group}.`, M, y);
    const labW = doc.getTextWidth(`${g.group}.`);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 25, 25);
    const items = doc.splitTextToSize(" " + g.items.join(", "), MW - labW);
    doc.text(items[0], M + labW + 2, y);
    y += F.skill * LH;
    for (let i = 1; i < items.length; i++) {
      doc.text(items[i], M, y);
      y += F.skill * LH;
    }
  });
  y += F.skill * 0.3;
  const ccLine = `${cv.certifications.join(" · ")}.   ${cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(" · ")}.`;
  doc.setTextColor(70, 70, 70);
  doc.setFontSize(F.skill);
  const cc = doc.splitTextToSize(ccLine, MW);
  doc.text(cc, M, y);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}

// =================== MINIMAL PDF ===================
function cvPdfMinimal(cv: CVDocument, s: number, t: CVT, identity: Identity): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 58 * Math.min(s, 1.05);
  const W = A4_W;
  const COL_W = 64 * s;
  const TX = M + COL_W;
  const TW = W - TX - M;

  const F = {
    name: 24 * s,
    headline: 9.5 * s,
    contact: 8.5 * s,
    summary: 10 * s,
    section: 9 * s,
    role: 11 * s,
    period: 8.5 * s,
    company: 9.5 * s,
    bullet: 9.7 * s,
    skill: 9.7 * s,
  };
  const LH = 1.55;
  let y = M;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(F.name);
  doc.setTextColor(15, 15, 15);
  doc.text(cv.title, M, y + F.name * 0.85);
  y += F.name * 1.0;

  doc.setFontSize(F.headline);
  doc.setTextColor(120, 120, 120);
  // Espacement uppercase manuel
  doc.setCharSpace(0.8 * s);
  doc.text(cv.headline.toUpperCase(), M, y);
  doc.setCharSpace(0);
  y += F.headline * 1.4;

  doc.setFontSize(F.contact);
  doc.text(contactLine(identity), M, y);
  y += F.contact * 2;

  doc.setFontSize(F.summary);
  doc.setTextColor(35, 35, 35);
  const sum = doc.splitTextToSize(cv.summary, W - M * 2);
  doc.text(sum, M, y, { align: "justify", maxWidth: W - M * 2 });
  y += sum.length * F.summary * LH + F.section * 1.2;

  const sectionTitle = (title: string) => {
    doc.setFontSize(F.section);
    doc.setTextColor(160, 160, 160);
    doc.setCharSpace(1.2 * s);
    doc.text(title.toUpperCase(), M, y);
    doc.setCharSpace(0);
    y += F.section * 1.4;
    doc.setTextColor(25, 25, 25);
  };

  sectionTitle(t.expShort);
  cv.experiences.slice(0, 4).forEach((e) => {
    doc.setFontSize(F.period);
    doc.setTextColor(120, 120, 120);
    doc.text(e.period, M, y);
    doc.setFontSize(F.role);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 15, 15);
    doc.text(e.role, TX, y);
    y += F.role * 1.1;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(F.company);
    doc.setTextColor(100, 100, 100);
    doc.text(`${e.company}, ${e.location}`, TX, y);
    y += F.company * 1.2;
    doc.setTextColor(25, 25, 25);
    doc.setFontSize(F.bullet);
    e.bullets.slice(0, 4).forEach((b) => {
      const lines = doc.splitTextToSize(b, TW);
      doc.text(lines, TX, y);
      y += lines.length * F.bullet * LH;
    });
    y += F.bullet * 0.7;
  });

  sectionTitle(t.eduShort);
  cv.education.forEach((ed) => {
    doc.setFontSize(F.period);
    doc.setTextColor(120, 120, 120);
    doc.text(ed.period, M, y);
    doc.setFontSize(F.role * 0.95);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 15, 15);
    doc.text(ed.degree, TX, y);
    const w1 = doc.getTextWidth(ed.degree);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(105, 105, 105);
    doc.text(`, ${ed.school}`, TX + w1, y);
    y += F.role * 1.35;
  });

  sectionTitle(t.skillsShort);
  doc.setFontSize(F.skill);
  doc.setTextColor(25, 25, 25);
  cv.skills.slice(0, 5).forEach((g) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${g.group}.`, M, y);
    const labW = doc.getTextWidth(`${g.group}.`);
    doc.setFont("helvetica", "normal");
    const items = doc.splitTextToSize(" " + g.items.join(", "), W - M * 2 - labW);
    doc.text(items[0], M + labW + 2, y);
    y += F.skill * LH;
    for (let i = 1; i < items.length; i++) {
      doc.text(items[i], M, y);
      y += F.skill * LH;
    }
  });
  y += F.skill * 0.4;
  const ccLine = `${cv.certifications.join(", ")}. ${cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(", ")}.`;
  doc.setTextColor(70, 70, 70);
  const cc = doc.splitTextToSize(ccLine, W - M * 2);
  doc.text(cc, M, y);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}

// =====================================================================
// DOCX — template-aware, miroir visuel du preview
// =====================================================================
// Tailles en demi-points (docx natif). Multipliées par le scale densité.
// =====================================================================

export async function cvToDocx(
  cv: CVDocument,
  template: CVTemplate = "classic",
  lang: OutputLanguage = "fr",
  identity: Identity = EMPTY_IDENTITY
): Promise<Uint8Array> {
  const s = computeCVDensityScale(cv);
  const t = tCV(lang);
  switch (template) {
    case "modern":
      return docxModern(cv, s, t, identity);
    case "minimal":
      return docxMinimal(cv, s, t, identity);
    case "classic":
    default:
      return docxClassic(cv, s, t, identity);
  }
}

function sz(base: number, s: number): number {
  // docx prend des half-points (size:22 = 11pt). On clamp pour rester lisible.
  return Math.max(14, Math.round(base * s));
}

function spc(base: number, s: number): number {
  return Math.max(40, Math.round(base * s));
}

async function docxClassic(cv: CVDocument, s: number, t: CVT, identity: Identity): Promise<Uint8Array> {
  const p = identity;
  const children: Paragraph[] = [];

  children.push(new Paragraph({
    children: [new TextRun({ text: cv.title, bold: true, size: sz(44, s), color: "111111" })],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(40, s) },
    children: [new TextRun({ text: cv.headline, size: sz(24, s), color: "3f3f46" })],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(120, s) },
    border: { bottom: { color: "111111", size: 12, style: BorderStyle.SINGLE, space: 4 } },
    children: [new TextRun({ text: `${p.email}  ·  ${p.phone}  ·  ${p.location}  ·  ${p.linkedin}`, size: sz(17, s), color: "71717a" })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: spc(220, s) },
    children: [new TextRun({ text: cv.summary, size: sz(20, s), color: "3f3f46" })],
  }));

  pushSection(children, t.sectionExperience, "111111", s);
  for (const e of cv.experiences.slice(0, 4)) {
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `${e.role} · ${e.company}`, bold: true, size: sz(22, s) }),
        new TextRun({ text: `\t${e.period}`, size: sz(17, s), color: "71717a" }),
      ],
      tabStops: [{ type: "right" as const, position: 9000 }],
    }));
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      children: [new TextRun({ text: e.location, italics: true, size: sz(17, s), color: "71717a" })],
    }));
    for (const b of e.bullets.slice(0, 4)) {
      children.push(new Paragraph({
        bullet: { level: 0 },
        spacing: { after: spc(20, s) },
        children: [new TextRun({ text: b, size: sz(19, s) })],
      }));
    }
    children.push(new Paragraph({ spacing: { after: spc(80, s) }, children: [] }));
  }

  pushSection(children, t.sectionEducation, "111111", s);
  for (const ed of cv.education) {
    children.push(new Paragraph({
      tabStops: [{ type: "right" as const, position: 9000 }],
      children: [
        new TextRun({ text: ed.degree, bold: true, size: sz(20, s) }),
        new TextRun({ text: ` · ${ed.school}`, size: sz(20, s), color: "52525b" }),
        new TextRun({ text: `\t${ed.period}`, size: sz(17, s), color: "71717a" }),
      ],
    }));
  }

  pushSection(children, t.sectionSkillsCombined, "111111", s);
  for (const g of cv.skills.slice(0, 5)) {
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      children: [
        new TextRun({ text: `${g.group} : `, bold: true, size: sz(19, s) }),
        new TextRun({ text: g.items.join(" · "), size: sz(19, s) }),
      ],
    }));
  }
  children.push(new Paragraph({
    spacing: { before: spc(80, s) },
    children: [
      new TextRun({ text: `${t.labelCertifications} : `, bold: true, size: sz(19, s) }),
      new TextRun({ text: cv.certifications.join(" · "), size: sz(19, s) }),
    ],
  }));
  children.push(new Paragraph({
    children: [
      new TextRun({ text: `${t.labelLanguages} : `, bold: true, size: sz(19, s) }),
      new TextRun({ text: cv.languages.map((l) => `${l.name} (${l.level})`).join(" · "), size: sz(19, s) }),
    ],
  }));

  return packDocx(children, "Calibri");
}

async function docxModern(cv: CVDocument, s: number, t: CVT, identity: Identity): Promise<Uint8Array> {
  const p = identity;
  const children: Paragraph[] = [];
  const ACCENT = "047857";

  children.push(new Paragraph({
    children: [new TextRun({ text: cv.title, bold: true, size: sz(52, s), color: "0f0f0f" })],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(40, s) },
    children: [
      new TextRun({ text: "▌ ", color: "10b981", bold: true, size: sz(24, s) }),
      new TextRun({ text: cv.headline, size: sz(24, s), color: "3f3f46" }),
    ],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(180, s) },
    children: [new TextRun({ text: `${p.email}  ·  ${p.phone}  ·  ${p.location}  ·  ${p.linkedin}`, size: sz(18, s), color: "71717a" })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: spc(220, s) },
    children: [new TextRun({ text: cv.summary, size: sz(20, s), color: "3f3f46" })],
  }));

  pushSection(children, t.expShort, ACCENT, s);
  for (const e of cv.experiences.slice(0, 4)) {
    children.push(new Paragraph({
      tabStops: [{ type: "right" as const, position: 9000 }],
      children: [
        new TextRun({ text: "● ", color: "10b981", size: sz(22, s) }),
        new TextRun({ text: e.role, bold: true, size: sz(22, s) }),
        new TextRun({ text: `\t${e.period}`, size: sz(17, s), color: "71717a" }),
      ],
    }));
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      children: [new TextRun({ text: `${e.company}  ·  ${e.location}`, size: sz(19, s), color: ACCENT, bold: true })],
    }));
    for (const b of e.bullets.slice(0, 4)) {
      children.push(new Paragraph({
        spacing: { after: spc(20, s) },
        children: [
          new TextRun({ text: "›  ", color: "10b981", bold: true, size: sz(19, s) }),
          new TextRun({ text: b, size: sz(19, s) }),
        ],
      }));
    }
    children.push(new Paragraph({ spacing: { after: spc(80, s) }, children: [] }));
  }

  pushSection(children, t.eduShort, ACCENT, s);
  for (const ed of cv.education) {
    children.push(new Paragraph({
      children: [
        new TextRun({ text: ed.degree, bold: true, size: sz(20, s) }),
        new TextRun({ text: `  ·  ${ed.school}  ·  ${ed.period}`, size: sz(20, s), color: "71717a" }),
      ],
    }));
  }

  pushSection(children, t.skillsShort, ACCENT, s);
  for (const g of cv.skills.slice(0, 5)) {
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      children: [
        new TextRun({ text: `${g.group}. `, bold: true, color: ACCENT, size: sz(19, s) }),
        new TextRun({ text: g.items.join(", "), size: sz(19, s) }),
      ],
    }));
  }
  children.push(new Paragraph({
    spacing: { before: spc(80, s) },
    children: [
      new TextRun({ text: `${t.labelCertifications}. `, bold: true, color: ACCENT, size: sz(18, s) }),
      new TextRun({ text: cv.certifications.join(", "), size: sz(18, s), color: "3f3f46" }),
      new TextRun({ text: `   ${t.labelLanguages}. `, bold: true, color: ACCENT, size: sz(18, s) }),
      new TextRun({ text: cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(", "), size: sz(18, s), color: "3f3f46" }),
    ],
  }));

  return packDocx(children, "Calibri");
}

async function docxMinimal(cv: CVDocument, s: number, t: CVT, identity: Identity): Promise<Uint8Array> {
  const p = identity;
  const children: Paragraph[] = [];

  children.push(new Paragraph({
    children: [new TextRun({ text: cv.title, size: sz(48, s), color: "111111" })],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(40, s) },
    children: [new TextRun({ text: cv.headline.toUpperCase(), size: sz(18, s), color: "71717a", characterSpacing: Math.round(40 * s) })],
  }));
  children.push(new Paragraph({
    spacing: { after: spc(220, s) },
    children: [new TextRun({ text: `${p.email} · ${p.phone} · ${p.location} · ${p.linkedin}`, size: sz(17, s), color: "71717a" })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: spc(260, s) },
    children: [new TextRun({ text: cv.summary, size: sz(20, s), color: "3f3f46" })],
  }));

  pushSection(children, t.expShort, "a1a1aa", s);
  for (const e of cv.experiences.slice(0, 4)) {
    children.push(new Paragraph({
      tabStops: [{ type: "left" as const, position: 1400 }],
      children: [
        new TextRun({ text: e.period, size: sz(17, s), color: "71717a" }),
        new TextRun({ text: `\t${e.role}`, bold: true, size: sz(22, s) }),
      ],
    }));
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      indent: { left: 1400 },
      children: [new TextRun({ text: `${e.company}, ${e.location}`, size: sz(19, s), color: "52525b" })],
    }));
    for (const b of e.bullets.slice(0, 4)) {
      children.push(new Paragraph({
        spacing: { after: spc(20, s) },
        indent: { left: 1400 },
        children: [new TextRun({ text: b, size: sz(19, s) })],
      }));
    }
    children.push(new Paragraph({ spacing: { after: spc(100, s) }, children: [] }));
  }

  pushSection(children, t.eduShort, "a1a1aa", s);
  for (const ed of cv.education) {
    children.push(new Paragraph({
      tabStops: [{ type: "left" as const, position: 1400 }],
      children: [
        new TextRun({ text: ed.period, size: sz(17, s), color: "71717a" }),
        new TextRun({ text: `\t${ed.degree}`, bold: true, size: sz(20, s) }),
        new TextRun({ text: `, ${ed.school}`, size: sz(20, s), color: "71717a" }),
      ],
    }));
  }

  pushSection(children, t.skillsShort, "a1a1aa", s);
  for (const g of cv.skills.slice(0, 5)) {
    children.push(new Paragraph({
      spacing: { after: spc(40, s) },
      children: [
        new TextRun({ text: `${g.group}. `, bold: true, size: sz(19, s) }),
        new TextRun({ text: g.items.join(", "), size: sz(19, s) }),
      ],
    }));
  }
  children.push(new Paragraph({
    spacing: { before: spc(80, s) },
    children: [new TextRun({ text: `${cv.certifications.join(", ")}. ${cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(", ")}.`, size: sz(19, s), color: "3f3f46" })],
  }));

  return packDocx(children, "Calibri Light");
}

function pushSection(children: Paragraph[], title: string, color: string, s: number) {
  children.push(new Paragraph({
    spacing: { before: spc(240, s), after: spc(80, s) },
    children: [new TextRun({ text: title.toUpperCase(), bold: true, size: sz(20, s), color, characterSpacing: Math.round(20 * s) })],
    border: { bottom: { color: "d4d4d8", size: 6, style: BorderStyle.SINGLE, space: 2 } },
  }));
}

async function packDocx(children: Paragraph[], font: string): Promise<Uint8Array> {
  const doc = new Document({
    creator: "Job Tool",
    styles: { default: { document: { run: { font } } } },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } } },
      children,
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer);
}

// =====================================================================
// LETTRES — PDF et DOCX inchangés en structure, juste polies
// =====================================================================

export function letterToPdf(
  letter: CoverLetter,
  applicant?: string,
  lang: OutputLanguage = "fr",
  identity: Identity = EMPTY_IDENTITY
): Uint8Array {
  // Use the signature from the letter itself if no applicant override provided
  const applicantName = applicant || letter.signature || identity.fullName || "Candidate";
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 70;
  const W = A4_W;
  const MW = W - M * 2;
  const subjectLabel = tLetter(lang).subject;
  let y = M;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(applicantName, M, y);
  y += 14;

  const contactBits = [identity.email, identity.phone].filter(Boolean).join("  ·  ");
  if (contactBits) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(contactBits, M, y);
    doc.setTextColor(0, 0, 0);
    y += 26;
  } else {
    y += 12;
  }

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 110);
  doc.text(`${subjectLabel} : ${letter.subject}`, M, y);
  doc.setTextColor(0, 0, 0);
  y += 26;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(letter.greeting, M, y);
  y += 22;

  const writePart = (txt: string) => {
    const lines = doc.splitTextToSize(txt, MW);
    if (y + lines.length * 14 > A4_H - M - 50) {
      doc.addPage();
      y = M;
    }
    doc.text(lines, M, y, { align: "justify", maxWidth: MW });
    y += lines.length * 14 + 14;
  };

  writePart(letter.parts.intro);
  writePart(letter.parts.proof);
  writePart(letter.parts.fit);
  writePart(letter.parts.close);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text(letter.signature, M, y);
  return doc.output("arraybuffer") as unknown as Uint8Array;
}

export async function letterToDocx(
  letter: CoverLetter,
  lang: OutputLanguage = "fr",
  identity: Identity = EMPTY_IDENTITY
): Promise<Uint8Array> {
  const subjectLabel = tLetter(lang).subject;
  const contactBits = [identity.email, identity.phone].filter(Boolean).join(" · ");
  const para = (text: string, opts: { bold?: boolean; size?: number } = {}) =>
    new Paragraph({
      spacing: { after: 220 },
      alignment: AlignmentType.JUSTIFIED,
      children: [new TextRun({ text, bold: opts.bold, size: opts.size ?? 22 })],
    });

  const doc = new Document({
    creator: "Job Tool",
    styles: { default: { document: { run: { font: "Calibri" } } } },
    sections: [{
      properties: { page: { margin: { top: 1100, bottom: 1100, left: 1200, right: 1200 } } },
      children: [
        new Paragraph({ children: [new TextRun({ text: letter.signature, bold: true, size: 28 })] }),
        new Paragraph({
          children: [new TextRun({ text: contactBits, size: 18, color: "71717a" })],
        }),
        new Paragraph({
          spacing: { after: 280 },
          children: [new TextRun({ text: `${subjectLabel} : ${letter.subject}`, italics: true, size: 20, color: "555555" })],
        }),
        para(letter.greeting),
        para(letter.parts.intro),
        para(letter.parts.proof),
        para(letter.parts.fit),
        para(letter.parts.close),
        para(letter.signature, { bold: true }),
      ],
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer);
}
