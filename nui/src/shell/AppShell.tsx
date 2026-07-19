import { useEffect, useState } from 'react';
import type { Announcement, HomeData } from '../types';
import { fetchNui, isInFivem, onNuiMessage } from '../bridge/nui';
import { mockHomeData } from '../state/mockHomeData';
import { mockAnnouncements } from '../state/mockAnnouncements';
import { Dashboard } from '../dashboard/Dashboard';
import { ExitConfirmDialog } from '../tabs/exit/ExitConfirmDialog';

export function AppShell() {
  // Im Browser-Dev direkt sichtbar (zum Durchklicken); in FiveM startet die
  // NUI unsichtbar und wird per 'setVisible'-Message vom Client eingeblendet.
  const [visible, setVisible] = useState(!isInFivem);
  const [homeData, setHomeData] = useState<HomeData>(mockHomeData);
  // Ankündigungen sind bewusst nur Mock (siehe state/mockAnnouncements.ts). Ein
  // 'setAnnouncements'-Listener steht für einen späteren echten Feed bereit,
  // ohne das UI zu ändern - solange der Client nichts pusht, bleibt der Mock.
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  useEffect(() => {
    const offVisible = onNuiMessage<boolean>('setVisible', setVisible);
    const offHomeData = onNuiMessage<HomeData>('setHomeData', setHomeData);
    const offAnnouncements = onNuiMessage<Announcement[]>('setAnnouncements', setAnnouncements);
    return () => {
      offVisible();
      offHomeData();
      offAnnouncements();
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
      if (exitDialogOpen) return; // ESC schliesst erst den Bestätigungsdialog
      if (isInFivem) fetchNui('closeMenu');
      else setVisible(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, exitDialogOpen]);

  if (!visible) return null;

  // Karte: nicht die interne Karte, sondern die corerp-Vollbildkarte (Command
  // 'rp_map', Taste M) - der Client schliesst dazu erst dieses Menü. Im Browser
  // gibt es kein corerp, dort blenden wir nur aus.
  function handleOpenMap() {
    if (isInFivem) fetchNui('openMap');
    else setVisible(false);
  }

  // Einstellungen: öffnet das native GTA-Pausenmenü (Einstellungen); der Client
  // schliesst dazu erst dieses Menü, sodass ESC danach das GTA-Menü schliesst und
  // normal ins Spiel zurückführt - nicht zurück in dieses Menü.
  function handleOpenSettings() {
    if (isInFivem) fetchNui('openSettings');
    else setVisible(false);
  }

  // Discord (Mock): im Browser-Dev öffnet die Einladung einen neuen Tab; im Spiel
  // ist window.open ein No-op - CEF hat keinen externen Browser.
  function handleOpenDiscord() {
    window.open(homeData.server.discordUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <Dashboard
        data={homeData}
        announcements={announcements}
        onOpenMap={handleOpenMap}
        onOpenSettings={handleOpenSettings}
        onOpenDiscord={handleOpenDiscord}
        onDisconnect={() => setExitDialogOpen(true)}
      />
      {exitDialogOpen && <ExitConfirmDialog onCancel={() => setExitDialogOpen(false)} />}
    </>
  );
}
