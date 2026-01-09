import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language } from '@/data/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <T extends { ro: string; en: string }>(textObj: T) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'ro' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ro' ? 'en' : 'ro'));
  }, []);

  const t = useCallback(
    <T extends { ro: string; en: string }>(textObj: T): string => {
      return textObj[language];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
