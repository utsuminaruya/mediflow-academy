import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email } = await request.json();

    if (!plan || !['basic', 'pro'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const priceId =
      plan === 'basic'
        ? process.env.STRIPE_BASIC_PRICE_ID
        : process.env.STRIPE_PRO_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured' },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/ja/dashboard?checkout=success&plan=${plan}`,
      cancel_url: `${appUrl}/ja/pricing?checkout=cancelled`,
      metadata: {
        userId: userId || '',
        plan,
      },
      subscription_data: {
        metadata: {
          userId: userId || '',
          plan,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
