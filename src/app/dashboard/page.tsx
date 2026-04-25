import { createServerClient } from '@/lib/supabase';
import Link from 'next/link';

/* ─────────────── 定数 ─────────────── */
const FLAGS: Record<string, string> = {
  ベトナム: '🇻🇳', フィリピン: '🇵🇭', インドネシア: '🇮🇩',
  ミャンマー: '🇲🇲', カンボジア: '🇰🇭', ネパール: '🇳🇵',
  スリランカ: '🇱🇰', タイ: '🇹🇭', モンゴル: '🇲🇳',
  中国: '🇨🇳', 韓国: '🇰🇷',
};

const JLPT_STYLE: Record<string, string> = {
  N1: 'bg-purple-600 text-white',
  N2: 'bg-blue-600 text-white',
  N3: 'bg-emerald-600 text-white',
  N4: 'bg-amber-500 text-white',
  N5: 'bg-orange-500 text-white',
};

const STATUS_CONFIG: Record<string, { label: string; pill: string; glow: string }> = {
  active:               { label: '登録済み',       pill: 'bg-slate-100 text-slate-700 border-slate-300',   glow: '' },
  in_training:          { label: 'Academy学習中',  pill: 'bg-blue-100 text-blue-700 border-blue-300',       glow: 'ring-2 ring-blue-300' },
  ready_for_placement:  { label: '納品準備完了',   pill: 'bg-green-100 text-green-700 border-green-300',    glow: 'ring-2 ring-green-400' },
  placed:               { label: '配置済み',       pill: 'bg-purple-100 text-purple-700 border-purple-300', glow: '' },
  withdrawn:            { label: '辞退・中断',     pill: 'bg-red-100 text-red-600 border-red-200',          glow: '' },
};

const STATUS_TABS = [
  { key: 'all',                 label: '全員' },
  { key: 'active',              label: '登録済み' },
  { key: 'in_training',         label: 'Academy学習中' },
  { key: 'ready_for_placement', label: '納品準備完了' },
  { key: 'placed',              label: '配置済み' },
];

/* ─────────────── ヘルパー ─────────────── */
function getQuals(c: any) {
  const list: { label: string; style: string }[] = [];
  if (c.has_kaigofukushishi)
    list.push({ label: '介護福祉士', style: 'bg-purple-50 text-purple-800 border-purple-200' });
  if (c.visa_status === 'epa')
    list.push({ label: 'EPA', style: 'bg-indigo-50 text-indigo-800 border-indigo-200' });
  if (c.visa_status === 'tokutei_gino')
    list.push({ label: '特定技能「介護」', style: 'bg-blue-50 text-blue-800 border-blue-200' });
  if (c.visa_status === 'ginou_jissyu')
    list.push({ label: '技能実習', style: 'bg-cyan-50 text-cyan-800 border-cyan-200' });
  if (c.has_jitsumusya_kensyu && !c.has_kaigofukushishi)
    list.push({ label: '実務者研修', style: 'bg-teal-50 text-teal-800 border-teal-200' });
  if (c.has_shoninsha_kensyu && !c.has_kaigofukushishi && !c.has_jitsumusya_kensyu)
    list.push({ label: '初任者研修', style: 'bg-green-50 text-green-800 border-green-200' });
  return list;
}

function getGradient(c: any) {
  if (c.has_kaigofukushishi) return 'from-purple-700 to-purple-500';
  if (c.visa_status === 'epa') return 'from-indigo-700 to-indigo-500';
  if (c.visa_status === 'tokutei_gino') return 'from-blue-700 to-blue-500';
  if (c.has_jitsumusya_kensyu) return 'from-teal-700 to-teal-500';
  return 'from-slate-600 to-slate-400';
}

function calcAge(dob: string | null) {
  if (!dob) return null;
  return Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;
}

/* ─────────────── データ取得 ─────────────── */
async function getData(statusFilter: string) {
  const supabase = createServerClient();

  let q = supabase
    .from('candidates')
    .select('*, academy_progress(*)')
    .order('readiness_score', { ascending: false });
  if (statusFilter !== 'all') q = q.eq('status', statusFilter);

  const [{ data: candidates }, { data: allCandidates }, { data: jobs }, { data: topMatches }] =
    await Promise.all([
      q,
      supabase.from('candidates').select('status'),
      supabase.from('job_openings').select('id').eq('status', 'open'),
      supabase
        .from('matches')
        .select('candidate_id, overall_score, job_opening_id')
        .gte('overall_score', 50)
        .order('overall_score', { ascending: false }),
    ]);

  return {
    candidates: candidates ?? [],
    allCandidates: allCandidates ?? [],
    jobs: jobs ?? [],
    topMatches: topMatches ?? [],
  };
}

