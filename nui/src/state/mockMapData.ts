import type { MapBlip, MapConfig, MapPlayerPosition } from '../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommen diese Werte per 'setPlayerPosition'/'setMapBlips'/'setMapConfig'
// NUI-Messages vom Client-Skript (Convars) bzw. (spaeter) von corerp.
export const mockPlayerPosition: MapPlayerPosition = { x: -200, y: 300, heading: 45 };

export const mockMapBlips: MapBlip[] = [
  { id: 'ls-customs', x: -350, y: -130, label: 'LS Customs', color: '#c8973f' },
  { id: 'pillbox', x: 300, y: -600, label: 'Pillbox Hill Medical', color: '#e5484d' },
  { id: 'legion-square', x: 0, y: 0, label: 'Legion Square', color: '#9aa0ad' },
];

export const mockMapConfig: MapConfig = { defaultStyle: 'satellite', showStyleSwitcher: true };
