import { MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center">
          {/* Title */}
          <p className="caption text-primary mb-4">{t(content.about.title)}</p>

          {/* Main Description */}
          <p className="heading-md font-serif mb-8 leading-relaxed">
            {t(content.about.description)}
          </p>

          {/* Mission */}
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {t(content.about.mission)}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-16">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm tracking-wide">{t(content.about.location)}</span>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border">
            {content.about.values.map((value, index) => (
              <div
                key={index}
                className="text-center"
              >
                <h3 className="font-serif text-xl text-primary mb-3">
                  {t(value.title)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(value.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
