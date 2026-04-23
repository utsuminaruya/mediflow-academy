/**
 * Stripe 商品カタログセットアップスクリプト
 * 実行: npx ts-node scripts/setup-stripe-products.ts
 *
 * 環境変数が必要:
 *   STRIPE_SECRET_KEY=sk_live_xxx または sk_test_xxx
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

async function main() {
  console.log('🚀 Stripe商品カタログをセットアップ中...\n');

  // ── 1. Basic プラン ────────────────────────────────────────────
  console.log('📦 Basicプランを作成中...');
  const basicProduct = await stripe.products.create({
    name: 'Mediflow Academy Basic',
    description: '全JLPTコース（N5-N4）+ AI家庭教師 無制限 + 介護の専門日本語',
    metadata: { plan: 'basic' },
  });

  const basicPrice = await stripe.prices.create({
    product: basicProduct.id,
    unit_amount: 980, // ¥980（JPYは最小通貨単位が1円 = 円そのまま）
    currency: 'jpy',
    recurring: { interval: 'month' },
    metadata: { plan: 'basic' },
  });

  console.log(`✅ Basic プラン作成完了`);
  console.log(`   Product ID: ${basicProduct.id}`);
  console.log(`   Price ID:   ${basicPrice.id}`);
  console.log(`   → STRIPE_BASIC_PRICE_ID=${basicPrice.id}\n`);

  // ── 2. Pro プラン ──────────────────────────────────────────────
  console.log('📦 Proプランを作成中...');
  const proProduct = await stripe.products.create({
    name: 'Mediflow Academy Pro',
    description: '全JLPTコース（N5-N1）+ AI無制限 + 介護専門日本語 + 就職サポートAI',
    metadata: { plan: 'pro' },
  });

  const proPrice = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 1980, // ¥1,980（JPY）
    currency: 'jpy',
    recurring: { interval: 'month' },
    metadata: { plan: 'pro' },
  });

  console.log(`✅ Pro プラン作成完了`);
  console.log(`   Product ID: ${proProduct.id}`);
  console.log(`   Price ID:   ${proPrice.id}`);
  console.log(`   → STRIPE_PRO_PRICE_ID=${proPrice.id}\n`);

  // ── 3. Supabase の subscription_plans テーブルを更新するSQL ──
  console.log('📋 以下のStripe Price IDをVercel環境変数に設定してください:\n');
  console.log('=====================================');
  console.log(`STRIPE_BASIC_PRICE_ID=${basicPrice.id}`);
  console.log(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
  console.log('=====================================\n');

  console.log('📋 以下のSQLをSupabaseで実行してください:\n');
  console.log(`UPDATE public.subscription_plans SET stripe_price_id_monthly = '${basicPrice.id}' WHERE name = 'basic';`);
  console.log(`UPDATE public.subscription_plans SET stripe_price_id_monthly = '${proPrice.id}' WHERE name = 'pro';`);

  console.log('\n✅ セットアップ完了！');
}

main().catch(console.error);
