'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Clock, Target, ChevronRight, Lock, AlertCircle } from 'lucide-react';
import type { Exam, ExamCategory } from '@/types/exam';

export default function KaigoFukushishiPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
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

      const { data: examData } = await supabase
        .from('exams')
        .select('*')
        .eq('slug', 'kaigo-fukushishi')
        .eq('is_active', true)
        .single();

      if (examData) {
        setExam(examData as Exam);
        const { data: catsData } = await supabase
          .from('exam_categories')
          .select('*')
          .eq('exam_id', examData.id)
          .order('sort_order');
        setCategories((catsData as ExamCategory[]) || []);
      }
      setLoading(false);
    };
    load();
  }, []);

  const startSession = async (mode: string, categoryId?: string) => {
    if (!exam) return;
    const supabase = createClient();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push(`/${locale}/login`); return; }

    setStarting(true);
    try {
      const res = await fetch('/api/exams/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id: exam.id, mode, category_id: categoryId }),
      });
      if (res.status === 403) { router.push(`/${locale}/pricing`); return; }
      if (!res.ok) { alert(t('エラーが発生しました', 'Đã xảy ra lỗi')); return; }
      const { session } = await res.json();
      router.push(`/${locale}/exams/kaigo-fukushishi/practice/${session.id}`);
    } finally {
      setStarting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
  </div>;

  const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const canAccess = exam ? (planOrder[userPlan] ?? 0) >= (planOrder[exam.required_plan] ?? 0) : false;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <Link href={`/${locale}/exams`} className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← {t('過去問トップ', 'Trang đề thi')}
        </Link>
        <h1 className="text-xl font-bold text-gray-900">
          {t('介護福祉士国家試験', 'Kỳ thi quốc gia Kaigo Fukushishi')}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {t('13科目125問・220分の国家試験', 'Kỳ thi quốc gia 125 câu, 13 môn, 220 phút')}
        </p>
        {exam && (
          <div className="flex gap-4 mt-3">
            {[
              { icon: BookOpen, val: exam.total_questions, label: t('問', 'câu') },
              { icon: Clock, val: `${exam.time_limit_minutes}${t('分', 'p')}`, label: t('試験時間', 'Thời gian') },
              { icon: Target, val: `${exam.passing_score_percent}%`, label: t('合格基準', 'Điểm đạt') },
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
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
            <Lock className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-purple-800">{t('Proプランが必要です', 'Cần gói Pro')}</p>
              <p className="text-xs text-purple-600 mt-0.5">
                {t('介護福祉士国家試験にはProプラン（¥1,980/月）が必要です。', 'Cần gói Pro (¥1,980/tháng) cho kỳ thi Kaigo Fukushishi.')}
              </p>
              <Link href={`/${locale}/pricing`}>
                <button className="mt-2 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700">
                  {t('Proに申し込む', 'Đăng ký Pro')}
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* 学習モード */}
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            {t('学習モード', 'Chế độ học')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'year_based', label: t('年度別演習（第37回）', 'Luyện tập năm 2025'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { id: 'weak_points', label: t('弱点克服', 'Khắc phục điểm yếu'), color: 'bg-amber-50 border-amber-200 text-amber-700' },
            ].map(mode => (
              <button
                key={mode.id}
                disabled={!canAccess || starting}
                onClick={() => startSession(mode.id)}
                className={`border rounded-xl p-4 text-left text-sm font-bold transition-all ${
                  canAccess ? `${mode.color} hover:shadow-sm` : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {mode.label}
                {!canAccess && <Lock className="h-3.5 w-3.5 inline ml-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* 13科目一覧 */}
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            {t('13科目から選んで学習', 'Học theo 13 môn')}
          </h2>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                disabled={!canAccess || starting}
                onClick={() => startSession('category_based', cat.id)}
                className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between transition-all ${
                  canAccess ? 'hover:border-blue-200 hover:bg-blue-50' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-600">{cat.sort_order}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm text-gray-900">{locale === 'vi' ? cat.title.vi : cat.title.ja}</p>
                    <p className="text-xs text-gray-400">{cat.question_count}{t('問', ' câu')}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {starting && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
