import { Mail, Phone, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function Contact() {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="caption text-primary mb-4">{t(content.contact.title)}</p>
          <h2 className="heading-md font-display">{t(content.contact.subtitle)}</h2>
        </div>

        {/* Contact Info - Centered */}
        <div className="max-w-md mx-auto">
          <div className="space-y-8">
            {/* Email */}
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-5 group p-4 rounded-lg hover:bg-background transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
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
              <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
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
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t border-border">
            {t(content.contact.responseTime)}
          </p>
        </div>
      </div>
    </section>
  );
}
