// Client DeepSeek minimal — endpoint /chat/completions compatible OpenAI.
// Côté serveur uniquement (clé API jamais exposée).

const BASE_URL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ChatOptions = {
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  /** BYOK : si fournie, prime sur la variable d'environnement. */
  apiKeyOverride?: string | null;
};

export async function deepseekChat(messages: ChatMessage[], opts: ChatOptions = {}): Promise<string> {
  const apiKey = opts.apiKeyOverride?.trim() || process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("No DeepSeek API key available. Paste your own key in Settings or contact the admin.");

  const body: Record<string, unknown> = {
    model: MODEL,
    messages,
    temperature: opts.temperature ?? 0.4,
    max_tokens: opts.maxTokens ?? 4096,
    stream: false,
  };
  if (opts.jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek HTTP ${res.status}: ${errText.slice(0, 500)}`);
  }

  const json = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return json.choices[0]?.message?.content ?? "";
}

export async function deepseekJSON<T>(messages: ChatMessage[], opts: ChatOptions = {}): Promise<T> {
  const raw = await deepseekChat(messages, { ...opts, jsonMode: true });
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Récupération si le modèle entoure le JSON de markdown
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Réponse JSON invalide : ${raw.slice(0, 300)}`);
    return JSON.parse(match[0]) as T;
  }
}
