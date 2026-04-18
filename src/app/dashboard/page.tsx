import { createServerClient } from '@/lib/supabase';
import type { Candidate, Match, JobOpening } from '@/lib/types';

const STATUS_COLUMNS = [
  { key: 'active', label: '登録済み', color: 'bg-slate-100 border-slate-300' },
  { key: 'in_training', label: 'Academy学習中', color: 'bg-blue-50 border-blue-300' },
  { key: 'ready_for_placement', label: '納品準備完了', color: 'bg-green-50 border-green-300' },
  { key: 'placed', label: '配置済み', color: 'bg-purple-50 border-purple-300' },
  { key: 'withdrawn', label: '辞退・中断', color: 'bg-red-50 border-red-300' },
] as const;

const JLPT_BADGE: Record<string, string> = {
  N1: 'bg-purple-100 text-purple-800',
  N2: 'bg-blue-100 text-blue-800',
  N3: 'bg-green-100 text-green-800',
  N4: 'bg-yellow-100 text-yellow-800',
  N5: 'bg-orange-100 text-orange-800',
};

async function getData() {
  const supabase = createServerClient();
  const [{ data: candidates }, { data: topMatches }, { data: jobs }] = await Promise.all([
    supabase
      .from('candidates')
      .select('*, academy_progress(*)')
      .order('created_at', { ascending: false }),
    supabase
      .from('matches')
      .select('candidate_id, overall_score, delivery_plan')
      .gte('overall_score', 50)
      .order('overall_score', { ascending: false }),
    supabase.from('job_openings').select('id, facility_name, status').eq('status', 'open'),
  ]);
  return { candidates: candidates ?? [], topMatches: topMatches ?? [], jobs: jobs ?? [] };
}

export default async function DashboardPage() {
  const { candidates, topMatches, jobs } = await getData();

  const bestMatchByCandidate = topMatches.reduce<Record<string, number>>((acc, m) => {
    if (!acc[m.candidate_id] || acc[m.candidate_id] < m.overall_score) {
      acc[m.candidate_id] = m.overall_score;
    }
    return acc;
  }, {});

  const grouped = STATUS_COLUMNS.reduce<Record<string, Candidate[]>>((acc, col) => {
    acc[col.key] = candidates.filter((c) => c.status === col.key);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-800">Mediflow 統合ダッシュボード</h1>
            <p className="text-sm text-gray-500 mt-0.5">AIマッチング × Academy学習 × 即戦力納品</p>
          </div>
          <div className="flex gap-3 text-sm">
            <a href="/dashboard/matches" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">マッチング結果</a>
            <a href="/dashboard/academy" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">Academy進捗</a>
          </div>
        </div>
      </header>

      {/* サマリー */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-6 pb-2">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '総候補者数', value: candidates.length, color: 'text-blue-700' },
            { label: 'Academy学習中', value: grouped['in_training']?.length ?? 0, color: 'text-blue-600' },
            { label: '納品準備完了', value: grouped['ready_for_placement']?.length ?? 0, color: 'text-green-600' },
            { label: '公開中求人', value: jobs.length, color: 'text-purple-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* パイプラインボード */}
      <div className="max-w-screen-2xl mx-auto px-6 pb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">候補者パイプライン</h2>
        <div className="grid grid-cols-5 gap-4">
          {STATUS_COLUMNS.map((col) => (
            <div key={col.key} className={`rounded-lg border-2 ${col.color} p-3 min-h-[400px]`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm text-gray-700">{col.label}</span>
                <span className="bg-white text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full border">
                  {grouped[col.key]?.length ?? 0}
                </span>
              </div>
              <div className="space-y-2">
                {(grouped[col.key] ?? []).map((c) => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    bestScore={bestMatchByCandidate[c.id]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CandidateCard({
  candidate,
  bestScore,
}: {
  candidate: Candidate & { academy_progress?: any };
  bestScore?: number;
}) {
  const jlptBadge = candidate.jlpt_level ? JLPT_BADGE[candidate.jlpt_level] : null;
  const progress = candidate.academy_progress;

  return (
    <div className="bg-white rounded-md border border-gray-200 p-3 text-xs shadow-sm hover:shadow-md transition-shadow">
      <div className="font-semibold text-gray-800 truncate">{candidate.full_name}</div>
      <div className="text-gray-400 text-[11px] mt-0.5">{candidate.nationality}</div>

      <div className="flex items-center gap-1 mt-2 flex-wrap">
        {jlptBadge && (
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${jlptBadge}`}>
            {candidate.jlpt_level}
          </span>
        )}
        {bestScore !== undefined && (
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              bestScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {bestScore}点
          </span>
        )}
      </div>

      {/* Readinessゲージ */}
      {candidate.readiness_score > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Readiness</span>
            <span>{candidate.readiness_score}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                candidate.readiness_score >= 70 ? 'bg-green-500' : 'bg-blue-400'
              }`}
              style={{ width: `${candidate.readiness_score}%` }}
            />
          </div>
        </div>
      )}

      {/* Academy進捗バー */}
      {progress && progress.n3_completion_rate > 0 && (
        <div className="mt-1.5 text-[10px] text-gray-400">
          N3: {progress.n3_completion_rate}%
        </div>
      )}
    </div>
  );
}
