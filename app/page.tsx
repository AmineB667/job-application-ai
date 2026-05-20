"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, Loader2, FileDown, FileText, Mail, ChevronRight, Link2, Building2 } from "lucide-react";

import { Sidebar, type View } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { UploadZone } from "@/components/upload-zone";
import { ATSPanel } from "@/components/ats-panel";
import { CVPreview } from "@/components/cv-preview";
import { LetterPreview } from "@/components/letter-preview";
import { CoachPanel } from "@/components/coach-panel";
import { HistoryPanel, buildHistoryEntry } from "@/components/history-panel";
import { DashboardKpis } from "@/components/dashboard-kpis";
import { ProfileEditor } from "@/components/profile-editor";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { useStore } from "@/lib/store";
import { useT } from "@/hooks/use-t";
import type { AnalysisResult, CVTone, LetterTone, CVTemplate, OutputLanguage } from "@/lib/types";
import { CV_TEMPLATES } from "@/lib/types";

const CV_TONES: { value: CVTone; label: string }[] = [
  { value: "ats-maximal", label: "ATS maximal" },
  { value: "marketing-digital", label: "Marketing digital" },
  { value: "corporate", label: "Corporate" },
  { value: "startup", label: "Startup" },
  { value: "consulting", label: "Conseil" },
  { value: "freelance", label: "Freelance" },
];

const LETTER_TONES: { value: LetterTone; label: string }[] = [
  { value: "startup", label: "Startup" },
  { value: "scaleup", label: "Scale-up" },
  { value: "grand-groupe", label: "Grand groupe" },
  { value: "cabinet-conseil", label: "Cabinet conseil" },
  { value: "pme", label: "PME" },
  { value: "freelance", label: "Freelance" },
];

