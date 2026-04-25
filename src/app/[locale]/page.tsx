import Link from 'next/link';
import Image from 'next/image';
import FAQAccordion from '@/components/landing/faq-accordion';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  return <LandingContent locale={locale} />;
}

// ── SVG helpers ────────────────────────────────────────────────
function JpMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(10,27,61,0.15)"/>
      <circle cx="12" cy="12" r="6" fill="#BC002D"/>
    </svg>
  );
}
function VnMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="1" y="1" width="22" height="22" rx="11" fill="#DA251D"/>
      <path d="M12 6l1.47 4.53H18l-3.76 2.74L15.71 18 12 15.27 8.29 18l1.47-4.73L6 10.53h4.53L12 6z" fill="#FFCD00"/>
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

// ── Section: Hero ──────────────────────────────────────────────
function Hero({ locale }: { locale: string }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--cream)' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(10,27,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,27,61,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
      }}/>

      <div className="hero-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px 80px', position: 'relative' }}>
        {/* Running header */}
        <div className="hero-header" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
          color: 'var(--ink-soft)', textTransform: 'uppercase',
          paddingBottom: 16, borderBottom: '1px solid var(--line-strong)', marginBottom: 40,
        }}>
          <span>Mediflow Academy · Issue 04 · 2026</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)', display: 'inline-block' }}/>
            Enrolling · 新規受講受付中
          </span>
        </div>

        {/* Two-column layout */}
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'start' }}>

          {/* LEFT — Japanese */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 28,
            }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--primary)', verticalAlign: 'middle' }}/>
              <JpMark size={14}/> Japanese · 日本語
            </div>
            <h1 className="hero-h1" style={{
              fontFamily: 'var(--font-jp)', fontWeight: 900,
              fontSize: 'clamp(52px, 9vw, 88px)', lineHeight: 1.02,
              letterSpacing: '-0.035em', color: 'var(--ink)',
            }}>
              現場で<br/>
              使える<br/>
              <span style={{
                background: 'linear-gradient(180deg,transparent 70%,var(--accent-soft) 70%)',
                paddingRight: 8,
              }}>日本語</span>を。
            </h1>
            <p style={{
              fontFamily: 'var(--font-jp-serif)', fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.8,
              color: 'var(--ink-soft)', marginTop: 32, maxWidth: 440,
            }}>
              看護・介護のプロが監修したカリキュラムで、<br/>
              「伝わる」日本語を身につける。<br/>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>N5 → N1、そして現場へ。</span>
            </p>
          </div>

          {/* RIGHT — Vietnamese */}
          <div className="hero-vn-card" style={{
            background: 'var(--ink)', color: 'var(--cream)',
            borderRadius: 24, padding: '40px 36px', position: 'relative', overflow: 'hidden',
            minHeight: 480,
          }}>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.08,
              backgroundImage: 'radial-gradient(circle at 20% 30%, var(--primary-200) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--accent) 0%, transparent 40%)',
            }}/>
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--accent-soft)', fontWeight: 500, marginBottom: 28,
              }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent-soft)', verticalAlign: 'middle' }}/>
                <VnMark size={14}/> Vietnamese · Tiếng Việt
              </div>
              <h2 style={{
                fontFamily: 'var(--font-vn)', fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1,
                letterSpacing: '-0.025em', color: 'var(--cream)',
              }}>
                Tiếng Nhật<br/>
                cho <span style={{ color: 'var(--accent)' }}>điều dưỡng</span><br/>
                chuyên nghiệp.
              </h2>
              <p style={{
                fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 15, lineHeight: 1.7,
                color: 'rgba(251,249,244,0.75)', marginTop: 28, maxWidth: 360,
              }}>
                Được biên soạn bởi y tá đang làm việc tại Nhật và hộ lý người Việt đạt N1. Học thật — đi làm thật.
              </p>

              {/* Supervisors card */}
              <div style={{
                marginTop: 36, background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 20,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
                  color: 'var(--accent-soft)', textTransform: 'uppercase', marginBottom: 12,
                }}>
                  監修 / Supervised by
                </div>
                {[
                  { name: 'Utsumi Naruya', role: '現役看護師 10年｜病院・介護・訪問看護・ツアーナース', vn: 'Y tá lâm sàng 10 năm' },
                  { name: 'Nguyễn Thị Dung', role: '介護福祉士兼看護師・N1・医療通訳・元EPA', vn: 'Hộ lý kiêm y tá, phiên dịch y tế' },
                  { name: 'Trần Thị Lan', role: 'N1・介護福祉士・日本語教師', vn: 'Giáo viên tiếng Nhật N1' },
                  { name: 'Lê Văn Minh', role: 'N1・介護福祉士・介護施設勤務（現場経験8年）', vn: 'Hộ lý giàu kinh nghiệm thực tế' },
                ].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                    paddingBottom: 8, borderBottom: i < 3 ? '1px dashed rgba(255,255,255,0.12)' : 'none',
                    marginBottom: i < 3 ? 8 : 0,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--cream)' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(251,249,244,0.55)', marginTop: 2 }}>{p.role}</div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 11,
                      color: 'var(--accent-soft)', fontStyle: 'italic', whiteSpace: 'nowrap',
                    }}>{p.vn}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="hero-cta" style={{
          marginTop: 48, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 24, flexWrap: 'wrap',
          paddingTop: 40, borderTop: '1px solid var(--line)',
        }}>
          <div className="hero-cta-btns" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href={`/${locale}/auth/signup`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 24px', borderRadius: 14, fontWeight: 600, fontSize: 15,
              background: 'var(--ink)', color: 'var(--cream)', textDecoration: 'none',
            }}>
              無料で始める · Bắt đầu<ArrowIcon/>
            </Link>
            <Link href={`/${locale}/courses`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 24px', borderRadius: 14, fontWeight: 600, fontSize: 15,
              border: '1px solid var(--line-strong)', color: 'var(--ink)', textDecoration: 'none',
            }}>
              コースを見る
            </Link>
          </div>
          <div className="hero-stats" style={{ display: 'flex', gap: 32, fontSize: 13, color: 'var(--ink-soft)' }}>
            {[
              { num: '1,247', unit: '名', label: '学習者数' },
              { num: '85', unit: '%', label: 'JLPT合格率' },
              { num: 'N5–N1', unit: '', label: '全レベル対応' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-jp-serif)', fontWeight: 700,
                  fontSize: 'clamp(18px,3vw,24px)',
                  color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.01em',
                }}>
                  {s.num}<span style={{ fontSize: 13, marginLeft: 2 }}>{s.unit}</span>
                </div>
                <div style={{
                  fontSize: 10, color: 'var(--ink-faint)', marginTop: 4,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Trust bar ─────────────────────────────────────────
function TrustBar() {
  return (
    <div style={{
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      background: 'rgba(255,255,255,0.5)',
    }}>
      <div className="trust-inner" style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '18px 32px', flexWrap: 'wrap',
        fontSize: 13, color: 'var(--ink-soft)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            {['#FFE1D9','#DBE5FF','#E4FBF5','#F3EFE6'].map((bg, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: '50%', background: bg,
                border: '2px solid var(--cream)', marginLeft: i === 0 ? 0 : -8,
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-jp-serif)', fontSize: 11, fontWeight: 700, color: 'var(--ink)',
              }}>
                {['L','M','H','T'][i]}
              </div>
            ))}
          </div>
          <span><strong style={{ color: 'var(--ink)' }}>1,247名</strong> が今月学習中</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', color: 'var(--coral)' }}>
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span><strong style={{ color: 'var(--ink)' }}>4.9</strong> / 受講生満足度</span>
        </div>
        <div className="trust-online" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
          </svg>
          <span>ベトナム → 日本就労 <strong style={{ color: 'var(--ink)' }}>オンライン完結</strong></span>
        </div>
        <div className="trust-iso" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--primary)' }}>ISO 29993</span>
          <span>学習品質ガイドライン準拠</span>
        </div>
      </div>
    </div>
  );
}

