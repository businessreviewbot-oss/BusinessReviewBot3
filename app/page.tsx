import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MagicResponseGenerator } from './components/MagicResponseGenerator';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06162c]">
      <Navbar />
      <main>
        <HeroSection />
        <MagicResponseGenerator />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
