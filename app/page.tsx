'use client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import MagicResponseGenerator from '@/components/MagicResponseGenerator';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#06162c] text-white selection:bg-sky-500/30">
      <Navbar />
      <HeroSection />
      <div className="relative z-10">
        <MagicResponseGenerator />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}
