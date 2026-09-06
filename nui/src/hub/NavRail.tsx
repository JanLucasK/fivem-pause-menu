import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BookOpenText, Keyboard, LogOut, Map as MapIcon, MessageCircle, Play, Settings } from 'lucide-react';
import logoUrl from '../assets/logo.png';

export type NavAction = 'resume' | 'map' | 'settings' | 'keybinds' | 'rules' | 'discord' | 'exit';

interface NavEntry {
  id: NavAction;
  label: string;
  icon: LucideIcon;
  hint?: string;
  danger?: boolean;
}

const ENTRIES: NavEntry[] = [
  { id: 'resume', label: 'Fortsetzen', icon: Play, hint: 'ESC' },
  { id: 'map', label: 'Karte', icon: MapIcon, hint: 'M' },
  { id: 'settings', label: 'Einstellungen', icon: Settings },
  { id: 'keybinds', label: 'Tasten', icon: Keyboard },
  { id: 'rules', label: 'Regeln', icon: BookOpenText },
  { id: 'discord', label: 'Discord', icon: MessageCircle },
  { id: 'exit', label: 'Verlassen', icon: LogOut, danger: true },
];

interface NavRailProps {
  onSelect: (action: NavAction) => void;
}

// Navigations-Rail mit Roving Tabindex: ein Fokusmodell fuer Tastatur, Gamepad
// und Maus (Hover setzt den Fokus). Der fokussierte Eintrag traegt die goldene
// Logomark als Cursor; Pfeil hoch/runter laufen zyklisch, Enter/Space waehlen.
export function NavRail({ onSelect }: NavRailProps) {
  const [focused, setFocused] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  // Beim Mounten (= Menue geoeffnet) liegt der Fokus auf "Fortsetzen".
  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  function moveFocus(next: number) {
    const index = (next + ENTRIES.length) % ENTRIES.length;
    setFocused(index);
    refs.current[index]?.focus();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(focused + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(focused - 1);
    }
  }

  return (
    <nav className="hub-rail" aria-label="Hauptmenü" onKeyDown={handleKeyDown}>
      {ENTRIES.map((entry, index) => {
        const Icon = entry.icon;
        const active = index === focused;
        return (
          <div key={entry.id} className="hub-rail-slot">
            {entry.danger && <div className="hub-rail-divider" />}
            <button
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              tabIndex={active ? 0 : -1}
              className={`hub-rail-item${active ? ' hub-rail-item--active' : ''}${entry.danger ? ' hub-rail-item--danger' : ''}`}
              onFocus={() => setFocused(index)}
              onMouseEnter={() => moveFocus(index)}
              onClick={() => onSelect(entry.id)}
            >
              <span className="hub-rail-icon">
                {active ? <img src={logoUrl} alt="" className="hub-rail-cursor" /> : <Icon size="1.375rem" />}
              </span>
              <span className="hub-rail-label">{entry.label}</span>
              {entry.hint && <kbd className="hub-key">{entry.hint}</kbd>}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
