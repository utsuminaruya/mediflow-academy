"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { planIsAtLeast, type PlanName } from "@/lib/stripe/config";

interface SubscriptionState {
  plan: PlanName;
  isLoading: boolean;
  isPro: boolean;
  isPremium: boolean;
  isStandard: boolean;
  isFree: boolean;
  /** 指定プラン以上のプランを持っているか確認 */
  canAccess: (requiredPlan: PlanName) => boolean;
}

const DEFAULT_STATE: SubscriptionState = {
  plan: "free",
  isLoading: true,
  isPro: false,
  isPremium: false,
  isStandard: false,
  isFree: true,
  canAccess: () => false,
};

function makeState(plan: PlanName): SubscriptionState {
  return {
    plan,
    isLoading: false,
    isPro: plan === "pro" || plan === "premium",
    isPremium: plan === "premium",
    isStandard: plan === "standard" || plan === "pro" || plan === "premium",
    isFree: plan === "free",
    canAccess: (required: PlanName) => planIsAtLeast(plan, required),
  };
}

export function useSubscription(): SubscriptionState {
  const [state, setState] = useState<SubscriptionState>(DEFAULT_STATE);

  useEffect(() => {
    const supabase = createClient();

    const fetchSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setState(makeState("free"));
        return;
      }

      const { data } = await supabase
        .from("user_subscriptions")
        .select(`
          status,
          subscription_plans (name)
        `)
        .eq("user_id", user.id)
        .in("status", ["active", "trialing"])
        .maybeSingle();

      const rawName = (data?.subscription_plans as { name?: string } | null)?.name;
      const plan: PlanName =
        rawName === "standard" || rawName === "pro" || rawName === "premium"
          ? rawName
          : "free";

      setState(makeState(plan));
    };

    fetchSubscription();

    // ログイン状態が変わったら再取得
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchSubscription();
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
