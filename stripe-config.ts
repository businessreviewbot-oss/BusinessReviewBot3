/**
 * Stripe Product and Price Configuration
 *
 * NOTE: For Stripe subscriptions, it's recommended to use Price IDs (starting with 'price_')
 * rather than Product IDs (starting with 'prod_'). Price IDs directly reference a specific
 * pricing model (amount + interval), while Product IDs require additional configuration.
 *
 * We're working with the Product ID provided, but ideally you should:
 * 1. Go to your Stripe Dashboard
 * 2. Navigate to Products > [Your Product] > Pricing
 * 3. Copy the Price ID (e.g., 'price_xxxxx') for each billing interval
 */

export type PlanType = 'full-access';
export type BillingPeriod = 'monthly' | 'annual';

export interface StripePlanConfig {
  productId?: string; // Product ID (prod_xxxxx)
  priceId?: string;   // Price ID (price_xxxxx) - preferred for subscriptions
}

/**
 * Stripe plan mappings
 * Maps our internal plan structure to Stripe Product/Price IDs
 */
export const STRIPE_PLANS: Record<PlanType, Record<BillingPeriod, StripePlanConfig>> = {
  'full-access': {
    monthly: {
      productId: 'prod_TsR0ERR4depiXd',
    },
    annual: {
      productId: 'prod_TsR22qVUmoQF5s',
    },
  },
};

/**
 * Helper function to get Stripe configuration for a specific plan
 */
export function getStripePlanConfig(
  planType: PlanType,
  billingPeriod: BillingPeriod
): StripePlanConfig {
  const config = STRIPE_PLANS[planType][billingPeriod];

  if (!config.productId && !config.priceId) {
    throw new Error(
      `Stripe configuration missing for ${planType} ${billingPeriod} plan. ` +
      `Please add the Product ID or Price ID to lib/stripe-config.ts`
    );
  }

  return config;
}

/**
 * Helper to convert plan name to internal type
 */
export function normalizePlanName(planName: string): PlanType {
  const normalized = planName.toLowerCase().replace(/\s+/g, '-');
  if (normalized === 'full-access') return 'full-access';
  // Default to full-access for backward compatibility
  return 'full-access';
}
