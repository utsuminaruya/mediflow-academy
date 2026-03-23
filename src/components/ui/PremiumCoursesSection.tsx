"use client";

import Link from "next/link";
import {
  Crown, Lock, Video, Users, BookOpen, Star, Check, Sparkles, FileText,
  ClipboardList, Award, Stethoscope, Target, Languages, UserCheck, PenLine,
  Briefcase, type LucideIcon,
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Paywall } from "@/components/ui/Paywall";

interface PremiumCoursesSectionProps {
  locale: string;
}

interface CourseItem {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  badge: string;
  badgeColor: string;
  features: string[];
  tags?: string[];
}

// ── スタンダードプラン：過去問コース ──────────────────────
const STANDARD_COURSES: CourseItem[] = [
  {
    Icon: ClipboardList,
    title: "特定技能「介護」試験 過去問コース",
    subtitle: "技能試験・日本語試験 5年分完全収録",
    description: "特定技能「介護」の技能試験と日本語試験の全過去問をAI解説付きで収録。出題傾向を把握し、弱点分野を集中強化。合格率向上を目指す実践型コース。",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    badge: "Standard以上",
    badgeColor: "bg-teal-100 text-teal-700",
    features: ["5年分・全問収録", "AI解説 ＋ 弱点分析", "模擬試験モード"],
    tags: ["過去問", "AI解説", "模擬試験"],
  },
  {
    Icon: Award,
    title: "介護福祉士国家試験 過去問コース",
    subtitle: "125問 × 5年分・多言語解説付き",
    description: "介護福祉士国家試験の過去問125問を5年分、母語解説付きで完全収録。出題傾向とキーワードを押さえ、苦手分野を分野別ランダム出題で着実に克服できます。",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    badge: "Standard以上",
    badgeColor: "bg-emerald-100 text-emerald-700",
    features: ["125問 × 5年分", "多言語解説（ベトナム語ほか）", "分野別ランダム出題"],
    tags: ["介護福祉士", "過去問", "多言語"],
  },
];

const PRO_COURSES: CourseItem[] = [
  {
    Icon: Stethoscope,
    title: "うつみ先生のライブ講座",
    subtitle: "現役看護師13年・現場の実例で学ぶ",
    description: "病院・特養・訪問で実際に使う申し送り、バイタル報告、ナースコール対応を毎月4回ライブで学ぶ。録画アーカイブもすべて閲覧できます。",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    badge: "Pro以上",
    badgeColor: "bg-purple-100 text-purple-700",
    features: ["月4回ライブ講座", "全録画アーカイブ視聴", "チャットで質問可"],
    tags: ["ライブ", "録画アーカイブ", "質問あり"],
  },
  {
    Icon: Target,
    title: "介護福祉士 試験集中対策",
    subtitle: "AI弱点分析 × うつみ先生の直前対策",
    description: "AIが過去問分析で苦手分野を特定→集中演習。試験1ヶ月前は週2回の直前対策ライブ。プレミアムは不合格時の合格保証付き。",
    color: "from-green-500 to-teal-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    badge: "Pro以上",
    badgeColor: "bg-purple-100 text-purple-700",
    features: ["AI弱点分析", "本番形式の模擬試験", "直前対策ライブ（週2回）"],
    tags: ["試験対策", "模擬試験", "AI分析"],
  },
  {
    Icon: Languages,
    title: "ベトナム語で学ぶ介護福祉士講座",
    subtitle: "EPA出身・N1取得・介護福祉士のバイリンガル講師",
    description: "日本語の壁を越えて、母語で本質を理解する。EPA経験者が合格者の勉強法を惜しみなく解説。N2〜N1レベルの専門用語もマスター。",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    badge: "Pro以上",
    badgeColor: "bg-purple-100 text-purple-700",
    features: ["ベトナム語で丁寧に解説", "EPA合格者の勉強法", "専門用語マスター"],
    tags: ["バイリンガル", "ベトナム語", "EPA"],
  },
];