// ── Section: Features ──────────────────────────────────────────
function Features() {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v7a5 5 0 0 0 10 0V3M4 3h4M14 3h4"/><circle cx="18" cy="17" r="3"/><path d="M11 15v-1.5"/>
        </svg>
      ),
      ja: '現場の言葉を、現場の人から',
      vi: 'Từ người thật, ngữ thật',
      body: '病棟・施設で実際に使われる表現を、現役看護師と介護福祉士が直接教えます。教科書的な日本語ではなく「明日使える」言葉を。',
      tag: 'LIVE & REAL',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      ja: 'ベトナム語で、深く理解',
      vi: 'Giải thích bằng tiếng Việt',
      body: 'すべての教材・解説に日本語とベトナム語の対訳。母語で理解してから、日本語で覚える。迷子にならない設計。',
      tag: 'BILINGUAL',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      ja: 'AI家庭教師が24時間',
      vi: 'Gia sư AI 24/7',
      body: '質問はいつでもAIに。発音チェック、敬語の添削、ロールプレイ練習。待ち時間ゼロで学習が止まらない。',
      tag: 'AI POWERED',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 5.5V19.5"/>
        </svg>
      ),
      ja: 'N5から就労日本語まで',
      vi: 'Từ N5 đến tiếng Nhật công sở',
      body: 'ひらがなからスタートし、介護技術試験、EPA、特定技能まで。あなたのゴールに合わせた最短ルート。',
      tag: 'END-TO-END',
    },
  ];

  return (
    <section className="sp" style={{ padding: '120px 0', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="feat-hdr" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'end', marginBottom: 64 }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 18,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }}/>
              Why Mediflow
            </div>
            <h2 className="sec-h2" style={{
              fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800, marginTop: 0,
            }}>
              他の日本語スクールとは、<br/>違う場所を<br/>見ています。
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              私たちは「試験に受かる」ゴールではなく、
              <strong style={{ color: 'var(--ink)' }}>日本の医療・介護現場で、あなたが輝く</strong>ことをゴールに設計しています。だから教えるのは、現場の人。
              <span style={{
                fontFamily: 'var(--font-vn)', fontWeight: 400, color: 'var(--primary)',
                fontStyle: 'italic', display: 'block', marginTop: 12,
              }}>
                Mục tiêu không phải là thi đậu, mà là bạn toả sáng tại Nhật.
              </span>
            </p>
          </div>
        </div>

        <div className="feat-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
          gap: 2, background: 'var(--line)', border: '1px solid var(--line)',
          borderRadius: 24, overflow: 'hidden',
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              background: 'var(--cream)', padding: '40px 36px',
              display: 'flex', flexDirection: 'column', gap: 16, minHeight: 240,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: 'var(--ink)', color: 'var(--cream)',
                  display: 'grid', placeItems: 'center',
                }}>{it.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
                  color: 'var(--primary)', background: 'var(--primary-50)',
                  padding: '4px 8px', borderRadius: 6,
                }}>{it.tag}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 'clamp(17px,2vw,22px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{it.ja}</h3>
                <div style={{
                  fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 13,
                  color: 'var(--primary)', fontStyle: 'italic', marginTop: 4,
                }}>{it.vi}</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', marginTop: 'auto' }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Teachers ──────────────────────────────────────────
