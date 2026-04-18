import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(request: Request) {
  try {
    const { matchId } = await request.json();
    if (!matchId) return NextResponse.json({ error: 'matchId required' }, { status: 400 });

    const supabase = createServerClient();
    const { data: match } = await supabase
      .from('matches')
      .select('*, candidate:candidates(*, academy_progress(*)), job:job_openings(*)')
      .eq('id', matchId)
      .single();

    if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });

    const { candidate, job } = match;
    const progress = candidate.academy_progress;

    const qualifications = [
      candidate.has_kaigofukushishi && '介護福祉士',
      candidate.has_jitsumusya_kensyu && '実務者研修',
      candidate.has_shoninsha_kensyu && '初任者研修',
    ].filter(Boolean).join('、') || 'なし';

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `以下の候補者と求人情報を元に、${job.facility_name}様向けの採用推薦レポートを日本語で作成してください。

## 候補者
- 氏名: ${candidate.full_name} / 国籍: ${candidate.nationality}
- 在留資格: ${candidate.visa_status} / JLPTレベル: ${candidate.jlpt_level || '未取得'}
- 介護経験: ${candidate.care_experience_months}ヶ月 / 保有資格: ${qualifications}

## Academy学習実績
- N5完了率: ${progress?.n5_completion_rate ?? 0}% / N4完了率: ${progress?.n4_completion_rate ?? 0}% / N3完了率: ${progress?.n3_completion_rate ?? 0}%
- 介護専門用語習得数: ${progress?.kaigo_vocabulary_mastered ?? 0}語
- 介護シナリオ完了数: ${progress?.kaigo_scenario_completed ?? 0}件
- N3模擬試験スコア: ${progress?.n3_mock_score ?? '未受験'}点
- 連続学習日数: ${progress?.consecutive_study_days ?? 0}日 / 総学習時間: ${Math.round((progress?.total_study_minutes ?? 0) / 60)}時間

## AIマッチングスコア
- 総合: ${match.overall_score}点 / 100点 / 納品プラン: ${match.delivery_plan}

## レポート構成（この順で書いてください）
1. 推薦のポイント（3-4文）
2. 学習エビデンス（Academyデータを具体的数値で引用）
3. 入職後の活躍予測
4. 面接で確認を推奨する点（1-2点）

読み手は介護施設の採用担当者です。数値を使い、信頼感を与える文体で書いてください。`,
        },
      ],
    });

    const reportText = message.content[0].type === 'text' ? message.content[0].text : '';

    const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>採用推薦レポート - ${candidate.full_name}</title>
  <style>
    body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #1a1a1a; }
    h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px; font-size: 1.5rem; }
    h2 { color: #1e3a8a; margin-top: 24px; font-size: 1.1rem; }
    .score-box { background: #eff6ff; border-left: 4px solid #1e40af; padding: 12px 16px; margin: 16px 0; border-radius: 4px; }
    .score-value { font-size: 2rem; font-weight: bold; color: #1e40af; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; font-size: 0.9rem; }
    th { background: #eff6ff; font-weight: 600; }
    .report-body { white-space: pre-wrap; line-height: 1.9; margin-top: 8px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #64748b; }
    @media print { button { display: none; } }
  </style>
</head>
<body>
  <button onclick="window.print()" style="margin-bottom:16px;padding:8px 16px;background:#1e40af;color:white;border:none;border-radius:4px;cursor:pointer;">PDFとして印刷</button>
  <h1>採用推薦レポート</h1>
  <p style="color:#64748b;font-size:0.9rem;">発行日: ${new Date().toLocaleDateString('ja-JP')} | 宛先: ${job.facility_name} 採用担当者様 | 発行元: Mediflow株式会社</p>

  <div class="score-box">
    <div style="font-size:0.85rem;color:#64748b;">AIマッチングスコア</div>
    <div class="score-value">${match.overall_score}<span style="font-size:1rem;color:#64748b;">点 / 100点</span></div>
    <div style="margin-top:4px;">納品プラン: <strong>${match.delivery_plan}</strong></div>
  </div>

  <h2>候補者プロフィール: ${candidate.full_name} 様</h2>
  <table>
    <tr><th>国籍</th><td>${candidate.nationality}</td><th>在留資格</th><td>${candidate.visa_status}</td></tr>
    <tr><th>JLPTレベル</th><td>${candidate.jlpt_level || '未取得'}</td><th>介護経験</th><td>${candidate.care_experience_months}ヶ月</td></tr>
    <tr><th>保有資格</th><td colspan="3">${qualifications}</td></tr>
  </table>

  <h2>Academy学習エビデンス</h2>
  <table>
    <tr><th>N3模擬試験</th><td>${progress?.n3_mock_score ?? '未受験'}点</td><th>介護専門用語習得</th><td>${progress?.kaigo_vocabulary_mastered ?? 0}語</td></tr>
    <tr><th>介護シナリオ完了</th><td>${progress?.kaigo_scenario_completed ?? 0}件</td><th>連続学習日数</th><td>${progress?.consecutive_study_days ?? 0}日</td></tr>
    <tr><th>総学習時間</th><td>${Math.round((progress?.total_study_minutes ?? 0) / 60)}時間</td><th>N3完了率</th><td>${progress?.n3_completion_rate ?? 0}%</td></tr>
  </table>

  <h2>推薦レポート</h2>
  <div class="report-body">${reportText}</div>

  <div class="footer">
    本レポートはMediflow AIシステムにより生成されました。<br>
    お問い合わせ: Mediflow株式会社 | ${process.env.NEXT_PUBLIC_APP_URL}
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({ error: 'Report generation failed' }, { status: 500 });
  }
}
