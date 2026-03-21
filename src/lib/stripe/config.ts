// Stripe プランID設定
// Stripeダッシュボードで作成したPrice IDをここに設定する
// 未設定の場合は環境変数から取得、それも未設定なら空文字（Checkout時にエラー）

export const STRIPE_PLANS = {
  standard: {
    monthly: process.env.STRIPE_PRICE_STANDARD_MONTHLY ?? "",  // ¥2,980/月
    yearly: process.env.STRIPE_PRICE_STANDARD_YEARLY ?? "",    // ¥29,800/年
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",       // ¥5,980/月
    yearly: process.env.STRIPE_PRICE_PRO_YEARLY ?? "",         // ¥59,800/年
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? "",   // ¥9,800/月
    yearly: process.env.STRIPE_PRICE_PREMIUM_YEARLY ?? "",     // ¥98,000/年
  },
} as const;

export type PlanName = "free" | "standard" | "pro" | "premium";

export const PLAN_HIERARCHY: PlanName[] = ["free", "standard", "pro", "premium"];

/** プランAがプランBより上位かどうか */
export function planIsAtLeast(userPlan: PlanName, requiredPlan: PlanName): boolean {
  return PLAN_HIERARCHY.indexOf(userPlan) >= PLAN_HIERARCHY.indexOf(requiredPlan);
}