function Teachers() {
  const team = [
    {
      name: 'Utsumi Naruya',
      nameJa: '内海 成哉',
      role: '現役看護師',
      detail: '看護師歴10年｜病院・介護施設・訪問看護・訪問入浴・ツアーナース',
      vi: 'Y tá lâm sàng 10 năm kinh nghiệm',
      photo: '/images/nurse.png',
      tags: ['RN', '10年'],
    },
    {
      name: 'Nguyễn Thị Dung',
      nameJa: 'グエン・ティ・ズン',
      role: '介護福祉士 兼 看護師 · 医療通訳',
      detail: 'N1取得 · 元EPA · 日越医療通訳として現場に立つ',
      vi: 'Hộ lý kiêm y tá · Phiên dịch y tế Nhật-Việt',
      photo: '/images/interpreter.jpg',
      tags: ['N1', 'EPA', '通訳'],
    },
    {
      name: 'Trần Thị Lan',
      nameJa: 'チャン・ティ・ラン',
      role: '介護福祉士 · 日本語教師',
      detail: 'N1取得 · 介護施設で勤務しながら、ベトナム人後輩に日本語を教える',
      vi: 'Hộ lý N1 · Giáo viên tiếng Nhật cho người Việt',
      photo: null,
      tags: ['N1', '日本語教師'],
      color: '#E4FBF5',
      init: 'L',
    },
    {
      name: 'Lê Văn Minh',
      nameJa: 'レ・バン・ミン',
      role: '介護福祉士',
      detail: 'N1取得 · 介護施設で8年勤務 · 認知症ケア・看取りに精通',
      vi: 'Hộ lý N1 · 8 năm kinh nghiệm thực tế tại cơ sở chăm sóc',
      photo: null,
      tags: ['N1', '8年'],
      color: '#F3EFE6',
      init: 'M',
    },
  ];

  return (
    <section id="teachers" className="sp" style={{ padding: '120px 0', background: 'var(--ink)', color: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(19,200,168,0.15) 0%, transparent 60%)',
        filter: 'blur(40px)',
      }}/>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--accent-soft)', fontWeight: 500, marginBottom: 18,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent-soft)', display: 'inline-block' }}/>
            Supervised by · 監修者
          </div>
          <h2 className="sec-h2" style={{
            fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800,
            color: 'var(--cream)', margin: '18px 0 16px',
          }}>
            肩書きではなく、<br/>
            <span style={{ color: 'var(--accent)' }}>現場での時間</span>で選ばれた人たち。
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.65, color: 'rgba(251,249,244,0.7)' }}>
            全員が、日本の医療・介護現場で<strong style={{ color: 'var(--cream)' }}>今も働く</strong>プロ。もしくは、ベトナムから来日し、N1を取り、この現場を生き抜いた人たち。
          </p>
        </div>

        <div className="tchr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {team.map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20, padding: 24,
            }}>
              {/* Photo or initial */}
              <div style={{
                aspectRatio: '1', borderRadius: 14, overflow: 'hidden',
                marginBottom: 18, position: 'relative',
                background: m.photo ? '#111' : (m.color || '#DBE5FF'),
                display: 'grid', placeItems: 'center',
              }}>
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-jp-serif)', fontSize: 'clamp(40px,6vw,64px)',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{m.init}</span>
                )}
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
                  background: 'rgba(10,27,61,0.55)', color: '#fff',
                  padding: '4px 8px', borderRadius: 6, backdropFilter: 'blur(4px)',
                }}>#{String(i + 1).padStart(2, '0')}</div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {m.tags.map((tag, t) => (
                  <span key={t} style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                    padding: '3px 7px', borderRadius: 5,
                    background: 'rgba(19,200,168,0.15)', color: 'var(--accent)',
                    border: '1px solid rgba(19,200,168,0.25)',
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--cream)' }}>{m.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(251,249,244,0.45)', marginTop: 2 }}>{m.nameJa}</div>
              <div style={{ fontSize: 13, color: 'var(--accent-soft)', marginTop: 6 }}>{m.role}</div>
              <div style={{ fontSize: 12, color: 'rgba(251,249,244,0.55)', marginTop: 6, lineHeight: 1.6 }}>{m.detail}</div>
              <div style={{
                fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 11,
                color: 'rgba(251,249,244,0.4)',
                fontStyle: 'italic', marginTop: 8, paddingTop: 10,
                borderTop: '1px dashed rgba(255,255,255,0.1)',
              }}>{m.vi}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Course Map ────────────────────────────────────────
