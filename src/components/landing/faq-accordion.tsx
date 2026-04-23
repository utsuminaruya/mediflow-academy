'use client';

import { useState } from 'react';

const qs = [
  {
    q: '本当に無料で全部学べますか？',
    vi: 'Có thật sự miễn phí không?',
    a: 'はい。N5〜N1のすべての教材と授業動画は、ずっと無料で公開しています。AI家庭教師の基本機能（1日5回まで）も無料で使えます。',
  },
  {
    q: 'ベトナムから受講できますか？',
    vi: 'Có thể học từ Việt Nam không?',
    a: 'もちろんです。受講生の約60%がベトナムからオンラインで学んでいます。日本渡航前の準備にも最適です。',
  },
  {
    q: 'JLPTを受けるつもりはないのですが大丈夫？',
    vi: 'Tôi không định thi JLPT, có được không?',
    a: '問題ありません。私たちのゴールは「現場で使える日本語」です。JLPT対策コースは選択制で、現場実践コースだけで学ぶこともできます。',
  },
  {
    q: '介護福祉士試験の対策もありますか？',
    vi: 'Có luyện thi hộ lý không?',
    a: 'はい。Proプラン以上では、介護福祉士国家試験・EPA試験の対策コースを提供しています。ベトナム語での解説付きです。',
  },
  {
    q: 'いつでも解約できますか？',
    vi: 'Có thể huỷ bất cứ lúc nào?',
    a: 'Pro/Basicプランはいつでも解約可能。解約後もFreeプランの教材はご利用いただけます。',
  },
];

const PlusIcon = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s', color: 'var(--ink-soft)', flexShrink: 0 }}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

export default function FAQAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ borderTop: '1px solid var(--line-strong)' }}>
      {qs.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--line-strong)' }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: '100%', padding: '24px 4px', textAlign: 'left',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              cursor: 'pointer', background: 'none', border: 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{item.q}</div>
              <div style={{
                fontFamily: 'var(--font-vn)', fontSize: 13, fontStyle: 'italic',
                color: 'var(--primary)', marginTop: 4,
              }}>{item.vi}</div>
            </div>
            <PlusIcon open={open === i}/>
          </button>
          {open === i && (
            <div style={{
              padding: '0 4px 24px', fontSize: 15, lineHeight: 1.8,
              color: 'var(--ink-soft)', maxWidth: 720,
            }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
