# Dashboard-Shell-Redesign (0r-inspiriert, NeoV-Look)

Datum: 2026-08-01 · Status: vom Nutzer freigegeben (Ansatz A)

## Ziel

Die Tab-Shell (Sidebar + TopBar + Tab-Inhalte) wird durch eine einzelne
Dashboard-Seite als Hub ersetzt — Layoutidee nach 0r-pausemenu, Optik als
Weiterentwicklung der bestehenden NeoV-Marke (Gold auf Dunkel). Sekundäre
Inhalte (Karte, Tastenbelegung, Regeln) öffnen als Vollbild-Overlays;
Einstellungen springt weiterhin ins native GTA-Menü.

## Nicht-Ziele

- Kein Nachbau der 0r-Optik (bunte Akzent-Cards, Charakter-Artwork).
- Keine Änderung an rp_core; Datenhandshake wird nur clientseitig erweitert
  (vorbereitet für Telefon/Gang/Fraktion, sobald Events verfügbar).
- Kein Framework-Wechsel: React/Vite/TypeScript bleiben.

## Layout (eine Seite, 100vh, kein Scroll)

```
┌──────────────────────────────────────────────────────────────┐
│ TopBar: Logo · Name+Job · Chips (Bargeld, Bank, Online,      │
│         Beigetreten, Wetter, [Telefon] [Gang]) ·  Exit       │
├──────────────────┬──────────────────┬────────────────────────┤
│ Kachel: Karte    │ Discord-Card     │ Ankündigungen (Feed,   │
│ (groß, Bild/SVG) │ (CTA)            │  scrollt intern)       │
├──────────────────┤ ┌──────┬───────┐ │                        │
│ Kachel:          │ │Tasten│Regeln │ │                        │
│ Einstellungen    │ └──────┴───────┘ │                        │
├──────────────────┴──────────────────┴────────────────────────┤
│ Event-/Promo-Banner (volle Breite, Config-getrieben)         │
└──────────────────────────────────────────────────────────────┘
```

## Komponenten

- **DashboardShell** (ersetzt AppShell-Tab-Logik): View-State
  `'hub' | 'map' | 'keybinds' | 'rules'`. ESC: Overlay → Hub → Menü zu.
- **TopBar**: bestehende PlayerBar-Daten + neuer Wetter-Chip
  (`GetPrevWeatherTypeHashName()` clientseitig, Hash→Label-Map wie 0r,
  deutsch). Chips für Telefon/Gang/Fraktion rendern nur, wenn Feld im
  HomeData-Payload vorhanden (null-tolerant).
- **Hub-Kacheln**: Karte, Einstellungen (groß); Tastenbelegung, Regeln
  (klein). Vorhandene SVG-Patterns (CardPattern) als Hintergrund.
- **Overlays**: MapTab, KeybindsTab, RulesTab unverändert wiederverwendet,
  in Vollbild-Overlay-Container mit Zurück-Leiste.
- **Discord-Card + AnnouncementsPanel**: bestehende Komponenten, neu
  gestylt.
- **PromoBanner** (neu): Titel/Untertitel/Button-Text aus Convars
  (`neov_pausemenu_promo_*`), Banner entfällt, wenn Titel leer — kein
  NUI-Rebuild für Content-Änderungen. Button feuert NUI-Callback
  `promoAction`; Lua-seitig ein leerer Hook (wie 0rs `MiscButton`), den der
  Serverbetreiber in client.lua füllt. Kein Button-Text → kein Button.

## Visuelle Richtung

Gold/Dark weiterentwickelt: mehrschichtige Flächen (abgestufte
Surface-Tokens), dezenter Backdrop-Blur auf Cards, Gold-Glow nur bei
Hover/Fokus, Rajdhani für Display/Zahlen, Inter für Fließtext (Fonts
bereits lokal). Umsetzung folgt dem game-ui-design-Skill (Lesbarkeit,
Controller-/ESC-Navigation, Safe-Areas).

## Datenfluss / Lua

- `client.lua`: buildHomeData() um `weather` (Label) erweitert; Promo-Convars
  analog zu bestehenden Map-Convars mitgeschickt (`setPromoConfig` oder Teil
  von HomeData).
- Keine neuen Server-Abhängigkeiten; rp_core-Erweiterungen (Telefon/Gang)
  später rein additiv über vorhandenes Event-Muster.

## Fehlerfälle

- Fehlende Datenfelder → Chip wird nicht gerendert (kein „undefined").
- Ohne FiveM (Browser-Preview) → Mockdaten wie bisher (`!isInFivem`).

## Tests / Abnahme

- Browser-Preview (`_preview`-Flow) mit Mockdaten: Hub, alle drei Overlays,
  ESC-Kette, leerer Promo-Convar (Banner weg), fehlende Chips.
- Vite-Build grün (`tsc -b && vite build`).
