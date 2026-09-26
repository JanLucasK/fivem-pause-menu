# NeoV Pause Menu

Custom NUI-Pause-Menü für NeoV. Ersetzt das native GTA-Pause-Menü durch ein
**Dossier**-Menü im NeoV-Look (Graphit + Messing, deckender Hintergrund):
links eine **Navigations-Rail** (Fortsetzen, Karte, Einstellungen, Tasten,
Regeln, Discord, Verlassen), in der Mitte das **Charakter-Dossier** (Headshot,
Name, Job/Fraktion, Kennzahl-Zeile, Atlas-Vorschau), rechts **Event-Karte,
Ankündigungen und Discord**. Design-Spec:
`docs/superpowers/specs/2026-09-06-dossier-hub-redesign-design.md`.

Das Menü hat bewusst wenig Eigenlogik – es ruft vorhandene Funktionen auf statt
sie nachzubauen:

- **Karte** (Rail-Eintrag, Atlas-Vorschau oder Taste **M** im Hub) schließt
  das Pause-Menü und startet über `openMap` den CoreRP-Command `rp_map`.
  CoreRP übernimmt Fokus, Karten-Item, Wegpunkte und Schließen. Die kleine
  Vorschau zeigt passiv die Spielerposition auf denselben `rp_atlas`-Kacheln.
- **Einstellungen** öffnet das **native GTA-Pausenmenü** (dort liegen die
  GTA-Settings). Das Menü schließt sich dafür zuerst, sodass ein anschließendes
  **ESC** das GTA-Menü schließt und normal ins Spiel zurückführt – **nicht**
  zurück in dieses Menü.
- **Event-Karte und Ankündigungen** rechts kommen aus CoreRPs veröffentlichter
  Datenbank-Konfiguration. Mehr als drei sichtbare Meldungen → „Alle ansehen“
  öffnet das Overlay; der Event-Button führt ebenfalls dorthin. Ohne
  Veröffentlichung bleibt die Fläche leer statt alte Mock-Meldungen zu zeigen.
- **Discord** bleibt eine Zeile mit Einladungs-URL und Hinweistext aus Convars.
- Die **Navigations-Rail** ist mit ↑/↓, Enter und Maus bedienbar (ein
  Fokusmodell, ruhige Messing-Hervorhebung und ortsfeste Symbole);
  Tasten-Hinweise stehen in der Fußzeile.
- Das **Charakterbild** wird beim Öffnen aus dem lokalen Ped gerendert. Native
  Timeouts und NUI-Ladefehler führen zu begrenzten Neuversuchen; bis ein Bild
  bereitsteht, bleiben die Initialen als stabiler Fallback sichtbar.

Die Spielerdaten oben kommen live aus corerp (`client/client.lua` hängt sich
lesend an dessen Charakter-/Kontostand-/Progression-Events, siehe unten).

Kopfzeile und Fußzeile zeigen zusätzlich Ort (Straße, Gebiet), Wetter,
Spielzeit-Uhr, Online-Zahl, Beitrittszeit und Server-ID - alles clientseitig
aus GTA-Natives, jedes Feld optional (fehlt der Wert, fällt das Element weg).
Während das Menü offen ist, pusht der Client `setHomeData` alle 30 s neu.

## Convars

In `server-data/server.cfg` setzbar (alle mit sinnvollem Default, ohne Eintrag
läuft das Menü unverändert):

- `neov_pausemenu_gta_settings_component` (Default `42`) – welcher Tab des nativen
  GTA-Pausenmenüs beim Klick auf **Einstellungen** angesteuert wird (dritter
  Parameter von `ActivateFrontendMenu`). Der passende Wert ist **GTA-Build-
  abhängig**; landet der Klick nicht auf dem gewünschten Tab, hier den zum Build
  passenden Wert setzen – kein NUI-Rebuild nötig.
