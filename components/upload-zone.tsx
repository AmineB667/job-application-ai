"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/use-t";

type Props = {
  onParsed: (text: string, filename: string) => void;
  parsedFilename?: string | null;
  onClear?: () => void;
};

export function UploadZone({ onParsed, parsedFilename, onClear }: Props) {
  const t = useT();
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      setBusy(true);
      setError(null);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/parse-cv", { method: "POST", body: form });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erreur");
        onParsed(json.text, json.filename);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur d'extraction");
      } finally {
        setBusy(false);
      }
    },
    [onParsed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxFiles: 1,
    disabled: busy,
  });

  if (parsedFilename) {
    return (
      <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="rounded-md bg-background p-2 shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{parsedFilename}</p>
            <p className="text-xs text-muted-foreground">{t.upload.loaded}</p>
          </div>
        </div>
        {onClear && (
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-muted/40",
        busy && "pointer-events-none opacity-60"
      )}
    >
      <input {...getInputProps()} />
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
      </div>
      <p className="mt-3 text-sm font-medium">
        {busy ? t.upload.loading : isDragActive ? t.upload.dragActive : t.upload.idle}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{t.upload.formats}</p>
      {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
    </div>
  );
}
