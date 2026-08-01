import { Sparkles } from 'lucide-react';
import type { PromoConfig } from '../types';

interface PromoBannerProps {
  config: PromoConfig;
  onAction: () => void;
}

// Event-/Promo-Banner unten im Hub (0r: Battle-Pass-Slot). Inhalt kommt per
// Convars vom Client (setPromoConfig, client/client.lua): leerer Titel blendet
// das Banner komplett aus, leerer Button-Text nur den Button.
export function PromoBanner({ config, onAction }: PromoBannerProps) {
  if (!config.title) return null;

  return (
    <section className="promo-banner">
      <div className="promo-banner-glow" />
      <div className="promo-banner-icon">
        <Sparkles size="1.375rem" />
      </div>
      <div className="promo-banner-text">
        <h3 className="promo-banner-title">{config.title}</h3>
        {config.subtitle && <p className="promo-banner-subtitle">{config.subtitle}</p>}
      </div>
      {config.buttonLabel && (
        <button type="button" className="promo-banner-btn" onClick={onAction}>
          {config.buttonLabel}
        </button>
      )}
    </section>
  );
}
