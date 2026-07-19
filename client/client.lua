-- Stub für die spätere FiveM-Anbindung des Prototyps. Der Fokus lag bisher auf
-- dem NUI-Frontend (siehe nui/); dieser Teil wird erst verdrahtet, wenn das
-- Design final ist.

local isMenuOpen = false

-- Beitrittszeitpunkt (Ressourcenstart ~ Spawn) als Unix-Zeit fuer die
-- "Beigetreten"-Anzeige in der Player-Bar. Reine Anzeige, client-lokal.
-- WICHTIG: os.time()/os.date() sind client-seitig in FiveM NICHT verfuegbar
-- (das os-Modul ist gesandboxt) - ein Aufruf wirft beim Laden und wuerde den
-- Rest von client.lua abbrechen. Deshalb die native Cloud-Zeit (UTC-Unixzeit),
-- einmal nach dem Start festgehalten (nil, bis sie verfuegbar ist).
local joinedAtUnix = nil
CreateThread(function()
    while joinedAtUnix == nil do
        local t = GetCloudTimeAsInt()
        if t and t > 0 then
            joinedAtUnix = t
        else
            Wait(250)
        end
    end
end)

-- True, solange wir fuer den Spieler das native GTA-Pausenmenue (Einstellungen)
-- geoeffnet haben. In dieser Zeit unterdruecken wir Control 200 NICHT (sonst
-- liesse sich das GTA-Menue nicht per ESC schliessen) und blockieren das erneute
-- Oeffnen unseres Menues, damit ESC sauber ins Spiel zurueckfuehrt statt hierher.
local gtaSettingsOpen = false

-- Kartenstil (Atlas/Grid/Satellite) per server.cfg-Convar statt hart im
-- NUI-Code, damit Serverbetreiber Default-Stil/Umschalter ohne NUI-Rebuild
-- aendern koennen: neov_pausemenu_map_default_style / _show_style_switcher,
-- gesetzt in server-data/server.cfg (fivem-fxserver-main).
local function getMapConfig()
    return {
        defaultStyle = GetConvar('neov_pausemenu_map_default_style', 'satellite'),
        showStyleSwitcher = GetConvarInt('neov_pausemenu_map_show_style_switcher', 1) == 1,
    }
end

-- Welcher Pausenmenue-Tab beim Klick auf "Einstellungen" angesteuert wird, haengt
-- vom GTA-Build ab (dritter Parameter von ActivateFrontendMenu). Deshalb per
-- Convar statt hart im Code, damit der Serverbetreiber ohne Rebuild den richtigen
-- Tab treffen kann: neov_pausemenu_gta_settings_component (Default 42).
local function getSettingsComponent()
    return GetConvarInt('neov_pausemenu_gta_settings_component', 42)
end

-- corerp-Anbindung (nur lesend): corerp ist eine eigenstaendige Resource
-- (rp_core) ohne Cross-Resource-Export/State-Bag fuer Charakter-/Finanzdaten.
-- FiveMs Client-Events sind aber global (nicht resource-scoped) - corerp
-- schickt Charakter-/Kontostand-/Spielzeit-Updates bereits per
-- TriggerClientEvent an den eigenen Spieler (server/RpCore.Core/Framework/Net,
-- Event-Namen aus fivem-corerp/shared/src/events.ts). Wir haengen uns nur als
-- zusaetzlicher Listener dran und schreiben nie zurueck - corerp bleibt
-- unveraendert, kein neuer Rechte-/Wert-Pfad entsteht dadurch.
local corerpHomeData = {
    balances = nil, -- { cash, bank } in Cent, rp:money:balances
    idcard = nil, -- { firstname, lastname, job, faction, ... }, rp:identity:card
    progression = nil, -- { playtimeMinutes, ... }, rp:progression:update
    lastPaydayNetCents = nil, -- rp:progression:payday (PaydayBreakdown.net)
}