function CourseMap({ locale }: { locale: string }) {
  const rows = [
    { level: 'N5', ja: 'はじめての日本語', vi: 'Tiếng Nhật cơ bản', weeks: '0–8週', hours: 120, color: 'var(--sand)' },
    { level: 'N4', ja: '日常会話と基礎文法', vi: 'Giao tiếp hàng ngày', weeks: '8–16週', hours: 140, color: 'var(--rose)' },
    { level: 'N3', ja: '医療日本語・入門', vi: 'Nhập môn y tế', weeks: '16–28週', hours: 180, color: 'var(--accent-soft)' },
    { level: 'N2', ja: '介護現場の日本語', vi: 'Tiếng Nhật chăm sóc', weeks: '28–40週', hours: 220, color: 'var(--primary-200)' },
    { level: 'N1', ja: '専門日本語と就労', vi: 'Chuyên sâu & đi làm', weeks: '40–52週', hours: 240, color: 'var(--coral)' },
  ];

  return (
    <section className="sp" style={{ padding: '120px 0', background: 'var(--cream)' }}>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 18,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }}/>
            Course Map · 学習ロードマップ
          </div>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800, margin: '18px 0 16px' }}>
            52週間、N5から現場まで。
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
            標準ルートで約1年。自分のペースで伸縮OK。
          </p>
        </div>

        <div style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden' }}>
          <style>{`
            .course-row:hover{background:var(--primary-50)!important}
            .cm-vi,.cm-weeks,.cm-hours{display:table-cell}
            @media(max-width:600px){
              .cm-hdr{display:none!important}
              .course-row{grid-template-columns:56px 1fr 36px!important;padding:16px!important}
              .cm-vi,.cm-weeks,.cm-hours{display:none!important}
            }
          `}</style>
          <div className="cm-hdr" style={{
            display: 'grid', gridTemplateColumns: '80px 1.5fr 1fr 120px 120px 60px',
            padding: '16px 28px', background: 'var(--cream-2)',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
            color: 'var(--ink-soft)', textTransform: 'uppercase',
          }}>
            <div>LEVEL</div><div>コース内容</div><div>VI</div><div>期間</div><div>学習時間</div><div/>
          </div>
          {rows.map((r, i) => (
            <Link key={i} href={`/${locale}/courses`} className="course-row" style={{
              display: 'grid', gridTemplateColumns: '80px 1.5fr 1fr 120px 120px 60px',
              padding: '22px 28px', borderTop: '1px solid var(--line)', alignItems: 'center',
              textDecoration: 'none', color: 'inherit', transition: 'background .2s',
            }}>
              <div>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: r.color,
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-jp-serif)', fontWeight: 800, fontSize: 18, color: 'var(--ink)',
                }}>{r.level}</div>
              </div>
              <div style={{ fontSize: 'clamp(14px,1.8vw,17px)', fontWeight: 600 }}>{r.ja}</div>
              <div className="cm-vi" style={{
                fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 13,
                color: 'var(--primary)', fontStyle: 'italic',
              }}>{r.vi}</div>
              <div className="cm-weeks" style={{ fontSize: 13, color: 'var(--ink-soft)', fontVariantNumeric: 'tabular-nums' }}>{r.weeks}</div>
              <div className="cm-hours" style={{ fontSize: 13, color: 'var(--ink-soft)', fontVariantNumeric: 'tabular-nums' }}>{r.hours}h</div>
              <div style={{ textAlign: 'right', color: 'var(--ink-faint)' }}>
                <ArrowIcon/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Stories ───────────────────────────────────────────
