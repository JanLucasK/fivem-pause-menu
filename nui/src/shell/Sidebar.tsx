import { Home, Map, Settings, BookOpen, MessageCircle, LogOut, type LucideIcon } from 'lucide-react';
import type { TabDefinition, TabId } from '../types';
import { TABS } from './tabs.config';

const ICONS: Record<TabId, LucideIcon> = {
  home: Home,
  map: Map,
  settings: Settings,
  rules: BookOpen,
  discord: MessageCircle,
  exit: LogOut,
};

interface SidebarProps {
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
      className={`sidebar-item ${isActive ? 'active' : ''} ${tab.id === 'exit' ? 'sidebar-item--danger' : ''}`}
      onClick={() => onSelect(tab.id)}
    >
      <Icon size={18} />
      <span>{tab.label}</span>
    </button>
  );
}

export function Sidebar({ activeTab, onSelect }: SidebarProps) {
  const screenTabs = TABS.filter((tab) => tab.kind === 'screen');
  const actionTabs = TABS.filter((tab) => tab.kind === 'action');

  return (
    <nav className="sidebar">
      <div className="sidebar-nav">{screenTabs.map((tab) => renderTab(tab, activeTab, onSelect))}</div>
      <div className="sidebar-actions">{actionTabs.map((tab) => renderTab(tab, activeTab, onSelect))}</div>
    </nav>
  );
}
