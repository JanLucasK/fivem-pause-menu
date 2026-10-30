import { useEffect, useRef, useState } from 'react';
import { OverlayView } from '../../shell/OverlayView';
import { SectionNav } from '../../shell/SectionNav';
import { usePageScroll } from '../../shell/usePageScroll';
import type { Announcement } from '../../types';
import './announcementsTab.css';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  onBack: () => void;
}

const ALL = '__alle';

// Alle Ankuendigungen im Raster des Regelwerks: links Filter nach Art, rechts
// die Eintraege, neueste zuerst (Reihenfolge wie vom Server geliefert).
export function AnnouncementsTab({ announcements, onBack }: AnnouncementsTabProps) {
  const [tag, setTag] = useState(ALL);
  const mainRef = useRef<HTMLElement>(null);
  const tags = Array.from(new Set(announcements.map((item) => item.tag)));
  const activeTag = tag === ALL || tags.includes(tag) ? tag : ALL;
  const visible = activeTag === ALL ? announcements : announcements.filter((item) => item.tag === activeTag);
  const newestId = announcements[0]?.id;

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [activeTag]);

  usePageScroll(mainRef);

  return (
    <OverlayView
      title="Ankündigungen"
      onBack={onBack}
      mainRef={mainRef}
      meta={<span>{announcements.length === 1 ? '1 Ankündigung' : `${announcements.length} Ankündigungen`}</span>}
      aside={
        tags.length > 1 && (
          <SectionNav
            label="Art"
            items={[
              { id: ALL, label: 'Alle', count: announcements.length },
              ...tags.map((name) => ({
                id: name,
                label: name,
                count: announcements.filter((item) => item.tag === name).length,
              })),
            ]}
            activeId={activeTag}
            onChange={setTag}
          />
        )
      }
      prompts={tags.length > 1 ? [{ keys: '↑ ↓', label: 'Art' }, { keys: 'BILD ↑ ↓', label: 'Blättern' }] : []}
    >
      {announcements.length === 0 ? (
        <p className="announcements-empty">Gerade gibt es keine Ankündigungen.</p>
      ) : (
        <div className="announcements" key={activeTag}>
          {visible.map((item) => (
            <article key={item.id} className="announcements-item">
              <div className="announcements-meta">
                <span className={`announcements-date hub-mono${item.id === newestId ? ' announcements-date--new' : ''}`}>
                  {item.date}
                </span>
                <span className="announcements-tag">{item.tag}</span>
              </div>
              <div className="announcements-body">
                <h2 className="announcements-title">{item.title}</h2>
                <p className="announcements-text">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </OverlayView>
  );
}