- `neov_pausemenu_discord_url` (Default `https://discord.gg/neov`) und
  `neov_pausemenu_discord_hint` (Default leer, z. B. „1.240 Mitglieder") –
  Discord-Zeile rechts unten.

## Entwickeln (Browser, ohne FiveM)

```
cd nui
npm install
npm run dev
```

Läuft standalone unter `http://localhost:5173`. `ESC` togglet das Menü (nur im
Browser-Dev-Modus, s. `AppShell.tsx`). Alle Zahlen/Namen kommen aus
`nui/src/state/mockHomeData.ts` bzw. `nui/src/tabs/keybinds/keybinds.data.ts`.

## Build für FiveM

```
cd nui
npm run build
```

Baut nach `nui/dist/`, `fxmanifest.lua` referenziert genau diesen Ordner.

## Logo

`nui/src/assets/logo.png` ist das Original-Render der Marke, auf das Zeichen
zugeschnitten und freigestellt (der schwarze Hintergrund des Renders wurde per
Luminanz ausgekeyt). Dadurch bringt es sein eigenes Alpha mit und sitzt auf dem
Panel-Hintergrund statt auf einem schwarzen Kasten. 512×512, quadratisch.

`nui/src/components/BrandMark.tsx` zeigt es in der TopBar und der PlayerBar und
ersetzt dort die frühere Wortmarke "NEOV".

Die Datei wird **importiert** und von Vite als `data:`-URI ins JS-Bundle
eingebettet (`assetsInlineLimit` in `vite.config.ts`) — **sie wird bewusst
nicht als eigene Datei ausgeliefert.**

Als eigene Datei kam sie nicht beim Client an: der Server hat die Bytes nicht
in `cache/files/…/resource.rpf` gepackt, obwohl die Datei korrekt im Ordner
lag, lesbar war, im `files{}` stand und die Resource neu gestartet war. Im
Spiel gab das ein Broken-Image ohne jede Fehlermeldung. Eingebettet kann nichts
fehlen. Deshalb ist das Asset auf 128×128 verkleinert — angezeigt wird es mit
34–40 px, das reicht mit Reserve und hält das Bundle klein (+19 KB).

`assetsInlineLimit` betrifft nur **importierte** Assets. Alles unter `public/`
(Fonts, Blips, Map-Tiles) läuft unverändert als Datei.

- Größe: `size`-Prop von `<BrandMark />`.
- Der Messing-Schein kommt aus `.brand-mark` in `nui/src/styles/global.css`.

## Architektur

- `nui/src/shell/` – AppShell (View-State `hub | keybinds | rules |
  announcements`, ESC-Kette, Hotkey M) und OverlayView (Vollbild-Overlay mit
  Zurück-Leiste).
- `nui/src/hub/` – der Hub: HubView, TopBar, NavRail, Dossier, StatStrip,
  MapStrip, EventCard, AnnouncementsFeed, DiscordRow, PromptBar, `hub.css`.
- `nui/src/tabs/<tab>/` – Overlays (keybinds, rules) und der Exit-Dialog.
- `nui/src/bridge/nui.ts` – einzige Schnittstelle zum Client-Skript
  (`fetchNui`, `onNuiMessage`). Läuft die App ausserhalb von FiveM, liefert
  `fetchNui` leere Mock-Antworten statt echter Requests.
- `client/client.lua` – Escape-Keybind, `SetPauseMenuActive(false)` solange
  das Menü offen ist, `disconnect`-Callback und `openMap`-Callback für CoreRP.
  `setHomeData` liefert Charakterdaten; CoreRPs Client-Brücke liefert
  veröffentlichte Event-/News-Daten über `rp:pause-menu:content-local`.
  Beim Öffnen fordert die Resource sie über `rp:pause-menu:request-local`
  erneut an. Die CoreRP-Brücke hält die eigentlichen NetEvent-Namen zentral.
- `client/keybinds.lua` / `client/settings.lua` – generische Registries für
  die "Tastenbelegung"/"Allgemein"-Unteransichten im Einstellungen-Tab, siehe
  Abschnitt darunter.

## Keybinds & Settings für andere Resourcen

Beide Bereiche sind bewusst **nicht** NeoV-spezifisch fest verdrahtet: Jede
Resource (dieser Server oder Drittresourcen wie `fivem-pma-voice`) kann eigene
Einträge per Export anmelden. Das NUI rendert ausschließlich, was diese
Registries liefern - keine Resource wird von diesem Menü aus angefasst.

**Keybinds** (`client/keybinds.lua`, Export `RegisterKeybind`): meldet einen
bereits per `RegisterKeyMapping` registrierten Command zur Anzeige/zum Rebind
im UI an. Aufruf aus dem Client-Skript der eigenen Resource, nachdem der
eigene `RegisterKeyMapping`-Call gelaufen ist:

```lua
if GetResourceState('neov-pause-menu') == 'started' then
    exports['neov-pause-menu']:RegisterKeybind({
        id = 'myres_dosomething',       -- eindeutig, dient als KVP-Key
        command = 'myres_dosomething',  -- Command-String aus RegisterCommand/RegisterKeyMapping
        label = 'Etwas tun',
        category = 'Mein Script',       -- Gruppierung im UI, frei wählbar
        defaultKey = 'E',               -- muss zum RegisterKeyMapping-Default passen
    })
end
```

Rebind aus dem UI führt intern `bind`/`unbind` für genau diesen Command aus
und merkt sich die Wahl in einem Resource-KVP (übersteht Neustarts/Reconnects
- FiveM selbst bietet keine Query-Native für "aktuell gebundene Taste").

**Settings** (`client/settings.lua`, Export `RegisterSetting`): meldet eine
Slider- oder Toggle-Zeile an. NeoVs eigene Audio/HUD/Voice-Sektionen nutzen
exakt dieselbe API (siehe Ende der Datei) - kein Sonderpfad für "eingebaute"
Settings.

```lua
if GetResourceState('neov-pause-menu') == 'started' then
    local current = exports['neov-pause-menu']:RegisterSetting({
        id = 'myres_hud_scale',
        section = 'Mein Script',   -- Gruppierung im UI, frei wählbar
        label = 'HUD-Skalierung',
        type = 'slider',           -- 'slider' | 'toggle'
        default = 100,
        min = 50, max = 150,       -- nur bei 'slider' relevant
    })
end

AddEventHandler('myres:settingChanged', function(id, value)
    -- id == 'myres_hud_scale', value == neuer Wert - hier eigene Reaktion
    -- (Convar setzen, eigenen Export aufrufen, ...).
end)
```

Änderungen werden von `neov-pause-menu` selbst im Resource-KVP persistiert und
per `TriggerEvent('<eigene-resource>:settingChanged', id, value)` an die
registrierende Resource zurückgemeldet - dieses Menü schreibt nie direkt in
eine fremde Resource hinein.

Beide Exports sind optional/lose gekoppelt (kein `dependency`-Eintrag im
`fxmanifest.lua` der aufrufenden Resource nötig) - der `GetResourceState`-Guard
oben verhindert nur einen Fehler, falls `neov-pause-menu` nicht läuft.

## Karte

Das Pause-Menü besitzt keine zweite interaktive Karte. Rail-Eintrag,
Atlas-Vorschau und Taste M im geöffneten Hub rufen denselben NUI-Callback
`openMap` auf. `client/client.lua` gibt den Pause-Menü-Fokus frei und führt
`rp_map` aus; CoreRP zeigt dann seine Atlas-Karte mit Karten-Items,
Spielerposition und Wegpunkten. Die passive Vorschau zeichnet `rp_atlas`-Kacheln
auf einem Canvas mit gemeinsam gerundeten Pixelkanten, sodass keine 1-px-Lücken
zwischen Kacheln entstehen. Der Ausschnitt klemmt an allen Atlas-Grenzen;
der Spielerpunkt folgt seiner Position im geklemmten Ausschnitt. `fxmanifest.lua`
verlangt `rp_core` und `rp_atlas`. Für Spieler ohne nutzbare Karte gelten
die CoreRP-Regeln.

## Event und Ankündigungen verwalten

Im CoreRP-Adminmenü unter **Welt & Inhalte → Medien & Fortschritt → Pause-Menü**
steht ein Editor mit Entwurfsvorschau, bis zu zehn Meldungen, Reihenfolge,
Sichtbarkeit, Event-Text, Button und optionalem Fortschrittsbalken. Das eigene
Recht `admin.pausemenu.manage` schützt Kachel, Lesen und Speichern; CoreRP prüft
es serverseitig erneut. Veröffentlichen schreibt den ganzen Stand mit
Revisionsprüfung in MariaDB und verteilt nur aktive Meldungen an Spieler.
Discord gehört nicht zu diesem Recht und bleibt in den obigen Convars.

## Offene Punkte / nächste Iteration

- **Branding:** Verwendet aktuell "NEOV" als Logo-Text. Falls der öffentliche
  Servername doch anders lauten soll, in `TopBar.tsx` anpassen.
- **Settings-Tab:** datengetrieben über `client/settings.lua`
  (`RegisterSetting`-Export, siehe oben), Werte persistieren im Resource-KVP.
  Was eine Änderung tatsächlich bewirkt (z.B. einen echten Audio-Mix
  beeinflussen), liegt bei der jeweils registrierenden Resource - `neov-pause-
  menu` selbst setzt nur den Wert, keine Spiel-Convars.
- **Keybinds-Tab:** datengetrieben über `client/keybinds.lua`
  (`RegisterKeybind`-Export, siehe oben). Rebind führt echtes `bind`/`unbind`
  aus und persistiert die Wahl im Resource-KVP.
- **Fonts:** Rajdhani/Inter/JetBrains Mono liegen bereits selbst-gehostet in
  `nui/public/fonts/` (Open-Font-License, aus Google Fonts geladen) – passend
  zum bestehenden NeoV-Design-System (Graphit + Messing).
