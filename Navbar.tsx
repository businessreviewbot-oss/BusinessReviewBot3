'use client';

import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#demo', label: 'Demo' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ];

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0a0f1e]/90 border-b border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BusinessReviewBot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#00c2ff] transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <button
              onClick={handleSignIn}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </button>
            <button
              onClick={handleSignIn}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00c2ff]/50"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 backdrop-blur-lg bg-[#0a0f1e]/95"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignIn();
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignIn();
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold text-center hover:opacity-90 transition-all"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
