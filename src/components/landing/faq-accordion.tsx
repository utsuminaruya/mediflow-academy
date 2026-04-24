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
  {
    q: 'スマートフォンで学習できますか？',
    vi: 'Có thể học trên điện thoại không?',
    a: 'はい。iOS・Android どちらのブラウザでも最適化されており、通勤・通学中でも快適に学習できます。',
  },
  {
    q: 'AI家庭教師はどんなことを教えてくれますか？',
    vi: 'Gia sư AI có thể dạy gì?',
    a: '文法の解説、作文の添削、発音のヒント、介護現場の専門用語、試験問題の解説まで対応しています。日本語・ベトナム語どちらでも質問できます。',
  },
  {
    q: '日本語がまったく初めてでも大丈夫ですか？',
    vi: 'Hoàn toàn chưa biết tiếng Nhật có được không?',
    a: 'はい。N5コースはゼロから始める方向けに設計されており、ひらがな・カタカナの学習から丁寧に進めます。まずは無料プランでお試しください。',
  },
  {
    q: 'AIロールプレイはいつから使えますか？',
    vi: 'AI Roleplay sẽ ra mắt khi nào?',
    a: '現在鋭意開発中です。介護現場を想定した9つのシナリオで、実際の会話練習ができる機能です。開設予定はLINE公式アカウントでお知らせします。',
  },
  {
    q: '過去問演習はいつから始まりますか？',
    vi: 'Luyện đề thi cũ sẽ ra mắt khi nào?',
    a: '特定技能「介護」評価試験および介護福祉士国家試験の過去問を近日公開予定です。AIによる解説付きで、苦手分野を自動分析します。公開時にはLINEでお知らせします。',
  },
  {
    q: '就職紹介は本当に無料ですか？',
    vi: 'Giới thiệu việc làm có thực sự miễn phí không?',
    a: 'PROプラン加入者および学習完了者には、求職者側は完全無料でご利用いただけます（企業側から費用をいただいています）。',
  },
  {
    q: '家族や友人と一緒に使えますか？',
    vi: 'Có thể dùng chung với gia đình không?',
    a: 'アカウントは1名につき1アカウントとなります。学習履歴やAI家庭教師の会話は個人に紐づくため、個別にアカウント作成をお勧めします。',
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
