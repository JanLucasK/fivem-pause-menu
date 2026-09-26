import { ArrowRight } from 'lucide-react';
import type { HomeData, MapPlayerPosition } from '../types';
import { AtlasPreview } from './AtlasPreview';
import { formatDistance } from './format';

interface MapStripProps {
  data: HomeData;
  playerPosition: MapPlayerPosition | null;
  onOpen: () => void;
}

// Die passive Vorschau folgt dem Spieler. Der Klick öffnet CoreRPs M-Karte.
export function MapStrip({ data, playerPosition, onOpen }: MapStripProps) {
  const distance = data.map?.waypointDistanceMeters;

  return (
    <button type="button" className="hub-map" onClick={onOpen}>
      {playerPosition && <AtlasPreview position={playerPosition} />}
      <span className="hub-map-text">
        <span className="hub-map-title">Atlas öffnen</span>
        {distance != null && <span className="hub-map-sub">Wegpunkt gesetzt · {formatDistance(distance)}</span>}
      </span>
      <span className="hub-map-arrow"><ArrowRight size="1.25rem" /></span>
    </button>
  );
}
