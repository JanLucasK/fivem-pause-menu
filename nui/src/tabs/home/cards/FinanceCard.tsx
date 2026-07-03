import { Wallet } from 'lucide-react';
import type { FinanceInfo } from '../../../types';
import { Card } from './Card';

function formatMoney(amount: number): string {
  return `${amount.toLocaleString('de-DE')} €`;
}

export function FinanceCard({ finance }: { finance: FinanceInfo }) {
  return (
    <Card icon={Wallet} eyebrow="Finanzen" title="Konto">
      <div className="hcard-row">
        <span>Bargeld</span>
        <span className="hcard-value">{formatMoney(finance.cash)}</span>
      </div>
      <div className="hcard-row">
        <span>Bank</span>
        <span className="hcard-value">{formatMoney(finance.bank)}</span>
      </div>
      {finance.lastPayday !== null && (
        <div className="hcard-row hcard-row--muted">
          <span>Letzter Payday</span>
          <span>+{formatMoney(finance.lastPayday)}</span>
        </div>
      )}
    </Card>
  );
}
