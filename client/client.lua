-- Stub für die spätere FiveM-Anbindung des Prototyps. Der Fokus lag bisher auf
-- dem NUI-Frontend (siehe nui/); dieser Teil wird erst verdrahtet, wenn das
-- Design final ist.

local isMenuOpen = false

local function setMenuVisible(visible)
    isMenuOpen = visible
    SetNuiFocus(visible, visible)
    SendNUIMessage({ action = 'setVisible', payload = visible })
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

-- TODO (naechste Iteration): 'setHomeData' mit echten Charakter-/Finanz-/Server-
-- Werten befuellen, sobald die Anbindung an den restlichen NeoV-Server steht.
