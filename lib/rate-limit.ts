// Rate limiter en mémoire, par IP, par fenêtre glissante de 24h.
// Limite : N analyses gratuites par IP par jour quand l'utilisateur n'a pas
// fourni sa propre clé (BYOK). Reset au redémarrage du container — acceptable
// pour Render free (instance unique, redémarre sur cold start après 15min idle).
//
// Pour scale, remplacer par Upstash Redis (free tier 10k req/jour) :
// import { Ratelimit } from "@upstash/ratelimit"
// import { Redis } from "@upstash/redis"

const DEFAULT_LIMIT = Number(process.env.RATE_LIMIT_PER_DAY ?? 3);
const WINDOW_MS = 24 * 60 * 60 * 1000;

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export function checkRateLimit(ip: string, limit = DEFAULT_LIMIT): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
  limit: number;
} {
  const now = Date.now();
  const cur = store.get(ip);
  if (!cur || cur.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: limit - 1, resetIn: WINDOW_MS, limit };
  }
  if (cur.count >= limit) {
    return { allowed: false, remaining: 0, resetIn: cur.resetAt - now, limit };
  }
  cur.count += 1;
  return { allowed: true, remaining: limit - cur.count, resetIn: cur.resetAt - now, limit };
}

export function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "anon";
}
