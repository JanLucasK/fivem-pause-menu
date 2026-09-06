# Hub-Redesign „Dossier" (Richtung A, 2026)

Datum: 2026-09-06 · Status: vom Nutzer freigegeben (Richtung A, poliert)
Mockup: https://claude.ai/code/artifact/cf53796e-08c1-4f9d-b2cc-eafee4e327a1
(Artboard „Richtung A · Freigegeben")

## Ziel

Der Hub aus dem Dashboard-Shell-Redesign (Spec 2026-08-01) wird zur
„Dossier"-Ansicht umgebaut: eine Navigations-Rail links, das Charakter-Dossier
in der Mitte, eine schlanke „Jetzt auf NeoV"-Spalte rechts. Der Hub wirkt wie
ein Blick in die Akte des Charakters statt wie ein Website-Dashboard. Der
Hintergrund ist statisch und deckend; das Spiel ist nicht zu sehen.

Was gegenüber heute wegfällt: die Reihe aus sechs gleichförmigen Stat-Chips,
die vier Aktions-Kacheln, das große Discord-Panel, das Promo-Banner unten und
das Logomark-Kachelmuster im Hintergrund.

## Nicht-Ziele

- Keine Änderung an rp_core; alle neuen Werte kommen clientseitig aus GTA-Natives
  oder Convars und sind optional (fehlt der Wert, fällt das Element weg).
- Kein Framework-Wechsel, keine neuen Abhängigkeiten. React/Vite/TypeScript,
  lucide-react, vorhandene Fonts.
- Overlays (Karte, Tastenbelegung, Regeln), Exit-Dialog und die ESC-Kette in
  AppShell bleiben, wie sie sind. Einstellungen öffnet weiterhin das native
  GTA-Menü.
- Kein Kamera-Rig, kein Spiel-Blur, kein Durchscheinen des Spiels: der
  Hintergrund ist deckend (Nutzer-Vorgabe).

## Layout (eine Seite, 100vh, kein Scroll)

```
┌──────────────────────────────────────────────────────────────────────┐
│ Wortmarke                     Ort · Wetter · Uhrzeit · [● 42/128 online]│
├────────────┬───────────────────────────────────┬─────────────────────┤
│ ▶FORTSETZEN│ [Headshot]  CHARAKTER              │ Event-Karte          │
│  KARTE   M │             Vorname Nachname       │ (Promo-Convars)      │
│  EINSTELL. │             [JOB] [FRAKTION] Tel.  │                      │
│  TASTEN    ├──────┬──────┬──────────┬──────────┤ ANKÜNDIGUNGEN        │
│  REGELN    │Bargld│ Bank │ Payday   │Spielzeit │ • Titel / Kurztext   │
│  DISCORD   ├──────┴──────┴──────────┴──────────┤ • …                  │
│  ────────  │ Kartenstreifen (Atlas-Kachel,     │ • …                  │
│  VERLASSEN │ Kontur-Filter, Wegpunkt-Zeile)  → │                      │
│            │                                   │ ⌾ discord.gg/…       │
├────────────┴───────────────────────────────────┴─────────────────────┤
│ [↑↓] Navigieren  [ENTER] Auswählen  [ESC] Zurück      Beigetreten · ID│
└──────────────────────────────────────────────────────────────────────┘
```

Raster (bei 1080p, alles in rem über die vorhandene Root-Schriftskalierung):
Safe-Zone 5 % (96 px / 54 px). Spalten 300 px · 1fr · 420 px, Spaltenabstand
56 px. Zeilen: Kopf 64 px · Body 1fr · Fuß 56 px, Zeilenabstand 36 px. Die
drei Body-Spalten teilen Ober- und Unterkante: Rail oben bündig, Kartenstreifen
und Ankündigungs-Feed nehmen jeweils die Resthöhe. Breite gedeckelt auf 110 rem
wie bisher.

## Komponenten (alle neu unter `nui/src/hub/`, ersetzen `nui/src/dashboard/`)

- **HubView** ersetzt `Dashboard`. Gleiche Props wie heute (HomeData,
  Announcements, PromoConfig, avatarUrl, Handler) plus `hubExtras`
  (siehe Datenfluss). Rendert Backdrop, TopBar, NavRail, Dossier, NowPanel,
  PromptBar.
- **Backdrop**: deckende Graphit-Fläche (`--graphite-900`) mit einem weichen,
  dunkleren Radialverlauf rechts oben als einzigem Lichtakzent, eine 3 px
  Messing-Lichtkante am linken Rand, und **eine** große Logomark
  (`public/img/logomark.svg`, messingfarben, 5 % Deckung, ca. 1000 px, rechts
  oben, teils außerhalb des Bildes) als Wasserzeichen. Das Kachelmuster und die
  treibenden Lichtflecken aus `dashboard.css` entfallen.
- **TopBar**: links die Wortmarke (BrandMark, 40 px). Rechts als Textzeile:
  Ort (Straße, Gebiet), Wetter-Label, Uhrzeit (Mono), und ein Pill
  „● 42 / 128 online" mit grünem Punkt. Jedes Element rendert nur, wenn sein
  Wert vorhanden ist.
- **NavRail**: sieben Einträge in dieser Reihenfolge: Fortsetzen (ESC),
  Karte (Hotkey-Badge „M"), Einstellungen, Tasten, Regeln, Discord, Trenner,
  Verlassen (rote Ikone). Einträge 60 px hoch, Rajdhani 26 px Versalien.
  Der fokussierte Eintrag bekommt Messing-Verlauf, Messing-Rand und als Icon
  die goldene Logomark (`src/assets/logo.png`) mit weichem Glow; alle anderen
  Einträge zeigen ihr lucide-Icon. Beim Öffnen liegt der Fokus auf
  „Fortsetzen". Verlassen öffnet wie heute den Exit-Dialog.
- **Dossier**: Headshot 168 px (nui-img oder Initialen-Fallback, mit
  „ID 214"-Badge oben links, wenn serverId vorhanden), Overline „CHARAKTER",
  Name in Rajdhani 72 px, darunter Chips Job (messing) und Fraktion (grau,
  „KEINE FRAKTION" wenn null) und „Tel. …" (nur bei phone).
- **StatStrip**: vier Zellen mit Hairlines: Bargeld, Bank, dritte Zelle
  „Nächster Payday" in Minuten wenn `nextPaydayMinutes` vorhanden, sonst
  „Letzter Payday" mit `finance.lastPayday`, sonst Zelle leer; Spielzeit in
  Stunden (gerundet, aus playtimeMinutes).
- **MapStrip**: Klickfläche mit der Atlas-Kachel `mapStyles/styleAtlas/3/3/5.jpg`
  und der bestehenden Kontur-Filterkette (`action-card-media--contour` wird
  übernommen). Unten links „Karte öffnen" und die Wegpunkt-Zeile
  „Wegpunkt gesetzt · 2,4 km" (nur bei waypointDistanceMeters), rechts ein
  runder Pfeil-Button. Kein Positionspunkt: die Kachel ist ein fester
  Ausschnitt, eine exakte Spielerposition darauf wäre falsch.
- **EventCard**: ersetzt PromoBanner. Overline „EVENT · LÄUFT", Titel,
  Untertitel, optional ein Fortschrittsbalken (`promo.progress`, 0 bis 100).
  Flache Fläche (Messing 7 % Deckung, Messing-Rand 30 %), kein Verlauf, kein
  Logo. Kein Titel → keine Karte. Button-Label → Button darunter (promoAction).
- **AnnouncementsFeed**: Überschrift „ANKÜNDIGUNGEN" als Overline, ohne Box,
  ohne Hintergrund. Maximal drei Einträge, jeweils Marker-Balken links
  (messing beim ersten, grau sonst), Titel, Kurztext, „Tag · Datum" grau.
  Bei mehr als drei Einträgen erscheint rechts „Alle ansehen", das ein
  OverlayView mit der vollständigen Liste öffnet.
- **DiscordRow**: eine Zeile ohne Box: Icon, Einladungs-URL ohne Schema,
  darunter der Hinweis-Text, rechts ein Pfeil. Klick wie heute (onOpenDiscord).
- **PromptBar**: Fußzeile mit Hairline oben. Links die Tasten-Hinweise
  „↑↓ Navigieren · ENTER Auswählen · ESC Zurück ins Spiel", rechts
  „Beigetreten hh:mm · Spieler-ID n" in Mono.

## Navigation und Fokus

- Roving Tabindex in der NavRail: Pfeil hoch/runter bewegt den Fokus zyklisch,
  Enter/Space aktiviert, Maus-Hover setzt den Fokus ebenfalls (ein Fokusmodell,
  kein zweiter Hover-Zustand). Der sichtbare Fokus ist die Logomark-Zeile,
  zusätzlich der bestehende `--focus-ring` für Tastaturfokus außerhalb der Rail.
- Hotkey „M" im Hub öffnet die Karte (wie das Badge verspricht). Kein weiterer
  Hotkey.
- ESC-Kette unverändert (AppShell). „Fortsetzen" ruft denselben Pfad wie ESC im
  Hub.
- Tab/Shift-Tab läuft in Leserichtung: Rail → Kartenstreifen → Event-Button →
  „Alle ansehen" → Discord.

## Motion

Rail gleitet 220 ms von links ein (Transform + Opacity), Dossier, rechte
Spalte und Fußzeile steigen mit 60 ms Versatz je 260 ms nach oben. Nur
Transform und Opacity, Kurve `cubic-bezier(.2,.8,.2,1)`. Bei
`prefers-reduced-motion` keine Animation. Der Client setzt keinen Spiel-Blur
und keinen Timecycle-Modifier; der Hintergrund ist im NUI deckend.

## Datenfluss / Lua

`buildHomeData()` wird additiv erweitert; jedes neue Feld ist optional
(`json.null`, wenn unbekannt), das NUI rendert fehlende Werte nicht:

- `character.serverId` = `GetPlayerServerId(PlayerId())`.
- `location` (bisher leer) = Straße + Gebiet aus `GetStreetNameFromCoord` und
  `GetLabelText(GetNameOfZone(...))`; Format „Straße, Gebiet".
- `server.clock` = „HH:MM" aus `GetClockHours()`/`GetClockMinutes()`.
- `map.waypointDistanceMeters` = Distanz zum Wegpunkt-Blip
  (`GetFirstBlipInfoId(8)`), null ohne Wegpunkt.
- `finance.nextPaydayMinutes` bleibt vorerst null; das Feld ist reserviert für
  einen späteren corerp-Wert. Das NUI fällt auf „Letzter Payday" zurück.

Während das Menü offen ist, pusht der Client `setHomeData` alle 30 s neu
(Uhrzeit, Ort, Wegpunkt); die bestehenden Event-getriebenen Pushes bleiben.

Convars (alle optional, Defaults halten das Menü lauffähig):

- `neov_pausemenu_promo_progress` (0 bis 100, Default leer → kein Balken).
- `neov_pausemenu_discord_hint` (Default leer → nur URL in der DiscordRow).
- `neov_pausemenu_discord_url` (Default wie bisher `https://discord.gg/neov`).

Typen: `HomeData` bekommt `character.serverId?`, `server.clock?`,
`map?: { waypointDistanceMeters: number | null }`,
`finance.nextPaydayMinutes?`; `PromoConfig` bekommt `progress?: number | null`;
`ServerInfo` bekommt `discordHint?`.

## Aufräumen

`nui/src/dashboard/` (Dashboard, PlayerBar, ActionCard, CardPattern,
DiscordPanel, AnnouncementsPanel, PromoBanner, dashboard.css) wird durch
`nui/src/hub/` ersetzt und gelöscht. Die nicht mehr gemounteten Tab-Reste
(`tabs/home/`, `tabs/settings/`, `state/mockSettingsData.ts`) fliegen mit,
da sie im README ohnehin als Löschkandidaten geführt werden. README-Abschnitt
zum Layout wird auf das Dossier-Layout aktualisiert; Convars-Liste ergänzt.

## Fehlerfälle

- Fehlende optionale Felder → Element entfällt, kein „undefined", kein „null".
- Headshot-Timeout → Initialen-Fallback wie heute.
- Atlas-Kachel fehlt im Build → Kartenstreifen zeigt nur Fläche und Text.
- Ohne FiveM → Mockdaten (`!isInFivem`) inklusive der neuen Felder.

## Tests / Abnahme

- `npm run build` grün (`tsc -b && vite build`).
- Browser-Preview mit Mockdaten bei 1920×1080 und 2560×1440: Layout hält
  Safe-Zone, kein Scroll, Ober- und Unterkanten der drei Spalten fluchten.
- Tastaturlauf: Öffnen → Fokus auf Fortsetzen; ↑↓ zyklisch; Enter öffnet
  Karte/Tasten/Regeln-Overlay; ESC im Overlay → Hub; ESC im Hub → Menü zu;
  Verlassen → Exit-Dialog; M → Karte.
- Mockdaten ohne phone, faction, weather, clock, waypoint, promo title: die
  jeweiligen Elemente fehlen sauber.
- `prefers-reduced-motion: reduce` → keine Einblend-Animation.
