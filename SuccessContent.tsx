'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              Welcome to Full Access!
              <Sparkles className="w-8 h-8 text-violet-500" />
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for subscribing to BusinessReviewBot! Your payment was successful and your account has been activated.
            </p>

            {/* Features Unlocked */}
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                You now have access to:
              </h2>
              <ul className="space-y-3">
                {[
                  'AI-powered review responses for Google and Yelp',
                  'Professional, branded responses that match your voice',
                  'Unlimited review processing',
                  'Priority support',
                  'Regular updates and improvements'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Session ID (for reference) */}
            {sessionId && (
              <div className="text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-1">Order confirmation:</p>
                <p className="font-mono text-xs break-all">{sessionId}</p>
              </div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Support Note */}
            <p className="text-sm text-gray-500 mt-8">
              Need help getting started? Contact our support team anytime.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>A confirmation email has been sent to your email address.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
