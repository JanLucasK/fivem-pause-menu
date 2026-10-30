import { useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { LogOut } from 'lucide-react';
import { fetchNui } from '../../bridge/nui';
import './exitConfirmDialog.css';

interface ExitConfirmDialogProps {
  onCancel: () => void;
}

// Bestaetigung vor dem Trennen. Der Fokus startet auf "Abbrechen", damit ein
// versehentliches Enter niemanden vom Server wirft; Pfeil links/rechts
// wechseln, ESC bricht ab (AppShell laesst ESC bei offenem Dialog durch).
export function ExitConfirmDialog({ onCancel }: ExitConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  // AppShell rendert laufend neu (Spielerposition); der Fokus darf nur beim
  // Oeffnen gesetzt werden, deshalb onCancel per Ref statt als Effect-Abhaengigkeit.
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  useEffect(() => {
    // Nach dem Schliessen zurueck auf "Verlassen" in der Rail.
    const previous = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onCancelRef.current();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      previous?.focus();
    };
  }, []);

  async function handleConfirm() {
    await fetchNui('disconnect');
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab') {
      event.preventDefault();
      const next = document.activeElement === cancelRef.current ? confirmRef.current : cancelRef.current;
      next?.focus();
    }
  }

  return (
    <div className="exit-dialog-backdrop" onClick={onCancel}>
      <div
        className="exit-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="exit-dialog-title"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <span className="exit-dialog-overline">
          <LogOut size="1rem" />
          Verbindung trennen
        </span>
        <h2 id="exit-dialog-title" className="exit-dialog-title">
          Server verlassen?
        </h2>
        <p className="exit-dialog-text">Du wirst die Verbindung zu Neo V trennen.</p>
        <div className="exit-dialog-actions">
          <button ref={cancelRef} type="button" className="exit-dialog-btn" onClick={onCancel}>
            Abbrechen
          </button>
          <button ref={confirmRef} type="button" className="exit-dialog-btn exit-dialog-btn--danger" onClick={handleConfirm}>
            Verlassen
          </button>
        </div>
        <div className="exit-dialog-prompts">
          <span>
            <kbd className="hub-key">← →</kbd> Wählen
          </span>
          <span>
            <kbd className="hub-key">ENTER</kbd> Bestätigen
          </span>
          <span>
            <kbd className="hub-key">ESC</kbd> Abbrechen
          </span>
        </div>
      </div>
    </div>
  );
}