local function buildHomeData()
    local balances = corerpHomeData.balances or { cash = 0, bank = 0 }
    local idcard = corerpHomeData.idcard or {}
    local progression = corerpHomeData.progression or { playtimeMinutes = 0 }

    return {
        character = {
            firstName = idcard.firstname or '',
            lastName = idcard.lastname or '',
            job = idcard.job,
            faction = idcard.faction,
            playtimeMinutes = progression.playtimeMinutes or 0,
        },
        finance = {
            cash = (balances.cash or 0) / 100,
            bank = (balances.bank or 0) / 100,
            -- json.null statt nil: ein Lua-nil-Wert entfernt den Tabellen-Key
            -- komplett, das Frontend erwartet aber explizit "null" (siehe
            -- FinanceCard.tsx: `finance.lastPayday !== null`).
            lastPayday = corerpHomeData.lastPaydayNetCents and (corerpHomeData.lastPaydayNetCents / 100) or json.null,
        },
        -- Server-/Standort-Info kommt (noch) nicht aus corerp - unveraendert
        -- gegenueber dem bisherigen Prototyp-Stand, siehe TODO unten.
        server = {
            serverName = 'NeoV',
            onlinePlayers = NetworkGetNumConnectedPlayers(),
            maxPlayers = tonumber(GetConvar('sv_maxclients', '48')) or 48,
            discordUrl = 'https://discord.gg/neov',
            -- json.null statt nil: ein Lua-nil-Wert wuerde den Key ganz entfernen,
            -- das Frontend erwartet aber explizit number|null (siehe PlayerBar).
            joinedAtUnix = joinedAtUnix or json.null,
        },
        location = '',
    }
end

local function pushHomeData()
    if isMenuOpen then
        SendNUIMessage({ action = 'setHomeData', payload = buildHomeData() })
    end
end

RegisterNetEvent('rp:money:balances')
AddEventHandler('rp:money:balances', function(payloadJson)
    corerpHomeData.balances = json.decode(payloadJson)
    pushHomeData()
end)

RegisterNetEvent('rp:identity:card')
AddEventHandler('rp:identity:card', function(payloadJson)
    corerpHomeData.idcard = json.decode(payloadJson)
    pushHomeData()
end)

RegisterNetEvent('rp:progression:update')
AddEventHandler('rp:progression:update', function(payloadJson)
    corerpHomeData.progression = json.decode(payloadJson)
    pushHomeData()
end)

RegisterNetEvent('rp:progression:payday')
AddEventHandler('rp:progression:payday', function(payloadJson)
    local breakdown = json.decode(payloadJson)
    corerpHomeData.lastPaydayNetCents = breakdown.net
    pushHomeData()
end)

local function setMenuVisible(visible)
    isMenuOpen = visible
    SetNuiFocus(visible, visible)
    SendNUIMessage({ action = 'setVisible', payload = visible })
    if visible then
        SendNUIMessage({ action = 'setMapConfig', payload = getMapConfig() })
        SendNUIMessage({ action = 'setHomeData', payload = buildHomeData() })
        -- Keybinds/Settings-Registry (client/keybinds.lua, client/settings.lua)
        -- laufen unabhaengig vom Menuestatus, damit andere Resourcen jederzeit
        -- registrieren koennen - beim Oeffnen schicken wir trotzdem den
        -- aktuellen Stand mit, falls sich seit dem letzten `setKeybinds`/
        -- `setSettings`-Push (bei Registrierung) etwas geaendert hat.
        SendNUIMessage({ action = 'setKeybinds', payload = GetKeybinds() })
        SendNUIMessage({ action = 'setSettings', payload = GetSettings() })
        -- Aktuellen Stand aktiv nachfragen: Balances/IdCard werden von corerp
        -- nur bei Mutation bzw. auf Anfrage (nicht periodisch) verschickt.
        -- Beide Request-Events sind parameterlos - corerp liest source/Spieler
        -- selbst aus dem Event-Kontext, es gibt also keinen client-seitigen
        -- Wert, der hier manipuliert werden koennte (kein Dupe-Vektor).
        TriggerServerEvent('rp:money:request')
        TriggerServerEvent('rp:identity:request')
    end
end

RegisterKeyMapping('neov:togglepausemenu', 'NeoV Pause-Menü öffnen', 'keyboard', 'ESCAPE')
RegisterCommand('neov:togglepausemenu', function()
    -- Waehrend das native GTA-Pausenmenue (Einstellungen) offen ist bzw. gerade
    -- geschlossen wurde, faengt derselbe ESC-Druck sonst hier wieder an und wuerde
    -- unser Menue direkt neu oeffnen - genau das soll nicht passieren.
    if gtaSettingsOpen or IsPauseMenuActive() then return end
    setMenuVisible(not isMenuOpen)
end, false)

-- Eigener Bind, registriert ueber dieselbe Registry wie fremde Resourcen
-- (siehe client/keybinds.lua) - ohne das taucht der Menue-Toggle selbst nicht
-- im Keybinds-Tab auf, obwohl er per RegisterKeyMapping laengst existiert.
RegisterKeybind({
    id = 'neov_togglepausemenu',
    command = 'neov:togglepausemenu',
    label = 'Pause-Menü öffnen/schließen',
    category = 'NeoV',
    defaultKey = 'ESCAPE',
})

