import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export const maxDuration = 60;
import type { ReadinessAIResult } from '@/lib/types';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const READINESS_PROMPT = `あなたはMediflow Academyの学習評価AIです。
候補者の学習進捗データから、日本の介護施設に「即戦力として納品可能か」を0-100で評価してください。

## 評価観点
1. 日本語能力（40点）: JLPTレベル + Academy完了率
2. 介護専門知識（30点）: 介護用語習得数 + シナリオ完了数 + 模擬試験スコア
3. 学習継続性・姿勢（20点）: 連続学習日数、学習時間、Medi先生の評価
4. 基本情報（10点）: 資格、実務経験

## 出力（JSONのみ）
{
  "readiness_score": <0-100>,
  "japanese_subscore": <0-40>,
  "care_knowledge_subscore": <0-30>,
  "consistency_subscore": <0-20>,
  "basics_subscore": <0-10>,
  "assessment": "<現状評価を3文で>",
  "next_milestone": "<次に達成すべき具体的目標>",
  "months_to_ready": <納品準備完了までの月数。既に準備OKなら0>
}`;

export async function POST(request: Request) {
  try {
    const { candidateId } = await request.json();
    if (!candidateId) {
      return NextResponse.json({ error: 'candidateId is required' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data: candidate } = await supabase
      .from('candidates')
      .select('*, academy_progress(*)')
      .eq('id', candidateId)
      .single();

    if (!candidate) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: [{ type: 'text', text: READINESS_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [
        {
          role: 'user',
          content: `以下の候補者の納品準備完了度をJSONのみで出力してください。\n\n${JSON.stringify(candidate, null, 2)}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const result: ReadinessAIResult = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || '{}');

    const newStatus =
      result.readiness_score >= 70
        ? 'ready_for_placement'
        : candidate.academy_enrolled_at
        ? 'in_training'
        : 'active';

    await supabase
      .from('candidates')
      .update({
        readiness_score: result.readiness_score,
        readiness_last_calculated_at: new Date().toISOString(),
        status: newStatus,
      })
      .eq('id', candidateId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Readiness calculation error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
