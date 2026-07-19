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
    identity = nil, -- { firstname, lastname, job?, faction? } bestbekannt (Name/Job)
    progression = nil, -- { playtimeMinutes, ... }, rp:progression:update
    lastPaydayNetCents = nil, -- rp:progression:payday (PaydayBreakdown.net)
}

-- Identitaet ueber Ressourcen-Neustarts/Reconnects hinweg cachen: corerp liefert
-- den Namen nur UI-frei ueber rp:character:spawned (einmalig beim Spawn) und Job
-- nur ueber die Ausweis-Karte (rp:identity:card, wenn der Spieler /id oeffnet).
-- Beides ist NICHT on-demand ohne UI abrufbar - deshalb den zuletzt gesehenen
-- Stand im Resource-KVP persistieren und beim Laden daraus seeden, damit der Name
-- nach einem Restart nicht auf "Unbekannt" faellt.
local IDENTITY_KVP = 'corerp:identity'

-- Vorwaertsdeklaration: pushHomeData wird weiter unten definiert, updateIdentity
-- ruft es aber schon auf.
local pushHomeData

local function updateIdentity(patch)
    local cur = corerpHomeData.identity or {}
    corerpHomeData.identity = {
        firstname = patch.firstname or cur.firstname,
        lastname = patch.lastname or cur.lastname,
        job = patch.job or cur.job,
        faction = patch.faction or cur.faction,
    }
    local id = corerpHomeData.identity
    if id.firstname or id.lastname then
        SetResourceKvp(IDENTITY_KVP, json.encode(id))
    end
    if pushHomeData then pushHomeData() end
end

do
    local saved = GetResourceKvpString(IDENTITY_KVP)
    if saved then
        local ok, decoded = pcall(json.decode, saved)
        if ok and type(decoded) == 'table' then
            corerpHomeData.identity = decoded
        end
    end
end

