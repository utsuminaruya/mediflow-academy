import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildTutorSystemPrompt } from "@/lib/ai/tutor-system-prompt";

// Edge runtimeは next/headers 非対応のため nodejs を使用
// （supabase/server.ts が cookies() を使うため）

/** 1メッセージあたりの最大文字数 */
const MAX_MESSAGE_LENGTH = 2000;
/** 会話の最大メッセージ数 */
const MAX_MESSAGES = 40;

export async function POST(request: NextRequest) {
  try {
    // ===========================
    // 認証チェック（オプション）
    // AI家庭教師は無料プランでも利用可能（5回/日制限はアプリ層で管理）
    // Supabase 未設定時はゲスト扱いで続行
    // ===========================
    let _userId: string | null = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      _userId = user?.id ?? null;
    } catch {
      _userId = null;
    }

    // ===========================
    // 入力バリデーション
    // ===========================
    let body: { messages?: unknown; userProfile?: unknown };
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages, userProfile } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages フィールドが必要です" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // メッセージ数制限
    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "メッセージ数が多すぎます" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // メッセージの形式と文字数チェック
    const validMessages = messages.filter(
      (m): m is MessageParam =>
        m !== null &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    );

    for (const m of validMessages) {
      if (typeof m.content === "string" && m.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(
          JSON.stringify({ error: `メッセージが長すぎます（最大 ${MAX_MESSAGE_LENGTH} 文字）` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (validMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "有効なメッセージがありません" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ===========================
    // userProfile の安全な取り出し
    // ===========================
    const profile =
      userProfile !== null && typeof userProfile === "object" ? userProfile as Record<string, unknown> : {};

    // ===========================
    // Anthropic ストリーミング
    // ===========================
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemPrompt = buildTutorSystemPrompt({
      nativeLanguage: typeof profile.nativeLanguage === "string" ? profile.nativeLanguage : "vi",
      japaneseLevel: typeof profile.japaneseLevel === "string" ? profile.japaneseLevel : "N5",
      currentCourse: typeof profile.currentCourse === "string" ? profile.currentCourse : undefined,
      currentLesson: typeof profile.currentLesson === "string" ? profile.currentLesson : undefined,
    });

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: validMessages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            const data = `data: ${JSON.stringify(event)}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Tutor API error:", error);
    return new Response(
      JSON.stringify({ error: "サーバーエラーが発生しました" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
