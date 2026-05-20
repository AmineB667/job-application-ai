import { NextRequest, NextResponse } from "next/server";
import { cvToPdf, cvToDocx, letterToPdf, letterToDocx } from "@/lib/exports";
import type { CVDocument, CoverLetter, CVTemplate, OutputLanguage } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { type, format, payload, template, language } = (await req.json()) as {
      type: "cv" | "letter";
      format: "pdf" | "docx";
      payload: CVDocument | CoverLetter;
      template?: CVTemplate;
      language?: OutputLanguage;
    };

    const lang: OutputLanguage = language ?? "fr";

    let bytes: Uint8Array;
    let mime: string;
    let ext: string;

    if (type === "cv" && format === "pdf") {
      bytes = cvToPdf(payload as CVDocument, template ?? "classic", lang);
      mime = "application/pdf";
      ext = "pdf";
    } else if (type === "cv" && format === "docx") {
      bytes = await cvToDocx(payload as CVDocument, template ?? "classic", lang);
      mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      ext = "docx";
    } else if (type === "letter" && format === "pdf") {
      bytes = letterToPdf(payload as CoverLetter, "Amine Ben Bouazza", lang);
      mime = "application/pdf";
      ext = "pdf";
    } else {
      bytes = await letterToDocx(payload as CoverLetter, lang);
      mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      ext = "docx";
    }

    const suffix = lang === "en" ? "EN" : "FR";
    const filename =
      type === "cv"
        ? `Amine_Ben_Bouazza_CV_${suffix}.${ext}`
        : `Amine_Ben_Bouazza_Letter_${suffix}.${ext}`;

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
