import { Check } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { Button } from '@/components/ui/button';

export function Services() {
  const { t, language } = useLanguage();
  const scrollTo = useScrollTo();

  return (
    <section id="services" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="caption text-primary mb-4">{t(content.services.title)}</p>
          <h2 className="heading-md font-display">{t(content.services.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.services.categories.map((service, index) => (
            <div
              key={service.id}
              className="group bg-card border border-border p-8 transition-all duration-350 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
              
              {/* Service Title */}
              <h3 className="heading-sm font-display text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
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
