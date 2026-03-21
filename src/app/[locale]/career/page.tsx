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
  {
    id: "j1",
    facilityName: "さくら介護老人保健施設",
    facilityType: "nursing_home",
    facilityTypeLabel: "特別養護老人ホーム",
    location: "神奈川県横浜市",
    prefecture: "神奈川県",
    jobTitle: "介護職員（特定技能）",
    description: "横浜市内の介護老人保健施設で、ご利用者様の日常生活全般のサポートをお願いします。外国人スタッフ多数在籍しており、多言語サポート体制が整っています。",
    requiredQualification: "特定技能1号（介護）",
    requiredJlptLevel: "N4",
    salaryMin: 220000,
    salaryMax: 280000,
    visaSupport: true,
    housingSupport: true,
    matchScore: 88,
    matchReasons: ["N4レベルが要件と一致", "特定技能「介護」を学習中", "神奈川県希望と一致"],
    gaps: ["特定技能1号の資格取得が必要"],
    emoji: "🌸",
  },
  {
    id: "j2",
    facilityName: "東京ケアサービス株式会社",
    facilityType: "home_care",
    facilityTypeLabel: "訪問介護",
    location: "東京都新宿区",
    prefecture: "東京都",
    jobTitle: "訪問介護員（ホームヘルパー）",
    description: "ご利用者様のご自宅を訪問し、身体介護・生活援助を行います。チームでサポートするので安心。日本語学習支援あり。",
    requiredQualification: "介護職員初任者研修修了以上",
    requiredJlptLevel: "N3",
    salaryMin: 240000,
    salaryMax: 300000,
    visaSupport: false,
    housingSupport: false,
    matchScore: 62,
    matchReasons: ["給与が希望範囲内", "訪問介護に興味あり"],
    gaps: ["N3レベルが必要（現在N4学習中）", "初任者研修修了が必要"],
    emoji: "🏠",
  },
  {
    id: "j3",
    facilityName: "みなとみらいデイサービスセンター",
    facilityType: "day_service",
    facilityTypeLabel: "デイサービス",
    location: "神奈川県横浜市西区",
    prefecture: "神奈川県",
    jobTitle: "介護スタッフ（日中のみ）",
    description: "デイサービスでのレクリエーション支援、入浴介助、食事介助などをお願いします。土日休み、残業少なめで働きやすい環境です。ベトナム語・英語対応スタッフ在籍。",
    requiredQualification: "特定技能1号（介護）または初任者研修修了",
    requiredJlptLevel: "N4",
    salaryMin: 200000,
    salaryMax: 250000,
    visaSupport: true,
    housingSupport: false,
    matchScore: 75,
    matchReasons: ["ベトナム語スタッフ在籍", "N4レベルが要件と一致", "神奈川県希望と一致"],
    gaps: ["特定技能1号の資格取得が必要"],
    emoji: "☀️",
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
          {formatSalary(job.salaryMin, job.salaryMax)}
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
        href={process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "#"}
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

  const prefectures = ["all", "神奈川県", "東京都", "大阪府"];
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

          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{t("aiMatch")}</span>
            </div>
            <p className="text-sm text-white/80">
              AIがあなたの学習進捗・資格・希望条件を分析して、最適な求人をマッチングしています。
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
