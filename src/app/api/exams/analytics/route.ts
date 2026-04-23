import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const exam_id = searchParams.get('exam_id');

    if (!exam_id) return NextResponse.json({ error: 'exam_id required' }, { status: 400 });

    // セッション統計
    const { data: sessions } = await supabase
      .from('exam_practice_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('exam_id', exam_id)
      .order('started_at', { ascending: false });

    const completedSessions = (sessions || []).filter(s => s.status === 'completed');
    const totalAnswered = completedSessions.reduce((sum, s) => sum + s.answered_questions, 0);
    const totalCorrect = completedSessions.reduce((sum, s) => sum + s.correct_answers, 0);
    const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    // カテゴリ別正答率
    const { data: categories } = await supabase
      .from('exam_categories')
      .select('*')
      .eq('exam_id', exam_id)
      .order('sort_order');

    const categoryAnalytics = [];
    for (const cat of categories || []) {
      const { data: catQuestions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('category_id', cat.id);

      const qIds = (catQuestions || []).map((q: { id: string }) => q.id);

      if (qIds.length === 0) continue;

      const { data: answers } = await supabase
        .from('exam_answers')
        .select('is_correct')
        .eq('user_id', user.id)
        .in('question_id', qIds);

      const total = (answers || []).length;
      const correct = (answers || []).filter(a => a.is_correct).length;

      categoryAnalytics.push({
        category_id: cat.id,
        category_title: cat.title,
        total_answered: total,
        correct_answers: correct,
        accuracy_percent: total > 0 ? Math.round((correct / total) * 100) : 0,
      });
    }

    return NextResponse.json({
      total_sessions: completedSessions.length,
      total_answered: totalAnswered,
      overall_accuracy: overallAccuracy,
      category_analytics: categoryAnalytics,
      recent_sessions: (sessions || []).slice(0, 5),
    });
  } catch (err) {
    console.error('Analytics error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
