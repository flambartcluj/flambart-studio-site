import { MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { cn } from '@/lib/utils';

export function About() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-y-1/2" />
      
      <div className="container-narrow relative">
        <div className="text-center">
          {/* Title */}
          <p className={cn(
            "caption text-primary mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            {t(content.about.title)}
          </p>

          {/* Main Description */}
          <p className={cn(
            "heading-md font-display mb-8 leading-relaxed transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            {t(content.about.description)}
          </p>

          {/* Decorative divider */}
          <div className={cn(
            "flex items-center justify-center gap-4 my-10 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}>
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 bg-primary rotate-45 animate-pulse" />
            <div className="w-12 h-px bg-border" />
          </div>

          {/* Mission */}
          <p className={cn(
            "body-lg text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            {t(content.about.mission)}
          </p>

          {/* Location */}
          <div className={cn(
            "flex items-center justify-center gap-2 text-muted-foreground mb-16 transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <MapPin size={18} className="text-primary" />
            <span className="text-sm tracking-wide">{t(content.about.location)}</span>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border">
            {content.about.values.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "text-center group transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <span className="text-primary font-display text-xl">{index + 1}</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
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
