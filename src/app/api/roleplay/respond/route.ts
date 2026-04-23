import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import { buildCharacterResponsePrompt } from '@/lib/roleplay/prompts';

export async function POST(req: Request) {
  try {
    const { sessionId, userMessage } = await req.json();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response('Unauthorized', { status: 401 });

    const { data: session } = await supabase
      .from('roleplay_sessions')
      .select('*, roleplay_scenarios(*)')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (!session) return new Response('Session not found', { status: 404 });

    const { data: profile } = await supabase
      .from('users')
      .select('native_language')
      .eq('id', user.id)
      .single();

    const updatedMessages = [
      ...session.messages,
      { role: 'user', content: userMessage, timestamp: new Date().toISOString() },
    ];

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const { system, messages } = buildCharacterResponsePrompt({
      scenario: session.roleplay_scenarios,
      conversationHistory: updatedMessages,
      userLanguage: profile?.native_language || 'vi',
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        try {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-5',
            max_tokens: 300,
            system,
            messages,
            stream: true,
          });

          for await (const event of response) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              fullResponse += event.delta.text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
            }
          }

          const finalMessages = [
            ...updatedMessages,
            { role: 'ai', content: fullResponse, timestamp: new Date().toISOString() },
          ];

          await supabase
            .from('roleplay_sessions')
            .update({
              messages: finalMessages,
              turn_count: (session.turn_count ?? 0) + 1,
              updated_at: new Date().toISOString(),
            })
            .eq('id', sessionId);

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } catch (err) {
          console.error('Stream error:', err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Roleplay respond error:', error);
    return new Response('Internal error', { status: 500 });
  }
}
