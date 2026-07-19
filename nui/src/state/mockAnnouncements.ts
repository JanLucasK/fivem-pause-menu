import type { Announcement } from '../types';

// Platzhalter-Ankündigungen für die rechte Spalte. Bewusst nur Mock - später
// könnten diese aus einem CMS/Discord-Feed kommen, das UI bleibt gleich.
export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    tag: 'Update',
    date: '19. Juli',
    title: 'Neues Karten-System ist live',
    body: 'Drücke M oder tippe hier auf „Karte", um die neue Vollbildkarte mit eigenen Wegpunkten zu öffnen.',
  },
  {
    id: 'a2',
    tag: 'Event',
    date: '17. Juli',
    title: 'Wochenend-Event: Doppelter Payday',
    body: 'Am Samstag und Sonntag verdient ihr auf allen legalen Jobs den doppelten Lohn.',
  },
  {
    id: 'a3',
    tag: 'Hinweis',
    date: '15. Juli',
    title: 'Neue Regeln im Straßenverkehr',
    body: 'Bitte lest euch die aktualisierten Verkehrsregeln durch, bevor ihr euch ans Steuer setzt.',
  },
];
