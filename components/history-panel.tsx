"use client";

import * as React from "react";
import { Trash2, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult } from "@/lib/types";
import { useStore, type HistoryEntry } from "@/lib/store";
import { useT } from "@/hooks/use-t";

const statusTone: Record<HistoryEntry["status"], "default" | "success" | "warning" | "destructive" | "secondary"> = {
  envoyé: "default",
  entretien: "success",
  refus: "destructive",
  relance: "warning",
  brouillon: "secondary",
};

export function HistoryPanel({ onOpen }: { onOpen: (entry: HistoryEntry) => void }) {
  const history = useStore((s) => s.history);
  const remove = useStore((s) => s.removeHistory);
  const updateStatus = useStore((s) => s.updateStatus);
  const uiLang = useStore((s) => s.uiLang);
  const t = useT();

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.history.emptyTitle}</CardTitle>
          <CardDescription>{t.history.emptyDesc}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {history.map((h) => (
        <Card key={h.id} className="cursor-pointer" onClick={() => onOpen(h)}>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm flex items-center gap-1.5 min-w-0">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{h.result.meta.targetCompany || t.history.company}</span>
              </CardTitle>
              <Badge variant={statusTone[h.status]}>{h.status}</Badge>
            </div>
            <CardDescription className="truncate">{h.result.meta.jobTitle || t.history.job}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(h.createdAt).toLocaleDateString(uiLang === "en" ? "en-GB" : "fr-FR")}
              </span>
              <span>{t.history.score} {h.result.coach.candidatureScore}/100</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {(["envoyé", "entretien", "refus", "relance", "brouillon"] as HistoryEntry["status"][]).map((s) => (
                <Button
                  key={s}
                  variant={h.status === s ? "default" : "outline"}
                  size="sm"
                  className="h-6 text-[10px] px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(h.id, s);
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                remove(h.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
              {t.history.deleteBtn}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function buildHistoryEntry(result: AnalysisResult): HistoryEntry {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "brouillon",
    result,
  };
}
