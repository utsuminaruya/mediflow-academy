import { createServerClient } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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
  N5: 'bg-orange-400 text-white',
};

const STATUS_CONFIG: Record<string, { label: string; pill: string; dot: string; glow: string }> = {
  active:               { label: '登録済み',       pill: 'bg-slate-100 text-slate-600 border-slate-200',   dot: 'bg-slate-400',  glow: '' },
  in_training:          { label: 'Academy学習中',  pill: 'bg-blue-50 text-blue-700 border-blue-200',        dot: 'bg-blue-400',   glow: 'ring-2 ring-blue-200' },
  ready_for_placement:  { label: 'ご紹介可能',     pill: 'bg-green-50 text-green-700 border-green-300',     dot: 'bg-green-400',  glow: 'ring-2 ring-green-300' },
  placed:               { label: '採用済み',       pill: 'bg-purple-50 text-purple-700 border-purple-200',  dot: 'bg-purple-400', glow: '' },
  withdrawn:            { label: '一時停止',       pill: 'bg-gray-50 text-gray-500 border-gray-200',        dot: 'bg-gray-300',   glow: '' },
};

const STATUS_TABS = [
  { key: 'all',                 label: '全員',         emoji: '👥' },
  { key: 'ready_for_placement', label: 'ご紹介可能',   emoji: '✅' },
  { key: 'in_training',         label: 'Academy学習中',emoji: '📚' },
  { key: 'active',              label: '登録済み',     emoji: '📋' },
  { key: 'placed',              label: '採用済み',     emoji: '🏥' },
];

/* ─────────────── ヘルパー ─────────────── */
function getQuals(c: any) {
  const list: { label: string; style: string }[] = [];
  if (c.has_kaigofukushishi)
    list.push({ label: '介護福祉士', style: 'bg-purple-50 text-purple-800 border-purple-200 font-bold' });
  if (c.visa_status === 'epa')
    list.push({ label: 'EPA', style: 'bg-indigo-50 text-indigo-800 border-indigo-200 font-bold' });
  if (c.visa_status === 'tokutei_gino')
    list.push({ label: '特定技能「介護」', style: 'bg-blue-50 text-blue-800 border-blue-200 font-bold' });
  if (c.has_jitsumusya_kensyu && !c.has_kaigofukushishi)
    list.push({ label: '実務者研修', style: 'bg-teal-50 text-teal-800 border-teal-200' });
  if (c.has_shoninsha_kensyu && !c.has_kaigofukushishi && !c.has_jitsumusya_kensyu)
    list.push({ label: '初任者研修', style: 'bg-green-50 text-green-800 border-green-200' });
  return list;
}

function getGradient(c: any) {
  if (c.has_kaigofukushishi) return 'from-purple-700 via-purple-600 to-indigo-500';
  if (c.visa_status === 'epa') return 'from-indigo-700 via-indigo-600 to-blue-500';
  if (c.visa_status === 'tokutei_gino') return 'from-blue-700 via-blue-600 to-cyan-500';
  if (c.has_jitsumusya_kensyu) return 'from-teal-700 via-teal-600 to-green-500';
  return 'from-slate-600 via-slate-500 to-gray-400';
}

function ageRange(dob: string | null) {
  if (!dob) return null;
  const age = Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  if (age < 25) return '20代前半';
  if (age < 30) return '20代後半';
  if (age < 35) return '30代前半';
  if (age < 40) return '30代後半';
  return '40代';
}

function expRange(months: number) {
  if (!months) return '経験なし';
  if (months < 6) return '〜6ヶ月';
  if (months < 12) return '6ヶ月〜1年';
  if (months < 24) return '1〜2年';
  if (months < 36) return '2〜3年';
  if (months < 60) return '3〜5年';
  return '5年以上';
}

