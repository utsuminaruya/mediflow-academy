'use client';

import { useState } from 'react';
import { BookOpen, Volume2, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizCard } from './quiz-card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
  examples: ExampleSentence[];
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

  const handleStartQuiz = () => {
    setStage('quiz');
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
          <p className="text-gray-500 text-sm mb-6">
            Quiz Score: {quizScore}%
          </p>
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
    <div className="space-y-6 animate-fade-in">
      {/* Lesson header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-[#0066CC]" />
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        </div>
        {lesson.titleTranslation && (
          <p className="text-gray-500 ml-7">{lesson.titleTranslation}</p>
        )}
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <p className="text-gray-800 leading-relaxed">{lesson.introduction}</p>
      </div>

      {/* Key Points */}
      {lesson.keyPoints.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {t('practice')}
          </h2>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-6 h-6 bg-[#0066CC] rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      {lesson.examples.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {t('example')}
          </h2>
          <div className="space-y-3">
            {lesson.examples.map((example, i) => (
              <div
                key={i}
                className={cn(
                  'bg-white rounded-xl border p-4 transition-all duration-200',
                  currentExample === i ? 'border-[#0066CC] shadow-sm' : 'border-gray-200',
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
                    className="text-gray-400 hover:text-[#0066CC] transition-colors p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TTS would go here
                    }}
                    title="Read aloud"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pt-4">
        {lesson.quiz ? (
          <Button
            fullWidth
            size="lg"
            onClick={handleStartQuiz}
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
