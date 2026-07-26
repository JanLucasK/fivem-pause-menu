import { useState } from 'react';

// Liegt unter nui/public/ und wird von Vite unveraendert nach dist/ kopiert.
// base: './' (vite.config.ts) -> relativer Pfad, damit CEF die Datei ohne Server findet.
const PNG_SRC = './img/logo.png';
const SVG_SRC = './img/logo.svg';

interface BrandMarkProps {
  /** Kantenlaenge in px; das Zeichen ist nahezu quadratisch. */
  size?: number;
  className?: string;
}

/**
 * NeoV-Bildmarke. Bevorzugt das Original-PNG und faellt auf den Vektor-Nachbau
 * zurueck, solange img/logo.png nicht abgelegt ist - so bleibt die Marke sichtbar
 * statt als kaputtes Bild zu erscheinen.
 */
export function BrandMark({ size = 28, className }: BrandMarkProps) {
  const [src, setSrc] = useState(PNG_SRC);

  return (
    <img
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      src={src}
      alt="NeoV"
      width={size}
      height={size}
      onError={() => setSrc((current) => (current === PNG_SRC ? SVG_SRC : current))}
    />
  );
}
