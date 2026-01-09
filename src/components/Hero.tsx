import { ArrowDown } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { t } = useLanguage();
  const scrollTo = useScrollTo();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow text-center">
        <div className="stagger-children">
          {/* Caption */}
          <p className="caption text-primary mb-6">
            Photo & Film Studio
          </p>

          {/* Headline */}
          <h1 className="heading-xl font-serif mb-6">
            {t(content.hero.headline)}
          </h1>

          {/* Subheadline */}
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {t(content.hero.subheadline)}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-wide uppercase"
            >
              {t(content.hero.ctaPrimary)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('portfolio')}
              className="border-border text-foreground hover:bg-secondary hover:text-foreground px-8 py-6 text-sm tracking-wide uppercase"
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
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-250"
          aria-label="Scroll down"
        >
          <span className="caption text-xs">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
