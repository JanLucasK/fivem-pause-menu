import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import type { KeybindEntry } from '../../types';
import { OverlayView } from '../../shell/OverlayView';
import { SectionNav } from '../../shell/SectionNav';
import { KeyboardView } from './KeyboardView';
import { currentKeyLabel } from './keyLabel';
import './keybindsTab.css';

interface KeybindsTabProps {
  keybinds: KeybindEntry[];
  onRebind: (entry: KeybindEntry) => void;
  onBack: () => void;
}

type KeybindsMode = 'keyboard' | 'list';

const ALL = '__alle';
const MODE_STORAGE = 'neov-pause-menu:keybinds-mode';

function readMode(): KeybindsMode {
  try {
    return localStorage.getItem(MODE_STORAGE) === 'list' ? 'list' : 'keyboard';
  } catch {
    return 'keyboard';
  }
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

// Tastenbelegung mit zwei Ansichten: Tastatur (belegte Tasten in Messing,
// Hover zeigt die Aktionen) und Liste. Die Liste und die aktuell belegten
// Tasten kommen vom Client (client/keybinds.lua). Ein Klick auf eine Aktion
// startet das Neubelegen (onRebind).
export function KeybindsTab({ keybinds, onRebind, onBack }: KeybindsTabProps) {
  const groups = groupByCategory(keybinds);
  const categories = Array.from(groups.keys());
  const [mode, setMode] = useState<KeybindsMode>(readMode);
  const [category, setCategory] = useState(ALL);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCategory = category === ALL || groups.has(category) ? category : ALL;
  const entries = activeCategory === ALL ? keybinds : groups.get(activeCategory) ?? [];

  function switchMode(next: KeybindsMode) {
    setMode(next);
    try {
      localStorage.setItem(MODE_STORAGE, next);
    } catch {
      // Ohne Speicher startet die Seite beim naechsten Mal wieder mit der Tastatur.
    }
  }

  function enterContent() {
    if (mode === 'list') rowRefs.current[0]?.focus();
    else document.querySelector<HTMLButtonElement>('.kb-key[tabindex="0"]')?.focus();
  }

  function handleRowKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = index + (event.key === 'ArrowDown' ? 1 : -1);
      rowRefs.current[(next + entries.length) % entries.length]?.focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      document.querySelector<HTMLButtonElement>('.section-nav-item--active')?.focus();
    }
  }

  const modeSwitch = (
    <div className="keybinds-mode" role="group" aria-label="Ansicht">
      {(['keyboard', 'list'] as const).map((value) => (
        <button
          key={value}
          type="button"
          className={`keybinds-mode-btn${mode === value ? ' keybinds-mode-btn--active' : ''}`}
          aria-pressed={mode === value}
          onClick={() => switchMode(value)}
        >
          {value === 'keyboard' ? 'Tastatur' : 'Aktionen'}
        </button>
      ))}
    </div>
  );

  return (
    <OverlayView
      title="Tastenbelegung"
      onBack={onBack}
      meta={keybinds.length > 0 && modeSwitch}
      aside={
        categories.length > 0 && (
          <SectionNav
            label="Kategorien"
            items={[
              { id: ALL, label: 'Alle', count: keybinds.length },
              ...categories.map((name) => ({ id: name, label: name, count: groups.get(name)?.length })),
            ]}
            activeId={activeCategory}
            onChange={setCategory}
            onEnterContent={enterContent}
          />
        )
      }
      prompts={
        keybinds.length > 0
          ? [
              { keys: '↑ ↓', label: 'Kategorie' },
              { keys: '→', label: mode === 'list' ? 'Zu den Aktionen' : 'Zur Tastatur' },
              { keys: 'ENTER', label: 'Neu belegen' },
            ]
          : []
      }
    >
      {keybinds.length === 0 ? (
        <div className="keybinds-empty">
          <h2 className="keybinds-empty-title">Noch keine Tasten gemeldet</h2>
          <p className="keybinds-empty-text">
            Alle Tasten lassen sich im GTA-Menü unter Einstellungen → Tastenbelegung → FiveM ändern.
          </p>
        </div>
      ) : mode === 'keyboard' ? (
        <KeyboardView keybinds={keybinds} category={activeCategory === ALL ? null : activeCategory} onRebind={onRebind} />
      ) : (
        <section className="keybinds-list" key={activeCategory} aria-label="Aktionen">
          {entries.map((entry, index) => (
            <button
              key={entry.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              type="button"
              className="keybinds-row"
              onClick={() => onRebind(entry)}
              onKeyDown={(event) => handleRowKeyDown(event, index)}
            >
              <span className="keybinds-action">
                {entry.label}
                {activeCategory === ALL && <span className="keybinds-category">{entry.category}</span>}
              </span>
              <span className="keybinds-cta">
                Neu belegen <ArrowRight size="0.875rem" />
              </span>
              <kbd className="keybinds-key">{currentKeyLabel(entry.key, entry.defaultKey)}</kbd>
            </button>
          ))}
        </section>
      )}
    </OverlayView>
  );
}
