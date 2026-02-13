'use client';

import { Sparkles, Twitter, Linkedin, Fithub, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[0a0f1e] py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="text-[#00c2ff]" />
          <span className="text-white font-bold text-xl">BusinessReviewBot</span>
        </div>
        <p className="text-gray-400 mb-8">Â© 2026 BusinessReviewBot. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Twitter className="text-gray-400 hover:text-white cursor-pointer" />
          <Linkedin className="text-gray-400 hover:text-white cursor-pointer" />
          <Github className="text-gray-400 hover:text-white cursor-pointer" />
          <Mail className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
