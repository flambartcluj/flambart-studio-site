import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/lib/utils';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const scrollTo = useScrollTo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t(content.nav.portfolio), target: 'portfolio' },
    { label: t(content.nav.services), target: 'services' },
    { label: t(content.nav.about), target: 'about' },
    { label: t(content.nav.contact), target: 'contact' },
  ];

  const handleNavClick = (target: string) => {
    scrollTo(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-350',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors duration-250"
          >
            Flambart
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-250 gold-underline"
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
              <button
                onClick={() => setLanguage('ro')}
                className={cn(
                  'px-2 py-1 text-xs tracking-wider uppercase transition-colors duration-250',
                  language === 'ro'
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                RO
              </button>
              <span className="text-border">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-2 py-1 text-xs tracking-wider uppercase transition-colors duration-250',
                  language === 'en'
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-20 bg-background/98 backdrop-blur-lg md:hidden transition-all duration-350',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="text-2xl font-display text-foreground hover:text-primary transition-colors duration-250"
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
            <button
              onClick={() => setLanguage('ro')}
              className={cn(
                'px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-250',
                language === 'ro'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              Română
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-250',
                language === 'en'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
