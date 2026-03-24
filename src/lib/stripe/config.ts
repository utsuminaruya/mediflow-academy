// Stripe プランID設定
// Stripeダッシュボードで作成したPrice IDをここに設定する
// 未設定の場合は環境変数から取得、それも未設定なら空文字（Checkout時にエラー）

// NEXT_PUBLIC_ プレフィックス付き → クライアント・サーバー両方で参照可能
// 環境変数が未設定の場合はStripeダッシュボードで作成済みのPrice IDをフォールバックとして使用
export const STRIPE_PLANS = {
  standard: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY ?? "price_1TELbdRvKWeX2rf354AbfYhq",
    yearly:  process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_YEARLY  ?? "",
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY ?? "price_1TELbiRvKWeX2rf3Ab4NWRfy",
    yearly:  process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY  ?? "",
  },
  premium: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY ?? "price_1TELboRvKWeX2rf3DbPOggcz",
    yearly:  process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_YEARLY  ?? "",
  },
} as const;

export type PlanName = "free" | "standard" | "pro" | "premium";

export const PLAN_HIERARCHY: PlanName[] = ["free", "standard", "pro", "premium"];

/** プランAがプランBより上位かどうか */
export function planIsAtLeast(userPlan: PlanName, requiredPlan: PlanName): boolean {
  return PLAN_HIERARCHY.indexOf(userPlan) >= PLAN_HIERARCHY.indexOf(requiredPlan);
}
