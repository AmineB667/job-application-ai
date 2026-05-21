"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Linkedin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi.");
      setSent(true);
      toast.success("Message envoyé avec succès !");
    } catch {
      toast.error("Une erreur est survenue. Essayez par email directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-6xl flex items-center justify-between px-6 h-14">
          <Link href="/" className="font-bold text-sm hover:text-primary transition-colors">
            ← Job Application AI
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/ressources" className="text-muted-foreground hover:text-foreground transition-colors">
              Ressources
            </Link>
            <Link href="/contact" className="font-semibold text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
            ← Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Nous contacter</h1>
          <p className="mt-2 text-muted-foreground">
            Une question, un retour ou une idée ? Nous vous répondons sous 48h.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <aside className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-semibold mb-4">Amine Benbouazza</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fondateur de JobApplication.fr — disponible pour vos questions, retours et suggestions.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:benbouazzamine@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-card group-hover:border-primary/50 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="underline underline-offset-2">benbouazzamine@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/aminebenbouazza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-card group-hover:border-primary/50 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <span className="underline underline-offset-2">linkedin.com/in/aminebenbouazza</span>
                </a>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Délai de réponse</p>
              <p>Nous répondons généralement sous 24 à 48 heures ouvrées.</p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <h2 className="text-xl font-semibold">Message envoyé !</h2>
                <p className="text-muted-foreground max-w-sm">
                  Merci pour votre message. Nous vous répondrons dans les 48 heures.
                </p>
                <Button variant="outline" onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}>
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom complet <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean@exemple.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Question, retour, suggestion…"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Décrivez votre demande en détail…"
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={loading} className="min-w-[160px]">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Ou écrivez directement à{" "}
                    <a href="mailto:benbouazzamine@gmail.com" className="underline hover:text-foreground">
                      benbouazzamine@gmail.com
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground mt-12">
        <div className="container max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} JobApplication.fr</span>
          <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
          <Link href="/cgu" className="hover:text-foreground transition-colors">CGU</Link>
          <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
        </div>
      </footer>
    </div>
  );
}
