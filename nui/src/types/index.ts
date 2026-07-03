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
