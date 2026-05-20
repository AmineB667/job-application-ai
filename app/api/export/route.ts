import { NextRequest, NextResponse } from "next/server";
import { cvToPdf, cvToDocx, letterToPdf, letterToDocx } from "@/lib/exports";
import type { CVDocument, CoverLetter, CVTemplate, OutputLanguage, UserProfile } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { type, format, payload, template, language, identity } = (await req.json()) as {
      type: "cv" | "letter";
      format: "pdf" | "docx";
      payload: CVDocument | CoverLetter;
      template?: CVTemplate;
      language?: OutputLanguage;
      identity?: UserProfile["identity"];
    };

    const lang: OutputLanguage = language ?? "fr";
    const safeIdentity = identity ?? {
      fullName: "", title: "", location: "", email: "", phone: "", linkedin: "", websites: [],
    };

    let bytes: Uint8Array;
    let mime: string;
    let ext: string;

    if (type === "cv" && format === "pdf") {
      bytes = cvToPdf(payload as CVDocument, template ?? "classic", lang, safeIdentity);
      mime = "application/pdf";
      ext = "pdf";
    } else if (type === "cv" && format === "docx") {
      bytes = await cvToDocx(payload as CVDocument, template ?? "classic", lang, safeIdentity);
      mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      ext = "docx";
    } else if (type === "letter" && format === "pdf") {
      bytes = letterToPdf(payload as CoverLetter, undefined, lang, safeIdentity);
      mime = "application/pdf";
      ext = "pdf";
    } else {
      bytes = await letterToDocx(payload as CoverLetter, lang, safeIdentity);
      mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      ext = "docx";
    }

    const suffix = lang === "en" ? "EN" : "FR";
    // Try to derive a name from the payload (CV title or letter signature). Fallback to "candidate".
    const rawName =
      type === "cv"
        ? (payload as CVDocument).title || "candidate"
        : (payload as CoverLetter).signature || "candidate";
    const baseName = rawName.replace(/[^a-zA-Z0-9-]+/g, "_").replace(/^_+|_+$/g, "") || "candidate";
    const filename =
      type === "cv"
        ? `${baseName}_CV_${suffix}.${ext}`
        : `${baseName}_Letter_${suffix}.${ext}`;

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur export" },
      { status: 500 }
    );
  }
}
