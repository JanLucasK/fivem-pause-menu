import { AudioSettings } from './sections/AudioSettings';
import { HudSettings } from './sections/HudSettings';
import { VoiceSettings } from './sections/VoiceSettings';
import './settingsTab.css';

// Modular: neue Settings-Kategorien werden als eigene Section in sections/
// ergaenzt und hier registriert - kein Umbau des Layouts noetig.
export function SettingsTab() {
  return (
    <div className="settings-tab">
      <AudioSettings />
      <HudSettings />
      <VoiceSettings />
    </div>
  );
}
