import type { SettingDefinition } from '../types';

// Beispieldaten fuer den Browser-Dev-Modus (siehe bridge/nui.ts). In FiveM
// kommt die Liste per 'setSettings' NUI-Message aus client/settings.lua -
// dort ueber `RegisterSetting` angemeldet, per identischer API fuer NeoVs
// eigene Settings wie fuer die einer beliebigen anderen Resource.
export const mockSettings: SettingDefinition[] = [
  { id: 'neov_audio_master', resource: 'neov-pause-menu', section: 'Audio', label: 'Gesamtlautstärke', type: 'slider', value: 80 },
  { id: 'neov_audio_music', resource: 'neov-pause-menu', section: 'Audio', label: 'Musik', type: 'slider', value: 50 },
  { id: 'neov_audio_voice', resource: 'neov-pause-menu', section: 'Audio', label: 'Sprachchat', type: 'slider', value: 65 },
  { id: 'neov_hud_minimap', resource: 'neov-pause-menu', section: 'HUD', label: 'Minimap anzeigen', type: 'toggle', value: true },
  { id: 'neov_hud_needs', resource: 'neov-pause-menu', section: 'HUD', label: 'Bedürfnis-Anzeige', type: 'toggle', value: true },
  { id: 'neov_hud_money', resource: 'neov-pause-menu', section: 'HUD', label: 'Geld-Anzeige', type: 'toggle', value: true },
  { id: 'neov_voice_mic', resource: 'neov-pause-menu', section: 'Voice', label: 'Mikrofon-Empfindlichkeit', type: 'slider', value: 70 },
  { id: 'neov_voice_ptt', resource: 'neov-pause-menu', section: 'Voice', label: 'Push-to-Talk', type: 'toggle', value: true },
];