const PREMIUM_COURSES: CourseItem[] = [
  {
    Icon: UserCheck,
    title: "マンツーマン指導（月2回・30分）",
    subtitle: "うつみ先生との1on1セッション",
    description: "苦手な単元の集中指導、試験前の最終確認、学習プランの見直しを個別セッションで。録画URLをあとで復習できます。",
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    badge: "Premiumのみ",
    badgeColor: "bg-yellow-100 text-yellow-800",
    features: ["月2回・30分/回", "録画URL共有", "24時間以内にフィードバック"],
  },
  {
    Icon: PenLine,
    title: "履歴書添削・面接練習",
    subtitle: "介護施設に刺さる日本語の書き方",
    description: "外国人ならではの強みを活かした履歴書の書き方と、施設の採用担当者が実際に見るポイントを講師が直接レビュー。模擬面接も実施。",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    badge: "Premiumのみ",
    badgeColor: "bg-yellow-100 text-yellow-800",
    features: ["履歴書・職務経歴書の添削", "模擬面接 + フィードバック", "多言語テンプレート付き"],
  },
  {
    Icon: Briefcase,
    title: "Mediflow 就職保証プログラム",
    subtitle: "合格 → 就職まで完全サポート",
    description: "介護福祉士試験合格後、提携施設への優先紹介。ビザ手続きから入職準備まで専任担当がサポート。（有料職業紹介事業 許可番号: 14-ユ-302174）",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    badge: "Premiumのみ",
    badgeColor: "bg-yellow-100 text-yellow-800",
    features: ["優先求人紹介", "ビザ手続きサポート", "入職後フォロー3ヶ月"],
  },
];

