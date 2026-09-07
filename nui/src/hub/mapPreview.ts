// Projektion Spielwelt -> Kartenstreifen. Der Streifen zeigt einen festen
// Ausschnitt aus public/mapStyles/styleAtlas/map.png (8192 x 8192 px, das ist
// Zoomstufe 5 der Leaflet-Kacheln). Die Weltkoordinaten-Transformation ist
// dieselbe wie im vendorten gta-v-map (GTA_CRS_CONFIG): px = (scaleX*x +
// centerX) * 2^zoom, py = (-scaleY*y + centerY) * 2^zoom.

const CRS = { centerX: 117.3, centerY: 172.8, scaleX: 0.02072, scaleY: 0.0205 };
const ATLAS_ZOOM_SCALE = 32; // 2^5

// Pixel-Rechteck des Ausschnitts in map.png, aus dem public/img/map-preview.jpg
// geschnitten wurde (Mitte 52 % / 72 %, Breite 42 %, Seitenverhaeltnis 2,1:1).
export const PREVIEW_CROP = { left: 2539, top: 5079, width: 3440, height: 1638 };
export const PREVIEW_ASPECT = PREVIEW_CROP.width / PREVIEW_CROP.height;

// Weltkoordinate -> Anteil (0..1) innerhalb des Ausschnitts; null ausserhalb.
export function worldToPreviewFraction(x: number, y: number): { fx: number; fy: number } | null {
  const px = (CRS.scaleX * x + CRS.centerX) * ATLAS_ZOOM_SCALE;
  const py = (-CRS.scaleY * y + CRS.centerY) * ATLAS_ZOOM_SCALE;
  const fx = (px - PREVIEW_CROP.left) / PREVIEW_CROP.width;
  const fy = (py - PREVIEW_CROP.top) / PREVIEW_CROP.height;
  if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return null;
  return { fx, fy };
}

// Anteil im Bild -> Pixel im Container, der das Bild mit "cover" zeigt
// (Ueberstand ist zentriert und abgeschnitten). null, wenn der Punkt im
// abgeschnittenen Bereich liegt.
export function coverPoint(
  fx: number,
  fy: number,
  containerWidth: number,
  containerHeight: number,
): { left: number; top: number } | null {
  if (containerWidth <= 0 || containerHeight <= 0) return null;
  const containerAspect = containerWidth / containerHeight;
  let drawnWidth: number;
  let drawnHeight: number;
  if (containerAspect > PREVIEW_ASPECT) {
    drawnWidth = containerWidth;
    drawnHeight = containerWidth / PREVIEW_ASPECT;
  } else {
    drawnHeight = containerHeight;
    drawnWidth = containerHeight * PREVIEW_ASPECT;
  }
  const offsetX = (containerWidth - drawnWidth) / 2;
  const offsetY = (containerHeight - drawnHeight) / 2;
  const left = offsetX + fx * drawnWidth;
  const top = offsetY + fy * drawnHeight;
  if (left < 0 || left > containerWidth || top < 0 || top > containerHeight) return null;
  return { left, top };
}