function Stories() {
  const stories = [
    {
      name: 'Linh', age: 26, city: '神戸', role: '介護福祉士',
      quote: '母と電話で泣きながら勉強した日もあったけど、今は現場で笑っていられる。',
      before: 'ハノイ/看護学生', after: '神戸/介護施設',
    },
    {
      name: 'Minh', age: 24, city: '東京', role: 'EPA看護師候補',
      quote: '病棟で患者さんの不安を聞けたとき、日本語を学んだ意味が初めてわかった。',
      before: 'ダナン/EPA合格', after: '東京/病棟勤務',
    },
    {
      name: 'Thảo', age: 28, city: '大阪', role: '介護施設リーダー',
      quote: '後輩を指導できるほどになれたのは、日本の先輩たちに教わった言葉のおかげ。',
      before: 'フエ/日本語教室', after: '大阪/チーフ',
    },
  ];

  return (
    <section id="stories" className="sp" style={{
      padding: '120px 0', background: 'var(--cream-2)',
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
    }}>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 18,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }}/>
            Stories · 受講生の物語
          </div>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800, margin: '18px 0 16px' }}>
            1,247の<br/>ジャーニー。
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
            私たちの教材は、卒業生の一人ひとりの言葉で、今も書き換わっています。
          </p>
        </div>

        <div className="str-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {stories.map((s, i) => (
            <div key={i} style={{
              background: 'var(--cream)', borderRadius: 20, padding: 28,
              border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: ['#FFE1D9','#DBE5FF','#E4FBF5'][i],
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-jp-serif)', fontSize: 18, fontWeight: 700, color: 'var(--ink)',
                }}>{s.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{s.age}歳 · {s.city} · {s.role}</div>
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-jp-serif)', fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.6,
                color: 'var(--ink)', fontWeight: 500, letterSpacing: '-0.005em',
              }}>
                「{s.quote}」
              </div>
              <div style={{
                marginTop: 'auto', paddingTop: 16, borderTop: '1px dashed var(--line)',
                display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-soft)',
                flexWrap: 'wrap',
              }}>
                <span>{s.before}</span>
                <ArrowIcon/>
                <strong style={{ color: 'var(--primary)' }}>{s.after}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Pricing ───────────────────────────────────────────
