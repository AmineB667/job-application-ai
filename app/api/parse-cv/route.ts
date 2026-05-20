import { NextRequest, NextResponse } from "next/server";
import { extractTextFromBuffer } from "@/lib/parse-cv";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromBuffer(buf, file.name);
    return NextResponse.json({ text, filename: file.name, size: buf.length });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur d'extraction";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
