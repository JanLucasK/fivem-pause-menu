import type { HomeData } from '../types';
import { formatJoined } from './format';

interface PromptBarProps {
  data: HomeData;
}

// Fusszeile: Tasten-Hinweise links, Beitritt rechts. Die Spieler-ID steht
// bereits am Avatar im Dossier.
export function PromptBar({ data }: PromptBarProps) {
  const joined = formatJoined(data.server.joinedAtUnix);
  const right = joined && `Beigetreten ${joined}`;

  return (
    <footer className="hub-prompts">
      <div className="hub-prompts-keys">
        <span>
          <kbd className="hub-key">↑ ↓</kbd> Navigieren
        </span>
        <span>
          <kbd className="hub-key">ENTER</kbd> Auswählen
        </span>
        <span>
          <kbd className="hub-key">ESC</kbd> Zurück ins Spiel
        </span>
      </div>
      {right && <span className="hub-mono hub-prompts-right">{right}</span>}
    </footer>
  );
}
