import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Portfolio } from '@/components/Portfolio';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { BackToTop } from '@/components/BackToTop';

const PortfolioPage = () => {
  const location = useLocation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <LanguageProvider defaultLanguage="ro">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <Portfolio />
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
};

export default PortfolioPage;
