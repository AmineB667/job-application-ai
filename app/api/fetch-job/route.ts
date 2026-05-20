import { NextRequest, NextResponse } from "next/server";
import { fetchJobOfferFromUrl } from "@/lib/parse-cv";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { url } = (await req.json()) as { url?: string };
    if (!url) return NextResponse.json({ error: "URL manquante" }, { status: 400 });
    const text = await fetchJobOfferFromUrl(url);
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur fetch" },
      { status: 500 }
    );
  }
}
