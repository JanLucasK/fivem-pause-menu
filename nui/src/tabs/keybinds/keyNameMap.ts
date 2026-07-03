// Übersetzt einen Browser-`KeyboardEvent` (CEF im Client) in einen von FiveMs
// `bind`-Konsolenbefehl akzeptierten Tastennamen (Windows-VK-Namen wie
// RegisterKeyMapping/die native Settings sie verwenden, z.B. "LSHIFT",
// "OEM_1", "F2"). Wir werten `event.code` statt `event.key` aus - das ist
// layoutunabhängig (physische Taste), `event.key` wäre bei AZERTY o.ä.
// bereits verschoben.
const CODE_MAP: Record<string, string> = {
  Escape: 'ESCAPE',
  Tab: 'TAB',
  CapsLock: 'CAPITAL',
  ShiftLeft: 'LSHIFT',
  ShiftRight: 'RSHIFT',
  ControlLeft: 'LCONTROL',
  ControlRight: 'RCONTROL',
  AltLeft: 'LMENU',
  AltRight: 'RMENU',
  Space: 'SPACE',
  Enter: 'RETURN',
  NumpadEnter: 'RETURN',
  Backspace: 'BACK',
  Delete: 'DELETE',
  Insert: 'INSERT',
  Home: 'HOME',
  End: 'END',
  PageUp: 'PRIOR',
  PageDown: 'NEXT',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  Backquote: 'OEM_3',
  Minus: 'OEM_MINUS',
  Equal: 'OEM_PLUS',
  BracketLeft: 'OEM_4',
  BracketRight: 'OEM_6',
  Backslash: 'OEM_5',
  Semicolon: 'OEM_1',
  Quote: 'OEM_7',
  Comma: 'OEM_COMMA',
  Period: 'OEM_PERIOD',
  Slash: 'OEM_2',
  NumpadAdd: 'ADD',
  NumpadSubtract: 'SUBTRACT',
  NumpadMultiply: 'MULTIPLY',
  NumpadDivide: 'DIVIDE',
  NumpadDecimal: 'DECIMAL',
};

// Escape schliesst waehrend der Aufnahme immer die Aufnahme selbst (siehe
// KeybindsTab) - es lässt sich hier bewusst nicht belegen, sonst gäbe es
// keinen Weg mehr, eine laufende Aufnahme abzubrechen.
const UNBINDABLE = new Set(['Escape']);

/** Liefert den FiveM-Tastennamen für ein Keydown-Event, oder `null`, wenn die
 * Taste nicht bindbar/unbekannt ist. */
export function browserKeyToFivemKey(event: KeyboardEvent): string | null {
  const { code } = event;
  if (UNBINDABLE.has(code)) return null;
  if (CODE_MAP[code]) return CODE_MAP[code];
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit[0-9]$/.test(code)) return code.slice(5);
  if (/^F(?:[1-9]|1\d|2[0-4])$/.test(code)) return code;
  if (/^Numpad[0-9]$/.test(code)) return `NUMPAD${code.slice(6)}`;
  return null;
}
