import { useState } from 'react';
import { SliderRow } from '../SettingsRow';
import { SettingsSection } from '../SettingsSection';

// Prototyp-State (lokal). In FiveM wuerde jede Aenderung per fetchNui an das
// Client-Skript gehen, das den passenden Convar setzt (z.B. `voice_...`).
export function AudioSettings() {
  const [master, setMaster] = useState(80);
  const [music, setMusic] = useState(50);
  const [voice, setVoice] = useState(65);

  return (
    <SettingsSection title="Audio">
      <SliderRow label="Gesamtlautstärke" value={master} onChange={setMaster} />
      <SliderRow label="Musik" value={music} onChange={setMusic} />
      <SliderRow label="Sprachchat" value={voice} onChange={setVoice} />
    </SettingsSection>
  );
}
