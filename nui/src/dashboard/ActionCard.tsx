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
  onClick,
}: ActionCardProps) {
  return (
    <button type="button" className={`action-card action-card--${variant}`} onClick={onClick}>
      {pattern && <CardPattern kind={pattern} />}
      <span className="action-card-icon">
        <Icon size={variant === 'feature' ? 30 : 24} />
      </span>
      <span className="action-card-text">
        <span className="action-card-title">{title}</span>
        <span className="action-card-subtitle">{subtitle}</span>
      </span>
      {hint && <span className="action-card-hint">{hint}</span>}
    </button>
  );
}
