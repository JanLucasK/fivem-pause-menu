import { Banknote, CloudSun, Landmark, LogOut, CalendarClock, Smartphone, Users } from 'lucide-react';
import type { HomeData } from '../types';
import { BrandMark } from '../components/BrandMark';

function formatMoney(amount: number): string {
  return `${amount.toLocaleString('de-DE')} €`;
}

function formatJoined(unix: number | null): string {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function initials(character: HomeData['character']): string {
  const first = character.firstName.charAt(0);
  const last = character.lastName.charAt(0);
  return `${first}${last}`.toUpperCase() || '–';
}

interface PlayerBarProps {
  data: HomeData;
  onDisconnect: () => void;
}

export function PlayerBar({ data, onDisconnect }: PlayerBarProps) {
  const { character, finance, server } = data;
  const fullName = `${character.firstName} ${character.lastName}`.trim() || 'Unbekannt';

  return (
    <header className="playerbar">
      <div className="playerbar-brand">
        <BrandMark size={40} />
      </div>

      <div className="playerbar-identity">
        <div className="playerbar-avatar">{initials(character)}</div>
        <div className="playerbar-identity-text">
          <p className="playerbar-name">{fullName}</p>
          <p className="playerbar-job">{character.job ?? 'Ohne Beschäftigung'}</p>
        </div>
      </div>

      <div className="playerbar-stats">
        <div className="playerbar-stat">
          <Banknote size={16} />
          <div>
            <span className="playerbar-stat-label">Bargeld</span>
            <span className="playerbar-stat-value">{formatMoney(finance.cash)}</span>
          </div>
        </div>
        <div className="playerbar-stat">
          <Landmark size={16} />
          <div>
            <span className="playerbar-stat-label">Bank</span>
            <span className="playerbar-stat-value">{formatMoney(finance.bank)}</span>
          </div>
        </div>
        <div className="playerbar-stat">
          <Users size={16} />
          <div>
            <span className="playerbar-stat-label">Online</span>
            <span className="playerbar-stat-value">
              {server.onlinePlayers} / {server.maxPlayers}
            </span>
          </div>
        </div>
        <div className="playerbar-stat">
          <CalendarClock size={16} />
          <div>
            <span className="playerbar-stat-label">Beigetreten</span>
            <span className="playerbar-stat-value">{formatJoined(server.joinedAtUnix)}</span>
          </div>
        </div>
        {/* Bedingte Chips: rendern nur, wenn der Client das Feld liefert -
            Telefon/Fraktion erscheinen automatisch, sobald der rp_core-Handshake
            sie in den HomeData-Payload aufnimmt. */}
        {server.weather && (
          <div className="playerbar-stat">
            <CloudSun size={16} />
            <div>
              <span className="playerbar-stat-label">Wetter</span>
              <span className="playerbar-stat-value">{server.weather}</span>
            </div>
          </div>
        )}
        {character.phone && (
          <div className="playerbar-stat">
            <Smartphone size={16} />
            <div>
              <span className="playerbar-stat-label">Telefon</span>
              <span className="playerbar-stat-value">{character.phone}</span>
            </div>
          </div>
        )}
        {character.faction && (
          <div className="playerbar-stat">
            <Users size={16} />
            <div>
              <span className="playerbar-stat-label">Fraktion</span>
              <span className="playerbar-stat-value">{character.faction}</span>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="playerbar-disconnect"
        onClick={onDisconnect}
        title="Verbindung trennen"
        aria-label="Verbindung trennen"
      >
        <LogOut size={17} />
      </button>
    </header>
  );
}
