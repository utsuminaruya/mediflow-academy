"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  BookOpen,
  MessageCircle,
  Flame,
  Clock,
  Target,
  ChevronRight,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react";

const mockUser = {
  full_name: "Nguyen Van An",
  japanese_level: "N4",
  streak: 7,
  totalHours: 24.5,
};

const mockCourses = [
  {
    id: "c1",
    title: "JLPT N5 完全対策コース",
    category: "JLPT",
    progress: 40,
    nextLesson: "第3課: 基本文法「〜てください」",
    emoji: "🎌",
    color: "from-red-400 to-red-600",
  },
  {
    id: "c2",
    title: "介護の日本語 基礎コース",
    category: "介護専門",
    progress: 25,
    nextLesson: "第2課: 申し送りの書き方",
    emoji: "🏥",
    color: "from-blue-400 to-blue-600",
  },
];

const mockAchievements = [
  { type: "streak", label: "7日連続学習", emoji: "🔥", earned: true },
  { type: "quiz_perfect", label: "クイズ満点", emoji: "⭐", earned: true },
  { type: "course_completed", label: "コース完了", emoji: "🎓", earned: false },
  { type: "jlpt_passed", label: "JLPT合格", emoji: "🏆", earned: false },
];

const mockWeakPoints = [
  { topic: "動詞の活用（て形）", score: 45, recommendation: "もっと練習が必要です" },
  { topic: "カタカナ読み", score: 60, recommendation: "少し練習しましょう" },
  { topic: "数字・時間の表現", score: 72, recommendation: "良い進捗です" },
];

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("dashboard");
  const { locale } = use(params);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 pt-8 pb-20">
        <div className="container mx-auto max-w-5xl">
          <p className="text-white/70 text-sm mb-1">{t("welcome")}、</p>
          <h1 className="text-2xl font-bold mb-1">{mockUser.full_name} さん</h1>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              日本語レベル: {mockUser.japanese_level}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center p-4">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">{mockUser.streak}</div>
            <div className="text-xs text-muted">{t("streak")}</div>
          </div>
          <div className="card text-center p-4">
            <Clock className="w-6 h-6 text-primary-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">{mockUser.totalHours}h</div>
            <div className="text-xs text-muted">{t("totalTime")}</div>
          </div>
          <div className="card text-center p-4">
            <Target className="w-6 h-6 text-secondary-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">N3</div>
            <div className="text-xs text-muted">目標</div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">{t("aiRecommendation")}</p>
              <p className="text-white/80 text-sm leading-relaxed">
                今日は「て形」の練習が必要です。昨日のクイズで間違いが多かった
                「動詞のて形」を重点的に学習しましょう。
                Medi先生に質問してみてください！
              </p>
              <Link
                href={`/${locale}/ai-tutor`}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium px-4 py-2 rounded-xl mt-3"
              >
                <MessageCircle className="w-4 h-4" />
                {t("startAiTutor")}
              </Link>
            </div>
          </div>
        </div>

        {/* Current Courses */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t("continueCourse")}</h2>
        <div className="space-y-4 mb-6">
          {mockCourses.map((course) => (
            <div key={course.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {course.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="badge badge-primary text-xs">{course.category}</span>
                    <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
                  <p className="text-sm text-muted truncate">{t("nextLesson")}: {course.nextLesson}</p>
                  <div className="progress-bar mt-2">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/${locale}/courses/${course.id}`}
                  className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Weak Points */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              {t("weeklyWeakness")}
            </h2>
          </div>
          <div className="space-y-3">
            {mockWeakPoints.map((point, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{point.topic}</span>
                  <span className="text-sm font-bold" style={{
                    color: point.score < 60 ? "#FF6B6B" : point.score < 75 ? "#F59E0B" : "#00B894"
                  }}>
                    {point.score}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${point.score}%`,
                      backgroundColor: point.score < 60 ? "#FF6B6B" : point.score < 75 ? "#F59E0B" : "#00B894"
                    }}
                  />
                </div>
                <p className="text-xs text-muted mt-1">{point.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            {t("recentAchievements")}
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {mockAchievements.map((ach, idx) => (
              <div
                key={idx}
                className={`text-center p-3 rounded-2xl transition-all ${
                  ach.earned
                    ? "bg-yellow-50 border-2 border-yellow-200"
                    : "bg-gray-50 border-2 border-gray-100 opacity-50"
                }`}
              >
                <div className="text-3xl mb-1">{ach.emoji}</div>
                <p className="text-xs font-medium text-gray-700 leading-tight">{ach.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB - AI Tutor */}
      <Link
        href={`/${locale}/ai-tutor`}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary-600 transition-colors z-50"
        title="AI家庭教師"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
}
