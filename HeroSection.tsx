'use client';

import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00c2ff]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b5cf6]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00c2ff]/10 rounded-full blur-3xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 mb-8"
          >
            <Star className="w-4 h-4 text-[#00c2ff] fill-[#00c2ff]" />
            <span className="text-sm text-gray-300 font-medium">Trusted by 500+ businesses worldwide</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Reply to Reviews{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent animate-pulse">
              5x Faster
            </span>
            <br />
            Boost Your Local SEO{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#00c2ff] bg-clip-text text-transparent">
              Automatically
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Harness the power of AI to craft personalized, professional responses to every review.
            Save time, build trust, and climb the local search rankings.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/api/auth/signin"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold text-lg hover:opacity-90 transition-all pulse-glow flex items-center gap-2 w-full sm:w-auto justify-center hover:scale-105 hover:shadow-2xl hover:shadow-[#00c2ff]/50"
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all w-full sm:w-auto text-center hover:scale-105 hover:border-white/40"
            >
              View Pricing
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00c2ff]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00c2ff]" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00c2ff]" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>

            {/* Trusted by logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8"
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Trusted by businesses worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {['Local Cafe', 'Dental Pro', 'Auto Shop', 'Hair Salon', 'Fitness Hub'].map((name) => (
                  <div
                    key={name}
                    className="h-8 px-8 flex items-center justify-center backdrop-blur-lg bg-white/10 rounded-lg text-gray-400 font-semibold border border-white/10 hover:border-white/20 transition-all hover:scale-110"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { delay: 1.5, duration: 2, repeat: Infinity }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
