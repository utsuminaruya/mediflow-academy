import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Briefcase,
  MessageCircle,
  Star,
  ChevronRight,
  CheckCircle,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import { LOCALE_FLAGS, LOCALE_LABELS, LOCALES } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const nav = useTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            {t("badge")}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-6 text-white/90">
            {t("subtitle")}
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href={`/${locale}/auth/signup`}
              className="bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-xl text-lg w-full sm:w-auto text-center"
            >
              {nav("signup")} →
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition-all text-lg w-full sm:w-auto text-center"
            >
              💬 LINE登録
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { label: t("stats.learners"), value: t("stats.learnersValue") },
              { label: t("stats.languages"), value: t("stats.languagesValue") },
              { label: t("stats.jobSuccess"), value: t("stats.jobSuccessValue") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    {
      icon: BookOpen,
      title: t("learn.title"),
      description: t("learn.description"),
      color: "text-primary-500",
      bg: "bg-primary-50",
      step: "01",
    },
    {
      icon: Award,
      title: t("qualify.title"),
      description: t("qualify.description"),
      color: "text-secondary-600",
      bg: "bg-secondary-50",
      step: "02",
    },
    {
      icon: Briefcase,
      title: t("work.title"),
      description: t("work.description"),
      color: "text-accent-500",
      bg: "bg-red-50",
      step: "03",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200" />

          {features.map((feature, idx) => (
            <div key={idx} className="relative text-center">
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 relative`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection({ locale }: { locale: string }) {
  const t = useTranslations("courses");

  const courses = [
    {
      title: "JLPT N5 完全対策コース",
      category: "JLPT",
      level: t("beginners"),
      lessons: 15,
      hours: 30,
      color: "bg-red-100 text-red-600",
      emoji: "🎌",
    },
    {
      title: "介護の日本語 基礎コース",
      category: "介護専門",
      level: t("beginners"),
      lessons: 12,
      hours: 24,
      color: "bg-blue-100 text-blue-600",
      emoji: "🏥",
    },
    {
      title: "特定技能「介護」試験対策",
      category: "資格対策",
      level: t("intermediate"),
      lessons: 20,
      hours: 40,
      color: "bg-green-100 text-green-600",
      emoji: "📋",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{t("title")}</h2>
            <p className="text-muted mt-2">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/courses`}
            className="mt-4 md:mt-0 flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
          >
            {t("viewAll")} <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div key={idx} className="card hover:shadow-lg transition-shadow group">
              <div className="text-4xl mb-4">{course.emoji}</div>
              <span className={`badge ${course.color} mb-3`}>
                {course.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted mb-6">
                <span>{course.level}</span>
                <span>•</span>
                <span>{course.lessons} {t("lessons")}</span>
                <span>•</span>
                <span>{course.hours} {t("hours")}</span>
              </div>
              <Link
                href={`/${locale}/courses`}
                className="btn-primary w-full text-center block"
              >
                {t("start")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIFeatureSection({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge badge-primary mb-4">AI家庭教師</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              「Medi先生」があなたの
              <span className="text-gradient"> 専属</span>教師
            </h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Claude AIを搭載した「Medi先生」が、あなたの母語で分かりやすく解説。
              24時間いつでも質問できる、個別最適化された学習体験を提供します。
            </p>
            <ul className="space-y-3">
              {[
                "語彙・文法・リスニングをワンストップでサポート",
                "介護現場の専門用語を実践的に学べる",
                "間違いを優しく指摘、弱点を自動分析",
                "6言語対応（日本語/ベトナム語/英語他）",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/ai-tutor`}
              className="btn-primary inline-flex items-center gap-2 mt-8"
            >
              <MessageCircle className="w-5 h-5" />
              Medi先生に話しかける
            </Link>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
            {/* AI Chat Preview */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                M
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                <p className="text-sm text-gray-700">
                  こんにちは！Medi先生です😊
                  <br />
                  今日はどんな練習をしますか？
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                You
              </div>
              <div className="bg-primary-500 rounded-2xl rounded-tr-sm p-4 max-w-xs text-right">
                <p className="text-sm text-white">
                  介護の言葉を練習したいです
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                M
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                <p className="text-sm text-gray-700">
                  いいですね！まずクイズをしましょう。
                  <br /><br />
                  「食事介助」は英語で何と言いますか？
                  <br /><br />
                  <span className="text-primary-600 font-medium">
                    Xin mời trả lời nhé！
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguageSection() {
  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <Globe className="w-12 h-12 mx-auto mb-4 text-white/80" />
        <h2 className="text-3xl font-bold mb-4">6言語に対応</h2>
        <p className="text-white/80 mb-8">
          あなたの母語で学べる、多言語ネイティブなプラットフォーム
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {LOCALES.map((locale) => (
            <div
              key={locale}
              className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3"
            >
              <span className="text-2xl">{LOCALE_FLAGS[locale]}</span>
              <span className="font-medium">{LOCALE_LABELS[locale]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ locale }: { locale: string }) {
  const t = useTranslations("cta");

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-500 to-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-white/80 text-lg mb-10">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/auth/signup`}
              className="bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-xl text-lg"
            >
              {t("freeStart")} →
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_LINE_JOBSEEKER || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition-all text-lg"
            >
              💬 {t("lineRegister")}
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-lg"
            >
              📝 {t("formRegister")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg" />
              <span className="text-white font-bold text-xl">Mediflow Academy</span>
            </div>
            <p className="text-sm leading-relaxed mb-2">
              日本で医療・介護のプロになりたい外国人が、
              学び、資格を取り、最高の職場に出会う場所
            </p>
            <p className="text-xs">{t("company")}</p>
            <p className="text-xs">{t("license")}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">学習</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">コース一覧</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI家庭教師</a></li>
              <li><a href="#" className="hover:text-white transition-colors">JLPT対策</a></li>
              <li><a href="#" className="hover:text-white transition-colors">介護福祉士対策</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">就職支援</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("privacy")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("terms")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("contact")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          © 2024 Mediflow株式会社. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      {/* Navbar is provided by layout.tsx */}
      <HeroSection locale={locale} />
      <FeaturesSection />
      <CoursesSection locale={locale} />
      <AIFeatureSection locale={locale} />
      <LanguageSection />
      <CTASection locale={locale} />
      <Footer />
    </div>
  );
}