function Pricing({ locale }: { locale: string }) {
  const plans = [
    {
      name: 'Free', vi: 'Miễn phí', price: '¥0', period: 'ずっと',
      trial: null,
      features: ['N5–N1全コース閲覧', 'AI家庭教師 5回/日', 'コミュニティ参加'],
      cta: '無料で始める', href: `/${locale}/auth/signup`, primary: false, key: 'free',
    },
    {
      name: 'Basic', vi: 'Cơ bản', price: '¥980', period: '/月',
      trial: '7日間無料',
      features: ['全教材ダウンロード', 'AI家庭教師 無制限', '介護の専門日本語', 'キャリア相談'],
      cta: '7日間 無料で試す', href: `/${locale}/pricing`, primary: true, tag: '人気', key: 'basic',
    },
    {
      name: 'Pro', vi: 'Chuyên nghiệp', price: '¥1,980', period: '/月',
      trial: '7日間無料',
      features: ['Basicの全機能', '週1回のプロ講師1on1', '履歴書・面接サポート', '日本企業とのマッチング', 'ビザ・渡航サポート'],
      cta: '7日間 無料で試す', href: `/${locale}/pricing`, primary: false, key: 'pro',
    },
  ];

  return (
    <section id="pricing" className="sp" style={{ padding: '120px 0', background: 'var(--cream)' }}>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: 720 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 18,
            justifyContent: 'center',
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }}/>
            Pricing · 料金
          </div>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800, margin: '18px 0 16px' }}>
            学びは、無料から。
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
            N5〜N1のすべてのコースは、ずっと無料で公開されています。<br/>
            有料プランは<strong style={{ color: 'var(--primary)' }}>7日間無料トライアル</strong>でお試しいただけます。
          </p>
        </div>

        <div className="pri-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {plans.map((p) => (
            <div key={p.key} className={p.primary ? 'pri-card pri-elevated' : 'pri-card'} style={{
              background: p.primary ? 'var(--ink)' : 'var(--white)',
              color: p.primary ? 'var(--cream)' : 'var(--ink)',
              borderRadius: 24, padding: 32,
              border: p.primary ? 'none' : '1px solid var(--line)',
              position: 'relative', display: 'flex', flexDirection: 'column', gap: 20,
              boxShadow: p.primary ? '0 40px 80px -40px rgba(10,27,61,0.4)' : 'none',
              transform: p.primary ? 'translateY(-8px)' : 'none',
            }}>
              {p.tag && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'var(--accent)', color: 'var(--ink)',
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
                }}>{p.tag}</div>
              )}
              {p.trial && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: p.primary ? 'rgba(19,200,168,0.2)' : 'var(--accent-50)',
                  color: p.primary ? 'var(--accent-soft)' : '#0aa088',
                  padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', width: 'fit-content',
                }}>
                  ★ {p.trial}
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{p.name}</div>
                <div style={{
                  fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 12, fontStyle: 'italic',
                  color: p.primary ? 'var(--accent-soft)' : 'var(--primary)', marginTop: 2,
                }}>{p.vi}</div>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-en-serif)', fontSize: 'clamp(40px,6vw,56px)',
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>{p.price}</span>
                <span style={{
                  fontSize: 13, marginLeft: 6,
                  color: p.primary ? 'rgba(251,249,244,0.6)' : 'var(--ink-faint)',
                }}>{p.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ color: p.primary ? 'var(--accent)' : 'var(--primary)', marginTop: 2, flexShrink: 0 }}>
                      <CheckIcon/>
                    </div>
                    <span style={{
                      color: p.primary ? 'rgba(251,249,244,0.85)' : 'var(--ink-soft)',
                      lineHeight: 1.5,
                    }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href={p.href} style={{
                marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14,
                background: p.primary ? 'var(--accent)' : 'transparent',
                color: p.primary ? 'var(--ink)' : 'var(--ink)',
                border: p.primary ? 'none' : '1px solid var(--line-strong)',
                textDecoration: 'none', transition: 'all .2s',
              }}>
                {p.cta} <ArrowIcon/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: FAQ ───────────────────────────────────────────────
function FAQSection() {
  return (
    <section id="faq" className="sp" style={{ padding: '120px 0', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
      <div className="si" style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500, marginBottom: 18,
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }}/>
            FAQ · よくある質問
          </div>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800, margin: '18px 0 0' }}>
            迷ったら、読んでみて。
          </h2>
        </div>
        <FAQAccordion/>
      </div>
    </section>
  );
}

