-- Generische Settings-Registry: JEDE Resource kann hier eigene Settings-Zeilen
-- (Slider/Toggle) anmelden, die im NeoV-Menü (Tab "Settings") neben den
-- eingebauten NeoV-Settings auftauchen - ohne dass dieses Menü irgendetwas
-- über die jeweilige Resource wissen muss. Die eingebauten NeoV-Settings
-- weiter unten nutzen exakt dieselbe API wie eine fremde Resource, es gibt
-- also keinen Sonderpfad für "eigene" Settings.
--
-- Aufruf durch eine andere Resource (Client-Skript):
--   local current = exports['neov-pause-menu']:RegisterSetting({
--       id = 'myres_hud_scale',   -- eindeutig, wird als KVP-Key genutzt
--       section = 'Mein Script',  -- Gruppierung im UI, frei wählbar
--       label = 'HUD-Skalierung',
--       type = 'slider',          -- 'slider' | 'toggle'
--       default = 100,
--       min = 50, max = 150,      -- nur bei type = 'slider' relevant
--   })
-- Guard davor mit GetResourceState('neov-pause-menu') == 'started' bzw.
-- pcall, da dieses Menü optional ist und nicht als fxmanifest-Dependency
-- vorausgesetzt werden soll.
--
-- Rückmeldung bei Änderungen: dieses Menü setzt nie direkt etwas in einer
-- fremden Resource, sondern persistiert den Wert selbst (Resource-KVP) und
-- feuert `TriggerEvent('<resource>:settingChanged', id, value)` - die
-- registrierende Resource hört selbst per AddEventHandler zu und entscheidet,
-- was sie mit dem neuen Wert tut (Convar setzen, eigenen Export aufrufen, ...).

local settings = {}
local settingOrder = {}

local function kvpKey(id)
    return ('setting:%s'):format(id)
end

function RegisterSetting(opts)
    assert(type(opts) == 'table', 'RegisterSetting erwartet eine Options-Tabelle')
    assert(type(opts.id) == 'string' and opts.id ~= '', 'RegisterSetting: id fehlt')
    assert(type(opts.section) == 'string' and opts.section ~= '', 'RegisterSetting: section fehlt')
    assert(type(opts.label) == 'string' and opts.label ~= '', 'RegisterSetting: label fehlt')
    assert(opts.type == 'slider' or opts.type == 'toggle', 'RegisterSetting: type muss "slider" oder "toggle" sein')

    local saved = GetResourceKvpString(kvpKey(opts.id))
    local value = opts.default

    -- Bewusst kein `a and b or c`: bei type='toggle' und gespeichertem
    -- "false" wäre `saved == 'true'` selbst false, das würde den `or`-Zweig
    -- auslösen und faelschlich auf opts.default zurückfallen.
    if saved ~= nil then
        if opts.type == 'toggle' then
            value = saved == 'true'
        else
            value = tonumber(saved) or opts.default
        end
    end

    if settings[opts.id] == nil then
        settingOrder[#settingOrder + 1] = opts.id
    end

    settings[opts.id] = {
        id = opts.id,
        resource = GetInvokingResource() or GetCurrentResourceName(),
        section = opts.section,
        label = opts.label,
        type = opts.type,
        min = opts.min,
        max = opts.max,
        value = value,
    }

    SendNUIMessage({ action = 'setSettings', payload = GetSettings() })

    return value
end

exports('RegisterSetting', RegisterSetting)

function GetSettings()
    local list = {}
    for _, id in ipairs(settingOrder) do
        list[#list + 1] = settings[id]
    end
    return list
end

exports('GetSettings', GetSettings)

function UpdateSetting(id, value)
    local entry = settings[id]
    if not entry then return false end

    entry.value = value
    SetResourceKvp(kvpKey(id), tostring(value))
    TriggerEvent(('%s:settingChanged'):format(entry.resource), id, value)
    return true
end

exports('UpdateSetting', UpdateSetting)

RegisterNUICallback('updateSetting', function(data, cb)
    if not data or type(data.id) ~= 'string' then
        cb({ ok = false })
        return
    end
    cb({ ok = UpdateSetting(data.id, data.value) })
end)

-- Eingebaute NeoV-Standard-Settings, registriert über dieselbe Export-API wie
-- jede fremde Resource (siehe Kommentar oben).
RegisterSetting({ id = 'neov_audio_master', section = 'Audio', label = 'Gesamtlautstärke', type = 'slider', default = 80 })
RegisterSetting({ id = 'neov_audio_music', section = 'Audio', label = 'Musik', type = 'slider', default = 50 })
RegisterSetting({ id = 'neov_audio_voice', section = 'Audio', label = 'Sprachchat', type = 'slider', default = 65 })

RegisterSetting({ id = 'neov_hud_minimap', section = 'HUD', label = 'Minimap anzeigen', type = 'toggle', default = true })
RegisterSetting({ id = 'neov_hud_needs', section = 'HUD', label = 'Bedürfnis-Anzeige', type = 'toggle', default = true })
RegisterSetting({ id = 'neov_hud_money', section = 'HUD', label = 'Geld-Anzeige', type = 'toggle', default = true })

RegisterSetting({ id = 'neov_voice_mic', section = 'Voice', label = 'Mikrofon-Empfindlichkeit', type = 'slider', default = 70 })
RegisterSetting({ id = 'neov_voice_ptt', section = 'Voice', label = 'Push-to-Talk', type = 'toggle', default = true })
