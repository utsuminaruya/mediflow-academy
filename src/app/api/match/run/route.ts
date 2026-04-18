import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export const maxDuration = 300;
import type { Candidate, JobOpening, Match, MatchAIResult } from '@/lib/types';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const MATCHING_SYSTEM_PROMPT = `あなたはMediflow株式会社のAI人材マッチングエンジンです。
外国人介護人材と日本の介護施設求人の最適マッチングを行います。

Mediflowは単なる人材紹介ではなく、「AIマッチング → Academy教育 → 即戦力納品」の
垂直統合サービスを提供しています。そのため、候補者が現時点で即戦力でなくても、
Academyでの育成計画込みで納品タイミングを提案する必要があります。

## マッチング評価基準（配点100点満点）

### 1. スキル適合度（30点満点）
- 資格マッチ（15点）: 求人の必須資格を候補者が保有しているか
- 経験マッチ（10点）: 求人の必須経験月数を満たしているか
- 日本語力現在値（5点）: 現在のJLPTレベルが求人要件以上か

### 2. 立地適合度（25点満点）
- 通勤可能性（15点）: 候補者の現住所/駅から施設への通勤が現実的か
  - 同一市区町村 → 15点 / 隣接市区町村 → 12点 / 同一県内30分圏内 → 8点
  - 県をまたぐが60分以内 → 4点 / 60分超 → 0点
  - 海外在住候補者（current_country != 'japan'）は施設の住居サポート有無で判定
- 希望エリアマッチ（10点）: 候補者の希望勤務エリアに施設が含まれるか

### 3. 希望条件適合度（20点満点）
- 施設タイプ一致（7点）
- 給与条件一致（7点）: 求人給与が希望最低月給以上
- シフト・その他条件（6点）

### 4. 納品準備完了度（25点満点）
- 現在の学習到達度（10点）: JLPT現在レベル + Academy進捗率
- 目標到達までの期間（10点）: 3ヶ月以内→10点 / 6ヶ月→6点 / 12ヶ月→3点 / 12ヶ月超→0点
- 学習継続性（5点）: 連続学習日数、週次学習時間から評価

## 在留資格の必須チェック（不適合なら即0点）
- 求人がaccepts_tokutei_gino = falseで候補者が特定技能 → 即0点
- 求人がaccepts_pre_entry = falseで候補者がcurrent_country != 'japan' → 即0点

## 出力フォーマット（JSONのみ。説明文不要）
{
  "overall_score": <0-100>,
  "skill_score": <0-30>,
  "location_score": <0-25>,
  "preference_score": <0-20>,
  "readiness_score": <0-25>,
  "reasoning": "<3-5文>",
  "recommendation": "<施設向け推薦コメント2-3文>",
  "concerns": "<懸念事項。なければ「特になし」>",
  "delivery_plan": "<'即納品可能' | 'Academy Xヶ月育成後に納品' | '他候補者のほうが適切'>",
  "estimated_delivery_months": <0以上の整数>
}`;

export async function POST(request: Request) {
  try {
    const { candidateId, jobOpeningId, mode } = await request.json();

    if (mode === 'auto') return await runAutoMatch();
    if (mode === 'candidate_all' && candidateId) return await matchCandidateToAllJobs(candidateId);
    if (candidateId && jobOpeningId) {
      const result = await matchSingle(candidateId, jobOpeningId);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  } catch (error) {
    console.error('Matching error:', error);
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 });
  }
}

