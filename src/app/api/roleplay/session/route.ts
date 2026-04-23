import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// POST: セッション作成
export async function POST(req: Request) {
  try {
    const { scenarioId } = await req.json();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response('Unauthorized', { status: 401 });

    // プラン取得
    const { data: profile } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single();

    const plan = profile?.plan || 'free';

    // シナリオのプラン要件チェック
    const { data: scenario } = await supabase
      .from('roleplay_scenarios')
      .select('required_plan, title')
      .eq('id', scenarioId)
      .single();

    if (!scenario) return new Response('Scenario not found', { status: 404 });

    const planOrder = { free: 0, basic: 1, pro: 2 };
    if ((planOrder[scenario.required_plan as keyof typeof planOrder] ?? 0) > (planOrder[plan as keyof typeof planOrder] ?? 0)) {
      return NextResponse.json({ error: 'plan_required', required_plan: scenario.required_plan }, { status: 403 });
    }

    // 1日の制限チェック
    const { data: todayCount } = await supabase
      .rpc('count_today_sessions', { p_user_id: user.id });

    const dailyLimit = plan === 'free' ? 1 : plan === 'basic' ? 3 : Infinity;
    if ((todayCount ?? 0) >= dailyLimit) {
      return NextResponse.json({ error: 'daily_limit_reached', limit: dailyLimit }, { status: 429 });
    }

    // セッション作成
    const { data: session, error } = await supabase
      .from('roleplay_sessions')
      .insert({
        user_id: user.id,
        scenario_id: scenarioId,
        messages: [],
        turn_count: 0,
        status: 'in_progress',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(session);
  } catch (error) {
    console.error('Session create error:', error);
    return new Response('Internal error', { status: 500 });
  }
}
