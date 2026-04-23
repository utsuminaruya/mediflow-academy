import type { ExamQuestion, LocalizedText } from '@/types/exam';

export function buildExamChatPrompt(
  question: ExamQuestion,
  locale: string,
  chatHistory: { role: 'user' | 'assistant'; content: string }[]
): { system: string; messages: { role: 'user' | 'assistant'; content: string }[] } {
  const lang = locale === 'vi' ? 'ベトナム語' : '日本語';

  const questionText =
    locale === 'vi' ? question.question_text.vi : question.question_text.ja;

  const choicesText = question.choices
    .map((c, i) => {
      const text = locale === 'vi' ? c.text.vi : c.text.ja;
      return `${String.fromCharCode(65 + i)}. ${text}`;
    })
    .join('\n');

  const system = `あなたは「Medi先生」です。Mediflow Academyの過去問解説AIアシスタントです。

【役割】
ユーザーが日本の国家試験・技能試験の過去問を学習するのをサポートします。
回答は${lang}で行ってください。

【現在の問題】
問題文: ${questionText}

選択肢:
${choicesText}

正解: ${String.fromCharCode(64 + question.correct_answer)}

【指示】
1. ユーザーの質問に丁寧に答える
2. 解説は具体的かつ分かりやすく
3. 介護・医療現場での実例を交えて説明する
4. 関連する日本語の語彙や文法も説明する
5. 1回の回答は300文字以内を目安にする
6. 励ましの言葉を忘れずに

【重要】
- 正解を直接教える前に、考え方のヒントを与えることを優先する
- ユーザーが理解を深められるよう、なぜその答えが正しいか説明する
- Mediflow Academyは現役看護師が運営する学習プラットフォームです`;

  return {
    system,
    messages: chatHistory,
  };
}

export function getLocalizedText(text: LocalizedText, locale: string): string {
  return locale === 'vi' ? text.vi : text.ja;
}
