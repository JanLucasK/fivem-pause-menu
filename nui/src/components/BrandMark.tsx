// Bewusst als Import statt als Pfad-String aus public/: so haengt Vite die Datei in
// die Asset-Pipeline, vergibt den gehashten Namen und setzt den relativen Pfad selbst.
// Ein handgeschriebener Pfad wuerde bei falscher base still ins Leere zeigen - die
// Marke fehlt dann kommentarlos (404 ohne sichtbaren Fehler in der NUI).
import wordmarkUrl from '../assets/wordmark.png';

interface BrandMarkProps {
  /** Hoehe in px; die Wortmarke ist breit freigestellt, Breite ergibt sich. */
  height?: number;
  className?: string;
}

/** NeoV-Wortmarke (weiss auf transparent, fuer dunklen Grund). */
export function BrandMark({ height = 34, className }: BrandMarkProps) {
  return (
    <img
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      src={wordmarkUrl}
      alt="NeoV"
      // rem statt px-Attribut, damit die Marke mit der Root-Schrift
      // (Aufloesungs-Skalierung in global.css) mitwaechst.
      style={{ height: `${height / 16}rem`, width: 'auto' }}
    />
  );
}
