import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getSupabasePlanId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  planName: string
): Promise<string | null> {
  const { data } = await supabase
    .from("subscription_plans")
    .select("id")
    .eq("name", planName)
    .single();
  return data?.id ?? null;
}

/** Stripe Price IDからプラン名を解決 */
function resolvePlanName(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY ?? ""]: "standard",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_YEARLY  ?? ""]: "standard",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY      ?? ""]: "pro",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY       ?? ""]: "pro",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_MONTHLY  ?? ""]: "premium",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_YEARLY   ?? ""]: "premium",
  };
  return map[priceId] ?? "standard";
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // セッション作成時に metadata.supabase_user_id を設定している
        const userId = session.metadata?.supabase_user_id ?? "";
        const billingCycle = (session.metadata?.billing_cycle as "monthly" | "yearly") ?? "monthly";

        if (!userId || !session.subscription) break;

        const subId = typeof session.subscription === "string"
          ? session.subscription
          : session.subscription.id;

        const sub = await stripe.subscriptions.retrieve(subId) as Stripe.Subscription;
        const priceId = sub.items.data[0]?.price.id ?? "";
        const planName = resolvePlanName(priceId);
        const planId = await getSupabasePlanId(supabase, planName);

        await supabase.from("user_subscriptions").upsert({
          user_id: userId,
          plan_id: planId,
          stripe_customer_id: typeof session.customer === "string"
            ? session.customer
            : session.customer?.id ?? "",
          stripe_subscription_id: subId,
          status: sub.status,
          billing_cycle: billingCycle,
          current_period_start: new Date(
            (sub as unknown as { current_period_start: number }).current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            (sub as unknown as { current_period_end: number }).current_period_end * 1000
          ).toISOString(),
          trial_end: (sub as unknown as { trial_end: number | null }).trial_end
            ? new Date(
                ((sub as unknown as { trial_end: number }).trial_end) * 1000
              ).toISOString()
            : null,
        }, { onConflict: "user_id" });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription & {
          current_period_start: number;
          current_period_end: number;
          trial_end: number | null;
        };

        await supabase.from("user_subscriptions").update({
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          trial_end: sub.trial_end
            ? new Date(sub.trial_end * 1000).toISOString()
            : null,
        }).eq("stripe_subscription_id", sub.id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const freePlanId = await getSupabasePlanId(supabase, "free");

        await supabase.from("user_subscriptions").update({
          status: "canceled",
          plan_id: freePlanId,
        }).eq("stripe_subscription_id", sub.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
        if (invoice.subscription) {
          await supabase.from("user_subscriptions").update({
            status: "past_due",
          }).eq("stripe_subscription_id", invoice.subscription);
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
