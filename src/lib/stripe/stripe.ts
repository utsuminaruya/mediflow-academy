import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
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
