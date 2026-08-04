import { MessagesSquare } from 'lucide-react';

interface DiscordPanelProps {
  memberHint: string;
  onJoin: () => void;
}

// Discord-Panel (Mock) in der mittleren Spalte - Logo, Mitglieder-Hinweis und
// ein "Discord beitreten"-Button. Bewusst ohne echte Funktion; onJoin öffnet nur
// die hinterlegte Einladung (im Browser-Dev via window.open, im Spiel No-op).
export function DiscordPanel({ memberHint, onJoin }: DiscordPanelProps) {
  return (
    <aside className="discord-panel">
      <div className="discord-panel-glow" />
      <div className="discord-panel-icon">
        <MessagesSquare size={40} />
      </div>
      <h2 className="discord-panel-title">Discord</h2>
      <p className="discord-panel-hint">{memberHint}</p>
      <button type="button" className="discord-panel-btn" onClick={onJoin}>
        Discord beitreten
      </button>
    </aside>
  );
}
