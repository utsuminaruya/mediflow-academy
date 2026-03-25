'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation?: string;
  onComplete?: (isCorrect: boolean) => void;
  xpReward?: number;
}

export function QuizCard({
  question,
  options,
  correctId,
  explanation,
  onComplete,
  xpReward = 10,
}: QuizCardProps) {
  const t = useTranslations('lesson');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const isCorrect = selectedId === correctId;

  const handleCheck = () => {
    if (!selectedId) return;
    setIsChecked(true);
    onComplete?.(isCorrect);
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsChecked(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {/* Question */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#0066CC] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {t('quiz')}
          </span>
          {xpReward > 0 && (
            <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
              +{xpReward} XP
            </span>
          )}
        </div>
        <p className="text-lg font-medium text-gray-900">{question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isOptionCorrect = option.id === correctId;

          return (
            <button
              key={option.id}
              onClick={() => !isChecked && setSelectedId(option.id)}
              disabled={isChecked}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium',
                !isChecked && !isSelected && 'border-gray-200 hover:border-[#0066CC] hover:bg-blue-50',
                !isChecked && isSelected && 'border-[#0066CC] bg-blue-50 text-[#0066CC]',
                isChecked && isOptionCorrect && 'border-[#00B894] bg-green-50 text-[#009974]',
                isChecked && isSelected && !isOptionCorrect && 'border-[#FF6B6B] bg-red-50 text-[#E55555]',
                isChecked && !isSelected && !isOptionCorrect && 'border-gray-100 text-gray-400'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {isChecked && isOptionCorrect && (
                  <CheckCircle className="h-5 w-5 text-[#00B894]" />
                )}
                {isChecked && isSelected && !isOptionCorrect && (
                  <XCircle className="h-5 w-5 text-[#FF6B6B]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isChecked && explanation && (
        <div className={cn(
          'p-4 rounded-xl mb-4 animate-fade-in',
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        )}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-[#00B894] flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn(
                'font-semibold mb-1',
                isCorrect ? 'text-[#009974]' : 'text-[#E55555]'
              )}>
                {isCorrect ? t('correct') : t('incorrect')}
              </p>
              <p className="text-sm text-gray-700">{explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {isChecked && !isCorrect && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            {t('incorrect')}
          </Button>
        )}
        {!isChecked && (
          <Button
            size="sm"
            onClick={handleCheck}
            disabled={!selectedId}
          >
            {t('check')}
          </Button>
        )}
      </div>
    </div>
  );
}
