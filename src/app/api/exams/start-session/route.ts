import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { StartSessionRequest, StartSessionResponse, PracticeMode } from '@/types/exam';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: StartSessionRequest = await request.json();
    const { exam_id, mode, category_id, exam_year } = body;

    if (!exam_id || !mode) {
      return NextResponse.json({ error: 'exam_id and mode are required' }, { status: 400 });
    }

    // 試験情報取得
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .select('*')
      .eq('id', exam_id)
      .eq('is_active', true)
      .single();

    if (examError || !exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    // プランチェック
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single();

    const userPlan = (userData?.plan as string) || 'free';
    const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
    const requiredPlanOrder = planOrder[exam.required_plan] ?? 0;
    const userPlanOrder = planOrder[userPlan] ?? 0;

    if (userPlanOrder < requiredPlanOrder) {
      return NextResponse.json(
        { error: 'Plan upgrade required', required_plan: exam.required_plan },
        { status: 403 }
      );
    }

    // 問題IDの取得ロジック
    let questionIds: string[] = [];

    if (mode === 'mock_test') {
      // 全問取得
      const { data: questions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('exam_id', exam_id)
        .order('question_number');

      questionIds = (questions || []).map((q: { id: string }) => q.id);
    } else if (mode === 'year_based' && exam_year) {
      const { data: questions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('exam_id', exam_id)
        .eq('exam_year', exam_year)
        .order('question_number')
        .limit(10);

      questionIds = (questions || []).map((q: { id: string }) => q.id);
    } else if (mode === 'category_based' && category_id) {
      const { data: questions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('exam_id', exam_id)
        .eq('category_id', category_id)
        .order('question_number')
        .limit(10);

      questionIds = (questions || []).map((q: { id: string }) => q.id);
    } else if (mode === 'weak_points') {
      // 弱点カテゴリの問題を取得（正答率が低いカテゴリ優先）
      const { data: answeredData } = await supabase
        .from('exam_answers')
        .select('question_id, is_correct')
        .eq('user_id', user.id);

      const answeredMap: Record<string, { total: number; correct: number }> = {};
      for (const ans of answeredData || []) {
        const qId = ans.question_id as string;
        if (!answeredMap[qId]) answeredMap[qId] = { total: 0, correct: 0 };
        answeredMap[qId].total++;
        if (ans.is_correct) answeredMap[qId].correct++;
      }

      // 正答率が低い問題IDを優先
      const weakQuestionIds = Object.entries(answeredMap)
        .filter(([, stats]) => stats.total > 0 && stats.correct / stats.total < 0.6)
        .sort(([, a], [, b]) => a.correct / a.total - b.correct / b.total)
        .slice(0, 10)
        .map(([id]) => id);

      if (weakQuestionIds.length > 0) {
        const { data: questions } = await supabase
          .from('exam_questions')
          .select('id')
          .eq('exam_id', exam_id)
          .in('id', weakQuestionIds);

        questionIds = (questions || []).map((q: { id: string }) => q.id);
      }

      // 弱点が足りない場合はランダムで補充
      if (questionIds.length < 10) {
        const { data: fillQuestions } = await supabase
          .from('exam_questions')
          .select('id')
          .eq('exam_id', exam_id)
          .not('id', 'in', `(${questionIds.map(id => `'${id}'`).join(',') || "''"})`)
          .limit(10 - questionIds.length);

        questionIds = [...questionIds, ...(fillQuestions || []).map((q: { id: string }) => q.id)];
      }
    } else {
      // フォールバック: ランダム10問
      const { data: questions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('exam_id', exam_id)
        .limit(10);

      questionIds = (questions || []).map((q: { id: string }) => q.id);
    }

    if (questionIds.length === 0) {
      return NextResponse.json({ error: 'No questions found for this exam' }, { status: 404 });
    }

    // セッション作成
    const timeLimitSeconds = mode === 'mock_test' ? exam.time_limit_minutes * 60 : null;

    const { data: session, error: sessionError } = await supabase
      .from('exam_practice_sessions')
      .insert({
        user_id: user.id,
        exam_id,
        mode: mode as PracticeMode,
        category_id: category_id || null,
        exam_year: exam_year || null,
        status: 'in_progress',
        total_questions: questionIds.length,
        answered_questions: 0,
        correct_answers: 0,
        time_limit_seconds: timeLimitSeconds,
        time_spent_seconds: 0,
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    const response: StartSessionResponse = {
      session,
      questionIds,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Start session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
