'use client';

import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { normalizePlanName, getStripePlanConfig } from '@/lib/stripe-config';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleCheckout = async (planName: string, price: number, billingPeriod: 'monthly' | 'annual') => {
    try {
      const planType = normalizePlanName(planName);
      const stripeConfig = getStripePlanConfig(planType, billingPeriod);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: planType,
          billingPeriod,
          price,
          productId: stripeConfig.productId,
          priceId: stripeConfig.priceId,
        }),
      });
      if (!response.ok) throw new Error('Failed to create checkout session');
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  const plans = [
    {
      name: 'Full Access',
      description: 'Everything you need to manage your online reputation',
      monthlyPrice: 29,
      annualPrice: 299,
      features: [
        'Unlimited review responses per month',
        'Google Business integration',
        'Advanced AI sentiment analysis',
        'Priority email support',
        '7-day free trial',
      ],
      cta: 'Start Free Trial',
      popular: true,
      icon: Sparkles,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:py-26 lg:px-8 relative">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
      </div>
    </section>
  );
}
