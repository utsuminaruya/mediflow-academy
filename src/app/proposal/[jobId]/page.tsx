import { createServerClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';

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

function calcAge(dob: string | null): string {
  if (!dob) return '';
  const diff = Date.now() - new Date(dob).getTime();
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return `${age}歳`;
}

function ScoreRing({ score }: { score: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(score, 100) / 100) * circ;
  const color = score >= 70 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
  return (
    <div className="relative inline-flex items-center justify-center w-24 h-24">
      <svg width="96" height="96" className="-rotate-90 absolute inset-0">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="relative flex flex-col items-center leading-none">
        <span className="text-2xl font-black" style={{ color }}>{score}</span>
        <span className="text-[10px] text-gray-400 font-medium mt-0.5">/ 100点</span>
      </div>
    </div>
  );
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

async function getData(jobId: string) {
  const supabase = createServerClient();
  const [{ data: job }, { data: matches }] = await Promise.all([
    supabase.from('job_openings').select('*').eq('id', jobId).single(),
    supabase
      .from('matches')
      .select('*, candidate:candidates(*, academy_progress(*))')
      .eq('job_opening_id', jobId)
      .gte('overall_score', 40)
      .order('overall_score', { ascending: false })
      .limit(6),
  ]);
  return job ? { job, matches: matches ?? [] } : null;
}

export default async function ProposalPage({ params }: { params: { jobId: string } }) {
  const data = await getData(params.jobId);
  if (!data) notFound();
  const { job, matches } = data;

  const avgScore = matches.length
    ? Math.round(matches.reduce((s, m) => s + m.overall_score, 0) / matches.length)
    : 0;

  const earliestAvailable = matches
    .map((m) => {
      const c = m.candidate as any;
      return c?.available_from ? new Date(c.available_from) : null;
    })
    .filter(Boolean)
    .sort((a, b) => a!.getTime() - b!.getTime())[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4 font-medium tracking-wide uppercase">
            <span className="inline-block w-5 h-0.5 bg-blue-300" />
            Mediflow AI マッチングレポート
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">
            {job.facility_name}<span className="text-blue-200">様</span><br />
            <span className="text-blue-100">へのご提案候補者</span>
          </h1>
          <p className="text-blue-200 text-sm mt-2">{job.facility_type} ／ {job.facility_address}</p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: 'マッチング候補', value: `${matches.length}名`, icon: '👥' },
              { label: '平均マッチスコア', value: `${avgScore}点`, icon: '🎯' },
              { label: '最短入職', value: earliestAvailable ? `${earliestAvailable.getFullYear()}/${earliestAvailable.getMonth()+1}/${earliestAvailable.getDate()}` : '要相談', icon: '📅' },
              { label: '求人ポジション', value: `${job.positions_available ?? 1}名募集`, icon: '🏥' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 min-w-[140px]">
                <div className="text-lg">{s.icon}</div>
                <div className="text-2xl font-black mt-1">{s.value}</div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CANDIDATE CARDS ===== */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">AIが選んだ候補者</h2>
          <button
            onClick={undefined}
            className="text-sm text-blue-600 hover:underline print:hidden"
            id="printBtn"
          >
            🖨️ 印刷 / PDF保存
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matches.map((m, idx) => {
            const c = m.candidate as any;
            const p = c?.academy_progress;
            const flag = FLAGS[c?.nationality] ?? '🌏';
            const age = calcAge(c?.date_of_birth);
            const quals: string[] = [];
            if (c?.has_kaigofukushishi) quals.push('介護福祉士');
            if (c?.has_jitsumusya_kensyu) quals.push('実務者研修');
            if (c?.has_shoninsha_kensyu) quals.push('初任者研修');

            const expYears = c?.care_experience_months
              ? c.care_experience_months >= 12
                ? `介護経験 ${Math.floor(c.care_experience_months / 12)}年${c.care_experience_months % 12 ? (c.care_experience_months % 12) + 'ヶ月' : ''}`
                : `介護経験 ${c.care_experience_months}ヶ月`
              : null;

            const isReady = c?.status === 'ready_for_placement';
            const deliveryLabel = isReady
              ? '即戦力'
              : m.delivery_plan?.includes('Academy')
              ? m.delivery_plan
              : 'Academy修了後';

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Card header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar circle */}
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0 border-2 border-white shadow">
                      {flag}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-base leading-tight truncate">
                        {c?.full_name}
                        {age && <span className="text-gray-400 font-normal text-sm ml-2">{age}</span>}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">{c?.nationality}</div>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {c?.jlpt_level && (
                          <span className={`text-xs font-black px-2 py-0.5 rounded-full ${JLPT_STYLE[c.jlpt_level] ?? 'bg-gray-200 text-gray-700'}`}>
                            日本語 {c.jlpt_level}
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                            isReady
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {deliveryLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ScoreRing score={m.overall_score} />
                </div>

                {/* Card body */}
                <div className="px-5 py-4 space-y-3">
                  {/* Qualifications */}
                  {quals.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {quals.map((q) => (
                        <span key={q} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium border border-indigo-100">
                          ✓ {q}
                        </span>
                      ))}
                    </div>
                  )}

                  {expYears && (
                    <div className="text-sm text-gray-600 flex items-center gap-1.5">
                      <span className="text-gray-400">🩺</span> {expYears}
                    </div>
                  )}

                  {/* Score breakdown */}
                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: 'スキル適合', val: m.skill_score, color: 'bg-blue-500' },
                      { label: '勤務地適合', val: m.location_score, color: 'bg-purple-500' },
                      { label: '準備度', val: m.readiness_score, color: 'bg-green-500' },
                    ].map(({ label, val, color }) =>
                      val != null ? (
                        <div key={label} className="flex items-center gap-2">
                          <span className="text-gray-400 w-20 flex-shrink-0">{label}</span>
                          <MiniBar value={val} color={color} />
                          <span className="text-gray-600 w-8 text-right font-medium">{val}点</span>
                        </div>
                      ) : null
                    )}
                  </div>

                  {/* Academy progress */}
                  {p && (
                    <div className="bg-blue-50 rounded-lg px-3 py-2 text-xs space-y-1">
                      <div className="text-blue-700 font-semibold mb-1.5">Academy 学習進捗</div>
                      {[
                        { label: 'N5', val: p.n5_completion_rate ?? 0, color: 'bg-orange-400' },
                        { label: 'N4', val: p.n4_completion_rate ?? 0, color: 'bg-blue-400' },
                        { label: 'N3', val: p.n3_completion_rate ?? 0, color: 'bg-green-500' },
                      ].map(({ label, val, color }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="text-gray-500 w-5">{label}</span>
                          <MiniBar value={val} color={color} />
                          <span className="text-gray-600 w-8 text-right">{val}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Available from */}
                  {c?.available_from && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>📅</span>
                      入職可能日: {new Date(c.available_from).toLocaleDateString('ja-JP')}
                    </div>
                  )}
                </div>

                {/* Rank badge */}
                <div className="absolute" style={{ display: idx < 3 ? 'block' : 'none' }}>
                  {idx === 0 && <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow">TOP</div>}
                </div>
              </div>
            );
          })}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>現在マッチング候補がいません。</p>
          </div>
        )}
      </div>

      {/* ===== WHY MEDIFLOW ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Mediflowが選ばれる理由</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                title: 'AIマッチング',
                desc: '30項目以上のデータをAIが分析。スキル・立地・就労意欲・準備度を総合評価し、最適な候補者を提示します。',
              },
              {
                icon: '🎓',
                title: 'Academy学習',
                desc: '入職前から介護日本語・専門用語・ケアスキルを動画学習。N3相当の日本語力と介護基礎知識を身につけた状態でご紹介します。',
              },
              {
                icon: '🤝',
                title: '入職後サポート',
                desc: '1週間・1ヶ月・3ヶ月・6ヶ月後にフォローアップ。定着率向上のためマッチング精度を継続的に改善します。',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-blue-50">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-gray-800 mb-2">{item.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="max-w-5xl mx-auto px-6 py-14 text-center print:hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">この候補者に会いませんか？</h2>
        <p className="text-gray-500 mb-8 text-sm">
          ご希望の候補者への面接設定・詳細資料の提供は無料です。<br />
          担当者より2営業日以内にご連絡いたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {job.contact_email && (
            <a
              href={`mailto:${job.contact_email}?subject=【Mediflow】候補者面接のご依頼&body=貴施設名: ${job.facility_name}%0A面接希望候補者: %0Aご希望日程: `}
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              📧 メールで問い合わせる
            </a>
          )}
          <a
            href="https://lin.ee/R3ytJln"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            💬 LINEで相談する
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-6 text-center text-xs text-gray-400">
        <p className="font-semibold text-gray-500 mb-1">Mediflow</p>
        <p>AIマッチング × Academy × 即戦力納品 — 外国人介護人材のトータルソリューション</p>
        <p className="mt-1">本資料は{job.facility_name}様専用です。第三者への転送はご遠慮ください。</p>
      </div>

      {/* Print button script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('printBtn')?.addEventListener('click', () => window.print())`,
        }}
      />
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
