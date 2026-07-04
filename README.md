# NeoV Pause Menu

Custom NUI-Pause-Menü für NeoV. Ersetzt das native GTA-Pause-Menü durch ein
eigenes, modulares React-UI: **Home · Karte · Einstellungen (inkl. Tastenbelegung) ·
Regeln & Hilfe · Discord · Verbindung trennen**, navigiert über eine linke
Sidebar statt einer horizontalen Tableiste.

Aktueller Stand: **Frontend-Prototyp**, standalone im Browser entwickelt/testbar
(Mock-Daten). Die FiveM-Anbindung (`client/client.lua`) ist ein Stub, der die
NUI sichtbar/unsichtbar schaltet und noch keine echten Server-Daten liefert.

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

## Architektur

- `nui/src/shell/` – AppShell, TopBar, Sidebar (linke Navigation), zentrale
  Tab-Registrierung (`tabs.config.ts`). Neue Tabs: hier eintragen, Rest
  verdrahtet sich selbst.
- `nui/src/tabs/<tab>/` – ein Ordner pro Tab, eigenständig.
- `nui/src/bridge/nui.ts` – einzige Schnittstelle zum Client-Skript
  (`fetchNui`, `onNuiMessage`). Läuft die App ausserhalb von FiveM, liefert
  `fetchNui` leere Mock-Antworten statt echter Requests.
- `client/client.lua` – Escape-Keybind, `SetPauseMenuActive(false)` solange
  das Menü offen ist, `disconnect`-Callback für den Exit-Dialog,
  Spielerpositions-Streaming + `setWaypoint`-Callback für den Map-Tab (siehe
  unten). `setHomeData` liefert bereits echte corerp-Daten; `setMapBlips`
  (POI-Layer) ist noch offen.
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

## Map-Tab

Baut auf [`gta-v-map`](https://github.com/RiceaRaul/gta-v-map-leaflet) auf,
einer Leaflet-basierten `<gta-v-map>`-Web-Component (Lit) mit fertiger
GTA-V-Koordinatentransformation und 3 Kartenstilen (Atlas/Grid/Satellite).

- **Vendored, nicht per `npm install gta-v-map`:** `nui/vendor/gta-v-map/`
  enthält den selbst gebauten `dist/`-Output des oben verlinkten Repos
  (MIT-Lizenz, siehe `nui/vendor/gta-v-map/LICENSE` +
  `nui/vendor/gta-v-map/VENDORED.md` für Commit-Hash + Update-Anleitung).
  Eingebunden über `"gta-v-map": "file:vendor/gta-v-map"` in
  `nui/package.json`. `nui/src/types/gta-v-map-jsx.d.ts` liefert die
  JSX-Typisierung fürs `<gta-v-map>`-Element (im Original-Repo in
  `src/jsx.d.ts`, aber nicht Teil des veröffentlichten `dist/`).
- **Keine echten Kartenkacheln enthalten.** Die Tile-Bilder selbst werden im
  Original-Repo separat per Mega.nz-Link verteilt (Rockstar-Texturmaterial,
  Lizenz-/Asset-Frage – nicht Teil dieses Repos oder automatisiert
  heruntergeladen). **Einbinden:**
  1. Archiv aus dem Original-Repo-README besorgen (Link dort, wechselt
     gelegentlich) und entpacken.
  2. Ordner nach `nui/public/mapStyles/` legen, genau 3 Unterordner
     (Platzhalter mit `.gitkeep` bereits angelegt):
     `styleAtlas/{z}/{x}/{y}.jpg`, `styleGrid/{z}/{x}/{y}.png`,
     `styleSatelite/{z}/{x}/{y}.jpg`.
  3. `npm run build` – Tiles landen automatisch in `nui/dist/mapStyles/`
     (siehe `fxmanifest.lua`, `files`-Glob `nui/dist/mapStyles/**/*`).
  4. Solange keine Tiles vorhanden sind, rendert die Karte einfach Wasserblau
     (`errorTileUrl`-Fallback der Library) – kein Crash, kein Broken-Image.
- **Blip-Icons:** `nui/public/blips/` – PNG pro Icon-Nummer (`<n>.png`,
  referenziert über `GtaMarker.icon`). `0.png`/`1.png` sind selbst erzeugte
  Platzhalter (Spieler-Pfeil / generischer POI-Punkt), kein Fremdmaterial.
  corerp kann eigene Icons unter weiteren Nummern ablegen.
- **3 Kartenstile per Convar:** `neov_pausemenu_map_default_style`
  (`satellite`/`atlas`/`grid`) und `neov_pausemenu_map_show_style_switcher`
  (0/1, blendet Leaflets Layer-Control mit allen 3 Stilen ein/aus) – gesetzt
  in `server-data/server.cfg` (fivem-fxserver-main), von `client.lua` gelesen
  und per `setMapConfig`-NUI-Message an die NUI gepusht.
- **Styling-Grenze:** `<gta-v-map>` rendert in einem Shadow-DOM – Leaflets
  interne Chrome (Zoom-Buttons, Layer-Control-Panel) lässt sich von außen
  nicht ans Graphit+Messing-Design anpassen, einzige offene Stellschraube ist
  die CSS-Custom-Property `--gta-water-color` (siehe `mapTab.css`). Für
  pixelgenaues Theming der Library-Chrome müsste man `gta-v-map.styles.ts`
  im vendorten Fork anpassen und neu bauen.
- Spieler-Marker (feste Id `player`, eigene Gruppe) und POI-Layer
  (`setMapBlips`, Gruppe `POI`) sind getrennte Marker-Gruppen. Der POI-Layer
  ist als alleinige corerp-Domäne gedacht – wichtig, falls später eine
  Spieler-Zeichnungsebene (Karten-Item, siehe unten) dazukommt: die darf nur
  ihre eigene Ebene berühren, nie den corerp-Icon-Layer.
- `client/client.lua` pusht `setPlayerPosition` alle 500ms (nur solange das
  Menü offen ist) und nimmt Kartenklicks über den `setWaypoint`-NUI-Callback
  entgegen (`SetNewWaypoint`).

### Geplant: Karten als Item (Zeichnen + Weitergeben)

Idee: Karten sind ein Inventar-Item; Spieler können darauf zeichnen und es
anderen Spielern geben. Umsetzung bewusst **auf corerp-Seite**, nicht in
diesem Repo:

- corerp hat bereits ein server-autoritatives, dupe-sicheres Inventar
  (`InventoryOps`/`InventoryService`, atomare Cross-Container-Transfers,
  siehe `fivem-corerp/FEATURES.md`). Ein Karten-Item mit Instanz-Daten
  (Zeichnungs-Pfade als Vektor-JSON) und dessen Transfer gehört dort rein,
  statt eine zweite Inventar-Logik hier zu bauen – sonst zwei Quellen der
  Wahrheit für einen Item-Transfer, klassischer Dupe-Vektor.
- Dieses Repo bleibt UI-only: Zeichnungs-Overlay als eigener Leaflet-Layer
  (unterhalb/getrennt vom POI-Layer), Strokes werden über einen von corerp
  exportierten Endpunkt geladen/gespeichert (Muster wie
  `ClothingCatalogService`/`resolveItem` in corerp).

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
