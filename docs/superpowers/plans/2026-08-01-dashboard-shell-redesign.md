# Dashboard-Shell-Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hub-Dashboard (0r-Layout, NeoV-Look) mit Overlays für Karte/Tastenbelegung/Regeln, Wetter-/Telefon-Chips und Convar-getriebenem Promo-Banner.

**Architecture:** AppShell bekommt View-State `hub | map | keybinds | rules`; die verwaisten Tab-Komponenten (MapTab, KeybindsTab, RulesTab) werden als Vollbild-Overlays wiederangebunden. Dashboard-Grid wird um kleine Kacheln (Tastenbelegung, Regeln) und PromoBanner erweitert. Lua liefert Wetter-Label und Promo-Convars zusätzlich im bestehenden Push-Muster.

**Tech Stack:** React 18 + TypeScript + Vite (nui/), Lua54 Client (client/), kein Test-Runner — Verifikation über `npm run build` (tsc) + Browser-Preview (`_preview`-Flow, Playwright-Screenshot).

## Global Constraints

- Sprache UI: Deutsch. Marke: NeoV Gold/Dark (tokens.css erweitern, nicht ersetzen).
- Keine Änderungen an rp_core; nur additive Convars (`neov_pausemenu_promo_*`).
- Fehlende Datenfelder → Element wird nicht gerendert (kein "undefined").
- Browser-Preview (`!isInFivem`) muss ohne FiveM alle Views mit Mocks zeigen.
- Nach jedem Task: `cd nui && npm run build` grün, dann commit.

---

### Task 1: Typen + Mocks erweitern

**Files:**
- Modify: `nui/src/types/index.ts`
- Modify: `nui/src/state/mockHomeData.ts`

**Interfaces (Produces):**
- `CharacterInfo.phone?: string | null`
- `ServerInfo.weather?: string | null`
- `export interface PromoConfig { title: string; subtitle: string; buttonLabel: string; }` (leerer `title` ⇒ Banner versteckt, leerer `buttonLabel` ⇒ kein Button)

- [ ] Typen ergänzen (optional-nullable, damit alte Lua-Payloads ohne Felder valid bleiben)
- [ ] `mockHomeData`: `phone: '555-0134'`, `weather: 'Klar'` ergänzen; `export const mockPromoConfig: PromoConfig = { title: 'Sommer-Event', subtitle: 'Doppelter Payday am Wochenende – Samstag & Sonntag', buttonLabel: 'Mehr erfahren' }` in `nui/src/state/mockHomeData.ts`
- [ ] `npm run build` grün, commit `feat(nui): types/mocks für Wetter, Telefon, Promo`

### Task 2: Lua — Wetter, Promo-Convars, promoAction

**Files:**
- Modify: `client/client.lua`

**Interfaces (Produces):**
- HomeData-Payload: `server.weather` (deutsches Label oder json.null)
- NUI-Message `setPromoConfig` mit `{ title, subtitle, buttonLabel }` (Strings, ggf. leer)
- NUI-Callback `promoAction` (leerer Hook mit Kommentar für Serverbetreiber)

- [ ] Wetter-Map (Hash→deutsches Label) als lokale Tabelle; in `buildHomeData()` `server.weather = weatherLabels[GetPrevWeatherTypeHashName()] or json.null`. Labels: Klar, Bewölkt, Regen, Sturm, Nebel, Schnee (Hashes aus 0r-Config übernehmen, Texte deutsch)
- [ ] `getPromoConfig()` liest Convars `neov_pausemenu_promo_title`, `_subtitle`, `_button` (Default ''); in `setMenuVisible(true)` zusätzlich `SendNUIMessage({ action = 'setPromoConfig', payload = getPromoConfig() })`
- [ ] `RegisterNUICallback('promoAction', ...)`: schließt Menü nicht, ruft nur Hook-Funktion `OnPromoAction()` auf, die leer definiert ist (Kommentar: vom Serverbetreiber befüllen)
- [ ] Lua-Syntaxcheck (`luac -p` falls vorhanden, sonst Sichtprüfung), commit `feat(client): Wetter-Label, Promo-Convars, promoAction-Hook`

### Task 3: View-State + Overlays in AppShell

**Files:**
- Modify: `nui/src/shell/AppShell.tsx`
- Create: `nui/src/shell/OverlayView.tsx` (+ Stilblock in `nui/src/shell/appShell.css`)