export default function Home() {
  const [view, setView] = React.useState<View>("new");
  const [cvText, setCvText] = React.useState("");
  const [filename, setFilename] = React.useState<string | null>(null);
  const [jobOffer, setJobOffer] = React.useState("");
  const [jobUrl, setJobUrl] = React.useState("");
  const [targetCompany, setTargetCompany] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [cvTone, setCvTone] = React.useState<CVTone>("ats-maximal");
  const [letterTone, setLetterTone] = React.useState<LetterTone>("scaleup");
  const [cvTemplate, setCvTemplate] = React.useState<CVTemplate>("classic");
  const [outputLanguage, setOutputLanguage] = React.useState<OutputLanguage>("fr");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const addHistory = useStore((s) => s.addHistory);
  const userProfile = useStore((s) => s.userProfile);
  const apiKey = useStore((s) => s.apiKey);
  const t = useT();

  const fetchJobFromUrl = async () => {
    if (!jobUrl) return;
    try {
      const res = await fetch("/api/fetch-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setJobOffer(json.text);
      toast.success(t.toasts.urlFetched);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.toasts.analysisError);
    }
  };

  const analyze = async () => {
    if (!cvText) {
      toast.error(t.toasts.noCv);
      return;
    }
    if (!jobOffer || jobOffer.length < 80) {
      toast.error(t.toasts.noOffer);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvText,
          jobOffer,
          jobOfferUrl: jobUrl || null,
          targetCompany: targetCompany || null,
          linkedinUrl: linkedinUrl || null,
          cvTone,
          letterTone,
          outputLanguage,
          userProfile,
          apiKey: apiKey || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.toasts.analysisError);
      setResult(data as AnalysisResult);
      addHistory(buildHistoryEntry(data));
      toast.success(t.toasts.analysisDone);
      setView("ats");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.toasts.analysisError);
    } finally {
      setLoading(false);
    }
  };

  const exportFile = async (type: "cv" | "letter", format: "pdf" | "docx") => {
    if (!result) return;
    const payload = type === "cv" ? result.cv : result.letter;
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        format,
        payload,
        template: cvTemplate,
        language: result?.meta.language ?? outputLanguage,
        identity: userProfile.identity,
      }),
    });
    if (!res.ok) {
      toast.error(t.toasts.exportError);
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = (userProfile.identity.fullName || "candidate").replace(/\s+/g, "_");
    a.download =
      type === "cv"
        ? `${baseName}_CV.${format}`
        : `${baseName}_Letter.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar view={view} onView={setView} />

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b">
          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <h1 className="text-base font-semibold">
                {t.viewTitles[view] ?? ""}
              </h1>
              <p className="text-xs text-muted-foreground">
                {result?.meta.targetCompany && (
                  <>
                    <Building2 className="inline h-3 w-3 mr-1" />
                    {result.meta.targetCompany}
                    {result.meta.jobTitle && (
                      <>
                        <ChevronRight className="inline h-3 w-3 mx-1" />
                        {result.meta.jobTitle}
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {result && view !== "new" && (
                <Button variant="outline" size="sm" onClick={() => setView("new")}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {t.newApp.newAnalysis}
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="bg-grid">
          <div className="container max-w-6xl py-8 space-y-6">
            {!userProfile.identity.fullName && view !== "profile" && view !== "settings" && (
              <Card className="border-warning/40 bg-warning/5">
                <CardHeader>
                  <CardTitle className="text-sm">{t.profileWarning.title}</CardTitle>
                  <CardDescription>
                    {t.profileWarning.desc}{" "}
                    <button className="underline" onClick={() => setView("profile")}>
                      {t.profileWarning.link}
                    </button>{" "}
                    {t.profileWarning.desc2}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
            <DashboardKpis />

            {view === "new" && (
              <NewApplicationView
                cvText={cvText}
                filename={filename}
                onCvParsed={(text, f) => { setCvText(text); setFilename(f); }}
                onCvClear={() => { setCvText(""); setFilename(null); }}
                jobOffer={jobOffer}
                onJobOffer={setJobOffer}
                jobUrl={jobUrl}
                onJobUrl={setJobUrl}
                onFetchUrl={fetchJobFromUrl}
                targetCompany={targetCompany}
                onTargetCompany={setTargetCompany}
                linkedinUrl={linkedinUrl}
                onLinkedinUrl={setLinkedinUrl}
                cvTone={cvTone}
                onCvTone={setCvTone}
                letterTone={letterTone}
                onLetterTone={setLetterTone}
                outputLanguage={outputLanguage}
                onOutputLanguage={setOutputLanguage}
                onAnalyze={analyze}
                loading={loading}
              />
            )}

            {view === "ats" && result && (
              <div className="space-y-6">
                <ATSPanel ats={result.ats} />
                <CoachPanel coach={result.coach} />
              </div>
            )}
            {view === "ats" && !result && <EmptyState onNew={() => setView("new")} label={t.empty.ats} />}

            {view === "cv" && result && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{t.cvView.tonalityLabel}</span>
                    <Badge>{result.meta.cvTone}</Badge>
                    <span className="text-muted-foreground ml-2">{t.cvView.onePage}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportFile("cv", "pdf")}>
                      <FileDown className="h-3.5 w-3.5" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportFile("cv", "docx")}>
                      <FileDown className="h-3.5 w-3.5" />
                      DOCX
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">{t.cvView.templateTitle}</CardTitle>
                    <CardDescription className="text-xs">
                      {t.cvView.templateDesc} {CV_TEMPLATES.find((tmpl) => tmpl.id === cvTemplate)?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={cvTemplate} onValueChange={(v) => setCvTemplate(v as CVTemplate)}>
                      <TabsList>
                        {CV_TEMPLATES.map((tmpl) => (
                          <TabsTrigger key={tmpl.id} value={tmpl.id}>{tmpl.label}</TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </CardContent>
                </Card>

                <CVPreview cv={result.cv} template={cvTemplate} lang={result.meta.language ?? "fr"} />
              </div>
            )}
            {view === "cv" && !result && <EmptyState onNew={() => setView("new")} label={t.empty.cv} />}

            {view === "letter" && result && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{t.letterView.tonLabel}</span>
                    <Badge>{result.meta.letterTone}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportFile("letter", "pdf")}>
                      <FileDown className="h-3.5 w-3.5" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportFile("letter", "docx")}>
                      <FileDown className="h-3.5 w-3.5" />
                      DOCX
                    </Button>
                  </div>
                </div>
                <LetterPreview letter={result.letter} lang={result.meta.language ?? "fr"} />
              </div>
            )}
            {view === "letter" && !result && <EmptyState onNew={() => setView("new")} label={t.empty.letter} />}

            {view === "history" && (
              <HistoryPanel
                onOpen={(h) => {
                  setResult(h.result);
                  setView("ats");
                }}
              />
            )}

            {view === "profile" && <ProfileEditor />}

            {view === "settings" && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ onNew, label }: { onNew: () => void; label: string }) {
  const t = useT();
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <Sparkles className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground max-w-sm">{label}</p>
        <Button onClick={onNew}>
          <Sparkles className="h-4 w-4" />
          {t.empty.startBtn}
        </Button>
      </CardContent>
    </Card>
  );
}

type NewProps = {
  cvText: string;
  filename: string | null;
  onCvParsed: (text: string, name: string) => void;
  onCvClear: () => void;
  jobOffer: string;
  onJobOffer: (v: string) => void;
  jobUrl: string;
  onJobUrl: (v: string) => void;
  onFetchUrl: () => void;
  targetCompany: string;
  onTargetCompany: (v: string) => void;
  linkedinUrl: string;
  onLinkedinUrl: (v: string) => void;
  cvTone: CVTone;
  onCvTone: (v: CVTone) => void;
  letterTone: LetterTone;
  onLetterTone: (v: LetterTone) => void;
  outputLanguage: OutputLanguage;
  onOutputLanguage: (v: OutputLanguage) => void;
  onAnalyze: () => void;
  loading: boolean;
};

function NewApplicationView(p: NewProps) {
  const t = useT();
  const n = t.newApp;
  const cvReady = Boolean(p.cvText);
  const offerReady = p.jobOffer.length >= 80;
  const canLaunch = cvReady && offerReady && !p.loading;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className={cvReady ? "text-success" : ""}>{n.step1Title}</span>
              {cvReady && <Badge variant="success" className="ml-1">✓</Badge>}
            </CardTitle>
            <CardDescription>{n.step1Desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadZone
              parsedFilename={p.filename}
              onParsed={p.onCvParsed}
              onClear={p.onCvClear}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className={offerReady ? "text-success" : ""}>{n.step2Title}</span>
              {offerReady && <Badge variant="success" className="ml-1">✓</Badge>}
            </CardTitle>
            <CardDescription>{n.step2Desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder={n.urlPlaceholder}
                value={p.jobUrl}
                onChange={(e) => p.onJobUrl(e.target.value)}
              />
              <Button variant="outline" onClick={p.onFetchUrl} disabled={!p.jobUrl}>
                <Link2 className="h-4 w-4" />
                {n.fetchBtn}
              </Button>
            </div>
            <Textarea
              rows={9}
              placeholder={n.offerPlaceholder}
              value={p.jobOffer}
              onChange={(e) => p.onJobOffer(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              {n.charCount(p.jobOffer.length)}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{n.step3Title}</CardTitle>
            <CardDescription>{n.step3Desc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium">{n.outputLangLabel}</label>
              <Tabs value={p.outputLanguage} onValueChange={(v) => p.onOutputLanguage(v as OutputLanguage)}>
                <TabsList>
                  <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
                  <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-[11px] text-muted-foreground">
                {p.outputLanguage === "en" ? n.outputLangDescEn : n.outputLangDescFr}
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">{n.targetCompanyLabel}</label>
              <Input
                placeholder={n.targetCompanyPlaceholder}
                value={p.targetCompany}
                onChange={(e) => p.onTargetCompany(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">{n.linkedinLabel}</label>
              <Input
                placeholder={n.linkedinPlaceholder}
                value={p.linkedinUrl}
                onChange={(e) => p.onLinkedinUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">{n.cvVersionLabel}</label>
              <Tabs value={p.cvTone} onValueChange={(v) => p.onCvTone(v as CVTone)}>
                <TabsList className="h-auto flex-wrap">
                  {CV_TONES.map((tone) => (
                    <TabsTrigger key={tone.value} value={tone.value}>
                      {tone.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">{n.letterToneLabel}</label>
              <Tabs value={p.letterTone} onValueChange={(v) => p.onLetterTone(v as LetterTone)}>
                <TabsList className="h-auto flex-wrap">
                  {LETTER_TONES.map((tone) => (
                    <TabsTrigger key={tone.value} value={tone.value}>
                      {tone.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 flex flex-col items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-2 text-xs">
            <Badge variant={cvReady ? "success" : "secondary"}>{n.badgeCv(cvReady)}</Badge>
            <Badge variant={offerReady ? "success" : "secondary"}>{n.badgeOffer(offerReady, p.jobOffer.length)}</Badge>
            {p.targetCompany && <Badge variant="outline">{p.targetCompany}</Badge>}
          </div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button size="lg" onClick={p.onAnalyze} disabled={!canLaunch} className="min-w-[300px] h-12 text-base">
              {p.loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {n.analyzing}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {n.launchBtn}
                </>
              )}
            </Button>
          </motion.div>
          <p className="text-[11px] text-muted-foreground text-center">{n.estimatedTime}</p>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-60 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container max-w-6xl flex items-center justify-between gap-3 py-3 px-6">
          <div className="flex items-center gap-2 text-xs">
            <Badge variant={cvReady ? "success" : "secondary"}>{n.badgeCv(cvReady)}</Badge>
            <Badge variant={offerReady ? "success" : "secondary"}>{n.badgeOffer(offerReady, p.jobOffer.length)}</Badge>
          </div>
          <Button onClick={p.onAnalyze} disabled={!canLaunch} size="lg" className="min-w-[200px]">
            {p.loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {n.analyzingShort}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {n.launchBtnShort}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

function SettingsView() {
  const clear = useStore((s) => s.clear);
  const resetProfile = useStore((s) => s.resetProfile);
  const t = useT();
  const s = t.settings;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{s.storageTitle}</CardTitle>
          <CardDescription>{s.storageDesc}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="destructive" size="sm" onClick={clear}>
            {s.clearHistory}
          </Button>
          <Button variant="outline" size="sm" onClick={resetProfile}>
            {s.resetProfile}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{s.aboutTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1">
          <p>{s.aboutDesc1}</p>
          <p>{s.aboutDesc2}</p>
        </CardContent>
      </Card>
    </div>
  );
}
