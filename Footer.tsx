'use client';

import { Sparkles, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#00c2ff]/10 to-[#8b5cf6]/10 border border-white/20 rounded-2xl p-12 hover:border-white/30 transition-all shadow-2xl glass">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to Automate Your{' '}
                <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent">
                  Reviews?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses saving time and improving their online reputation with AI-powered review responses.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/api/auth/signin"
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold text-lg hover:opacity-90 transition-all pulse-glow flex items-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-[#00c2ff]/50"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#pricing"
                  className="px-8 py-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all hover:scale-105 hover:border-white/40"
                >
                  View Pricing
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-6 flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <CheckIcon /> No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <CheckIcon /> 7-day free trial
                </span>
                <span className="flex items-center gap-1">
                  <CheckIcon /> Cancel anytime
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {[
                  { href: '#features', label: 'Features' },
                  { href: '#pricing', label: 'Pricing' },
                  { href: '#demo', label: 'Demo' },
                  { href: '/api/auth/signin', label: 'Sign In' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-[#00c2ff] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Blog', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link href={item === 'FAQ' ? '#faq' : '#'} className="text-gray-400 hover:text-[#00c2ff] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-[#00c2ff] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-[#00c2ff] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6"
          >
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] p-2 rounded-lg hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">BusinessReviewBot</span>
            </div>

            <div className="flex items-center space-x-6">
              {[
                { Icon: Twitter, href: 'https://twitter.com' },
                { Icon: Linkedin, href: 'https://linkedin.com' },
                { Icon: Github, href: 'https://github.com' },
                { Icon: Mail, href: 'mailto:support@businessreviewbot.com' },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 hover:text-[#00c2ff] transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-gray-400 text-sm">
              © 2026 BusinessReviewBot. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#00c2ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
