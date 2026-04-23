'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Clock, Target, ChevronRight, Lock, BarChart2, Zap, AlertCircle } from 'lucide-react';
import type { Exam, ExamCategory } from '@/types/exam';

export default function TokuteiGinouPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const t = (ja: string, vi: string) => locale === 'vi' ? vi : ja;

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('users').select('plan').eq('id', user.id).single();
        setUserPlan(profile?.plan || 'free');
      }

      const { data: examsData } = await supabase
        .from('exams')
        .select('*')
        .like('slug', 'tokutei-ginou%')
        .eq('is_active', true)
        .order('sort_order');

      setExams((examsData as Exam[]) || []);

      if (examsData && examsData.length > 0) {
        const { data: catsData } = await supabase
          .from('exam_categories')
          .select('*')
          .eq('exam_id', examsData[0].id)
          .order('sort_order');
        setCategories((catsData as ExamCategory[]) || []);
      }

      setLoading(false);
    };
    load();
  }, []);

  const startSession = async (examId: string, mode: string, categoryId?: string) => {
    const supabase = createClient();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push(`/${locale}/login`); return; }

    setStarting(true);
    try {
      const res = await fetch('/api/exams/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id: examId, mode, category_id: categoryId }),
      });

      if (res.status === 403) { router.push(`/${locale}/pricing`); return; }
      if (!res.ok) { alert(t('エラーが発生しました', 'Đã xảy ra lỗi')); return; }

      const { session } = await res.json();
      router.push(`/${locale}/exams/tokutei-ginou/practice/${session.id}`);
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>;
  }

  const skillExam = exams.find(e => e.slug === 'tokutei-ginou-skill');
  const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const canAccess = skillExam ? (planOrder[userPlan] ?? 0) >= (planOrder[skillExam.required_plan] ?? 0) : false;

  const modes = [
    {
      id: 'year_based',
      icon: BookOpen,
      title: t('年度別演習', 'Luyện tập theo năm'),
      desc: t('2025年の最新問題から解く', 'Giải câu hỏi mới nhất năm 2025'),
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      id: 'category_based',
      icon: Target,
      title: t('分野別学習', 'Học theo lĩnh vực'),
      desc: t('苦手な分野を集中して練習', 'Luyện tập tập trung vào lĩnh vực yếu'),
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
    },
    {
      id: 'weak_points',
      icon: AlertCircle,
      title: t('弱点克服', 'Khắc phục điểm yếu'),
      desc: t('AIが苦手問題を抽出して出題', 'AI trích xuất câu hỏi yếu để luyện'),
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'mock_test',
      icon: Clock,
      title: t('模擬試験', 'Thi thử'),
      desc: t('本番60分・時間制限あり', 'Đúng 60 phút, có giới hạn thời gian'),
      color: 'bg-red-50 border-red-200 text-red-700',
      iconColor: 'text-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <Link href={`/${locale}/exams`} className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← {t('過去問トップ', 'Trang đề thi')}
        </Link>
        <h1 className="text-xl font-bold text-gray-900">
          {t('介護技能評価試験', 'Kỳ thi đánh giá kỹ năng chăm sóc')}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {t('特定技能「介護」取得のための評価試験', 'Kỳ thi đánh giá để đạt Tokutei Ginou ngành chăm sóc')}
        </p>
        {skillExam && (
          <div className="flex gap-4 mt-3">
            {[
              { icon: BookOpen, val: skillExam.total_questions, label: t('問', 'câu') },
              { icon: Clock, val: `${skillExam.time_limit_minutes}${t('分', 'p')}`, label: t('試験時間', 'Thời gian') },
              { icon: Target, val: `${skillExam.passing_score_percent}%`, label: t('合格基準', 'Điểm đạt') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm">
                <item.icon className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-gray-900">{item.val}</span>
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {!canAccess && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Lock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">
                {t('Basicプランが必要です', 'Cần gói Basic')}
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                {t('過去問機能を利用するにはBasicプラン（¥980/月）が必要です。', 'Cần gói Basic (¥980/tháng) để sử dụng tính năng đề thi thật.')}
              </p>
              <Link href={`/${locale}/pricing`}>
                <button className="mt-2 text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors">
                  {t('プランを見る', 'Xem gói')}
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* 学習モード選択 */}
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            {t('学習モードを選ぶ', 'Chọn chế độ học')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modes.map(mode => (
              <button
                key={mode.id}
                disabled={!canAccess || starting}
                onClick={() => skillExam && startSession(skillExam.id, mode.id)}
                className={`border rounded-xl p-4 text-left transition-all ${
                  canAccess ? `${mode.color} hover:shadow-sm cursor-pointer` : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <mode.icon className={`h-5 w-5 ${canAccess ? mode.iconColor : 'text-gray-400'}`} />
                  <span className="font-bold text-sm">{mode.title}</span>
                  {!canAccess && <Lock className="h-3 w-3 text-gray-400" />}
                </div>
                <p className="text-xs text-gray-500">{mode.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 分野別 */}
        {categories.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
              {t('分野別に練習', 'Luyện tập theo lĩnh vực')}
            </h2>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  disabled={!canAccess || starting}
                  onClick={() => skillExam && startSession(skillExam.id, 'category_based', cat.id)}
                  className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between transition-all ${
                    canAccess ? 'hover:border-blue-200 hover:bg-blue-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm text-gray-900">
                        {locale === 'vi' ? cat.title.vi : cat.title.ja}
                      </p>
                      <p className="text-xs text-gray-400">{cat.question_count}{t('問', ' câu')}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 統計リンク */}
        <Link href={`/${locale}/exams/tokutei-ginou/analytics`} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-3">
            <BarChart2 className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-sm text-gray-900">
              {t('学習分析を見る', 'Xem phân tích học tập')}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Link>
      </div>

      {starting && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-sm text-gray-600">{t('セッションを開始中...', 'Đang bắt đầu buổi học...')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
