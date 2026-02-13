'use client';


import { Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { signIn } from 'next-auth/react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0a0f1e]/90 border-b border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BusinessReviewBot</span>
          </Link>


          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-[#00c2ffe transition-colors font-medium relative group">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-[#00c2ff] transition-colors font-medium relative group">
              Pricing
            </Link>
            <button onClick={() => signIn('google')} className="text-gray-300 hover:text-white transition-colors font-medium">Sign In</button>
            <button onClick={() => signIn('google')} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold hover:opacity-90">Get Started</button>
          </div>


          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg bg-white/10">
              {isOpen ? <X className=(ËMMÂóâ¢ÄÖVçR6Æ74æÖSÒÜ´Ø ´Ø />}
