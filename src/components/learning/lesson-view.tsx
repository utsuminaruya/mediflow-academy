'use client';

import { useState } from 'react';
import { BookOpen, Volume2, ChevronRight, Star, BookMarked, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizCard } from './quiz-card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface VocabItem {
  word: string;
  reading: string;
  meaning: string;
  example?: string;
}

interface ExampleSentence {
  japanese: string;
  reading?: string;
  translation: string;
}

interface QuizData {
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation?: string;
}

interface LessonContent {
  title: string;
  titleTranslation?: string;
  introduction: string;
  keyPoints: string[];
  vocabulary?: VocabItem[];
  examples: ExampleSentence[];
  grammarNote?: string;
  quiz?: QuizData;
  xpReward?: number;
}

interface LessonViewProps {
  lesson: LessonContent;
  onComplete?: (score: number) => void;
  locale?: string;
}

export function LessonView({ lesson, onComplete, locale: _locale }: LessonViewProps) {
  const t = useTranslations('lesson');
  const [stage, setStage] = useState<'learn' | 'quiz' | 'complete'>('learn');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentExample, setCurrentExample] = useState(0);

  const handleQuizComplete = (isCorrect: boolean) => {
    const score = isCorrect ? 100 : 50;
    setQuizScore(score);
    setTimeout(() => setStage('complete'), 1000);
    onComplete?.(score);
  };

  if (stage === 'complete') {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="h-10 w-10 text-white fill-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('complete')}</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-block mb-6">
          <p className="text-yellow-700 font-medium">
            +{lesson.xpReward || 10} {t('xpEarned')}
          </p>
        </div>
        {quizScore !== null && (
          <p className="text-gray-500 text-sm mb-6">クイズスコア: {quizScore}%</p>
        )}
        <Button>{t('next')}</Button>
      </div>
    );
  }

  if (stage === 'quiz' && lesson.quiz) {
    return (
      <div className="animate-fade-in">
        <QuizCard
          question={lesson.quiz.question}
          options={lesson.quiz.options}
          correctId={lesson.quiz.correctId}
          explanation={lesson.quiz.explanation}
          onComplete={handleQuizComplete}
          xpReward={lesson.xpReward}
        />
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Lesson header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-[#0066CC]" />
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        </div>
        {lesson.titleTranslation && (
          <p className="text-gray-500 ml-7 text-sm">{lesson.titleTranslation}</p>
        )}
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{lesson.introduction}</p>
      </div>

      {/* Key Points */}
      {lesson.keyPoints.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-[#0066CC]" />
            <h2 className="text-base font-bold text-gray-900">{t('practice')}</h2>
          </div>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <span className="w-6 h-6 bg-[#0066CC] rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vocabulary */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookMarked className="h-4 w-4 text-[#00B894]" />
            <h2 className="text-base font-bold text-gray-900">
              {_locale === 'vi' ? 'Từ vựng quan trọng' : '重要語彙'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lesson.vocabulary.map((item, i) => (
              <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-3">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-lg font-bold text-gray-900">{item.word}</span>
                  <span className="text-xs text-gray-400">{item.reading}</span>
                </div>
                <p className="text-sm text-[#00B894] font-medium mb-1">{item.meaning}</p>
                {item.example && (
                  <p className="text-xs text-gray-500 italic">{item.example}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {lesson.examples.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="h-4 w-4 text-[#0066CC]" />
            <h2 className="text-base font-bold text-gray-900">{t('example')}</h2>
          </div>
          <div className="space-y-3">
            {lesson.examples.map((example, i) => (
              <div
                key={i}
                className={cn(
                  'bg-white rounded-xl border p-4 transition-all duration-200 cursor-pointer',
                  currentExample === i ? 'border-[#0066CC] shadow-sm bg-blue-50/30' : 'border-gray-200 hover:border-gray-300',
                )}
                onClick={() => setCurrentExample(i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xl font-medium text-gray-900 mb-1">{example.japanese}</p>
                    {example.reading && (
                      <p className="text-sm text-gray-400 mb-2">{example.reading}</p>
                    )}
                    <p className="text-gray-600 text-sm">{example.translation}</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-[#0066CC] transition-colors p-1 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TTS placeholder
                    }}
                    title="音声を聞く"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar Note */}
      {lesson.grammarNote && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
            {_locale === 'vi' ? 'Ghi chu ngu phap' : '文法ノート'}
          </p>
          <p className="text-sm text-amber-900 leading-relaxed whitespace-pre-line">
            {lesson.grammarNote}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="pt-2">
        {lesson.quiz ? (
          <Button
            fullWidth
            size="lg"
            onClick={() => setStage('quiz')}
            className="group"
          >
            {t('quiz')}
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button
            fullWidth
            size="lg"
            onClick={() => { setStage('complete'); onComplete?.(100); }}
          >
            {t('complete')}
          </Button>
        )}
      </div>
    </div>
  );
}
