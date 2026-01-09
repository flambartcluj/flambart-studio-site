import { Check } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { Button } from '@/components/ui/button';

export function Services() {
  const { t, language } = useLanguage();
  const scrollTo = useScrollTo();

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="caption text-primary mb-4">{t(content.services.title)}</p>
          <h2 className="heading-md font-serif">{t(content.services.subtitle)}</h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.services.categories.map((service, index) => (
            <div
              key={service.id}
              className="group bg-card border border-border p-8 transition-all duration-350 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Service Title */}
              <h3 className="heading-sm font-serif text-primary mb-4">
                {t(service.title)}
              </h3>

              {/* Description */}
              <p className="body-md text-muted-foreground mb-8">
                {t(service.description)}
              </p>

              {/* Deliverables */}
              <ul className="space-y-3 mb-8">
                {service.deliverables[language].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                onClick={() => scrollTo('contact')}
                className="w-full border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-250"
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
