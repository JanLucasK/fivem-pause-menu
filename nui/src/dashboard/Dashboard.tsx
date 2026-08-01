import { BookOpenText, Keyboard, Map as MapIcon, Settings } from 'lucide-react';
import type { Announcement, HomeData, PromoConfig } from '../types';
import { PlayerBar } from './PlayerBar';
import { ActionCard } from './ActionCard';
import { DiscordPanel } from './DiscordPanel';
import { AnnouncementsPanel } from './AnnouncementsPanel';
import { PromoBanner } from './PromoBanner';
import './dashboard.css';

interface DashboardProps {
  data: HomeData;
  announcements: Announcement[];
  promo: PromoConfig;
  avatarUrl: string | null;
  onOpenMap: () => void;
  onOpenSettings: () => void;
  onOpenKeybinds: () => void;
  onOpenRules: () => void;
  onOpenDiscord: () => void;
  onPromoAction: () => void;
  onDisconnect: () => void;
}

// Hub-Dashboard (Layout nach 0r-Vorbild, NeoV-Optik): Spielerleiste oben,
// darunter drei Spalten - grosse Kacheln (Karte/Einstellungen) links, Discord +
// kleine Kacheln (Tastenbelegung/Regeln) in der Mitte, Ankündigungen rechts -
// und unten das Convar-getriebene Promo-Banner.
export function Dashboard({
  data,
  announcements,
  promo,
  avatarUrl,
  onOpenMap,
  onOpenSettings,
  onOpenKeybinds,
  onOpenRules,
  onOpenDiscord,
  onPromoAction,
  onDisconnect,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="dashboard-backdrop" />
      <div className="dashboard-frame">
        <PlayerBar data={data} avatarUrl={avatarUrl} onDisconnect={onDisconnect} />

        {/* Drei Spalten, Container unterschiedlich gross - aber Ober- und
            Unterkante aller Spalten fluchten: jede Spalte fuellt die volle
            Body-Hoehe, die Announcements bekommen dafuer einen fuellenden
            Panel-Rahmen (Nutzer-Feedback). */}
        <div className="dashboard-body">
          <section className="dashboard-col dashboard-col--menu">
            <ActionCard
              icon={MapIcon}
              title="Karte"
              subtitle="Vollbildkarte in Los Santos öffnen"
              hint="M"
              variant="feature"
              image="mapStyles/styleSatelite/3/3/5.jpg"
              onClick={onOpenMap}
            />
            <ActionCard
              icon={Settings}
              title="Einstellungen"
              subtitle="GTA-Einstellungen öffnen"
              variant="feature"
              image="img/gold-texture.jpg"
              imageDim
              onClick={onOpenSettings}
            />
          </section>

          <section className="dashboard-col dashboard-col--middle">
            <DiscordPanel
              memberHint="+1000 Mitglieder in unserem Server"
              onJoin={onOpenDiscord}
            />
            <div className="dashboard-tile-row">
              <ActionCard
                icon={Keyboard}
                title="Tastenbelegung"
                subtitle="Tasten anpassen"
                onClick={onOpenKeybinds}
              />
              <ActionCard
                icon={BookOpenText}
                title="Regeln & Hilfe"
                subtitle="Serverregeln & FAQ"
                onClick={onOpenRules}
              />
            </div>
          </section>

          <section className="dashboard-col dashboard-col--news">
            <AnnouncementsPanel announcements={announcements} />
          </section>
        </div>

        <PromoBanner config={promo} onAction={onPromoAction} />

        <p className="dashboard-hint">
          <kbd>ESC</kbd> schließt das Menü
        </p>
      </div>
    </div>
  );
}
