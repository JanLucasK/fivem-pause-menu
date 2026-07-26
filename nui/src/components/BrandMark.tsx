import { useId } from 'react';

interface BrandMarkProps {
  /** Kantenlaenge in px; das Zeichen ist nahezu quadratisch. */
  size?: number;
  className?: string;
}

// Silhouette des NeoV-Zeichens (Zickzack mit Pfeilspitze), einmal definiert und
// unten zweimal gezeichnet: versetzt als Extrusionstiefe, davor in Gold.
const MARK_PATH =
  'M 18.2 82.7 L 36.5 48.7 L 58 103 L 100 41.2 L 96.8 12.8 ' +
  'L 70.8 24.9 L 61.2 55.1 L 39.4 0 L 0 72.9 Z';

/**
 * NeoV-Bildmarke als inline-SVG - bewusst keine externe Datei: die muesste erst
 * ueber das files{}-Manifest ausgeliefert werden, und genau daran scheitert die
 * Marke sonst still (404 ohne sichtbaren Fehler). Inline kann sie nicht fehlen.
 */
export function BrandMark({ size = 34, className }: BrandMarkProps) {
  // TopBar und PlayerBar koennen gleichzeitig im DOM stehen - ohne eindeutige
  // IDs wuerden sich ihre Verlaufsdefinitionen gegenseitig ueberschreiben.
  const uid = useId();
  const goldId = `neovGold-${uid}`;
  const depthId = `neovDepth-${uid}`;

  return (
    <svg
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      viewBox="-1 -1 106 110"
      width={size}
      height={size * 1.04}
      role="img"
      aria-label="NeoV"
    >
      <defs>
        {/* Gebuerstetes Messing: heller Anschliff oben links, dunkler Abfall unten rechts. */}
        <linearGradient id={goldId} x1="0.05" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f2d78e" />
          <stop offset="26%" stopColor="#cb9b30" />
          <stop offset="50%" stopColor="#f7e5aa" />
          <stop offset="76%" stopColor="#bd8c24" />
          <stop offset="100%" stopColor="#8b6414" />
        </linearGradient>
        {/* Extrusionsflanke: fast schwarz mit einem Rest Goldton, damit die Tiefe warm bleibt. */}
        <linearGradient id={depthId} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#402e0a" />
          <stop offset="100%" stopColor="#0a0803" />
        </linearGradient>
      </defs>
      <path transform="translate(3.5 4.5)" fill={`url(#${depthId})`} d={MARK_PATH} />
      <path fill={`url(#${goldId})`} stroke="#7a5710" strokeWidth="0.6" d={MARK_PATH} />
    </svg>
  );
}
