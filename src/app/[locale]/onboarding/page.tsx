"use client";

import { useState, use, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { LOCALE_FLAGS, LOCALE_LABELS, LOCALES } from "@/constants";
import type { Locale } from "@/types";
import { createClient } from "@/lib/supabase/client";

const NATIONALITIES = [
  "ベトナム", "フィリピン", "インドネシア", "ミャンマー",
  "中国", "タイ", "カンボジア", "ネパール", "その他"
];

const GOALS = [
  { id: "jlpt_n5", label: "JLPT N5合格", emoji: "📝" },
  { id: "jlpt_n4", label: "JLPT N4合格", emoji: "📚" },
  { id: "jlpt_n3", label: "JLPT N3合格", emoji: "🎯" },
  { id: "tokutei_ginou", label: "特定技能「介護」取得", emoji: "🏅" },
  { id: "kaigofukushishi", label: "介護福祉士国家試験合格", emoji: "🏆" },
  { id: "work_japan", label: "日本での就職", emoji: "💼" },
];

const EXPERIENCE_OPTIONS = [
  { id: "none", label: "経験なし" },
  { id: "some", label: "少し（1年未満）" },
  { id: "experienced", label: "あり（1〜3年）" },
  { id: "expert", label: "ベテラン（3年以上）" },
];

const JAPANESE_LEVELS = [
  { id: "beginner", label: "まったくの初心者", description: "ひらがなも分かりません" },
  { id: "n5", label: "N5レベル", description: "ひらがな・カタカナが分かります" },
  { id: "n4", label: "N4レベル", description: "基本的な会話ができます" },
  { id: "n3", label: "N3レベル", description: "日常会話が大体できます" },
  { id: "n2", label: "N2以上", description: "ビジネス日本語も話せます" },
];

// AIプラン生成のステップ表示（アニメーション付き）
const GENERATION_STEPS = [
  "✅ プロフィール分析完了",
  "✅ 目標に合わせた教材選定",
  "✅ 週間スケジュール生成完了",
  "✅ おすすめコースを選択しました",
  "🎉 学習プラン完成！",
];

interface OnboardingData {
  fullName: string;
  nationality: string;
  nativeLanguage: Locale;
  japaneseLevel: string;
  experience: string;
  goals: string[];
  dailyStudyMinutes: number;
}

export default function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const { locale } = use(params);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationDone, setGenerationDone] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    nationality: "",
    nativeLanguage: "vi",
    japaneseLevel: "",
    experience: "",
    goals: [],
    dailyStudyMinutes: 30,
  });

  const totalSteps = 4;

  // Step 4 に来たら自動的にAI生成アニメーションを開始
  useEffect(() => {
    if (step === 4) {
      setIsGenerating(true);
      setGenerationStep(0);
      setGenerationDone(false);

      // ステップを順番に表示
      const stepDelay = 600;
      GENERATION_STEPS.forEach((_, idx) => {
        setTimeout(() => {
          setGenerationStep(idx + 1);
          if (idx === GENERATION_STEPS.length - 1) {
            // 最後のステップ後に完了
            setTimeout(async () => {
              setGenerationDone(true);

              // localStorageに保存（ダッシュボード等で使用）
              if (typeof window !== "undefined") {
                localStorage.setItem("mediflow_user", JSON.stringify({
                  fullName: data.fullName,
                  nationality: data.nationality,
                  nativeLanguage: data.nativeLanguage,
                  japaneseLevel: data.japaneseLevel,
                  experience: data.experience,
                  goals: data.goals,
                  dailyStudyMinutes: data.dailyStudyMinutes,
                }));
              }

              // Supabaseのusersテーブルにも保存（永続化）
              try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                  await supabase
                    .from("users")
                    .update({
                      full_name: data.fullName,
                      nationality: data.nationality,
                      native_language: data.nativeLanguage,
                      japanese_level: data.japaneseLevel,
                      goals: data.goals,
                      daily_study_minutes: data.dailyStudyMinutes,
                      onboarding_completed: true,
                    })
                    .eq("id", user.id);
                }
              } catch {
                // Supabase保存失敗はlocalStorageで代替するため無視
              }
            }, 600);
          }
        }, stepDelay * (idx + 1));
      });
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleGoal = (goalId: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.fullName.trim() && data.nationality && data.nativeLanguage;
      case 2: return data.japaneseLevel && data.experience;
      case 3: return data.goals.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary-600">
              Step {step} / {totalSteps}
            </span>
            <span className="text-sm text-muted">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="card shadow-xl">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("step1.title")}
              </h2>
              <p className="text-muted mb-6">Mediflow Academyへようこそ！</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("step1.name")}
                  </label>
                  <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    className="input"
                    placeholder="例: Nguyen Van An"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("step1.nationality")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {NATIONALITIES.map((nat) => (
                      <button
                        key={nat}
                        onClick={() => setData({ ...data, nationality: nat })}
                        className={`py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          data.nationality === nat
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {nat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("step1.nativeLanguage")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {LOCALES.filter((l) => l !== "ja").map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setData({ ...data, nativeLanguage: lang as Locale })}
                        className={`flex items-center gap-3 py-3 px-4 rounded-xl border-2 transition-all ${
                          data.nativeLanguage === lang
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xl">{LOCALE_FLAGS[lang as Locale]}</span>
                        <span className="text-sm font-medium">{LOCALE_LABELS[lang as Locale]}</span>
                        {data.nativeLanguage === lang && (
                          <CheckCircle className="w-4 h-4 text-primary-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Level Assessment */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("step2.title")}
              </h2>
              <p className="text-muted mb-6">正直に答えてください。恥ずかしくないです！</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    今の日本語レベルは？
                  </label>
                  <div className="space-y-2">
                    {JAPANESE_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setData({ ...data, japaneseLevel: level.id })}
                        className={`w-full text-left py-3 px-4 rounded-xl border-2 transition-all ${
                          data.japaneseLevel === level.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{level.label}</div>
                            <div className="text-sm text-muted">{level.description}</div>
                          </div>
                          {data.japaneseLevel === level.id && (
                            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t("step2.experience")}は？
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setData({ ...data, experience: opt.id })}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          data.experience === opt.id
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("step3.title")}
              </h2>
              <p className="text-muted mb-6">複数選択できます</p>

              <div className="space-y-3 mb-6">
                {GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full flex items-center gap-4 py-4 px-4 rounded-xl border-2 transition-all ${
                      data.goals.includes(goal.id)
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{goal.emoji}</span>
                    <span className="font-medium text-gray-900">{goal.label}</span>
                    {data.goals.includes(goal.id) && (
                      <CheckCircle className="w-5 h-5 text-primary-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1日の学習時間: <span className="text-primary-600 font-bold">{data.dailyStudyMinutes}分</span>
                </label>
                <input
                  type="range"
                  min={15}
                  max={120}
                  step={15}
                  value={data.dailyStudyMinutes}
                  onChange={(e) => setData({ ...data, dailyStudyMinutes: Number(e.target.value) })}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>15分</span>
                  <span>120分</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Plan Generation - 自動アニメーション */}
          {step === 4 && (
            <div className="text-center py-6">
              {!generationDone ? (
                <>
                  <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {data.fullName ? `${data.fullName}さん専用の` : "あなた専用の"}
                    <br />学習プランを作成中...
                  </h2>
                  <p className="text-muted mb-6 text-sm">
                    AIがプロフィールを分析しています。少々お待ちください。
                  </p>
                  <div className="mt-4 space-y-3 text-left max-w-xs mx-auto">
                    {GENERATION_STEPS.map((item, idx) => (
                      <p
                        key={idx}
                        className={`text-sm transition-all duration-300 ${
                          idx < generationStep
                            ? "text-gray-800 font-medium"
                            : "text-gray-300"
                        }`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <span className="text-5xl">🎉</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    学習プラン完成！
                  </h2>
                  <p className="text-muted mb-6">
                    {data.fullName ? `${data.fullName}さん、` : ""}さっそく学習を始めましょう！
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "目標", value: `${data.goals.length}個` },
                      { label: "学習時間", value: `${data.dailyStudyMinutes}分/日` },
                      { label: "言語", value: LOCALE_LABELS[data.nativeLanguage] },
                    ].map((item) => (
                      <div key={item.label} className="bg-green-50 rounded-xl p-3 text-center">
                        <div className="font-bold text-gray-900">{item.value}</div>
                        <div className="text-xs text-muted">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push(`/${locale}/courses`)}
                    className="btn-primary w-full text-center text-lg py-4"
                  >
                    コース一覧へ進む 🚀
                  </button>
                  <p className="text-xs text-muted mt-4">
                    いつでもAI家庭教師「Medi先生」に質問できます
                  </p>
                </>
              )}
            </div>
          )}

          {/* Navigation (Step 1〜3のみ表示) */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {t("back")}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 3 ? "プランを作成する ✨" : t("next")}
                {step < 3 && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Skip (Step 1〜3のみ) */}
        {step < 4 && (
          <div className="text-center mt-4">
            <button
              onClick={() => router.push(`/${locale}/courses`)}
              className="text-sm text-muted hover:text-gray-600 transition-colors"
            >
              スキップしてコース一覧へ →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
