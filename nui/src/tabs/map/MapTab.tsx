import { useState } from 'react';
import type { MapStyle } from 'gta-v-map';
import type { MapBlip, MapPlayerPosition } from '../../types';
import { GtaMap } from '../../components/GtaMap';
import './mapTab.css';

interface MapTabProps {
  playerPosition: MapPlayerPosition;
  blips: MapBlip[];
  defaultStyle: MapStyle;
  showStyleSwitcher: boolean;
  onSetWaypoint: (x: number, y: number) => void;
}

// Vollbild-Karte auf Basis von GtaMap (siehe components/GtaMap.tsx). Liefert
// die 3 Kartenstile (Atlas/Grid/Satellite) inkl. Umschalter sowie
// Waypoint-Setzen per Klick: setzt den echten GTA-Wegpunkt (natives
// Minimap-HUD, via onSetWaypoint/SetNewWaypoint) und zeigt zusaetzlich einen
// Pin auf dieser Karte selbst.
export function MapTab({ playerPosition, blips, defaultStyle, showStyleSwitcher, onSetWaypoint }: MapTabProps) {
  const [waypoint, setWaypoint] = useState<{ x: number; y: number } | null>(null);

  function handleMapClick(x: number, y: number) {
    setWaypoint({ x, y });
    onSetWaypoint(x, y);
  }

  return (
    <GtaMap
      playerPosition={playerPosition}
      blips={blips}
      defaultStyle={defaultStyle}
      showStyleSwitcher={showStyleSwitcher}
      zoom={3}
      className="map-tab-canvas"
      waypoint={waypoint}
      onMapClick={handleMapClick}
    />
  );
}
