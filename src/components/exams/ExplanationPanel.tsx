'use client';

import { CheckCircle, XCircle, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';
import type { QuestionExplanation, ExamChoice } from '@/types/exam';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  isCorrect: boolean;
  explanation: QuestionExplanation;
  choices: ExamChoice[];
  selectedAnswer: number;
  correctAnswer: number;
  locale: string;
}

const t = (locale: string) => ({
  correct: locale === 'vi' ? '✓ Đúng rồi!' : '✓ 正解！',
  incorrect: locale === 'vi' ? '✗ Chưa đúng' : '✗ 不正解',
  summary: locale === 'vi' ? 'Giải thích' : '解説',
  whyCorrect: locale === 'vi' ? 'Tại sao đây là đáp án đúng?' : 'なぜこれが正解なのか？',
  choiceExplanations: locale === 'vi' ? 'Giải thích từng đáp án' : '各選択肢の解説',
  realWorld: locale === 'vi' ? 'Ví dụ thực tế' : '介護現場の実例',
  keyPoints: locale === 'vi' ? 'Điểm cần nhớ' : '覚えるべきポイント',
  relatedTerms: locale === 'vi' ? 'Thuật ngữ liên quan' : '関連用語',
  commonMistake: locale === 'vi' ? 'Lỗi phổ biến' : 'よくある間違い',
});

export default function ExplanationPanel({
  isCorrect,
  explanation,
  choices,
  selectedAnswer,
  correctAnswer,
  locale,
}: ExplanationPanelProps) {
  const labels = t(locale);
  const text = (obj: { ja: string; vi: string }) => locale === 'vi' ? obj.vi : obj.ja;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 正解/不正解バナー */}
      <div className={cn(
        'rounded-xl p-4 flex items-center gap-3',
        isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      )}>
        {isCorrect
          ? <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
          : <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
        }
        <span className={cn(
          'font-bold text-lg',
          isCorrect ? 'text-green-700' : 'text-red-600'
        )}>
          {isCorrect ? labels.correct : labels.incorrect}
        </span>
      </div>

      {/* 解説サマリー */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
          {labels.summary}
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">{text(explanation.summary)}</p>
      </div>

      {/* なぜ正解か */}
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <p className="text-xs font-bold text-amber-600">{labels.whyCorrect}</p>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">{text(explanation.why_correct)}</p>
      </div>

      {/* 各選択肢の解説 */}
      {explanation.choice_explanations && explanation.choice_explanations.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
            {labels.choiceExplanations}
          </p>
          <div className="space-y-2">
            {explanation.choice_explanations.map((ce, i) => {
              const choice = choices[ce.choice];
              const isCorrectChoice = ce.choice === correctAnswer;
              const isSelected = ce.choice === selectedAnswer;
              return (
                <div key={i} className={cn(
                  'rounded-lg p-3 border text-sm',
                  isCorrectChoice ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'
                )}>
                  <div className="flex items-start gap-2">
                    <span className={cn(
                      'font-bold text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5',
                      isCorrectChoice ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    )}>
                      {choice?.label || (i + 1)}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-1">
                        {choice ? text(choice.text) : ''}
                        {isSelected && !isCorrectChoice && (
                          <span className="ml-2 text-xs text-red-500">← {locale === 'vi' ? 'Bạn chọn' : 'あなたの答え'}</span>
                        )}
                        {isCorrectChoice && (
                          <span className="ml-2 text-xs text-green-600">← {locale === 'vi' ? 'Đáp án đúng' : '正解'}</span>
                        )}
                      </p>
                      <p className="text-gray-600 text-xs leading-relaxed">{text(ce.explanation)}</p>
                      {ce.is_common_mistake && (
                        <span className="inline-flex items-center gap-1 mt-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          {labels.commonMistake}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 介護現場の実例 */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
          🏥 {labels.realWorld}
        </p>
        <p className="text-sm text-amber-900 leading-relaxed">{text(explanation.real_world_example)}</p>
      </div>

      {/* キーポイント */}
      {explanation.key_points && explanation.key_points.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
            📌 {labels.keyPoints}
          </p>
          <div className="flex flex-wrap gap-2">
            {explanation.key_points.map((kp, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                {text(kp)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 関連用語 */}
      {explanation.related_terms && explanation.related_terms.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              {labels.relatedTerms}
            </p>
          </div>
          <div className="space-y-2">
            {explanation.related_terms.map((term, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-bold text-gray-900 text-sm min-w-[80px]">{term.term}</span>
                <span className="text-gray-600 text-sm">{text(term.meaning)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
