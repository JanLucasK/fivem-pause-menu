import { useEffect } from 'react';
import type { RefObject } from 'react';

// Bild auf/ab blaettert den Hauptbereich einer OverlayView um 80 % seiner Hoehe.
export function usePageScroll(mainRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const main = mainRef.current;
      if (!main || (event.key !== 'PageDown' && event.key !== 'PageUp')) return;
      event.preventDefault();
      main.scrollBy({ top: (event.key === 'PageDown' ? 1 : -1) * main.clientHeight * 0.8, behavior: 'smooth' });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mainRef]);
}
