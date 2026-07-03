import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { mockKeybinds } from './keybinds.data';
import './keybindsTab.css';

function groupByCategory(entries: typeof mockKeybinds) {
  const groups = new Map<string, typeof mockKeybinds>();
  for (const entry of entries) {
    const bucket = groups.get(entry.category) ?? [];
    bucket.push(entry);
    groups.set(entry.category, bucket);
  }
  return groups;
}

export function KeybindsTab() {
  const [keys, setKeys] = useState(mockKeybinds);
  const [listeningFor, setListeningFor] = useState<string | null>(null);

  useEffect(() => {
    if (!listeningFor) return;

    const handler = (event: KeyboardEvent) => {
      event.preventDefault();
      const newKey = event.key.length === 1 ? event.key.toUpperCase() : event.key;
      setKeys((current) =>
        current.map((entry) => (entry.id === listeningFor ? { ...entry, key: newKey } : entry)),
      );
      setListeningFor(null);
      // Spaeter: fetchNui('rebindKey', { id: listeningFor, key: newKey })
      // -> Client fuehrt `bind`/`unbind` aus.
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [listeningFor]);

  const groups = groupByCategory(keys);

  return (
    <div className="keybinds-tab">
      {Array.from(groups.entries()).map(([category, entries]) => (
        <section key={category} className="keybinds-group">
          <h3 className="keybinds-group-title">{category}</h3>
          <div className="keybinds-list">
            {entries.map((entry) => (
              <div key={entry.id} className="keybinds-row">
                <span className="keybinds-action">{entry.action}</span>
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
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
