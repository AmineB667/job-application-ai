"use client";

import type { CVDocument, CVTemplate, OutputLanguage } from "@/lib/types";
import { AMINE_PROFILE } from "@/lib/profile";
import { useFitToPage } from "@/hooks/use-fit-to-page";
import { tCV } from "@/lib/i18n";

const CONTACT = AMINE_PROFILE.identity;

export function CVPreview({
  cv,
  template = "classic",
  lang = "fr",
}: {
  cv: CVDocument;
  template?: CVTemplate;
  lang?: OutputLanguage;
}) {
  const { containerRef, innerRef } = useFitToPage<HTMLDivElement>([cv, template, lang]);
  const t = tCV(lang);

  return (
    <div className="rounded-lg border bg-white text-zinc-900 shadow-xl mx-auto" style={{ maxWidth: 820 }}>
      <div ref={containerRef} className="aspect-[1/1.414] w-full overflow-hidden relative">
        <div ref={innerRef} className="absolute inset-0 overflow-hidden" style={{ fontSize: "10px" }}>
          {template === "classic" && <CVClassic cv={cv} t={t} />}
          {template === "modern" && <CVModern cv={cv} t={t} />}
          {template === "minimal" && <CVMinimal cv={cv} t={t} />}
        </div>
      </div>
    </div>
  );
}

type T = ReturnType<typeof tCV>;

