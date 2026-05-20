"use client";

import { AlertTriangle, CheckCircle2, Lightbulb, ShieldCheck, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/score-ring";
import { SkillsRadar } from "@/components/skills-radar";
import type { ATSAnalysis } from "@/lib/types";

export function ATSPanel({ ats }: { ats: ATSAnalysis }) {
  const radarData = [
    { dimension: "Mots-clés", score: ats.scores.keywords },
    { dimension: "Expérience", score: ats.scores.experience },
    { dimension: "Compétences", score: ats.scores.skills },
    { dimension: "ATS-safe", score: ats.scores.ats },
    { dimension: "Global", score: ats.scores.overall },
  ];

  return (
    <div className="space-y-4">
      {/* Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Scores ATS</CardTitle>
          <CardDescription>Compatibilité CV ↔ offre, mesurée sur 5 dimensions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <ScoreRing value={ats.scores.overall} label="Score global" />
            <ScoreRing value={ats.scores.keywords} label="Mots-clés" />
            <ScoreRing value={ats.scores.experience} label="Expérience" />
            <ScoreRing value={ats.scores.skills} label="Compétences" />
            <ScoreRing value={ats.scores.ats} label="ATS-safe" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compatibilité ATS par système</CardTitle>
            <CardDescription>Estimation par moteur ATS de marché.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Workday", value: ats.atsCompat.workday },
              { name: "Taleo", value: ats.atsCompat.taleo },
              { name: "Greenhouse", value: ats.atsCompat.greenhouse },
              { name: "Lever", value: ats.atsCompat.lever },
              { name: "SmartRecruiters", value: ats.atsCompat.smartrecruiters },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{s.name}</span>
                  <span className="tabular-nums text-muted-foreground">{s.value}%</span>
                </div>
                <Progress value={s.value} className="mt-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cartographie des dimensions</CardTitle>
            <CardDescription>Vue radar du fit.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillsRadar data={radarData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Couvert
            </CardTitle>
            <CardDescription>Ce que l&apos;offre demande et que votre profil couvre.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ChipGroup title="Mots-clés ATS prioritaires" items={ats.extracted.priorityKeywords} tone="success" />
            <ChipGroup title="Hard skills" items={ats.extracted.hardSkills} />
            <ChipGroup title="Soft skills" items={ats.extracted.softSkills} tone="secondary" />
            <ChipGroup title="Outils & technologies" items={[...ats.extracted.tools, ...ats.extracted.technologies]} />
            {ats.extracted.certifications.length > 0 && (
              <ChipGroup title="Certifications attendues" items={ats.extracted.certifications} />
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Niveau d&apos;expérience demandé</p>
              <Badge variant="outline">{ats.extracted.experienceLevel}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              À combler
            </CardTitle>
            <CardDescription>Écarts détectés entre offre et profil — déjà reformulés dans le CV.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ChipGroup title="Compétences manquantes" items={ats.gaps.missingSkills} tone="warning" />
            <ChipGroup title="Mots-clés absents" items={ats.gaps.missingKeywords} tone="warning" />
            <ChipGroup title="À reformuler" items={ats.gaps.skillsToReframe} tone="secondary" />
            <ChipGroup title="Titres de poste suggérés" items={ats.gaps.titleSuggestions} tone="outline" />
            {ats.gaps.parsingIssues.length > 0 && (
              <BulletList icon={<X className="h-3 w-3 text-destructive" />} title="Problèmes de parsing" items={ats.gaps.parsingIssues} />
            )}
            {ats.gaps.weakSections.length > 0 && (
              <BulletList icon={<AlertTriangle className="h-3 w-3 text-warning" />} title="Sections ATS faibles" items={ats.gaps.weakSections} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-warning" />
            Optimisations appliquées
          </CardTitle>
          <CardDescription>Liste des optimisations effectuées automatiquement.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-sm">
            {ats.optimizations.map((o, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
          {ats.warnings.length > 0 && (
            <div className="mt-4 rounded-md border border-warning/30 bg-warning/10 p-3 text-xs">
              <p className="font-medium text-warning mb-1">Vigilance</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {ats.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ChipGroup({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: string[];
  tone?: "default" | "success" | "warning" | "secondary" | "outline";
}) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1.5">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((k, i) => (
          <Badge key={i} variant={tone as "default" | "success" | "warning" | "secondary" | "outline"}>
            {k}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function BulletList({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{title}</p>
      <ul className="space-y-1 text-xs">
        {items.map((it, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="mt-0.5">{icon}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
