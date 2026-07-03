import { useEffect, useState } from 'react';
import type { TabId, HomeData, MapBlip, MapConfig, MapPlayerPosition } from '../types';
import { fetchNui, isInFivem, onNuiMessage } from '../bridge/nui';
import { mockHomeData } from '../state/mockHomeData';
import { mockMapBlips, mockMapConfig, mockPlayerPosition } from '../state/mockMapData';
import { TABS } from './tabs.config';
import { TopBar } from './TopBar';
import { TabNav } from './TabNav';
import { HomeTab } from '../tabs/home/HomeTab';
import { MapTab } from '../tabs/map/MapTab';
import { SettingsTab } from '../tabs/settings/SettingsTab';
import { KeybindsTab } from '../tabs/keybinds/KeybindsTab';
import { ExitConfirmDialog } from '../tabs/exit/ExitConfirmDialog';
import './appShell.css';

export function AppShell() {
  // Im Browser-Dev direkt sichtbar (zum Durchklicken); in FiveM startet die
  // NUI unsichtbar und wird per 'setVisible'-Message vom Client eingeblendet.
  const [visible, setVisible] = useState(!isInFivem);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [homeData, setHomeData] = useState<HomeData>(mockHomeData);
  const [playerPosition, setPlayerPosition] = useState<MapPlayerPosition>(mockPlayerPosition);
  const [mapBlips, setMapBlips] = useState<MapBlip[]>(mockMapBlips);
  const [mapConfig, setMapConfig] = useState<MapConfig>(mockMapConfig);

  useEffect(() => {
    const offVisible = onNuiMessage<boolean>('setVisible', setVisible);
    const offHomeData = onNuiMessage<HomeData>('setHomeData', setHomeData);
    const offPlayerPosition = onNuiMessage<MapPlayerPosition>('setPlayerPosition', setPlayerPosition);
    const offMapBlips = onNuiMessage<MapBlip[]>('setMapBlips', setMapBlips);
    const offMapConfig = onNuiMessage<MapConfig>('setMapConfig', setMapConfig);
    return () => {
      offVisible();
      offHomeData();
      offPlayerPosition();
      offMapBlips();
      offMapConfig();
    };
  }, []);

  // ESC schliesst das Menue. In FiveM haelt SetNuiFocus die Tastatur in der NUI
  // fest, solange das Menue offen ist - das Client-Skript bekommt ESC in dem
  // Moment also nicht mehr mit und muss hierueber (closeMenu) informiert werden,
  // statt selbst per RegisterCommand zu schliessen. Im Browser-Prototyp gibt es
  // kein Client-Skript, dort schaltet ESC den lokalen State direkt um.
  useEffect(() => {
    if (!visible) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (isInFivem) {
        fetchNui('closeMenu');
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible]);

  if (!visible) return null;

  function handleSelect(tabId: TabId) {
    const tab = TABS.find((entry) => entry.id === tabId);
    if (!tab) return;

    if (tab.kind === 'action') {
      if (tabId === 'discord') {
        window.open(homeData.server.discordUrl, '_blank', 'noopener,noreferrer');
      }
      if (tabId === 'exit') {
        setExitDialogOpen(true);
      }
      return;
    }

    setActiveTab(tabId);
  }

  return (
    <div className="app-shell">
      <div className="app-shell-backdrop" />
      <div className="app-shell-frame">
        <TopBar location={homeData.location} />
        <TabNav activeTab={activeTab} onSelect={handleSelect} />
        <main className="app-shell-content">
          {activeTab === 'home' && <HomeTab data={homeData} onOpenMap={() => setActiveTab('map')} />}
          {activeTab === 'map' && (
            <MapTab
              playerPosition={playerPosition}
              blips={mapBlips}
              defaultStyle={mapConfig.defaultStyle}
              showStyleSwitcher={mapConfig.showStyleSwitcher}
              onSetWaypoint={(x, y) => fetchNui('setWaypoint', { x, y })}
            />
          )}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'keybinds' && <KeybindsTab />}
        </main>
      </div>

      {exitDialogOpen && <ExitConfirmDialog onCancel={() => setExitDialogOpen(false)} />}
    </div>
  );
}
