import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return _stripe;
}

// Keep backward compat alias (lazily evaluated)
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: {
      courses: ['N5'],
      aiMessages: 5,
      careJapanese: false,
      careerAI: false,
      jobPlacement: false,
    },
  },
  basic: {
    name: 'Basic',
    price: 980,
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: {
      courses: ['N5', 'N4'],
      aiMessages: -1, // unlimited
      careJapanese: false,
      careerAI: false,
      jobPlacement: false,
    },
  },
  pro: {
    name: 'Pro',
    price: 1980,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: {
      courses: ['N5', 'N4', 'N3', 'N2', 'N1'],
      aiMessages: -1, // unlimited
      careJapanese: true,
      careerAI: true,
      jobPlacement: true,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;
