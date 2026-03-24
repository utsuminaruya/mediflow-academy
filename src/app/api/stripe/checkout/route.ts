import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = await request.json();
    const { priceId, billingCycle } = body as {
      priceId: string;
      billingCycle: "monthly" | "yearly";
    };

    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 });
    }

    // 既存のStripe Customer IDを確認
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId: string;

    if (subscription?.stripe_customer_id) {
      customerId = subscription.stripe_customer_id;
    } else {
      // Stripe Customerを新規作成
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    // リクエストのOriginヘッダーからURLを自動取得（env var設定ミスを防ぐ）
    const origin = request.headers.get("origin");
    const appUrl = origin ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://mediflow-academy.vercel.app";

    // Stripe Checkoutセッション作成
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/ja/dashboard?upgraded=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/ja/pricing?canceled=true`,
      // Webhookで使うためセッションのmetadataにもユーザー情報を設定
      metadata: {
        supabase_user_id: user.id,
        billing_cycle: billingCycle,
      },
      subscription_data: {
        trial_period_days: 7,   // 7日間無料トライアル
        metadata: {
          supabase_user_id: user.id,
        },
      },
      locale: "ja",
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Stripe checkout error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
