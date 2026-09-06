// Compatibility labels for older CoreRP payloads. Server display names take precedence.
// Mirrors CoreRP shared/src/contracts/jobs.ts and Modules/Factions/FactionCatalog.cs.
const labels: Record<string, string> = {
  unemployed: 'Arbeitslos', trucker: 'Trucker', realestate: 'Immobilienmakler',
  pizza: 'Pizzalieferant', newspaper: 'Zeitungsbote', garbage: 'Müllwerker',
  transit: 'Busfahrer', fishing: 'Angler', mining: 'Bergarbeiter',
  lumberjack: 'Holzfäller', mechanic: 'Mechaniker', crafting: 'Herstellen',
  lspd: 'Los Santos Police Department', lsmc: 'Los Santos Medical Center',
  fbi: 'Federal Investigation Bureau', army: 'San Andreas Army',
  lsc: 'Los Santos Customs', fahrschule: 'Fahrschule Los Santos', weazel: 'Weazel News',
  grove: 'Grove Kings', vagos: 'Vagos del Sur', triaden: 'Triaden',
  yakuza: 'Yakuza', lcn: 'La Cosa Nostra', government: 'Regierung von San Andreas',
};

export function identityLabel(key: string | null | undefined, label?: string | null): string | null {
  const value = label?.trim() || key?.trim();
  if (!value) return null;
  return labels[value.toLowerCase()] ?? value;
}
