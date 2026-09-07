import type { Announcement, HomeData, MapPlayerPosition, PromoConfig } from '../types';
import { Logomark } from './Logomark';
import { TopBar } from './TopBar';
import { NavRail } from './NavRail';
import type { NavAction } from './NavRail';
import { Dossier } from './Dossier';
import { StatStrip } from './StatStrip';
import { MapStrip } from './MapStrip';
import { EventCard } from './EventCard';
import { AnnouncementsFeed } from './AnnouncementsFeed';
import { DiscordRow } from './DiscordRow';
import { PromptBar } from './PromptBar';
import './hub.css';

interface HubViewProps {
  data: HomeData;
  announcements: Announcement[];
  promo: PromoConfig;
  avatarUrl: string | null;
  playerPosition: MapPlayerPosition | null;
  onResume: () => void;
  onOpenMap: () => void;
  onOpenSettings: () => void;
  onOpenKeybinds: () => void;
  onOpenRules: () => void;
  onOpenDiscord: () => void;
  onShowAnnouncements: () => void;
  onPromoAction: () => void;
  onDisconnect: () => void;
}

// Hub "Dossier" (Spec 2026-09-06): Navigations-Rail links, Charakter-Dossier
// in der Mitte, "Jetzt auf NeoV" rechts, Tasten-Hinweise unten. Deckender
// Hintergrund, das Spiel ist nicht zu sehen.
export function HubView(props: HubViewProps) {
  const { data, announcements, promo, avatarUrl, playerPosition } = props;

  function handleNav(action: NavAction) {
    switch (action) {
      case 'resume':
        props.onResume();
        break;
      case 'map':
        props.onOpenMap();
        break;
      case 'settings':
        props.onOpenSettings();
        break;
      case 'keybinds':
        props.onOpenKeybinds();
        break;
      case 'rules':
        props.onOpenRules();
        break;
      case 'discord':
        props.onOpenDiscord();
        break;
      case 'exit':
        props.onDisconnect();
        break;
    }
  }

  return (
    <div className="hub">
      <div className="hub-backdrop">
        <Logomark className="hub-watermark" />
      </div>
      <div className="hub-frame">
        <TopBar data={data} />
        <div className="hub-rail-col">
          <NavRail onSelect={handleNav} />
        </div>
        <section className="hub-center">
          <Dossier data={data} avatarUrl={avatarUrl} />
          <StatStrip data={data} />
          <MapStrip data={data} playerPosition={playerPosition} onOpen={props.onOpenMap} />
        </section>
        <aside className="hub-now">
          <EventCard config={promo} onAction={props.onPromoAction} />
          <AnnouncementsFeed announcements={announcements} onShowAll={props.onShowAnnouncements} />
          <DiscordRow url={data.server.discordUrl} hint={data.server.discordHint} onOpen={props.onOpenDiscord} />
        </aside>
        <PromptBar data={data} />
      </div>
    </div>
  );
}
