import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import logoBlack from '@/assets/logo-black.png';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-secondary/50 border-t border-border relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container-wide">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:opacity-80 transition-opacity duration-250"
          >
            <img 
              src={logoBlack} 
              alt="Flambart" 
              className="h-12 w-auto opacity-80"
            />
          </a>

          {/* Divider */}
          <div className="w-16 h-px bg-border" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Flambart Studio. {t(content.footer.location)}
          </p>
        </div>
      </div>
    </footer>
  );
}
