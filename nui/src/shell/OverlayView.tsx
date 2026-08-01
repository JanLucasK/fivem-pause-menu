import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import './appShell.css';

interface OverlayViewProps {
  title: string;
  onBack: () => void;
  children: ReactNode;
  // Karte braucht randlose volle Flaeche; Text-Overlays (Keybinds/Regeln)
  // bekommen eine zentrierte, scrollende Inhaltsspalte.
  bleed?: boolean;
}

// Vollbild-Overlay ueber dem Hub (Karte, Tastenbelegung, Regeln). ESC bzw. der
// Zurueck-Button fuehren zum Hub zurueck - die ESC-Kette verwaltet AppShell.
export function OverlayView({ title, onBack, children, bleed = false }: OverlayViewProps) {
  return (
    <div className="overlay-view">
      <header className="overlay-bar">
        <button type="button" className="overlay-back" onClick={onBack} aria-label="Zurück zum Menü">
          <ArrowLeft size="1rem" />
          <span>Zurück</span>
        </button>
        <h2 className="overlay-title">{title}</h2>
        <p className="overlay-hint">
          <kbd>ESC</kbd> zurück
        </p>
      </header>
      <div className={bleed ? 'overlay-content overlay-content--bleed' : 'overlay-content'}>
        {children}
      </div>
    </div>
  );
}
