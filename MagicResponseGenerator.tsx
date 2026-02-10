'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MagicResponseGenerator() {
  const [review, setReview] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleReviews = [
    {
      text: "Great service! The staff was friendly and helpful. Will definitely come back!",
      sentiment: "positive"
    },
    {
      text: "Good food but service was a bit slow. Overall decent experience.",
      sentiment: "mixed"
    },
    {
      text: "Absolutely terrible experience. Staff was rude and unprofessional. Will not return.",
      sentiment: "negative"
    },
  ];

  const generateResponse = async () => {
    if (!review.trim()) return;

    setIsGenerating(true);
    setResponse('');
    setCopied(false);

    try {
      // Call the actual API endpoint
      const apiResponse = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: review.trim(),
          businessName: 'Your Business', // Can be made dynamic later
          businessType: 'local business', // Can be made dynamic later
        }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await apiResponse.json();
      const generatedText = data.response;

      // Typewriter effect for the AI-generated response
      let index = 0;
      const interval = setInterval(() => {
        if (index < generatedText.length) {
          setResponse(generatedText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 15);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsGenerating(false);
      setResponse('Sorry, there was an error generating the response. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Magic Response{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Generator
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See the AI in action. Paste any review and watch it craft a perfect response instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:border-white/20 transition-all glass"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input side */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-white">Customer Review</label>
                <div className="flex gap-2">
                  {sampleReviews.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReview(sample.text)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-all hover:scale-105 border border-white/10 hover:border-white/20"
                    >
                      Sample {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Paste a customer review here..."
                className="w-full h-48 p-4 rounded-xl bg-[#0a0f1e] border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2ff] focus:border-transparent resize-none transition-all"
              />
              <button
                onClick={generateResponse}
                disabled={!review.trim() || isGenerating}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6] text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-[#00c2ff]/50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing sentiment & generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Response
                  </>
                )}
              </button>

              {/* Progress bar when generating */}
              {isGenerating && (
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00c2ff] to-[#8b5cf6]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>

            {/* Output side */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-white">AI-Generated Response</label>
                {response && !isGenerating && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-all text-sm hover:scale-105"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="relative w-full h-48 p-4 rounded-xl bg-[#0a0f1e] border border-[#00c2ff]/30 text-white overflow-y-auto">
                {response ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="leading-relaxed"
                  >
                    {response}
                    {isGenerating && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-1 h-4 bg-[#00c2ff] ml-1"
                      />
                    )}
                  </motion.p>
                ) : (
                  <p className="text-gray-500 italic">Your AI-generated response will appear here...</p>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00c2ff]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Powered by advanced sentiment analysis
                </div>
                {response && !isGenerating && (
                  <div className="text-[#00c2ff] font-medium">
                    {response.split(' ').length} words
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features below demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 mt-12"
        >
          {[
            { title: 'Sentiment Analysis', desc: 'Automatically detects positive, negative, or mixed reviews' },
            { title: 'Contextual Responses', desc: 'Generates appropriate responses based on review tone' },
            { title: 'Professional Tone', desc: 'Maintains brand voice while addressing concerns' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-white/20"
            >
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
