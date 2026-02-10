'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { normalizePlanName, getStripePlanConfig } from '@/lib/stripe-config';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Stripe Checkout Handler
  const handleCheckout = async (planName: string, price: number, billingPeriod: 'monthly' | 'annual') => {
    try {
      // Get Stripe configuration for the selected plan
      const planType = normalizePlanName(planName);
      const stripeConfig = getStripePlanConfig(planType, billingPeriod);

      // Make API request to create Stripe checkout session
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

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // TODO: Show user-friendly error message
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
      href: '/api/auth/signin',
      popular: true,
      icon: Sparkles,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business. Cancel anytime, no questions asked.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'} transition-colors`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-white/10 border border-white/20 transition-all hover:border-white/30"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] shadow-lg"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-white' : 'text-gray-400'} transition-colors`}>
              Annual
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white text-sm font-semibold shadow-lg"
              >
                Save up to 68%
              </motion.span>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative backdrop-blur-xl rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-white/10 to-white/5 border-2 border-[#00c2ff] shadow-2xl shadow-[#00c2ff]/20'
                  : 'bg-white/5 border border-white/10'
              } hover:shadow-2xl transition-all duration-300 glass`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white text-sm font-semibold shadow-lg pulse-glow">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${plan.popular ? 'from-[#00c2ff] to-[#8b5cf6]' : 'from-gray-600 to-gray-700'} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-lg">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-gray-400 mt-2">
                    That's only <span className="text-[#00c2ff] font-semibold">${(plan.annualPrice / 12).toFixed(0)}/month</span> - save {Math.round((1 - plan.annualPrice / (plan.monthlyPrice * 12)) * 100)}%
                  </p>
                )}
              </div>

              <button
                onClick={() => handleCheckout(
                  plan.name,
                  isAnnual ? plan.annualPrice : plan.monthlyPrice,
                  isAnnual ? 'annual' : 'monthly'
                )}
                className={`block w-full px-6 py-3.5 rounded-xl font-semibold text-center mb-6 transition-all hover:scale-105 hover:shadow-lg cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white hover:opacity-90 hover:shadow-[#00c2ff]/50 pulse-glow'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-[#00c2ff] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Need a custom solution?</h3>
          <p className="text-gray-400 mb-4">
            Enterprise plans with custom features, dedicated support, and volume pricing available.
          </p>
          <a
            href="mailto:enterprise@businessreviewbot.com"
            className="inline-flex items-center gap-2 text-[#00c2ff] hover:text-[#8b5cf6] transition-colors font-semibold"
          >
            Contact our sales team
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
