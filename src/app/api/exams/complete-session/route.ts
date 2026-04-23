import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { CompleteSessionRequest, CompleteSessionResponse } from '@/types/exam';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CompleteSessionRequest = await request.json();
    const { session_id, time_spent_seconds } = body;

    if (!session_id) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
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
      return NextResponse.json({ error: 'Session is already completed' }, { status: 400 });
    }

    // 試験情報を取得してパス判定
    const { data: exam } = await supabase
      .from('exams')
      .select('passing_score_percent')
      .eq('id', session.exam_id)
      .single();

    const passingScorePercent = exam?.passing_score_percent ?? 60;
    const scorePercent =
      session.total_questions > 0
        ? Math.round((session.correct_answers / session.total_questions) * 100)
        : 0;
    const passed = scorePercent >= passingScorePercent;

    // セッション完了
    const { data: updatedSession, error: updateError } = await supabase
      .from('exam_practice_sessions')
      .update({
        status: 'completed',
        time_spent_seconds: time_spent_seconds || 0,
        completed_at: new Date().toISOString(),
      })
      .eq('id', session_id)
      .select()
      .single();

    if (updateError || !updatedSession) {
      return NextResponse.json({ error: 'Failed to complete session' }, { status: 500 });
    }

    const response: CompleteSessionResponse = {
      session: updatedSession,
      score_percent: scorePercent,
      passed,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Complete session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
