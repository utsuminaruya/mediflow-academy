'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Lock, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/learning/progress-bar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
}

const allCourses = [
  {
    id: '1',
    title: { ja: 'N5 基礎語彙100', vi: 'Từ vựng cơ bản N5 - 100 từ' },
    description: {
      ja: '日本語のN5レベルに必要な基礎語彙100語を学びます',
      vi: 'Học 100 từ vựng cơ bản cho trình độ N5 tiếng Nhật'
    },
    level: 'N5',
    category: 'vocabulary',
    totalLessons: 10,
    completedLessons: 10,
    isFree: true,
    requiredPlan: 'free',
  },
  {
    id: '2',
    title: { ja: 'N5 基礎文法', vi: 'Ngữ pháp cơ bản N5' },
    description: {
      ja: 'です・ます体、助詞など基礎文法を習得',
      vi: 'Học thể lịch sự です・ます, trợ từ và ngữ pháp cơ bản'
    },
    level: 'N5',
    category: 'grammar',
    totalLessons: 15,
    completedLessons: 8,
    isFree: true,
    requiredPlan: 'free',
  },
  {
    id: '3',
    title: { ja: 'N4 語彙マスター', vi: 'Từ vựng N4 Master' },
    description: {
      ja: 'N4レベルの語彙を体系的に学習',
      vi: 'Học từ vựng N4 một cách có hệ thống'
    },
    level: 'N4',
    category: 'vocabulary',
    totalLessons: 20,
    completedLessons: 12,
    isFree: false,
    requiredPlan: 'basic',
  },
  {
    id: '4',
    title: { ja: 'N4 文法完全対策', vi: 'Ngữ pháp N4 hoàn chỉnh' },
    description: {
      ja: '〜てしまう、〜ために等N4頻出文法を完全網羅',
      vi: 'Bao quát hoàn toàn ngữ pháp N4 thường gặp như 〜てしまう, 〜ために'
    },
    level: 'N4',
    category: 'grammar',
    totalLessons: 25,
    completedLessons: 5,
    isFree: false,
    requiredPlan: 'basic',
  },
  {
    id: '5',
    title: { ja: '介護の日本語 N4', vi: 'Tiếng Nhật điều dưỡng N4' },
    description: {
      ja: '介護現場で実際に使う日本語を学ぶ実践コース',
      vi: 'Khóa học thực hành tiếng Nhật sử dụng thực tế trong chăm sóc điều dưỡng'
    },
    level: 'N4',
    category: 'conversation',
    totalLessons: 15,
    completedLessons: 0,
    isFree: false,
    requiredPlan: 'pro',
    badge: '介護専門',
  },
  {
    id: '6',
    title: { ja: 'N3 読解練習', vi: 'Luyện đọc N3' },
    description: {
      ja: 'N3レベルの文章読解力を鍛える',
      vi: 'Rèn luyện khả năng đọc hiểu văn bản trình độ N3'
    },
    level: 'N3',
    category: 'reading',
    totalLessons: 20,
    completedLessons: 0,
    isFree: false,
    requiredPlan: 'pro',
  },
  {
    id: '7',
    title: { ja: 'N3 文法・語彙総まとめ', vi: 'Tổng hợp ngữ pháp & từ vựng N3' },
    description: {
      ja: 'N3合格に必要な文法・語彙を完全網羅',
      vi: 'Bao quát hoàn toàn ngữ pháp & từ vựng cần thiết để đạt N3'
    },
    level: 'N3',
    category: 'grammar',
    totalLessons: 30,
    completedLessons: 0,
    isFree: false,
    requiredPlan: 'pro',
  },
  {
    id: '8',
    title: { ja: 'N2 上級文法', vi: 'Ngữ pháp nâng cao N2' },
    description: {
      ja: 'N2レベルの複雑な文法構造を習得',
      vi: 'Nắm vững cấu trúc ngữ pháp phức tạp trình độ N2'
    },
    level: 'N2',
    category: 'grammar',
    totalLessons: 35,
    completedLessons: 0,
    isFree: false,
    requiredPlan: 'pro',
  },
];

const levelFilters = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];
const categoryFilters = ['all', 'vocabulary', 'grammar', 'reading', 'listening', 'conversation'];

export default function CoursesPage({ params }: CoursesPageProps) {
  const { locale } = use(params);
  const t = useTranslations('courses');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock user plan
  const userPlan = 'basic';

  const filteredCourses = allCourses.filter((course) => {
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    return true;
  });

  const isLocked = (course: typeof allCourses[0]) => {
    const planOrder = { free: 0, basic: 1, pro: 2 };
    return planOrder[course.requiredPlan as keyof typeof planOrder] > planOrder[userPlan as keyof typeof planOrder];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">レベル:</span>
          {levelFilters.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                selectedLevel === level
                  ? 'bg-[#0066CC] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {level === 'all' ? 'すべて' : level}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600">カテゴリ:</span>
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                selectedCategory === cat
                  ? 'bg-[#00B894] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {cat === 'all' ? 'すべて' : t(`category.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => {
          const locked = isLocked(course);
          const titleText = locale === 'ja' ? course.title.ja : course.title.vi;
          const descText = locale === 'ja' ? course.description.ja : course.description.vi;

          return (
            <Card key={course.id} bordered hover={!locked} className={cn(locked && 'opacity-75')}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      'text-xs font-bold px-2 py-0.5 rounded',
                      course.level === 'N5' ? 'bg-green-100 text-green-700' :
                      course.level === 'N4' ? 'bg-blue-100 text-blue-700' :
                      course.level === 'N3' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {course.level}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {t(`category.${course.category}`)}
                    </span>
                    {course.isFree && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                        {t('free')}
                      </span>
                    )}
                    {'badge' in course && course.badge && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">
                        {course.badge}
                      </span>
                    )}
                  </div>
                  {locked && <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{titleText}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{descText}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>
                    <BookOpen className="h-3.5 w-3.5 inline mr-1" />
                    {course.completedLessons}/{course.totalLessons} {t('lessons')}
                  </span>
                </div>

                {course.completedLessons > 0 && !locked && (
                  <div className="mb-3">
                    <ProgressBar
                      value={Math.round((course.completedLessons / course.totalLessons) * 100)}
                      size="sm"
                      color={course.completedLessons === course.totalLessons ? 'secondary' : 'primary'}
                    />
                  </div>
                )}

                {locked ? (
                  <Link href={`/${locale}/pricing`}>
                    <Button variant="outline" fullWidth size="sm" className="text-gray-500">
                      <Lock className="h-3.5 w-3.5 mr-1" />
                      {t('locked')} - アップグレード
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/${locale}/courses/${course.id}`}>
                    <Button
                      fullWidth
                      size="sm"
                      variant={course.completedLessons === course.totalLessons ? 'secondary' : 'primary'}
                    >
                      {course.completedLessons === course.totalLessons
                        ? t('completed')
                        : course.completedLessons > 0
                        ? t('continue')
                        : t('start')
                      }
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>コースが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}
