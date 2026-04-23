'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ScenarioCard from '@/components/roleplay/ScenarioCard';
import { RoleplayScenario } from '@/types/roleplay';
import { createClient } from '@/lib/supabase/client';
import { Filter } from 'lucide-react';

const CATEGORIES = [
  { key: 'all', ja: '全て', vi: 'Tất cả' },
  { key: 'morning_care', ja: '朝のケア', vi: 'Buổi sáng' },
  { key: 'meal_assistance', ja: '食事介助', vi: 'Bữa ăn' },
  { key: 'bathing', ja: '入浴介助', vi: 'Tắm' },
  { key: 'toileting', ja: '排泄介助', vi: 'Vệ sinh' },
  { key: 'mobility', ja: '移動介助', vi: 'Di chuyển' },
  { key: 'vital_check', ja: 'バイタル', vi: 'Sinh hiệu' },
  { key: 'handover', ja: '申し送り', vi: 'Bàn giao' },
  { key: 'family_communication', ja: '家族対応', vi: 'Gia đình' },
  { key: 'emergency', ja: '緊急対応', vi: 'Khẩn cấp' },
];

export default function RoleplayListPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [scenarios, setScenarios] = useState<RoleplayScenario[]>([]);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [todaySessions, setTodaySessions] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [profileRes, countRes] = await Promise.all([
          supabase.from('users').select('plan').eq('id', user.id).single(),
          supabase.rpc('count_today_sessions', { p_user_id: user.id }),
        ]);
        setUserPlan(profileRes.data?.plan || 'free');
        setTodaySessions(countRes.data ?? 0);
      }

      const { data } = await supabase
        .from('roleplay_scenarios')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      setScenarios((data as RoleplayScenario[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const dailyLimit = userPlan === 'free' ? 1 : userPlan === 'basic' ? 3 : Infinity;
  const remaining = dailyLimit === Infinity ? Infinity : Math.max(0, dailyLimit - todaySessions);

  const filtered = selectedCategory === 'all'
    ? scenarios
    : scenarios.filter(s => s.category === selectedCategory);

  const featured = scenarios.find(s => s.required_plan === 'free' && s.difficulty === 'N5');

  const handlePlay = async (scenario: RoleplayScenario) => {
    const supabase = createClient();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push(`/${locale}/login`); return; }

    const res = await fetch('/api/roleplay/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: scenario.id }),
    });

    if (res.status === 403) { router.push(`/${locale}/pricing`); return; }
    if (res.status === 429) { alert('本日の練習回数の上限に達しました。明日また来てください！'); return; }
    if (!res.ok) { alert('エラーが発生しました'); return; }

    const session = await res.json();
    router.push(`/${locale}/ai-tutor/roleplay/${session.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <h1 className="text-xl font-bold text-gray-900">
          {locale === 'vi' ? 'Luyện hội thoại AI' : 'AIロールプレイ練習'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {locale === 'vi'
            ? 'Thực hành hội thoại với AI theo từng tình huống chăm sóc'
            : '介護現場のシーンで会話を練習しよう'}
        </p>
        {dailyLimit !== Infinity && (
          <div className={`mt-2 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1
            ${remaining > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {locale === 'vi'
              ? `Còn lại hôm nay: ${remaining === Infinity ? '∞' : remaining} lần`
              : `本日の残り回数: ${remaining === Infinity ? '無制限' : `${remaining}回`}`}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* おすすめシナリオ */}
        {featured && (
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              {locale === 'vi' ? 'Gợi ý hôm nay' : '今日のおすすめ'}
            </h2>
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white cursor-pointer hover:from-blue-700 hover:to-blue-600 transition-all"
              onClick={() => handlePlay(featured)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌅</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">N5 · Free · 5分</span>
              </div>
              <h3 className="font-bold text-lg">{locale === 'vi' ? featured.title.vi : featured.title.ja}</h3>
              <p className="text-sm text-blue-100 mt-1">
                {locale === 'vi' ? featured.description.vi : featured.description.ja}
              </p>
              <button className="mt-3 bg-white text-blue-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                {locale === 'vi' ? 'Bắt đầu' : 'はじめる'}
              </button>
            </div>
          </div>
        )}

        {/* カテゴリフィルタ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={14} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-500">
              {locale === 'vi' ? 'Lọc theo danh mục' : 'カテゴリで絞り込む'}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium
                  ${selectedCategory === cat.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}
              >
                {locale === 'vi' ? cat.vi : cat.ja}
              </button>
            ))}
          </div>
        </div>

        {/* シナリオ一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(scenario => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              userPlan={userPlan}
              remainingToday={remaining === Infinity ? 999 : remaining}
              locale={locale}
              onPlay={handlePlay}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {locale === 'vi' ? 'Không có kịch bản nào' : 'シナリオがありません'}
          </div>
        )}
      </div>
    </div>
  );
}
