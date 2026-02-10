'use client';

import { Shield, CreditCard, BarChart3, Zap, Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Google Sign-In',
    description: 'Secure, one-click authentication with your Google Business account. No complicated setup required.',
    color: 'from-[#00c2ff] to-[#0099cc]',
  },
  {
    icon: CreditCard,
    title: 'Stripe Billing',
    description: 'Enterprise-grade payment processing with bank-level security. Cancel anytime, no questions asked.',
    color: 'from-[#8b5cf6] to-[#6d28d9]',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboard',
    description: 'Monitor all your reviews, responses, and analytics in one beautiful, intuitive interface.',
    color: 'from-[#00c2ff] to-[#8b5cf6]',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Responses',
    description: 'AI-powered responses generated in seconds. Reply to reviews 5x faster than manual typing.',
    color: 'from-[#8b5cf6] to-[#00c2ff]',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected with industry-leading security protocols.',
    color: 'from-[#00c2ff] to-[#0099cc]',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description: 'Boost your local search rankings with consistent, engaging review responses.',
    color: 'from-[#8b5cf6] to-[#6d28d9]',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with the latest technology to give you a seamless, secure experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:-translate-y-2 glass"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00c2ff] transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>

              {/* Hover effect indicator */}
              <div className="mt-4 flex items-center gap-2 text-[#00c2ff] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { stat: '500+', label: 'Active Businesses' },
            { stat: '50K+', label: 'Reviews Managed' },
            { stat: '5x', label: 'Faster Response Time' },
            { stat: '99.9%', label: 'Uptime Guarantee' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
                {item.stat}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
