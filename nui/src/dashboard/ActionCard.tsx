import type { LucideIcon } from 'lucide-react';
import { CardPattern } from './CardPattern';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  hint?: string;
  // 'feature' = grosse Hero-Kachel (z.B. Karte), 'default' = normale Kachel.
  variant?: 'default' | 'feature';
  // Optionaler dezenter SVG-Hintergrund, damit grosse Kacheln nicht leer wirken.
  pattern?: 'map' | 'settings';
  // Optionales Artwork als Kachel-Hintergrund (Pfad relativ zu dist/);
  // hat Vorrang vor `pattern`.
  image?: string;
  // 'contour': Kartenkachel - Tile wird per Filterkette zur dunklen
  //            Gold-Konturen-Skizze (0r-Anleihe), Overlay haelt Text lesbar.
  // 'brand':   Ghost-Watermark (z.B. NeoV-Logomark) rechts, ohne Overlay.
  imageStyle?: 'contour' | 'brand';
  // Fuer Grid-Area-Zuordnung im Dashboard-Body.
  className?: string;
  onClick: () => void;
}

// Große, anklickbare Kachel für die zentralen Menü-Aktionen (Karte / Einstellungen).
export function ActionCard({
  icon: Icon,
  title,
  subtitle,
  hint,
  variant = 'default',
  pattern,
  image,
  imageStyle,
  className,
  onClick,
}: ActionCardProps) {
  return (
    <button
      type="button"
      className={`action-card action-card--${variant}${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      {image ? (
        <span
          className={`action-card-media${imageStyle ? ` action-card-media--${imageStyle}` : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        pattern && <CardPattern kind={pattern} />
      )}
      <span className="action-card-icon">
        <Icon size={variant === 'feature' ? '1.875rem' : '1.5rem'} />
      </span>
      <span className="action-card-text">
        <span className="action-card-title">{title}</span>
        <span className="action-card-subtitle">{subtitle}</span>
      </span>
      {hint && <span className="action-card-hint">{hint}</span>}
    </button>
  );
}
