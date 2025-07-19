import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import SolutionsSection from '@/components/SolutionsSection';
import PricingSection from '@/components/PricingSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <SolutionsSection />
        <PricingSection />
        <AboutSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}