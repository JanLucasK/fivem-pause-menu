import { useEffect, useRef } from 'react';
import 'gta-v-map';
import type { GtaVMap, MapClickDetail, MapStyle } from 'gta-v-map';
// eslint-disable-next-line import/no-unresolved -- Vite-Asset-Import, siehe README "Map-Tab".
import leafletCssUrl from 'leaflet/dist/leaflet.css?url';
import type { MapBlip, MapPlayerPosition } from '../../types';
import './mapTab.css';

interface MapTabProps {
  playerPosition: MapPlayerPosition;
  blips: MapBlip[];
  defaultStyle: MapStyle;
  showStyleSwitcher: boolean;
  onSetWaypoint: (x: number, y: number) => void;
}

// Icon-Slot-Konvention (blips/<n>.png, siehe nui/vendor/gta-v-map/UPSTREAM-README.md):
// 0 = Spieler-Marker, 1 = generischer POI-Platzhalter (beide unter
// nui/public/blips/ abgelegt). corerp kann weitere Icon-PNGs unter neuen
// Nummern ablegen und ueber MapBlip.icon referenzieren, sobald echte
// POI-Daten kommen.
const PLAYER_ICON = 0;
const DEFAULT_BLIP_ICON = 1;
const PLAYER_MARKER_ID = 'player';
const POI_GROUP = 'POI';

// import.meta.env.BASE_URL spiegelt vite.config.ts' base:'./' zur Laufzeit -
// noetig, damit tile-base-url/blips-url in FiveMs CEF (kein Root-Server)
// genauso funktionieren wie im Browser-Dev. Siehe README "Map-Tab".
const BASE = import.meta.env.BASE_URL;

// Vollbild-Karte auf Basis des <gta-v-map>-Web-Components (vendored, siehe
// nui/vendor/gta-v-map/). Liefert die 3 Kartenstile (Atlas/Grid/Satellite)
// inkl. Umschalter (`show-layer-control`) sowie die GTA-Weltkoordinaten-
// Transformation fertig mit. Spieler-Marker und POI/Icon-Layer (von corerp)
// sind bewusst getrennte Marker-Gruppen, damit eine spaetere Spieler-
// Zeichnungsebene (siehe README) keine von beiden beruehrt.
export function MapTab({ playerPosition, blips, defaultStyle, showStyleSwitcher, onSetWaypoint }: MapTabProps) {
  const mapRef = useRef<GtaVMap | null>(null);
  const onSetWaypointRef = useRef(onSetWaypoint);
  onSetWaypointRef.current = onSetWaypoint;

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<MapClickDetail>).detail;
      onSetWaypointRef.current(detail.x, detail.y);
    };
    el.addEventListener('map-click', listener);
    return () => el.removeEventListener('map-click', listener);
  }, []);

  // Spielerposition live nachfuehren (eigene, feste Marker-Id -> Upsert statt
  // Neuanlage, siehe addMarker-Doku im vendorten Package).
  useEffect(() => {
    mapRef.current?.addMarker({
      id: PLAYER_MARKER_ID,
      x: playerPosition.x,
      y: playerPosition.y,
      icon: PLAYER_ICON,
      group: 'Player',
    });
  }, [playerPosition]);

  // POI/Icon-Layer aus corerp-Daten neu zeichnen, wenn sich die Blip-Liste
  // aendert (corerp bleibt alleinige Quelle fuer diesen Layer).
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    for (const marker of el.getMarkers()) {
      if (marker.group === POI_GROUP) el.removeMarker(marker.id);
    }
    for (const blip of blips) {
      el.addMarker({
        id: blip.id,
        x: blip.x,
        y: blip.y,
        icon: DEFAULT_BLIP_ICON,
        popup: blip.label,
        group: POI_GROUP,
      });
    }
  }, [blips]);

  // Boolean-Properties ueber die Ref statt als JSX-Attribut setzen: React
  // serialisiert Props auf Custom Elements (Tag mit Bindestrich) uneindeutig
  // zu Boolean-Attributen, Lits Standard-Boolean-Konverter wertet aber jedes
  // vorhandene Attribut (auch "false") als true. Gleiches Muster wie
  // placeMode/showHeatmap in der Original-Demo (useGtaVMap.ts).
  useEffect(() => {
    if (mapRef.current) mapRef.current.showLayerControl = showStyleSwitcher;
  }, [showStyleSwitcher]);

  return (
    <gta-v-map
      ref={mapRef}
      className="map-tab-canvas"
      zoom={3}
      default-style={defaultStyle}
      tile-base-url={`${BASE}mapStyles`}
      blips-url={`${BASE}blips`}
      leaflet-css-url={leafletCssUrl}
      disable-clustering
    />
  );
}
