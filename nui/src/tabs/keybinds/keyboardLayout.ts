// Deutsche ISO-Tastatur (QWERTZ) fuer die Tastaturansicht. `id` ist der Text,
// den keyLabel.ts fuer eine Belegung liefert - darueber werden Aktionen den
// Kappen zugeordnet. `cap` ist der Aufdruck, `w` die Breite in Tasteneinheiten.
// `spacer` haelt nur Platz frei. `part` markiert die zwei Stuecke der ISO-Enter-Taste.
export interface KeyCap {
  id: string;
  cap?: string;
  w?: number;
  spacer?: boolean;
  part?: 'upper' | 'lower';
}

const k = (id: string, w = 1, cap?: string): KeyCap => ({ id, w, cap });
const gap = (w: number): KeyCap => ({ id: '', w, spacer: true });
const letters = (chars: string) => [...chars].map((char) => k(char));

export const MAIN_BLOCK: KeyCap[][] = [
  [k('Esc'), gap(1), ...['F1', 'F2', 'F3', 'F4'].map((f) => k(f)), gap(0.5), ...['F5', 'F6', 'F7', 'F8'].map((f) => k(f)), gap(0.5), ...['F9', 'F10', 'F11', 'F12'].map((f) => k(f))],
  [k('^'), ...letters('1234567890ß´'), k('Rücktaste', 2, '⟵')],
  [k('Tab', 1.5), ...letters('QWERTZUIOPÜ+'), { id: 'Enter', w: 1.5, part: 'upper' }],
  [k('Feststell', 1.75, 'Caps'), ...letters('ASDFGHJKLÖÄ#'), { id: 'Enter', w: 1.25, cap: '', part: 'lower' }],
  [k('Shift', 1.25), k('<'), ...letters('YXCVBNM,.-'), k('Shift rechts', 2.75, 'Shift')],
  [k('Strg', 1.25), k('Win', 1.25), k('Alt', 1.25), k('Leertaste', 6.25, ''), k('Alt Gr', 1.25), k('Win rechts', 1.25, 'Win'), k('Menü', 1.25), k('Strg rechts', 1.25, 'Strg')],
];

export const NAV_BLOCK: KeyCap[][] = [
  [k('Druck'), k('Rollen'), k('Pause')],
  [k('Einfg'), k('Pos1'), k('Bild ↑')],
  [k('Entf'), k('Ende'), k('Bild ↓')],
  [gap(3)],
  [gap(1), k('↑'), gap(1)],
  [k('←'), k('↓'), k('→')],
];

export const MOUSE_BLOCK: KeyCap[][] = [
  [gap(2.5)],
  [k('Linksklick', 1.25, 'Links'), k('Rechtsklick', 1.25, 'Rechts')],
  [k('Mausrad', 2.5, 'Rad')],
];
