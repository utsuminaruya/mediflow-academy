"use client";

import { use, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  PartyPopper,
  X,
} from "lucide-react";

interface StoredUser {
  fullName?: string;
  japaneseLevel?: string;
  nativeLanguage?: string;
  nationality?: string;
  goals?: string[];
  experience?: string;
  dailyStudyMinutes?: number;
}

const LEVEL_LABEL: Record<string, string> = {
  none: "初級前",
  n5: "N5",
  n4: "N4",
  n3: "N3",
  n2: "N2",
  n1: "N1",
};

const mockCourses = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    title: "JLPT N5 完全対策コース",
    category: "JLPT",
    progress: 0,
    nextLesson: "第1課: ひらがなをマスター",
    emoji: "🎌",
    color: "from-red-400 to-red-600",
  },
  {
    id: "c2000000-0000-0000-0000-000000000001",
    title: "介護の日本語 基礎コース",
    category: "介護専門",
    progress: 0,
    nextLesson: "第1課: 介護施設と職種",
    emoji: "🏥",
    color: "from-blue-400 to-blue-600",
  },
];

const mockAchievements = [
  { type: "streak", label: "7日連続学習", emoji: "🔥", earned: false },
  { type: "quiz_perfect", label: "クイズ満点", emoji: "⭐", earned: false },
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
  const searchParams = useSearchParams();
  const [user, setUser] = useState<StoredUser>({});
  const [mounted, setMounted] = useState(false);
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("upgraded") === "true") {
      setShowUpgradeSuccess(true);
      // URLからパラメータを除去
      const url = new URL(window.location.href);
      url.searchParams.delete("upgraded");
      url.searchParams.delete("session_id");
      window.history.replaceState({}, "", url.toString());
    }
    try {
      const raw = localStorage.getItem("mediflow_user");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const displayName = user.fullName || "学習者";
  const levelLabel = LEVEL_LABEL[user.japaneseLevel || ""] || "N5";

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 🎉 決済成功バナー */}
      {showUpgradeSuccess && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3">
          <div className="container mx-auto max-w-5xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PartyPopper className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">プランへのアップグレードが完了しました！🎉</p>
                <p className="text-white/80 text-xs">コースのロックが解除されました。<Link href={`/${locale}/courses`} className="underline">コース一覧を見る →</Link></p>
              </div>
            </div>
            <button onClick={() => setShowUpgradeSuccess(false)} className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 pt-8 pb-20">
        <div className="container mx-auto max-w-5xl">
          <p className="text-white/70 text-sm mb-1">{t("welcome")}、</p>
          <h1 className="text-2xl font-bold mb-1">{displayName} さん</h1>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              日本語レベル: {levelLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center p-4">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-xs text-muted">{t("streak")}</div>
          </div>
          <div className="card text-center p-4">
            <Clock className="w-6 h-6 text-primary-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">0h</div>
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
                まずは基礎から始めましょう！ひらがな・カタカナをマスターして、
                介護現場で使える日本語の基礎を固めましょう。
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

        {/* Quick Links */}
        <div className="card mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            全コースを見る
          </h2>
          <Link
            href={`/${locale}/courses`}
            className="btn-primary w-full text-center block"
          >
            コース一覧へ →
          </Link>
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
