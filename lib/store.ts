"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnalysisResult, UserProfile } from "./types";
import { EMPTY_PROFILE } from "./profile";
import type { UILang } from "./ui-lang";

export type HistoryEntry = {
  id: string;
  createdAt: string;
  status: "envoyé" | "entretien" | "refus" | "relance" | "brouillon";
  result: AnalysisResult;
};

type Store = {
  history: HistoryEntry[];
  addHistory: (entry: HistoryEntry) => void;
  removeHistory: (id: string) => void;
  updateStatus: (id: string, status: HistoryEntry["status"]) => void;
  clear: () => void;

  /** Profile actif du visiteur. Stocké en localStorage. */
  userProfile: UserProfile;
  setUserProfile: (p: UserProfile) => void;
  resetProfile: () => void;

  /** Clé DeepSeek apportée par l'utilisateur (BYOK). Jamais envoyée à autre que /api/analyze. */
  apiKey: string;
  setApiKey: (k: string) => void;

  /** Langue de l'interface (distincte de la langue du CV/lettre). */
  uiLang: UILang;
  setUILang: (l: UILang) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (entry) => set((s) => ({ history: [entry, ...s.history] })),
      removeHistory: (id) => set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
      updateStatus: (id, status) =>
        set((s) => ({
          history: s.history.map((h) => (h.id === id ? { ...h, status } : h)),
        })),
      clear: () => set({ history: [] }),

      userProfile: EMPTY_PROFILE,
      setUserProfile: (p) => set({ userProfile: p }),
      resetProfile: () => set({ userProfile: EMPTY_PROFILE }),

      apiKey: "",
      setApiKey: (k) => set({ apiKey: k.trim() }),

      uiLang: "fr",
      setUILang: (l) => set({ uiLang: l }),
    }),
    {
      name: "amine-job-tool-v2",
      // Petit safety net : on ne persiste pas la clé API par défaut.
      // → décommente la ligne ci-dessous pour ne PAS sauvegarder la clé entre sessions.
      // partialize: (state) => ({ ...state, apiKey: "" }),
    }
  )
);
