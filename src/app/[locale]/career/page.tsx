"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Building2,
  Banknote,
  Home,
  Plane,
  Star,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { formatSalary } from "@/lib/utils";

const JOBS = [
  // ──── 東京都 ────
  {
    id: "j1",
    facilityName: "医療法人社団 誠和会 東京介護センター",
    facilityType: "nursing_home",
    facilityTypeLabel: "介護老人保健施設",
    location: "東京都江戸川区",
    prefecture: "東京都",
    jobTitle: "介護職員（特定技能1号）",
    description: "江戸川区の定員120名の介護老人保健施設。外国人スタッフ15名在籍（ベトナム・フィリピン・インドネシア）。日本語研修・EPA支援制度あり。社会保険完備、寮完備（月3万円）。毎年昇給・賞与年2回。",
    requiredQualification: "特定技能1号（介護）※未取得者は取得サポートあり",
    requiredJlptLevel: "N4",
    salaryMin: 230000,
    salaryMax: 290000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 92,
    matchReasons: ["外国人スタッフ多数・多言語環境", "特定技能ビザサポート実績豊富", "寮完備で住居の心配不要", "N4で応募可能"],
    gaps: ["特定技能1号試験の合格が必要"],
    emoji: "🏥",
    tags: ["外国語対応", "寮完備", "ビザサポート", "研修充実"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j2",
    facilityName: "社会福祉法人 葵会 特別養護老人ホーム グリーンヒル",
    facilityType: "nursing_home",
    facilityTypeLabel: "特別養護老人ホーム",
    location: "東京都足立区",
    prefecture: "東京都",
    jobTitle: "介護福祉士・介護職員（外国人歓迎）",
    description: "足立区の特養。ベトナム語・英語対応の教育担当者が在籍。介護福祉士受験サポートあり（受験費用補助・合格祝い金20万円）。夜勤手当1回5,000円。通勤手当全額支給。",
    requiredQualification: "初任者研修修了以上（介護福祉士歓迎）",
    requiredJlptLevel: "N3",
    salaryMin: 250000,
    salaryMax: 330000,
    visaSupport: true,
    housingSupport: false,
    matchScore: 78,
    matchReasons: ["ベトナム語対応スタッフあり", "介護福祉士受験サポート充実", "夜勤手当あり"],
    gaps: ["N3レベルの日本語が必要", "初任者研修修了が必要"],
    emoji: "🌿",
    tags: ["介護福祉士支援", "夜勤手当あり", "資格取得支援"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j3",
    facilityName: "株式会社 ベネッセスタイルケア 訪問介護センター新宿",
    facilityType: "home_care",
    facilityTypeLabel: "訪問介護（大手法人）",
    location: "東京都新宿区",
    prefecture: "東京都",
    jobTitle: "訪問介護員（ホームヘルパー2級以上）",
    description: "大手ベネッセグループ運営。登録ヘルパー歓迎。週3日〜OK、勤務時間の融通あり。日本語研修を就業前に実施。多言語マニュアルあり。各種社会保険完備。",
    requiredQualification: "介護職員初任者研修修了（旧ヘルパー2級）以上",
    requiredJlptLevel: "N3",
    salaryMin: 1300,
    salaryMax: 1600,
    visaSupport: false,
    housingSupport: false,
    matchScore: 65,
    matchReasons: ["大手法人で安定", "勤務時間の融通がきく", "多言語マニュアルあり"],
    gaps: ["N3レベルの日本語が必要", "初任者研修修了が必要"],
    emoji: "🏠",
    tags: ["大手法人", "フレキシブル勤務", "週3日〜OK"],
    applyUrl: "https://line.me/ti/p/@mediflow",
    isHourly: true,
  },
  // ──── 神奈川県 ────
  {
    id: "j4",
    facilityName: "医療法人 桜花会 横浜リハビリ病院",
    facilityType: "hospital",
    facilityTypeLabel: "リハビリテーション病院",
    location: "神奈川県横浜市港北区",
    prefecture: "神奈川県",
    jobTitle: "介護助手・看護補助者（特定技能）",
    description: "横浜市のリハビリ専門病院。病棟でのシーツ交換・食事配膳・入浴介助補助等をお願いします。外国人スタッフ20名以上在籍。日本語レッスン月4回・無料。社員寮あり（月2.5万円）。",
    requiredQualification: "特定技能1号（介護）または介護職員初任者研修修了",
    requiredJlptLevel: "N4",
    salaryMin: 210000,
    salaryMax: 270000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 86,
    matchReasons: ["N4から応募可能", "社員寮完備", "日本語学習支援あり", "リハビリ知識が身に付く"],
    gaps: ["特定技能試験の合格が必要"],
    emoji: "🌸",
    tags: ["リハビリ病院", "寮完備", "日本語研修", "外国人多数"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j5",
    facilityName: "社会福祉法人 かながわ福祉会 デイサービスセンター みなとみらい",
    facilityType: "day_service",
    facilityTypeLabel: "デイサービス",
    location: "神奈川県横浜市西区",
    prefecture: "神奈川県",
    jobTitle: "介護スタッフ（日勤のみ・残業なし）",
    description: "みなとみらい駅徒歩5分のデイサービス。土日祝休み・残業ほぼなし・年間休日120日。ベトナム語・英語・中国語スタッフ在籍。介護福祉士資格取得支援制度あり（奨学金返済補助最大50万円）。",
    requiredQualification: "特定技能1号（介護）または経験者歓迎",
    requiredJlptLevel: "N4",
    salaryMin: 215000,
    salaryMax: 265000,
    visaSupport: true,
    housingSupport: false,
    matchScore: 82,
    matchReasons: ["土日祝休み・残業なし", "多言語スタッフ環境", "駅近で通勤便利", "奨学金返済補助あり"],
    gaps: ["特定技能1号の資格が必要"],
    emoji: "☀️",
    tags: ["土日休み", "残業なし", "奨学金補助", "駅近"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j6",
    facilityName: "株式会社 ニチイ学館 川崎サービスセンター",
    facilityType: "home_care",
    facilityTypeLabel: "訪問介護・居宅介護",
    location: "神奈川県川崎市中原区",
    prefecture: "神奈川県",
    jobTitle: "訪問介護員（技能実習3号・特定技能対応）",
    description: "大手ニチイ学館グループ。技能実習3号から特定技能への移行サポート実績多数。自転車通勤OK・交通費支給。eラーニングで日本語学習・スキルアップ無料提供。川崎・横浜エリアを担当。",
    requiredQualification: "技能実習2号修了以上または初任者研修修了",
    requiredJlptLevel: "N4",
    salaryMin: 220000,
    salaryMax: 280000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 79,
    matchReasons: ["技能実習→特定技能の移行支援あり", "大手法人で安定・福利厚生充実", "eラーニングで日本語・スキルアップ無料"],
    gaps: ["技能実習2号修了または初任者研修が必要"],
    emoji: "🔵",
    tags: ["大手法人", "技能実習→特定技能", "eラーニング無料", "寮完備"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  // ──── 大阪府 ────
  {
    id: "j7",
    facilityName: "医療法人 康誠会 なにわ介護老人保健施設",
    facilityType: "nursing_home",
    facilityTypeLabel: "介護老人保健施設",
    location: "大阪府大阪市浪速区",
    prefecture: "大阪府",
    jobTitle: "介護職員（特定技能1号・EPA）",
    description: "大阪市内の老健施設。EPA（経済連携協定）・特定技能・技能実習と多様な在留資格の方が在籍。ベトナム語・インドネシア語・英語対応スタッフ常駐。大阪関西圏の介護福祉士国家試験の受験サポート実績あり。",
    requiredQualification: "特定技能1号（介護）またはEPA候補者",
    requiredJlptLevel: "N4",
    salaryMin: 225000,
    salaryMax: 285000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 88,
    matchReasons: ["EPA・特定技能両方受け入れ実績", "多言語常駐スタッフあり", "大阪で介護福祉士取得支援"],
    gaps: ["特定技能試験またはEPA試験が必要"],
    emoji: "🌆",
    tags: ["EPA対応", "多言語環境", "介護福祉士支援", "大阪市内"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j8",
    facilityName: "社会福祉法人 大阪ひかり福祉会 特別養護老人ホーム 天王寺の郷",
    facilityType: "nursing_home",
    facilityTypeLabel: "特別養護老人ホーム",
    location: "大阪府大阪市天王寺区",
    prefecture: "大阪府",
    jobTitle: "介護職員・介護福祉士（外国人積極採用）",
    description: "天王寺駅から徒歩8分の特養。外国人職員受け入れ歴10年以上の実績。国際厚生事業団（JICWELS）との連携で来日前サポートあり。毎月日本語教室（週2回）開催。家賃補助月3万円・引越し費用補助あり。",
    requiredQualification: "特定技能1号（介護）・介護福祉士・EPA候補者",
    requiredJlptLevel: "N3",
    salaryMin: 240000,
    salaryMax: 320000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 73,
    matchReasons: ["10年以上の外国人受け入れ実績", "来日前サポートあり", "日本語教室週2回"],
    gaps: ["N3レベルの日本語が必要"],
    emoji: "🏯",
    tags: ["長期受け入れ実績", "来日前サポート", "日本語教室", "家賃補助"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j9",
    facilityName: "株式会社 コムスン 訪問介護ステーション 梅田",
    facilityType: "home_care",
    facilityTypeLabel: "訪問介護・介護予防",
    location: "大阪府大阪市北区",
    prefecture: "大阪府",
    jobTitle: "訪問介護員（時給制・扶養内勤務OK）",
    description: "梅田・北区エリアの訪問介護。時給制で週2日〜OK。自転車・バイク通勤可（交通費支給）。インドネシア語・英語対応スタッフあり。介護初任者研修の受講費用全額補助（就業開始後）。",
    requiredQualification: "介護職員初任者研修修了（または受講中）",
    requiredJlptLevel: "N4",
    salaryMin: 1350,
    salaryMax: 1650,
    visaSupport: false,
    housingSupport: false,
    matchScore: 68,
    matchReasons: ["初任者研修費用補助あり", "週2日〜フレキシブル勤務", "インドネシア語対応スタッフ"],
    gaps: ["初任者研修の修了（または受講中）が必要"],
    emoji: "🌻",
    tags: ["初心者歓迎", "週2日〜", "研修費補助", "フレキシブル"],
    applyUrl: "https://line.me/ti/p/@mediflow",
    isHourly: true,
  },
  // ──── 愛知・その他 ────
  {
    id: "j10",
    facilityName: "医療法人 豊田会 刈谷豊田総合病院 介護部門",
    facilityType: "hospital",
    facilityTypeLabel: "総合病院（介護部門）",
    location: "愛知県刈谷市",
    prefecture: "愛知県",
    jobTitle: "看護補助者・介護助手（外国人枠）",
    description: "愛知県最大規模の総合病院グループの介護部門。ベトナム・フィリピン・ミャンマー出身スタッフ60名以上在籍。病院内日本語教室・技能実習→特定技能→介護福祉士と段階的にキャリアアップできる明確な制度。社員寮完備。",
    requiredQualification: "特定技能1号（介護）・技能実習2号修了以上",
    requiredJlptLevel: "N4",
    salaryMin: 220000,
    salaryMax: 280000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 84,
    matchReasons: ["外国人スタッフ60名以上の大規模環境", "キャリアアップ制度が明確", "社員寮完備", "大規模病院で安定"],
    gaps: ["特定技能試験または技能実習2号修了が必要"],
    emoji: "🏨",
    tags: ["大規模病院", "60名以上外国人在籍", "寮完備", "キャリアアップ制度"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j11",
    facilityName: "社会福祉法人 北海道社会福祉事業団 札幌西区特別養護老人ホーム",
    facilityType: "nursing_home",
    facilityTypeLabel: "特別養護老人ホーム（地方高待遇）",
    location: "北海道札幌市西区",
    prefecture: "北海道",
    jobTitle: "介護職員（特定技能・高待遇・地方枠）",
    description: "北海道札幌の特養。地方では珍しい高給与・充実福利厚生。家賃補助月5万円（実質0円の寮あり）。年間休日125日・夏季冬季休暇あり。雪国生活サポートあり（冬季手当て支給）。外国人受け入れ専任担当者常駐。",
    requiredQualification: "特定技能1号（介護）",
    requiredJlptLevel: "N4",
    salaryMin: 260000,
    salaryMax: 330000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 77,
    matchReasons: ["高給与（地方最高水準）", "家賃補助月5万円", "年間休日125日", "外国人専任担当者あり"],
    gaps: ["北海道（雪国）の生活環境に適応が必要", "特定技能1号の資格が必要"],
    emoji: "❄️",
    tags: ["高給与", "家賃補助5万円", "休日125日", "地方枠"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
  {
    id: "j12",
    facilityName: "医療法人 福岡ケアネット グループホーム 博多",
    facilityType: "group_home",
    facilityTypeLabel: "グループホーム（認知症ケア）",
    location: "福岡県福岡市博多区",
    prefecture: "福岡県",
    jobTitle: "介護職員（認知症ケア専門・特定技能）",
    description: "博多駅から徒歩10分のグループホーム。少人数（9名）のアットホームな環境。認知症ケア専門の研修あり（認知症介護実践者研修費用全額補助）。ベトナム語・英語対応。福岡市は外国人住みやすい都市ランキング上位。",
    requiredQualification: "特定技能1号（介護）または初任者研修修了",
    requiredJlptLevel: "N4",
    salaryMin: 218000,
    salaryMax: 270000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 80,
    matchReasons: ["博多駅近く・住みやすい福岡", "少人数で密なケアができる", "認知症研修費全額補助"],
    gaps: ["特定技能1号または初任者研修が必要"],
    emoji: "🌊",
    tags: ["認知症専門", "少人数環境", "博多駅近", "研修費補助"],
    applyUrl: "https://line.me/ti/p/@mediflow",
  },
];

function MatchScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={`text-sm font-bold ${
          score >= 80
            ? "text-green-600"
            : score >= 60
            ? "text-yellow-600"
            : "text-red-500"
        }`}
      >
        {score}%
      </span>
    </div>
  );
}

function JobCard({ job, locale }: { job: typeof JOBS[0]; locale: string }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = useTranslations("career");

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {job.emoji}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{job.facilityName}</h3>
            <p className="text-sm text-muted">{job.facilityTypeLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted mb-1">{t("matchScore")}</div>
          <div className="w-24">
            <MatchScoreBar score={job.matchScore} />
          </div>
        </div>
      </div>

      {/* Job Title & Location */}
      <div className="mb-3">
        <h4 className="font-semibold text-gray-800 mb-1">{job.jobTitle}</h4>
        <div className="flex items-center gap-1 text-sm text-muted">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
      </div>

      {/* Salary & Support */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge bg-green-50 text-green-700">
          <Banknote className="w-3 h-3" />
          {"isHourly" in job && job.isHourly
            ? `時給 ${job.salaryMin.toLocaleString()}〜${job.salaryMax.toLocaleString()}円`
            : formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        {job.visaSupport && (
          <span className="badge bg-blue-50 text-blue-700">
            <Plane className="w-3 h-3" />
            {t("jobCard.visaSupport")}
          </span>
        )}
        {job.housingSupport && (
          <span className="badge bg-purple-50 text-purple-700">
            <Home className="w-3 h-3" />
            {t("jobCard.housingSupport")}
          </span>
        )}
        <span className="badge bg-yellow-50 text-yellow-700">
          <Star className="w-3 h-3" />
          JLPT {job.requiredJlptLevel}
        </span>
      </div>

      {/* Tags */}
      {"tags" in job && job.tags && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-muted mb-4 line-clamp-2">{job.description}</p>

      {/* Match Details (Expandable) */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm text-primary-600 font-medium flex items-center gap-1 mb-4 hover:underline"
      >
        <Sparkles className="w-4 h-4" />
        AIマッチング詳細を{showDetails ? "隠す" : "見る"}
      </button>

      {showDetails && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-green-700 mb-1">
              ✅ {t("matchReasons")}
            </p>
            <ul className="space-y-1">
              {job.matchReasons.map((reason, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                  <span className="text-green-500 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          {job.gaps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-yellow-700 mb-1">
                ⚠️ {t("gaps")}
              </p>
              <ul className="space-y-1">
                {job.gaps.map((gap, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Apply Button */}
      <a
        href={"applyUrl" in job && job.applyUrl ? job.applyUrl : (process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "#")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full text-center flex items-center justify-center gap-2"
      >
        {t("apply")} 💬
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}

export default function CareerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("career");
  const { locale } = use(params);
  const [filterPref, setFilterPref] = useState("all");

  const prefectures = ["all", "東京都", "神奈川県", "大阪府", "愛知県", "福岡県", "北海道"];
  const filtered =
    filterPref === "all"
      ? JOBS
      : JOBS.filter((j) => j.prefecture === filterPref);

  const sortedJobs = [...filtered].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-500 text-white px-4 py-12">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("subtitle")}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">12+</div>
              <div className="text-xs text-white/80">掲載求人数</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">6都道府県</div>
              <div className="text-xs text-white/80">全国対応</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">無料</div>
              <div className="text-xs text-white/80">就職サポート</div>
            </div>
          </div>
          <div className="mt-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{t("aiMatch")} — 外国人向け求人特集</span>
            </div>
            <p className="text-sm text-white/80">
              ビザサポート・寮完備・多言語対応など外国人が安心して働ける求人を厳選。特定技能・EPA・技能実習の方も歓迎の施設のみ掲載。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <Filter className="w-4 h-4 text-muted flex-shrink-0" />
          {prefectures.map((pref) => (
            <button
              key={pref}
              onClick={() => setFilterPref(pref)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filterPref === pref
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {pref === "all" ? "すべて" : pref}
            </button>
          ))}
        </div>

        {/* Job Count */}
        <p className="text-sm text-muted mb-4">
          {sortedJobs.length}件の求人が見つかりました（マッチ度順）
        </p>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} locale={locale} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">もっと多くの求人を見る</h2>
          <p className="text-white/80 mb-6">
            Mediflow人材紹介では、外国人医療・介護人材の就職を専門にサポートしています。
            LINEで気軽に相談してください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition-all"
            >
              💬 LINEで相談する
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
            >
              📝 フォームで申込む
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
