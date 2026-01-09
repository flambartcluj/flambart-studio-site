import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Portfolio } from '@/components/Portfolio';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <LanguageProvider defaultLanguage="ro">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
