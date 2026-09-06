import { Clock, CloudSun, MapPin } from 'lucide-react';
import type { HomeData } from '../types';
import { BrandMark } from '../components/BrandMark';

interface TopBarProps {
  data: HomeData;
}

// Kopfzeile: Wortmarke links, rechts Ort / Wetter / Uhrzeit als Textzeile und
// die Online-Pille. Jedes Element rendert nur, wenn sein Wert vorhanden ist.
export function TopBar({ data }: TopBarProps) {
  const { server, location } = data;
  return (
    <header className="hub-topbar">
      <BrandMark height={40} />
      <div className="hub-topbar-meta">
        {location && (
          <span className="hub-topbar-item">
            <MapPin size="1rem" />
            {location}
          </span>
        )}
        {server.weather && (
          <span className="hub-topbar-item">
            <CloudSun size="1rem" />
            {server.weather}
          </span>
        )}
        {server.clock && (
          <span className="hub-topbar-item">
            <Clock size="1rem" />
            <span className="hub-mono hub-topbar-clock">{server.clock}</span>
          </span>
        )}
        <span className="hub-online">
          <span className="hub-online-dot" />
          {server.onlinePlayers} / {server.maxPlayers} online
        </span>
      </div>
    </header>
  );
}
