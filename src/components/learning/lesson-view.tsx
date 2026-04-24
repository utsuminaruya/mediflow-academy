'use client';

import { useState, useCallback } from 'react';
import {
  BookOpen, Volume2, ChevronRight, ChevronLeft, Star,
  BookMarked, MessageSquare, RotateCcw, Layers, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizCard, type QuizQuestion } from './quiz-card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface DialogueLine {
  speaker: string;
  japanese: string;
  reading?: string;
  translation: string;
}

interface LegacyQuizData {
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
  dialogue?: DialogueLine[];
  examples: ExampleSentence[];
  grammarNote?: string;
  /** Legacy single-quiz (backwards compat) */
  quiz?: LegacyQuizData;
  /** Preferred: multi-question array */
  quizzes?: QuizQuestion[];
  xpReward?: number;
}

interface LessonViewProps {
  lesson: LessonContent;
  onComplete?: (score: number) => void;
  locale?: string;
}

type Stage = 'learn' | 'flashcard' | 'quiz' | 'complete';

// ─── FlashCard subcomponent ───────────────────────────────────────────────────

function FlashCardDeck({
  items,
  locale,
  onDone,
}: {
  items: VocabItem[];
  locale?: string;
  onDone: () => void;
}) {
  const [index, setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown]   = useState<Set<number>>(new Set());

  const current   = items[index];
  const total     = items.length;
  const knownCount = known.size;

  const handleKnow = () => {
    setKnown(prev => new Set([...prev, index]));
    next();
  };
  const handleAgain = () => next();

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= total) onDone();
      else setIndex(i => i + 1);
    }, 150);
  }, [index, total, onDone]);

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      {/* progress */}
      <div className="w-full flex items-center justify-between text-sm text-gray-500 mb-1">
        <span>{locale === 'vi' ? 'Thẻ ghi nhớ' : 'フラッシュカード'}</span>
        <span>{index + 1} / {total}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-[#0066CC] rounded-full transition-all duration-400"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      {/* card */}
      <div
        className={cn(
          'w-full cursor-pointer select-none',
          'perspective-[800px]',
        )}
        style={{ perspective: '800px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: 180,
          }}
        >
          {/* front */}
          <div
            className="absolute inset-0 bg-white rounded-2xl border-2 border-[#0066CC] shadow-sm flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-3xl font-bold text-gray-900 mb-2">{current.word}</p>
            <p className="text-sm text-gray-400">{current.reading}</p>
            <p className="mt-4 text-xs text-gray-400">{locale === 'vi' ? 'Nhấn để lật' : 'タップして裏面へ'}</p>
          </div>
          {/* back */}
          <div
            className="absolute inset-0 bg-green-50 rounded-2xl border-2 border-green-300 shadow-sm flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-2xl font-bold text-[#009974] mb-1">{current.meaning}</p>
            {current.example && (
              <p className="text-sm text-gray-500 italic mt-2 text-center">{current.example}</p>
            )}
          </div>
        </div>
      </div>

      {/* action buttons (only visible after flip) */}
      {flipped && (
        <div className="flex gap-3 w-full animate-fade-in">
          <button
            onClick={handleAgain}
            className="flex-1 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
          >
            {locale === 'vi' ? 'Học lại' : 'もう一度'}
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 py-2.5 rounded-xl border-2 border-green-300 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
          >
            {locale === 'vi' ? 'Đã nhớ ✓' : '覚えた ✓'}
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400">
        {locale === 'vi' ? `Đã nhớ: ${knownCount}/${total}` : `覚えた: ${knownCount}/${total}`}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LessonView({ lesson, onComplete, locale: _locale }: LessonViewProps) {
  const t = useTranslations('lesson');
  const [stage, setStage]   = useState<Stage>('learn');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizTotal, setQuizTotal] = useState<number>(1);
  const [currentExample, setCurrentExample] = useState(0);

  // Build questions array for QuizCard
  const questions: QuizQuestion[] = lesson.quizzes
    ? lesson.quizzes
    : lesson.quiz
      ? [{
          question: lesson.quiz.question,
          options:  lesson.quiz.options,
          correctId: lesson.quiz.correctId,
          explanation: lesson.quiz.explanation,
        }]
      : [];

  const hasFlashcard = (lesson.vocabulary?.length ?? 0) > 0;
  const hasQuiz      = questions.length > 0;

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    onComplete?.(Math.round((score / total) * 100));
    setStage('complete');
  };

  // ── Complete screen ────────────────────────────────────────────────────────
  if (stage === 'complete') {
    const pct      = quizTotal > 0 ? Math.round(((quizScore ?? 0) / quizTotal) * 100) : 100;
    const isPerfect = pct === 100;
    const isGood    = pct >= 60;
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5',
          isPerfect ? 'bg-gradient-to-br from-yellow-400 to-orange-400' :
          isGood    ? 'bg-gradient-to-br from-[#0066CC] to-[#00B894]' :
                      'bg-gradient-to-br from-gray-400 to-gray-500',
        )}>
          <Star className="h-10 w-10 text-white fill-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPerfect ? (
            _locale === 'vi' ? 'Hoàn hảo!' : '満点！すばらしい！'
          ) : isGood ? (
            _locale === 'vi' ? 'Tốt lắm!' : 'よくできました！'
          ) : (
            _locale === 'vi' ? 'Cố lên!' : 'もう少し練習しよう！'
          )}
        </h2>
        {quizTotal > 0 && (
          <p className="text-gray-500 text-sm mb-4">
            {_locale === 'vi'
              ? `${quizScore}/${quizTotal} câu đúng · ${pct}%`
              : `${quizScore}/${quizTotal}問 正解 · ${pct}%`}
          </p>
        )}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-block mb-6">
          <p className="text-yellow-700 font-medium">
            +{Math.round((lesson.xpReward || 10) * (pct / 100))} {t('xpEarned')}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          {hasQuiz && (
            <button
              onClick={() => { setStage('quiz'); setQuizScore(null); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              {_locale === 'vi' ? 'Làm lại' : 'もう一度'}
            </button>
          )}
          <Button onClick={() => onComplete?.(pct)}>
            {t('next')} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Flashcard screen ───────────────────────────────────────────────────────
  if (stage === 'flashcard' && lesson.vocabulary?.length) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setStage('learn')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> {_locale === 'vi' ? 'Quay lại bài học' : 'レッスンに戻る'}
        </button>
        <FlashCardDeck
          items={lesson.vocabulary}
          locale={_locale}
          onDone={() => hasQuiz ? setStage('quiz') : setStage('complete')}
        />
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────────────────────
  if (stage === 'quiz' && questions.length > 0) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setStage('learn')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> {_locale === 'vi' ? 'Quay lại bài học' : 'レッスンに戻る'}
        </button>
        <QuizCard
          questions={questions}
          xpReward={lesson.xpReward}
          onComplete={handleQuizComplete}
          locale={_locale}
        />
      </div>
    );
  }

  // ── Learn screen ───────────────────────────────────────────────────────────
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

      {/* Vocabulary list (with flashcard CTA) */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-[#00B894]" />
              <h2 className="text-base font-bold text-gray-900">
                {_locale === 'vi' ? 'Từ vựng quan trọng' : '重要語彙'}
              </h2>
            </div>
            <button
              onClick={() => setStage('flashcard')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Layers className="h-3.5 w-3.5" />
              {_locale === 'vi' ? 'Luyện thẻ' : 'フラッシュカード'}
            </button>
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

      {/* Dialogue section */}
      {lesson.dialogue && lesson.dialogue.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-purple-500" />
            <h2 className="text-base font-bold text-gray-900">
              {_locale === 'vi' ? 'Hội thoại mẫu' : '会話例'}
            </h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {lesson.dialogue.map((line, i) => {
              const isA = i % 2 === 0;
              return (
                <div key={i} className={cn('flex gap-3 p-4', !isA && 'bg-gray-50', i > 0 && 'border-t border-gray-100')}>
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white',
                    isA ? 'bg-[#0066CC]' : 'bg-purple-500',
                  )}>
                    {line.speaker.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-400 mb-0.5">{line.speaker}</p>
                    <p className="text-base font-medium text-gray-900">{line.japanese}</p>
                    {line.reading && (
                      <p className="text-xs text-gray-400 mt-0.5">{line.reading}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">{line.translation}</p>
                  </div>
                </div>
              );
            })}
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
                    onClick={(e) => { e.stopPropagation(); }}
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
            {_locale === 'vi' ? 'Ghi chú ngữ pháp' : '文法ノート'}
          </p>
          <p className="text-sm text-amber-900 leading-relaxed whitespace-pre-line">
            {lesson.grammarNote}
          </p>
        </div>
      )}

      {/* CTA buttons */}
      <div className="pt-2 flex flex-col gap-3">
        {hasFlashcard && (
          <button
            onClick={() => setStage('flashcard')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#0066CC] text-[#0066CC] font-semibold hover:bg-blue-50 transition-colors"
          >
            <Layers className="h-5 w-5" />
            {_locale === 'vi' ? 'Luyện với thẻ ghi nhớ' : 'フラッシュカードで練習'}
          </button>
        )}
        {hasQuiz ? (
          <Button
            fullWidth
            size="lg"
            onClick={() => setStage('quiz')}
            className="group"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {t('quiz')} ({questions.length}{_locale === 'vi' ? ' câu' : '問'})
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform ml-1" />
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
