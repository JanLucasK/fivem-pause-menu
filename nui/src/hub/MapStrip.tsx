import { ArrowRight, Map as MapIcon } from 'lucide-react';
import type { HomeData } from '../types';
import { formatDistance } from './format';

interface MapStripProps {
  data: HomeData;
  onOpen: () => void;
}

// Dekorativer Einstieg; die interaktive Karte und alle Karten-Items liegen in CoreRP.
export function MapStrip({ data, onOpen }: MapStripProps) {
  const distance = data.map?.waypointDistanceMeters;

  return (
    <button type="button" className="hub-map" onClick={onOpen}>
      <span className="hub-map-art" aria-hidden="true"><MapIcon size="7rem" strokeWidth={0.8} /></span>
      <span className="hub-map-text">
        <span className="hub-map-title">Atlas öffnen</span>
        {distance != null && <span className="hub-map-sub">Wegpunkt gesetzt · {formatDistance(distance)}</span>}
      </span>
      <span className="hub-map-arrow"><ArrowRight size="1.25rem" /></span>
    </button>
  );
}
