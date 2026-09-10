import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nuiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localTiles = join(nuiRoot, 'public', 'mapStyles');

function filesBelow(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const bundledTiles = filesBelow(localTiles);
if (bundledTiles.length > 0) {
  throw new Error(
    `Kartenkacheln gehören nach rp_atlas, nicht ins Pausemenü: ${bundledTiles[0]}`,
  );
}

const mapSource = readFileSync(join(nuiRoot, 'src', 'components', 'GtaMap.tsx'), 'utf8');
for (const template of [
  'styleAtlas/{z}/{x}/{y}.jpg',
  'styleGrid/{z}/{x}/{y}.webp',
  'styleSatelite/{z}/{x}/{y}.webp',
]) {
  if (!mapSource.includes(template)) {
    throw new Error(`Externe rp_atlas-Kachelvorlage fehlt: ${template}`);
  }
}

const previewSource = readFileSync(join(nuiRoot, 'src', 'hub', 'MapStrip.tsx'), 'utf8');
for (const marker of [
  '<GtaMap',
  'centerOnPlayer',
  'interactive={false}',
  'showPlayerMarker={false}',
]) {
  if (!previewSource.includes(marker)) {
    throw new Error(`Die Hub-Vorschau folgt nicht der echten Spielerposition: ${marker}`);
  }
}

for (const obsoletePath of [
  join(nuiRoot, 'public', 'img', 'map-preview.jpg'),
  join(nuiRoot, 'src', 'hub', 'mapPreview.ts'),
]) {
  if (existsSync(obsoletePath)) {
    throw new Error(`Feste Kartenvorschau muss entfernt bleiben: ${obsoletePath}`);
  }
}

console.log('Kartenkacheln: ausschließlich externe rp_atlas-Pfade.');
