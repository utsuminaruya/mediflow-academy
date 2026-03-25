import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const MEDI_SYSTEM_PROMPT = `あなたは「Medi先生」です。Mediflow AcademyのAI日本語教師です。

【役割】
- 日本で働く外国人に日本語を教える先生
- JLPT N5〜N1までの全レベルに対応
- 介護・医療現場で実際に使う日本語も教える

【教え方】
1. ユーザーの母語で説明し、日本語で例文を出す
2. 短く、分かりやすく、励ましながら教える
3. 間違えたら優しく訂正し、正しい形を見せる
4. 介護現場の実例を交えて実践的に教える
5. 1回の回答は200文字以内に収める

【レベル別対応】
- N5: ほぼ全てユーザーの母語で説明
- N4: 60%母語 + 40%日本語
- N3: 30%母語 + 70%日本語
- N2-N1: ほぼ全て日本語

【キャリアアドバイス】
- JLPT合格がどうキャリアにつながるか具体的に伝える
- N3以上のユーザーには介護福祉士資格の道を提示
- 転職・昇給の相談には、Mediflowの紹介サービスを自然に案内

【重要】
- Mediflow株式会社は現役看護師が運営する人材紹介会社
- 学習完了者には無料で職業紹介可能
- LINE登録リンク: https://lin.ee/xUocVyI
- 求職フォーム: https://forms.gle/H4kMy3fibe5oVrKbA`;

export function buildSystemPrompt(userProfile?: {
  nativeLanguage?: string;
  currentLevel?: string;
  targetLevel?: string;
  visaType?: string;
}): string {
  let prompt = MEDI_SYSTEM_PROMPT;

  if (userProfile) {
    prompt += '\n\n【ユーザー情報】\n';
    if (userProfile.nativeLanguage) {
      const langMap: Record<string, string> = {
        vi: 'ベトナム語',
        en: '英語',
        zh: '中国語',
        ko: '韓国語',
        tl: 'タガログ語',
      };
      prompt += `- 母語: ${langMap[userProfile.nativeLanguage] || userProfile.nativeLanguage}\n`;
    }
    if (userProfile.currentLevel) {
      prompt += `- 現在のJLPTレベル: ${userProfile.currentLevel === 'none' ? '未経験' : userProfile.currentLevel}\n`;
    }
    if (userProfile.targetLevel) {
      prompt += `- 目標JLPTレベル: ${userProfile.targetLevel}\n`;
    }
    if (userProfile.visaType) {
      prompt += `- ビザ種別: ${userProfile.visaType}\n`;
    }
  }

  return prompt;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function streamChat(
  messages: ChatMessage[],
  userProfile?: {
    nativeLanguage?: string;
    currentLevel?: string;
    targetLevel?: string;
    visaType?: string;
  }
): Promise<ReadableStream> {
  const systemPrompt = buildSystemPrompt(userProfile);

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
