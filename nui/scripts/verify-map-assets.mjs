import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nuiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(nuiRoot, '..');
const readNui = (path) => readFileSync(join(nuiRoot, path), 'utf8');

for (const path of [
  'public/mapStyles',
  'public/blips',
  'vendor/gta-v-map',
  'src/components/GtaMap.tsx',
  'src/tabs/map',
  'src/state/mockMapData.ts',
  'src/types/gta-v-map-jsx.d.ts',
]) {
  if (existsSync(join(nuiRoot, path))) {
    throw new Error(`Zweites Kartensystem im Pause-Menü: ${path}`);
  }
}

const deps = JSON.parse(readNui('package.json')).dependencies;
for (const dependency of ['gta-v-map', 'leaflet']) {
  if (dependency in deps) throw new Error(`Ungenutzte Karten-Abhängigkeit: ${dependency}`);
}

const shell = readNui('src/shell/AppShell.tsx');
for (const marker of ["fetchNui('openMap')", 'onOpenMap={handleOpenMap}', 'handleOpenMap();']) {
  if (!shell.includes(marker)) throw new Error(`Karten-Einstieg fehlt: ${marker}`);
}

const client = readFileSync(join(repoRoot, 'client', 'client.lua'), 'utf8');
if (!/RegisterNUICallback\('openMap',[\s\S]*?setMenuVisible\(false\)[\s\S]*?ExecuteCommand\('rp_map'\)/.test(client)) {
  throw new Error('openMap muss den Pause-Menü-Fokus freigeben und rp_map starten.');
}

const manifest = readFileSync(join(repoRoot, 'fxmanifest.lua'), 'utf8');
if (!manifest.includes("dependency 'rp_core'")) {
  throw new Error('Pause-Menü muss rp_core für die Karte voraussetzen.');
}
if (!manifest.includes("dependency 'rp_atlas'")) {
  throw new Error('Pause-Menü muss rp_atlas für die passive Vorschau voraussetzen.');
}

console.log('Karte: alle Pause-Menü-Einstiege verwenden CoreRP rp_map.');
