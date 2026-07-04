import type { TabDefinition } from '../types';

// Zentrale Tab-Registrierung. Neue Screens/Actions werden hier eingetragen -
// TabNav und AppShell lesen ausschliesslich aus dieser Liste (kein Ort sonst
// kennt die Tab-Reihenfolge hart codiert).
export const TABS: TabDefinition[] = [
  { id: 'home', label: 'Home', kind: 'screen' },
  { id: 'map', label: 'Karte', kind: 'screen' },
  { id: 'settings', label: 'Einstellungen', kind: 'screen' },
  { id: 'rules', label: 'Regeln & Hilfe', kind: 'screen' },
  { id: 'discord', label: 'Discord', kind: 'action' },
  { id: 'exit', label: 'Verbindung trennen', kind: 'action' },
];
