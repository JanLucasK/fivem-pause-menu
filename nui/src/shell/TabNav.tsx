import { Home, Map, Settings, Keyboard, MessageCircle, LogOut, type LucideIcon } from 'lucide-react';
import type { TabDefinition, TabId } from '../types';
import { TABS } from './tabs.config';

const ICONS: Record<TabId, LucideIcon> = {
  home: Home,
  map: Map,
  settings: Settings,
  keybinds: Keyboard,
  discord: MessageCircle,
  exit: LogOut,
};

interface TabNavProps {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
}

function renderTab(tab: TabDefinition, activeTab: TabId, onSelect: (tab: TabId) => void) {
  const Icon = ICONS[tab.id];
  const isActive = tab.kind === 'screen' && tab.id === activeTab;
  return (
    <button
      key={tab.id}
      type="button"
      className={`tabnav-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(tab.id)}
    >
      <Icon size={16} />
      <span>{tab.label}</span>
    </button>
  );
}

export function TabNav({ activeTab, onSelect }: TabNavProps) {
  const screenTabs = TABS.filter((tab) => tab.kind === 'screen');
  const actionTabs = TABS.filter((tab) => tab.kind === 'action');

  return (
    <nav className="tabnav">
      {screenTabs.map((tab) => renderTab(tab, activeTab, onSelect))}
      <div className="tabnav-actions">{actionTabs.map((tab) => renderTab(tab, activeTab, onSelect))}</div>
    </nav>
  );
}
