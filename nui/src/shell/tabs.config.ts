import type { TabDefinition } from '../types';

// Zentrale Tab-Registrierung. Neue Screens/Actions werden hier eingetragen -
// TabNav und AppShell lesen ausschliesslich aus dieser Liste (kein Ort sonst
// kennt die Tab-Reihenfolge hart codiert).
export const TABS: TabDefinition[] = [
  { id: 'home', label: 'Home', kind: 'screen' },
  { id: 'map', label: 'Map', kind: 'screen' },
  { id: 'settings', label: 'Settings', kind: 'screen' },
  { id: 'keybinds', label: 'Keybinds', kind: 'screen' },
  { id: 'discord', label: 'Discord', kind: 'action' },
  { id: 'exit', label: 'Exit', kind: 'action' },
];
