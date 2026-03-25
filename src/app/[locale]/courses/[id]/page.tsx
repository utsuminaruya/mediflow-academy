'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronLeft, Lock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonView } from '@/components/learning/lesson-view';
import { useState } from 'react';

interface LessonPageProps {
  params: Promise<{ locale: string; id: string }>;
}

// Mock lesson data - in production this comes from Supabase
const mockLessons: Record<string, {
  courseTitle: { ja: string; vi: string };
  lesson: {
    title: string;
    titleTranslation?: string;
    introduction: string;
    keyPoints: string[];
    examples: { japanese: string; reading?: string; translation: string }[];
    quiz?: {
      question: string;
      options: { id: string; text: string }[];
      correctId: string;
      explanation?: string;
    };
    xpReward: number;
  };
  isLocked: boolean;
  requiredPlan: string;
}> = {
  '1': {
    courseTitle: { ja: 'N5 基礎語彙', vi: 'Từ vựng cơ bản N5' },
    isLocked: false,
    requiredPlan: 'free',
    lesson: {
      title: '介護の基本語彙 - レッスン1',
      titleTranslation: 'Từ vựng cơ bản điều dưỡng - Bài 1',
      introduction: '今日は介護現場でよく使う基本的な言葉を学びましょう。これらの言葉は毎日使う大切な表現です。\n\nHôm nay chúng ta sẽ học những từ cơ bản thường dùng trong môi trường chăm sóc điều dưỡng.',
      keyPoints: [
        'お体の具合はいかがですか？ (O-karada no guai wa ikaga desu ka?) - お体の調子を聞く',
        'お食事の時間です (O-shokuji no jikan desu) - 食事の時間を知らせる',
        'お手洗いはこちらです (O-tearai wa kochira desu) - トイレの場所を案内する',
        'ゆっくりでいいですよ (Yukkuri de ii desu yo) - 焦らせずに安心させる',
      ],
      examples: [
        {
          japanese: 'お体の具合はいかがですか？',
          reading: 'おからだのぐあいはいかがですか？',
          translation: 'Cơ thể bạn cảm thấy thế nào? / 체컨디션은 어떠세요?',
        },
        {
          japanese: 'お食事の時間です。食べましょう。',
          reading: 'おしょくじのじかんです。たべましょう。',
          translation: 'Đến giờ ăn rồi. Hãy ăn nào.',
        },
        {
          japanese: 'ゆっくり休んでください。',
          reading: 'ゆっくりやすんでください。',
          translation: 'Hãy nghỉ ngơi từ từ nhé.',
        },
      ],
      quiz: {
        question: '「お体の具合はいかがですか？」の意味は何ですか？',
        options: [
          { id: 'a', text: 'ご飯を食べましたか？' },
          { id: 'b', text: '体の調子はどうですか？' },
          { id: 'c', text: 'どこに行きますか？' },
          { id: 'd', text: '何時ですか？' },
        ],
        correctId: 'b',
        explanation: '「具合」は「調子・状態」という意味です。相手の健康状態を丁寧に聞く表現です。\n"具合" có nghĩa là "tình trạng, trạng thái". Đây là cách hỏi lịch sự về tình trạng sức khỏe của đối phương.',
      },
      xpReward: 20,
    },
  },
  '2': {
    courseTitle: { ja: 'N4 文法マスター', vi: 'Ngữ pháp N4 Master' },
    isLocked: false,
    requiredPlan: 'basic',
    lesson: {
      title: 'N4文法: 〜てしまう',
      titleTranslation: 'Ngữ pháp N4: 〜てしまう',
      introduction: '「〜てしまう」は、動作が完了したこと、または後悔・意図しない結果を表します。\n\n「〜てしまう」 diễn tả hành động đã hoàn thành, hoặc sự hối tiếc/kết quả ngoài ý muốn.',
      keyPoints: [
        '食べてしまった → 食べ終えた（完了）',
        '忘れてしまった → 忘れたことへの後悔',
        '〜ちゃった / 〜じゃった: 口語形',
        '介護: 薬を飲ませてしまいました → 誤って飲ませてしまった',
      ],
      examples: [
        {
          japanese: '全部食べてしまいました。',
          reading: 'ぜんぶたべてしまいました。',
          translation: 'Tôi đã ăn hết rồi.',
        },
        {
          japanese: '薬を飲み忘れてしまいました。',
          reading: 'くすりをのみわすれてしまいました。',
          translation: 'Tôi đã quên uống thuốc mất.',
        },
        {
          japanese: '転んでしまって、すみません。',
          reading: 'ころんでしまって、すみません。',
          translation: 'Tôi đã ngã mất, xin lỗi.',
        },
      ],
      quiz: {
        question: '「鍵を忘れてしまった」の意味は？',
        options: [
          { id: 'a', text: '鍵を見つけた' },
          { id: 'b', text: '鍵を忘れたことへの後悔がある' },
          { id: 'c', text: '鍵を持っている' },
          { id: 'd', text: '鍵を作った' },
        ],
        correctId: 'b',
        explanation: '「〜てしまう」は後悔や意図しない結果を表します。"Tôi đã để quên chìa khóa mất" - biểu đạt sự hối tiếc.',
      },
      xpReward: 25,
    },
  },
  '3': {
    courseTitle: { ja: 'N3 読解練習', vi: 'Luyện đọc N3' },
    isLocked: true,
    requiredPlan: 'pro',
    lesson: {
      title: 'N3 読解: 介護施設のお知らせ',
      titleTranslation: 'Đọc hiểu N3: Thông báo của cơ sở chăm sóc',
      introduction: 'このレッスンはPROプランが必要です。',
      keyPoints: [],
      examples: [],
      xpReward: 30,
    },
  },
};

