import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { SubmitAnswerRequest, SubmitAnswerResponse } from '@/types/exam';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SubmitAnswerRequest = await request.json();
    const { session_id, question_id, selected_answer, time_spent_seconds } = body;

    if (!session_id || !question_id || selected_answer === undefined) {
      return NextResponse.json({ error: 'session_id, question_id, and selected_answer are required' }, { status: 400 });
    }

    // セッション確認
    const { data: session, error: sessionError } = await supabase
      .from('exam_practice_sessions')
      .select('*')
      .eq('id', session_id)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (session.status !== 'in_progress') {
      return NextResponse.json({ error: 'Session is not in progress' }, { status: 400 });
    }

    // 問題取得
    const { data: question, error: questionError } = await supabase
      .from('exam_questions')
      .select('*')
      .eq('id', question_id)
      .single();

    if (questionError || !question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // 正誤判定
    const isCorrect = selected_answer === question.correct_answer;

    // 回答を保存
    const { data: answer, error: answerError } = await supabase
      .from('exam_answers')
      .insert({
        session_id,
        user_id: user.id,
        question_id,
        selected_answer,
        is_correct: isCorrect,
        time_spent_seconds: time_spent_seconds || 0,
        asked_ai: false,
        answered_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (answerError || !answer) {
      return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
    }

    // セッションの進捗を更新
    await supabase
      .from('exam_practice_sessions')
      .update({
        answered_questions: session.answered_questions + 1,
        correct_answers: isCorrect ? session.correct_answers + 1 : session.correct_answers,
      })
      .eq('id', session_id);

    const response: SubmitAnswerResponse = {
      is_correct: isCorrect,
      correct_answer: question.correct_answer,
      explanation: question.explanation,
      answer,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Submit answer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
