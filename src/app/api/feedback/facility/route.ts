import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get('matchId');
  const period = searchParams.get('period');

  if (!matchId || !period) {
    return NextResponse.json({ error: 'Invalid link' }, { status: 400 });
  }

  const periodLabels: Record<string, string> = {
    '1week': '1週間後',
    '1month': '1ヶ月後',
    '3months': '3ヶ月後',
    '6months': '6ヶ月後',
  };

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mediflow 採用後フィードバック</title>
  <style>
    body { font-family: 'Hiragino Sans', sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; color: #1a1a1a; }
    h1 { color: #1e40af; font-size: 1.3rem; }
    label { display: block; margin-top: 16px; font-weight: 600; font-size: 0.9rem; color: #374151; }
    input[type=number], textarea { width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; margin-top: 4px; font-size: 1rem; }
    textarea { height: 80px; resize: vertical; }
    .checkbox-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    button { margin-top: 24px; width: 100%; padding: 12px; background: #1e40af; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
    button:hover { background: #1e3a8a; }
    .hint { font-size: 0.8rem; color: #6b7280; margin-top: 2px; }
  </style>
</head>
<body>
  <h1>採用後評価フォーム（${periodLabels[period] ?? period}）</h1>
  <p style="color:#6b7280;font-size:0.9rem;">Mediflowからご紹介した方の評価をお聞かせください。今後のマッチング精度向上に活用します。</p>
  <form method="POST" action="/api/feedback/facility">
    <input type="hidden" name="matchId" value="${matchId}">
    <input type="hidden" name="period" value="${period}">

    <label>日本語能力 (1〜5)</label>
    <p class="hint">1: 業務に支障あり ／ 3: 概ね問題なし ／ 5: 非常に流暢</p>
    <input type="number" name="japanese_ability_rating" min="1" max="5" required>

    <label>介護スキル (1〜5)</label>
    <p class="hint">1: 基礎が不足 ／ 3: 標準的 ／ 5: 即戦力</p>
    <input type="number" name="care_skill_rating" min="1" max="5" required>

    <label>勤務態度 (1〜5)</label>
    <p class="hint">1: 問題あり ／ 3: 普通 ／ 5: 非常に積極的</p>
    <input type="number" name="attitude_rating" min="1" max="5" required>

    <label>チームへの馴染み (1〜5)</label>
    <p class="hint">1: なかなか馴染めない ／ 5: すぐに溶け込んだ</p>
    <input type="number" name="team_fit_rating" min="1" max="5" required>

    <label>特に優れていた点</label>
    <textarea name="strengths" placeholder="例: 介護用語の理解が早く、入居者への声かけが丁寧"></textarea>

    <label>改善が望まれる点</label>
    <textarea name="areas_for_improvement" placeholder="例: 書類記入のスピードをもう少し上げてほしい"></textarea>

    <div class="checkbox-row">
      <input type="checkbox" name="would_recommend_mediflow" id="recommend">
      <label for="recommend" style="margin-top:0;">Mediflowを他施設にも推薦したい</label>
    </div>

    <div class="checkbox-row">
      <input type="checkbox" name="still_employed" id="employed" checked>
      <label for="employed" style="margin-top:0;">現在も在籍中</label>
    </div>

    <button type="submit">送信する</button>
  </form>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const supabase = createServerClient();

    const { error } = await supabase.from('placement_feedback').insert({
      match_id: body.get('matchId') as string,
      feedback_period: body.get('period') as string,
      japanese_ability_rating: parseInt(body.get('japanese_ability_rating') as string),
      care_skill_rating: parseInt(body.get('care_skill_rating') as string),
      attitude_rating: parseInt(body.get('attitude_rating') as string),
      team_fit_rating: parseInt(body.get('team_fit_rating') as string),
      strengths: (body.get('strengths') as string) || null,
      areas_for_improvement: (body.get('areas_for_improvement') as string) || null,
      would_recommend_mediflow: body.get('would_recommend_mediflow') === 'on',
      still_employed: body.get('still_employed') === 'on',
    });

    if (error) throw error;

    const html = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>送信完了</title>
    <style>body{font-family:'Hiragino Sans',sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#1a1a1a;}
    h1{color:#1e40af;}p{color:#6b7280;}</style></head>
    <body><h1>ありがとうございました</h1><p>フィードバックを受け付けました。<br>今後のマッチング精度向上に活用させていただきます。</p></body></html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
