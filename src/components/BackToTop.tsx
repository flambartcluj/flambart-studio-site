import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        // Only visible on mobile (md:hidden)
        'md:hidden fixed bottom-24 left-4 z-40',
        'w-10 h-10 rounded-full',
        'bg-foreground/10 backdrop-blur-sm border border-border',
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:bg-foreground/20 active:scale-95',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} className="text-foreground" />
    </button>
  );
}
