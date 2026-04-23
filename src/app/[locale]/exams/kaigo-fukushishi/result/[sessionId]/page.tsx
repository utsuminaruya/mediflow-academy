'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, RotateCcw, List, Award, TrendingUp } from 'lucide-react';
import type { PracticeSession, Exam } from '@/types/exam';

export default function KaigoFukushishiResultPage() {
  const params = useParams();
  const locale = params.locale as string;
  const sessionId = params.sessionId as string;
  const router = useRouter();
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  const t = (ja: string, vi: string) => locale === 'vi' ? vi : ja;

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) return;
      const { data: s } = await supabase.from('exam_practice_sessions').select('*').eq('id', sessionId).single();
      if (!s) { router.back(); return; }
      setSession(s as PracticeSession);
      const { data: e } = await supabase.from('exams').select('*').eq('id', s.exam_id).single();
      setExam(e as Exam);
      setLoading(false);
    };
    load();
  }, [sessionId, router]);

  if (loading || !session || !exam) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" /></div>;

  const accuracy = session.total_questions > 0 ? Math.round((session.correct_answers / session.total_questions) * 100) : 0;
  const passed = accuracy >= exam.passing_score_percent;
  const wrong = session.total_questions - session.correct_answers;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <h1 className="text-xl font-bold text-gray-900">{t('練習結果', 'Kết quả luyện tập')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{locale === 'vi' ? exam.title.vi : exam.title.ja}</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-5">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-green-100' : 'bg-red-50'}`}>
            <div>
              <p className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-500'}`}>{accuracy}%</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('正答率', 'Độ chính xác')}</p>
            </div>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm mb-4 ${passed ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {passed ? <><CheckCircle className="h-4 w-4" />{t('合格ライン達成！', 'Đạt điểm đạt!')}</> : <><XCircle className="h-4 w-4" />{t('もう少し！', 'Thêm chút nữa!')}</>}
          </div>
          <p className="text-sm text-gray-500">{t(`合格基準: ${exam.passing_score_percent}%以上`, `Điểm đạt: ${exam.passing_score_percent}%`)}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t('問題数', 'Tổng'), value: session.total_questions, color: 'text-gray-900' },
            { label: t('正解', 'Đúng'), value: session.correct_answers, color: 'text-green-600' },
            { label: t('不正解', 'Sai'), value: wrong, color: 'text-red-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.push(`/${locale}/exams/kaigo-fukushishi`)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="h-4 w-4" />{t('もう一度', 'Thử lại')}
          </button>
          <Link href={`/${locale}/exams`} className="flex-1">
            <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2">
              <List className="h-4 w-4" />{t('試験一覧', 'Danh sách')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
