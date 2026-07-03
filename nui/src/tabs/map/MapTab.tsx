import { MapIcon } from 'lucide-react';
import './mapTab.css';

// Platzhalter fuer die Vollbild-Karte. Die spaetere Umsetzung ersetzt dies
// durch Leaflet + eingefaerbte GTA-Map-Tiles (eigenes Modul, s. README).
export function MapTab() {
  return (
    <div className="map-tab-placeholder">
      <MapIcon size={32} />
      <p>Vollbild-Karte folgt in einer späteren Iteration.</p>
    </div>
  );
}
