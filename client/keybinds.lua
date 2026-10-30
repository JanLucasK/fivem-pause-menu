-- Tasten-Anzeige: jede Resource (fivem-corerp, pma-voice, ...) kann ihre
-- per RegisterKeyMapping registrierten Commands hier anmelden, damit sie im
-- NeoV-Menü (Seite "Tastenbelegung") erscheinen. Das Menü zeigt nur an;
-- geändert wird im offiziellen FiveM-Tastenmenü (GTA-Einstellungen ->
-- Tastenbelegung -> FiveM), das die Wahl selbst dauerhaft speichert. Ein
-- eigenes `bind` wuerde die Key-Mapping-Taste nicht abloesen, sondern nur
-- eine zweite Taste danebenlegen.
--
-- Aufruf durch eine andere Resource (Client-Skript, nach dem eigenen
-- RegisterKeyMapping):
--   exports['neov-pause-menu']:RegisterKeybind({
--       id = 'myres_dosomething',      -- eindeutig
--       command = 'myres_dosomething', -- Command-String aus RegisterCommand/RegisterKeyMapping
--       label = 'Etwas tun',
--       category = 'Mein Script',      -- Gruppierung im UI, frei wählbar
--       defaultKey = 'E',              -- RegisterKeyMapping-Default (Rohname)
--   })
-- Guard davor mit GetResourceState('neov-pause-menu') == 'started' bzw.
-- pcall, da dieses Menü optional ist. Die CoreRP-Tasten meldet dieses Menü
-- selbst an (client/keybind_catalog.lua), CoreRP bleibt unverändert.

local keybinds = {}
local keybindOrder = {}

function RegisterKeybind(opts)
    assert(type(opts) == 'table', 'RegisterKeybind erwartet eine Options-Tabelle')
    assert(type(opts.id) == 'string' and opts.id ~= '', 'RegisterKeybind: id fehlt')
    assert(type(opts.command) == 'string' and opts.command ~= '', 'RegisterKeybind: command fehlt')
    assert(type(opts.label) == 'string' and opts.label ~= '', 'RegisterKeybind: label fehlt')
    assert(type(opts.defaultKey) == 'string' and opts.defaultKey ~= '', 'RegisterKeybind: defaultKey fehlt')

    if keybinds[opts.id] == nil then
        keybindOrder[#keybindOrder + 1] = opts.id
    end

    keybinds[opts.id] = {
        id = opts.id,
        resource = GetInvokingResource() or GetCurrentResourceName(),
        command = opts.command,
        label = opts.label,
        category = opts.category or 'Allgemein',
        mapper = opts.mapper or 'keyboard',
        defaultKey = opts.defaultKey,
    }
end

exports('RegisterKeybind', RegisterKeybind)

-- Aktuelle Taste eines Key-Mappings: der Command-Hash mit gesetztem Bit 31 ist
-- das Control des Mappings. Buchstaben/Ziffern kommen als "t_X" zurueck,
-- Sondertasten als "b_<code>" - die ohne verlaessliche Tabelle als nil, dann
-- zeigt das UI den Default.
local function currentKey(command)
    local button = GetControlInstructionalButton(0, GetHashKey(command) | 0x80000000, true)
    if type(button) == 'string' and button:sub(1, 2) == 't_' and #button > 2 then
        return button:sub(3)
    end
    return nil
end

-- Nur Commands, die gerade wirklich registriert sind: fehlt eine Resource
-- (z.B. pma-voice) oder ein Modul, taucht seine Zeile nicht auf.
local function registeredCommands()
    local names = {}
    for _, command in ipairs(GetRegisteredCommands()) do
        names[command.name] = true
    end
    return names
end

function GetKeybinds()
    local registered = registeredCommands()
    local list = {}
    for _, id in ipairs(keybindOrder) do
        local entry = keybinds[id]
        if registered[entry.command] then
            list[#list + 1] = {
                id = entry.id,
                resource = entry.resource,
                command = entry.command,
                label = entry.label,
                category = entry.category,
                mapper = entry.mapper,
                defaultKey = entry.defaultKey,
                key = currentKey(entry.command) or json.null,
            }
        end
    end
    return list
end

exports('GetKeybinds', GetKeybinds)
