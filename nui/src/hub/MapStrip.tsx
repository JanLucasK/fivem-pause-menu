import { ArrowRight } from 'lucide-react';
import type { HomeData } from '../types';
import { formatDistance } from './format';

interface MapStripProps {
  data: HomeData;
  onOpen: () => void;
}

// Kartenstreifen: Stadt-Ausschnitt der Atlas-Karte (public/img/map-preview.jpg,
// aus mapStyles/styleAtlas/map.png geschnitten) mit Kontur-Filter als Einstieg
// in die Karte. Kein Positionspunkt - die Kachel ist ein fester Ausschnitt.
export function MapStrip({ data, onOpen }: MapStripProps) {
  const distance = data.map?.waypointDistanceMeters;
  return (
    <button type="button" className="hub-map" onClick={onOpen}>
      <span className="hub-map-media" style={{ backgroundImage: 'url(img/map-preview.jpg)' }} />
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