local function buildHomeData()
    local balances = corerpHomeData.balances or { cash = 0, bank = 0 }
    local identity = corerpHomeData.identity or {}
    local progression = corerpHomeData.progression or { playtimeMinutes = 0 }

    return {
        character = {
            -- Name/Job aus dem bestbekannten, im KVP gecachten Identitaets-Stand
            -- (rp:character:spawned fuer den Namen, rp:identity:card fuer Job/Faction,
            -- falls der Spieler seinen Ausweis geoeffnet hat).
            firstName = identity.firstname or '',
            lastName = identity.lastname or '',
            job = identity.job,
            faction = identity.faction,
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

-- Zuweisung an die oben forward-deklarierte Local (kein neues `local`), damit
-- updateIdentity dieselbe Funktion sieht.
function pushHomeData()
    if isMenuOpen then
        SendNUIMessage({ action = 'setHomeData', payload = buildHomeData() })
    end
end

RegisterNetEvent('rp:money:balances')
AddEventHandler('rp:money:balances', function(payloadJson)
    corerpHomeData.balances = json.decode(payloadJson)
    pushHomeData()
end)

-- Passiv: nur falls der Spieler seinen Ausweis selbst per /id oeffnet. Wir loesen
-- das Event NIE selbst aus (das oeffnet das Ausweis-Modal) - hier nur mithoeren,
-- um dann auch Job/Faction fuers Menue zu haben (wird im KVP mitgecacht).
RegisterNetEvent('rp:identity:card')
AddEventHandler('rp:identity:card', function(payloadJson)
    local card = json.decode(payloadJson) or {}
    updateIdentity({ firstname = card.firstname, lastname = card.lastname, job = card.job, faction = card.faction })
end)

-- Name ohne UI-Folge: corerp pusht den gespawnten Charakter beim Charakter-Laden.
RegisterNetEvent('rp:character:spawned')
AddEventHandler('rp:character:spawned', function(payloadJson)
    local sp = json.decode(payloadJson) or {}
    updateIdentity({ firstname = sp.firstname, lastname = sp.lastname })
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
        -- Bargeld/Bank aktiv nachfragen: corerp schickt Balances nur bei Mutation
        -- bzw. auf Anfrage. WICHTIG: corerp verwirft Requests mit leerer Nutzlast
        -- (ServerEventBus.On: `if string.IsNullOrEmpty(rawJson) then ... return`),
        -- deshalb - wie bei allen corerp-Client-Calls (emitNet(name, '{}')) - ein
        -- leerer JSON-String '{}' mitschicken. rp:money:request hat KEINE UI-Folge.
        TriggerServerEvent('rp:money:request', '{}')
        -- Bewusst KEIN rp:identity:request: das ist corerps /id-Handler und oeffnet
        -- den Personalausweis (corerps Client zeigt bei rp:identity:card ein Modal).
        -- Name/Job holen wir stattdessen ohne UI-Folge aus rp:character:spawned bzw.
        -- passiv aus rp:identity:card, falls der Spieler seinen Ausweis selbst oeffnet.
    end
end

-- ESC laesst sich in FiveM NICHT zuverlaessig ueber RegisterKeyMapping binden
-- (die Taste ist von Spiel/CEF reserviert - ein 'ESCAPE'-Mapping feuert oft gar
-- nicht). Deshalb oeffnen wir das Menue nicht per Keymapping, sondern lesen den
-- (unterdrueckten) Pause-Control direkt im Frame-Thread unten aus. Der Command
-- bleibt fuer /neov:togglepausemenu bzw. externes Ausloesen erhalten.
local lastToggle = 0
local function toggleMenu()
    -- Waehrend das native GTA-Pausenmenue (Einstellungen) offen ist bzw. gerade
    -- geschlossen wurde, wuerde derselbe ESC-Druck sonst unser Menue direkt neu
    -- oeffnen - genau das soll nicht passieren.
    if gtaSettingsOpen or IsPauseMenuActive() then return end
    -- Kurze Entprellung gegen Doppel-Toggle in einem Frame-Fenster.
    local now = GetGameTimer()
    if now - lastToggle < 250 then return end
    lastToggle = now
    setMenuVisible(not isMenuOpen)
end

RegisterCommand('neov:togglepausemenu', function()
    toggleMenu()
end, false)

-- Natives Pausenmenue unterdruecken UND ESC selbst auswerten. Control 199
-- (INPUT_FRONTEND_PAUSE = P) und 200 (INPUT_FRONTEND_PAUSE_ALTERNATE = ESC)
-- werden jeden Frame deaktiviert, damit GTAs Menue nicht aufgeht; den Tastendruck
-- lesen wir ueber die *Disabled*-Control-Natives trotzdem aus und toggeln unser
-- Menue. So haengt das Oeffnen nicht am (unzuverlaessigen) ESCAPE-Keymapping.
CreateThread(function()
    while true do
        Wait(0)
        -- Nicht unterdruecken, solange wir das native GTA-Pausenmenue absichtlich
        -- offen halten (Einstellungen) - sonst liesse es sich nicht per ESC wieder
        -- schliessen.
        if not gtaSettingsOpen then
            -- ESC/Pause je nach Build/Layout auf mehreren Controls: 200
            -- (FRONTEND_PAUSE_ALTERNATE = ESC), 199 (FRONTEND_PAUSE = P), 322.
            DisableControlAction(0, 199, true)
            DisableControlAction(0, 200, true)
            DisableControlAction(0, 322, true)
            -- Sicherheitsnetz: sollte das native Menue trotz Control-Disable doch
            -- aufgehen (Control-Index-Unterschiede zwischen Builds), sofort wieder
            -- schliessen - unseres uebernimmt.
            if IsPauseMenuActive() then
                SetPauseMenuActive(false)
            end
            -- Menue oeffnen nur, wenn unseres zu ist: bei offenem Menue haelt
            -- SetNuiFocus die Tastatur in der NUI, die ESC selbst per
            -- closeMenu-Callback behandelt (siehe AppShell.tsx).
            if not isMenuOpen and (
                IsDisabledControlJustReleased(0, 200)
                or IsDisabledControlJustReleased(0, 199)
                or IsDisabledControlJustReleased(0, 322)
            ) then
                toggleMenu()
            end
        end
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
