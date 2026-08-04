import { useEffect, useState } from 'react';
import type {
  Announcement,
  HomeData,
  KeybindEntry,
  MapBlip,
  MapConfig,
  MapPlayerPosition,
  PromoConfig,
} from '../types';
import { fetchNui, isInFivem, onNuiMessage } from '../bridge/nui';
import { mockHomeData, mockPromoConfig } from '../state/mockHomeData';
import { mockAnnouncements } from '../state/mockAnnouncements';
import { mockMapBlips, mockMapConfig, mockPlayerPosition } from '../state/mockMapData';
import { mockKeybinds } from '../tabs/keybinds/keybinds.data';
import { Dashboard } from '../dashboard/Dashboard';
import { ExitConfirmDialog } from '../tabs/exit/ExitConfirmDialog';
import { OverlayView } from './OverlayView';
import { MapTab } from '../tabs/map/MapTab';
import { KeybindsTab } from '../tabs/keybinds/KeybindsTab';
import { RulesTab } from '../tabs/rules/RulesTab';
import { faqEntries, ruleSections } from '../tabs/rules/rules.data';

// Der Hub ist die einzige "Seite"; Karte/Tastenbelegung/Regeln liegen als
// Vollbild-Overlays darueber. ESC steigt die Kette ab: ExitDialog -> Overlay
// -> Menue schliessen.
type HubView = 'hub' | 'map' | 'keybinds' | 'rules';

export function AppShell() {
  // Im Browser-Dev direkt sichtbar (zum Durchklicken); in FiveM startet die
  // NUI unsichtbar und wird per 'setVisible'-Message vom Client eingeblendet.
  const [visible, setVisible] = useState(!isInFivem);
  const [view, setView] = useState<HubView>('hub');
  const [homeData, setHomeData] = useState<HomeData>(mockHomeData);
  // Ankündigungen sind bewusst nur Mock (siehe state/mockAnnouncements.ts). Ein
  // 'setAnnouncements'-Listener steht für einen späteren echten Feed bereit,
  // ohne das UI zu ändern - solange der Client nichts pusht, bleibt der Mock.
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [promo, setPromo] = useState<PromoConfig>(isInFivem ? { title: '', subtitle: '', buttonLabel: '' } : mockPromoConfig);
  const [mapConfig, setMapConfig] = useState<MapConfig>(mockMapConfig);
  const [playerPosition, setPlayerPosition] = useState<MapPlayerPosition>(mockPlayerPosition);
  const [mapBlips, setMapBlips] = useState<MapBlip[]>(mockMapBlips);
  const [keybinds, setKeybinds] = useState<KeybindEntry[]>(isInFivem ? [] : mockKeybinds);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  useEffect(() => {
    const offs = [
      onNuiMessage<boolean>('setVisible', (value) => {
        setVisible(value);
        // Beim naechsten Oeffnen wieder auf dem Hub starten, nicht im zuletzt
        // offenen Overlay.
        if (!value) setView('hub');
      }),
      onNuiMessage<HomeData>('setHomeData', setHomeData),
      onNuiMessage<Announcement[]>('setAnnouncements', setAnnouncements),
      onNuiMessage<PromoConfig>('setPromoConfig', setPromo),
      onNuiMessage<MapConfig>('setMapConfig', setMapConfig),
      onNuiMessage<MapPlayerPosition>('setPlayerPosition', setPlayerPosition),
      onNuiMessage<MapBlip[]>('setMapBlips', setMapBlips),
      onNuiMessage<KeybindEntry[]>('setKeybinds', setKeybinds),
    ];
    return () => offs.forEach((off) => off());
  }, []);

  // ESC-Kette. In FiveM haelt SetNuiFocus die Tastatur in der NUI fest, solange
  // das Menue offen ist - das Client-Skript bekommt ESC nicht mit und muss beim
  // Schliessen ueber closeMenu informiert werden. Offene Overlays fallen nur zum
  // Hub zurueck; der KeybindsTab faengt ESC waehrend einer Tasten-Aufnahme per
  // capture+stopImmediatePropagation selbst ab.
  useEffect(() => {
    if (!visible) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (exitDialogOpen) return; // ESC schliesst erst den Bestätigungsdialog
      if (view !== 'hub') {
        setView('hub');
        return;
      }
      if (isInFivem) fetchNui('closeMenu');
      else setVisible(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, exitDialogOpen, view]);

  if (!visible) return null;

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

  function handlePromoAction() {
    if (isInFivem) fetchNui('promoAction');
  }

  // Optimistisch aktualisieren: der Lua-Callback (rebindKey/resetKeybind)
  // antwortet nur per cb, pusht aber kein neues setKeybinds - ohne lokales
  // Update bliebe die Liste bis zum naechsten Menue-Oeffnen alt.
  function handleRebind(id: string, key: string) {
    if (isInFivem) fetchNui('rebindKey', { id, key });
    setKeybinds((prev) => prev.map((entry) => (entry.id === id ? { ...entry, key } : entry)));
  }

  function handleResetKeybind(id: string) {
    if (isInFivem) fetchNui('resetKeybind', { id });
    setKeybinds((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, key: entry.defaultKey } : entry)),
    );
  }

  return (
    <>
      <Dashboard
        data={homeData}
        announcements={announcements}
        promo={promo}
        onOpenMap={() => setView('map')}
        onOpenSettings={handleOpenSettings}
        onOpenKeybinds={() => setView('keybinds')}
        onOpenRules={() => setView('rules')}
        onOpenDiscord={handleOpenDiscord}
        onPromoAction={handlePromoAction}
        onDisconnect={() => setExitDialogOpen(true)}
      />

      {view === 'map' && (
        <OverlayView title="Karte" onBack={() => setView('hub')} bleed>
          <MapTab
            playerPosition={playerPosition}
            blips={mapBlips}
            defaultStyle={mapConfig.defaultStyle}
            showStyleSwitcher={mapConfig.showStyleSwitcher}
            onSetWaypoint={(x, y) => {
              if (isInFivem) fetchNui('setWaypoint', { x, y });
            }}
          />
        </OverlayView>
      )}

      {view === 'keybinds' && (
        <OverlayView title="Tastenbelegung" onBack={() => setView('hub')}>
          <KeybindsTab keybinds={keybinds} onRebind={handleRebind} onReset={handleResetKeybind} />
        </OverlayView>
      )}

      {view === 'rules' && (
        <OverlayView title="Regeln & Hilfe" onBack={() => setView('hub')}>
          <RulesTab sections={ruleSections} faq={faqEntries} />
        </OverlayView>
      )}

      {exitDialogOpen && <ExitConfirmDialog onCancel={() => setExitDialogOpen(false)} />}
    </>
  );
}
