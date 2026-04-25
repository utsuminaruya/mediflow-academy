import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale !== 'vi';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>
      {/* Back link */}
      <Link href={`/${locale}`} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, color: 'var(--ink-soft)', textDecoration: 'none', marginBottom: 40,
      }}>
        ← {isJa ? 'トップページへ戻る' : 'Về trang chủ'}
      </Link>

      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        {isJa ? '利用規約' : 'Điều Khoản Dịch Vụ'}
      </h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginBottom: 48 }}>
        {isJa ? '最終更新日：2026年4月25日' : 'Cập nhật lần cuối: 25 tháng 4, 2026'}
      </p>

      <div style={{ lineHeight: 1.85, color: 'var(--ink)', fontSize: 15 }}>

        {isJa ? (
          <>
            <Section title="第1条（適用）">
              本規約は、Mediflow株式会社（以下「当社」）が提供するオンライン学習サービス「Mediflow Academy」（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。
            </Section>

            <Section title="第2条（アカウント登録）">
              <p>本サービスの利用にはアカウント登録が必要です。登録時に提供する情報は正確かつ最新のものでなければなりません。</p>
              <p style={{ marginTop: 12 }}>ユーザーはアカウントのパスワードを厳重に管理する責任を負い、第三者への譲渡・貸与は禁止します。不正アクセスを発見した場合は速やかに当社に通知してください。</p>
            </Section>

            <Section title="第3条（料金・支払い）">
              <p>無料プランは登録後すぐにご利用いただけます。有料プラン（Basic・Pro）は7日間の無料トライアル後、選択いただいた料金が自動的に課金されます。</p>
              <p style={{ marginTop: 12 }}>支払いはクレジットカードによる自動引き落としとなります。キャンセルはいつでもマイページから手続きいただけます。</p>
            </Section>

            <Section title="第4条（キャンセル・返金）">
              有料プランは契約期間中いつでも解約可能です。解約後も請求期間終了まではサービスをご利用いただけます。日割り返金は原則対応していませんが、重大なサービス障害が生じた場合は個別に対応いたします。
            </Section>

            <Section title="第5条（禁止事項）">
              ユーザーは以下の行為を行ってはなりません。
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>本サービスのコンテンツを無断で複製・転載・販売する行為</li>
                <li>他のユーザーや第三者を誹謗・中傷する行為</li>
                <li>虚偽の情報を登録・提供する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>法令・公序良俗に反する行為</li>
              </ul>
            </Section>

            <Section title="第6条（知的財産権）">
              本サービス上のコンテンツ（テキスト・画像・映像・AI回答等）に関する著作権・知的財産権は当社または正当な権利者に帰属します。ユーザーは個人的な学習目的に限りこれらを使用できます。
            </Section>

            <Section title="第7条（免責事項）">
              当社は本サービスの内容の正確性・完全性・有用性について保証しません。本サービスの利用により生じた損害について、当社の責任は直接損害に限り、かつ当該月の利用料を上限とします。
            </Section>

            <Section title="第8条（サービスの変更・終了）">
              当社は事前の通知をもって本サービスの内容を変更・終了することができます。重要な変更は30日前までに通知いたします。
            </Section>

            <Section title="第9条（準拠法・管轄）">
              本規約は日本法に準拠し、本サービスに関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </Section>

            <Section title="第10条（お問い合わせ）">
              本規約に関するご質問は下記までお問い合わせください。<br/>
              <strong>Mediflow株式会社</strong><br/>
              Email: support@mediflow.jp<br/>
              LINE: <a href="https://lin.ee/xUocVyI" style={{ color: '#0066CC' }}>https://lin.ee/xUocVyI</a>
            </Section>
          </>
        ) : (
          <>
            <Section title="Điều 1 (Phạm vi áp dụng)">
              Điều khoản này quy định các điều kiện sử dụng dịch vụ học trực tuyến "Mediflow Academy" (sau đây gọi là "Dịch vụ") do Mediflow Co., Ltd. (sau đây gọi là "Chúng tôi") cung cấp. Người dùng đồng ý với các điều khoản này khi sử dụng Dịch vụ.
            </Section>

            <Section title="Điều 2 (Đăng ký tài khoản)">
              Cần đăng ký tài khoản để sử dụng Dịch vụ. Thông tin cung cấp khi đăng ký phải chính xác và cập nhật. Người dùng chịu trách nhiệm bảo mật mật khẩu và không được chuyển nhượng tài khoản cho bên thứ ba.
            </Section>

            <Section title="Điều 3 (Phí dịch vụ)">
              Gói miễn phí có thể sử dụng ngay sau khi đăng ký. Gói trả phí (Basic, Pro) sẽ tự động tính phí sau 7 ngày dùng thử miễn phí. Thanh toán qua thẻ tín dụng và được tự động gia hạn hàng tháng.
            </Section>

            <Section title="Điều 4 (Hủy & Hoàn tiền)">
              Có thể hủy gói trả phí bất cứ lúc nào. Sau khi hủy, vẫn có thể sử dụng đến hết kỳ thanh toán. Thông thường không hoàn tiền theo ngày, trừ trường hợp sự cố dịch vụ nghiêm trọng.
            </Section>

            <Section title="Điều 5 (Hành vi bị cấm)">
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>Sao chép, phân phối, bán lại nội dung của Dịch vụ</li>
                <li>Xúc phạm hoặc quấy rối người dùng khác</li>
                <li>Cung cấp thông tin sai lệch</li>
                <li>Cản trở hoạt động của Dịch vụ</li>
                <li>Vi phạm pháp luật hoặc đạo đức xã hội</li>
              </ul>
            </Section>

            <Section title="Điều 6 (Quyền sở hữu trí tuệ)">
              Mọi nội dung trên Dịch vụ (văn bản, hình ảnh, video, câu trả lời AI...) thuộc sở hữu của Chúng tôi hoặc các chủ sở hữu hợp pháp. Người dùng chỉ được sử dụng cho mục đích học tập cá nhân.
            </Section>

            <Section title="Điều 7 (Miễn trách nhiệm)">
              Chúng tôi không đảm bảo tính chính xác hay đầy đủ của nội dung. Trách nhiệm của chúng tôi giới hạn ở thiệt hại trực tiếp và không vượt quá phí sử dụng tháng đó.
            </Section>

            <Section title="Điều 8 (Liên hệ)">
              Mọi thắc mắc liên quan đến Điều khoản này, vui lòng liên hệ:<br/>
              <strong>Mediflow Co., Ltd.</strong><br/>
              Email: support@mediflow.jp<br/>
              LINE: <a href="https://lin.ee/xUocVyI" style={{ color: '#0066CC' }}>https://lin.ee/xUocVyI</a>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>
        {title}
      </h2>
      <div style={{ color: 'var(--ink-soft)' }}>{children}</div>
    </section>
  );
}
