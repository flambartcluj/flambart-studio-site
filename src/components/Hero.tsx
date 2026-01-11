import { ArrowDown } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-wedding.jpg';
import logoWhite from '@/assets/logo-white.png';

export function Hero() {
  const { t } = useLanguage();
  const scrollTo = useScrollTo();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow text-center">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src={logoWhite} 
              alt="Flambart" 
              className="h-24 md:h-32 lg:h-40 w-auto drop-shadow-lg"
            />
          </div>

          {/* Caption */}
          <p className="caption text-white/80 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Photo & Film Studio
          </p>

          {/* Headline */}
          <h1 className="heading-xl font-display mb-6 text-white animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {t(content.hero.headline)}
          </h1>

          {/* Subheadline */}
          <p className="body-lg text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {t(content.hero.subheadline)}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-wide uppercase transition-transform duration-300 hover:scale-105"
            >
              {t(content.hero.ctaPrimary)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('portfolio')}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-sm tracking-wide uppercase backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            >
              {t(content.hero.ctaSecondary)}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollTo('portfolio')}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-250"
          aria-label="Scroll down"
        >
          <span className="caption text-xs">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
