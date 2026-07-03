import { useState } from 'react';
import { SliderRow, ToggleRow } from '../SettingsRow';
import { SettingsSection } from '../SettingsSection';

export function VoiceSettings() {
  const [micVolume, setMicVolume] = useState(70);
  const [pushToTalk, setPushToTalk] = useState(true);

  return (
    <SettingsSection title="Voice">
      <SliderRow label="Mikrofon-Empfindlichkeit" value={micVolume} onChange={setMicVolume} />
      <ToggleRow label="Push-to-Talk" checked={pushToTalk} onChange={setPushToTalk} />
    </SettingsSection>
  );
}
