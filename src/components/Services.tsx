import { Check } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Services() {
  const { t, language } = useLanguage();
  const scrollTo = useScrollTo();
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-wide relative">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="caption text-primary mb-4">{t(content.services.title)}</p>
          <h2 className="heading-md font-display">{t(content.services.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {content.services.categories.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "group bg-card border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 relative rounded-sm",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500 rounded-t-sm" />
              
              {/* Service Title */}
              <h3 className="heading-sm font-display text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {t(service.title)}
              </h3>

              {/* Description */}
              <p className="body-md text-muted-foreground mb-6 text-sm">
                {t(service.description)}
              </p>

              {/* Deliverables */}
              <ul className="space-y-2 mb-6">
                {service.deliverables[language].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 group/item">
                    <Check size={14} className="text-primary mt-1 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                    <span className="text-xs text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollTo('contact')}
                className="w-full border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-xs"
              >
                {t(content.services.cta)}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
