'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ChevronRight, X, CheckCircle, XCircle, Flag } from 'lucide-react';
import type { ExamQuestion, PracticeSession } from '@/types/exam';
import ExplanationPanel from '@/components/exams/ExplanationPanel';
import AIChatFloating from '@/components/exams/AIChatFloating';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const params = useParams();
  const locale = params.locale as string;
  const sessionId = params.sessionId as string;
  const router = useRouter();

  const [session, setSession] = useState<PracticeSession | null>(null);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState<ExamQuestion['explanation'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showVi, setShowVi] = useState(false);

  const t = (ja: string, vi: string) => locale === 'vi' ? vi : ja;

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) return;

      const { data } = await supabase
        .from('exam_practice_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (!data) { router.back(); return; }
      setSession(data as PracticeSession);

      // 問題IDを取得（セッションの回答済み状況から続きを判断）
      const { data: questions } = await supabase
        .from('exam_questions')
        .select('id')
        .eq('exam_id', data.exam_id)
        .order('question_number')
        .limit(data.total_questions);

      const ids = (questions || []).map((q: { id: string }) => q.id);
      setQuestionIds(ids);
      setCurrentIndex(data.answered_questions); // 続きから
      setLoading(false);
    };
    load();
  }, [sessionId, router]);

  useEffect(() => {
    if (questionIds.length === 0 || currentIndex >= questionIds.length) return;
    const loadQuestion = async () => {
      const supabase = createClient();
      if (!supabase) return;
      const { data } = await supabase
        .from('exam_questions')
        .select('*')
        .eq('id', questionIds[currentIndex])
        .single();
      setCurrentQuestion(data as ExamQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setExplanation(null);
      setShowVi(false);
      setStartTime(Date.now());
    };
    loadQuestion();
  }, [questionIds, currentIndex]);

  const handleSubmit = async () => {
    if (selectedAnswer === null || !currentQuestion || submitting) return;
    setSubmitting(true);

    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    try {
      const res = await fetch('/api/exams/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          question_id: currentQuestion.id,
          selected_answer: selectedAnswer,
          time_spent_seconds: timeSpent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsCorrect(data.is_correct);
        setExplanation(data.explanation);
        setIsAnswered(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 >= questionIds.length) {
      // 最後の問題 → 完了
      await fetch('/api/exams/complete-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, time_spent_seconds: 0 }),
      });
      router.push(`/${locale}/exams/tokutei-ginou/result/${sessionId}`);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleEndSession = async () => {
    if (!confirm(t('練習を終了しますか？', 'Bạn có muốn kết thúc không?'))) return;
    await fetch('/api/exams/complete-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, time_spent_seconds: 0 }),
    });
    router.push(`/${locale}/exams/tokutei-ginou/result/${sessionId}`);
  };

  if (loading || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const total = questionIds.length;
  const current = currentIndex + 1;
  const progress = (currentIndex / total) * 100;

  const difficultyColor = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  }[currentQuestion.difficulty] || 'bg-gray-100 text-gray-600';

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* 固定ヘッダー */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{current} / {total}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor}`}>
              {t(
                currentQuestion.difficulty === 'easy' ? '易' : currentQuestion.difficulty === 'medium' ? '普' : '難',
                currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'TB' : 'Khó'
              )}
            </span>
          </div>
          <button onClick={handleEndSession} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50">
            <X className="h-3.5 w-3.5" />
            {t('終了', 'Kết thúc')}
          </button>
        </div>
        {/* プログレスバー */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-5">
        {/* 問題文 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400">
              {currentQuestion.exam_session} {t('問', 'câu')}{currentQuestion.question_number}
            </span>
            <button
              onClick={() => setShowVi(!showVi)}
              className={cn(
                'text-xs px-3 py-1 rounded-full border transition-colors',
                showVi ? 'bg-green-600 text-white border-green-600' : 'text-gray-500 border-gray-200 hover:border-green-400'
              )}
            >
              🇻🇳 {t('ベトナム語訳', 'Xem tiếng Việt')}
            </button>
          </div>
          <p className="text-base font-medium text-gray-900 leading-relaxed">
            {currentQuestion.question_text.ja}
          </p>
          {showVi && (
            <p className="mt-3 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 leading-relaxed">
              {currentQuestion.question_text.vi}
            </p>
          )}
        </div>

        {/* 選択肢 */}
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrectChoice = i === currentQuestion.correct_answer;

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => !isAnswered && setSelectedAnswer(i)}
                className={cn(
                  'w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all font-medium text-sm',
                  !isAnswered && !isSelected && 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50',
                  !isAnswered && isSelected && 'bg-blue-50 border-blue-500 text-blue-800',
                  isAnswered && isCorrectChoice && 'bg-green-50 border-green-400 text-green-800',
                  isAnswered && isSelected && !isCorrectChoice && 'bg-red-50 border-red-400 text-red-700',
                  isAnswered && !isSelected && !isCorrectChoice && 'bg-gray-50 border-gray-100 text-gray-400',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                      !isAnswered && isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600',
                      isAnswered && isCorrectChoice ? 'bg-green-500 text-white' : '',
                      isAnswered && isSelected && !isCorrectChoice ? 'bg-red-400 text-white' : '',
                    )}>
                      {choice.label}
                    </span>
                    <span>{choice.text.ja}</span>
                  </div>
                  {isAnswered && isCorrectChoice && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrectChoice && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                </div>
                {showVi && (
                  <p className="mt-1.5 text-xs text-gray-400 ml-10">{choice.text.vi}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* 解説 */}
        {isAnswered && explanation && (
          <ExplanationPanel
            isCorrect={isCorrect}
            explanation={explanation as ExamQuestion['explanation']}
            choices={currentQuestion.choices}
            selectedAnswer={selectedAnswer!}
            correctAnswer={currentQuestion.correct_answer}
            locale={locale}
          />
        )}
      </div>

      {/* 固定フッター */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {submitting ? t('送信中...', 'Đang gửi...') : t('回答する', 'Trả lời')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex + 1 >= questionIds.length
                ? t('結果を見る', 'Xem kết quả')
                : t('次の問題', 'Câu tiếp theo')
              }
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* AIチャット */}
      <AIChatFloating question={currentQuestion} locale={locale} />
    </div>
  );
}
