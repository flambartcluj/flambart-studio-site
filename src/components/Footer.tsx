import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-xl tracking-widest text-foreground hover:text-primary transition-colors duration-250"
          >
            Flambart
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Flambart Studio. {t(content.footer.location)}
          </p>
        </div>
      </div>
    </footer>
  );
}
