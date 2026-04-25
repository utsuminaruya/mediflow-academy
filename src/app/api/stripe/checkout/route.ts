import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { plan, locale = 'ja' } = await request.json();

    if (!plan || !['basic', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Stripe secret key のバリデーション
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey.includes('placeholder') || !secretKey.startsWith('sk_')) {
      return NextResponse.json(
        { error: 'stripe_not_configured' },
        { status: 503 }
      );
    }

    const priceId =
      plan === 'basic'
        ? process.env.STRIPE_BASIC_PRICE_ID
        : process.env.STRIPE_PRO_PRICE_ID;

    if (!priceId || priceId.includes('placeholder')) {
      return NextResponse.json(
        { error: 'stripe_not_configured' },
        { status: 503 }
      );
    }

    // 認証済みユーザーを取得
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in first.' },
        { status: 401 }
      );
    }

    // Requestのoriginを使う（localhost対策）
    const origin = request.headers.get('origin')
      || process.env.NEXT_PUBLIC_APP_URL
      || 'https://mediaca.vercel.app';

    // Stripe を動的インポート（プレースホルダー時に throw させない）
    const StripeLib = (await import('stripe')).default;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripe = new StripeLib(secretKey, { apiVersion: '2025-02-24.acacia' as any });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/${locale}/dashboard?checkout=success&plan=${plan}`,
      cancel_url: `${origin}/${locale}/pricing?checkout=cancelled`,
      metadata: { userId: user.id, plan },
      subscription_data: {
        trial_period_days: 7,
        metadata: { userId: user.id, plan },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      payment_method_collection: 'always',
      ...(user.email ? { customer_email: user.email } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