async function matchSingle(candidateId: string, jobOpeningId: string): Promise<Match> {
  const supabase = createServerClient();

  const [{ data: candidate }, { data: job }] = await Promise.all([
    supabase
      .from('candidates')
      .select('*, academy_progress(*)')
      .eq('id', candidateId)
      .single<Candidate & { academy_progress: import('@/lib/types').AcademyProgress | null }>(),
    supabase.from('job_openings').select('*').eq('id', jobOpeningId).single<JobOpening>(),
  ]);

  if (!candidate || !job) throw new Error('Candidate or job not found');

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: [{ type: 'text', text: MATCHING_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [
      {
        role: 'user',
        content: `以下の候補者と求人のマッチング評価をJSONのみで出力してください。

## 候補者情報
${JSON.stringify(candidate, null, 2)}

## 求人情報
${JSON.stringify(job, null, 2)}`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse AI response');
  const result: MatchAIResult = JSON.parse(jsonMatch[0]);

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setMonth(
    estimatedDeliveryDate.getMonth() + (result.estimated_delivery_months || 0)
  );

  const { data: match, error } = await supabase
    .from('matches')
    .upsert(
      {
        candidate_id: candidateId,
        job_opening_id: jobOpeningId,
        overall_score: result.overall_score,
        skill_score: result.skill_score,
        location_score: result.location_score,
        preference_score: result.preference_score,
        readiness_score: result.readiness_score,
        ai_reasoning: result.reasoning,
        ai_recommendation: result.recommendation,
        potential_concerns: result.concerns,
        delivery_plan: result.delivery_plan,
        estimated_delivery_date: estimatedDeliveryDate.toISOString().split('T')[0],
        status: 'suggested',
      },
      { onConflict: 'candidate_id,job_opening_id' }
    )
    .select()
    .single<Match>();

  if (error) throw error;
  return match!;
}

async function matchCandidateToAllJobs(candidateId: string) {
  const supabase = createServerClient();
  const { data: jobs } = await supabase.from('job_openings').select('id').eq('status', 'open');
  if (!jobs?.length) return NextResponse.json({ message: 'No open jobs' });

  const results: Match[] = [];
  for (const job of jobs) {
    results.push(await matchSingle(candidateId, job.id));
  }
  results.sort((a, b) => b.overall_score - a.overall_score);
  return NextResponse.json({ matches: results, total: results.length });
}

async function runAutoMatch() {
  const supabase = createServerClient();

  const [{ data: candidates }, { data: jobs }] = await Promise.all([
    supabase
      .from('candidates')
      .select('id')
      .in('status', ['active', 'in_training', 'ready_for_placement']),
    supabase.from('job_openings').select('id').eq('status', 'open'),
  ]);

  if (!candidates?.length || !jobs?.length) {
    return NextResponse.json({ message: 'No active candidates or open jobs' });
  }

  const { data: existingMatches } = await supabase
    .from('matches')
    .select('candidate_id, job_opening_id')
    .in('candidate_id', candidates.map((c) => c.id))
    .in('job_opening_id', jobs.map((j) => j.id));

  const existingSet = new Set(
    existingMatches?.map((m) => `${m.candidate_id}:${m.job_opening_id}`) ?? []
  );

  const newPairs = candidates.flatMap((c) =>
    jobs
      .filter((j) => !existingSet.has(`${c.id}:${j.id}`))
      .map((j) => ({ candidateId: c.id, jobId: j.id }))
  );

  if (!newPairs.length) return NextResponse.json({ message: 'All pairs already matched' });

  const BATCH_SIZE = 5;
  const topMatches: Match[] = [];
  let matchCount = 0;

  for (let i = 0; i < newPairs.length; i += BATCH_SIZE) {
    const batch = newPairs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((p) => matchSingle(p.candidateId, p.jobId)));
    matchCount += results.length;
    topMatches.push(...results.filter((r) => r.overall_score >= 70));
  }

  if (topMatches.length > 0) await notifyLineTopMatches(topMatches);

  return NextResponse.json({ message: `${matchCount} matches processed`, high_score_matches: topMatches.length });
}

async function notifyLineTopMatches(matches: Match[]) {
  const top5 = [...matches].sort((a, b) => b.overall_score - a.overall_score).slice(0, 5);
  const matchSummary = top5
    .map((m, i) => `${i + 1}. スコア${m.overall_score}点 / ${m.delivery_plan}`)
    .join('\n');

  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: process.env.LINE_ADMIN_USER_ID,
      messages: [
        {
          type: 'text',
          text: `AIマッチング完了\n\n高スコアマッチ ${matches.length}件:\n${matchSummary}\n\n詳細 → ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/matches`,
        },
      ],
    }),
  });
}