/* ─────────────── ページ ─────────────── */
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status ?? 'all';
  const { candidates, allCandidates, jobs, topMatches } = await getData(statusFilter);

  // ステータス別カウント
  const countBy = (allCandidates as any[]).reduce<Record<string, number>>((acc, c) => {
    acc[c.status] = (acc[c.status] ?? 0) + 1;
    return acc;
  }, {});
  const totalCount = Object.values(countBy).reduce((a, b) => a + b, 0);

  // 候補者ごとのベストマッチスコア & 求人ID
  const bestScore: Record<string, number> = {};
  const bestJobId: Record<string, string> = {};
  for (const m of topMatches as any[]) {
    if (bestScore[m.candidate_id] === undefined || bestScore[m.candidate_id] < m.overall_score) {
      bestScore[m.candidate_id] = m.overall_score;
      bestJobId[m.candidate_id] = m.job_opening_id;
    }
  }

  const stats = [
    { label: '総候補者', value: totalCount, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
    { label: 'Academy学習中', value: countBy['in_training'] ?? 0, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: '納品準備完了', value: countBy['ready_for_placement'] ?? 0, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
    { label: '配置済み', value: countBy['placed'] ?? 0, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { label: '公開中求人', value: jobs.length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── ヘッダー ── */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white px-6 py-5 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-black tracking-tight">Mediflow</h1>
            <p className="text-blue-200 text-xs mt-0.5">AIマッチング × Academy × 即戦力納品</p>
          </div>
          <div className="flex gap-2 text-sm flex-wrap">
            <Link href="/dashboard/matches"
              className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg font-semibold transition-colors backdrop-blur-sm">
              📊 マッチング結果
            </Link>
            <Link href="/dashboard/academy"
              className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg font-semibold transition-colors backdrop-blur-sm">
              🎓 Academy進捗
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6 space-y-5">

        {/* ── サマリー統計 ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 border shadow-sm`}>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-gray-600 text-xs mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── ステータスフィルタータブ ── */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => {
            const cnt = tab.key === 'all' ? totalCount : (countBy[tab.key] ?? 0);
            const active = statusFilter === tab.key;
            return (
              <Link
                key={tab.key}
                href={tab.key === 'all' ? '/dashboard' : `/dashboard?status=${tab.key}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all whitespace-nowrap ${
                  active
                    ? 'bg-blue-700 text-white border-blue-700 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                {tab.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {cnt}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── 候補者グリッド ── */}
        {candidates.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">👤</div>
            <p className="font-medium">該当する候補者がいません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(candidates as any[]).map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                matchScore={bestScore[c.id]}
                bestJobId={bestJobId[c.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── 候補者カード ─────────────── */
function CandidateCard({
  candidate: c,
  matchScore,
  bestJobId,
}: {
  candidate: any;
  matchScore?: number;
  bestJobId?: string;
}) {
  const status = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.active;
  const gradient = getGradient(c);
  const quals = getQuals(c);
  const age = calcAge(c.date_of_birth);
  const flag = FLAGS[c.nationality] ?? '🌏';
  const progress = Array.isArray(c.academy_progress)
    ? c.academy_progress[0]
    : c.academy_progress;
  const isReady = c.status === 'ready_for_placement';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${status.glow}`}
    >
      {/* ── グラデーションヘッダー + アバター ── */}
      <div className={`relative bg-gradient-to-br ${gradient} h-28`}>
        {/* ステータスバッジ */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm ${status.pill}`}>
            {isReady && '✓ '}{status.label}
          </span>
        </div>

        {/* AIスコア */}
        {matchScore !== undefined && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              matchScore >= 70 ? 'bg-green-400 text-green-900' : 'bg-white/25 text-white'
            }`}>
              AI {matchScore}点
            </span>
          </div>
        )}

        {/* 肩から上のアバター */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(c.full_name)}
              alt={c.full_name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── 情報エリア ── */}
      <div className="pt-12 px-4 pb-4 space-y-3">

        {/* 名前 + 国籍 */}
        <div className="text-center">
          <div className="font-black text-gray-900 text-base leading-tight">
            {c.full_name}
          </div>
          <div className="text-gray-400 text-xs mt-0.5">
            {flag} {c.nationality}{age ? ` · ${age}歳` : ''}
          </div>
        </div>

        {/* 資格バッジ */}
        {quals.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {quals.map((q) => (
              <span
                key={q.label}
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${q.style}`}
              >
                {q.label}
              </span>
            ))}
          </div>
        )}

        {/* JLPT + Readiness スコア */}
        <div className="flex items-center justify-between">
          {c.jlpt_level ? (
            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${JLPT_STYLE[c.jlpt_level] ?? 'bg-gray-200 text-gray-700'}`}>
              日本語 {c.jlpt_level}
            </span>
          ) : (
            <span className="text-xs text-gray-400">JLPT未取得</span>
          )}
          {c.readiness_score > 0 && (
            <span className={`text-xs font-bold ${c.readiness_score >= 70 ? 'text-green-600' : 'text-blue-500'}`}>
              準備度 {c.readiness_score}%
            </span>
          )}
        </div>

        {/* Readinessバー */}
        {c.readiness_score > 0 && (
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${c.readiness_score >= 70 ? 'bg-green-500' : 'bg-blue-400'}`}
              style={{ width: `${c.readiness_score}%` }}
            />
          </div>
        )}

        {/* Academy N3進捗（学習中のみ） */}
        {progress && progress.n3_completion_rate > 0 && (
          <div className="bg-blue-50 rounded-lg px-3 py-2">
            <div className="flex justify-between text-[11px] text-blue-700 font-semibold mb-1">
              <span>🎓 N3学習進捗</span>
              <span>{progress.n3_completion_rate}%</span>
            </div>
            <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress.n3_completion_rate}%` }}
              />
            </div>
          </div>
        )}

        {/* 介護経験 */}
        {c.care_experience_months > 0 && (
          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            🩺 介護経験{' '}
            {c.care_experience_months >= 12
              ? `${Math.floor(c.care_experience_months / 12)}年${c.care_experience_months % 12 ? (c.care_experience_months % 12) + 'ヶ月' : ''}`
              : `${c.care_experience_months}ヶ月`}
          </div>
        )}

        {/* 入職可能日 */}
        {c.available_from && (
          <div className="text-[11px] text-gray-400 flex items-center gap-1">
            📅 {new Date(c.available_from).toLocaleDateString('ja-JP')} 入職可能
          </div>
        )}

        {/* 提案書ボタン */}
        {bestJobId && (
          <a
            href={`/proposal/${bestJobId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-xs font-bold py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
          >
            📄 提案書を開く
          </a>
        )}
      </div>
    </div>
  );
}
