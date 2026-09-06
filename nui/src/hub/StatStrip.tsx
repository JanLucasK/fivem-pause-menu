import type { HomeData } from '../types';
import { formatMoney } from './format';

interface StatStripProps {
  data: HomeData;
}

// Vier Kennzahlen in einer Zeile mit Hairlines: Bargeld, Bank, Payday, Spielzeit.
export function StatStrip({ data }: StatStripProps) {
  const { finance, character } = data;
  const hours = Math.round(character.playtimeMinutes / 60);

  let paydayLabel: string | null = null;
  let paydayValue: string | null = null;
  let paydayUnit = '';
  if (finance.nextPaydayMinutes != null) {
    paydayLabel = 'Nächster Payday';
    paydayValue = String(finance.nextPaydayMinutes);
    paydayUnit = 'min';
  } else if (finance.lastPayday != null) {
    paydayLabel = 'Letzter Payday';
    paydayValue = formatMoney(finance.lastPayday);
    paydayUnit = '€';
  }

  return (
    <div className="hub-stats">
      <div className="hub-stat">
        <span className="hub-stat-label">Bargeld</span>
        <span className="hub-stat-value">
          {formatMoney(finance.cash)} <span className="hub-stat-unit hub-stat-unit--brass">€</span>
        </span>
      </div>
      <div className="hub-stat">
        <span className="hub-stat-label">Bank</span>
        <span className="hub-stat-value">
          {formatMoney(finance.bank)} <span className="hub-stat-unit hub-stat-unit--brass">€</span>
        </span>
      </div>
      <div className="hub-stat">
        {paydayLabel && (
          <>
            <span className="hub-stat-label">{paydayLabel}</span>
            <span className="hub-stat-value">
              {paydayValue}{' '}
              <span className={`hub-stat-unit${paydayUnit === '€' ? ' hub-stat-unit--brass' : ''}`}>{paydayUnit}</span>
            </span>
          </>
        )}
      </div>
      <div className="hub-stat">
        <span className="hub-stat-label">Spielzeit</span>
        <span className="hub-stat-value">
          {hours} <span className="hub-stat-unit">h</span>
        </span>
      </div>
    </div>
  );
}
