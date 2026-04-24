'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string | { ja: string; vi: string };
  options: { id: string; text: string }[];
  correctId: string;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuizCardProps {
  questions: QuizQuestion[];
  xpReward?: number;
  onComplete?: (score: number, total: number) => void;
  locale?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const difficultyLabel: Record<string, { ja: string; vi: string; color: string }> = {
  easy:   { ja: '易しい',  vi: 'Dễ',    color: 'bg-green-100 text-green-700' },
  medium: { ja: '普通',    vi: 'Vừa',   color: 'bg-yellow-100 text-yellow-700' },
  hard:   { ja: '難しい',  vi: 'Khó',   color: 'bg-red-100 text-red-700' },
};

function resolveQuestion(q: QuizQuestion['question'], locale?: string): string {
  if (typeof q === 'string') return q;
  return locale === 'vi' ? q.vi : q.ja;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function QuizCard({ questions, xpReward = 10, onComplete, locale }: QuizCardProps) {
  const t = useTranslations('lesson');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId]     = useState<string | null>(null);
  const [isChecked, setIsChecked]       = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  // flash: null | 'correct' | 'wrong'
  const [flash, setFlash]               = useState<'correct' | 'wrong' | null>(null);
  const [isDone, setIsDone]             = useState(false);

  const current   = questions[currentIndex];
  const total     = questions.length;
  const isCorrect = selectedId === current.correctId;

  const handleCheck = () => {
    if (!selectedId) return;
    setIsChecked(true);
    const correct = selectedId === current.correctId;
    setFlash(correct ? 'correct' : 'wrong');
    if (correct) setCorrectCount((c) => c + 1);
    setTimeout(() => setFlash(null), 600);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      const finalScore = isCorrect ? correctCount + 1 : correctCount;
      setIsDone(true);
      onComplete?.(finalScore, total);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
      setIsChecked(false);
    }
  };

  // ── Score screen ──────────────────────────────────────────────────────────
  if (isDone) {
    const finalScore  = correctCount;
    const percentage  = Math.round((finalScore / total) * 100);
    const isPerfect   = finalScore === total;
    const isGood      = percentage >= 60;

    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center animate-fade-in">
        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5',
          isPerfect ? 'bg-gradient-to-br from-yellow-400 to-orange-400' :
          isGood    ? 'bg-gradient-to-br from-[#0066CC] to-[#00B894]' :
                      'bg-gradient-to-br from-gray-400 to-gray-500'
        )}>
          <Trophy className="h-9 w-9 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {isPerfect ? (locale === 'vi' ? 'Hoàn hảo!' : '満点！') :
           isGood    ? (locale === 'vi' ? 'Tốt lắm!'  : 'よくできました！') :
                       (locale === 'vi' ? 'Cố lên!'   : 'もう少し！')}
        </h3>
        <p className="text-gray-500 mb-6">
          {locale === 'vi'
            ? `Bạn trả lời đúng ${finalScore}/${total} câu`
            : `${finalScore}問 / ${total}問 正解`}
        </p>

        {/* Score bar */}
        <div className="bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              isPerfect ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
              isGood    ? 'bg-gradient-to-r from-[#0066CC] to-[#00B894]' :
                          'bg-gray-400'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-6">{percentage}%</p>

        {xpReward > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 inline-block">
            <p className="text-yellow-700 font-semibold">
              +{Math.round(xpReward * (percentage / 100))} XP {locale === 'vi' ? 'đã nhận' : '獲得'}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  const diff = current.difficulty;

  return (
    <div className={cn(
      'bg-white rounded-2xl border-2 p-6 shadow-sm transition-all duration-300',
      flash === 'correct' ? 'border-[#00B894] bg-green-50/40' :
      flash === 'wrong'   ? 'border-[#FF6B6B] bg-red-50/40' :
                            'border-gray-200'
    )}>
      {/* ── Header: progress + badges ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#0066CC] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {t('quiz')}
          </span>
          {diff && (
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', difficultyLabel[diff].color)}>
              {locale === 'vi' ? difficultyLabel[diff].vi : difficultyLabel[diff].ja}
            </span>
          )}
          {xpReward > 0 && (
            <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
              +{xpReward} XP
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-400">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div className="bg-gray-100 rounded-full h-1.5 mb-5 overflow-hidden">
        <div
          className="bg-[#0066CC] h-full rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex) / total) * 100}%` }}
        />
      </div>

      {/* ── Question ───────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">
          {resolveQuestion(current.question, locale)}
        </p>
      </div>

      {/* ── Options ────────────────────────────────────────────────────────── */}
      <div className="space-y-3 mb-6">
        {current.options.map((option) => {
          const isSelected     = selectedId === option.id;
          const isOptionCorrect = option.id === current.correctId;

          return (
            <button
              key={option.id}
              onClick={() => !isChecked && setSelectedId(option.id)}
              disabled={isChecked}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium',
                !isChecked && !isSelected  && 'border-gray-200 hover:border-[#0066CC] hover:bg-blue-50',
                !isChecked &&  isSelected  && 'border-[#0066CC] bg-blue-50 text-[#0066CC]',
                 isChecked &&  isOptionCorrect && 'border-[#00B894] bg-green-50 text-[#009974]',
                 isChecked &&  isSelected && !isOptionCorrect && 'border-[#FF6B6B] bg-red-50 text-[#E55555]',
                 isChecked && !isSelected && !isOptionCorrect && 'border-gray-100 text-gray-400'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {isChecked && isOptionCorrect && (
                  <CheckCircle className="h-5 w-5 text-[#00B894] flex-shrink-0" />
                )}
                {isChecked && isSelected && !isOptionCorrect && (
                  <XCircle className="h-5 w-5 text-[#FF6B6B] flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Explanation ────────────────────────────────────────────────────── */}
      {isChecked && current.explanation && (
        <div className={cn(
          'p-4 rounded-xl mb-5 animate-fade-in',
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        )}>
          <div className="flex items-start gap-2">
            {isCorrect
              ? <CheckCircle className="h-5 w-5 text-[#00B894] flex-shrink-0 mt-0.5" />
              : <XCircle    className="h-5 w-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className={cn('font-semibold mb-1 text-sm', isCorrect ? 'text-[#009974]' : 'text-[#E55555]')}>
                {isCorrect ? t('correct') : t('incorrect')}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{current.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      <div className="flex justify-end gap-3">
        {!isChecked && (
          <Button size="sm" onClick={handleCheck} disabled={!selectedId}>
            {t('check')}
          </Button>
        )}
        {isChecked && (
          <Button size="sm" onClick={handleNext} className="group">
            {currentIndex + 1 >= total
              ? (locale === 'vi' ? 'Xem kết quả' : '結果を見る')
              : (locale === 'vi' ? 'Câu tiếp theo' : '次の問題')}
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  );
}
