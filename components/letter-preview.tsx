"use client";

import { Copy, Check } from "lucide-react";
import * as React from "react";
import type { CoverLetter, OutputLanguage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { tLetter } from "@/lib/i18n";

export function LetterPreview({ letter, lang = "fr" }: { letter: CoverLetter; lang?: OutputLanguage }) {
  const [copied, setCopied] = React.useState(false);
  const subjectLabel = tLetter(lang).subject;

  const fullText = [
    letter.subject ? `${subjectLabel} : ${letter.subject}\n` : "",
    letter.greeting,
    "",
    letter.parts.intro,
    "",
    letter.parts.proof,
    "",
    letter.parts.fit,
    "",
    letter.parts.close,
    "",
    letter.signature,
  ].join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-lg border bg-white text-zinc-900 shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          {lang === "en" ? "Cover letter" : "Lettre de motivation"} • {letter.wordCount} {lang === "en" ? "words" : "mots"}
        </p>
        <Button variant="ghost" size="sm" onClick={copy} className="text-zinc-700 hover:text-zinc-900">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? (lang === "en" ? "Copied" : "Copié") : (lang === "en" ? "Copy" : "Copier")}
        </Button>
      </div>
      <div className="space-y-4 p-8 text-[14px] leading-relaxed">
        <p className="text-sm italic text-zinc-500">{subjectLabel} : {letter.subject}</p>
        <p>{letter.greeting}</p>
        <p className="whitespace-pre-wrap">{letter.parts.intro}</p>
        <p className="whitespace-pre-wrap">{letter.parts.proof}</p>
        <p className="whitespace-pre-wrap">{letter.parts.fit}</p>
        <p className="whitespace-pre-wrap">{letter.parts.close}</p>
        <p className="pt-4 font-semibold">{letter.signature}</p>
      </div>
    </div>
  );
}
