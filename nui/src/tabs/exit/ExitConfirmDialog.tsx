import { LogOut } from 'lucide-react';
import { fetchNui } from '../../bridge/nui';
import './exitConfirmDialog.css';

interface ExitConfirmDialogProps {
  onCancel: () => void;
}

export function ExitConfirmDialog({ onCancel }: ExitConfirmDialogProps) {
  async function handleConfirm() {
    await fetchNui('disconnect');
  }

  return (
    <div className="exit-dialog-backdrop" onClick={onCancel}>
      <div className="exit-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="exit-dialog-icon">
          <LogOut size={22} />
        </div>
        <h3 className="exit-dialog-title">Server verlassen?</h3>
        <p className="exit-dialog-text">Du wirst die Verbindung zu NeoV trennen.</p>
        <div className="exit-dialog-actions">
          <button type="button" className="exit-dialog-btn exit-dialog-btn--secondary" onClick={onCancel}>
            Abbrechen
          </button>
          <button type="button" className="exit-dialog-btn exit-dialog-btn--primary" onClick={handleConfirm}>
            Verlassen
          </button>
        </div>
      </div>
    </div>
  );
}
