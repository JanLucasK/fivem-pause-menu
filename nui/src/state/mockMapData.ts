import type { MapBlip, MapConfig, MapPlayerPosition } from '../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommen diese Werte per 'setPlayerPosition'/'setMapBlips'/'setMapConfig'
// NUI-Messages vom Client-Skript (Convars) bzw. (spaeter) von corerp.
export const mockPlayerPosition: MapPlayerPosition = { x: -200, y: 300, heading: 45 };

// POI-Testpunkte entfernt: der POI-Layer ist alleinige corerp-Domäne (siehe
// README "Map-Tab") und bekommt seine Daten erst über eine echte
// 'setMapBlips'-NUI-Message. Bis dahin bleibt der Layer leer - nur der
// Spieler-Marker (mockPlayerPosition, eigene Marker-Gruppe) bleibt bestehen.
export const mockMapBlips: MapBlip[] = [];

export const mockMapConfig: MapConfig = { defaultStyle: 'satellite', showStyleSwitcher: true };
