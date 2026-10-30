import { useEffect, useLayoutEffect, useRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Logomark } from '../hub/Logomark';
import './appShell.css';

export interface OverlayPrompt {
  keys: string;
  label: string;
}

interface OverlayViewProps {
  title: string;
  onBack: () => void;
  meta?: ReactNode;
  // Linke Spalte (Kapitel/Kategorien); ohne Inhalt nutzt der Hauptbereich die volle Breite.
  aside?: ReactNode;
  prompts?: OverlayPrompt[];
  mainRef?: Ref<HTMLElement>;
  children: ReactNode;
}

// Vollbild-Seite ueber dem Hub (Tastenbelegung, Regelwerk, Ankuendigungen) im
// selben Raster wie der Hub: Safe-Zone 5 %, Kopf, linke Spalte, Fusszeile mit
// Tasten-Hinweisen. ESC bzw. "Zurueck" fuehren zum Hub - die ESC-Kette
// verwaltet AppShell.
export function OverlayView({ title, onBack, meta, aside, prompts = [], mainRef, children }: OverlayViewProps) {
  const backRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Zurueck im Hub liegt der Fokus wieder auf dem Rail-Eintrag, der die Seite
  // geoeffnet hat. Layout-Effect: laeuft vor dem Fokus-Effect der SectionNav.
  useLayoutEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    return () => previous?.focus();
  }, []);

  // Ohne fokussierbaren Inhalt (z.B. leere Tastenliste) nicht in der Hub-Rail
  // dahinter haengen bleiben.
  useEffect(() => {
    if (!rootRef.current?.contains(document.activeElement)) backRef.current?.focus();
  }, []);

  return (
    <div ref={rootRef} className="overlay-view">
      <div className="overlay-backdrop">
        <Logomark className="overlay-watermark" />
      </div>
      <div className={`overlay-frame${aside ? '' : ' overlay-frame--single'}`}>
        <header className="overlay-head">
          <div className="overlay-head-text">
            <button ref={backRef} type="button" className="overlay-back" onClick={onBack}>
              <ArrowLeft size="0.875rem" />
              <span>Menü</span>
            </button>
            <h1 className="overlay-title">{title}</h1>
          </div>
          {meta && <div className="overlay-meta">{meta}</div>}
        </header>
        {aside && <aside className="overlay-aside">{aside}</aside>}
        <main ref={mainRef} className="overlay-main">{children}</main>
        <footer className="overlay-prompts">
          {prompts.map((prompt) => (
            <span key={prompt.label}>
              <kbd className="hub-key">{prompt.keys}</kbd> {prompt.label}
            </span>
          ))}
          <span>
            <kbd className="hub-key">ESC</kbd> Zurück zum Menü
          </span>
        </footer>
      </div>
    </div>
  );
}
