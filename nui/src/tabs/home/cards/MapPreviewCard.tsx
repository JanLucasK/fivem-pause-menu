import { MapIcon, ArrowUpRight } from 'lucide-react';

interface MapPreviewCardProps {
  onOpenMap: () => void;
}

// Platzhalter fuer die spaetere echte Karte (GTA-Map-Tiles + Leaflet, siehe
// README "Map-Tab"). Fuer den Prototyp reicht ein Stellvertreter-Muster, damit
// das Home-Layout final bewertet werden kann, ohne auf die Tile-Integration
// zu warten.
export function MapPreviewCard({ onOpenMap }: MapPreviewCardProps) {
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
        <div className="map-preview-placeholder-grid" />
        <div className="map-preview-pin" />
      </div>

      <button type="button" className="map-preview-open" onClick={onOpenMap}>
        <span>Open Map</span>
        <ArrowUpRight size={16} />
      </button>
    </section>
  );
}
