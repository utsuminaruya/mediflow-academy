'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Flame, Zap, BookOpen, Bot, ChevronRight, TrendingUp,
  LogOut, User, ExternalLink, Star, Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/learning/progress-bar';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'basic' | 'pro';
  currentLevel: string;
  targetLevel: string;
  streak: number;
  totalXp: number;
};

// デモユーザー（Supabase未接続時のフォールバック）
const DEMO_USER: UserProfile = {
  name: 'デモユーザー',
  email: 'demo@mediflow.com',
  plan: 'free',
  currentLevel: 'N5',
  targetLevel: 'N4',
  streak: 0,
  totalXp: 0,
};

const recentCourses = [
  { id: 'n5-01', title: 'N5 ひらがな・カタカナ完全マスター', level: 'N5', progress: 100, completedLessons: 10, totalLessons: 10 },
  { id: 'n5-02', title: 'N5 基礎語彙100', level: 'N5', progress: 100, completedLessons: 10, totalLessons: 10 },
  { id: 'n4-02', title: 'N4 文法完全対策', level: 'N4', progress: 20, completedLessons: 5, totalLessons: 25 },
];

const todayLesson = {
  id: 'n4-02',
  title: 'N4文法: 〜てしまう / 〜ちゃう',
  subtitle: '介護現場での使い方・後悔・完了の意味',
  xpReward: 25,
  estimatedMinutes: 7,
};

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  const t = useTranslations('dashboard');
  const router = useRouter();
  const lineUrl = process.env.NEXT_PUBLIC_LINE_JOBSEEKER || 'https://lin.ee/xUocVyI';

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      // Supabase未設定 → デモモード
      if (!isSupabaseConfigured) {
        setUserProfile(DEMO_USER);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        setUserProfile(DEMO_USER);
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push(`/${locale}/auth/login`);
        return;
      }

      const meta = session.user.user_metadata ?? {};
      const name =
        meta.full_name ||
        meta.name ||
        session.user.email?.split('@')[0] ||
        'ユーザー';

      // DBからプラン・XP・ストリークを取得
      const { data: dbUser } = await supabase
        .from('users')
        .select('plan, total_xp, streak_days, japanese_level, target_qualification')
        .eq('id', session.user.id)
        .single();

      setUserProfile({
        name,
        email: session.user.email ?? '',
        avatarUrl: meta.avatar_url || meta.picture || undefined,
        plan: (dbUser?.plan as UserProfile['plan']) ?? 'free',
        currentLevel: dbUser?.japanese_level ?? 'N5',
        targetLevel: dbUser?.target_qualification ?? 'N4',
        streak: dbUser?.streak_days ?? 0,
        totalXp: dbUser?.total_xp ?? 0,
      });
      setLoading(false);
    };

    fetchUser();
  }, [locale, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    if (isSupabaseConfigured) {
      const supabase = createClient();
      await supabase?.auth.signOut();
    }
    router.push(`/${locale}/auth/login`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">読み込み中...</p>
        </div>
      </div>
    );
  }

  const profile = userProfile ?? DEMO_USER;
  const userLevel = Math.floor(profile.totalXp / 100) + 1;
  const levelProgress = profile.totalXp % 100;

  // プランに応じたバッジカラー
  const planBadge = {
    free: { label: '無料プラン', color: 'bg-gray-100 text-gray-600' },
    basic: { label: 'ベーシック', color: 'bg-blue-100 text-blue-700' },
    pro: { label: 'プロ', color: 'bg-amber-100 text-amber-700' },
  }[profile.plan];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* ===== ヘッダー ===== */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* アバター */}
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-12 h-12 rounded-full border-2 border-[#0066CC]/20 object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#0066CC] flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-white" />
            </div>
          )}
          <div>
            <p className="text-gray-500 text-xs">{t('welcome')}</p>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{profile.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planBadge.color}`}>
                {planBadge.label}
              </span>
              <span className="text-xs text-gray-400">{profile.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-orange-700 font-semibold text-sm">{profile.streak}{t('days')}</span>
          </div>
          {/* XP */}
          <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-700 font-semibold text-sm">{profile.totalXp} XP</span>
          </div>
          {/* ログアウト */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="ログアウト"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ===== ステータスカード ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-gray-500">{t('streak')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{profile.streak}</p>
            <p className="text-xs text-gray-400">{t('days')}</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-gray-500">XP</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{profile.totalXp}</p>
            <p className="text-xs text-gray-400">Lv.{userLevel}</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-[#0066CC]" />
              <span className="text-xs text-gray-500">現在のレベル</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{profile.currentLevel}</p>
            <p className="text-xs text-gray-400">→ 目標: {profile.targetLevel}</p>
          </CardContent>
        </Card>

        <Card bordered>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-[#00B894]" />
              <span className="text-xs text-gray-500">プラン</span>
            </div>
            <p className="text-xl font-bold text-gray-900 capitalize">{profile.plan}</p>
            {profile.plan === 'free' && (
              <Link href={`/${locale}/pricing`} className="text-xs text-[#0066CC] hover:underline">
                アップグレード
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== レベル進捗バー ===== */}
      <Card bordered>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Lv.{userLevel} の進捗
            </span>
            <span className="text-sm text-gray-500">{levelProgress}/100 XP</span>
          </div>
          <ProgressBar value={levelProgress} color="gradient" size="md" />
          <p className="text-xs text-gray-400 mt-1.5">
            次のレベルまで残り {100 - levelProgress} XP
          </p>
        </CardContent>
      </Card>

      {/* ===== 今日のレッスン ===== */}
      <Card bordered className="border-[#0066CC]">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0066CC] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('todayLesson')}
                </span>
                <span className="text-xs text-gray-400">約{todayLesson.estimatedMinutes}分</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{todayLesson.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{todayLesson.subtitle}</p>
              <div className="flex items-center gap-4">
                <Link href={`/${locale}/courses/${todayLesson.id}`}>
                  <Button size="sm">
                    {t('continueLearning')}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-yellow-600 font-medium">+{todayLesson.xpReward} XP</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center ml-4 flex-shrink-0">
              <BookOpen className="h-7 w-7 text-[#0066CC]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== 最近のコース進捗 ===== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">コース進捗</h2>
          <Link href={`/${locale}/courses`} className="text-sm text-[#0066CC] hover:underline flex items-center gap-1">
            {t('viewAll')} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentCourses.map((course) => (
            <Card key={course.id} bordered>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {course.level}
                      </span>
                      {course.progress === 100 && (
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">完了</span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 truncate text-sm">{course.title}</p>
                    <div className="mt-2">
                      <ProgressBar
                        value={course.progress}
                        color={course.progress === 100 ? 'secondary' : 'primary'}
                        size="sm"
                        label={`${course.completedLessons}/${course.totalLessons} レッスン`}
                      />
                    </div>
                  </div>
                  <Link href={`/${locale}/courses/${course.id}`}>
                    <Button variant="outline" size="sm">
                      {course.progress === 100 ? '復習' : course.progress > 0 ? t('continueLearning') : '開始'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ===== AI家庭教師 ===== */}
      <Card className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Medi先生に質問する</p>
                <p className="text-blue-100 text-sm">今日の学習で分からないことを聞いてみよう</p>
              </div>
            </div>
            <Link href={`/${locale}/ai-tutor`}>
              <Button className="bg-white text-[#0066CC] hover:bg-blue-50" size="sm">
                チャット開始
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* ===== キャリアバナー ===== */}
      <Card className="bg-gradient-to-r from-[#00B894] to-[#00966e] text-white border-0">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-lg text-white mb-1">{t('careerBanner')}</p>
              <p className="text-green-100 text-sm mb-3">
                {locale === 'ja'
                  ? 'N3以上の方は介護福祉士の道も！Mediflowが無料で就職をサポートします'
                  : 'Trình độ N3 trở lên có thể trở thành kỹ thuật viên chăm sóc điều dưỡng!'
                }
              </p>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#00B894] hover:bg-green-50" size="sm">
                  {t('careerCta')}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <TrendingUp className="h-16 w-16 text-white/30" />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
