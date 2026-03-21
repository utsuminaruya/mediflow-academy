"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  RotateCcw,
  CheckCircle,
  X,
  Trophy,
} from "lucide-react";

// Mock lesson data
const LESSON_DATA: Record<string, {
  title: string;
  courseId: string;
  type: string;
  vocabulary?: {
    word: string;
    reading: string;
    translation: { vi: string; en: string };
    example: string;
    exampleTranslation: { vi: string; en: string };
  }[];
  quizQuestions?: {
    question: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
  }[];
}> = {
  "l1000000-0000-0000-0000-000000000001": {
    title: "第1課: 体の部位（語彙）",
    courseId: "c1000000-0000-0000-0000-000000000001",
    type: "vocabulary",
    vocabulary: [
      { word: "頭", reading: "あたま", translation: { vi: "đầu", en: "head" }, example: "頭が痛いです。", exampleTranslation: { vi: "Tôi bị đau đầu.", en: "My head hurts." } },
      { word: "手", reading: "て", translation: { vi: "tay", en: "hand" }, example: "手を洗ってください。", exampleTranslation: { vi: "Vui lòng rửa tay.", en: "Please wash your hands." } },
      { word: "足", reading: "あし", translation: { vi: "chân", en: "foot/leg" }, example: "足が痛いです。", exampleTranslation: { vi: "Tôi bị đau chân.", en: "My leg hurts." } },
      { word: "背中", reading: "せなか", translation: { vi: "lưng", en: "back" }, example: "背中を洗います。", exampleTranslation: { vi: "Tôi rửa lưng.", en: "I will wash the back." } },
      { word: "お腹", reading: "おなか", translation: { vi: "bụng", en: "stomach" }, example: "お腹が痛いですか？", exampleTranslation: { vi: "Bạn có đau bụng không?", en: "Does your stomach hurt?" } },
    ],
  },
  "l1000000-0000-0000-0000-000000000005": {
    title: "確認テスト: 第1〜4課",
    courseId: "c1000000-0000-0000-0000-000000000001",
    type: "quiz",
    quizQuestions: [
      {
        question: "「頭」の読み方は何ですか？",
        options: [
          { text: "あたま", isCorrect: true },
          { text: "てあし", isCorrect: false },
          { text: "むね", isCorrect: false },
          { text: "せなか", isCorrect: false },
        ],
        explanation: "「頭」は「あたま」と読みます。英語では \"head\" です。",
      },
      {
        question: "「座ってください」はどういう意味ですか？",
        options: [
          { text: "立ってください", isCorrect: false },
          { text: "座ってください = Please sit down", isCorrect: true },
          { text: "歩いてください", isCorrect: false },
          { text: "寝てください", isCorrect: false },
        ],
        explanation: "「座る」は sit を意味します。「〜てください」は丁寧な依頼の表現です。",
      },
      {
        question: "「めまい」の意味は何ですか？",
        options: [
          { text: "吐き気 (nausea)", isCorrect: false },
          { text: "便秘 (constipation)", isCorrect: false },
          { text: "めまい = dizziness (chóng mặt)", isCorrect: true },
          { text: "熱 (fever)", isCorrect: false },
        ],
        explanation: "「めまい」は dizziness（目が回る感覚）です。",
      },
    ],
  },
};

