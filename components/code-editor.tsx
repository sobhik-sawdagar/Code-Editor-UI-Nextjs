'use client';

import { useState, useCallback, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { LanguageSelector } from './code-editor/language-selector';
import { ThemeSwitcher } from './code-editor/theme-switcher';
import { OutputPanel } from './code-editor/output-panel';
import { EditorHeader } from './code-editor/editor-header';
import { LANGUAGES } from '@/lib/constants';
import { getLanguageExtension } from '@/lib/editor-utils';
import type { OutputLayout } from '@/lib/types';

export default function CodeEditor() {
  const [code, setCode] = useState('// Start coding here');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [output, setOutput] = useState('Output will appear here...');
  const [outputLayout, setOutputLayout] = useState<OutputLayout>('bottom');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme } = useTheme();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if(language === 'python') 
     setCode(`# Start coding in ${language}`);
    else
     setCode(`// Start coding in ${language}`);
  };

  const handleRunCode = () => {
    setOutput(`Simulated output for ${selectedLanguage}:\n${code}`);
  };

  const toggleOutputLayout = () => {
    setOutputLayout(outputLayout === 'bottom' ? 'right' : 'bottom');
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <EditorHeader
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        selectedLanguage={selectedLanguage}
      />

      <div className="flex-1 flex">
        <LanguageSelector
          languages={LANGUAGES}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <div className="flex-1 flex flex-col">
          <ResizablePanelGroup
            direction={outputLayout === 'bottom' ? 'vertical' : 'horizontal'}
            className="flex-1"
          >
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="h-full">
                <CodeMirror
                  value={code}
                  height="100%"
                  theme={theme === 'dark' ? githubDark : githubLight}
                  extensions={[getLanguageExtension(selectedLanguage)]}
                  onChange={(value) => setCode(value)}
                  className="h-full"
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightSpecialChars: true,
                    foldGutter: true,
                    drawSelection: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    rectangularSelection: true,
                    crosshairCursor: true,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                    closeBracketsKeymap: true,
                    defaultKeymap: true,
                    searchKeymap: true,
                    historyKeymap: true,
                    foldKeymap: true,
                    completionKeymap: true,
                    lintKeymap: true,
                  }}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} minSize={20}>
              <OutputPanel
                output={output}
                outputLayout={outputLayout}
                onToggleLayout={toggleOutputLayout}
                onRunCode={handleRunCode}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}