import { MapIcon, ArrowUpRight } from 'lucide-react';
import type { MapBlip, MapPlayerPosition, MapStyle } from '../../../types';
import { GtaMap } from '../../../components/GtaMap';

interface MapPreviewCardProps {
  playerPosition: MapPlayerPosition;
  blips: MapBlip[];
  mapStyle: MapStyle;
  onOpenMap: () => void;
}

// Live-Miniaturkarte (dieselbe GtaMap wie im Map-Tab, siehe
// components/GtaMap.tsx) statt eines statischen Platzhalters. Kein
// Style-Switcher (fixer defaultStyle), Klick auf die Karte oeffnet wie der
// Button den vollen Map-Tab.
export function MapPreviewCard({ playerPosition, blips, mapStyle, onOpenMap }: MapPreviewCardProps) {
  return (
    <section className="map-preview-card">
      <div className="map-preview-head">
        <div className="hcard-icon">
          <MapIcon size={18} />
        </div>
        <div>
          <p className="hcard-eyebrow">View Location</p>
          <h3 className="hcard-title">Map</h3>
        </div>
      </div>

      <div className="map-preview-canvas">
        <GtaMap
          playerPosition={playerPosition}
          blips={blips}
          defaultStyle={mapStyle}
          showStyleSwitcher={false}
          zoom={2}
          className="map-preview-card-canvas"
          onMapClick={onOpenMap}
        />
      </div>

      <button type="button" className="map-preview-open" onClick={onOpenMap}>
        <span>Open Map</span>
        <ArrowUpRight size={16} />
      </button>
    </section>
  );
}
