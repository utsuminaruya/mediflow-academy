import { createServerClient } from '@/lib/supabase';

async function getData() {
  const supabase = createServerClient();
  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      candidate:candidates(full_name, nationality, jlpt_level, readiness_score),
      job:job_openings(facility_name, facility_type, salary_min)
    `)
    .order('overall_score', { ascending: false })
    .limit(100);
  return { matches: matches ?? [] };
}

export default async function MatchesPage() {
  const { matches } = await getData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <a href="/dashboard" className="text-blue-600 hover:underline text-sm">← ダッシュボード</a>
          <h1 className="text-xl font-bold text-blue-800">マッチング結果一覧</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">候補者</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">求人施設</th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">総合</th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">スキル</th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">立地</th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">準備度</th>
                <th className="text-left px-4 py-3 text-gray-600 font-semibold">納品プラン</th>
                <th className="text-center px-4 py-3 text-gray-600 font-semibold">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {matches.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{m.candidate?.full_name}</div>
                    <div className="text-gray-400 text-xs">{m.candidate?.nationality} / {m.candidate?.jlpt_level ?? '未取得'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{m.job?.facility_name}</div>
                    <div className="text-gray-400 text-xs">{m.job?.facility_type}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                        m.overall_score >= 70
                          ? 'bg-green-100 text-green-800'
                          : m.overall_score >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {m.overall_score}点
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{m.skill_score ?? '-'}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{m.location_score ?? '-'}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{m.readiness_score ?? '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        m.delivery_plan?.includes('即')
                          ? 'bg-green-50 text-green-700'
                          : m.delivery_plan?.includes('Academy')
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {m.delivery_plan ?? '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-gray-500">{m.status}</span>
                  </td>
                </tr>
              ))}
              {matches.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    マッチング結果がまだありません。候補者と求人を登録後、マッチングを実行してください。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
