import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Bot, GraduationCap, Briefcase, Check, ArrowRight, Star, Stethoscope, Award } from 'lucide-react';
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
  const isJa = locale === 'ja';

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
        { text: isJa ? 'N5〜N1 全コース' : 'Toàn bộ khóa học N5〜N1', included: true },
        { text: isJa ? 'AI家庭教師 5回/日' : 'Gia sư AI 5 lần/ngày', included: true },
        { text: isJa ? '介護の専門日本語' : 'Tiếng Nhật điều dưỡng', included: false },
        { text: isJa ? 'キャリア相談（現役介護福祉士）' : 'Tư vấn nghề nghiệp', included: false },
        { text: isJa ? 'プレミアム就職紹介' : 'Giới thiệu việc làm cao cấp', included: false },
        { text: isJa ? '医療通訳コース' : 'Khóa phiên dịch y tế', included: false },
      ],
    },
    {
      key: 'basic',
      price: '¥980',
      period: '/月',
      color: 'border-[#0066CC]',
      highlight: false,
      features: [
        { text: isJa ? 'N5〜N1 全コース' : 'Toàn bộ khóa học N5〜N1', included: true },
        { text: isJa ? 'AI家庭教師 無制限' : 'Gia sư AI không giới hạn', included: true },
        { text: isJa ? '介護の専門日本語' : 'Tiếng Nhật điều dưỡng', included: true },
        { text: isJa ? 'キャリア相談（現役介護福祉士）' : 'Tư vấn nghề nghiệp', included: true },
        { text: isJa ? 'プレミアム就職紹介' : 'Giới thiệu việc làm cao cấp', included: false },
        { text: isJa ? '医療通訳コース' : 'Khóa phiên dịch y tế', included: false },
      ],
    },
    {
      key: 'pro',
      price: '¥1,980',
      period: '/月',
      color: 'border-[#00B894]',
      highlight: true,
      features: [
        { text: isJa ? 'N5〜N1 全コース' : 'Toàn bộ khóa học N5〜N1', included: true },
        { text: isJa ? 'AI家庭教師 無制限' : 'Gia sư AI không giới hạn', included: true },
        { text: isJa ? '介護の専門日本語' : 'Tiếng Nhật điều dưỡng', included: true },
        { text: isJa ? 'キャリア相談（現役介護福祉士）' : 'Tư vấn nghề nghiệp', included: true },
        { text: isJa ? 'プレミアム就職紹介サービス' : 'Giới thiệu việc làm cao cấp', included: true },
        { text: isJa ? '医療通訳コース（N1監修）' : 'Khóa phiên dịch y tế (N1)', included: true },
      ],
    },
  ];

  // Dung's success story timeline
  const dungStory = [
    { year: '2014', event: isJa ? 'EPA介護福祉士候補者として来日' : 'Đến Nhật theo chương trình EPA', icon: '✈️' },
    { year: '2016', event: isJa ? '介護福祉士資格取得' : 'Đạt chứng chỉ điều dưỡng viên', icon: '🏆' },
    { year: '2018', event: isJa ? 'JLPT N1合格' : 'Đạt JLPT N1', icon: '📜' },
    { year: '2019', event: isJa ? '日本人男性と結婚・関東に新築戸建て購入' : 'Kết hôn với người Nhật, mua nhà mới ở Kanto', icon: '🏠' },
    { year: '2020', event: isJa ? '医療通訳として活躍・一児の母に' : 'Làm phiên dịch y tế, sinh con đầu lòng', icon: '👶' },
    { year: '2024', event: isJa ? '日本の看護師免許取得・テスラで通勤中！' : 'Đạt bằng y tá Nhật Bản, đi làm bằng Tesla!', icon: '🚗' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003d7a] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Supervisor badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white/95 text-sm font-semibold px-5 py-2.5 rounded-full mb-6 border border-white/30">
            <Stethoscope className="h-4 w-4 text-[#00E5B5]" />
            {isJa
              ? '現役日本人看護師 × ベトナム人N1介護福祉士 監修'
              : 'Giám sát bởi Y tá Nhật Bản & Điều dưỡng viên N1 người Việt'
            }
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {isJa ? (
              <>
                現場を知る<span className="text-[#00E5B5]">プロが教える</span><br />
                介護・医療の日本語
              </>
            ) : (
              <>
                Học tiếng Nhật<br />
                <span className="text-[#00E5B5]">từ chuyên gia thực tế</span>
              </>
            )}
          </h1>

          <p className="text-lg text-blue-100 mb-4 max-w-2xl mx-auto leading-relaxed">
            {isJa
              ? '日本で活躍する現役看護師とN1合格のベトナム人介護福祉士が、あなたの日本語学習とキャリアを本気でサポートします'
              : 'Y tá Nhật Bản đang hành nghề và điều dưỡng viên người Việt đạt N1 sẽ hỗ trợ hành trình học tiếng Nhật và sự nghiệp của bạn'
            }
          </p>

          {/* Supervisor profiles */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
              <span className="text-lg">👩‍⚕️</span>
              <span>{isJa ? '現役日本人看護師' : 'Y tá Nhật đang hành nghề'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
              <span className="text-lg">🇻🇳</span>
              <span>{isJa ? 'N1合格ベトナム人介護福祉士' : 'Điều dưỡng viên Việt đạt N1'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
              <span className="text-lg">🏥</span>
              <span>{isJa ? '医療通訳専門家' : 'Chuyên gia phiên dịch y tế'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${locale}/auth/signup`}>
              <Button
                size="xl"
                className="bg-white text-[#0066CC] hover:bg-blue-50 font-bold shadow-xl hover:shadow-2xl group"
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {[
              { value: '1,200+', label: isJa ? '学習者数' : 'Học viên' },
              { value: '85%', label: isJa ? 'JLPT合格率' : 'Tỷ lệ đậu JLPT' },
              { value: 'N1〜N5', label: isJa ? '全レベル無料' : 'Miễn phí mọi cấp' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supervisor Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isJa ? '監修者紹介' : 'Giới thiệu chuyên gia giám sát'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isJa ? '現場のリアルを知るプロが、あなたの学習を設計しました' : 'Những chuyên gia từ thực tế đã thiết kế chương trình học cho bạn'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#0066CC] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wide mb-1">
                    {isJa ? '日本人監修者' : 'Chuyên gia Nhật Bản'}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {isJa ? '現役看護師・Mediflow代表' : 'Y tá hành nghề · Đại diện Mediflow'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isJa
                      ? '介護・医療現場で実際に使われる日本語を熟知。外国人スタッフとの協働経験から、学習に必要な語彙と表現を設計しました。'
                      : 'Am hiểu sâu về tiếng Nhật thực tế trong môi trường điều dưỡng và y tế. Thiết kế chương trình từ kinh nghiệm làm việc với nhân viên nước ngoài.'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#00B894] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00B894] uppercase tracking-wide mb-1">
                    {isJa ? 'ベトナム人監修者' : 'Chuyên gia Việt Nam'}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {isJa ? 'N1合格・介護福祉士・医療通訳' : 'Đạt N1 · Điều dưỡng viên · Phiên dịch y tế'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isJa
                      ? 'EPA制度で来日後、介護福祉士・JLPT N1を取得。現在は医療通訳としても活躍中。日本で看護師資格も取得した実績を持つ。'
                      : 'Đến Nhật theo EPA, đạt chứng chỉ điều dưỡng và JLPT N1. Hiện đang làm phiên dịch y tế và đã đạt bằng y tá Nhật Bản.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isJa ? '3つの強み' : '3 điểm mạnh'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} hover bordered className="text-center bg-white">
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

      {/* Success Story: Dung-san */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full border border-amber-200 mb-4">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {isJa ? 'サクセスストーリー' : 'Câu chuyện thành công'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {isJa ? 'Dungさんの軌跡' : 'Hành trình của Dung'}
            </h2>
            <p className="text-gray-500">
              {isJa
                ? 'EPA来日から看護師免許・テスラ・新築戸建てまで。これはひとりのベトナム人女性の本当の話。'
                : 'Từ EPA đến bằng y tá, Tesla và nhà mới. Đây là câu chuyện thật của một người phụ nữ Việt Nam.'
              }
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0066CC] to-[#00B894] md:left-1/2" />

            <div className="space-y-6">
              {dungStory.map((item, i) => (
                <div key={i} className={`flex gap-4 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 md:px-8 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm inline-block w-full md:max-w-xs ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-bold text-[#0066CC] text-sm">{item.year}</span>
                      </div>
                      <p className="text-gray-800 font-medium text-sm">{item.event}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="relative flex items-center justify-center flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2" style={{ width: '24px' }}>
                    <div className="w-4 h-4 bg-white border-2 border-[#0066CC] rounded-full z-10 flex-shrink-0" />
                  </div>

                  {/* Spacer for alternating */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mt-12 bg-gradient-to-r from-[#0066CC]/5 to-[#00B894]/5 border border-[#00B894]/20 rounded-2xl p-6 text-center">
            <p className="text-lg font-semibold text-gray-800 mb-3">
              {isJa
                ? '「日本語を学ぶことで、人生が変わりました。Mediflow Academyはそのきっかけをくれます。」'
                : '"Học tiếng Nhật đã thay đổi cuộc đời tôi. Mediflow Academy cho bạn cơ hội đó."'
              }
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🇻🇳</span>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-sm">Dung</p>
                <p className="text-xs text-gray-500">
                  {isJa ? '介護福祉士 / 医療通訳 / 日本看護師 / Mediflow Academy監修者' : 'Điều dưỡng viên / Phiên dịch y tế / Y tá Nhật / Giám sát Mediflow Academy'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.title')}</h2>
            <p className="text-gray-600">
              {isJa ? 'N5〜N1まで全コース無料で始められます' : 'Bắt đầu miễn phí với toàn bộ khóa học N5〜N1'}
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
                      <span className={feature.included ? 'text-gray-700 text-sm' : 'text-gray-400 text-sm'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.key === 'free' ? `/${locale}/auth/signup` : `/${locale}/pricing`}>
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0066CC] to-[#00B894] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Stethoscope className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isJa ? '今すぐ学習を始めよう' : 'Bắt đầu học ngay hôm nay'}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {isJa
              ? 'N5〜N1まで全コース無料。現役看護師とN1介護福祉士が監修した本物の教材で。'
              : 'Toàn bộ N5〜N1 miễn phí. Tài liệu thực tế do y tá và điều dưỡng N1 giám sát.'
            }
          </p>
          <Link href={`/${locale}/auth/signup`}>
            <Button
              size="xl"
              className="bg-white text-[#0066CC] hover:bg-blue-50 font-bold shadow-xl"
            >
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
