# NeoV Pause Menu

Custom NUI-Pause-Menü für NeoV. Ersetzt das native GTA-Pause-Menü durch ein
eigenes, modulares React-UI: **Home · Map · Settings · Keybinds · Discord · Exit**.

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

- `nui/src/shell/` – AppShell, TopBar, TabNav, zentrale Tab-Registrierung
  (`tabs.config.ts`). Neue Tabs: hier eintragen, Rest verdrahtet sich selbst.
- `nui/src/tabs/<tab>/` – ein Ordner pro Tab, eigenständig.
- `nui/src/bridge/nui.ts` – einzige Schnittstelle zum Client-Skript
  (`fetchNui`, `onNuiMessage`). Läuft die App ausserhalb von FiveM, liefert
  `fetchNui` leere Mock-Antworten statt echter Requests.
- `client/client.lua` – Stub: Escape-Keybind, `SetPauseMenuActive(false)`
  solange das Menü offen ist, `disconnect`-Callback für den Exit-Dialog.

## Offene Punkte / nächste Iteration

- **Branding:** Verwendet aktuell "NEOV" als Logo-Text. Falls der öffentliche
  Servername doch anders lauten soll, in `TopBar.tsx` anpassen.
- **Map-Tab:** aktuell Platzhalter. Geplant: Leaflet.js + eingefärbte
  GTA-V-Map-Tiles (Koordinaten-Transform Game-World ↔ Map-Pixel), siehe
  Community-Referenzen `gta-v-map-leaflet` / `GTAV-Map-Tiles`.
- **Settings-Tab:** Werte sind rein lokaler React-State. Anbindung an FiveM-
  Convars bzw. eigene Server-Settings folgt, sobald `client.lua` echte Daten
  liefert.
- **Keybinds-Tab:** Rebind-UI ist fertig (Klick → Taste drücken → übernommen),
  aber greift noch nicht auf echte `bind`/`unbind`-Client-Commands durch.
- **Fonts:** Rajdhani/Inter/JetBrains Mono liegen bereits selbst-gehostet in
  `nui/public/fonts/` (Open-Font-License, aus Google Fonts geladen) – passend
  zum bestehenden NeoV-Design-System (Graphit + Messing).
