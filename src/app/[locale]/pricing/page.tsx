"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Sparkles,
  Crown,
  Star,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { STRIPE_PLANS } from "@/lib/stripe/config";

interface Plan {
  name: "free" | "standard" | "pro" | "premium";
  label: string;
  subtitle: string;
  priceMonthly: number;
  priceYearly: number;
  priceYearlyMonthly: number; // 年額÷12
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  ctaStyle: string;
  priceIdMonthly: string;
  priceIdYearly: string;
  isFree?: boolean;
  trialNote?: string;
}

const PLANS: Plan[] = [
  {
    name: "free",
    label: "無料",
    subtitle: "まずは試してみる",
    priceMonthly: 0,
    priceYearly: 0,
    priceYearlyMonthly: 0,
    icon: <Star className="w-5 h-5 text-gray-500" />,
    features: [
      "JLPT N5基礎コース（無料）",
      "AI家庭教師（1日5回まで）",
      "求人情報の閲覧",
      "コース一覧の閲覧",
    ],
    cta: "無料ではじめる",
    ctaStyle: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    priceIdMonthly: "",
    priceIdYearly: "",
    isFree: true,
  },
  {
    name: "standard",
    label: "スタンダード",
    subtitle: "本格的に日本語を学ぶなら",
    priceMonthly: 980,
    priceYearly: 9800,
    priceYearlyMonthly: Math.round(9800 / 12),
    icon: <Sparkles className="w-5 h-5 text-blue-500" />,
    features: [
      "全JLPTコース（N5〜N3）",
      "AI家庭教師（無制限）",
      "介護基礎日本語コース",
      "AIによる個別学習プラン生成",
      "求人マッチング機能",
    ],
    cta: "7日間無料で試す",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700",
    priceIdMonthly: STRIPE_PLANS.standard.monthly,
    priceIdYearly: STRIPE_PLANS.standard.yearly,
    trialNote: "7日間無料・クレジットカード必要",
  },
  {
    name: "pro",
    label: "プロ",
    subtitle: "資格取得・就職を目指すなら",
    priceMonthly: 1980,
    priceYearly: 19800,
    priceYearlyMonthly: Math.round(19800 / 12),
    badge: "人気No.1",
    badgeColor: "bg-purple-100 text-purple-700",
    icon: <Crown className="w-5 h-5 text-purple-500" />,
    features: [
      "スタンダードの全機能",
      "介護福祉士・特定技能 試験対策",
      "現役看護師のライブ講座（月4回）",
      "録画アーカイブ（見放題）",
      "個別学習相談（月1回）",
    ],
    cta: "7日間無料で試す",
    ctaStyle: "bg-gradient-to-r from-purple-600 to-primary-600 text-white hover:opacity-90 shadow-lg",
    priceIdMonthly: STRIPE_PLANS.pro.monthly,
    priceIdYearly: STRIPE_PLANS.pro.yearly,
    trialNote: "7日間無料・クレジットカード必要",
  },
  {
    name: "premium",
    label: "プレミアム",
    subtitle: "最速で合格・就職を実現",
    priceMonthly: 3980,
    priceYearly: 39800,
    priceYearlyMonthly: Math.round(39800 / 12),
    badge: "就職保証",
    badgeColor: "bg-yellow-100 text-yellow-700",
    icon: <Crown className="w-5 h-5 text-yellow-500" />,
    features: [
      "プロの全機能",
      "マンツーマン指導（月2回・30分）",
      "履歴書添削・面接練習",
      "優先求人紹介",
      "Mediflow就職保証プログラム",
      "介護福祉士試験 合格保証",
    ],
    cta: "7日間無料で試す",
    ctaStyle: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90 shadow-lg",
    priceIdMonthly: STRIPE_PLANS.premium.monthly,
    priceIdYearly: STRIPE_PLANS.premium.yearly,
    trialNote: "7日間無料・クレジットカード必要",
  },
];

const FAQ = [
  {
    q: "無料トライアルはいつでもキャンセルできますか？",
    a: "はい、7日間の無料トライアル期間中はいつでもキャンセル可能です。キャンセルすれば費用は一切かかりません。",
  },
  {
    q: "支払い方法は何が使えますか？",
    a: "Visa、Mastercard、American Express、JCBなどのクレジットカード・デビットカードが使えます。",
  },
  {
    q: "プランはいつでも変更できますか？",
    a: "はい、いつでもプランのアップグレード・ダウングレードが可能です。変更は即時反映されます。",
  },
  {
    q: "年払いに変更するとどれくらいお得ですか？",
    a: "スタンダード：約2ヶ月分（¥5,960）、プロ：約2ヶ月分（¥11,960）、プレミアム：約2ヶ月分（¥19,600）お得です。",
  },
  {
    q: "法人プランについて教えてください。",
    a: "5名以上の場合は1人あたり¥4,980/月（月払い）の法人プランをご利用いただけます。お問い合わせフォームまたはメール（mediflow1002@gmail.com）でご連絡ください。",
  },
  {
    q: "介護福祉士試験の合格保証とは？",
    a: "Premiumプランで試験対策コースを修了・模試を3回以上受験した場合、万が一不合格でも次回試験まで無料でプレミアムを継続延長します。",
  },
];

