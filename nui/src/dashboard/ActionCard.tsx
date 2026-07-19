import type { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  hint?: string;
  // 'feature' = grosse Hero-Kachel (z.B. Karte), 'default' = normale Kachel.
  variant?: 'default' | 'feature';
  onClick: () => void;
}

// Große, anklickbare Kachel für die zentralen Menü-Aktionen (Karte / Einstellungen).
export function ActionCard({
  icon: Icon,
  title,
  subtitle,
  hint,
  variant = 'default',
  onClick,
}: ActionCardProps) {
  return (
    <button type="button" className={`action-card action-card--${variant}`} onClick={onClick}>
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
