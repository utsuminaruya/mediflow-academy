'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Clock, Target, ChevronRight, Lock, Award, TrendingUp, ArrowRight } from 'lucide-react';
import type { Exam } from '@/types/exam';

export default function ExamsTopPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [loading, setLoading] = useState(true);

  const t = (ja: string, vi: string) => locale === 'vi' ? vi : ja;

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }

      const [{ data: { user } }, { data: examsData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('exams').select('*').eq('is_active', true).order('sort_order'),
      ]);

      if (user) {
        const { data: profile } = await supabase.from('users').select('plan').eq('id', user.id).single();
        setUserPlan(profile?.plan || 'free');
      }

      setExams((examsData as Exam[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const tokuteiSkill = exams.find(e => e.slug === 'tokutei-ginou-skill');
  const tokuteiJa = exams.find(e => e.slug === 'tokutei-ginou-japanese');
  const kaigoFuku = exams.find(e => e.slug === 'kaigo-fukushishi');

  const planOrder: Record<string, number> = { free: 0, basic: 1, pro: 2 };
  const userPlanLevel = planOrder[userPlan] ?? 0;

  const canAccess = (exam: Exam) => userPlanLevel >= (planOrder[exam.required_plan] ?? 0);

  const ExamCard = ({ exam, href }: { exam: Exam; href: string }) => {
    const accessible = canAccess(exam);
    const title = locale === 'vi' ? exam.title.vi : exam.title.ja;
    const desc = locale === 'vi' ? exam.description.vi : exam.description.ja;

    return (
      <div className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${accessible ? 'border-gray-100 hover:shadow-md cursor-pointer' : 'border-gray-100 opacity-75'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900">{title}</h3>
              {!accessible && <Lock className="h-4 w-4 text-gray-400" />}
              {exam.required_plan !== 'free' && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  exam.required_plan === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {exam.required_plan.toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center bg-gray-50 rounded-xl p-2">
            <BookOpen className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">{exam.total_questions}</p>
            <p className="text-xs text-gray-400">{t('問', 'câu')}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-2">
            <Clock className="h-4 w-4 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">{exam.time_limit_minutes}</p>
            <p className="text-xs text-gray-400">{t('分', 'phút')}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-2">
            <Target className="h-4 w-4 text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">{exam.passing_score_percent}%</p>
            <p className="text-xs text-gray-400">{t('合格点', 'điểm đạt')}</p>
          </div>
        </div>

        {accessible ? (
          <Link href={href}>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              {t('学習を始める', 'Bắt đầu học')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        ) : (
          <Link href={`/${locale}/pricing`}>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              {exam.required_plan === 'pro' ? t('Proにアップグレード', 'Nâng cấp Pro') : t('Basicにアップグレード', 'Nâng cấp Basic')}
            </button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヒーロー */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white px-4 pt-12 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
            <Award className="h-4 w-4 text-yellow-300" />
            {t('合格への最短ルート', 'Con đường ngắn nhất đến thành công')}
          </div>
          <h1 className="text-3xl font-bold mb-3">
            {t('介護資格の過去問', 'Đề thi thật các chứng chỉ chăm sóc')}
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            {t(
              '全問にAI解説＋ベトナム語訳。弱点分析で効率学習。',
              'Tất cả câu hỏi có giải thích AI + dịch tiếng Việt. Học hiệu quả với phân tích điểm yếu.'
            )}
          </p>
          <div className="flex justify-center gap-6">
            {[
              { num: '60+', label: t('収録問題数', 'Câu hỏi') },
              { num: 'AI', label: t('解説付き', 'có giải thích') },
              { num: '2言語', label: t('日越対応', 'Nhật-Việt') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold">{stat.num}</p>
                <p className="text-blue-200 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8 space-y-8">
        {/* 特定技能セクション */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <h2 className="font-bold text-gray-900 text-lg mb-1">
              {t('特定技能「介護」評価試験', 'Kỳ thi đánh giá Tokutei Ginou ngành chăm sóc')}
            </h2>
            <p className="text-sm text-gray-500">
              {t(
                '日本で介護の仕事をするための入口の試験。12言語で受験可能。',
                'Kỳ thi đầu vào để làm việc chăm sóc tại Nhật. Có thể thi bằng 12 ngôn ngữ.'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tokuteiSkill && (
              <ExamCard exam={tokuteiSkill} href={`/${locale}/exams/tokutei-ginou`} />
            )}
            {tokuteiJa && (
              <ExamCard exam={tokuteiJa} href={`/${locale}/exams/tokutei-ginou`} />
            )}
          </div>
        </div>

        {/* 介護福祉士セクション */}
        {kaigoFuku && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <h2 className="font-bold text-gray-900 text-lg mb-1">
                {t('介護福祉士国家試験', 'Kỳ thi quốc gia Kaigo Fukushishi')}
              </h2>
              <p className="text-sm text-gray-500">
                {t(
                  '日本で介護のプロとして永続的に働くための国家資格試験。',
                  'Kỳ thi quốc gia để làm chuyên gia chăm sóc lâu dài tại Nhật.'
                )}
              </p>
            </div>
            <ExamCard exam={kaigoFuku} href={`/${locale}/exams/kaigo-fukushishi`} />
          </div>
        )}

        {/* キャリアパス */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            {t('介護キャリアパス', 'Con đường sự nghiệp chăm sóc')}
          </h2>
          <div className="flex items-center gap-1 flex-wrap">
            {[
              { label: t('日本へ来る前', 'Trước khi đến Nhật'), color: 'bg-gray-100 text-gray-700' },
              { label: '→', color: '' },
              { label: t('特定技能取得', 'Đạt Tokutei Ginou'), color: 'bg-blue-100 text-blue-700' },
              { label: '→', color: '' },
              { label: t('5年間勤務', '5 năm làm việc'), color: 'bg-green-100 text-green-700' },
              { label: '→', color: '' },
              { label: t('介護福祉士', 'Kaigo Fukushishi'), color: 'bg-purple-100 text-purple-700' },
              { label: '→', color: '' },
              { label: t('永住権', 'Visa vĩnh trú'), color: 'bg-amber-100 text-amber-700' },
            ].map((step, i) => step.color ? (
              <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-medium ${step.color}`}>{step.label}</span>
            ) : (
              <ArrowRight key={i} className="h-4 w-4 text-gray-400 flex-shrink-0" />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {t(
              'Mediflow Academyは「来日前」から「介護福祉士」まで全ステージをサポートします。',
              'Mediflow Academy hỗ trợ bạn từ "trước khi đến Nhật" đến khi đạt chứng chỉ Kaigo Fukushishi.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
