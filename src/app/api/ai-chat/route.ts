import { NextRequest, NextResponse } from 'next/server';
import { streamChat, type ChatMessage } from '@/lib/ai/claude';

export const runtime = 'edge';

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

    // Check daily limit for free users (in production, verify from Supabase)
    // This is a simplified check - in production you'd query the database
    // const userId = body.userId;
    // if (userId) {
    //   const count = await getDailyMessageCount(userId);
    //   if (count >= 5) {
    //     return NextResponse.json({ error: 'Daily limit reached', code: 'LIMIT_REACHED' }, { status: 429 });
    //   }
    // }

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