function CourseCard({
  course,
  isPremium = false,
}: {
  course: CourseItem;
  isPremium?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${course.color}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <course.Icon className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${course.badgeColor}`}>
            {isPremium ? <><Crown className="w-3 h-3 inline mr-0.5" />{course.badge}</> : course.badge}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-0.5">{course.title}</h3>
        <p className={`text-xs font-semibold mb-2 ${course.textColor}`}>{course.subtitle}</p>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{course.description}</p>

        <ul className="space-y-1.5 mb-3">
          {course.features.map((f, i) => (
            <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {"tags" in course && course.tags && (
          <div className="flex flex-wrap gap-1">
            {course.tags.map((tag: string, i: number) => (
              <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${course.bgColor} ${course.textColor}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LockedOverlay({ locale, requiredPlan }: { locale: string; requiredPlan: "standard" | "pro" | "premium" }) {
  const labelMap = { standard: "スタンダード", pro: "プロ", premium: "プレミアム" };
  const priceMap = { standard: "¥980/月〜", pro: "¥1,980/月〜", premium: "¥3,980/月〜" };
  const colorMap = { standard: "text-teal-600", pro: "text-purple-600", premium: "text-yellow-600" };
  const label = labelMap[requiredPlan];
  const priceLabel = priceMap[requiredPlan];
  return (
    <div className="relative">
      {/* 薄くロック表示 */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
        <Lock className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm font-bold text-gray-700">
          <span className={colorMap[requiredPlan]}>{label}プラン</span>
          で解放
        </p>
        <p className="text-xs text-gray-400 mb-3">{priceLabel} · 7日間無料体験あり</p>
        <Link
          href={`/${locale}/pricing`}
          className="flex items-center gap-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-3.5 h-3.5" />
          プランを見る
        </Link>
      </div>
      {/* ぼかした背景コンテンツ */}
      <div className="filter blur-sm pointer-events-none select-none">
        <div className="bg-white border border-gray-100 rounded-3xl p-5 h-60 opacity-50" />
      </div>
    </div>
  );
}

export function PremiumCoursesSection({ locale }: PremiumCoursesSectionProps) {
  const { canAccess, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse bg-gray-100 rounded-3xl h-12 w-48" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-60" />
          ))}
        </div>
      </div>
    );
  }

  const hasStandardAccess = canAccess("standard");
  const hasProAccess = canAccess("pro");
  const hasPremiumAccess = canAccess("premium");

  return (
    <div className="space-y-12">
      {/* ── Standard セクション：過去問コース ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-bold px-4 py-2 rounded-full">
            <FileText className="w-4 h-4" />
            スタンダードプラン 過去問コース
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>AI解説 + 模擬試験</span>
          </div>
        </div>

        {/* 過去問バナー */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              📝
            </div>
            <div>
              <p className="font-bold text-sm mb-1">過去問5年分 × AI解説 × 多言語対応</p>
              <p className="text-white/80 text-xs leading-relaxed">
                特定技能「介護」と介護福祉士国家試験の過去問を完全収録。
                <strong className="text-white">スタッフズンが実際に使った勉強法</strong>で、
                苦手分野を効率よく克服できます。
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">¥980/月〜</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">7日間無料体験あり</span>
              </div>
            </div>
          </div>
        </div>

        {hasStandardAccess ? (
          <div className="grid md:grid-cols-2 gap-6">
            {STANDARD_COURSES.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {STANDARD_COURSES.map((course, i) => (
              i === 0 ? (
                <Paywall key={i} requiredPlan="standard" locale={locale} inline>
                  <CourseCard course={course} />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="standard" />
              )
            ))}
          </div>
        )}

        {!hasStandardAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 border border-teal-200 text-teal-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-teal-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              スタンダードプラン（¥980/月）を7日間無料で試す →
            </Link>
          </div>
        )}
      </section>

      {/* Pro セクション */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-bold px-4 py-2 rounded-full">
            <Crown className="w-4 h-4" />
            プロプラン限定コース
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Video className="w-3.5 h-3.5" />
            <span>ライブ講座 + 録画</span>
          </div>
        </div>

        {/* 弊社ならではの強みバナー */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              👨‍⚕️
            </div>
            <div>
              <p className="font-bold text-sm mb-1">Mediflowだけの「現場のプロ直伝」</p>
              <p className="text-white/80 text-xs leading-relaxed">
                13年以上の臨床経験を持つ<strong className="text-white">現役看護師（うつみ）</strong>が、
                実際に起きた現場の場面をベースに教えます。
                テキストでは学べない「なぜそう言うのか」がわかる講座です。
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">病院・特養・訪問入浴・ツアーナース</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">外国人スタッフ指導経験あり</span>
              </div>
            </div>
          </div>
        </div>

        {hasProAccess ? (
          /* アクセス可能: フルコンテンツ表示 */
          <div className="grid md:grid-cols-3 gap-6">
            {PRO_COURSES.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        ) : (
          /* ロック: 最初の1枚はプレビュー表示、残りはロック */
          <div className="grid md:grid-cols-3 gap-6">
            {PRO_COURSES.map((course, i) => (
              i === 0 ? (
                /* 1枚目はプレビュー（Paywallでラップ） */
                <Paywall key={i} requiredPlan="pro" locale={locale} inline>
                  <CourseCard course={course} />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="pro" />
              )
            ))}
          </div>
        )}

        {!hasProAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 border border-purple-200 text-purple-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <Crown className="w-4 h-4" />
              プロプラン（¥1,980/月）を7日間無料で試す →
            </Link>
          </div>
        )}
      </section>

      {/* Premium セクション */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm">
            <Crown className="w-4 h-4" />
            プレミアムプラン限定サービス
          </div>
          <div className="flex-1 h-px bg-gray-100" />
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span>マンツーマン対応</span>
          </div>
        </div>

        {/* 就職保証バナー */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              🏆
            </div>
            <div>
              <p className="font-bold text-sm mb-1">「学ぶ → 働く」が直結するMediflowだけのプログラム</p>
              <p className="text-white/80 text-xs leading-relaxed">
                有料職業紹介事業の許可を持つMediflowだからこそ実現できる、
                <strong className="text-white">合格後の優先求人紹介・就職保証</strong>。
                介護福祉士試験に不合格でも、Premiumは次回受験まで無料延長します。
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  介護福祉士試験 合格保証
                </span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-lg">許可番号: 14-ユ-302174</span>
              </div>
            </div>
          </div>
        </div>

        {hasPremiumAccess ? (
          <div className="grid md:grid-cols-3 gap-6">
            {PREMIUM_COURSES.map((course, i) => (
              <CourseCard key={i} course={course} isPremium />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {PREMIUM_COURSES.map((course, i) => (
              i === 0 ? (
                <Paywall key={i} requiredPlan="premium" locale={locale} inline>
                  <CourseCard course={course} isPremium />
                </Paywall>
              ) : (
                <LockedOverlay key={i} locale={locale} requiredPlan="premium" />
              )
            ))}
          </div>
        )}

        {!hasPremiumAccess && (
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              <Crown className="w-4 h-4" />
              プレミアムプラン（¥3,980/月）を7日間無料で試す →
            </Link>
          </div>
        )}
      </section>

      {/* 学習リクエスト促進 */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 text-white text-center">
        <div className="text-3xl mb-3">💡</div>
        <h3 className="font-bold text-lg mb-1">学びたい内容をリクエストしよう</h3>
        <p className="text-white/70 text-sm mb-4">
          「こんな場面の日本語が知りたい」をリクエストすると、
          うつみ先生がコンテンツを作ります。上位リクエストは毎月コース化！
        </p>
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4 text-primary-300" />
          <span className="text-xs text-white/60">Standardプラン以上でリクエスト投稿・投票が可能</span>
        </div>
      </section>
    </div>
  );
}
