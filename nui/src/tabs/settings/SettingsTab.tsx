import { useState } from 'react';
import type { KeybindEntry, SettingDefinition } from '../../types';
import { SettingsSection } from './SettingsSection';
import { SliderRow, ToggleRow } from './SettingsRow';
import { KeybindsTab } from '../keybinds/KeybindsTab';
import './settingsTab.css';

interface SettingsTabProps {
  settings: SettingDefinition[];
  onChange: (id: string, value: number | boolean) => void;
  keybinds: KeybindEntry[];
  onRebindKeybind: (id: string, key: string) => void;
  onResetKeybind: (id: string) => void;
}

type SettingsView = 'general' | 'keybinds';

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
//
// Keybinds hat keinen eigenen Sidebar-Eintrag mehr, sondern haengt hier als
// zweite Unteransicht dran - inhaltlich unabhaengig (eigene Registry, eigene
// Komponente), nur die Navigation dorthin ist jetzt lokal statt global.
export function SettingsTab({ settings, onChange, keybinds, onRebindKeybind, onResetKeybind }: SettingsTabProps) {
  const [view, setView] = useState<SettingsView>('general');
  const groups = groupBySection(settings);

  return (
    <div className="settings-tab">
      <div className="settings-subnav">
        <button
          type="button"
          className={`settings-subnav-item ${view === 'general' ? 'active' : ''}`}
          onClick={() => setView('general')}
        >
          Allgemein
        </button>
        <button
          type="button"
          className={`settings-subnav-item ${view === 'keybinds' ? 'active' : ''}`}
          onClick={() => setView('keybinds')}
        >
          Tastenbelegung
        </button>
      </div>

      {view === 'general' ? (
        <div className="settings-tab-body">
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
      ) : (
        <KeybindsTab keybinds={keybinds} onRebind={onRebindKeybind} onReset={onResetKeybind} />
      )}
    </div>
  );
}
