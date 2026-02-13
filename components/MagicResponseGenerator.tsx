'use client';

import {  useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function MagicResponseGenerator() {
  const [review, setReview] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateResponse = async () => {
    if (!review) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/magic-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-20 px-4 bg-[#0a0f1e]">
      <div className="max-w-4xl mx-auto bg-white/5 rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center text-sky-400">Try the Magic Response Generator</h2>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Paste a customer review here... (e.g., 'The service was excellent but the wait time was too long.')"
          className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-6 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
        <button
          onClick={generateResponse}
          disabled={isLoading || !review}
          className="w-full py-4 bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : (<><Sparkles /> Generate Response</>)}
        </button>
        {response && (
          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10 relative shadow-2xl shadow-sky-500/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-gray-300 leading-relaxed">{response}</p>
            <button onClick={copyToClipboard} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              {copied ? <Check className="text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
