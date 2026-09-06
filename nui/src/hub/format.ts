// Formatierhelfer fuer den Hub. Bewusst klein und ohne Abhaengigkeiten, damit
// jede Komponente dieselben Schreibweisen (de-DE, Euro, Zeiten) nutzt.

export function formatMoney(amount: number): string {
  return amount.toLocaleString('de-DE');
}

// "11:55" wenn heute beigetreten, sonst "01.08. 11:55".
export function formatJoined(unix: number | null | undefined): string | null {
  if (!unix) return null;
  const joined = new Date(unix * 1000);
  const now = new Date();
  const time = joined.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  if (joined.toDateString() === now.toDateString()) return time;
  const day = joined.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  return `${day} ${time}`;
}

// "2,4 km" ab 1000 m, darunter "850 m".
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} km`;
  }
  return `${Math.round(meters)} m`;
}

export function initials(firstName: string, lastName: string): string {
  const value = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return value || '–';
}
