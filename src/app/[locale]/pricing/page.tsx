'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check, X, Zap, Shield, Bot, BookOpen, Briefcase, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

const featureRows = [
  { key: 'all_courses', label: { ja: 'N5〜N1 全コース', vi: 'Toàn bộ khóa N5〜N1' }, free: true, basic: true, pro: true, icon: BookOpen },
  { key: 'ai_tutor_free', label: { ja: 'AI家庭教師（5回/日）', vi: 'Gia sư AI (5 lần/ngày)' }, free: true, basic: false, pro: false, icon: Bot },
  { key: 'ai_tutor_unlimited', label: { ja: 'AI家庭教師（無制限）', vi: 'Gia sư AI (không giới hạn)' }, free: false, basic: true, pro: true, icon: Bot },
  { key: 'care_japanese', label: { ja: '介護の専門日本語', vi: 'Tiếng Nhật điều dưỡng chuyên ngành' }, free: false, basic: true, pro: true, icon: Shield },
  { key: 'career_consult', label: { ja: 'キャリア相談（現役ベトナム人介護福祉士）', vi: 'Tư vấn nghề nghiệp (điều dưỡng VN)' }, free: false, basic: true, pro: true, icon: Briefcase },
  { key: 'job_placement', label: { ja: 'プレミアム就職紹介サービス', vi: 'Dịch vụ giới thiệu việc làm cao cấp' }, free: false, basic: false, pro: true, icon: Briefcase },
  { key: 'medical_interpreter', label: { ja: 'ベトナム人N1 医療通訳コース', vi: 'Khóa phiên dịch y tế N1 người Việt' }, free: false, basic: false, pro: true, icon: Zap },
];

