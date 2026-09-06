import type { Announcement } from '../types';

export const FEED_LIMIT = 3;

interface AnnouncementsFeedProps {
  announcements: Announcement[];
  onShowAll: () => void;
}

// Ankuendigungen ohne Box: Overline, maximal drei Eintraege mit Marker-Balken.
// Mehr als drei -> "Alle ansehen" oeffnet das Overlay mit der ganzen Liste.
export function AnnouncementsFeed({ announcements, onShowAll }: AnnouncementsFeedProps) {
  const visible = announcements.slice(0, FEED_LIMIT);
  return (
    <section className="hub-feed">
      <div className="hub-feed-head">
        <span className="hub-overline">Ankündigungen</span>
        {announcements.length > FEED_LIMIT && (
          <button type="button" className="hub-link" onClick={onShowAll}>
            Alle ansehen
          </button>
        )}
      </div>
      {visible.map((item, index) => (
        <article key={item.id} className="hub-feed-item">
          <span className={`hub-feed-marker${index === 0 ? ' hub-feed-marker--brass' : ''}`} />
          <div className="hub-feed-body">
            <h3 className={`hub-feed-title${index === 0 ? ' hub-feed-title--strong' : ''}`}>{item.title}</h3>
            <p className="hub-feed-text">{item.body}</p>
            <span className="hub-feed-meta">
              {item.tag} · {item.date}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}

// Vollstaendige Liste fuer das "Alle ansehen"-Overlay.
export function AnnouncementsList({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="hub-feed hub-feed--full">
      {announcements.map((item) => (
        <article key={item.id} className="hub-feed-item">
          <span className="hub-feed-marker" />
          <div className="hub-feed-body">
            <h3 className="hub-feed-title hub-feed-title--strong">{item.title}</h3>
            <p className="hub-feed-text">{item.body}</p>
            <span className="hub-feed-meta">
              {item.tag} · {item.date}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
