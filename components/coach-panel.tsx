"use client";

import { Sparkles, TrendingUp, Award, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/score-ring";
import type { CoachAdvice } from "@/lib/types";

const probaTone: Record<CoachAdvice["estimatedInterviewProbability"], "success" | "warning" | "destructive" | "default"> = {
  "très forte": "success",
  forte: "success",
  moyenne: "warning",
  faible: "destructive",
  "very strong": "success",
  strong: "success",
  medium: "warning",
  low: "destructive",
};

export function CoachPanel({ coach }: { coach: CoachAdvice }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Score de candidature
          </CardTitle>
          <CardDescription>Estimation globale de la force de votre candidature pour cette offre.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ScoreRing value={coach.candidatureScore} label="Force candidature" size={112} />
          <div className="flex-1 space-y-2">
            <p className="text-sm">{coach.scoreReason}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Probabilité d&apos;entretien estimée :</span>
              <Badge variant={probaTone[coach.estimatedInterviewProbability]}>
                {coach.estimatedInterviewProbability}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              Compétences à développer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {coach.skillsToGrow.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-primary" />
              Certifications pertinentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {coach.certificationsToConsider.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wand2 className="h-4 w-4 text-warning" />
              Améliorations CV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {coach.cvImprovements.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wand2 className="h-4 w-4 text-warning" />
              Améliorations Lettre
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {coach.letterImprovements.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
