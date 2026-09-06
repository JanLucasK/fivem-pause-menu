import type { HomeData, PromoConfig } from '../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommen diese Werte spaeter per NUI-Message vom Client-Skript.
export const mockHomeData: HomeData = {
  character: {
    firstName: 'Silverio',
    lastName: 'Passo',
    job: 'Unternehmer',
    faction: null,
    playtimeMinutes: 67 * 60 + 12,
    phone: '555-0134',
    serverId: 214,
  },
  finance: {
    cash: 900,
    bank: 4820,
    lastPayday: 250,
    nextPaydayMinutes: null,
  },
  server: {
    serverName: 'NeoV',
    onlinePlayers: 42,
    maxPlayers: 128,
    discordUrl: 'https://discord.gg/neov',
    joinedAtUnix: Math.floor(Date.now() / 1000) - 67 * 60,
    weather: 'Klar',
    clock: '14:32',
    discordHint: '1.240 Mitglieder',
  },
  location: 'Palomino Avenue, Vinewood',
  map: { waypointDistanceMeters: 2400 },
};

export const mockPromoConfig: PromoConfig = {
  title: 'Sommer-Event',
  subtitle: 'Doppelter Payday am Wochenende – Samstag & Sonntag',
  buttonLabel: 'Mehr erfahren',
  progress: 62,
};
