import type { RoleplayScenario, RoleplayMessage } from '@/types/roleplay';

export function buildCharacterResponsePrompt(params: {
  scenario: RoleplayScenario;
  conversationHistory: RoleplayMessage[];
  userLanguage: string;
}): { system: string; messages: Array<{ role: 'user' | 'assistant'; content: string }> } {
  const { scenario, conversationHistory, userLanguage } = params;

  const roleLabel =
    scenario.ai_character.role === 'resident' ? '介護施設の利用者さん' :
    scenario.ai_character.role === 'senior_staff' ? '先輩介護スタッフ' :
    scenario.ai_character.role === 'family' ? '利用者さんのご家族' :
    scenario.ai_character.role === 'nurse' ? '看護師' : '医師';

  const system = `あなたは介護現場のロールプレイで「${scenario.ai_character.name}」を演じるAIです。

【あなたのキャラクター】
役割: ${roleLabel}
名前: ${scenario.ai_character.name}
${scenario.ai_character.age ? `年齢: ${scenario.ai_character.age}歳` : ''}
性格: ${scenario.ai_character.personality.ja}
背景: ${scenario.ai_character.background.ja}

【シーン設定】
${scenario.scene_setting.ja}

【学習者の役柄】
介護スタッフ（ベトナム人、母語: ${userLanguage}、JLPT ${scenario.difficulty}レベル）

【あなたの振る舞いルール】
1. キャラクターに完全になりきって、自然な日本語で話す
2. 利用者さん役なら、高齢者らしい口調・話し方をする（敬語は使わない、年長者の言い方）
3. 先輩役なら、教える立場で丁寧にフィードバックする
4. 家族役なら、心配そう/感謝している感情を表現する
5. 学習者のレベル(${scenario.difficulty})に合わせた語彙・文法で話す
6. 1回の返答は1-3文、30-80文字程度に収める
7. 学習者の発話に明らかな間違いがあっても、自然に会話を続ける（訂正は評価フェーズで）
8. 学習者がベトナム語で書いてきた場合、「日本語で話してみてください」と優しく促す
9. 会話が目的(${scenario.learning_objectives.map(o => o.ja).join('、')})を達成したら自然に終わりに向かう

【重要】
- あなたはAIアシスタントではなく「${scenario.ai_character.name}」です
- 「私はAIです」「私は学習支援します」などのメタな発言は絶対にしない
- キャラクターとして最後まで演じきる

${scenario.ai_system_prompt}`;

  const messages = conversationHistory
    .filter(m => m.content.trim().length > 0)
    .map(msg => ({
      role: (msg.role === 'ai' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: msg.content,
    }));

  return { system, messages };
}

export function buildEvaluationPrompt(params: {
  scenario: RoleplayScenario;
  conversationHistory: RoleplayMessage[];
  userLanguage: string;
}): string {
  const { scenario, conversationHistory, userLanguage } = params;

  const conversationText = conversationHistory
    .map(msg => `${msg.role === 'ai' ? scenario.ai_character.name : '学習者'}: ${msg.content}`)
    .join('\n');

  return `あなたは介護日本語教育の専門家です。以下のロールプレイ会話を評価してください。

【シナリオ】
タイトル: ${scenario.title.ja}
難易度: ${scenario.difficulty}
学習目標: ${scenario.learning_objectives.map(o => o.ja).join('、')}
キーフレーズ: ${scenario.key_phrases.map(p => p.phrase).join('、')}

【会話履歴】
${conversationText}

【学習者情報】
母語: ${userLanguage}
目標JLPTレベル: ${scenario.difficulty}

【評価指示】
以下のJSON形式で評価を返してください。必ず有効なJSONのみ出力し、他の文字は含めないでください。

{
  "total_score": <0-100の総合スコア>,
  "scores_breakdown": {
    "keigo": <0-100, 敬語の正確さ>,
    "care_terms": <0-100, 介護用語の適切さ>,
    "empathy": <0-100, 共感・思いやりの表現>,
    "flow": <0-100, 会話の流れの自然さ>,
    "grammar": <0-100, 文法の正確さ>
  },
  "good_points": [
    {
      "point": {"ja": "...", "vi": "..."},
      "quote": "<学習者の該当発話を引用>"
    }
  ],
  "improvement_points": [
    {
      "point": {"ja": "...", "vi": "..."},
      "your_message": "<学習者の改善すべき発話>",
      "better_example": {"ja": "<より良い言い方>", "vi": "<ベトナム語での説明>"}
    }
  ]
}

【評価基準】
- good_points: 3つ、具体的な発話を引用すること
- improvement_points: 3つ、改善例を必ず提示すること
- スコアは厳しめに評価（初心者が満点を取れないように）
- JLPT ${scenario.difficulty}レベルとして妥当かで判定
- 全ての説明はベトナム語訳も必ず付けること
- 介護現場で実際に通用するレベルを基準とする`;
}

export function buildHintPrompt(params: {
  scenario: RoleplayScenario;
  conversationHistory: RoleplayMessage[];
  userLanguage: string;
}): string {
  const { scenario, conversationHistory, userLanguage } = params;

  const lastAiMessage = [...conversationHistory].reverse().find(m => m.role === 'ai');

  return `あなたは介護日本語の家庭教師です。学習者がロールプレイで詰まっています。ヒントを出してください。

【状況】
シナリオ: ${scenario.title.ja}
${scenario.ai_character.name}の最後の発話: "${lastAiMessage?.content || ''}"
学習目標: ${scenario.learning_objectives.map(o => o.ja).join('、')}

【指示】
学習者（JLPT ${scenario.difficulty}レベル、母語${userLanguage}）が次に言うべき一言を、以下のJSON形式で返してください。

{
  "suggestion_ja": "<日本語での推奨する一言>",
  "explanation_vi": "<なぜこの言い方が適切かのベトナム語での説明>",
  "alternative_ja": "<別の言い方の例>"
}

【重要】
- JLPT ${scenario.difficulty}レベルの語彙・文法のみ使用
- 介護現場らしい丁寧さを保つ
- 完璧すぎない、学習者レベルで出せる自然な表現にする
- JSONのみ出力（他の文字は含めない）`;
}
