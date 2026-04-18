import { createServerClient } from '@/lib/supabase';

async function getData() {
  const supabase = createServerClient();
  const { data: candidates } = await supabase
    .from('candidates')
    .select('id, full_name, nationality, jlpt_level, readiness_score, status, academy_progress(*)')
    .in('status', ['in_training', 'ready_for_placement'])
    .order('readiness_score', { ascending: false });
  return { candidates: candidates ?? [] };
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export default async function AcademyProgressPage() {
  const { candidates } = await getData();

  const nearN3 = candidates.filter(
    (c) => (c.academy_progress as any)?.n3_completion_rate >= 60
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <a href="/dashboard" className="text-blue-600 hover:underline text-sm">← ダッシュボード</a>
          <h1 className="text-xl font-bold text-blue-800">Academy 学習進捗</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* N3合格圏のアラート */}
        {nearN3.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-semibold text-green-800 mb-2">N3合格ライン到達間近 ({nearN3.length}名)</div>
            <div className="flex flex-wrap gap-2">
              {nearN3.map((c) => (
                <span key={c.id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {c.full_name}（N3 {(c.academy_progress as any)?.n3_completion_rate ?? 0}%）
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 候補者一覧 */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 text-sm">
            学習中候補者 ({candidates.length}名)
          </div>
          <div className="divide-y divide-gray-100">
            {candidates.map((c) => {
              const p = c.academy_progress as any;
              return (
                <div key={c.id} className="px-4 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-medium text-gray-900">{c.full_name}</span>
                      <span className="ml-2 text-xs text-gray-400">{c.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {c.jlpt_level && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                          {c.jlpt_level}
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold ${
                          c.readiness_score >= 70
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        Readiness {c.readiness_score}%
                      </span>
                    </div>
                  </div>

                  {p ? (
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>N5</span><span>{p.n5_completion_rate ?? 0}%</span>
                        </div>
                        <ProgressBar value={p.n5_completion_rate ?? 0} color="bg-orange-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>N4</span><span>{p.n4_completion_rate ?? 0}%</span>
                        </div>
                        <ProgressBar value={p.n4_completion_rate ?? 0} color="bg-blue-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-gray-500 mb-1">
                          <span>N3</span><span>{p.n3_completion_rate ?? 0}%</span>
                        </div>
                        <ProgressBar value={p.n3_completion_rate ?? 0} color="bg-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">学習データなし</div>
                  )}

                  {p && (
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      <span>介護用語: {p.kaigo_vocabulary_mastered ?? 0}語</span>
                      <span>連続: {p.consecutive_study_days ?? 0}日</span>
                      <span>N3模擬: {p.n3_mock_score ?? '未受験'}点</span>
                      <span>総学習: {Math.round((p.total_study_minutes ?? 0) / 60)}時間</span>
                    </div>
                  )}
                </div>
              );
            })}
            {candidates.length === 0 && (
              <div className="px-4 py-12 text-center text-gray-400 text-sm">
                学習中の候補者がいません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
