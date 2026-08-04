import { Megaphone } from 'lucide-react';
import type { Announcement } from '../types';

export function AnnouncementsPanel({ announcements }: { announcements: Announcement[] }) {
  return (
    <aside className="announcements">
      <div className="announcements-head">
        <span className="announcements-icon">
          <Megaphone size={16} />
        </span>
        <h2 className="announcements-title">Ankündigungen</h2>
      </div>

      <div className="announcements-list">
        {announcements.map((item) => (
          <article key={item.id} className="announcement">
            <div className="announcement-meta">
              <span className="announcement-tag">{item.tag}</span>
              <span className="announcement-date">{item.date}</span>
            </div>
            <h3 className="announcement-title">{item.title}</h3>
            <p className="announcement-body">{item.body}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
