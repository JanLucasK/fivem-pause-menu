import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nuiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(nuiRoot, '..');
const readNui = (path) => readFileSync(join(nuiRoot, path), 'utf8');

const navigation = readNui('src/hub/NavRail.tsx');
for (const obsolete of ['logo.png', 'hub-rail-cursor']) {
  if (navigation.includes(obsolete)) {
    throw new Error(`Die Navigation verschiebt weiterhin die NeoV-Marke: ${obsolete}`);
  }
}

const dossier = readNui('src/hub/Dossier.tsx');
if (!dossier.includes('onError={() => onAvatarError(avatarUrl)}')) {
  throw new Error('Das Ped-Bild meldet Ladefehler nicht an den Retry-Pfad.');
}

const shell = readNui('src/shell/AppShell.tsx');
for (const marker of ['avatarUrlRef.current !== failedUrl', "fetchNui('retryAvatar')"]) {
  if (!shell.includes(marker)) {
    throw new Error(`Der sichere Avatar-Retry fehlt in AppShell: ${marker}`);
  }
}

const client = readFileSync(join(repoRoot, 'client', 'client.lua'), 'utf8');
for (const marker of [
  'MAX_HEADSHOT_ATTEMPTS = 3',
  'MAX_AVATAR_RETRIES = 2',
  'RegisterPedheadshotTransparent',
  'RegisterPedheadshot(PlayerPedId())',
  "RegisterNUICallback('retryAvatar'",
]) {
  if (!client.includes(marker)) {
    throw new Error(`Der begrenzte Headshot-Retry ist unvollständig: ${marker}`);
  }
}

console.log('Hub-Zustand: ortsfeste Navigation und begrenzter Avatar-Retry.');
