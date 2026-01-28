import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedPortfolio } from '@/components/FeaturedPortfolio';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BackToTop } from '@/components/BackToTop';

const Index = () => {
  const location = useLocation();

  // Handle hash navigation (e.g., /#despre, /#contact)
  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const elementId = location.hash.slice(1);
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          return true;
        }
        return false;
      }
      return true;
    };

    if (location.hash) {
      // Try immediately first
      if (!scrollToHash()) {
        // If element not found, retry with delays to handle cross-page navigation
        const attempts = [50, 150, 300, 500];
        attempts.forEach((delay) => {
          setTimeout(scrollToHash, delay);
        });
      }
    } else {
      // Scroll to top when navigating to homepage without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.key]);
  return (
    <LanguageProvider defaultLanguage="ro">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <FeaturedPortfolio />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
};

export default Index;
