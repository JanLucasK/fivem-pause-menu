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
  // Optionales Foto/Artwork als Kachel-Hintergrund (Pfad relativ zu dist/);
  // hat Vorrang vor `pattern`. Ein Gradient-Overlay haelt den Text lesbar.
  image?: string;
  // Fuer helle Artworks (z.B. Gold-Textur): Media stark abdunkeln, damit die
  // Kachel nicht wie ein leuchtendes Banner wirkt.
  imageDim?: boolean;
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
  imageDim = false,
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
          className={imageDim ? 'action-card-media action-card-media--dim' : 'action-card-media'}
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
