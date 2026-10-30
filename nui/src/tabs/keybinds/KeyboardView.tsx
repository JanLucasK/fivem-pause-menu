import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import type { KeybindEntry } from '../../types';
import { MAIN_BLOCK, MOUSE_BLOCK, NAV_BLOCK } from './keyboardLayout';
import type { KeyCap } from './keyboardLayout';
import { currentKeyLabel } from './keyLabel';

interface KeyboardViewProps {
  keybinds: KeybindEntry[];
  // Kategorie im Fokus; null = alle. Tasten anderer Kategorien bleiben gedimmt sichtbar.
  category: string | null;
  onRebind: (entry: KeybindEntry) => void;
}

const BLOCKS = [MAIN_BLOCK, NAV_BLOCK, MOUSE_BLOCK];

// Belegte Tasten in Lesereihenfolge (Block fuer Block, Zeile fuer Zeile) -
// Reihenfolge der Pfeiltasten-Navigation.
function boundOrder(byKey: Map<string, KeybindEntry[]>) {
  const order: string[] = [];
  for (const block of BLOCKS) {
    for (const row of block) {
      for (const key of row) {
        if (!key.spacer && byKey.has(key.id) && !order.includes(key.id)) order.push(key.id);
      }
    }
  }
  return order;
}

// Tastatur als Umriss, belegte Tasten in Messing. Hover oder Fokus zeigt die
// Aktionen der Taste darunter; ein Klick auf eine Aktion belegt sie neu.
export function KeyboardView({ keybinds, category, onRebind }: KeyboardViewProps) {
  const byKey = new Map<string, KeybindEntry[]>();
  for (const entry of keybinds) {
    const id = currentKeyLabel(entry.key, entry.defaultKey);
    byKey.set(id, [...(byKey.get(id) ?? []), entry]);
  }
  const order = boundOrder(byKey);
  // Zuletzt beruehrte/fokussierte Taste: bleibt stehen, damit man mit der Maus
  // von der Taste hinunter zu ihren Aktionen fahren kann.
  const [shown, setShown] = useState<string | null>(null);
  const keyRefs = useRef(new Map<string, HTMLButtonElement>());
  const actionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shownEntries = shown ? byKey.get(shown) ?? [] : [];

  function focusKey(id: string | undefined) {
    if (!id) return;
    setShown(id);
    keyRefs.current.get(id)?.focus();
  }

  function handleKeyKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, id: string) {
    const index = order.indexOf(id);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusKey(order[(index + 1) % order.length]);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) document.querySelector<HTMLButtonElement>('.section-nav-item--active')?.focus();
      else focusKey(order[index - 1]);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      setShown(id);
      requestAnimationFrame(() => actionRefs.current[0]?.focus());
    }
  }

  function handleActionKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = index + (event.key === 'ArrowDown' ? 1 : -1);
      actionRefs.current[(next + shownEntries.length) % shownEntries.length]?.focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusKey(shown ?? undefined);
    }
  }

  function renderKey(key: KeyCap, index: number) {
    const style = { '--w': key.w ?? 1 } as CSSProperties;
    if (key.spacer) return <span key={`gap-${index}`} className="kb-key kb-key--spacer" style={style} />;
    const entries = byKey.get(key.id);
    const inCategory = entries?.some((entry) => category == null || entry.category === category);
    const state = !entries ? '' : inCategory ? ' kb-key--bound' : ' kb-key--other';
    const active = shown === key.id ? ' kb-key--shown' : '';
    const part = key.part ? ` kb-key--${key.part}` : '';
    const cap = key.cap ?? key.id;
    if (!entries) {
      return (
        <span key={`${key.id}-${index}`} className={`kb-key${part}`} style={style}>
          <span className="kb-cap">{cap}</span>
        </span>
      );
    }
    return (
      <button
        key={`${key.id}-${index}`}
        ref={(el) => {
          if (el && key.part !== 'lower') keyRefs.current.set(key.id, el);
        }}
        type="button"
        className={`kb-key${state}${active}${part}`}
        style={style}
        tabIndex={key.part !== 'lower' && key.id === (shown ?? order[0]) ? 0 : -1}
        aria-label={`${key.id}: ${entries.map((entry) => entry.label).join(', ')}`}
        onMouseEnter={() => setShown(key.id)}
        onFocus={() => setShown(key.id)}
        onClick={() => {
          setShown(key.id);
          if (entries.length === 1) onRebind(entries[0]);
        }}
        onKeyDown={(event) => handleKeyKeyDown(event, key.id)}
      >
        <span className="kb-cap">{cap}</span>
        {entries.length > 1 && <span className="kb-count">{entries.length}</span>}
      </button>
    );
  }

  return (
    <div className="kb">
      <div className="kb-board">
        {BLOCKS.map((block, blockIndex) => (
          <div key={blockIndex} className="kb-block">
            {block.map((row, rowIndex) => (
              <div key={rowIndex} className={`kb-row${rowIndex === 0 ? ' kb-row--fn' : ''}`}>
                {row.map(renderKey)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="kb-detail" aria-live="polite">
        {shown ? (
          <>
            <kbd className="kb-detail-key">{shown}</kbd>
            <div className="kb-detail-actions">
              {shownEntries.map((entry, index) => (
                <button
                  key={entry.id}
                  ref={(el) => {
                    actionRefs.current[index] = el;
                  }}
                  type="button"
                  className="kb-action"
                  onClick={() => onRebind(entry)}
                  onKeyDown={(event) => handleActionKeyDown(event, index)}
                >
                  <span className="kb-action-category">{entry.category}</span>
                  <span className="kb-action-label">{entry.label}</span>
                  <span className="kb-action-cta">
                    Neu belegen <ArrowRight size="0.875rem" />
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="kb-detail-empty">Fahre über eine goldene Taste, um ihre Aktionen zu sehen.</p>
        )}
      </div>
    </div>
  );
}
