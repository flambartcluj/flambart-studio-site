import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'md:hidden p-2',
                  isScrolled ? 'text-foreground' : 'text-white'
                )}
                aria-label="Toggle menu"
                data-testid="mobile-menu-trigger"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SheetTrigger>

            <SheetContent
              side="top"
              hideCloseButton
              className={cn(
                'md:hidden p-0',
                // full-screen panel (prevents bleed-through + ensures separation)
                'h-[100dvh] w-full',
                'bg-background text-foreground',
              )}
              data-testid="mobile-menu-panel"
            >
              <div className="flex h-full flex-col">
                {/* Top bar (clear separation from page underneath) */}
                <div className="h-20 border-b border-border bg-background">
                  <div className="container-wide flex h-full items-center justify-between">
                    <a
                      href="#"
                      onClick={handleLogoClick}
                      className="hover:opacity-80 transition-opacity duration-250"
                    >
                      <img
                        src={logoBlack}
                        alt="Flambart"
                        className="h-10 w-auto"
                      />
                    </a>

                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-foreground"
                      aria-label="Close menu"
                      data-testid="mobile-menu-close"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Menu content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="container-wide flex h-full flex-col items-center pt-10 pb-8">
                    {/* Navigation Links */}
                    <nav className="flex w-full flex-col items-center gap-7">
                      {navItems.map((item) => (
                        <button
                          key={item.target}
                          onClick={() => handleNavClick(item.target)}
                          className="text-xl font-display text-foreground hover:text-primary transition-colors duration-250 py-2"
                          data-testid={`mobile-nav-${item.target}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="mt-10 w-full border-t border-border pt-6 flex items-center justify-center gap-3">
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
                        RO
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
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
