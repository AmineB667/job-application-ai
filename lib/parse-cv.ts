// Extraction de texte depuis PDF ou DOCX. Côté serveur uniquement.

import mammoth from "mammoth";

export async function extractTextFromBuffer(buffer: Buffer, filename: string): Promise<string> {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".pdf")) {
    return extractFromPdf(buffer);
  }
  if (lower.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  if (lower.endsWith(".txt") || lower.endsWith(".md")) {
    return buffer.toString("utf8");
  }
  throw new Error("Format non supporté. Utilisez PDF, DOCX, TXT ou MD.");
}

async function extractFromPdf(buffer: Buffer): Promise<string> {
  // Import dynamique pour éviter les soucis Edge Runtime / SSR.
  // pdf-parse exécute du code au require qui scanne les fichiers de test —
  // on contourne en l'important uniquement à l'exécution.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text;
}

export async function fetchJobOfferFromUrl(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AmineJobTool/1.0; +https://riff.business)",
    },
  });
  if (!res.ok) throw new Error(`Impossible de récupérer l'offre (HTTP ${res.status})`);
  const html = await res.text();
  // Strip très basique du HTML (suffit pour LinkedIn, WTTJ, Indeed simple)
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 12000); // borne pour ne pas exploser le prompt
}
