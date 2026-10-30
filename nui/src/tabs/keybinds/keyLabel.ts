// Tastenkappen-Text fuer RegisterKeyMapping-Rohnamen. Buchstaben sind dort
// physische QWERTY-Positionen: Rohname 'y' liegt auf dem deutschen Z und 'z'
// auf dem deutschen Y (siehe fivem-corerp core/input/keymap.ts, deutscheTaste).
const NAMED_KEYS: Record<string, string> = {
  Y: 'Z',
  Z: 'Y',
  LMENU: 'Alt',
  RMENU: 'Alt Gr',
  LSHIFT: 'Shift',
  RSHIFT: 'Shift rechts',
  LCONTROL: 'Strg',
  RCONTROL: 'Strg rechts',
  BACK: 'Rücktaste',
  ESCAPE: 'Esc',
  CAPITAL: 'Feststell',
  INSERT: 'Einfg',
  DELETE: 'Entf',
  HOME: 'Pos1',
  END: 'Ende',
  RETURN: 'Enter',
  SPACE: 'Leertaste',
  TAB: 'Tab',
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
  PAGEUP: 'Bild ↑',
  PAGEDOWN: 'Bild ↓',
  MOUSE_LEFT: 'Linksklick',
  MOUSE_RIGHT: 'Rechtsklick',
  MOUSE_MIDDLE: 'Mausrad',
};

export function defaultKeyLabel(raw: string): string {
  const upper = raw.toUpperCase();
  return NAMED_KEYS[upper] ?? upper;
}

// Vom Client gelesene Taste ("t_X" ohne Praefix): GTA liefert hier bereits den
// Text seiner eigenen Tasten-Hinweise, deshalb ohne QWERTZ-Tausch.
export function currentKeyLabel(key: string | null, defaultKey: string): string {
  return key ? key.toUpperCase() : defaultKeyLabel(defaultKey);
}
