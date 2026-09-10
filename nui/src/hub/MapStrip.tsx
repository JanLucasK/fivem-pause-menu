import { ArrowRight } from 'lucide-react';
import type { HomeData, MapPlayerPosition } from '../types';
import { GtaMap } from '../components/GtaMap';
import { formatDistance } from './format';

interface MapStripProps {
  data: HomeData;
  playerPosition: MapPlayerPosition | null;
  onOpen: () => void;
}

// Kartenstreifen: echte, passive Atlas-Karte aus rp_atlas. Sie folgt der
// Spielerposition, waehrend der feste Messing-Punkt die Mitte markiert. So ist
// die Vorschau an jedem Ort nuetzlich und der ganze Streifen bleibt ein klarer
// Einstieg in die interaktive Vollbildkarte.
export function MapStrip({ data, playerPosition, onOpen }: MapStripProps) {
  const distance = data.map?.waypointDistanceMeters;

  return (
    <button type="button" className="hub-map" onClick={onOpen}>
      {playerPosition && (
        <GtaMap
          playerPosition={playerPosition}
          blips={[]}
          defaultStyle="atlas"
          showStyleSwitcher={false}
          zoom={4}
          className="hub-map-canvas"
          centerOnPlayer
          interactive={false}
          showPlayerMarker={false}
        />
      )}
      {playerPosition && <span className="hub-map-dot" aria-hidden="true" />}
      <span className="hub-map-text">
        <span className="hub-map-title">Karte öffnen</span>
        {distance != null && <span className="hub-map-sub">Wegpunkt gesetzt · {formatDistance(distance)}</span>}
      </span>
      <span className="hub-map-arrow">
        <ArrowRight size="1.25rem" />
      </span>
    </button>
  );
}