export default function PricingPage({ params }: PricingPageProps) {
  const { locale } = use(params);
  const t = useTranslations('pricing');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState('');

  const lineUrl = process.env.NEXT_PUBLIC_LINE_JOBSEEKER || 'https://lin.ee/xUocVyI';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setIsLoggedIn(false); return; }
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  const plans = [
    {
      key: 'free',
      name: t('free'),
      price: '¥0',
      yearlyPrice: '¥0',
      period: '',
      color: 'border-gray-200',
      buttonVariant: 'outline' as const,
      buttonText: t('getStarted'),
      highlighted: false,
      priceId: null,
      description: { ja: 'N5〜N1まで全コース無料で学べます', vi: 'Học miễn phí toàn bộ N5〜N1' },
    },
    {
      key: 'basic',
      name: t('basic'),
      price: '¥980',
      yearlyPrice: '¥8,820',
      period: t('month'),
      color: 'border-[#0066CC]',
      buttonVariant: 'primary' as const,
      buttonText: locale === 'ja' ? '7日間無料で試す' : 'Dùng thử 7 ngày miễn phí',
      highlighted: false,
      trial: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
      description: { ja: '介護の現場で使える日本語と、現役ベトナム人介護福祉士によるキャリア相談', vi: 'Tiếng Nhật thực tế điều dưỡng & tư vấn từ điều dưỡng viên người Việt' },
    },
    {
      key: 'pro',
      name: t('pro'),
      price: '¥1,980',
      yearlyPrice: '¥17,820',
      period: t('month'),
      color: 'border-[#00B894]',
      buttonVariant: 'secondary' as const,
      buttonText: locale === 'ja' ? '7日間無料で試す' : 'Dùng thử 7 ngày miễn phí',
      highlighted: true,
      trial: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
      description: { ja: 'プレミアム就職紹介とN1監修の医療通訳コース付き', vi: 'Giới thiệu việc làm cao cấp & khóa phiên dịch y tế giám sát N1' },
    },
  ];

  const handleCheckout = async (planKey: string) => {
    if (planKey === 'free') return;

    // ログイン確認 — 未ログインならサインアップへ
    if (!isLoggedIn) {
      window.location.href = `/${locale}/auth/signup?redirect=/pricing&plan=${planKey}`;
      return;
    }

    setIsLoading(planKey);
    setCheckoutError('');

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey, locale }),
      });

      if (response.status === 401) {
        // セッション切れ → ログインページへ
        window.location.href = `/${locale}/auth/login?redirect=/pricing&plan=${planKey}`;
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(
          locale === 'ja'
            ? '決済ページを開けませんでした。LINEよりお問い合わせください。'
            : 'Không thể mở trang thanh toán. Vui lòng liên hệ qua LINE.'
        );
      }
    } catch {
      setCheckoutError(
        locale === 'ja'
          ? 'エラーが発生しました。再度お試しください。'
          : 'Đã xảy ra lỗi. Vui lòng thử lại.'
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-500 mb-4">
          {locale === 'ja'
            ? 'まず無料で始めて、キャリアアップに合わせてアップグレード'
            : 'Bắt đầu miễn phí, nâng cấp khi cần thiết cho sự nghiệp của bạn'
          }
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
          <span>🎉</span>
          {locale === 'ja'
            ? 'ベーシック・Proプランは7日間無料でお試しいただけます'
            : 'Gói Basic và Pro miễn phí 7 ngày đầu tiên'
          }
        </div>

        {checkoutError && (
          <div className="max-w-lg mx-auto mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-amber-800 font-medium">{checkoutError}</p>
              <a href="https://lin.ee/xUocVyI" target="_blank" rel="noopener noreferrer"
                className="text-sm text-amber-700 underline mt-1 inline-block">
                LINE で問い合わせる →
              </a>
            </div>
          </div>
        )}

        {/* Billing toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              billingPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {locale === 'ja' ? '月払い' : 'Theo tháng'}
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1',
              billingPeriod === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {locale === 'ja' ? '年払い' : 'Theo năm'}
            <span className="bg-[#00B894] text-white text-xs px-1.5 py-0.5 rounded-full">-25%</span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={cn(
              'bg-white rounded-2xl border-2 p-8 relative transition-all duration-200',
              plan.color,
              plan.highlighted ? 'shadow-xl md:scale-105' : 'shadow-sm hover:shadow-md'
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#00B894] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  {t('mostPopular')}
                </span>
              </div>
            )}
            {(plan as { trial?: boolean }).trial && (
              <div className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md px-2.5 py-1 text-xs font-semibold mb-2">
                ✓ {locale === 'ja' ? '7日間無料トライアル' : 'Thử miễn phí 7 ngày'}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  {billingPeriod === 'yearly' && plan.key !== 'free'
                    ? plan.yearlyPrice
                    : plan.price
                  }
                </span>
                {plan.period && (
                  <span className="text-gray-500">
                    {billingPeriod === 'yearly'
                      ? locale === 'ja' ? '/年' : '/năm'
                      : plan.period
                    }
                  </span>
                )}
              </div>
              {billingPeriod === 'yearly' && plan.key !== 'free' && (
                <p className="text-sm text-[#00B894] mt-1 font-medium">
                  {locale === 'ja' ? '2ヶ月分お得！' : 'Tiết kiệm 2 tháng!'}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-4 leading-relaxed min-h-[32px]">
              {locale === 'ja' ? plan.description.ja : plan.description.vi}
            </p>

            <Button
              fullWidth
              variant={plan.buttonVariant}
              isLoading={isLoading === plan.key}
              onClick={() => {
                if (plan.key === 'free') {
                  window.location.href = `/${locale}/onboarding`;
                } else {
                  handleCheckout(plan.key);
                }
              }}
            >
              {plan.key !== 'free' && !isLoggedIn
                ? (locale === 'ja' ? '無料登録して試す' : 'Đăng ký & dùng thử miễn phí')
                : plan.buttonText
              }
            </Button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-12">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 pl-6 text-gray-700 font-semibold">
                  {locale === 'ja' ? '機能' : 'Tính năng'}
                </th>
                {plans.map((plan) => (
                  <th key={plan.key} className="p-4 text-center">
                    <span className={cn(
                      'font-bold',
                      plan.highlighted ? 'text-[#00B894]' : 'text-gray-900'
                    )}>
                      {plan.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((feature, i) => (
                <tr
                  key={feature.key}
                  className={cn('border-b border-gray-50', i % 2 === 0 && 'bg-gray-50/50')}
                >
                  <td className="p-4 pl-6 flex items-center gap-2 text-gray-700">
                    <feature.icon className="h-4 w-4 text-gray-400" />
                    {locale === 'ja' ? feature.label.ja : feature.label.vi}
                  </td>
                  {(['free', 'basic', 'pro'] as const).map((planKey) => (
                    <td key={planKey} className="p-4 text-center">
                      {feature[planKey] ? (
                        <Check className="h-5 w-5 text-[#00B894] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-200 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Career CTA */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#00B894] rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          {locale === 'ja'
            ? 'JLPT合格後は、Mediflowで就職サポート！'
            : 'Sau khi đậu JLPT, Mediflow hỗ trợ tìm việc!'
          }
        </h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          {locale === 'ja'
            ? 'Mediflow株式会社は現役看護師が運営する人材紹介会社。学習完了者には無料で職業紹介が可能です。'
            : 'Mediflow là công ty giới thiệu nhân lực do y tá đang hành nghề điều hành. Hỗ trợ giới thiệu việc làm miễn phí cho học viên hoàn thành.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-white text-[#0066CC] hover:bg-blue-50 font-bold">
              {locale === 'ja' ? 'LINEで就職相談' : 'Tư vấn việc làm qua LINE'}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <a
            href="https://forms.gle/H4kMy3fibe5oVrKbA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              {locale === 'ja' ? '求職フォームを記入' : 'Điền form tìm việc'}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {locale === 'ja' ? 'よくある質問' : 'Câu hỏi thường gặp'}
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              q: locale === 'ja' ? '7日間無料トライアルはどのように機能しますか？' : 'Thử miễn phí 7 ngày hoạt động như thế nào?',
              a: locale === 'ja'
                ? 'カード情報をご登録いただきますが、7日間は一切課金されません。トライアル期間中にキャンセルすれば、料金は発生しません。7日後、自動的に選択したプランに移行します。'
                : 'Bạn cần nhập thông tin thẻ, nhưng sẽ không bị tính phí trong 7 ngày đầu. Hủy trước khi hết hạn và bạn sẽ không mất phí.',
            },
            {
              q: locale === 'ja' ? 'いつでもキャンセルできますか？' : 'Tôi có thể hủy bất cứ lúc nào không?',
              a: locale === 'ja'
                ? 'はい、いつでもキャンセル可能です。解約後も残りの期間はサービスをご利用いただけます。'
                : 'Có, bạn có thể hủy bất cứ lúc nào. Sau khi hủy, bạn vẫn có thể sử dụng dịch vụ trong thời gian còn lại.',
            },
            {
              q: locale === 'ja' ? '無料プランで何ができますか？' : 'Gói miễn phí có thể làm gì?',
              a: locale === 'ja'
                ? 'N5コース全レッスン、AI家庭教師5回/日が無料でご利用いただけます。'
                : 'Bạn có thể sử dụng miễn phí tất cả bài học N5 và gia sư AI 5 lần/ngày.',
            },
            {
              q: locale === 'ja' ? '就職紹介は本当に無料ですか？' : 'Giới thiệu việc làm có thực sự miễn phí không?',
              a: locale === 'ja'
                ? 'PROプラン加入者および学習完了者には、求職者側は完全無料でご利用いただけます（企業側から費用をいただいています）。'
                : 'Hoàn toàn miễn phí cho người tìm việc (chi phí do phía doanh nghiệp chi trả).',
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Q. {faq.q}</h3>
              <p className="text-gray-600 text-sm">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