**Interfaces:**
- Consumes: `MapTab({ playerPosition, blips, defaultStyle, showStyleSwitcher, onSetWaypoint })`, `KeybindsTab({ keybinds, onRebind, onReset })`, `RulesTab({ sections, faq })`, rules.data (`ruleSections`, `faqEntries` — exakte Exportnamen beim Umsetzen aus `rules.data.ts` übernehmen)
- Produces: `type HubView = 'hub' | 'map' | 'keybinds' | 'rules'`; `OverlayView({ title, onBack, children })` — Vollbild-Container mit Zurück-Leiste
- NUI-Listener neu in AppShell: `setMapConfig`, `setPlayerPosition`, `setMapBlips`, `setKeybinds`, `setPromoConfig`
- NUI-Callbacks aus Overlays: `rebindKey`, `resetKeybind`, `setWaypoint` (bestehende Lua-Seite)

- [ ] `view`-State + Handler: Karte-Kachel ⇒ `setView('map')` (ersetzt `fetchNui('openMap')`; Lua-Callback `openMap` bleibt für Kompatibilität liegen), Tastenbelegung ⇒ `'keybinds'`, Regeln ⇒ `'rules'`
- [ ] ESC-Kette: Overlay offen ⇒ ESC setzt `view='hub'` (kein closeMenu); Hub ⇒ wie bisher closeMenu; ExitDialog weiterhin Vorrang
- [ ] Bei `setVisible(false)` view auf 'hub' zurücksetzen
- [ ] Browser-Fallback: Mocks aus `state/mockMapData.ts` und `keybinds.data.ts` laden, wenn `!isInFivem`
- [ ] Build grün, Preview: alle drei Overlays öffnen/schließen, commit `feat(nui): Hub-View-State mit Map/Keybinds/Rules-Overlays`

### Task 4: Hub-Grid + PromoBanner + kleine Kacheln

**Files:**
- Create: `nui/src/dashboard/PromoBanner.tsx`
- Modify: `nui/src/dashboard/Dashboard.tsx`, `nui/src/dashboard/dashboard.css`

**Interfaces:**
- `PromoBanner({ config, onAction }: { config: PromoConfig; onAction: () => void })` — rendert `null` bei leerem `title`
- Dashboard-Props neu: `promo: PromoConfig`, `onOpenKeybinds: () => void`, `onOpenRules: () => void` (ersetzt nichts Bestehendes)

- [ ] Grid nach Spec-Skizze: links 2 große Kacheln, Mitte Discord + 2 kleine Kacheln (Tastenbelegung: Icon `Keyboard`, Regeln: Icon `BookOpenText` aus lucide-react), rechts Announcements, unten PromoBanner volle Breite
- [ ] PromoBanner: Titel/Untertitel/Button aus Config; Button ⇒ `onAction` (AppShell: `fetchNui('promoAction')`, im Browser no-op)
- [ ] Build grün, Preview-Screenshot Hub, commit `feat(nui): Hub-Grid mit kleinen Kacheln und PromoBanner`

### Task 5: PlayerBar-Chips (Wetter, Telefon, Gang)

**Files:**
- Modify: `nui/src/dashboard/PlayerBar.tsx`

- [ ] Chips nur rendern, wenn Wert vorhanden: Wetter (`CloudSun`-Icon, `data.server.weather`), Telefon (`Smartphone`, `data.character.phone`), Fraktion/Gang (`Users`, `data.character.faction`)
- [ ] Build grün, commit `feat(nui): bedingte Chips für Wetter/Telefon/Fraktion`

### Task 6: Visuelles Redesign (game-ui-design-Skill laden)

**Files:**
- Modify: `nui/src/styles/tokens.css`, `nui/src/styles/global.css`, `nui/src/dashboard/dashboard.css`, `nui/src/shell/appShell.css`
- Delete: `nui/src/shell/Sidebar.tsx`, `nui/src/shell/TopBar.tsx`, `nui/src/shell/tabs.config.ts` (verwaist; vorher per grep bestätigen, dass nichts importiert)

- [ ] game-ui-design-Skill invoken, danach: Surface-Layering (3 Stufen), Backdrop-Blur auf Cards, Gold-Glow nur `:hover`/`:focus-visible`, Rajdhani für Zahlen/Display, klare Fokus-Ringe (Gamepad-/Tastatur-Navigierbarkeit), 100vh ohne Scroll
- [ ] Verwaiste Dateien löschen, `grep -rn "Sidebar\|tabs.config" nui/src` leer
- [ ] Build grün, commit `feat(nui): visuelles Redesign Gold/Dark (Layering, Glas, Glow)`

### Task 7: Verifikation + Preview-Aktualisierung

- [ ] `cd nui && npm run build` grün
- [ ] `dist` nach `_preview/ours/` kopieren, `npx serve _preview`, Playwright: Screenshots Hub + Map-Overlay + Keybinds-Overlay + Rules-Overlay; ESC-Kette prüfen; Banner verschwindet, wenn Mock-`title` leer gesetzt wird (einmalig lokal testen)
- [ ] Screenshots dem Nutzer zeigen, commit `chore: preview refresh`
