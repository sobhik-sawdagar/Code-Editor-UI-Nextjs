import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';

export const getLanguageExtension = (language: string) => {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return javascript();
    case 'python':
      return python();
    case 'cpp':
      return cpp();
    case 'php':
      return php();
    case 'rust':
      return rust();
    default:
      return javascript();
  }
};