function VocabularyLesson({
  vocab,
  locale,
}: {
  vocab: typeof LESSON_DATA[string]["vocabulary"];
  locale: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [againCards, setAgainCards] = useState<Set<number>>(new Set());

  if (!vocab) return null;

  const current = vocab[currentIndex];
  const isLast = currentIndex === vocab.length - 1;
  const progress = Math.round(((knownCards.size) / vocab.length) * 100);

  const handleKnow = () => {
    setKnownCards((prev) => new Set([...prev, currentIndex]));
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
      setShowTranslation(false);
    }
  };

  const handleAgain = () => {
    setAgainCards((prev) => new Set([...prev, currentIndex]));
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
      setShowTranslation(false);
    }
  };

  if (knownCards.size === vocab.length) {
    return (
      <div className="text-center py-16">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          レッスン完了！🎉
        </h2>
        <p className="text-muted mb-2">{vocab.length}個の単語を覚えました</p>
        <p className="text-sm text-muted mb-8">
          {againCards.size > 0 && `${againCards.size}個は復習が必要です`}
        </p>
        <Link href={`/${locale}/courses/c1000000-0000-0000-0000-000000000001`} className="btn-primary">
          コースに戻る →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>{currentIndex + 1} / {vocab.length}</span>
          <span>覚えた: {knownCards.size}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card */}
      <div
        className="card shadow-lg cursor-pointer min-h-64 flex flex-col items-center justify-center text-center transition-all hover:shadow-xl"
        onClick={() => setShowBack(!showBack)}
      >
        {!showBack ? (
          <>
            <p className="text-5xl font-bold text-gray-900 mb-3">{current.word}</p>
            <p className="text-2xl text-gray-400">{current.reading}</p>
            <p className="text-sm text-muted mt-4">タップして意味を確認</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-gray-900 mb-2">{current.word}</p>
            <p className="text-xl text-gray-500 mb-4">{current.reading}</p>
            <div className="bg-primary-50 rounded-xl p-4 w-full">
              <p className="text-xl font-bold text-primary-700">
                {locale === "vi" ? current.translation.vi : current.translation.en}
              </p>
            </div>
            <div className="mt-4 text-left w-full">
              <p className="text-sm font-medium text-gray-700 mb-1">例文:</p>
              <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                {current.example}
              </p>
              <p className="text-sm text-muted mt-1">
                {locale === "vi" ? current.exampleTranslation.vi : current.exampleTranslation.en}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {showBack && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleAgain}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            もう一度
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-green-200 bg-green-50 text-green-600 font-bold hover:bg-green-100 transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            覚えた！
          </button>
        </div>
      )}

      {!showBack && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => currentIndex > 0 && (setCurrentIndex(currentIndex - 1), setShowBack(false))}
            disabled={currentIndex === 0}
            className="p-4 rounded-2xl border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowBack(true)}
            className="flex-1 btn-primary"
          >
            確認する
          </button>
          <button
            onClick={() => !isLast && (setCurrentIndex(currentIndex + 1), setShowBack(false))}
            disabled={isLast}
            className="p-4 rounded-2xl border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function QuizLesson({
  questions,
  locale,
}: {
  questions: typeof LESSON_DATA[string]["quizQuestions"];
  locale: string;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (!questions) return null;

  const question = questions[currentQ];
  const isAnswered = selected !== null;
  const isLast = currentQ === questions.length - 1;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    const isCorrect = question.options[idx].isCorrect;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="text-7xl mb-6">
          {percentage >= 80 ? "🎉" : percentage >= 60 ? "😊" : "😅"}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          テスト完了！
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          {score} / {questions.length} 問正解 ({percentage}%)
        </p>
        {percentage >= 80 ? (
          <p className="text-green-600 font-medium mb-8">素晴らしい！次のレッスンに進みましょう！</p>
        ) : (
          <p className="text-yellow-600 font-medium mb-8">もう少し練習が必要です。AI家庭教師に質問してみましょう！</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setShowResult(false); setAnswers([]); }}
            className="flex-1 btn-outline"
          >
            もう一度
          </button>
          <Link href={`/${locale}/courses/c1000000-0000-0000-0000-000000000001`} className="flex-1 btn-primary text-center">
            コースへ →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>問題 {currentQ + 1} / {questions.length}</span>
          <span>正解: {score}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="card mb-4">
        <p className="text-lg font-bold text-gray-900 mb-2">Q{currentQ + 1}.</p>
        <p className="text-gray-800">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          let style = "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50";
          if (isAnswered) {
            if (option.isCorrect) {
              style = "border-green-400 bg-green-50 text-green-800";
            } else if (selected === idx) {
              style = "border-red-400 bg-red-50 text-red-700";
            } else {
              style = "border-gray-100 bg-gray-50 text-gray-400";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option.text}
                {isAnswered && option.isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                )}
                {isAnswered && selected === idx && !option.isCorrect && (
                  <X className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className={`rounded-xl p-4 mb-4 ${answers[answers.length - 1] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className="text-sm font-semibold mb-1">
            {answers[answers.length - 1] ? "✅ 正解！" : "❌ 不正解"}
          </p>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      {isAnswered && (
        <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
          {isLast ? "結果を見る 🎉" : "次の問題 →"}
        </button>
      )}
    </div>
  );
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; lessonId: string }>;
}) {
  const { locale, lessonId } = use(params);
  const lesson = LESSON_DATA[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">レッスンが見つかりません</p>
          <Link href={`/${locale}/courses`} className="btn-primary">
            コース一覧へ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-xl flex items-center gap-3">
          <Link
            href={`/${locale}/courses/${lesson.courseId}`}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm truncate">{lesson.title}</h1>
            <p className="text-xs text-muted capitalize">{lesson.type}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-xl px-4 py-8">
        {lesson.type === "vocabulary" && lesson.vocabulary && (
          <VocabularyLesson vocab={lesson.vocabulary} locale={locale} />
        )}
        {lesson.type === "quiz" && lesson.quizQuestions && (
          <QuizLesson questions={lesson.quizQuestions} locale={locale} />
        )}
        {lesson.type !== "vocabulary" && lesson.type !== "quiz" && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">このレッスンタイプは準備中です</p>
            <Link href={`/${locale}/ai-tutor`} className="btn-primary inline-block mt-4">
              AI家庭教師で練習する
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
