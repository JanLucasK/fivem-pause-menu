import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { HomeData, MapPlayerPosition } from '../types';
import { formatDistance } from './format';
import { coverPoint, worldToPreviewFraction } from './mapPreview';

interface MapStripProps {
  data: HomeData;
  playerPosition: MapPlayerPosition | null;
  onOpen: () => void;
}

// Kartenstreifen: vorab erzeugter Stadt-Ausschnitt der Atlas-Karte
// (public/img/map-preview.jpg) mit Kontur-Filter als Einstieg in die Karte.
// Der Messing-Punkt ist die echte Spielerposition (setPlayerPosition vom
// Client), auf den Ausschnitt projiziert; ausserhalb -> kein Punkt.
export function MapStrip({ data, playerPosition, onOpen }: MapStripProps) {
  const distance = data.map?.waypointDistanceMeters;
  const ref = useRef<HTMLButtonElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Containergroesse beobachten: "cover" schneidet je nach Seitenverhaeltnis
  // oben/unten oder links/rechts ab, der Punkt muss das mitrechnen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fraction = playerPosition ? worldToPreviewFraction(playerPosition.x, playerPosition.y) : null;
  const dot = fraction ? coverPoint(fraction.fx, fraction.fy, size.width, size.height) : null;

  return (
    <button ref={ref} type="button" className="hub-map" onClick={onOpen}>
      <span className="hub-map-media" style={{ backgroundImage: 'url(img/map-preview.jpg)' }} />
      {dot && <span className="hub-map-dot" style={{ left: `${dot.left}px`, top: `${dot.top}px` }} />}
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
