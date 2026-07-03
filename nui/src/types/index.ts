export type TabId = 'home' | 'map' | 'settings' | 'keybinds' | 'discord' | 'exit';

export interface TabDefinition {
  id: TabId;
  label: string;
  kind: 'screen' | 'action';
}

export interface CharacterInfo {
  firstName: string;
  lastName: string;
  job: string | null;
  faction: string | null;
  playtimeMinutes: number;
}

export interface FinanceInfo {
  cash: number;
  bank: number;
  lastPayday: number | null;
}

export interface ServerInfo {
  serverName: string;
  onlinePlayers: number;
  maxPlayers: number;
  discordUrl: string;
}

export interface HomeData {
  character: CharacterInfo;
  finance: FinanceInfo;
  server: ServerInfo;
  location: string;
}

export interface MapPlayerPosition {
  x: number;
  y: number;
  heading: number;
}

// Ein POI/Icon-Eintrag, wie ihn corerp pushen wird (Shops, Dienste, andere
// Spieler etc.). Bewusst getrennt vom Spieler-Zeichnungs-Layer (siehe README
// Map-Tab): corerp bleibt alleinige Quelle fuer diesen Layer.
export interface MapBlip {
  id: string;
  x: number;
  y: number;
  label: string;
  color?: string;
}

export type MapStyle = 'satellite' | 'atlas' | 'grid';

// Server-seitig konfigurierbar ueber server.cfg-Convars (neov_pausemenu_map_*,
// siehe client/client.lua) statt hart im NUI-Code - Serverbetreiber koennen so
// Default-Stil/Umschalter ohne NUI-Rebuild aendern.
export interface MapConfig {
  defaultStyle: MapStyle;
  showStyleSwitcher: boolean;
}
