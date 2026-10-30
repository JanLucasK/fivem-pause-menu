import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import type { KeybindEntry } from '../../types';
import { OverlayView } from '../../shell/OverlayView';
import { SectionNav } from '../../shell/SectionNav';
import { browserKeyToFivemKey } from './keyNameMap';
import './keybindsTab.css';

interface KeybindsTabProps {
  keybinds: KeybindEntry[];
  onRebind: (id: string, key: string) => void;
  onReset: (id: string) => void;
  onBack: () => void;
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
// Bedienung: links Kategorien, Pfeil rechts in die Liste, Enter nimmt eine
// neue Taste auf, Entf setzt auf Standard zurueck, Pfeil links zurueck.
export function KeybindsTab({ keybinds, onRebind, onReset, onBack }: KeybindsTabProps) {
  const groups = groupByCategory(keybinds);
  const categories = Array.from(groups.keys());
  const [category, setCategory] = useState(categories[0] ?? '');
  const [listeningFor, setListeningFor] = useState<string | null>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCategory = groups.has(category) ? category : categories[0] ?? '';
  const entries = groups.get(activeCategory) ?? [];

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

  function focusRow(index: number) {
    if (entries.length === 0) return;
    rowRefs.current[(index + entries.length) % entries.length]?.focus();
  }

  function handleRowKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number, entry: KeybindEntry) {
    if (listeningFor) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusRow(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusRow(index - 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      document.querySelector<HTMLButtonElement>('.section-nav-item--active')?.focus();
    } else if (event.key === 'Delete' && entry.key !== entry.defaultKey) {
      event.preventDefault();
      onReset(entry.id);
    }
  }

  return (
    <OverlayView
      title="Tastenbelegung"
      onBack={onBack}
      meta={keybinds.length > 0 && <span>{keybinds.length} Belegungen</span>}
      aside={
        categories.length > 0 && (
          <SectionNav
            label="Kategorien"
            items={categories.map((name) => ({ id: name, label: name, count: groups.get(name)?.length }))}
            activeId={activeCategory}
            onChange={setCategory}
            onEnterContent={() => focusRow(0)}
          />
        )
      }
      prompts={
        keybinds.length > 0
          ? [
              { keys: '↑ ↓', label: 'Navigieren' },
              { keys: '→', label: 'Zur Liste' },
              { keys: 'ENTER', label: 'Neue Taste' },
              { keys: 'ENTF', label: 'Standard' },
            ]
          : []
      }
    >
      {keybinds.length === 0 ? (
        <div className="keybinds-empty">
          <h2 className="keybinds-empty-title">Noch keine Tasten gemeldet</h2>
          <p className="keybinds-empty-text">
            Die Belegungen erscheinen hier, sobald die Server-Ressourcen sie anmelden. Bis dahin lassen sich alle
            Tasten im GTA-Menü unter Einstellungen → Tastenbelegung → FiveM ändern.
          </p>
        </div>
      ) : (
        <section className="keybinds-list" key={activeCategory} aria-label={activeCategory}>
          {entries.map((entry, index) => {
            const listening = listeningFor === entry.id;
            const changed = entry.key !== entry.defaultKey;
            return (
              <div key={entry.id} className={`keybinds-row${listening ? ' keybinds-row--listening' : ''}`}>
                <button
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  type="button"
                  className="keybinds-row-main"
                  onClick={() => setListeningFor(entry.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, index, entry)}
                >
                  <span className="keybinds-action">
                    {entry.label}
                    {changed && <span className="keybinds-default">Standard {entry.defaultKey}</span>}
                  </span>
                  <kbd className="keybinds-key">{listening ? 'Taste drücken …' : entry.key}</kbd>
                </button>
                {changed && !listening && (
                  <button
                    type="button"
                    className="keybinds-reset"
                    title="Auf Standard zurücksetzen"
                    aria-label={`${entry.label} auf ${entry.defaultKey} zurücksetzen`}
                    onClick={() => onReset(entry.id)}
                  >
                    <RotateCcw size="1rem" />
                  </button>
                )}
              </div>
            );
          })}
        </section>
      )}
    </OverlayView>
  );
}
