import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/lib/utils';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

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
            className="hover:opacity-80 transition-opacity duration-250"
          >
            <img 
              src={isScrolled ? logoBlack : logoWhite} 
              alt="Flambart" 
              className="h-10 md:h-12 w-auto transition-opacity duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={cn(
                  'text-sm tracking-wide transition-colors duration-250 gold-underline',
                  isScrolled 
                    ? 'text-muted-foreground hover:text-foreground' 
                    : 'text-white/70 hover:text-white'
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div className={cn(
              'flex items-center gap-1 ml-4 border-l pl-4',
              isScrolled ? 'border-border' : 'border-white/30'
            )}>
              <button
                onClick={() => setLanguage('ro')}
                className={cn(
                  'px-2 py-1 text-xs tracking-wider uppercase transition-colors duration-250',
                  language === 'ro'
                    ? 'text-primary font-medium'
                    : isScrolled 
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-white/60 hover:text-white'
                )}
              >
                RO
              </button>
              <span className={isScrolled ? 'text-border' : 'text-white/30'}>/</span>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-2 py-1 text-xs tracking-wider uppercase transition-colors duration-250',
                  language === 'en'
                    ? 'text-primary font-medium'
                    : isScrolled 
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-white/60 hover:text-white'
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'md:hidden p-2',
              isScrolled ? 'text-foreground' : 'text-white'
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 md:hidden">
          {/* Solid background to fully cover content */}
          <div className="absolute inset-0 bg-background" />
          
          {/* Menu content */}
          <div className="relative z-10 flex flex-col items-center pt-16 px-6">
            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6 w-full">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className="text-xl font-display text-foreground hover:text-primary transition-colors duration-250 py-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border w-full justify-center">
              <button
                onClick={() => {
                  setLanguage('ro');
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  'px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-250 rounded-md',
                  language === 'ro'
                    ? 'text-primary font-medium bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Română
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  'px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-250 rounded-md',
                  language === 'en'
                    ? 'text-primary font-medium bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
