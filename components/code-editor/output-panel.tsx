'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownIcon, ArrowRightIcon, PlayIcon } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  outputLayout: 'bottom' | 'right';
  onToggleLayout: () => void;
  onRunCode: () => void;
}

export function OutputPanel({ output, outputLayout, onToggleLayout, onRunCode }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 flex justify-between items-center bg-muted/40">
        <h2 className="font-semibold">Output</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onToggleLayout}>
            {outputLayout === 'bottom' ? (
              <ArrowRightIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </Button>
          <Button variant="default" size="sm" onClick={onRunCode}>
            <PlayIcon className="h-4 w-4 mr-2" />
            Run Code
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      </ScrollArea>
    </div>
  );
}