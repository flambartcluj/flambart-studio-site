import { MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-y-1/2" />
      
      <div className="container-narrow relative">
        <div className="text-center">
          {/* Title */}
          <p className="caption text-primary mb-4">{t(content.about.title)}</p>

          {/* Main Description */}
          <p className="heading-md font-display mb-8 leading-relaxed">
            {t(content.about.description)}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 bg-primary rotate-45" />
            <div className="w-12 h-px bg-border" />
          </div>

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
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                  <span className="text-primary font-display text-xl">{index + 1}</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
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
