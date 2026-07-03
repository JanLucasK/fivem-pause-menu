import type { SettingDefinition } from '../../types';
import { SettingsSection } from './SettingsSection';
import { SliderRow, ToggleRow } from './SettingsRow';
import './settingsTab.css';

interface SettingsTabProps {
  settings: SettingDefinition[];
  onChange: (id: string, value: number | boolean) => void;
}

function groupBySection(entries: SettingDefinition[]) {
  const groups = new Map<string, SettingDefinition[]>();
  for (const entry of entries) {
    const bucket = groups.get(entry.section) ?? [];
    bucket.push(entry);
    groups.set(entry.section, bucket);
  }
  return groups;
}

// Datengetrieben: die Liste kommt vom Client (RegisterSetting-Registry, siehe
// client/settings.lua) statt aus fest verdrahteten Section-Komponenten - neue
// Settings/Sections (von NeoV selbst oder einer beliebigen anderen Resource)
// brauchen dadurch keinen Frontend-Umbau mehr.
export function SettingsTab({ settings, onChange }: SettingsTabProps) {
  const groups = groupBySection(settings);

  return (
    <div className="settings-tab">
      {Array.from(groups.entries()).map(([section, entries]) => (
        <SettingsSection key={section} title={section}>
          {entries.map((entry) =>
            entry.type === 'toggle' ? (
              <ToggleRow
                key={entry.id}
                label={entry.label}
                checked={Boolean(entry.value)}
                onChange={(checked) => onChange(entry.id, checked)}
              />
            ) : (
              <SliderRow
                key={entry.id}
                label={entry.label}
                value={Number(entry.value)}
                min={entry.min}
                max={entry.max}
                onChange={(value) => onChange(entry.id, value)}
              />
            ),
          )}
        </SettingsSection>
      ))}
    </div>
  );
}