// ============================================================
// CLASSIC — tailles en em, flow naturel, padding scalable
// ============================================================
function CVClassic({ cv, t }: { cv: CVDocument; t: T }) {
  return (
    <div className="h-full" style={{ padding: "2.4em 2.6em" }}>
      {/* HEADER */}
      <header style={{ marginBottom: "0.9em" }}>
        <h1 style={{ fontSize: "2.2em", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.05 }}>
          {cv.title}
        </h1>
        <p style={{ fontSize: "1.2em", color: "#3f3f46", marginTop: "0.15em" }}>{cv.headline}</p>
        <p style={{ fontSize: "0.92em", color: "#71717a", marginTop: "0.2em" }}>
          {CONTACT.email}  ·  {CONTACT.phone}  ·  {CONTACT.location}  ·  {CONTACT.linkedin}
        </p>
        <div style={{ borderTop: "2px solid #18181b", marginTop: "0.4em" }} />
      </header>

      <p style={{ fontSize: "1em", color: "#3f3f46", lineHeight: 1.5, textAlign: "justify", marginBottom: "0.9em" }}>
        {cv.summary}
      </p>

      <Sec title={t.sectionExperience} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65em", marginBottom: "0.9em" }}>
        {cv.experiences.slice(0, 4).map((e, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5em" }}>
              <p style={{ fontWeight: 700, fontSize: "1.08em" }}>
                {e.role} <span style={{ fontWeight: 400, color: "#71717a" }}>·</span> {e.company}
              </p>
              <p style={{ fontSize: "0.88em", color: "#71717a", whiteSpace: "nowrap" }}>{e.period}</p>
            </div>
            <p style={{ fontSize: "0.88em", fontStyle: "italic", color: "#71717a" }}>{e.location}</p>
            <ul style={{ marginTop: "0.15em", paddingLeft: "1.2em", listStyle: "disc" }}>
              {e.bullets.slice(0, 4).map((b, j) => (
                <li key={j} style={{ fontSize: "0.97em", lineHeight: 1.45 }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Sec title={t.sectionEducation} />
      <div style={{ marginBottom: "0.9em" }}>
        {cv.education.map((ed, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "0.5em" }}>
            <span style={{ fontSize: "0.98em" }}>
              <span style={{ fontWeight: 600 }}>{ed.degree}</span>
              <span style={{ color: "#52525b" }}> · {ed.school}</span>
            </span>
            <span style={{ fontSize: "0.88em", color: "#71717a" }}>{ed.period}</span>
          </div>
        ))}
      </div>

      <Sec title={t.sectionSkillsCombined} />
      <div>
        {cv.skills.slice(0, 5).map((g, i) => (
          <p key={i} style={{ fontSize: "0.95em", lineHeight: 1.45 }}>
            <span style={{ fontWeight: 700 }}>{g.group} :</span> {g.items.join(" · ")}
          </p>
        ))}
        <p style={{ fontSize: "0.95em", marginTop: "0.3em" }}>
          <span style={{ fontWeight: 700 }}>{t.labelCertifications} :</span> {cv.certifications.join(" · ")}
        </p>
        <p style={{ fontSize: "0.95em" }}>
          <span style={{ fontWeight: 700 }}>{t.labelLanguages} :</span>{" "}
          {cv.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
        </p>
      </div>
    </div>
  );
}

function Sec({ title }: { title: string }) {
  return (
    <h2 style={{
      fontSize: "0.88em",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "#18181b",
      borderBottom: "1px solid #d4d4d8",
      paddingBottom: "0.15em",
      marginBottom: "0.4em"
    }}>
      {title}
    </h2>
  );
}

// ============================================================
// MODERN — accent vert, typo plus marquée
// ============================================================
function CVModern({ cv, t }: { cv: CVDocument; t: T }) {
  return (
    <div className="h-full" style={{ padding: "2.4em 2.6em" }}>
      <header style={{ marginBottom: "0.9em" }}>
        <h1 style={{ fontSize: "2.6em", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {cv.title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginTop: "0.35em" }}>
          <span style={{ height: "0.35em", width: "2.4em", background: "#10b981" }} />
          <p style={{ fontSize: "1.15em", fontWeight: 500, color: "#3f3f46" }}>{cv.headline}</p>
        </div>
        <p style={{ fontSize: "0.9em", color: "#71717a", marginTop: "0.3em" }}>
          {CONTACT.email}  ·  {CONTACT.phone}  ·  {CONTACT.location}  ·  {CONTACT.linkedin}
        </p>
      </header>

      <p style={{ fontSize: "1em", color: "#3f3f46", lineHeight: 1.55, textAlign: "justify", marginBottom: "0.9em" }}>
        {cv.summary}
      </p>

      <SecMod title={t.expShort} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85em", marginBottom: "0.9em" }}>
        {cv.experiences.slice(0, 4).map((e, i) => (
          <div key={i} style={{ position: "relative", paddingLeft: "1.1em" }}>
            <span style={{
              position: "absolute",
              left: 0,
              top: "0.55em",
              height: "0.45em",
              width: "0.45em",
              borderRadius: "50%",
              background: "#10b981"
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5em" }}>
              <p style={{ fontWeight: 700, fontSize: "1.1em" }}>{e.role}</p>
              <p style={{ fontSize: "0.88em", color: "#71717a" }}>{e.period}</p>
            </div>
            <p style={{ fontSize: "0.95em", color: "#047857", fontWeight: 500 }}>
              {e.company} · {e.location}
            </p>
            <ul style={{ marginTop: "0.2em", listStyle: "none", padding: 0 }}>
              {e.bullets.slice(0, 4).map((b, j) => (
                <li key={j} style={{ display: "flex", gap: "0.4em", fontSize: "0.97em", lineHeight: 1.45 }}>
                  <span style={{ color: "#10b981", userSelect: "none", flexShrink: 0 }}>›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SecMod title={t.eduShort} />
      <div style={{ marginBottom: "0.9em" }}>
        {cv.education.map((ed, i) => (
          <p key={i} style={{ fontSize: "0.98em", lineHeight: 1.5 }}>
            <span style={{ fontWeight: 600 }}>{ed.degree}</span>
            <span style={{ color: "#52525b" }}> · {ed.school} · {ed.period}</span>
          </p>
        ))}
      </div>

      <SecMod title={t.skillsShort} />
      <div>
        {cv.skills.slice(0, 5).map((g, i) => (
          <p key={i} style={{ fontSize: "0.95em", lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: "#047857" }}>{g.group}.</span> {g.items.join(", ")}
          </p>
        ))}
        <p style={{ fontSize: "0.93em", color: "#3f3f46", marginTop: "0.4em", lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700, color: "#047857" }}>{t.labelCertifications}.</span> {cv.certifications.join(", ")}.{" "}
          <span style={{ fontWeight: 700, color: "#047857" }}>{t.labelLanguages}.</span>{" "}
          {cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(", ")}.
        </p>
      </div>
    </div>
  );
}

function SecMod({ title }: { title: string }) {
  return (
    <h2 style={{
      fontSize: "0.95em",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "#047857",
      marginBottom: "0.4em"
    }}>
      {title}
    </h2>
  );
}

// ============================================================
// MINIMAL — light, beaucoup d'espace, dates en colonne
// ============================================================
function CVMinimal({ cv, t }: { cv: CVDocument; t: T }) {
  return (
    <div className="h-full" style={{ padding: "3em 3.4em", fontWeight: 300 }}>
      <header style={{ marginBottom: "1.4em" }}>
        <h1 style={{ fontSize: "2.4em", fontWeight: 200, letterSpacing: "0.02em", lineHeight: 1 }}>
          {cv.title}
        </h1>
        <p style={{ fontSize: "0.92em", textTransform: "uppercase", letterSpacing: "0.18em", color: "#71717a", marginTop: "0.2em" }}>
          {cv.headline}
        </p>
        <p style={{ fontSize: "0.88em", color: "#71717a", marginTop: "0.3em" }}>
          {CONTACT.email} · {CONTACT.phone} · {CONTACT.location} · {CONTACT.linkedin}
        </p>
      </header>

      <p style={{ fontSize: "1em", color: "#3f3f46", lineHeight: 1.6, textAlign: "justify", marginBottom: "1.4em" }}>
        {cv.summary}
      </p>

      <SecMin title={t.expShort} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85em", marginBottom: "1.1em" }}>
        {cv.experiences.slice(0, 4).map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "5.2em 1fr", gap: "1em" }}>
            <p style={{ fontSize: "0.88em", color: "#71717a", paddingTop: "0.15em" }}>{e.period}</p>
            <div>
              <p style={{ fontWeight: 600, fontSize: "1.05em" }}>{e.role}</p>
              <p style={{ fontSize: "0.92em", color: "#52525b", marginBottom: "0.2em" }}>
                {e.company}, {e.location}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {e.bullets.slice(0, 4).map((b, j) => (
                  <li key={j} style={{ fontSize: "0.97em", lineHeight: 1.55 }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <SecMin title={t.eduShort} />
      <div style={{ marginBottom: "1.1em" }}>
        {cv.education.map((ed, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "5.2em 1fr", gap: "1em" }}>
            <p style={{ fontSize: "0.88em", color: "#71717a" }}>{ed.period}</p>
            <p style={{ fontSize: "0.98em" }}>
              <span style={{ fontWeight: 600 }}>{ed.degree}</span>
              <span style={{ color: "#52525b" }}>, {ed.school}</span>
            </p>
          </div>
        ))}
      </div>

      <SecMin title={t.skillsShort} />
      <div>
        {cv.skills.slice(0, 5).map((g, i) => (
          <p key={i} style={{ fontSize: "0.97em", lineHeight: 1.55 }}>
            <span style={{ fontWeight: 600 }}>{g.group}.</span> {g.items.join(", ")}
          </p>
        ))}
        <p style={{ fontSize: "0.95em", color: "#3f3f46", marginTop: "0.55em", lineHeight: 1.55 }}>
          {cv.certifications.join(", ")}. {cv.languages.map((l) => `${l.name} ${l.level.toLowerCase()}`).join(", ")}.
        </p>
      </div>
    </div>
  );
}

function SecMin({ title }: { title: string }) {
  return (
    <h2 style={{
      fontSize: "0.88em",
      fontWeight: 400,
      textTransform: "uppercase",
      letterSpacing: "0.28em",
      color: "#a1a1aa",
      marginBottom: "0.5em"
    }}>
      {title}
    </h2>
  );
}
