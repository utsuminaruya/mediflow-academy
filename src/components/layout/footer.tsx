'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  locale: string;
}

const JpMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#fff" stroke="rgba(10,27,61,0.15)"/>
    <circle cx="12" cy="12" r="6" fill="#BC002D"/>
  </svg>
);
const VnMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <rect x="1" y="1" width="22" height="22" rx="11" fill="#DA251D"/>
    <path d="M12 6l1.47 4.53H18l-3.76 2.74L15.71 18 12 15.27 8.29 18l1.47-4.73L6 10.53h4.53L12 6z" fill="#FFCD00"/>
  </svg>
);

function FooterCol({ title, items }: { title: string; items: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <div style={{ color: 'var(--cream)', fontWeight: 600, marginBottom: 14, fontSize: 13 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          item.external ? (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{
              fontSize: 13, color: 'rgba(251,249,244,0.65)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-soft)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(251,249,244,0.65)'; }}
            >
              {item.label} <ExternalLink size={11}/>
            </a>
          ) : (
            <Link key={i} href={item.href} style={{
              fontSize: 13, color: 'rgba(251,249,244,0.65)', textDecoration: 'none', transition: 'color .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-soft)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(251,249,244,0.65)'; }}
            >
              {item.label}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

export default function Footer({ locale }: FooterProps) {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_JOBSEEKER || 'https://lin.ee/xUocVyI';

  return (
    <footer style={{ background: '#060F26', color: 'rgba(251,249,244,0.65)', padding: '64px 0 32px', fontSize: 13 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div className="footer-brand">
            <Link href={`/${locale}`} style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none',
            }}>
              <Image src="/images/logo.png" alt="Mediflow Academy" width={32} height={32} style={{ borderRadius: 8, objectFit: 'contain' }} />
              <span style={{ color: 'var(--cream)', fontWeight: 700, fontSize: 18 }}>Mediflow Academy</span>
            </Link>
            <p style={{ lineHeight: 1.7, maxWidth: 360, fontSize: 13 }}>
              ベトナム人の医療・介護キャリアを、日本語からサポートする。<br/>
              <span style={{ fontFamily: 'var(--font-vn)', fontStyle: 'italic', color: 'var(--accent-soft)' }}>
                Đồng hành cùng sự nghiệp của bạn tại Nhật.
              </span>
            </p>
            <div style={{ marginTop: 20 }}>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#00B300', color: '#fff', padding: '10px 16px',
                  borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#009900'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#00B300'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE相談
              </a>
            </div>
          </div>

          <FooterCol title="コース" items={[
            { label: 'N5 はじめての日本語', href: `/${locale}/courses` },
            { label: 'N4 日常会話', href: `/${locale}/courses` },
            { label: 'N3 医療日本語入門', href: `/${locale}/courses` },
            { label: 'N2 介護現場の日本語', href: `/${locale}/courses` },
            { label: 'N1 専門日本語と就労', href: `/${locale}/courses` },
          ]}/>
          <FooterCol title="サービス" items={[
            { label: '料金プラン', href: `/${locale}/pricing` },
            { label: 'AI家庭教師', href: `/${locale}/ai-tutor` },
            { label: '就職相談', href: lineUrl, external: true },
            { label: '求職フォーム', href: 'https://forms.gle/H4kMy3fibe5oVrKbA', external: true },
          ]}/>
          <FooterCol title="サポート" items={[
            { label: 'ダッシュボード', href: `/${locale}/dashboard` },
            { label: '利用規約', href: `/${locale}/terms` },
            { label: 'プライバシーポリシー', href: `/${locale}/privacy` },
            { label: '日本語', href: '/ja' },
            { label: 'Tiếng Việt', href: '/vi' },
          ]}/>
        </div>

        <div style={{
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}>
            © 2026 MEDIFLOW, INC. · TOKYO · HANOI
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <JpMark/><VnMark/>
            <span style={{ marginLeft: 8 }}>日本語 / Tiếng Việt</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .footer-grid{
            grid-template-columns:1fr 1fr!important;
            gap:28px!important;
          }
          .footer-brand{
            grid-column:1/-1!important;
          }
        }
        @media(max-width:480px){
          .footer-grid{
            grid-template-columns:1fr!important;
          }
          .footer-brand{
            grid-column:1!important;
          }
        }
      `}</style>
    </footer>
  );
}
