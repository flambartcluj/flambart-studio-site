import { Camera, Film, Sparkles } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ServicesEditorial() {
  const { t } = useLanguage();
  const scrollTo = useScrollTo();
  const { ref, isVisible } = useAnimateOnScroll<HTMLDivElement>();

  const { editorial } = content.services;

  return (
    <div ref={ref} className="mt-20 pt-16 border-t border-border/50">
      {/* Section Header */}
      <div className={cn(
        "text-center mb-16 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <h3 className="heading-md font-display mb-6">{t(editorial.title)}</h3>
        <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
          {t(editorial.intro)}
        </p>
        <div className="w-16 h-px bg-primary mx-auto mt-6" />
      </div>

      {/* Photography Section */}
      <div className={cn(
        "mb-16 transition-all duration-700 delay-100",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-sm">
            <Camera className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-sm font-display">{t(editorial.photography.title)}</h4>
        </div>
        <p className="body-md text-muted-foreground max-w-4xl leading-relaxed mb-6">
          {t(editorial.photography.description)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollTo('portfolio')}
          className="text-primary hover:text-primary hover:bg-primary/10 -ml-3"
        >
          {t(editorial.photography.cta)} →
        </Button>
      </div>

      {/* Video Section */}
      <div className={cn(
        "mb-16 transition-all duration-700 delay-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-sm">
            <Film className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-sm font-display">{t(editorial.video.title)}</h4>
        </div>
        <p className="body-md text-muted-foreground max-w-4xl leading-relaxed mb-8">
          {t(editorial.video.intro)}
        </p>

        {/* Video Subsections */}
        <div className="grid md:grid-cols-2 gap-8 ml-0 md:ml-10">
          {/* Cinematic */}
          <div className="bg-card border border-border p-6 rounded-sm">
            <h5 className="font-display text-lg mb-4 text-foreground">
              {t(editorial.video.cinematic.title)}
            </h5>
            <p className="body-sm text-muted-foreground leading-relaxed mb-4">
              {t(editorial.video.cinematic.description)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTo('portfolio')}
              className="text-primary hover:text-primary hover:bg-primary/10 -ml-3"
            >
              {t(editorial.video.cinematic.cta)} →
            </Button>
          </div>

          {/* Documentary */}
          <div className="bg-card border border-border p-6 rounded-sm">
            <h5 className="font-display text-lg mb-4 text-foreground">
              {t(editorial.video.documentary.title)}
            </h5>
            <p className="body-sm text-muted-foreground leading-relaxed mb-4">
              {t(editorial.video.documentary.description)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTo('portfolio')}
              className="text-primary hover:text-primary hover:bg-primary/10 -ml-3"
            >
              {t(editorial.video.documentary.cta)} →
            </Button>
          </div>
        </div>
      </div>

      {/* Combined Services Section */}
      <div className={cn(
        "bg-secondary/50 border border-border p-8 md:p-12 rounded-sm text-center transition-all duration-700 delay-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-sm">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h4 className="heading-sm font-display">{t(editorial.combined.title)}</h4>
        </div>
        <p className="body-md text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
          {t(editorial.combined.description)}
        </p>
        <Button
          onClick={() => scrollTo('contact')}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t(editorial.combined.cta)}
        </Button>
      </div>
    </div>
  );
}
