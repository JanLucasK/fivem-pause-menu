import { ArrowUpRight, MessageCircle } from 'lucide-react';

interface DiscordRowProps {
  url: string;
  hint?: string | null;
  onOpen: () => void;
}

// Discord als eine Zeile ohne Box: Icon, URL ohne Schema, Hinweis, Pfeil.
export function DiscordRow({ url, hint, onOpen }: DiscordRowProps) {
  const display = url.replace(/^https?:\/\//, '');
  return (
    <button type="button" className="hub-discord" onClick={onOpen}>
      <MessageCircle size="1.5rem" className="hub-discord-icon" />
      <span className="hub-discord-text">
        <span className="hub-discord-url">{display}</span>
        {hint && <span className="hub-discord-hint">{hint}</span>}
      </span>
      <ArrowUpRight size="1.125rem" className="hub-discord-arrow" />
    </button>
  );
}
