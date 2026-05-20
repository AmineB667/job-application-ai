import { NextRequest, NextResponse } from "next/server";
import { deepseekJSON } from "@/lib/deepseek";
import { buildAnalysisPrompt, type AnalyzeInput } from "@/lib/prompts";
import type { AnalysisResult } from "@/lib/types";
import { checkRateLimit, getIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyzeInput;
    if (!body.cvText || !body.jobOffer) {
      return NextResponse.json(
        { error: "cvText and jobOffer are required." },
        { status: 400 }
      );
    }

    // Rate limit only when the user did NOT bring their own key.
    const userKey = body.apiKey?.trim();
    if (!userKey) {
      const ip = getIp(req);
      const rl = checkRateLimit(ip);
      if (!rl.allowed) {
        const hours = Math.ceil(rl.resetIn / (60 * 60 * 1000));
        return NextResponse.json(
          {
            error: `Daily free quota reached (${rl.limit}/day per IP). Reset in ~${hours}h. Paste your own DeepSeek API key in Settings for unlimited use — it's free to create at platform.deepseek.com/api_keys.`,
            quotaReached: true,
          },
          { status: 429 }
        );
      }
    }

    const { system, user } = buildAnalysisPrompt(body);
    const result = await deepseekJSON<AnalysisResult>(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      { temperature: 0.5, maxTokens: 6000, apiKeyOverride: userKey ?? null }
    );

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Analysis error" },
      { status: 500 }
    );
  }
}
