import Link from "next/link";

interface StaffStorySectionProps {
  locale: string;
}

// ── タイムラインステップ ──────────────────────────────────
const JOURNEY_STEPS = [
  {
    emoji: "✈️",
    year: "Day 1",
    label: "EPA経由で来日",
    quote: "「日本語はN4レベル。現場の会話が半分もわからなかった」",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
  },
  {
    emoji: "🏥",
    year: "Year 1–3",
    label: "介護現場で奮闘",
    quote: "「毎日知らない専門用語だらけ。でも利用者さんの笑顔が支えに」",
    color: "bg-teal-500",
    textColor: "text-teal-600",
    bgLight: "bg-teal-50",
  },
  {
    emoji: "🎓",
    year: "合格",
    label: "介護福祉士 国家試験 合格",
    quote: "「日本語と専門知識の壁を同時に乗り越えた。諦めなくてよかった」",
    color: "bg-green-500",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
  },
  {
    emoji: "👩‍⚕️",
    year: "合格",
    label: "看護師 国家試験 合格",
    quote: "「一度不合格。でもその経験が一番の教科書になった」",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    bgLight: "bg-purple-50",
  },
  {
    emoji: "🏆",
    year: "N1",
    label: "JLPT N1 取得",
    quote: "「専門書が辞書なしで読める。日本語の壁を完全に突破した」",
    color: "bg-orange-500",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
  },
  {
    emoji: "🌟",
    year: "現在",
    label: "医療通訳として活躍中",
    quote: "「外国人患者さんと医療者の架け橋として、今日も現場に立っています」",
    color: "bg-rose-500",
    textColor: "text-rose-600",
    bgLight: "bg-rose-50",
  },
];

// ── 資格・実績バッジ ──────────────────────────────────────
const ACHIEVEMENTS = [
  { label: "EPA候補者", icon: "✈️" },
  { label: "介護福祉士", icon: "🎓" },
  { label: "看護師", icon: "👩‍⚕️" },
  { label: "JLPT N1", icon: "🏆" },
  { label: "医療通訳", icon: "🌐" },
];

export function StaffStorySection({ locale }: StaffStorySectionProps) {
  return (
    <section className="rounded-3xl overflow-hidden border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 mb-12">
      {/* ── ヘッダー ── */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full tracking-wider">
            MEDIFLOW STORY
          </span>
          <span className="text-xs text-white/60">唯一無二の成功実体験</span>
        </div>
        <h2 className="text-xl font-bold">
          EPA来日 → 介護福祉士 → 看護師 → N1 → 医療通訳
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Mediflowスタッフが実際に歩んだ道のりがそのままコンテンツになっています
        </p>
      </div>

      <div className="p-6">
        {/* ── プロフィールカード ── */}
        <div className="flex flex-col sm:flex-row items-start gap-5 mb-8 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* アバター */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            👩‍⚕️
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-bold text-gray-900 text-lg">ズン（メディフロースタッフ）</span>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                現役医療通訳
              </span>
            </div>
            {/* 資格ラベル */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ACHIEVEMENTS.map((a, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium"
                >
                  <span>{a.icon}</span>
                  {a.label}
                </span>
              ))}
            </div>
            {/* 引用 */}
            <blockquote className="border-l-4 border-primary-400 pl-4 italic text-gray-600 text-sm leading-relaxed">
              「来日当初、現場で何を言われているか半分もわからなかった。でも諦めなかった。
              Mediflowで教えているのは、私が本当に必要だった日本語と知識です。
              あなたも絶対にできます。」
            </blockquote>
          </div>
        </div>

        {/* ── タイムライン ── */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-gray-300 inline-block" />
            成功への軌跡
            <span className="flex-1 h-px bg-gray-300 inline-block" />
          </h3>

          {/* モバイル: 縦並び / デスクトップ: 横スクロール */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} className={`relative ${step.bgLight} rounded-2xl p-4`}>
                {/* ステップ番号 */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 ${step.color} rounded-xl flex items-center justify-center text-lg text-white flex-shrink-0 shadow-sm`}>
                    {step.emoji}
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${step.textColor}`}>{step.year}</span>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{step.label}</p>
                  </div>
                  {/* 矢印（最後以外） */}
                  {i < JOURNEY_STEPS.length - 1 && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-gray-300 text-xl hidden lg:block z-10">
                      →
                    </span>
                  )}
                </div>
                <p className={`text-xs ${step.textColor} italic leading-relaxed`}>{step.quote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 数字で見る実績 ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center bg-white rounded-2xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-primary-600">5+</div>
            <div className="text-xs text-gray-500 mt-0.5">資格・検定取得</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-secondary-600">N1</div>
            <div className="text-xs text-gray-500 mt-0.5">日本語能力</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-green-600">EPA</div>
            <div className="text-xs text-gray-500 mt-0.5">スタートライン</div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-5 text-white text-center">
          <p className="font-bold text-base mb-1">あなたも同じ道を歩けます</p>
          <p className="text-white/75 text-xs mb-4">
            ズンが実際に使った勉強法・乗り越え方をMediflowのコースに詰め込みました
          </p>
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary-50 transition-colors shadow-sm"
          >
            📚 コースを今すぐ始める →
          </Link>
        </div>
      </div>
    </section>
  );
}
