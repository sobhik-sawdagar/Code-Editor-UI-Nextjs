'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Language } from '@/lib/types';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <ScrollArea className="w-48 border-r">
      <div className="p-4 space-y-2">
        {languages.map((lang) => (
          <Button
            key={lang.value}
            variant={selectedLanguage === lang.value ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onLanguageChange(lang.value)}
          >
            <span className="mr-2">{lang.icon}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}