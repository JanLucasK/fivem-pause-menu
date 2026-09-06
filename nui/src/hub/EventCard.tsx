import type { PromoConfig } from '../types';

interface EventCardProps {
  config: PromoConfig;
  onAction: () => void;
}

// Event-Karte (ersetzt das Promo-Banner). Convar-getrieben: kein Titel -> keine
// Karte, kein Button-Label -> kein Button, kein progress -> kein Balken.
export function EventCard({ config, onAction }: EventCardProps) {
  if (!config.title) return null;
  const progress = config.progress != null ? Math.max(0, Math.min(100, config.progress)) : null;

  return (
    <section className="hub-event">
      <span className="hub-overline hub-overline--brass">Event · Läuft</span>
      <h2 className="hub-event-title">{config.title}</h2>
      {config.subtitle && <p className="hub-event-sub">{config.subtitle}</p>}
      {progress != null && (
        <div className="hub-event-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="hub-event-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
      {config.buttonLabel && (
        <button type="button" className="hub-event-btn" onClick={onAction}>
          {config.buttonLabel}
        </button>
      )}
    </section>
  );
}
