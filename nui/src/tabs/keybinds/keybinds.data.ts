export interface KeybindEntry {
  id: string;
  action: string;
  category: string;
  key: string;
}

// Prototyp-Daten. Spaeter: Liste kommt vom Client (RegisterKeyMapping-Registry)
// per NUI-Message; "Rebind" ruft fetchNui('rebindKey', ...) auf, das Client-seitig
// den Konsolenbefehl `bind`/`unbind` ausfuehrt.
export const mockKeybinds: KeybindEntry[] = [
  { id: 'interact', action: 'Interagieren', category: 'Allgemein', key: 'E' },
  { id: 'inventory', action: 'Inventar öffnen', category: 'Allgemein', key: 'TAB' },
  { id: 'phone', action: 'Telefon', category: 'Allgemein', key: 'M' },
  { id: 'voice_range', action: 'Sprachreichweite wechseln', category: 'Voice', key: 'B' },
  { id: 'seatbelt', action: 'Anschnallen', category: 'Fahrzeug', key: 'L' },
  { id: 'engine', action: 'Motor an/aus', category: 'Fahrzeug', key: 'G' },
];
