"use client";

import { Send, Calendar, Building2, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export function DashboardKpis() {
  const history = useStore((s) => s.history);

  const total = history.length;
  const sent = history.filter((h) => h.status === "envoyé" || h.status === "entretien").length;
  const interviews = history.filter((h) => h.status === "entretien").length;
  const avgAts = total
    ? Math.round(history.reduce((sum, h) => sum + h.result.ats.scores.overall, 0) / total)
    : 0;
  const companies = new Set(history.map((h) => h.result.meta.targetCompany).filter(Boolean)).size;

  const interviewRate = sent ? Math.round((interviews / sent) * 100) : 0;

  const kpis = [
    { label: "ATS moyen", value: `${avgAts}/100`, icon: Target, color: "text-primary" },
    { label: "Candidatures envoyées", value: sent.toString(), icon: Send, color: "text-warning" },
    { label: "Taux d'entretien", value: `${interviewRate}%`, icon: Calendar, color: "text-success" },
    { label: "Entreprises ciblées", value: companies.toString(), icon: Building2, color: "text-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((k) => {
        const Icon = k.icon;
        return (
          <Card key={k.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-md bg-muted p-2">
                <Icon className={`h-4 w-4 ${k.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums">{k.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
