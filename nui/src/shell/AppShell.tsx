import { useEffect, useState } from 'react';
import type { TabId, HomeData } from '../types';
import { isInFivem, onNuiMessage } from '../bridge/nui';
import { mockHomeData } from '../state/mockHomeData';
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

  useEffect(() => {
    const offVisible = onNuiMessage<boolean>('setVisible', setVisible);
    const offHomeData = onNuiMessage<HomeData>('setHomeData', setHomeData);
    return () => {
      offVisible();
      offHomeData();
    };
  }, []);

  // Dev-Komfort: ESC schliesst das Menue auch im Browser-Prototyp.
  useEffect(() => {
    if (isInFivem) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setVisible((current) => !current);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
          {activeTab === 'map' && <MapTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'keybinds' && <KeybindsTab />}
        </main>
      </div>

      {exitDialogOpen && <ExitConfirmDialog onCancel={() => setExitDialogOpen(false)} />}
    </div>
  );
}
