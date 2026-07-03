import { useState } from 'react';
import { ToggleRow } from '../SettingsRow';
import { SettingsSection } from '../SettingsSection';

export function HudSettings() {
  const [showMinimap, setShowMinimap] = useState(true);
  const [showNeeds, setShowNeeds] = useState(true);
  const [showMoney, setShowMoney] = useState(true);

  return (
    <SettingsSection title="HUD">
      <ToggleRow label="Minimap anzeigen" checked={showMinimap} onChange={setShowMinimap} />
      <ToggleRow label="Bedürfnis-Anzeige" checked={showNeeds} onChange={setShowNeeds} />
      <ToggleRow label="Geld-Anzeige" checked={showMoney} onChange={setShowMoney} />
    </SettingsSection>
  );
}
