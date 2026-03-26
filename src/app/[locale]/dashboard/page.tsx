'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Flame, Zap, BookOpen, Bot, ChevronRight, TrendingUp, Lock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/learning/progress-bar';
import { use } from 'react';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

// Mock data - in production this would come from Supabase
const mockUser = {
  name: 'Nguyen Van An',
  streak: 7,
  totalXp: 340,
  currentLevel: 'N4',
  targetLevel: 'N3',
  plan: 'basic' as 'free' | 'basic' | 'pro',
};

const mockCourses = [
  {
    id: '1',
    title: 'N5 基礎語彙',
    titleVi: 'Từ vựng cơ bản N5',
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    level: 'N5',
    isFree: true,
    category: 'vocabulary',
  },
  {
    id: '2',
    title: 'N4 文法マスター',
    titleVi: 'Ngữ pháp N4 Master',
    progress: 65,
    totalLessons: 30,
    completedLessons: 19,
    level: 'N4',
    isFree: false,
    category: 'grammar',
  },
  {
    id: '3',
    title: 'N3 読解練習',
    titleVi: 'Luyện đọc N3',
    progress: 0,
    totalLessons: 25,
    completedLessons: 0,
    level: 'N3',
    isFree: false,
    category: 'reading',
  },
];

const mockTodayLesson = {
  id: '2',
  title: 'N4 文法: 〜てしまう',
  subtitle: '介護現場での使い方',
  xpReward: 20,
  estimatedMinutes: 5,
};

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  const t = useTranslations('dashboard');
  const lineUrl = process.env.NEXT_PUBLIC_LINE_JOBSEEKER || 'https://lin.ee/xUocVyI';

  const levelProgress = Math.round((mockUser.totalXp % 100));
  const userLevel = Math.floor(mockUser.totalXp / 100) + 1;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">{t('welcome')}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{mockUser.name} 👋</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Streak badge */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-orange-700 font-semibold text-sm">
              {mockUser.streak} {t('days')}
            </span>
          </div>
          {/* XP badge */}
          <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-700 font-semibold text-sm">
              {mockUser.totalXp} {t('xp')}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-gray-500">{t('streak')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockUser.streak}</p>
            <p className="text-xs text-gray-400">{t('days')}</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-gray-500">{t('xp')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockUser.totalXp}</p>
            <p className="text-xs text-gray-400">Lv.{userLevel}</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-[#0066CC]" />
              <span className="text-xs text-gray-500">{t('completedLessons')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockCourses.reduce((acc, c) => acc + c.completedLessons, 0)}
            </p>
            <p className="text-xs text-gray-400">レッスン</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-[#00B894]" />
              <span className="text-xs text-gray-500">{t('level')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockUser.currentLevel}</p>
            <p className="text-xs text-gray-400">→ {mockUser.targetLevel}</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card bordered>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">レベル {userLevel} の進捗</span>
            <span className="text-sm text-gray-500">{levelProgress}/100 XP</span>
          </div>
          <ProgressBar value={levelProgress} color="gradient" size="md" />
        </CardContent>
      </Card>

      {/* Today's Lesson */}
      <Card bordered className="border-[#0066CC]">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0066CC] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('todayLesson')}
                </span>
                <span className="text-xs text-gray-400">
                  約{mockTodayLesson.estimatedMinutes}分
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{mockTodayLesson.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{mockTodayLesson.subtitle}</p>
              <div className="flex items-center gap-4">
                <Link href={`/${locale}/courses/${mockTodayLesson.id}`}>
                  <Button size="sm">
                    {t('continueLearning')}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-yellow-600 font-medium">
                  +{mockTodayLesson.xpReward} XP
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center ml-4 flex-shrink-0">
              <BookOpen className="h-8 w-8 text-[#0066CC]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">コース進捗</h2>
          <Link href={`/${locale}/courses`} className="text-sm text-[#0066CC] hover:underline flex items-center gap-1">
            {t('viewAll')} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {mockCourses.map((course) => {
            const isLocked = !course.isFree && mockUser.plan === 'free';
            const isLockedN3Plus = ['N3', 'N2', 'N1'].includes(course.level) && mockUser.plan === 'basic';

            return (
              <Card key={course.id} bordered>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {course.level}
                        </span>
                        {course.progress === 100 && (
                          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            完了
                          </span>
                        )}
                        {(isLocked || isLockedN3Plus) && (
                          <Lock className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </div>
                      <p className="font-medium text-gray-900 truncate">
                        {locale === 'ja' ? course.title : course.titleVi}
                      </p>
                      <div className="mt-2">
                        <ProgressBar
                          value={course.progress}
                          color={course.progress === 100 ? 'secondary' : 'primary'}
                          size="sm"
                          label={`${course.completedLessons}/${course.totalLessons} レッスン`}
                        />
                      </div>
                    </div>
                    {!isLocked && !isLockedN3Plus ? (
                      <Link href={`/${locale}/courses/${course.id}`}>
                        <Button variant="outline" size="sm">
                          {course.progress > 0 ? t('continueLearning') : '開始'}
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/${locale}/pricing`}>
                        <Button variant="outline" size="sm" className="text-gray-500">
                          <Lock className="h-3.5 w-3.5 mr-1" />
                          解除
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Quick Access */}
      <Card className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Medi先生に質問する</p>
                <p className="text-blue-100 text-sm">今日も一緒に学習しよう！</p>
              </div>
            </div>
            <Link href={`/${locale}/ai-tutor`}>
              <Button
                className="bg-white text-[#0066CC] hover:bg-blue-50"
                size="sm"
              >
                チャット開始
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Career Banner */}
      <Card className="bg-gradient-to-r from-[#00B894] to-[#00966e] text-white border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-lg text-white mb-1">{t('careerBanner')}</p>
              <p className="text-green-100 text-sm mb-3">
                {locale === 'ja'
                  ? 'N3以上の方は介護福祉士の道も！Mediflowが無料で就職をサポートします'
                  : 'Trình độ N3 trở lên có thể trở thành kỹ thuật viên chăm sóc. Mediflow hỗ trợ miễn phí!'
                }
              </p>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-[#00B894] hover:bg-green-50" size="sm">
                  {t('careerCta')}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
