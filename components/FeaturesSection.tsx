'use client';

import { Shield, CreditCard, BarChart3, Zap, Lock, TrendingUp } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Google sign-in', description: 'Secure access for your customers.', color: 'from-[#00c2ff] to-[#0099cc]' },
  { icon: CreditCard, title: 'Stripe billing', description: 'Monthly/annual plans + self-serve portal.', color: 'from-[#8b5cf6] to-[#6d28d9]' },
  { icon: BarChart3, title: 'Real-Time Dashboard', description: 'Monitor reviews and analytics in one intuitive interface.', color: 'from-[#00c2ff] to-[#8b5cf6\¢éí },
  { icon: Zap, title: 'AI Responses', description: 'AI-powered responses generated in seconds.', colorz 'from-[#8b5cf6\¢éí to-[#00c2ff]' },
  { icon: Lock, title: 'Bank-Level Security', description: 'Your data is encrypted and protected with industry-leading security protocols.', color: 'from-[#00c2ff] to-[#0099cc]' },
  { icon: TrendingUp, title: 'SEO Optimization', description: 'Boost your local search rankings with consistent review responses.', color: 'from-[#8b5cf6] to-[#6d28d9]' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-400">Built with the latest technology for a seamless experience.</p>
        </div>
        <div className="grid md:grid-cols-2 lnºgrid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00c2ff] transition-colors">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
