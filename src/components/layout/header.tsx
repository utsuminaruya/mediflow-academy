'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, FileText, MessageSquare } from 'lucide-react';

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

  const navLinks = [
    { href: `/${locale}/courses`, label: locale === 'vi' ? 'Khóa học' : 'コース' },
    { href: `/${locale}/pricing`, label: locale === 'vi' ? 'Giá' : '料金' },
    { href: `/${locale}#faq`, label: 'FAQ' },
  ];

  const examLabel = locale === 'vi' ? 'Đề thi' : '過去問';

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
          {/* AIロールプレイ（準備中） */}
          <span title={locale === 'vi' ? 'Sắp ra mắt' : 'まもなく開設'} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            color: 'rgba(139,92,246,0.55)', cursor: 'default', userSelect: 'none',
          }}>
            <MessageSquare size={14} style={{ color: 'rgba(139,92,246,0.5)' }} />
            {locale === 'vi' ? 'Luyện hội thoại' : 'AIロールプレイ'}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 4, padding: '1px 5px', letterSpacing: '0.05em',
            }}>{locale === 'vi' ? 'Sắp ra mắt' : '準備中'}</span>
          </span>
          {/* 過去問（準備中） */}
          <span title={locale === 'vi' ? 'Sắp ra mắt' : 'まもなく開設'} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            color: 'rgba(59,130,246,0.5)', cursor: 'default', userSelect: 'none',
          }}>
            <FileText size={13} style={{ color: 'rgba(59,130,246,0.45)' }} />
            {examLabel}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#3b82f6', background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 4, padding: '1px 5px', letterSpacing: '0.05em', marginLeft: 2,
            }}>{locale === 'vi' ? 'Sắp ra mắt' : '準備中'}</span>
          </span>
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
          {/* AIロールプレイ（準備中） */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 0', fontSize: 15, fontWeight: 500,
            color: 'rgba(139,92,246,0.5)',
            borderBottom: '1px solid var(--line)',
          }}>
            <MessageSquare size={15} style={{ color: 'rgba(139,92,246,0.45)' }} />
            {locale === 'vi' ? 'Luyện hội thoại AI' : 'AIロールプレイ'}
            <span style={{
              fontSize: 9, fontWeight: 700, color: '#8b5cf6',
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 4, padding: '1px 5px',
            }}>{locale === 'vi' ? 'Sắp ra mắt' : '準備中'}</span>
          </div>
          {/* 過去問（準備中） */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 0', fontSize: 15, fontWeight: 500,
            color: 'rgba(59,130,246,0.5)',
            borderBottom: '1px solid var(--line)',
          }}>
            <FileText size={15} style={{ color: 'rgba(59,130,246,0.45)' }} />
            {examLabel}
            <span style={{
              fontSize: 9, fontWeight: 700, color: '#3b82f6',
              background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 4, padding: '1px 5px',
            }}>{locale === 'vi' ? 'Sắp ra mắt' : '準備中'}</span>
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
