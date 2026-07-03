import type { HomeData } from '../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommen diese Werte spaeter per NUI-Message vom Client-Skript.
export const mockHomeData: HomeData = {
  character: {
    firstName: 'Silverio',
    lastName: 'Passo',
    job: 'Unternehmer',
    faction: null,
    playtimeMinutes: 67,
  },
  finance: {
    cash: 900,
    bank: 4820,
    lastPayday: 250,
  },
  server: {
    serverName: 'NeoV',
    onlinePlayers: 42,
    maxPlayers: 128,
    discordUrl: 'https://discord.gg/neov',
  },
  location: 'Palomino Avenue',
};
