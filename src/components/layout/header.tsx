'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';

interface HeaderProps {
  locale: string;
}

const JpMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(10,27,61,0.15)"/>
    <circle cx="12" cy="12" r="6" fill="#BC002D"/>
  </svg>
);

const VnMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <rect x="1" y="1" width="22" height="22" rx="11" fill="#DA251D"/>
    <path d="M12 6l1.47 4.53H18l-3.76 2.74L15.71 18 12 15.27 8.29 18l1.47-4.73L6 10.53h4.53L12 6z" fill="#FFCD00"/>
  </svg>
);

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [mobileExamOpen, setMobileExamOpen] = useState(false);
  const examDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: `/${locale}/courses`, label: 'コース' },
    { href: `/${locale}#teachers`, label: '講師' },
    { href: `/${locale}#stories`, label: '受講生の声' },
    { href: `/${locale}/pricing`, label: '料金' },
    { href: `/${locale}#faq`, label: 'FAQ' },
  ];

  const examLabel = locale === 'vi' ? 'Đề thi' : '過去問';
  const examItems = [
    {
      group: locale === 'vi' ? 'Đánh giá kỹ năng đặc định' : '特定技能「介護」評価試験',
      items: [
        { href: `/${locale}/exams/tokutei-ginou`, label: locale === 'vi' ? 'Đánh giá kỹ năng điều dưỡng' : '介護技能評価試験' },
        { href: `/${locale}/exams/tokutei-ginou`, label: locale === 'vi' ? 'Đánh giá tiếng Nhật điều dưỡng' : '介護日本語評価試験' },
      ],
    },
    {
      group: locale === 'vi' ? 'Kỳ thi quốc gia Kaigo Fukushishi' : '介護福祉士国家試験',
      items: [
        { href: `/${locale}/exams/kaigo-fukushishi`, label: locale === 'vi' ? 'Luyện tập theo đề' : '過去問演習' },
      ],
    },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(251,249,244,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, padding: '14px 32px',
      }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontWeight: 800, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--primary)',
            color: '#fff', display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-jp-serif)', fontWeight: 900, fontSize: 18,
          }}>医</div>
          <span>Mediflow <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>Academy</span></span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: 'var(--ink-soft)', transition: 'all .2s', textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--ink)'; (e.target as HTMLElement).style.background = 'rgba(10,27,61,0.04)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--ink-soft)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </Link>
          ))}
          {/* 過去問 dropdown */}
          <div
            ref={examDropdownRef}
            style={{ position: 'relative' }}
            onMouseEnter={() => setExamDropdownOpen(true)}
            onMouseLeave={() => setExamDropdownOpen(false)}
          >
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: examDropdownOpen ? 'var(--ink)' : 'var(--ink-soft)',
              background: examDropdownOpen ? 'rgba(10,27,61,0.04)' : 'transparent',
              border: 'none', cursor: 'pointer', transition: 'all .2s',
            }}>
              {examLabel}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#fff', background: '#3b82f6',
                borderRadius: 4, padding: '1px 5px', letterSpacing: '0.05em', marginLeft: 2,
              }}>NEW</span>
              <ChevronDown size={13} style={{ transition: 'transform .2s', transform: examDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {examDropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: 4,
                background: 'var(--white)', border: '1px solid var(--line)',
                borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                minWidth: 240, padding: '8px 0', zIndex: 100,
              }}>
                {examItems.map((group, gi) => (
                  <div key={gi}>
                    {gi > 0 && <div style={{ height: 1, background: 'var(--line)', margin: '6px 12px' }} />}
                    <div style={{ padding: '6px 16px 2px', fontSize: 10, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {group.group}
                    </div>
                    {group.items.map((item, ii) => (
                      <Link key={ii} href={item.href} onClick={() => setExamDropdownOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '9px 16px', fontSize: 13, fontWeight: 500,
                        color: 'var(--ink)', textDecoration: 'none', transition: 'background .15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <FileText size={13} style={{ color: '#3b82f6', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div style={{ height: 1, background: 'var(--line)', margin: '6px 12px' }} />
                <Link href={`/${locale}/exams`} onClick={() => setExamDropdownOpen(false)} style={{
                  display: 'block', padding: '9px 16px', fontSize: 13, fontWeight: 600,
                  color: '#3b82f6', textDecoration: 'none', transition: 'background .15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {locale === 'vi' ? '→ Xem tất cả đề thi' : '→ 過去問トップへ'}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
          {/* Language toggle */}
          <div style={{
            display: 'flex', background: 'rgba(10,27,61,0.05)', padding: 3, borderRadius: 8,
            fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
          }}>
            <Link href="/ja" style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 5, textDecoration: 'none', transition: 'all .2s',
              background: locale === 'ja' ? 'var(--white)' : 'transparent',
              color: locale === 'ja' ? 'var(--ink)' : 'var(--ink-soft)',
              boxShadow: locale === 'ja' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}>
              <JpMark/> 日本語
            </Link>
            <Link href="/vi" style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 5, textDecoration: 'none', transition: 'all .2s',
              background: locale === 'vi' ? 'var(--white)' : 'transparent',
              color: locale === 'vi' ? 'var(--ink)' : 'var(--ink-soft)',
              boxShadow: locale === 'vi' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}>
              <VnMark/> Tiếng Việt
            </Link>
          </div>

          <Link href={`/${locale}/auth/login`} style={{
            fontSize: 14, padding: '9px 16px', fontWeight: 600, color: 'var(--ink)',
            border: '1px solid var(--line-strong)', borderRadius: 8, textDecoration: 'none',
            transition: 'all .2s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--ink)'; el.style.color = 'var(--cream)'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--ink)'; }}
          >
            {t('login')}
          </Link>
          <Link href={`/${locale}/auth/signup`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 16px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            background: 'var(--ink)', color: 'var(--cream)', textDecoration: 'none',
            transition: 'all .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ink)'; }}
          >
            {t('signup')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', padding: 8, color: 'var(--ink-soft)', cursor: 'pointer' }}
          className="show-mobile"
        >
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          borderTop: '1px solid var(--line)', background: 'var(--cream)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 500,
              color: 'var(--ink-soft)', textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
            }}>
              {link.label}
            </Link>
          ))}
          {/* 過去問 accordion */}
          <div style={{ borderBottom: '1px solid var(--line)' }}>
            <button
              onClick={() => setMobileExamOpen(!mobileExamOpen)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '12px 0', fontSize: 15, fontWeight: 500,
                color: 'var(--ink-soft)', background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {examLabel}
                <span style={{
                  fontSize: 9, fontWeight: 700, color: '#fff', background: '#3b82f6',
                  borderRadius: 4, padding: '1px 5px',
                }}>NEW</span>
              </span>
              <ChevronDown size={14} style={{ transform: mobileExamOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }} />
            </button>
            {mobileExamOpen && (
              <div style={{ paddingBottom: 12 }}>
                {examItems.map((group, gi) => (
                  <div key={gi} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 0 2px 12px' }}>
                      {group.group}
                    </div>
                    {group.items.map((item, ii) => (
                      <Link key={ii} href={item.href} onClick={() => setMobileOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 12px', fontSize: 14, fontWeight: 500,
                        color: 'var(--ink)', textDecoration: 'none',
                      }}>
                        <FileText size={13} style={{ color: '#3b82f6', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href={`/${locale}/exams`} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', padding: '8px 12px', fontSize: 14, fontWeight: 600,
                  color: '#3b82f6', textDecoration: 'none',
                }}>
                  {locale === 'vi' ? '→ Xem tất cả đề thi' : '→ 過去問トップへ'}
                </Link>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <Link href="/ja" onClick={() => setMobileOpen(false)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
              background: locale === 'ja' ? 'var(--primary)' : 'rgba(10,27,61,0.05)',
              color: locale === 'ja' ? '#fff' : 'var(--ink-soft)',
            }}>
              <JpMark/> 日本語
            </Link>
            <Link href="/vi" onClick={() => setMobileOpen(false)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none',
              background: locale === 'vi' ? 'var(--primary)' : 'rgba(10,27,61,0.05)',
              color: locale === 'vi' ? '#fff' : 'var(--ink-soft)',
            }}>
              <VnMark/> Tiếng Việt
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <Link href={`/${locale}/auth/login`} onClick={() => setMobileOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12,
              border: '1px solid var(--line-strong)', fontSize: 15, fontWeight: 600,
              color: 'var(--ink)', textDecoration: 'none',
            }}>
              {t('login')}
            </Link>
            <Link href={`/${locale}/auth/signup`} onClick={() => setMobileOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12,
              background: 'var(--ink)', fontSize: 15, fontWeight: 600,
              color: 'var(--cream)', textDecoration: 'none',
            }}>
              {t('signup')}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .hidden-mobile{display:none!important}
          .show-mobile{display:flex!important}
        }
      `}</style>
    </header>
  );
}