// 専門的なアバター（notionistsスタイル）
function avatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
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
      supabase.from('candidates').select('status, readiness_score').limit(1000),
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

  const allCandidatesList = (allCandidates ?? []) as any[];
  const totalCount = allCandidatesList.length;
  const readyCount    = allCandidatesList.filter((c) => c.status === 'ready_for_placement').length;
  const trainingCount = allCandidatesList.filter((c) => c.status === 'in_training').length;
  const placedCount   = allCandidatesList.filter((c) => c.status === 'placed').length;

  const countBy: Record<string, number> = {
    ready_for_placement: readyCount,
    in_training:         trainingCount,
    active:              allCandidatesList.filter((c) => c.status === 'active').length,
    placed:              placedCount,
  };

  const bestScore: Record<string, number> = {};
  const bestJobId: Record<string, string> = {};
  for (const m of topMatches as any[]) {
    if (bestScore[m.candidate_id] === undefined || bestScore[m.candidate_id] < m.overall_score) {
      bestScore[m.candidate_id] = m.overall_score;
      bestJobId[m.candidate_id] = m.job_opening_id;
    }
  }

  // 平均スコア（ご紹介可能候補者）
  const readyCandidates = allCandidatesList.filter((c) => c.status === 'ready_for_placement');
  const avgScore = readyCandidates.length
    ? Math.round(readyCandidates.reduce((s: number, c: any) => s + (c.readiness_score ?? 0), 0) / readyCandidates.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ══════════ HERO ══════════ */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">
        <div className="max-w-screen-xl mx-auto px-6 pt-10 pb-12">

          {/* ロゴ + ナビ */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
            <div>
              <div className="text-2xl font-black tracking-tight">Mediflow</div>
              <div className="text-blue-300 text-xs mt-0.5 font-medium">外国人介護人材 AIマッチング・プラットフォーム</div>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/matches"
                className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors backdrop-blur-sm border border-white/10">
                📊 マッチング結果
              </Link>
              <Link href="/dashboard/academy"
                className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors backdrop-blur-sm border border-white/10">
                🎓 Academy進捗
              </Link>
            </div>
          </div>

          {/* ヒーローコピー */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-400/20 border border-green-400/30 rounded-full px-4 py-1.5 text-green-300 text-sm font-semibold mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              現在 {readyCount}名 がご紹介可能な状態です
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              貴施設に最適な<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                介護人材
              </span>
              と出会う
            </h1>
            <p className="text-blue-200 text-base leading-relaxed max-w-xl">
              AIが{totalCount}名の候補者データを分析し、スキル・日本語力・就労意欲・ 施設との相性をスコアリング。最適な人材を即座にご紹介します。
            </p>
          </div>

          {/* インパクト数値 */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${totalCount}名`,     label: '登録候補者数',         sub: '6ヶ国・多様な資格',         color: 'text-white',     bg: 'bg-white/10' },
              { value: `${readyCount}名`,     label: '今すぐ面接可能',       sub: '平均AIスコア ' + avgScore + '点', color: 'text-green-300', bg: 'bg-green-400/10 border border-green-400/20' },
              { value: `${trainingCount}名`,  label: 'Academy学習中',        sub: 'N3取得へ向けて日々研鑽',   color: 'text-blue-200',  bg: 'bg-blue-400/10' },
              { value: `${placedCount}名`,    label: '採用実績',             sub: '定着率 92%（6ヶ月後）',    color: 'text-purple-300',bg: 'bg-purple-400/10' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 backdrop-blur-sm`}>
                <div className={`text-4xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-white font-semibold text-sm mt-1">{s.label}</div>
                <div className="text-blue-300 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ 候補者一覧 ══════════ */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 space-y-6">

        {/* フィルタータブ */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => {
            const cnt = tab.key === 'all' ? totalCount : (countBy[tab.key] ?? 0);
            const active = statusFilter === tab.key;
            return (
              <Link
                key={tab.key}
                href={tab.key === 'all' ? '/dashboard' : `/dashboard?status=${tab.key}`}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all whitespace-nowrap ${
                  active
                    ? 'bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700 shadow-sm'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {cnt}
                </span>
              </Link>
            );
          })}
        </div>

        {/* グリッド */}
        {candidates.length === 0 ? (
          <div className="text-center py-28 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-medium text-lg">該当する候補者がいません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {(candidates as any[]).map((c, idx) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                index={idx}
                matchScore={bestScore[c.id]}
                bestJobId={bestJobId[c.id]}
              />
            ))}
          </div>
        )}
      </div>

      {/* ══════════ なぜMediflow ══════════ */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white mt-8">
        <div className="max-w-screen-xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2">Mediflowが選ばれる3つの理由</h2>
            <p className="text-blue-300 text-sm">介護施設の採用課題を、AIとデータで解決します</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'AIが30項目を自動評価', desc: 'スキル・日本語力・立地適合・就労意欲・資格をAIがスコアリング。勘に頼らない、データドリブンな採用を実現。' },
              { icon: '🎓', title: '入職前Academy学習', desc: '介護専門日本語・ケアスキルを動画で事前学習。N3レベルの日本語力と介護の基礎を身につけた状態でご紹介。' },
              { icon: '📈', title: '入職後の定着サポート', desc: '1週間・1ヶ月・3ヶ月・6ヶ月後にフォローアップ。マッチング精度を継続改善し、定着率92%を実現。' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="font-bold text-lg mb-2">{item.title}</div>
                <div className="text-blue-200 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 候補者カード（個人情報なし） ─────────────── */
function CandidateCard({
  candidate: c,
  index,
  matchScore,
  bestJobId,
}: {
  candidate: any;
  index: number;
  matchScore?: number;
  bestJobId?: string;
}) {
  const status = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.active;
  const gradient = getGradient(c);
  const quals = getQuals(c);
  const age = ageRange(c.date_of_birth);
  const flag = FLAGS[c.nationality] ?? '🌏';
  const progress = Array.isArray(c.academy_progress) ? c.academy_progress[0] : c.academy_progress;
  const isReady = c.status === 'ready_for_placement';
  const candidateId = `C-${String(index + 1).padStart(3, '0')}`;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
        hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${status.glow} flex flex-col`}
    >
      {/* ── グラデーションヘッダー ── */}
      <div className={`relative bg-gradient-to-br ${gradient} h-32`}>
        {/* ステータスバッジ */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${status.pill} bg-white/90`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot} mr-1`} />
            {status.label}
          </span>
        </div>

        {/* AIスコア */}
        {matchScore !== undefined && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              matchScore >= 80 ? 'bg-green-400 text-green-900' : 'bg-white/25 text-white'
            }`}>
              AI {matchScore}点
            </span>
          </div>
        )}

        {/* アバター（notionists: クリーン・プロフェッショナル） */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(c.id)}
              alt="候補者"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── 情報エリア ── */}
      <div className="pt-12 px-4 pb-4 flex flex-col flex-1 space-y-2.5">

        {/* ID + 国籍 */}
        <div className="text-center">
          <div className="font-black text-gray-800 text-base tracking-wide">{candidateId}</div>
          <div className="text-gray-400 text-xs mt-0.5">
            {flag} {c.nationality}{age ? ` · ${age}` : ''}
          </div>
        </div>

        {/* 資格バッジ */}
        {quals.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {quals.map((q) => (
              <span key={q.label}
                className={`text-[11px] px-2.5 py-0.5 rounded-full border ${q.style}`}>
                {q.label}
              </span>
            ))}
          </div>
        )}

        {/* JLPT + 経験 */}
        <div className="flex items-center justify-between text-xs">
          {c.jlpt_level ? (
            <span className={`font-black px-2.5 py-0.5 rounded-full ${JLPT_STYLE[c.jlpt_level] ?? 'bg-gray-200 text-gray-600'}`}>
              {c.jlpt_level}
            </span>
          ) : (
            <span className="text-gray-300 text-[11px]">JLPT未取得</span>
          )}
          <span className="text-gray-400 text-[11px]">
            🩺 {expRange(c.care_experience_months ?? 0)}
          </span>
        </div>

        {/* Readiness ゲージ */}
        {c.readiness_score > 0 && (
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>準備スコア</span>
              <span className={`font-bold ${c.readiness_score >= 70 ? 'text-green-600' : 'text-blue-500'}`}>
                {c.readiness_score >= 80 ? '★★★' : c.readiness_score >= 60 ? '★★☆' : '★☆☆'}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  c.readiness_score >= 70 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                }`}
                style={{ width: `${c.readiness_score}%` }}
              />
            </div>
          </div>
        )}

        {/* N3進捗（学習中のみ） */}
        {progress && progress.n3_completion_rate > 0 && (
          <div className="bg-blue-50 rounded-xl px-3 py-2.5">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-blue-700 font-semibold">🎓 N3学習進捗</span>
              <span className="text-blue-600 font-bold">{Math.round(progress.n3_completion_rate)}%</span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: `${progress.n3_completion_rate}%` }} />
            </div>
          </div>
        )}

        {/* 入職可能時期 */}
        {c.available_from && (
          <div className="text-[11px] text-gray-400 text-center">
            📅 {new Date(c.available_from).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}〜 入職可能
          </div>
        )}

        {/* CTA */}
        <div className="flex-1" />
        {bestJobId ? (
          <a href={`/proposal/${bestJobId}`} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center text-xs font-bold py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-sm mt-1">
            📄 詳細・面接を依頼する
          </a>
        ) : isReady ? (
          <Link href="/dashboard/matches"
            className="block w-full text-center text-xs font-bold py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors shadow-sm mt-1">
            ✅ ご紹介可能 — 詳細を見る
          </Link>
        ) : null}
      </div>
    </div>
  );
}
