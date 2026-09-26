import { useEffect, useRef } from 'react';
import type { MapPlayerPosition } from '../types';

// Gleiche Atlas-Kalibrierung und Kachelpyramide wie CoreRP. Nur passive Vorschau:
// Karten-Items, Wegpunkte und Bedienung bleiben in der M-Karte von rp_core.
const MIN_X = -5644 + 15;
const MAX_X = 6510 + 15;
const MIN_Y = -4089 + 120;
const MAX_Y = 8065 + 120;
const TILE_BASE = import.meta.env.VITE_MAP_TILE_BASE ?? 'https://cfx-nui-rp_atlas/mapStyles';
const ATLAS_URL = `${TILE_BASE}/styleAtlas`;
const MAP_SIZE = 4096; // Atlas-Level 4: 16 Kacheln à 256 CSS-Pixel.

interface AtlasPreviewProps {
  position: MapPlayerPosition;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function AtlasPreview({ position }: AtlasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef(position);
  const redrawRef = useRef<() => void>(() => {});
  positionRef.current = position;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return;

    const images = new Map<string, HTMLImageElement>();
    let active = true;
    const draw = () => {
      if (!active) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width <= 0 || height <= 0) return;
      const scale = window.devicePixelRatio || 1;
      const pixelWidth = Math.round(width * scale);
      const pixelHeight = Math.round(height * scale);
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      context.fillStyle = '#8299a1';
      context.fillRect(0, 0, pixelWidth, pixelHeight);

      const { x, y } = positionRef.current;
      const fx = clamp01((x - MIN_X) / (MAX_X - MIN_X));
      const fy = clamp01((MAX_Y - y) / (MAX_Y - MIN_Y));
      const panX = width / 2 - fx * MAP_SIZE;
      const panY = height / 2 - fy * MAP_SIZE;

      // Grobe Kacheln bleiben sichtbar, bis die Detailkacheln geladen sind.
      for (let level = 2; level <= 4; level++) {
        const count = 2 ** level;
        const tileSize = MAP_SIZE / count;
        const firstX = Math.max(0, Math.floor(-panX / tileSize));
        const lastX = Math.min(count - 1, Math.floor((width - panX) / tileSize));
        const firstY = Math.max(0, Math.floor(-panY / tileSize));
        const lastY = Math.min(count - 1, Math.floor((height - panY) / tileSize));
        for (let tileY = firstY; tileY <= lastY; tileY++) {
          for (let tileX = firstX; tileX <= lastX; tileX++) {
            const key = `${level}/${tileX}/${tileY}`;
            let image = images.get(key);
            if (!image) {
              image = new Image();
              image.onload = draw;
              images.set(key, image);
              image.src = `${ATLAS_URL}/${key}.jpg`;
            }
            if (!image.complete || image.naturalWidth === 0) continue;
            // Benachbarte Kacheln teilen exakt dieselbe gerundete Gerätepixel-Kante.
            const left = Math.round((panX + tileX * tileSize) * scale);
            const top = Math.round((panY + tileY * tileSize) * scale);
            const right = Math.round((panX + (tileX + 1) * tileSize) * scale);
            const bottom = Math.round((panY + (tileY + 1) * tileSize) * scale);
            context.drawImage(image, left, top, right - left, bottom - top);
          }
        }
      }
    };

    redrawRef.current = draw;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => {
      active = false;
      observer.disconnect();
      redrawRef.current = () => {};
      for (const image of images.values()) image.onload = null;
      images.clear();
    };
  }, []);

  useEffect(() => { redrawRef.current(); }, [position.x, position.y]);

  return <canvas ref={canvasRef} className="hub-map-canvas" aria-hidden="true" />;
}
