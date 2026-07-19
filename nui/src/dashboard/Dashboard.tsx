import { Map as MapIcon, Settings } from 'lucide-react';
import type { Announcement, HomeData } from '../types';
import { PlayerBar } from './PlayerBar';
import { ActionCard } from './ActionCard';
import { DiscordPanel } from './DiscordPanel';
import { AnnouncementsPanel } from './AnnouncementsPanel';
import './dashboard.css';

interface DashboardProps {
  data: HomeData;
  announcements: Announcement[];
  onOpenMap: () => void;
  onOpenSettings: () => void;
  onOpenDiscord: () => void;
  onDisconnect: () => void;
}

// Das "Zwischenmenü", das an die Stelle des nativen GTA-Pausenmenüs tritt:
// Spielerleiste oben, darunter drei Spalten - Aktionen (Karte/Einstellungen)
// links, Discord in der Mitte, Ankündigungen rechts. Layout am gewünschten
// Referenzbild orientiert, Optik im NeoV-Graphit+Messing-Stil.
export function Dashboard({
  data,
  announcements,
  onOpenMap,
  onOpenSettings,
  onOpenDiscord,
  onDisconnect,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="dashboard-backdrop" />
      <div className="dashboard-frame">
        <PlayerBar data={data} onDisconnect={onDisconnect} />

        <div className="dashboard-body">
          <section className="dashboard-col dashboard-col--menu">
            <p className="dashboard-section-label">Menü</p>
            <ActionCard
              icon={MapIcon}
              title="Karte"
              subtitle="Vollbildkarte in Los Santos öffnen"
              hint="M"
              variant="feature"
              onClick={onOpenMap}
            />
            <ActionCard
              icon={Settings}
              title="Einstellungen"
              subtitle="GTA-Einstellungen öffnen"
              variant="feature"
              onClick={onOpenSettings}
            />
          </section>

          <section className="dashboard-col dashboard-col--right">
            <DiscordPanel
              memberHint="+1000 Mitglieder in unserem Server"
              onJoin={onOpenDiscord}
            />
            <AnnouncementsPanel announcements={announcements} />
          </section>
        </div>

        <p className="dashboard-hint">
          <kbd>ESC</kbd> schließt das Menü
        </p>
      </div>
    </div>
  );
}