-- INPUT_FRONTEND_PAUSE (Control 200) dauerhaft deaktivieren, damit GTAs natives
-- Pause-Menü niemals aufgeht - unabhaengig davon, ob unseres gerade offen ist.
-- RegisterKeyMapping oben ist ein eigener Custom-Bind und laeuft unabhaengig
-- von DisableControlAction, wird also weiterhin ausgeloest.
CreateThread(function()
    while true do
        -- Nicht unterdruecken, solange wir das native GTA-Pausenmenue absichtlich
        -- offen halten (Einstellungen) - sonst liesse es sich nicht per ESC wieder
        -- schliessen.
        if not gtaSettingsOpen then
            DisableControlAction(0, 200, true)
        end
        if isMenuOpen then
            SetPauseMenuActive(false)
        end
        Wait(0)
    end
end)

-- Schliessen per ESC: Waehrend das Menue offen ist, haelt SetNuiFocus(true, true)
-- die Tastatureingaben in der NUI fest, RegisterCommand/RegisterKeyMapping oben
-- feuert also nicht mehr. Das Frontend faengt ESC deshalb selbst ab (siehe
-- AppShell.tsx) und meldet sich hierueber zurueck.
RegisterNUICallback('closeMenu', function(_, cb)
    setMenuVisible(false)
    cb({})
end)

-- "Karte" im Menue: nicht eine eigene Karte, sondern die corerp-Vollbildkarte
-- (Command 'rp_map', standardmaessig Taste M). Wir schliessen erst unser Menue
-- (gibt den NUI-Fokus frei) und stossen dann den corerp-Command an - Commands
-- sind global, also ressourceuebergreifend ausfuehrbar. corerp uebernimmt danach
-- Fokus/Anzeige/Schliessen der Karte selbst.
RegisterNUICallback('openMap', function(_, cb)
    setMenuVisible(false)
    ExecuteCommand('rp_map')
    cb({})
end)

-- "Einstellungen" im Menue: das native GTA-Pausenmenue oeffnen (dort liegen die
-- GTA-Settings). Erst unser Menue schliessen (Fokus zurueck ans Spiel), dann das
-- Frontend-Menue aktivieren. gtaSettingsOpen haelt die Control-200-Unterdrueckung
-- und das Wieder-Oeffnen unseres Menues zurueck, bis der Spieler das GTA-Menue
-- per ESC schliesst - dann geht es normal ins Spiel zurueck, nicht in unser Menue.
RegisterNUICallback('openSettings', function(_, cb)
    setMenuVisible(false)
    gtaSettingsOpen = true
    ActivateFrontendMenu(GetHashKey('FE_MENU_VERSION_SP_PAUSE'), false, getSettingsComponent())
    CreateThread(function()
        -- Warten, bis das Pausenmenue tatsaechlich offen ist (mit Timeout, falls
        -- ActivateFrontendMenu auf diesem Build nicht greift).
        local guard = GetGameTimer() + 2000
        while gtaSettingsOpen and not IsPauseMenuActive() and GetGameTimer() < guard do
            Wait(0)
        end
        -- ... dann warten, bis der Spieler es wieder schliesst.
        while gtaSettingsOpen and IsPauseMenuActive() do
            Wait(100)
        end
        -- Kurzer Nachlauf, damit derselbe ESC-Druck, der das GTA-Menue schliesst,
        -- nicht sofort wieder unser Menue oeffnet (Control-200-Race).
        Wait(300)
        gtaSettingsOpen = false
    end)
    cb({})
end)

RegisterNUICallback('disconnect', function(_, cb)
    ExecuteCommand('disconnect')
    cb({})
end)

-- Spielerposition fuer den Map-Tab. Laeuft nur, solange das Menü offen ist,
-- und mit 500ms-Intervall statt jedem Frame - Position aendert sich waehrend
-- Pause ohnehin nicht schnell, und die NUI ist dann eh nicht sichtbar.
CreateThread(function()
    while true do
        Wait(500)
        if isMenuOpen then
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            SendNUIMessage({
                action = 'setPlayerPosition',
                payload = { x = coords.x, y = coords.y, heading = GetEntityHeading(ped) },
            })
        end
    end
end)

RegisterNUICallback('setWaypoint', function(data, cb)
    SetNewWaypoint(data.x + 0.0, data.y + 0.0)
    cb({})
end)

-- TODO (corerp-Anbindung): 'setMapBlips' mit POI/Icon-Daten aus corerp
-- befuellen (Shops, Dienste, ggf. andere Spieler). Eigener Layer im Map-Tab,
-- bewusst getrennt von einer spaeteren Spieler-Zeichnungsebene - siehe
-- README "Map-Tab" fuer die geplante Architektur (Karten-Item, Kartenbild vs.
-- corerp-Icons).
