'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { RoleplaySession, RoleplayScenario } from '@/types/roleplay';
import ScoreDisplay from '@/components/roleplay/ScoreDisplay';
import FeedbackRadarChart from '@/components/roleplay/FeedbackRadarChart';
import { CheckCircle, AlertCircle, RotateCcw, List } from 'lucide-react';

export default function FeedbackPage() {
  const params = useParams();
  const locale = params.locale as string;
  const scenarioId = params.scenarioId as string;
  const router = useRouter();
  const [session, setSession] = useState<RoleplaySession | null>(null);
  const [scenario, setScenario] = useState<RoleplayScenario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { router.push(`/${locale}/ai-tutor/roleplay`); return; }
      const { data } = await supabase
        .from('roleplay_sessions')
        .select('*, roleplay_scenarios(*)')
        .eq('id', scenarioId)
        .single();

      if (!data) {
        router.push(`/${locale}/ai-tutor/roleplay`);
        return;
      }

      setSession(data as unknown as RoleplaySession);
      setScenario(data.roleplay_scenarios as unknown as RoleplayScenario);
      setLoading(false);
    };
    load();
  }, [scenarioId, locale, router]);

  const handleRetry = async () => {
    if (!scenario) return;
    const res = await fetch('/api/roleplay/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: scenario.id }),
    });
    if (res.status === 429) {
      alert(locale === 'vi' ? 'Hết lượt hôm nay. Quay lại ngày mai!' : '本日の練習回数の上限に達しました。明日また来てください！');
      return;
    }
    if (!res.ok) return;
    const newSession = await res.json();
    router.push(`/${locale}/ai-tutor/roleplay/${newSession.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        {locale === 'vi' ? 'Không tìm thấy kết quả' : 'フィードバックが見つかりません'}
      </div>
    );
  }

  const feedback = session.feedback as unknown as {
    good_points?: Array<{ point: string; example: string }>;
    improvement_points?: Array<{ point: string; before: string; after: string }>;
    overall_comment?: string;
  } | null;

  const scores = session.scores_breakdown;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <h1 className="text-xl font-bold text-gray-900">
          {locale === 'vi' ? 'Kết quả luyện tập' : '練習結果'}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {locale === 'vi' ? scenario.title.vi : scenario.title.ja}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* スコアと評価 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            {session.total_score != null ? (
              <ScoreDisplay score={session.total_score} />
            ) : (
              <div className="text-gray-400 text-sm">
                {locale === 'vi' ? 'Đang tính điểm...' : 'スコア計算中...'}
              </div>
            )}

            {feedback?.overall_comment && (
              <p className="text-sm text-gray-600 text-center max-w-sm">
                {feedback.overall_comment}
              </p>
            )}
          </div>
        </div>

        {/* レーダーチャート */}
        {scores && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 mb-4">
              {locale === 'vi' ? 'Phân tích kỹ năng' : 'スキル分析'}
            </h2>
            <FeedbackRadarChart scores={scores} />
            {/* スコア詳細 */}
            <div className="mt-4 grid grid-cols-5 gap-2 text-center">
              {[
                { key: 'keigo', ja: '敬語', vi: 'Kính ngữ' },
                { key: 'care_terms', ja: '介護用語', vi: 'Chuyên môn' },
                { key: 'empathy', ja: '共感', vi: 'Đồng cảm' },
                { key: 'flow', ja: '流れ', vi: 'Mạch lạc' },
                { key: 'grammar', ja: '文法', vi: 'Ngữ pháp' },
              ].map(item => (
                <div key={item.key} className="flex flex-col items-center gap-0.5">
                  <span className="text-xs text-gray-400">{locale === 'vi' ? item.vi : item.ja}</span>
                  <span className="text-sm font-bold text-blue-700">
                    {scores[item.key as keyof typeof scores]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 良かった点 */}
        {feedback?.good_points && feedback.good_points.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={18} className="text-green-500" />
              <h2 className="text-sm font-bold text-gray-700">
                {locale === 'vi' ? 'Điểm tốt' : '良かった点'}
              </h2>
            </div>
            <div className="space-y-3">
              {feedback.good_points.map((item, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-green-800">{item.point}</p>
                  {item.example && (
                    <p className="text-xs text-green-600 mt-1">「{item.example}」</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 改善点 */}
        {feedback?.improvement_points && feedback.improvement_points.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={18} className="text-amber-500" />
              <h2 className="text-sm font-bold text-gray-700">
                {locale === 'vi' ? 'Cần cải thiện' : '改善ポイント'}
              </h2>
            </div>
            <div className="space-y-3">
              {feedback.improvement_points.map((item, i) => (
                <div key={i} className="bg-amber-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-amber-800">{item.point}</p>
                  <div className="mt-2 space-y-1">
                    {item.before && (
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium shrink-0">NG</span>
                        <p className="text-xs text-gray-600">「{item.before}」</p>
                      </div>
                    )}
                    {item.after && (
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-medium shrink-0">OK</span>
                        <p className="text-xs text-gray-600">「{item.after}」</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 会話統計 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-3">
            {locale === 'vi' ? 'Thống kê' : '会話の統計'}
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{session.turn_count}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {locale === 'vi' ? 'Lượt đối thoại' : 'ターン数'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{session.messages?.length ?? 0}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {locale === 'vi' ? 'Số tin nhắn' : 'メッセージ数'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{scenario.difficulty}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {locale === 'vi' ? 'Cấp độ' : 'レベル'}
              </p>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <RotateCcw size={16} />
            {locale === 'vi' ? 'Thử lại' : 'もう一度'}
          </button>
          <button
            onClick={() => router.push(`/${locale}/ai-tutor/roleplay`)}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl border border-gray-200 transition-colors"
          >
            <List size={16} />
            {locale === 'vi' ? 'Danh sách kịch bản' : 'シナリオ一覧へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
