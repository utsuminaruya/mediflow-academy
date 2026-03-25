import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Bot, GraduationCap, Briefcase, Check, ArrowRight, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;

  return <LandingContent locale={locale} />;
}

function LandingContent({ locale }: { locale: string }) {
  const t = useTranslations();

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-[#0066CC]" />,
      title: t('features.ai.title'),
      desc: t('features.ai.desc'),
      color: 'bg-blue-50',
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-[#00B894]" />,
      title: t('features.jlpt.title'),
      desc: t('features.jlpt.desc'),
      color: 'bg-green-50',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#FF6B6B]" />,
      title: t('features.career.title'),
      desc: t('features.career.desc'),
      color: 'bg-red-50',
    },
  ];

  const plans = [
    {
      key: 'free',
      price: '¥0',
      period: '',
      color: 'border-gray-200',
      highlight: false,
      features: [
        { text: 'N5コース', included: true },
        { text: 'N4コース', included: false },
        { text: 'N3〜N1コース', included: false },
        { text: 'AI家庭教師 5回/日', included: true },
        { text: '介護の専門日本語', included: false },
        { text: 'キャリアAI', included: false },
        { text: '就職紹介', included: false },
      ],
    },
    {
      key: 'basic',
      price: '¥980',
      period: '/月',
      color: 'border-[#0066CC]',
      highlight: false,
      features: [
        { text: 'N5コース', included: true },
        { text: 'N4コース', included: true },
        { text: 'N3〜N1コース', included: false },
        { text: 'AI家庭教師 無制限', included: true },
        { text: '介護の専門日本語', included: false },
        { text: 'キャリアAI', included: false },
        { text: '就職紹介', included: false },
      ],
    },
    {
      key: 'pro',
      price: '¥1,980',
      period: '/月',
      color: 'border-[#00B894]',
      highlight: true,
      features: [
        { text: 'N5コース', included: true },
        { text: 'N4コース', included: true },
        { text: 'N3〜N1コース', included: true },
        { text: 'AI家庭教師 無制限', included: true },
        { text: '介護の専門日本語', included: true },
        { text: 'キャリアAI', included: true },
        { text: '就職紹介', included: true },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Nguyen Thi Lan',
      role: '介護士（技能実習）',
      text: 'Medi先生のおかげでN3に合格できました！介護の言葉も実践的に学べて助かっています。',
      stars: 5,
      flag: '🇻🇳',
    },
    {
      name: 'Tran Van Minh',
      role: '特定技能・介護',
      text: 'N3取得後、給料が15%上がりました。Mediflowの就職サポートも最高でした！',
      stars: 5,
      flag: '🇻🇳',
    },
    {
      name: 'Le Thi Hong',
      role: '看護助手',
      text: 'ベトナム語で丁寧に教えてくれるので理解しやすい。毎日楽しく学習できています。',
      stars: 5,
      flag: '🇻🇳',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003d7a] text-white py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Bot className="h-4 w-4" />
            AI家庭教師Medi先生が24時間サポート
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {locale === 'ja' ? (
              <>
                日本語を学んで、<br />
                <span className="text-[#00E5B5]">キャリアを作ろう</span>
              </>
            ) : (
              <>
                Học tiếng Nhật,<br />
                <span className="text-[#00E5B5]">xây dựng sự nghiệp</span>
              </>
            )}
          </h1>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${locale}/onboarding`}>
              <Button
                size="xl"
                className="bg-white text-[#0066CC] hover:bg-blue-50 font-bold shadow-xl hover:shadow-2xl group"
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-blue-200 text-sm">{t('hero.ctaSub')}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { value: '1,200+', label: locale === 'ja' ? '学習者数' : 'Học viên' },
              { value: '85%', label: locale === 'ja' ? 'JLPT合格率' : 'Tỷ lệ đậu JLPT' },
              { value: '4.9', label: locale === 'ja' ? '平均評価' : 'Đánh giá' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'ja' ? '3つの強み' : '3 điểm mạnh'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'ja'
                ? 'Mediflow Academyは、AI技術と人材紹介の専門知識を組み合わせた日本語学習プラットフォームです'
                : 'Mediflow Academy kết hợp công nghệ AI và chuyên môn giới thiệu nhân lực'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} hover bordered className="text-center">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'ja' ? '学習の流れ' : 'Quy trình học tập'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: locale === 'ja' ? 'プロフィール設定' : 'Thiết lập hồ sơ',
                desc: locale === 'ja'
                  ? '現在のレベルと目標を教えてください'
                  : 'Cho biết trình độ và mục tiêu của bạn',
              },
              {
                step: '02',
                title: locale === 'ja' ? 'AI学習開始' : 'Bắt đầu học với AI',
                desc: locale === 'ja'
                  ? 'Medi先生と一緒に毎日学習'
                  : 'Học hàng ngày cùng Medi-sensei',
              },
              {
                step: '03',
                title: locale === 'ja' ? 'キャリアアップ' : 'Thăng tiến sự nghiệp',
                desc: locale === 'ja'
                  ? 'JLPT合格→転職・昇給へ'
                  : 'Đậu JLPT → Chuyển việc & tăng lương',
              },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0066CC] to-[#00B894] rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.title')}</h2>
            <p className="text-gray-600">
              {locale === 'ja'
                ? 'まず無料で始めて、必要に応じてアップグレード'
                : 'Bắt đầu miễn phí, nâng cấp khi cần thiết'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`bg-white rounded-2xl border-2 p-6 relative ${plan.color} ${
                  plan.highlight ? 'shadow-xl scale-105' : 'shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#00B894] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                      {t('pricing.mostPopular')}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.key === 'free' ? t('pricing.free') :
                     plan.key === 'basic' ? t('pricing.basic') :
                     t('pricing.pro')}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-[#00B894] flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.key === 'free' ? `/${locale}/onboarding` : `/${locale}/pricing`}>
                  <Button
                    fullWidth
                    variant={plan.highlight ? 'secondary' : plan.key === 'free' ? 'outline' : 'primary'}
                  >
                    {plan.key === 'free' ? t('pricing.getStarted') : t('pricing.upgrade')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'ja' ? '受講者の声' : 'Phản hồi học viên'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} bordered>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{testimonial.flag}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0066CC] to-[#00B894] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'ja'
              ? '今すぐ学習を始めよう'
              : 'Bắt đầu học ngay hôm nay'
            }
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {locale === 'ja'
              ? '1,200人以上の外国人が既にMediflow Academyで日本語を学んでいます'
              : 'Hơn 1.200 người nước ngoài đã học tiếng Nhật với Mediflow Academy'
            }
          </p>
          <Link href={`/${locale}/onboarding`}>
            <Button
              size="xl"
              className="bg-white text-[#0066CC] hover:bg-blue-50 font-bold shadow-xl"
            >
              {t('hero.cta')} - {t('hero.ctaSub')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
