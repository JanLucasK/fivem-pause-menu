import { useEffect, useState } from 'react';
import { Pencil, RotateCcw } from 'lucide-react';
import type { KeybindEntry } from '../../types';
import { browserKeyToFivemKey } from './keyNameMap';
import './keybindsTab.css';

interface KeybindsTabProps {
  keybinds: KeybindEntry[];
  onRebind: (id: string, key: string) => void;
  onReset: (id: string) => void;
}

function groupByCategory(entries: KeybindEntry[]) {
  const groups = new Map<string, KeybindEntry[]>();
  for (const entry of entries) {
    const bucket = groups.get(entry.category) ?? [];
    bucket.push(entry);
    groups.set(entry.category, bucket);
  }
  return groups;
}

// Datengetrieben: die Liste kommt vom Client (RegisterKeybind-Registry, siehe
// client/keybinds.lua) statt aus lokalen Mock-Daten - jede Resource, die dort
// registriert, taucht hier automatisch auf. "Rebind" ruft fetchNui('rebindKey', ...)
// auf, das Client-seitig `bind`/`unbind` ausführt und die Wahl persistiert.
export function KeybindsTab({ keybinds, onRebind, onReset }: KeybindsTabProps) {
  const [listeningFor, setListeningFor] = useState<string | null>(null);

  useEffect(() => {
    if (!listeningFor) return;

    const handler = (event: KeyboardEvent) => {
      event.preventDefault();
      // Capture + stopImmediatePropagation: muss vor AppShells ESC-Handler
      // (schliesst das ganze Menü) laufen, sonst würde Escape während der
      // Aufnahme das Menü schliessen statt nur die Aufnahme abzubrechen.
      event.stopImmediatePropagation();

      if (event.code === 'Escape') {
        setListeningFor(null);
        return;
      }

      const key = browserKeyToFivemKey(event);
      if (!key) return; // unbekannte Taste - Aufnahme laeuft weiter

      setListeningFor(null);
      onRebind(listeningFor, key);
    };

    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [listeningFor, onRebind]);

  const groups = groupByCategory(keybinds);

  return (
    <div className="keybinds-tab">
      {Array.from(groups.entries()).map(([category, entries]) => (
        <section key={category} className="keybinds-group">
          <h3 className="keybinds-group-title">{category}</h3>
          <div className="keybinds-list">
            {entries.map((entry) => (
              <div key={entry.id} className="keybinds-row">
                <span className="keybinds-action">{entry.label}</span>
                <div className="keybinds-controls">
                  {entry.key !== entry.defaultKey && (
                    <button
                      type="button"
                      className="keybinds-reset"
                      title="Auf Standard zurücksetzen"
                      onClick={() => onReset(entry.id)}
                    >
                      <RotateCcw size={12} />
                    </button>
                  )}
                  <button
                    type="button"
                    className={`keybinds-key ${listeningFor === entry.id ? 'listening' : ''}`}
                    onClick={() => setListeningFor(entry.id)}
                  >
                    {listeningFor === entry.id ? (
                      <span>Taste drücken…</span>
                    ) : (
                      <>
                        <span>{entry.key}</span>
                        <Pencil size={12} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
