import type { HomeData } from '../types';
import { formatJoined } from './format';

interface PromptBarProps {
  data: HomeData;
}

// Fusszeile: Tasten-Hinweise links, Beitritt und Spieler-ID rechts.
export function PromptBar({ data }: PromptBarProps) {
  const joined = formatJoined(data.server.joinedAtUnix);
  const serverId = data.character.serverId;
  const right = [joined && `Beigetreten ${joined}`, serverId != null && `Spieler-ID ${serverId}`]
    .filter(Boolean)
    .join(' · ');

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
