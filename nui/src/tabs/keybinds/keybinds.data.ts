import type { KeybindEntry } from '../../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommt die Liste per 'setKeybinds' NUI-Message von client/keybinds.lua -
// gespeist aus dem `RegisterKeybind`-Export, den NeoVs eigene Resourcen
// (fivem-corerp) und Drittresourcen (z.B. fivem-pma-voice) aufrufen. Die
// Werte hier spiegeln absichtlich die echten, aktuell in corerp/pma-voice
// per RegisterKeyMapping vergebenen Defaults.
export const mockKeybinds: KeybindEntry[] = [
  { id: 'rp_interact', resource: 'rp_core', command: '+rp_interact', category: 'Allgemein', label: 'Interaktionsrad (halten)', mapper: 'keyboard', key: 'X', defaultKey: 'X' },
  { id: 'inventory', resource: 'rp_core', command: 'inventory', category: 'Allgemein', label: 'Inventar öffnen/schließen', mapper: 'keyboard', key: 'I', defaultKey: 'I' },
  { id: 'rp_pointer', resource: 'rp_core', command: 'rp_pointer', category: 'Allgemein', label: 'Zeiger-/Zielhilfe (an/aus)', mapper: 'keyboard', key: 'F4', defaultKey: 'F4' },
  { id: 'phone', resource: 'rp_core', command: 'phone', category: 'Allgemein', label: 'Handy öffnen/schließen', mapper: 'keyboard', key: 'F1', defaultKey: 'F1' },
  { id: 'tablet', resource: 'rp_core', command: 'tablet', category: 'Allgemein', label: 'Tablet öffnen/schließen', mapper: 'keyboard', key: 'F2', defaultKey: 'F2' },
  { id: 'rp_lock', resource: 'rp_core', command: 'rp_lock', category: 'Fahrzeug', label: 'Haustür/Garage ab-/aufschließen', mapper: 'keyboard', key: 'L', defaultKey: 'L' },
  { id: 'cycleproximity', resource: 'pma-voice', command: 'cycleproximity', category: 'Voice', label: 'Sprachreichweite wechseln', mapper: 'keyboard', key: 'Y', defaultKey: 'Y' },
  { id: 'radiotalk', resource: 'pma-voice', command: '+radiotalk', category: 'Voice', label: 'Über Funk sprechen (halten)', mapper: 'keyboard', key: 'LMENU', defaultKey: 'LMENU' },
];
