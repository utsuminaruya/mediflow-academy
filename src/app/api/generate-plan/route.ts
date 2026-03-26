import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  const { profile } = await req.json();

  const { nationality, level, goals, freeText } = profile;

  const goalLabels: Record<string, string> = {
    jlpt: 'JLPT合格',
    care: '介護の仕事',
    daily: '日常会話',
    qualification: '資格取得',
  };

  const goalsText = (goals as string[]).map((g: string) => goalLabels[g] || g).join('、');

  const prompt = `以下の学習者プロフィールに基づいて、詳細でパーソナライズされた日本語学習計画をJSONで作成してください。

学習者情報:
- 国籍: ${nationality}
- 現在のJLPTレベル: ${level === 'none' ? '初学者（日本語未経験）' : level}
- 学習目標: ${goalsText}
- 本人からのメッセージ: ${freeText}

以下のJSON形式で学習計画を作成してください（日本語で記述）:
{
  "summary": "この学習者への総合コメント（2-3文）",
  "targetLevel": "推奨目標レベル（例: N4）",
  "estimatedMonths": 推定学習期間（月数、整数）,
  "dailyMinutes": 推奨1日学習時間（分数、整数）,
  "phases": [
    {
      "phase": 1,
      "title": "フェーズのタイトル",
      "duration": "期間（例: 1〜2ヶ月目）",
      "focus": ["重点項目1", "重点項目2", "重点項目3"],
      "milestone": "このフェーズの達成目標",
      "tips": "具体的な学習アドバイス"
    }
  ],
  "recommendedCourses": ["推奨コース1", "推奨コース2", "推奨コース3"],
  "careerAdvice": "キャリアに関するアドバイス（2文）",
  "motivationalMessage": "応援メッセージ（1文、絵文字を含む）"
}

必ずJSONのみを返してください。説明文は不要です。`;

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`));
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
