import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BookOpen, Clock, Users, ChevronRight, Star } from "lucide-react";

const COURSES = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    title: "JLPT N5 完全対策コース",
    description: "ひらがな・カタカナから基本語彙800語、基本文法まで体系的に学習",
    category: "JLPT",
    level: "beginner",
    levelLabel: "初心者向け",
    lessons: 15,
    hours: 30,
    emoji: "🎌",
    color: "from-red-400 to-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    isNew: true,
    isFeatured: true,
    learners: 1234,
    rating: 4.8,
  },
  {
    id: "c2000000-0000-0000-0000-000000000001",
    title: "介護の日本語 基礎コース",
    description: "介護現場で実際に使う日本語。申し送り・記録・利用者対応まで実践的に",
    category: "介護専門",
    level: "beginner",
    levelLabel: "初心者向け",
    lessons: 12,
    hours: 24,
    emoji: "🏥",
    color: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    isNew: false,
    isFeatured: true,
    learners: 856,
    rating: 4.9,
  },
  {
    id: "c3000000-0000-0000-0000-000000000001",
    title: "特定技能「介護」試験対策",
    description: "技能試験と日本語試験に特化。過去問分析と弱点克服で合格を目指す",
    category: "資格対策",
    level: "intermediate",
    levelLabel: "中級者向け",
    lessons: 20,
    hours: 40,
    emoji: "📋",
    color: "from-green-400 to-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    isNew: false,
    isFeatured: false,
    learners: 543,
    rating: 4.7,
  },
  {
    id: "c4000000-0000-0000-0000-000000000001",
    title: "JLPT N4 対策コース",
    description: "日常会話・語彙1,500語・基本的な読み書きをマスター",
    category: "JLPT",
    level: "beginner",
    levelLabel: "初心者向け",
    lessons: 18,
    hours: 36,
    emoji: "📚",
    color: "from-orange-400 to-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    isNew: true,
    isFeatured: false,
    learners: 421,
    rating: 4.6,
  },
  {
    id: "c5000000-0000-0000-0000-000000000001",
    title: "日本生活スキルコース",
    description: "銀行口座・携帯契約・住居探し・行政手続き。日本での生活を完全サポート",
    category: "生活スキル",
    level: "beginner",
    levelLabel: "全レベル",
    lessons: 10,
    hours: 15,
    emoji: "🏠",
    color: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    isNew: false,
    isFeatured: false,
    learners: 987,
    rating: 4.8,
  },
  {
    id: "c6000000-0000-0000-0000-000000000001",
    title: "JLPT N3 対策コース",
    description: "一般的な話題の理解・語彙3,000語・業務基礎日本語",
    category: "JLPT",
    level: "intermediate",
    levelLabel: "中級者向け",
    lessons: 24,
    hours: 50,
    emoji: "🎯",
    color: "from-indigo-400 to-indigo-500",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    isNew: false,
    isFeatured: false,
    learners: 312,
    rating: 4.7,
  },
];

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  const featured = COURSES.filter((c) => c.isFeatured);
  const all = COURSES;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-12">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            おすすめコース
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((course) => (
              <Link
                key={course.id}
                href={`/${locale}/courses/${course.id}`}
                className="card hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {course.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${course.bgColor} ${course.textColor} text-xs`}>
                        {course.category}
                      </span>
                      {course.isNew && (
                        <span className="badge bg-accent-50 text-accent-500 text-xs">NEW</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} {t("lessons")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.hours} {t("hours")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.learners.toLocaleString()}人
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">全コース</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {all.map((course) => (
              <Link
                key={course.id}
                href={`/${locale}/courses/${course.id}`}
                className="card hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {course.emoji}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${course.bgColor} ${course.textColor} text-xs`}>
                    {course.category}
                  </span>
                  {course.isNew && (
                    <span className="badge bg-red-50 text-red-500 text-xs">NEW</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-muted mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{course.levelLabel}</span>
                  <span>{course.hours} {t("hours")}</span>
                </div>
                <div className="progress-bar mt-3">
                  <div className="progress-fill" style={{ width: "0%" }} />
                </div>
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>未学習</span>
                  <span>0%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
