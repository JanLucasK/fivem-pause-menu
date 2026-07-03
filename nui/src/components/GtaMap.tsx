import { useEffect, useRef } from 'react';
import 'gta-v-map';
import type { GtaVMap, MapClickDetail, MapStyle } from 'gta-v-map';
// eslint-disable-next-line import/no-unresolved -- Vite-Asset-Import, siehe README "Map-Tab".
import leafletCssUrl from 'leaflet/dist/leaflet.css?url';
import type { MapBlip, MapPlayerPosition } from '../types';

interface GtaMapProps {
  playerPosition: MapPlayerPosition;
  blips: MapBlip[];
  defaultStyle: MapStyle;
  showStyleSwitcher: boolean;
  zoom: number;
  className: string;
  /** Aktuell gesetzter Wegpunkt (Klick auf die Karte), fuer den Pin auf dieser
   *  Karteninstanz. undefined/null blendet den Pin aus. */
  waypoint?: { x: number; y: number } | null;
  onMapClick?: (x: number, y: number) => void;
}

// Icon-Slot-Konvention (blips/<n>.png, siehe nui/vendor/gta-v-map/UPSTREAM-README.md):
// 0 = Spieler-Marker, 1 = generischer POI-Platzhalter, 2 = Wegpunkt-Pin (alle
// unter nui/public/blips/ abgelegt). corerp kann weitere Icon-PNGs unter neuen
// Nummern ablegen und ueber MapBlip.icon referenzieren, sobald echte
// POI-Daten kommen.
const PLAYER_ICON = 0;
const DEFAULT_BLIP_ICON = 1;
const WAYPOINT_ICON = 2;
const PLAYER_MARKER_ID = 'player';
const WAYPOINT_MARKER_ID = 'waypoint';
const POI_GROUP = 'POI';

// import.meta.env.BASE_URL spiegelt vite.config.ts' base:'./' zur Laufzeit -
// noetig, damit tile-base-url/blips-url in FiveMs CEF (kein Root-Server)
// genauso funktionieren wie im Browser-Dev. Siehe README "Map-Tab".
const BASE = import.meta.env.BASE_URL;

// Wiederverwendbarer Kern des <gta-v-map>-Web-Components (vendored, siehe
// nui/vendor/gta-v-map/): Spieler-/POI-Marker-Sync und Klick-Weiterleitung an
// einer Stelle gepflegt, damit MapTab (Vollbild) und MapPreviewCard
// (Home-Tab-Vorschau) denselben, getesteten Marker-Sync nutzen statt ihn
// doppelt zu implementieren.
export function GtaMap({
  playerPosition,
  blips,
  defaultStyle,
  showStyleSwitcher,
  zoom,
  className,
  waypoint,
  onMapClick,
}: GtaMapProps) {
  const mapRef = useRef<GtaVMap | null>(null);
  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<MapClickDetail>).detail;
      onMapClickRef.current?.(detail.x, detail.y);
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

  // Wegpunkt-Pin: eigene, feste Marker-Id -> Upsert, damit ein erneuter Klick
  // den vorherigen Pin verschiebt statt einen zweiten zu erzeugen. Der echte
  // GTA-Wegpunkt (natives Minimap-HUD) wird separat ueber onMapClick/
  // SetNewWaypoint gesetzt - dieser Marker ist nur das visuelle Feedback auf
  // dieser Karteninstanz.
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    if (waypoint) {
      el.addMarker({
        id: WAYPOINT_MARKER_ID,
        x: waypoint.x,
        y: waypoint.y,
        icon: WAYPOINT_ICON,
        popup: 'Wegpunkt',
        group: 'Waypoint',
      });
    } else {
      el.removeMarker(WAYPOINT_MARKER_ID);
    }
  }, [waypoint]);

  // Boolean-Properties ueber die Ref statt als JSX-Attribut setzen: React
  // serialisiert Props auf Custom Elements (Tag mit Bindestrich) uneindeutig
  // zu Boolean-Attributen, Lits Standard-Boolean-Konverter wertet aber jedes
  // vorhandene Attribut (auch "false") als true. Gleiches Muster wie
  // placeMode/showHeatmap in der Original-Demo (useGtaVMap.ts).
  useEffect(() => {
    if (mapRef.current) mapRef.current.showLayerControl = showStyleSwitcher;
  }, [showStyleSwitcher]);

  // className ebenfalls ueber die Ref setzen: React schreibt das className-Prop
  // auf Custom Elements (Tag mit Bindestrich) als woertliches "className"-Attribut
  // statt als "class" (nur fuer eingebaute HTML-Tags uebersetzt React das um) -
  // unsere CSS-Klasse (mapTab.css/homeTab.css, u.a. --gta-water-color) wuerde
  // sonst nie greifen. element.className setzt zuverlaessig das echte
  // "class"-Attribut.
  useEffect(() => {
    if (mapRef.current) mapRef.current.className = className;
  }, [className]);

  return (
    <gta-v-map
      ref={mapRef}
      zoom={zoom}
      default-style={defaultStyle}
      tile-base-url={`${BASE}mapStyles`}
      blips-url={`${BASE}blips`}
      leaflet-css-url={leafletCssUrl}
      disable-clustering
    />
  );
}
