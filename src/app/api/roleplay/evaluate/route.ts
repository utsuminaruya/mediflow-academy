import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import { buildEvaluationPrompt } from '@/lib/roleplay/prompts';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
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

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildEvaluationPrompt({
      scenario: session.roleplay_scenarios,
      conversationHistory: session.messages,
      userLanguage: profile?.native_language || 'vi',
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return new Response('Invalid AI response', { status: 500 });
    }

    const jsonText = textContent.text.replace(/```json\n?|\n?```/g, '').trim();
    const evaluation = JSON.parse(jsonText);

    await supabase
      .from('roleplay_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        total_score: evaluation.total_score,
        scores_breakdown: evaluation.scores_breakdown,
        feedback: {
          good_points: evaluation.good_points,
          improvement_points: evaluation.improvement_points,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    // XP加算
    const xpReward = Math.floor(evaluation.total_score / 2);
    try {
      await supabase.rpc('increment_user_xp', { p_user_id: user.id, p_xp: xpReward });
    } catch {
      // XP加算失敗は無視
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Roleplay evaluate error:', error);
    return new Response('Internal error', { status: 500 });
  }
}
