import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import { buildExamChatPrompt } from '@/lib/exams/prompts';
import type { ExamQuestion } from '@/types/exam';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { question_id, user_message, locale = 'ja' } = await request.json();
    if (!question_id || !user_message) {
      return NextResponse.json({ error: 'question_id and user_message required' }, { status: 400 });
    }

    // 問題取得
    const { data: question, error } = await supabase
      .from('exam_questions')
      .select('*')
      .eq('id', question_id)
      .single();

    if (error || !question) return NextResponse.json({ error: 'Question not found' }, { status: 404 });

    // チャット履歴取得
    const { data: history } = await supabase
      .from('exam_ai_chat_history')
      .select('role, content')
      .eq('user_id', user.id)
      .eq('question_id', question_id)
      .order('created_at', { ascending: true })
      .limit(20);

    const chatHistory = (history || []) as { role: 'user' | 'assistant'; content: string }[];

    // ユーザーメッセージ保存
    await supabase.from('exam_ai_chat_history').insert({
      user_id: user.id,
      question_id,
      role: 'user',
      content: user_message,
    });

    const { system, messages } = buildExamChatPrompt(
      question as ExamQuestion,
      locale,
      [...chatHistory, { role: 'user', content: user_message }]
    );

    const anthropic = new Anthropic();
    const encoder = new TextEncoder();
    let fullResponse = '';

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: 'claude-opus-4-5',
            max_tokens: 800,
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

          // AI応答保存
          await supabase.from('exam_ai_chat_history').insert({
            user_id: user.id,
            question_id,
            role: 'assistant',
            content: fullResponse,
          });

          // asked_aiフラグ更新
          await supabase
            .from('exam_answers')
            .update({ asked_ai: true })
            .eq('user_id', user.id)
            .eq('question_id', question_id);

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error('AI chat stream error:', err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`));
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
  } catch (err) {
    console.error('AI chat error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