// ── Section: Final CTA ─────────────────────────────────────────
function FinalCTA({ locale }: { locale: string }) {
  return (
    <section className="sp" style={{ padding: '120px 0', background: 'var(--ink)', color: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', width: 800, height: 800,
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(19,200,168,0.2) 0%, transparent 60%)',
        filter: 'blur(40px)',
      }}/>
      <div className="si" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--accent-soft)', fontWeight: 500, marginBottom: 24,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent-soft)', display: 'inline-block' }}/>
          あなたの番です · Đến lượt bạn
        </div>
        <h2 style={{
          fontFamily: 'var(--font-jp)', fontWeight: 900,
          fontSize: 'clamp(36px, 7vw, 96px)',
          lineHeight: 1.05, letterSpacing: '-0.035em',
          margin: '0 auto 20px', color: 'var(--cream)',
        }}>
          次の物語を、<br/>
          <span style={{ color: 'var(--accent)' }}>今日</span>はじめよう。
        </h2>
        <p style={{
          fontFamily: 'var(--font-vn)', fontWeight: 400, fontSize: 'clamp(16px,2.5vw,20px)',
          fontStyle: 'italic', color: 'rgba(251,249,244,0.7)', marginBottom: 40,
        }}>
          Câu chuyện tiếp theo bắt đầu từ hôm nay.
        </p>
        <div className="cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${locale}/auth/signup`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 28px', borderRadius: 14, fontWeight: 600, fontSize: 16,
            background: 'var(--accent)', color: 'var(--ink)', textDecoration: 'none',
          }}>
            無料で始める <ArrowIcon/>
          </Link>
          <Link href={`/${locale}/courses`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 28px', borderRadius: 14, fontWeight: 600, fontSize: 16,
            border: '1px solid rgba(255,255,255,0.2)', color: 'var(--cream)', textDecoration: 'none',
          }}>
            コースを見る
          </Link>
        </div>
        <div style={{
          marginTop: 32, fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.1em', color: 'rgba(251,249,244,0.4)',
        }}>
          ✓ CARD FREE &nbsp; ✓ 1-MINUTE SIGNUP &nbsp; ✓ VI / JA SUPPORTED
        </div>
      </div>
    </section>
  );
}

// ── Main landing content ───────────────────────────────────────
function LandingContent({ locale }: { locale: string }) {
  return (
    <div>
      <style>{`
        /* ── ベトナム語フォント統一 ─────────────────────────
           Be Vietnam Pro: 常に weight 明示。
           fontStyle italic は装飾のみ、weight は親から継承させない。       */
        [style*="--font-vn"] { font-synthesis: none; }

        /* ── モバイル共通 ──────────────────────────────────── */
        @media (max-width: 768px) {
          /* セクション padding */
          .sp { padding: 64px 0 !important; }
          .si { padding: 0 20px !important; }

          /* Hero */
          .hero-wrap { padding: 32px 20px 56px !important; }
          .hero-header { display: none !important; }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-vn-card { min-height: unset !important; padding: 28px 24px !important; }
          .hero-cta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
          .hero-cta-btns { width: 100%; }
          .hero-cta-btns a { width: 100% !important; justify-content: center; }
          .hero-stats { gap: 20px !important; }

          /* TrustBar */
          .trust-inner { gap: 12px 24px !important; padding: 16px 20px !important; }
          .trust-iso { display: none !important; }

          /* Features */
          .feat-hdr {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 32px !important;
          }
          .feat-grid { grid-template-columns: 1fr !important; }

          /* Teachers */
          .tchr-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* Stories */
          .str-grid { grid-template-columns: 1fr !important; }

          /* Pricing */
          .pri-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            margin: 0 auto !important;
          }
          .pri-elevated { transform: none !important; box-shadow: 0 20px 40px -20px rgba(10,27,61,0.35) !important; }

          /* CTA buttons */
          .cta-btns { flex-direction: column !important; align-items: center !important; }
          .cta-btns a { width: 100% !important; max-width: 320px; justify-content: center; }
        }

        @media (max-width: 480px) {
          .tchr-grid { grid-template-columns: 1fr !important; }
          .hero-stats { flex-wrap: wrap !important; gap: 16px !important; }
          .pri-grid { max-width: 100% !important; }
        }
      `}</style>
      <Hero locale={locale}/>
      <TrustBar/>
      <Features/>
      <Teachers/>
      <CourseMap locale={locale}/>
      <Stories/>
      <Pricing locale={locale}/>
      <FAQSection/>
      <FinalCTA locale={locale}/>
    </div>
  );
}
