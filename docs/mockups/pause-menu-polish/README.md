# Pause-Menü · Polish und rechte Spalte

Lokales HTML-Mockup: `index.html`. Ansicht oben zwischen Spieleransicht und Adminmenü umschalten.
Renderings: `spieleransicht.png`, `atlas-vorschau-detail.png`,
`atlas-vorschau-breit.png`, `admin-event.png`, `admin-ankuendigungen.png`.
Die Adminfelder ändern nur die Vorschau im Browser; Veröffentlichen speichert nichts.

Gezeigte kleine Korrekturen: Währungszeichen ohne Umbruch, lesbarere Atlas-Vorschau,
sichtbarer Fokus für die Kartenkachel, ruhigere Kontraste rechts. Die Karte
bleibt bis an den Kartenrahmen sichtbar; ein weicher Schatten unten links hält
die Beschriftung lesbar. Die Icons
sind die echten Lucide-SVGs aus dem Pause-Menü (Karte, Regeln, Verlassen, Discord
und die übrige Navigation), keine Zeichen-Platzhalter.

Vorgeschlagener In-game-Einstieg: Administration → Welt & Inhalte → Medien & Fortschritt
→ Pause-Menü. Eigenes Recht: `admin.pausemenu.manage`. Im Entwurf umfasst es
Event-Karte und Ankündigungen. Die Discord-Zeile bleibt bei der bisherigen
Server-Konfiguration. Der Server müsste jeden Schreibvorgang mit diesem Recht
prüfen, Werte validieren, persistent speichern und auditieren. Dieses Mockup
implementiert das nicht.

Die neun JPEGs unter `assets/` stammen aus der vorhandenen Resource `rp_atlas` und
dienen hier nur als statischer Kartenausschnitt der Entwurfsansicht. Eingaben im
Admin-Tab ändern allein die Entwurfs-Vorschau; die Spieleransicht bleibt unverändert.

Die Ankündigungsliste skizziert Auswahl und Reihenfolge. Nur der erste Entwurf ist
im Mockup editierbar; weitere Einträge und Veröffentlichen brauchen die spätere
Produktimplementierung.

Für die spätere Live-Umsetzung gilt zusätzlich: Den Vorschau-Viewport an den Atlas-Grenzen
klemmen, statt außerhalb der Kachelpyramide leere Fläche zu zeigen. Der Spielerpunkt muss
dabei an seiner tatsächlichen Position im geklemmten Ausschnitt bleiben.

Der zuvor sichtbare schwarze Streifen war ein echter Kachel-Cut im breiten Mockup:
Das Raster begann bei großer Karte innerhalb des Rahmens. `min()` hält seine linke
und obere Kante jetzt außerhalb des sichtbaren Ausschnitts; der Schatten liegt
anschließend als weicher Verlauf über den vollständig gedeckten Kacheln.

## Implementierungs-Render

`implementation-player.png` zeigt die gebaute Pause-Menü-NUI mit einem lokal
zugestellten Veröffentlichungs-Payload und echten `rp_atlas`-Kacheln.
`implementation-west-edge.png` zeigt die geklemmte Vorschau an der westlichen
Atlas-Grenze mit vollständig sichtbarem Spielerpunkt. Beide Bilder stammen aus
einem Browser-Harness; der Resource-zu-Resource-Eventweg und FiveM-CEF bleiben
In-game-Abnahme. Der produktive Bundle-Build nutzt wieder
`https://cfx-nui-rp_atlas/mapStyles`.
