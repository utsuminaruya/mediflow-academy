import { NextRequest, NextResponse } from 'next/server';
import { streamChat, type ChatMessage } from '@/lib/ai/claude';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

interface ChatRequest {
  messages: ChatMessage[];
  userProfile?: {
    nativeLanguage?: string;
    currentLevel?: string;
    targetLevel?: string;
    visaType?: string;
  };
  userId?: string;
}

export async function POST(request: NextRequest) {
  // ANTHROPIC_API_KEY確認
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'AI service is not configured. Please set ANTHROPIC_API_KEY.' },
      { status: 503 }
    );
  }

  try {
    const body: ChatRequest = await request.json();
    const { messages, userProfile } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Validate messages
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: 'Invalid message format' },
          { status: 400 }
        );
      }
      if (!['user', 'assistant'].includes(msg.role)) {
        return NextResponse.json(
          { error: 'Invalid message role' },
          { status: 400 }
        );
      }
    }

    // サーバーサイドで認証・プラン・レート制限チェック
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // プラン取得
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single();

    const plan = (userData?.plan as 'free' | 'basic' | 'pro') || 'free';

    // 無料プランは1日5メッセージまで（Asia/Tokyo基準）
    if (plan === 'free') {
      const now = new Date();
      const tokyoOffsetMs = 9 * 60 * 60 * 1000;
      const tokyoNow = new Date(now.getTime() + tokyoOffsetMs);
      const todayTokyo = tokyoNow.toISOString().slice(0, 10);

      const { count } = await supabase
        .from('ai_message_logs')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('message_date', todayTokyo);

      if ((count || 0) >= 5) {
        return NextResponse.json(
          { error: 'Daily limit reached', code: 'LIMIT_REACHED' },
          { status: 429 }
        );
      }

      // カウント加算（ストリーム開始前に記録）
      await supabase.from('ai_message_logs').insert({
        user_id: user.id,
        message_date: todayTokyo,
      });
    }

    const stream = await streamChat(messages, userProfile);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
