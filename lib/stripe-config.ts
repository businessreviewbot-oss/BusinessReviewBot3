export type PlanType = 'full-access';
export type BillingPeriod = 'monthly' | 'annual';
export interface StripePlanConfig { productId?: string; priceId?: string; }
export const STRIPE_PLANS: Record<PlanType, Record<BillingPeriod, StripePlanConfig>> = {
  'full-access': {
    monthly: { productId: 'prod_TsR0ERR4depiXd' },
    annual: { productId: 'prod_TsR22qVumoQF5s' },
  },
};
export function getStripePlanConfig(planType: PlanType, billingPeriod: BillingPeriod): StripePlanConfig {
  return STRIPE_PLANS[planType][billingPeriod];
}
export function normalizePlanName(planName: string): PlanType { return 'full-access'; }
