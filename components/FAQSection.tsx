'use client';

import {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the AI generate responses?',
    answer: 'Our AI uses advanced natural language processing to analyze the sentiment and content of your reviews. It then crafts a personalized, professional response that addresses specific points mentioned by the customer while maintaining your brand voice.',
  },
  {
    question: 'Does it work with Google Business Profile?',
    answer: 'Yes! We offer seamless integration with Google Business Profile. You can view and reply to all your Google reviews directly from our dashboard.',
  },
  {
    question: 'Can I customize the response style?',
    answer: 'Absolutely. You can set your preferred tone (professional, friendly, casual) and even provide specific instructions or keywords you want the AI to include or avoid.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 7-day free trial with full access to all features so you can experience the time-saving benefits yourself.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0f1e]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about BusinessReviewBot.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
