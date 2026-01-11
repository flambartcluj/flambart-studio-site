import { Mail, Phone, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { cn } from '@/lib/utils';

export function Contact() {
  const { t, language } = useLanguage();
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-secondary/50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className={cn(
        "absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full transition-all duration-1000",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )} />
      <div className={cn(
        "absolute bottom-20 right-10 w-24 h-24 border border-primary/10 rounded-full transition-all duration-1000 delay-200",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )} />
      <div className={cn(
        "absolute top-1/2 left-1/4 w-2 h-2 bg-primary/20 rounded-full transition-all duration-700 delay-300",
        isVisible ? "opacity-100" : "opacity-0"
      )} />
      <div className={cn(
        "absolute top-1/3 right-1/3 w-3 h-3 bg-primary/10 rounded-full transition-all duration-700 delay-400",
        isVisible ? "opacity-100" : "opacity-0"
      )} />
      
      <div className="container-narrow relative">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="caption text-primary mb-4">{t(content.contact.title)}</p>
          <h2 className="heading-md font-display">{t(content.contact.subtitle)}</h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Contact Info - Centered */}
        <div className={cn(
          "max-w-md mx-auto transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="space-y-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8">
            {/* Email */}
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-5 group p-4 rounded-lg hover:bg-background transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <Mail size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Email
                </p>
                <p className="text-lg text-foreground group-hover:text-primary transition-colors duration-300 font-medium">
                  {content.contact.email}
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${content.contact.phone}`}
              className="flex items-center gap-5 group p-4 rounded-lg hover:bg-background transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {language === 'ro' ? 'Telefon' : 'Phone'}
                </p>
                <p className="text-lg text-foreground group-hover:text-primary transition-colors duration-300 font-medium">
                  {content.contact.phone}
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-5 p-4">
              <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center">
                <MapPin size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {language === 'ro' ? 'Locație' : 'Location'}
                </p>
                <p className="text-lg text-foreground font-medium">
                  Cluj-Napoca, România
                </p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <p className={cn(
            "text-center text-sm text-muted-foreground mt-10 transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {t(content.contact.responseTime)}
          </p>
        </div>
      </div>
    </section>
  );
}
