import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale !== 'vi';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>
      <Link href={`/${locale}`} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, color: 'var(--ink-soft)', textDecoration: 'none', marginBottom: 40,
      }}>
        ← {isJa ? 'トップページへ戻る' : 'Về trang chủ'}
      </Link>

      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        {isJa ? 'プライバシーポリシー' : 'Chính Sách Bảo Mật'}
      </h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: 13, marginBottom: 48 }}>
        {isJa ? '最終更新日：2026年4月25日' : 'Cập nhật lần cuối: 25 tháng 4, 2026'}
      </p>

      <div style={{ lineHeight: 1.85, color: 'var(--ink)', fontSize: 15 }}>

        {isJa ? (
          <>
            <Section title="1. 事業者情報">
              Mediflow株式会社（以下「当社」）は、個人情報保護法に基づき、ユーザーの個人情報を適切に取り扱います。
            </Section>

            <Section title="2. 収集する情報">
              当社は以下の情報を収集します。
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>アカウント登録情報（氏名、メールアドレス）</li>
                <li>学習履歴（受講コース、テスト結果、AI家庭教師との会話）</li>
                <li>決済情報（クレジットカード番号はStripeが管理し、当社は保持しません）</li>
                <li>ログ情報（IPアドレス、ブラウザ情報、アクセス日時）</li>
                <li>Googleアカウント連携時はGoogleが提供するプロフィール情報</li>
              </ul>
            </Section>

            <Section title="3. 利用目的">
              収集した情報は以下の目的で利用します。
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>本サービスの提供・改善</li>
                <li>AI家庭教師機能のパーソナライズ</li>
                <li>決済処理・サブスクリプション管理</li>
                <li>就職支援サービスとのマッチング（同意を得た場合のみ）</li>
                <li>サービスに関する重要なお知らせの送信</li>
                <li>不正利用の検知・防止</li>
              </ul>
            </Section>

            <Section title="4. 第三者提供">
              当社はユーザーの同意なく個人情報を第三者に提供しません。ただし以下の場合を除きます。
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>法令に基づく開示が必要な場合</li>
                <li>人の生命・身体・財産の保護のために必要な場合</li>
                <li>業務委託先（Supabase, Stripe, Vercel等）への提供（秘密保持契約締結済み）</li>
              </ul>
            </Section>

            <Section title="5. Cookie・アクセス解析">
              本サービスではCookieおよび類似技術を使用します。ブラウザの設定でCookieを無効にできますが、一部機能が制限される場合があります。
            </Section>

            <Section title="6. データの保管・セキュリティ">
              個人情報はSupabase（米国・SOC2 Type II認証）に保管されます。当社はSSL通信、アクセス制御、定期的なセキュリティ審査により情報を保護します。
            </Section>

            <Section title="7. ユーザーの権利">
              ユーザーは以下の権利を有します。
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>個人情報の開示・訂正・削除の請求</li>
                <li>マーケティングメールの配信停止</li>
                <li>アカウント削除（マイページまたはお問い合わせより）</li>
              </ul>
            </Section>

            <Section title="8. 未成年者">
              本サービスは16歳以上を対象としています。16歳未満の方は保護者の同意のもとでご利用ください。
            </Section>

            <Section title="9. プライバシーポリシーの変更">
              本ポリシーは事前の通知をもって変更することがあります。重要な変更は登録メールアドレスにお知らせします。
            </Section>

            <Section title="10. お問い合わせ">
              個人情報に関するお問い合わせは下記までご連絡ください。<br/>
              <strong>Mediflow株式会社 個人情報管理責任者</strong><br/>
              Email: privacy@mediflow.jp<br/>
              LINE: <a href="https://lin.ee/xUocVyI" style={{ color: '#0066CC' }}>https://lin.ee/xUocVyI</a>
            </Section>
          </>
        ) : (
          <>
            <Section title="1. Thông tin doanh nghiệp">
              Mediflow Co., Ltd. (sau đây gọi là "Chúng tôi") xử lý thông tin cá nhân của người dùng theo quy định của pháp luật bảo vệ dữ liệu.
            </Section>

            <Section title="2. Thông tin thu thập">
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>Thông tin đăng ký (họ tên, địa chỉ email)</li>
                <li>Lịch sử học tập (khóa học, kết quả kiểm tra, hội thoại với gia sư AI)</li>
                <li>Thông tin thanh toán (số thẻ được quản lý bởi Stripe, chúng tôi không lưu trữ)</li>
                <li>Thông tin nhật ký (địa chỉ IP, trình duyệt, thời gian truy cập)</li>
                <li>Khi kết nối Google: thông tin hồ sơ do Google cung cấp</li>
              </ul>
            </Section>

            <Section title="3. Mục đích sử dụng">
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>Cung cấp và cải thiện Dịch vụ</li>
                <li>Cá nhân hóa gia sư AI</li>
                <li>Xử lý thanh toán và quản lý đăng ký</li>
                <li>Hỗ trợ tìm việc làm (chỉ với sự đồng ý)</li>
                <li>Gửi thông báo quan trọng về Dịch vụ</li>
                <li>Phát hiện và ngăn chặn hành vi gian lận</li>
              </ul>
            </Section>

            <Section title="4. Chia sẻ với bên thứ ba">
              Chúng tôi không chia sẻ thông tin cá nhân mà không có sự đồng ý, trừ các trường hợp theo yêu cầu pháp luật hoặc với các đối tác đã ký kết thỏa thuận bảo mật (Supabase, Stripe, Vercel...).
            </Section>

            <Section title="5. Cookie">
              Dịch vụ sử dụng Cookie. Bạn có thể tắt Cookie trong cài đặt trình duyệt nhưng một số tính năng có thể bị hạn chế.
            </Section>

            <Section title="6. Bảo mật dữ liệu">
              Dữ liệu được lưu trữ trên Supabase (Hoa Kỳ, chứng nhận SOC2 Type II). Chúng tôi bảo vệ thông tin bằng SSL, kiểm soát truy cập và đánh giá bảo mật định kỳ.
            </Section>

            <Section title="7. Quyền của người dùng">
              <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
                <li>Yêu cầu xem, sửa hoặc xóa thông tin cá nhân</li>
                <li>Hủy đăng ký nhận email marketing</li>
                <li>Xóa tài khoản (từ trang cá nhân hoặc liên hệ chúng tôi)</li>
              </ul>
            </Section>

            <Section title="8. Liên hệ">
              Mọi thắc mắc về quyền riêng tư, vui lòng liên hệ:<br/>
              <strong>Mediflow Co., Ltd.</strong><br/>
              Email: privacy@mediflow.jp<br/>
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
