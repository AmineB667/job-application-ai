"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Download, Upload, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { AMINE_PROFILE, EMPTY_PROFILE } from "@/lib/profile";
import type { ProfileExperience, ProfileEducation, UserProfile } from "@/lib/types";
import { toast } from "sonner";

export function ProfileEditor() {
  const profile = useStore((s) => s.userProfile);
  const setProfile = useStore((s) => s.setUserProfile);

  const update = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile({ ...profile, [key]: value });
  };
  const updateIdentity = (k: keyof UserProfile["identity"], v: unknown) => {
    setProfile({ ...profile, identity: { ...profile.identity, [k]: v } });
  };

  const addExp = () => update("experiences", [
    ...(profile.experiences || []),
    { role: "", company: "", location: "", start: "", end: null, current: true, isPrimary: false, bullets: ["", "", "", ""] },
  ]);
  const updExp = (i: number, k: keyof ProfileExperience, v: unknown) => {
    const arr = [...profile.experiences];
    arr[i] = { ...arr[i], [k]: v };
    if (k === "isPrimary" && v === true) {
      arr.forEach((e, j) => { if (j !== i) e.isPrimary = false; });
    }
    update("experiences", arr);
  };
  const updExpBullet = (i: number, j: number, v: string) => {
    const arr = [...profile.experiences];
    const bullets = [...(arr[i].bullets || [])];
    bullets[j] = v;
    arr[i] = { ...arr[i], bullets };
    update("experiences", arr);
  };
  const rmExp = (i: number) => update("experiences", profile.experiences.filter((_, j) => j !== i));

  const addEdu = () => update("education", [...(profile.education || []), { degree: "", school: "", start: "", end: "" }]);
  const updEdu = (i: number, k: keyof ProfileEducation, v: string) => {
    const arr = [...profile.education];
    arr[i] = { ...arr[i], [k]: v };
    update("education", arr);
  };
  const rmEdu = (i: number) => update("education", profile.education.filter((_, j) => j !== i));

  const addSkillGroup = () => update("skills", [...(profile.skills || []), { group: "", items: [] }]);
  const updSkillGroup = (i: number, k: "group" | "items", v: string | string[]) => {
    const arr = [...profile.skills];
    arr[i] = { ...arr[i], [k]: v as string & string[] };
    update("skills", arr);
  };
  const rmSkillGroup = (i: number) => update("skills", profile.skills.filter((_, j) => j !== i));

  const addLang = () => update("languages", [...(profile.languages || []), { name: "", level: "" }]);
  const updLang = (i: number, k: "name" | "level", v: string) => {
    const arr = [...profile.languages];
    arr[i] = { ...arr[i], [k]: v };
    update("languages", arr);
  };
  const rmLang = (i: number) => update("languages", profile.languages.filter((_, j) => j !== i));

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Profile exported");
  };
  const importJSON = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setProfile(parsed);
      toast.success("Profile imported");
    } catch {
      toast.error("Invalid JSON file");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
          <CardDescription>
            Load a demo profile to see what a complete one looks like, then edit it with your own data.
            Everything is stored locally in your browser. Nothing is sent to any server until you launch an analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => { setProfile(AMINE_PROFILE); toast.success("Demo profile loaded"); }}>
            <Sparkles className="h-3.5 w-3.5" />
            Load Amine Ben Bouazza demo
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setProfile(EMPTY_PROFILE); toast.success("Profile cleared"); }}>
            Start fresh
          </Button>
          <Button size="sm" variant="outline" onClick={exportJSON}>
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </Button>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <Button size="sm" variant="outline" asChild>
              <span>
                <Upload className="h-3.5 w-3.5" />
                Import JSON
              </span>
            </Button>
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])}
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identity</CardTitle>
          <CardDescription>These details appear in your CV header and letter signature.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="Full name" value={profile.identity.fullName} onChange={(v) => updateIdentity("fullName", v)} />
          <Field label="Job title / headline" value={profile.identity.title} onChange={(v) => updateIdentity("title", v)} />
          <Field label="Email" value={profile.identity.email} onChange={(v) => updateIdentity("email", v)} />
          <Field label="Phone" value={profile.identity.phone} onChange={(v) => updateIdentity("phone", v)} />
          <Field label="Location" value={profile.identity.location} onChange={(v) => updateIdentity("location", v)} />
          <Field label="LinkedIn URL" value={profile.identity.linkedin || ""} onChange={(v) => updateIdentity("linkedin", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pitch & primary role</CardTitle>
          <CardDescription>3–4 lines. Used by the AI as the source of truth for your positioning.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Primary current role (e.g. CEO of Acme, Head of Growth at X)" value={profile.primaryRole} onChange={(v) => update("primaryRole", v)} />
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Pitch</label>
            <Textarea rows={4} value={profile.pitch} onChange={(e) => update("pitch", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Experiences</CardTitle>
              <CardDescription>The AI uses up to 4 experiences. Mark one as primary current role.</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={addExp}>
              <Plus className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.experiences.map((e, i) => (
            <div key={i} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={e.isPrimary ? "success" : "outline"}>
                    Experience #{i + 1}
                  </Badge>
                  <label className="text-[11px] flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" checked={!!e.isPrimary} onChange={(ev) => updExp(i, "isPrimary", ev.target.checked)} />
                    Primary current role
                  </label>
                </div>
                <Button size="icon" variant="ghost" onClick={() => rmExp(i)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <Field label="Role" value={e.role} onChange={(v) => updExp(i, "role", v)} />
                <Field label="Company" value={e.company} onChange={(v) => updExp(i, "company", v)} />
                <Field label="Location" value={e.location} onChange={(v) => updExp(i, "location", v)} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start (YYYY)" value={e.start} onChange={(v) => updExp(i, "start", v)} />
                  <Field label="End (YYYY or empty)" value={e.end || ""} onChange={(v) => updExp(i, "end", v || null)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Bullets (4 ideal)</label>
                {(e.bullets || []).map((b, j) => (
                  <Textarea key={j} rows={2} value={b} placeholder={`Bullet ${j + 1}`} onChange={(ev) => updExpBullet(i, j, ev.target.value)} />
                ))}
              </div>
            </div>
          ))}
          {profile.experiences.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">No experience yet. Click "Add" to start.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Education</CardTitle>
            </div>
            <Button size="sm" variant="outline" onClick={addEdu}>
              <Plus className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.education.map((ed, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Education #{i + 1}</Badge>
                <Button size="icon" variant="ghost" onClick={() => rmEdu(i)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <Field label="Degree" value={ed.degree} onChange={(v) => updEdu(i, "degree", v)} />
                <Field label="School" value={ed.school} onChange={(v) => updEdu(i, "school", v)} />
                <Field label="Start" value={ed.start} onChange={(v) => updEdu(i, "start", v)} />
                <Field label="End" value={ed.end} onChange={(v) => updEdu(i, "end", v)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Comma separated.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={2}
            value={profile.certifications.join(", ")}
            onChange={(e) => update("certifications", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))}
            placeholder="Google Ads, Google Analytics, HubSpot..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>5 groups recommended.</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={addSkillGroup}>
              <Plus className="h-3.5 w-3.5" />
              Add group
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.skills.map((g, i) => (
            <div key={i} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Field label="Group name" value={g.group} onChange={(v) => updSkillGroup(i, "group", v)} />
                <Button size="icon" variant="ghost" onClick={() => rmSkillGroup(i)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <Textarea
                rows={2}
                value={g.items.join(", ")}
                onChange={(e) => updSkillGroup(i, "items", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))}
                placeholder="SEO, SEA, Meta Ads, GA4..."
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Languages</CardTitle>
            <Button size="sm" variant="outline" onClick={addLang}>
              <Plus className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {profile.languages.map((l, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Field label="Language" value={l.name} onChange={(v) => updLang(i, "name", v)} />
                <Field label="Level" value={l.level} onChange={(v) => updLang(i, "level", v)} />
              </div>
              <Button size="icon" variant="ghost" onClick={() => rmLang(i)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements bank (optional)</CardTitle>
          <CardDescription>One per line. The AI uses these to enrich bullets when your experiences are short.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={5}
            value={(profile.achievementsBank || []).join("\n")}
            onChange={(e) => update("achievementsBank", e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1 flex-1">
      <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