export default function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSelectPlan = async (plan: Plan) => {
    if (plan.isFree) {
      router.push(`/${locale}/auth/signup`);
      return;
    }

    const priceId = isYearly ? plan.priceIdYearly : plan.priceIdMonthly;

    if (!priceId) {
      alert("年払いは現在準備中です。月払いをご利用ください。");
      return;
    }

    setLoadingPlan(plan.name);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/${locale}/auth/signup?redirectTo=/${locale}/pricing`);
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          billingCycle: isYearly ? "yearly" : "monthly",
        }),
      });

      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        alert(`決済の開始に失敗しました。\n${data.error ?? "しばらく経ってから再度お試しください。"}`);
      }
    } catch (err) {
      console.error("Checkout fetch error:", err);
      alert("通信エラーが発生しました。インターネット接続を確認してください。");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-16 pb-8 text-center">
        <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          7日間 無料トライアル実施中
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          現場のプロから学ぶ、<br className="sm:hidden" />選べる4プラン
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          13年の臨床経験を持つ現役看護師と、ベトナム人バイリンガル講師が<br className="hidden sm:block" />
          あなたの日本語・資格・就職をサポートします。
        </p>

        {/* 月額 / 年額 切替 */}
        <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              !isYearly ? "bg-primary-500 text-white shadow" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            月払い
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isYearly ? "bg-primary-500 text-white shadow" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            年払い
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
              isYearly ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
            }`}>
              2ヶ月分お得
            </span>
          </button>
        </div>
      </div>

      {/* プランカード */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const displayPrice = isYearly ? plan.priceYearlyMonthly : plan.priceMonthly;
            const isPopular = plan.name === "pro";

            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl border-2 flex flex-col overflow-hidden transition-shadow hover:shadow-xl ${
                  isPopular
                    ? "border-purple-400 shadow-lg shadow-purple-100"
                    : "border-gray-100"
                }`}
              >
                {/* 人気バッジ */}
                {isPopular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-primary-500" />
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* プラン名 */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {plan.icon}
                        <h3 className="font-bold text-gray-900">{plan.label}</h3>
                      </div>
                      <p className="text-xs text-gray-500">{plan.subtitle}</p>
                    </div>
                    {plan.badge && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* 価格 */}
                  <div className="mb-5">
                    {plan.isFree ? (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">¥0</span>
                        <span className="text-gray-400 text-sm ml-1">/月</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          ¥{displayPrice.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">/月</span>
                        {isYearly && (
                          <div className="text-xs text-green-600 font-medium mt-0.5">
                            年払い ¥{plan.priceYearly.toLocaleString()}/年
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 機能一覧 */}
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={loadingPlan === plan.name}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle} disabled:opacity-60`}
                    >
                      {loadingPlan === plan.name ? "処理中..." : plan.cta}
                    </button>
                    {plan.trialNote && (
                      <p className="text-xs text-center text-gray-400">{plan.trialNote}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 法人プラン */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">法人プラン</h3>
              <p className="text-white/70 text-sm mb-2">
                介護施設・送り出し機関向け。5名から
                <span className="text-white font-semibold">¥4,980/人/月</span>
              </p>
              <p className="text-white/60 text-xs">
                スタッフ進捗管理・一括請求・専任サポート付き
              </p>
            </div>
            <a
              href="mailto:mediflow1002@gmail.com?subject=%E6%B3%95%E4%BA%BA%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"
              className="flex-shrink-0 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
            >
              お問い合わせ
            </a>
          </div>
        </div>

        {/* 講師紹介 */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">あなたを教えるのは「本物のプロ」</h2>
          <p className="text-gray-500 text-sm mb-8">一般的なeラーニングとは違います</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-left shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                👨‍⚕️
              </div>
              <h3 className="font-bold text-gray-900 mb-1">うつみ先生</h3>
              <p className="text-xs text-primary-600 font-semibold mb-3">現役看護師・Mediflow代表</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />13年の臨床経験（病院・特養・訪問）</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />外国人スタッフの教育経験あり</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />「現場で起きた実例」で教える</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-left shadow-sm">
              <div className="w-12 h-12 bg-secondary-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
                👩‍🏫
              </div>
              <h3 className="font-bold text-gray-900 mb-1">バイリンガル講師</h3>
              <p className="text-xs text-secondary-600 font-semibold mb-3">ベトナム人看護師・日本語N1</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />介護福祉士 + 看護師 + 日本語N1</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />EPA出身・外国人の苦労を知っている</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />ベトナム語で微妙なニュアンスを解説</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">よくある質問</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 最終CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            まずは無料ではじめましょう
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            登録は1分。クレジットカード不要。いつでもアップグレードできます。
          </p>
          <Link
            href={`/${locale}/auth/signup`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg"
          >
            <Sparkles className="w-5 h-5" />
            無料で登録する
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            ご質問は{" "}
            <a href="mailto:mediflow1002@gmail.com" className="underline hover:text-gray-600">
              mediflow1002@gmail.com
            </a>{" "}
            までお気軽にどうぞ
          </p>
        </div>
      </div>
    </div>
  );
}
