'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CanceledNotification() {
  const searchParams = useSearchParams();
  const [showCanceledMessage, setShowCanceledMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('canceled') === 'true') {
      setShowCanceledMessage(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShowCanceledMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <AnimatePresence>
      {showCanceledMessage && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-3">
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Payment Canceled</p>
              <p className="text-gray-600 text-sm mt-1">
                Your checkout was canceled. No charges were made. Feel free to try again when you're ready!
              </p>
            </div>
            <button
              onClick={() => setShowCanceledMessage(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