export default function LessonPage({ params }: LessonPageProps) {
  const { locale, id } = use(params);
  const t = useTranslations();
  const [isComplete, setIsComplete] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const data = mockLessons[id] || mockLessons['1'];
  const { lesson, courseTitle } = data;

  // User plan check (mock)
  const userPlan = 'basic';
  const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const effectivelyLocked = planOrder[data.requiredPlan] > planOrder[userPlan];

  const handleComplete = (score: number) => {
    const xpEarned = Math.round((score / 100) * lesson.xpReward);
    setEarnedXp(xpEarned);
    setIsComplete(true);

    // In production: POST to /api/progress
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: id,
        status: 'completed',
        quizScore: score,
        xpEarned,
      }),
    }).catch(() => {});
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/${locale}/courses`}>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <ChevronLeft className="h-4 w-4" />
            {locale === 'ja' ? courseTitle.ja : courseTitle.vi}
          </Button>
        </Link>
      </div>

      {/* Locked content */}
      {effectivelyLocked && (
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            {locale === 'ja' ? 'このレッスンはロックされています' : 'Bài học này đã bị khóa'}
          </h2>
          <p className="text-gray-500 mb-6">
            {data.requiredPlan === 'pro'
              ? locale === 'ja'
                ? 'PROプランにアップグレードして全コースにアクセス'
                : 'Nâng cấp lên gói PRO để truy cập tất cả khóa học'
              : locale === 'ja'
                ? 'BASICプランにアップグレードして解除'
                : 'Nâng cấp lên gói BASIC để mở khóa'
            }
          </p>
          <Link href={`/${locale}/pricing`}>
            <Button>
              {t('pricing.upgrade')}
            </Button>
          </Link>
        </div>
      )}

      {/* Lesson content */}
      {!effectivelyLocked && !isComplete && (
        <LessonView
          lesson={lesson}
          onComplete={handleComplete}
          locale={locale}
        />
      )}

      {/* Completion screen */}
      {!effectivelyLocked && isComplete && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Star className="h-12 w-12 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'ja' ? 'レッスン完了！' : 'Hoàn thành bài học!'}
          </h2>
          <div className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-flex mb-8">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-700 font-bold text-xl">+{earnedXp} XP {t('lesson.xpEarned')}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/courses`}>
              <Button variant="outline">
                {locale === 'ja' ? 'コース一覧に戻る' : 'Về danh sách khóa học'}
              </Button>
            </Link>
            <Link href={`/${locale}/ai-tutor`}>
              <Button>
                {locale === 'ja' ? 'Medi先生に質問する' : 'Hỏi Medi-sensei'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
