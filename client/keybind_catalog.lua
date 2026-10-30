-- Spieler-Tasten von CoreRP und pma-voice fuer die Seite "Tastenbelegung".
-- Quelle: die RegisterKeyMapping-Aufrufe in fivem-corerp/client/src (Defaults
-- aus core/input/keymap.ts) und der Convar voice_defaultCycle des Servers.
-- Bewusst nicht gelistet: Dev-/Diagnose-Tasten (Handling-Editor, Tastentest,
-- Tutorial-Testlauf), interne Riegel (+rp_funkriegel) und die Umschau-Ziffern,
-- die nur bei gehaltener Umschau wirken.
-- defaultKey ist der RegisterKeyMapping-Rohname; das UI macht daraus die
-- Tastenkappe (inkl. QWERTZ: Rohname 'y' liegt auf dem deutschen Z).

local catalog = {
    { category = 'Allgemein', command = 'rp_map', label = 'Karte öffnen/schließen', defaultKey = 'm' },
    { category = 'Allgemein', command = 'inventory', label = 'Inventar öffnen/schließen', defaultKey = 'i' },
    { category = 'Allgemein', command = 'phone', label = 'Handy öffnen/schließen', defaultKey = 'F1' },
    { category = 'Allgemein', command = 'tablet', label = 'Tablet öffnen/schließen', defaultKey = 'F2' },
    { category = 'Allgemein', command = 'radio', label = 'Funkgerät öffnen/schließen', defaultKey = 'F5' },
    { category = 'Allgemein', command = 'chat', label = 'Chat/Befehlszeile öffnen', defaultKey = 't' },
    { category = 'Allgemein', command = 'rp_pointer', label = 'Zeiger-/Zielhilfe (an/aus)', defaultKey = 'F4' },

    { category = 'Schnellzugriff', command = 'rp_hotbar1', label = 'Hotbar-Slot 1 benutzen', defaultKey = '1' },
    { category = 'Schnellzugriff', command = 'rp_hotbar2', label = 'Hotbar-Slot 2 benutzen', defaultKey = '2' },
    { category = 'Schnellzugriff', command = 'rp_hotbar3', label = 'Hotbar-Slot 3 benutzen', defaultKey = '3' },
    { category = 'Schnellzugriff', command = 'rp_hotbar4', label = 'Hotbar-Slot 4 benutzen', defaultKey = '4' },
    { category = 'Schnellzugriff', command = 'rp_hotbar5', label = 'Hotbar-Slot 5 benutzen', defaultKey = '5' },

    { category = 'Interaktion', command = '+rp_interact', label = 'Interaktionsrad (halten)', defaultKey = 'x' },
    { category = 'Interaktion', command = '+rp_umschau', label = 'Umschau halten (Objekte anvisieren)', defaultKey = 'LMENU' },
    { category = 'Interaktion', command = 'rp_lock', label = 'Tür / Tor / Garage ab-/aufschließen', defaultKey = 'l' },
    { category = 'Interaktion', command = 'rp_ja', label = 'Anfrage annehmen', defaultKey = 'J' },
    { category = 'Interaktion', command = 'rp_nein', label = 'Anfrage ablehnen', defaultKey = 'N' },
    { category = 'Interaktion', command = 'rp_einmal_hinfallen', label = 'Einmal hinfallen', defaultKey = 'F10' },

    { category = 'Emotes', command = '+rp_emoterad', label = 'Emote-Rad (halten)', defaultKey = 'y' },
    { category = 'Emotes', command = '+rp_zeigen_halten', label = 'Zeigen / Finger heben (halten)', defaultKey = 'B' },
    { category = 'Emotes', command = 'emoteHandsUp', label = 'Hände heben', defaultKey = 'H' },
    { category = 'Emotes', command = 'emoteMenu', label = 'Emote-Menü', defaultKey = 'F3' },

    { category = 'Sprache & Funk', command = '+rp_sprachreichweite', label = 'Sprachreichweite wechseln (halten: stumm)', defaultKey = 'Z' },
    { category = 'Sprache & Funk', command = '+radioptt', label = 'Funk: Sprechen (Push-to-Talk)', defaultKey = 'DOWN' },

    { category = 'Fahrzeug', command = 'rp_beifahrer_oder_taserlaser', label = 'Beifahrer einsteigen', defaultKey = 'G' },
    { category = 'Fahrzeug', command = '+rp_underground_tuning_nitro', label = 'Nitro (halten)', defaultKey = 'LSHIFT' },

    { category = 'Dienst', command = 'rp_dispatch', label = 'Dispatch öffnen (im Dienst)', defaultKey = 'K' },
    { category = 'Dienst', command = 'rp_einsatz_annehmen', label = 'Einsatz annehmen + Wegpunkt', defaultKey = 'F9' },
    { category = 'Dienst', command = 'rp_radar', label = 'Radar an/aus (Streifenwagen)', defaultKey = 'O' },
    { category = 'Dienst', command = 'rp_radarlock', label = 'Radar: Messung sperren/freigeben', defaultKey = 'U' },
    { category = 'Dienst', command = 'rp_radarlog', label = 'Radar-Historie öffnen (Bußgeld)', defaultKey = 'F6' },
    { category = 'Dienst', command = '+rp_tasersicherung', label = 'Taser: Sicherung', defaultKey = 'y' },
    { category = 'Dienst', command = '+taserreload', label = 'Taser nachladen', defaultKey = 'R' },
    { category = 'Dienst', command = '+taserreactivate', label = 'Taser reaktivieren', defaultKey = 'PAGEUP' },
    { category = 'Dienst', command = 'rp_feuerwehrfunk', label = 'Feuerwehr: Einsatzfunk beitreten', defaultKey = 'F11' },

    { category = 'Jobs', command = 'anschlagen', label = 'Angeln: anschlagen', defaultKey = 'e' },
    { category = 'Jobs', command = '+rp_reel', label = 'Angeln: einholen (halten)', defaultKey = 'e' },
    { category = 'Jobs', command = 'angelnabbrechen', label = 'Angeln: abbrechen', defaultKey = 'BACK' },
    { category = 'Jobs', command = '+rp_lumber_chop', label = 'Holzfäller: Axt schwingen', defaultKey = 'MOUSE_LEFT', mapper = 'MOUSE_BUTTON' },
}

for _, entry in ipairs(catalog) do
    RegisterKeybind({
        id = entry.command,
        command = entry.command,
        label = entry.label,
        category = entry.category,
        defaultKey = entry.defaultKey,
        mapper = entry.mapper,
    })
end
