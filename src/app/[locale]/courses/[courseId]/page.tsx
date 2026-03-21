import Link from "next/link";
import { BookOpen, Clock, ChevronRight, CheckCircle, PlayCircle, Lock } from "lucide-react";

const COURSE_DATA: Record<string, {
  title: string;
  description: string;
  category: string;
  emoji: string;
  color: string;
  hours: number;
  lessons: { id: string; title: string; type: string; duration: number; isCompleted: boolean; isLocked: boolean }[];
}> = {
  "c1000000-0000-0000-0000-000000000001": {
    title: "JLPT N5 完全対策コース",
    description: "ひらがな・カタカナから基本語彙800語、基本文法まで体系的に学習。介護現場で使う基本的な日本語力を身につけます。",
    category: "JLPT",
    emoji: "🎌",
    color: "from-red-400 to-red-500",
    hours: 30,
    lessons: [
      { id: "l1000000-0000-0000-0000-000000000001", title: "第1課: 体の部位（語彙）", type: "vocabulary", duration: 20, isCompleted: true, isLocked: false },
      { id: "l1000000-0000-0000-0000-000000000002", title: "第2課: 日常動作（語彙）", type: "vocabulary", duration: 20, isCompleted: true, isLocked: false },
      { id: "l1000000-0000-0000-0000-000000000003", title: "第3課: 〜てください（文法）", type: "grammar", duration: 25, isCompleted: false, isLocked: false },
      { id: "l1000000-0000-0000-0000-000000000004", title: "第4課: 痛み・症状の表現", type: "vocabulary", duration: 20, isCompleted: false, isLocked: false },
      { id: "l1000000-0000-0000-0000-000000000005", title: "確認テスト: 第1〜4課", type: "quiz", duration: 15, isCompleted: false, isLocked: false },
    ],
  },
};

const LESSON_TYPE_ICONS: Record<string, string> = {
  vocabulary: "📖",
  grammar: "📝",
  listening: "🎧",
  speaking: "💬",
  quiz: "✅",
  video: "🎥",
  reading: "📄",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; courseId: string }>;
}) {
  const { locale, courseId } = await params;
  const course = COURSE_DATA[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">コースが見つかりません</p>
          <Link href={`/${locale}/courses`} className="btn-primary">
            コース一覧へ戻る
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter((l) => l.isCompleted).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);
  const nextLesson = course.lessons.find((l) => !l.isCompleted && !l.isLocked);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`bg-gradient-to-br ${course.color} text-white px-4 py-12`}>
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link href={`/${locale}/courses`} className="hover:text-white">コース一覧</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{course.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-white/80 text-sm mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons.length} レッスン
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.hours} 時間
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 -mt-6">
        {/* Progress Card */}
        <div className="card shadow-md mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-700">学習の進捗</span>
            <span className="text-primary-600 font-bold text-lg">{progress}%</span>
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-muted mb-4">
            {completedLessons} / {course.lessons.length} レッスン完了
          </p>

          {nextLesson && (
            <Link
              href={`/${locale}/lessons/${nextLesson.id}`}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              {completedLessons === 0 ? "学習を始める" : "続きから学習する"}
            </Link>
          )}
        </div>

        {/* Lesson List */}
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">レッスン一覧</h2>
          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  lesson.isLocked
                    ? "bg-gray-50 opacity-60"
                    : lesson.isCompleted
                    ? "bg-green-50 border border-green-100"
                    : "bg-white border border-gray-100 hover:border-primary-200 hover:bg-primary-50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : lesson.isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{LESSON_TYPE_ICONS[lesson.type]}</span>
                    <span className={`font-medium text-sm ${
                      lesson.isCompleted ? "text-green-700" : lesson.isLocked ? "text-gray-400" : "text-gray-900"
                    }`}>
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted">{lesson.duration}分</span>
                </div>

                {!lesson.isLocked && (
                  <Link
                    href={`/${locale}/lessons/${lesson.id}`}
                    className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                      lesson.isCompleted
                        ? "text-green-600 hover:bg-green-100"
                        : "text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {lesson.isCompleted ? "復習" : "開始"}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
