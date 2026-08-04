// Bewusst als Import statt als Pfad-String aus public/: so haengt Vite die Datei in
// die Asset-Pipeline, vergibt den gehashten Namen und setzt den relativen Pfad selbst.
// Ein handgeschriebener Pfad wuerde bei falscher base still ins Leere zeigen - die
// Marke fehlt dann kommentarlos (404 ohne sichtbaren Fehler in der NUI).
import logoUrl from '../assets/logo.png';

interface BrandMarkProps {
  /** Kantenlaenge in px; das Zeichen ist quadratisch freigestellt. */
  size?: number;
  className?: string;
}

/** NeoV-Bildmarke (freigestelltes Original-Render). */
export function BrandMark({ size = 34, className }: BrandMarkProps) {
  return (
    <img
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      src={logoUrl}
      alt="NeoV"
      width={size}
      height={size}
    />
  );
}
