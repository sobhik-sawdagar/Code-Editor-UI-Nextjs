'use client';

import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './theme-switcher';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

interface EditorHeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  selectedLanguage: string;
}

export function EditorHeader({ isFullscreen, onToggleFullscreen, selectedLanguage }: EditorHeaderProps) {
  return (
    <header className="border-b p-4 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Code Editor</h1>
        <span className="text-sm text-muted-foreground">
          Editing: {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className="transition-colors hover:bg-accent"
        >
          {isFullscreen ? (
            <Minimize2Icon className="h-4 w-4" />
          ) : (
            <Maximize2Icon className="h-4 w-4" />
          )}
        </Button>
        <ThemeSwitcher />
      </div>
    </header>
  );
}