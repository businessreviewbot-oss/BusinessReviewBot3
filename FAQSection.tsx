'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How does the 7-day free trial work?',
    answer: 'Start using BusinessReviewBot immediately with full access to all features. No credit card required. After 7 days, choose a plan that fits your needs or cancel anytime with no charges.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: "Absolutely! Cancel anytime with just one click from your dashboard. No questions asked, no hidden fees. If you cancel, you'll have access until the end of your billing period.",
  },
  {
    question: 'How secure is my data?',
    answer: 'Your data security is our top priority. We use bank-level encryption (AES-256) and comply with GDPR and SOC 2 standards. Your review data is never shared with third parties and is stored on secure, encrypted servers.',
  },
  {
    question: 'Which review platforms do you support?',
    answer: "Currently, we support Google Business Profile (Google My Business). Support for Yelp, Facebook, and TripAdvisor is coming soon. Let us know which platforms you'd like to see next!",
  },
  {
    question: 'Can I customize the AI responses?',
    answer: 'Yes! You can create custom response templates, set tone preferences, and train the AI to match your brand voice. The AI learns from your edits to provide better responses over time.',
  },
  {
    question: 'What if I have multiple business locations?',
    answer: 'Manage reviews from all your locations in one dashboard, with customized response templates for each location.',
  },
  {
    question: 'How accurate is the sentiment analysis?',
    answer: 'Our AI-powered sentiment analysis has a 95%+ accuracy rate in detecting positive, negative, and mixed reviews. It analyzes context, tone, and specific keywords to generate appropriate responses.',
  },
  {
    question: 'Do you offer refunds?',
    answer: "Yes! If you're not satisfied within the first 30 days, we offer a full money-back guarantee. No questions asked. We're confident you'll love BusinessReviewBot.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about BusinessReviewBot
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all glass"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
              >
                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#00c2ff] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center backdrop-blur-lg bg-gradient-to-r from-[#00c2ff]/10 to-[#8b5cf6]/10 border border-white/20 rounded-xl p-8"
        >
          <MessageCircle className="w-12 h-12 text-[#00c2ff] mx-auto mb-4" />
          <p className="text-gray-300 mb-4 text-lg">Still have questions?</p>
          <a
            href="mailto:support@businessreviewbot.com"
            className="inline-flex items-center gap-2 text-[#00c2ff] hover:text-[#8b5cf6] transition-colors font-semibold text-lg"
          >
            Contact our support team
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
