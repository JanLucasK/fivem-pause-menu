import { useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export interface SectionNavItem {
  id: string;
  label: string;
  count?: number;
}

interface SectionNavProps {
  label: string;
  items: SectionNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  // Pfeil rechts: Fokus in den Inhalt geben (Tastenbelegung).
  onEnterContent?: () => void;
}

// Kapitel-/Kategorienliste der Unterseiten. Gleiches Fokusmodell wie die
// Hub-Rail: Roving Tabindex, Pfeil hoch/runter zyklisch, die Auswahl folgt dem
// Fokus sofort (kein Enter noetig).
export function SectionNav({ label, items, activeId, onChange, onEnterContent }: SectionNavProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));

  // Beim Oeffnen der Seite liegt der Fokus auf dem aktiven Eintrag.
  useEffect(() => {
    refs.current[activeIndex]?.focus();
  }, []);

  function move(next: number) {
    const index = (next + items.length) % items.length;
    onChange(items[index].id);
    refs.current[index]?.focus();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(activeIndex - 1);
    } else if (event.key === 'ArrowRight' && onEnterContent) {
      event.preventDefault();
      onEnterContent();
    }
  }

  return (
    <nav className="section-nav" aria-label={label} onKeyDown={handleKeyDown}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            tabIndex={active ? 0 : -1}
            className={`section-nav-item${active ? ' section-nav-item--active' : ''}`}
            onClick={() => move(index)}
          >
            <span className="section-nav-label">{item.label}</span>
            {item.count != null && <span className="section-nav-count hub-mono">{item.count}</span>}
          </button>
        );
      })}
    </nav>
  );
}
