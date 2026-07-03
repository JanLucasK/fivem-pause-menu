-- Stub für die spätere FiveM-Anbindung des Prototyps. Der Fokus lag bisher auf
-- dem NUI-Frontend (siehe nui/); dieser Teil wird erst verdrahtet, wenn das
-- Design final ist.

local isMenuOpen = false

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

local function setMenuVisible(visible)
    isMenuOpen = visible
    SetNuiFocus(visible, visible)
    SendNUIMessage({ action = 'setVisible', payload = visible })
    if visible then
        SendNUIMessage({ action = 'setMapConfig', payload = getMapConfig() })
    end
end

RegisterKeyMapping('neov:togglepausemenu', 'NeoV Pause-Menü öffnen', 'keyboard', 'ESCAPE')
RegisterCommand('neov:togglepausemenu', function()
    setMenuVisible(not isMenuOpen)
end, false)

-- Verhindert, dass GTAs natives Pause-Menü parallel aufgeht, waehrend unseres offen ist.
CreateThread(function()
    while true do
        if isMenuOpen then
            SetPauseMenuActive(false)
        end
        Wait(0)
    end
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

-- TODO (naechste Iteration): 'setHomeData' mit echten Charakter-/Finanz-/Server-
-- Werten befuellen, sobald die Anbindung an den restlichen NeoV-Server steht.
--
-- TODO (corerp-Anbindung): 'setMapBlips' mit POI/Icon-Daten aus corerp
-- befuellen (Shops, Dienste, ggf. andere Spieler). Eigener Layer im Map-Tab,
-- bewusst getrennt von einer spaeteren Spieler-Zeichnungsebene - siehe
-- README "Map-Tab" fuer die geplante Architektur (Karten-Item, Kartenbild vs.
-- corerp-Icons).
