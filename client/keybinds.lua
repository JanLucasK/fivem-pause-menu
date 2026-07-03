-- Generische Keybind-Registry: JEDE Resource (fivem-corerp, pma-voice, ...)
-- kann hier ihre eigenen, per RegisterKeyMapping registrierten Commands
-- anmelden, damit sie im NeoV-Menü (Tab "Keybinds") auftauchen und über die
-- eigene UI umgebunden werden können - unabhängig davon, welche Resource den
-- Command besitzt. Dieses Menü fasst dafür nie Code einer fremden Resource
-- an, es ruft nur `bind`/`unbind` (Standard-FiveM-Konsolenbefehle) für den
-- von der registrierenden Resource übergebenen Commandnamen auf.
--
-- Aufruf durch eine andere Resource (Client-Skript, nach dem eigenen
-- RegisterKeyMapping):
--   exports['neov-pause-menu']:RegisterKeybind({
--       id = 'myres_dosomething',      -- eindeutig, wird als KVP-Key genutzt
--       command = 'myres_dosomething', -- Command-String aus RegisterCommand/RegisterKeyMapping
--       label = 'Etwas tun',
--       category = 'Mein Script',      -- Gruppierung im UI, frei wählbar
--       defaultKey = 'E',              -- muss zum RegisterKeyMapping-Default passen
--       mapper = 'keyboard',           -- optional, Default 'keyboard'
--   })
-- Guard davor mit GetResourceState('neov-pause-menu') == 'started' bzw.
-- pcall, da dieses Menü optional ist und nicht als fxmanifest-Dependency
-- vorausgesetzt werden soll.
--
-- Persistenz: `bind`/`unbind` wirken zwar sofort im laufenden Spiel, ohne
-- Query-Native für "aktuell gebundene Taste" ist der Resource-KVP-Store
-- (`SetResourceKvp`/`GetResourceKvpString`) hier aber die alleinige Quelle
-- der Wahrheit für den in der UI angezeigten/gemerkten Wert.

local keybinds = {}
local keybindOrder = {}

local function kvpKey(id)
    return ('keybind:%s'):format(id)
end

local function applyBind(mapper, key, command)
    ExecuteCommand(('bind %s %s %s'):format(mapper, key, command))
end

local function unapplyBind(mapper, key, command)
    ExecuteCommand(('unbind %s %s %s'):format(mapper, key, command))
end

function RegisterKeybind(opts)
    assert(type(opts) == 'table', 'RegisterKeybind erwartet eine Options-Tabelle')
    assert(type(opts.id) == 'string' and opts.id ~= '', 'RegisterKeybind: id fehlt')
    assert(type(opts.command) == 'string' and opts.command ~= '', 'RegisterKeybind: command fehlt')
    assert(type(opts.label) == 'string' and opts.label ~= '', 'RegisterKeybind: label fehlt')
    assert(type(opts.defaultKey) == 'string' and opts.defaultKey ~= '', 'RegisterKeybind: defaultKey fehlt')

    local mapper = opts.mapper or 'keyboard'
    local saved = GetResourceKvpString(kvpKey(opts.id))
    local key = saved or opts.defaultKey

    if keybinds[opts.id] == nil then
        keybindOrder[#keybindOrder + 1] = opts.id
    end

    keybinds[opts.id] = {
        id = opts.id,
        resource = GetInvokingResource() or GetCurrentResourceName(),
        command = opts.command,
        label = opts.label,
        category = opts.category or 'Allgemein',
        mapper = mapper,
        defaultKey = opts.defaultKey,
        key = key,
    }

    -- Gespeicherten Override auf den echten Bind anwenden - die registrierende
    -- Resource hat den Default selbst schon per eigenem RegisterKeyMapping
    -- gesetzt, wir überschreiben ihn nur, wenn der Spieler zuvor umgebunden hat.
    if saved and saved ~= opts.defaultKey then
        applyBind(mapper, saved, opts.command)
    end

    SendNUIMessage({ action = 'setKeybinds', payload = GetKeybinds() })

    return key
end

exports('RegisterKeybind', RegisterKeybind)

function GetKeybinds()
    local list = {}
    for _, id in ipairs(keybindOrder) do
        list[#list + 1] = keybinds[id]
    end
    return list
end

exports('GetKeybinds', GetKeybinds)

RegisterNUICallback('rebindKey', function(data, cb)
    local entry = data and keybinds[data.id]
    if not entry or type(data.key) ~= 'string' or data.key == '' then
        cb({ ok = false, error = 'invalid_request' })
        return
    end

    if entry.key ~= data.key then
        unapplyBind(entry.mapper, entry.key, entry.command)
        applyBind(entry.mapper, data.key, entry.command)
        entry.key = data.key
        SetResourceKvp(kvpKey(entry.id), entry.key)
    end

    cb({ ok = true, key = entry.key })
end)

RegisterNUICallback('resetKeybind', function(data, cb)
    local entry = data and keybinds[data.id]
    if not entry then
        cb({ ok = false, error = 'invalid_request' })
        return
    end

    if entry.key ~= entry.defaultKey then
        unapplyBind(entry.mapper, entry.key, entry.command)
        applyBind(entry.mapper, entry.defaultKey, entry.command)
        entry.key = entry.defaultKey
        DeleteResourceKvp(kvpKey(entry.id))
    end

    cb({ ok = true, key = entry.key })
end)
