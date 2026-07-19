export type TabId = 'home' | 'map' | 'settings' | 'rules' | 'discord' | 'exit';

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
  // Unix-Zeit (Sekunden), zu der der Spieler dem Server beigetreten ist - in
  // client/client.lua beim Ressourcenstart per os.time() festgehalten und im
  // Player-Bar als "Beigetreten" angezeigt. null, solange unbekannt (Browser-Dev).
  joinedAtUnix: number | null;
}

// Eine Ankündigung/News-Karte für die rechte Spalte des Menüs. Aktuell reiner
// Mock (siehe state/mockAnnouncements.ts) - später könnte dies aus einem
// CMS/Discord-Feed kommen, das UI bleibt gleich.
export interface Announcement {
  id: string;
  tag: string;
  date: string;
  title: string;
  body: string;
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

// Ein Keybind-Eintrag, wie ihn client/keybinds.lua liefert. `resource` ist die
// Resource, die den Bind per `RegisterKeybind`-Export angemeldet hat (NeoV
// selbst oder eine beliebige andere Resource) - rein informativ fürs UI.
export interface KeybindEntry {
  id: string;
  resource: string;
  command: string;
  label: string;
  category: string;
  mapper: string;
  key: string;
  defaultKey: string;
}

// Ein Settings-Eintrag, wie ihn client/settings.lua liefert (siehe
// `RegisterSetting`-Export dort). `value` ist number bei type 'slider',
// boolean bei type 'toggle'.
export interface SettingDefinition {
  id: string;
  resource: string;
  section: string;
  label: string;
  type: 'slider' | 'toggle';
  value: number | boolean;
  min?: number;
  max?: number;
}

// Server-seitig konfigurierbar ueber server.cfg-Convars (neov_pausemenu_map_*,
// siehe client/client.lua) statt hart im NUI-Code - Serverbetreiber koennen so
// Default-Stil/Umschalter ohne NUI-Rebuild aendern.
export interface MapConfig {
  defaultStyle: MapStyle;
  showStyleSwitcher: boolean;
}

// Statischer Inhalt fuer den "Regeln & Hilfe"-Tab, gepflegt in
// nui/src/tabs/rules/rules.data.ts - anders als Keybinds/Settings kommt das
// nicht per NUI-Message vom Client, da es keine registrierende Resource gibt.
export interface RuleSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}
