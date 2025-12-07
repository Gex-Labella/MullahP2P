import { useState } from 'react';

interface CopyToClipboardState {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export function useClipboard(resetInterval = 2000): CopyToClipboardState {
  const [copied, setCopied] = useState(false);
  
  const copy = async (text: string) => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        
        if (resetInterval) {
          setTimeout(() => {
            setCopied(false);
          }, resetInterval);
        }
      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
      }
    } else {
      console.error('Clipboard API not supported in this environment');
    }
  };
  
  const reset = () => {
    setCopied(false);
  };
  
  return { copied, copy, reset };
}